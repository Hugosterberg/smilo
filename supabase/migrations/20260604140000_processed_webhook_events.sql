-- Idempotens för Stripe-webhooken. Stripe levererar minst en gång och kan skicka
-- samma händelse flera gånger; vi "claimar" varje event_id här innan vi skickar
-- bekräftelsemail så att en order aldrig mailas dubbelt.
create table if not exists public.processed_webhook_events (
  event_id text primary key,
  processed_at timestamptz not null default now()
);

alter table public.processed_webhook_events enable row level security;

-- Inga policies = ingen åtkomst för anon/authenticated. Insert/select sker enbart
-- server-side via den hemliga nyckeln (sb_secret / service_role, förbigår RLS)
-- i /api/webhook.
