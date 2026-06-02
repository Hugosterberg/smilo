-- Nyhetsbrevsprenumeranter
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text,
  created_at timestamptz not null default now(),
  unsubscribed_at timestamptz
);

-- Skiftlägesokänslig unik e-post så att samma adress inte kan registreras två gånger
create unique index if not exists newsletter_subscribers_email_unique
  on public.newsletter_subscribers (lower(email));

alter table public.newsletter_subscribers enable row level security;

-- Inga policies = ingen åtkomst för anon/authenticated. Insert sker enbart
-- server-side via den hemliga nyckeln (sb_secret / service_role, förbigår RLS)
-- i /api/newsletter.
