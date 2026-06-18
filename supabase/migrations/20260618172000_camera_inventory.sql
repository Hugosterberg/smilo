-- Lager per kamerafärg. Läggs bakom RLS utan publika policies; appen läser och
-- uppdaterar server-side med den hemliga Supabase-nyckeln.
create table if not exists public.camera_inventory (
  color_id text primary key check (color_id in ('black', 'white', 'pink', 'brown')),
  color_name text not null,
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  version integer not null default 1 check (version > 0),
  manually_adjusted_at timestamptz,
  updated_at timestamptz not null default now()
);

insert into public.camera_inventory (color_id, color_name, stock_quantity)
values
  ('black', 'Svart', 10),
  ('white', 'Vit', 10),
  ('pink', 'Rosa', 10),
  ('brown', 'Brun', 10)
on conflict (color_id) do nothing;

alter table public.camera_inventory enable row level security;

create table if not exists public.processed_checkout_sessions (
  checkout_session_id text primary key,
  processed_at timestamptz not null default now()
);

alter table public.processed_checkout_sessions enable row level security;

create table if not exists public.camera_inventory_reservations (
  reservation_id text primary key,
  checkout_session_id text unique,
  status text not null default 'reserved' check (status in ('reserved', 'pending_payment', 'completed', 'released')),
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.camera_inventory_reservation_items (
  reservation_id text not null references public.camera_inventory_reservations (reservation_id) on delete cascade,
  color_id text not null references public.camera_inventory (color_id),
  quantity integer not null check (quantity > 0),
  primary key (reservation_id, color_id)
);

alter table public.camera_inventory_reservations enable row level security;
alter table public.camera_inventory_reservation_items enable row level security;

create or replace function public.decrement_camera_inventory(requested_color_ids text[])
returns void
language plpgsql
set search_path = public
as $$
declare
  requested record;
  available_quantity integer;
begin
  for requested in
    select color_id, count(*)::integer as quantity
    from unnest(requested_color_ids) as requested_colors(color_id)
    group by color_id
    order by color_id
  loop
    select stock_quantity
      into available_quantity
      from public.camera_inventory
      where color_id = requested.color_id
      for update;

    if available_quantity is null then
      raise exception 'Unknown camera color: %', requested.color_id;
    end if;

    if available_quantity < requested.quantity then
      raise exception 'Insufficient stock for %, requested %, available %',
        requested.color_id,
        requested.quantity,
        available_quantity;
    end if;

    update public.camera_inventory
      set stock_quantity = stock_quantity - requested.quantity,
          version = version + 1,
          updated_at = now()
      where color_id = requested.color_id;
  end loop;
end;
$$;

revoke execute on function public.decrement_camera_inventory(text[]) from public, anon, authenticated;
grant execute on function public.decrement_camera_inventory(text[]) to service_role;

create or replace function public.release_checkout_inventory(
  p_checkout_session_id text,
  p_reservation_id text
)
returns boolean
language plpgsql
set search_path = public
as $$
declare
  target_reservation_id text;
  reservation_created_at timestamptz;
  item record;
begin
  select reservation_id, created_at
    into target_reservation_id, reservation_created_at
    from public.camera_inventory_reservations
    where
      (p_reservation_id is not null and reservation_id = p_reservation_id)
      or (p_checkout_session_id is not null and checkout_session_id = p_checkout_session_id)
    order by reservation_id
    limit 1
    for update;

  if target_reservation_id is null then
    return false;
  end if;

  update public.camera_inventory_reservations
    set status = 'released',
        updated_at = now()
    where reservation_id = target_reservation_id
      and status in ('reserved', 'pending_payment');

  if not found then
    return false;
  end if;

  for item in
    select color_id, quantity
    from public.camera_inventory_reservation_items
    where reservation_id = target_reservation_id
    order by color_id
  loop
    update public.camera_inventory
      set stock_quantity = stock_quantity + item.quantity,
          version = version + 1,
          updated_at = now()
      where color_id = item.color_id
        and (
          manually_adjusted_at is null
          or manually_adjusted_at < reservation_created_at
        );
  end loop;

  return true;
end;
$$;

revoke execute on function public.release_checkout_inventory(text, text) from public, anon, authenticated;
grant execute on function public.release_checkout_inventory(text, text) to service_role;

create or replace function public.mark_checkout_inventory_pending(
  p_checkout_session_id text,
  p_reservation_id text
)
returns boolean
language plpgsql
set search_path = public
as $$
declare
  target_reservation_id text;
  current_status text;
begin
  select reservation_id, status
    into target_reservation_id, current_status
    from public.camera_inventory_reservations
    where
      (p_reservation_id is not null and reservation_id = p_reservation_id)
      or (p_checkout_session_id is not null and checkout_session_id = p_checkout_session_id)
    order by reservation_id
    limit 1
    for update;

  if target_reservation_id is null then
    return false;
  end if;

  if current_status in ('pending_payment', 'completed') then
    return true;
  end if;

  if current_status <> 'reserved' then
    return false;
  end if;

  update public.camera_inventory_reservations
    set status = 'pending_payment',
        checkout_session_id = coalesce(checkout_session_id, p_checkout_session_id),
        updated_at = now()
    where reservation_id = target_reservation_id;

  return true;
end;
$$;

revoke execute on function public.mark_checkout_inventory_pending(text, text) from public, anon, authenticated;
grant execute on function public.mark_checkout_inventory_pending(text, text) to service_role;

create or replace function public.release_expired_checkout_inventory()
returns integer
language plpgsql
set search_path = public
as $$
declare
  reservation record;
  released_count integer := 0;
begin
  for reservation in
    select reservation_id
    from public.camera_inventory_reservations
    where status = 'reserved'
      and expires_at <= now()
    order by expires_at, reservation_id
  loop
    if public.release_checkout_inventory(null, reservation.reservation_id) then
      released_count := released_count + 1;
    end if;
  end loop;

  return released_count;
end;
$$;

revoke execute on function public.release_expired_checkout_inventory() from public, anon, authenticated;
grant execute on function public.release_expired_checkout_inventory() to service_role;

create or replace function public.reserve_camera_inventory(
  p_reservation_id text,
  requested_color_ids text[],
  p_expires_at timestamptz
)
returns void
language plpgsql
set search_path = public
as $$
declare
  requested record;
  available_quantity integer;
begin
  if p_expires_at <= now() then
    raise exception 'Reservation expiry must be in the future';
  end if;

  if coalesce(array_length(requested_color_ids, 1), 0) = 0 then
    raise exception 'Reservation requires at least one color id';
  end if;

  perform public.release_expired_checkout_inventory();

  insert into public.camera_inventory_reservations (reservation_id, expires_at)
  values (p_reservation_id, p_expires_at);

  for requested in
    select color_id, count(*)::integer as quantity
    from unnest(requested_color_ids) as requested_colors(color_id)
    group by color_id
    order by color_id
  loop
    select stock_quantity
      into available_quantity
      from public.camera_inventory
      where color_id = requested.color_id
      for update;

    if available_quantity is null then
      raise exception 'Unknown camera color: %', requested.color_id;
    end if;

    if available_quantity < requested.quantity then
      raise exception 'Insufficient stock for %, requested %, available %',
        requested.color_id,
        requested.quantity,
        available_quantity;
    end if;

    update public.camera_inventory
      set stock_quantity = stock_quantity - requested.quantity,
          version = version + 1,
          updated_at = now()
      where color_id = requested.color_id;

    insert into public.camera_inventory_reservation_items (reservation_id, color_id, quantity)
    values (p_reservation_id, requested.color_id, requested.quantity);
  end loop;
end;
$$;

revoke execute on function public.reserve_camera_inventory(text, text[], timestamptz) from public, anon, authenticated;
grant execute on function public.reserve_camera_inventory(text, text[], timestamptz) to service_role;

create or replace function public.attach_checkout_session_to_reservation(
  p_reservation_id text,
  p_checkout_session_id text
)
returns void
language plpgsql
set search_path = public
as $$
begin
  update public.camera_inventory_reservations
    set checkout_session_id = p_checkout_session_id,
        updated_at = now()
    where reservation_id = p_reservation_id
      and status = 'reserved';

  if not found then
    raise exception 'Active reservation not found: %', p_reservation_id;
  end if;
end;
$$;

revoke execute on function public.attach_checkout_session_to_reservation(text, text) from public, anon, authenticated;
grant execute on function public.attach_checkout_session_to_reservation(text, text) to service_role;

-- Claimar checkout-sessionen och finaliserar reserverat lager i samma transaktion.
-- Saknas reservation (t.ex. äldre checkout-session) minskas lager direkt som fallback.
create or replace function public.claim_checkout_inventory(
  p_checkout_session_id text,
  p_reservation_id text,
  requested_color_ids text[]
)
returns boolean
language plpgsql
set search_path = public
as $$
declare
  reservation_status text;
begin
  if coalesce(array_length(requested_color_ids, 1), 0) = 0 then
    raise exception 'Checkout inventory claim requires at least one color id';
  end if;

  insert into public.processed_checkout_sessions (checkout_session_id)
  values (p_checkout_session_id);

  if p_reservation_id is not null then
    select status
      into reservation_status
      from public.camera_inventory_reservations
      where reservation_id = p_reservation_id
      for update;

    if reservation_status in ('reserved', 'pending_payment') then
      update public.camera_inventory_reservations
        set status = 'completed',
            checkout_session_id = coalesce(checkout_session_id, p_checkout_session_id),
            updated_at = now()
        where reservation_id = p_reservation_id;
      return true;
    end if;

    if reservation_status = 'completed' then
      return true;
    end if;
  end if;

  perform public.decrement_camera_inventory(requested_color_ids);

  if p_reservation_id is not null and reservation_status = 'released' then
    update public.camera_inventory_reservations
      set status = 'completed',
          checkout_session_id = coalesce(checkout_session_id, p_checkout_session_id),
          updated_at = now()
      where reservation_id = p_reservation_id;
  end if;

  return true;
exception
  when unique_violation then
    return false;
end;
$$;

revoke execute on function public.claim_checkout_inventory(text, text, text[]) from public, anon, authenticated;
grant execute on function public.claim_checkout_inventory(text, text, text[]) to service_role;

create or replace function public.set_camera_inventory(p_updates jsonb)
returns void
language plpgsql
set search_path = public
as $$
declare
  update_row jsonb;
  requested_color_id text;
  requested_stock_quantity integer;
  expected_version integer;
  current_version integer;
begin
  perform public.release_expired_checkout_inventory();

  for update_row in
    select value
    from jsonb_array_elements(p_updates)
    order by value->>'color_id'
  loop
    requested_color_id := update_row->>'color_id';
    requested_stock_quantity := (update_row->>'stock_quantity')::integer;
    expected_version := (update_row->>'version')::integer;

    if requested_stock_quantity < 0 or requested_stock_quantity > 9999 then
      raise exception 'Invalid stock quantity for %: %', requested_color_id, requested_stock_quantity;
    end if;

    select version
      into current_version
      from public.camera_inventory
      where color_id = requested_color_id
      for update;

    if current_version is null then
      raise exception 'Unknown camera color: %', requested_color_id;
    end if;

    if current_version <> expected_version then
      raise exception 'Stale stock version for %, expected %, current %',
        requested_color_id,
        expected_version,
        current_version;
    end if;
  end loop;

  for update_row in
    select value
    from jsonb_array_elements(p_updates)
    order by value->>'color_id'
  loop
    update public.camera_inventory
      set stock_quantity = (update_row->>'stock_quantity')::integer,
          version = version + 1,
          manually_adjusted_at = now(),
          updated_at = now()
      where color_id = update_row->>'color_id';
  end loop;
end;
$$;

revoke execute on function public.set_camera_inventory(jsonb) from public, anon, authenticated;
grant execute on function public.set_camera_inventory(jsonb) to service_role;
