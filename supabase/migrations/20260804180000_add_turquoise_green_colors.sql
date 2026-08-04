-- Lägg till kamerafärgerna turkos och grön i lagret.
-- Utökar CHECK-constrainten på color_id och seedar lagerrader för de nya färgerna.

alter table public.camera_inventory
  drop constraint if exists camera_inventory_color_id_check;

alter table public.camera_inventory
  add constraint camera_inventory_color_id_check
  check (color_id in ('black', 'white', 'pink', 'brown', 'turquoise', 'green'));

insert into public.camera_inventory (color_id, color_name, stock_quantity)
values
  ('turquoise', 'Turkos', 10),
  ('green', 'Grön', 10)
on conflict (color_id) do nothing;
