-- Riktiga kundrecensioner. Visas på sajten först när de markerats som publicerade.
-- Skrivs in manuellt (Supabase Studio/admin) tills ett insamlingsflöde finns.

create table if not exists public.product_reviews (
  id uuid primary key default gen_random_uuid(),
  author_name text not null check (char_length(author_name) between 1 and 80),
  rating integer not null check (rating between 1 and 5),
  title text check (title is null or char_length(title) <= 120),
  body text not null check (char_length(body) between 1 and 1000),
  published boolean not null default false,
  created_at timestamptz not null default now()
);

comment on table public.product_reviews is
  'Kundrecensioner för Smilo-kameran. Endast published = true visas publikt.';

alter table public.product_reviews enable row level security;

-- Ingen anon-access: sajten läser server-side via service_role.
