# Smilo

E-handelssajt för [smilo.se](https://smilo.se) — en digital retrokamera utan skärm som enkelt överför bilder till mobilen.

## Tech stack

- **Frontend:** React 18 + TypeScript + Next.js
- **UI:** shadcn/ui + Tailwind CSS
- **Animationer:** Framer Motion
- **Routing:** Next.js App Router
- **Server-state:** TanStack Query v5
- **Databas & Auth:** Supabase
- **Betalningar:** Stripe
- **Deploy:** Vercel

## Lokal utveckling

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Produktionsbygge
npm run lint       # ESLint
npm test           # Vitest
```

Kräver en `.env.local`-fil med Supabase- och Stripe-nycklar för full funktionalitet.

## Admin och lager

`/admin` låter behörig admin uppdatera antal kameror i lager per färg. Sätt
`SMILO_ADMIN_PASSWORD`, `NEXT_PUBLIC_SUPABASE_URL` och servernyckeln
`SUPABASE_SECRET_KEY` eller `SUPABASE_SERVICE_ROLE_KEY` i Vercel/lokalt. Kör
Supabase-migrationen för `camera_inventory` innan funktionen används i produktion.

## Projektstruktur

```
app/              # Next.js App Router routes och API routes
src/
  assets/          # Statiska bilder (dev); Supabase Storage i produktion
  components/
    ui/            # shadcn/ui-primitiver
    layout/        # Header, Footer och globala layoutkomponenter
    sections/      # Sidspecifika sektioner
    shared/        # Återanvändbara domänkomponenter
  hooks/           # Anpassade React-hooks
  lib/             # Supabase-klient, Stripe-helpers, utils
```

Se [CLAUDE.md](./CLAUDE.md) för fullständig arkitektur- och designdokumentation.
