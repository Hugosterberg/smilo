# Smilo

E-handelssajt för [smilo.se](https://smilo.se) — en digital retrokamera utan skärm som enkelt överför bilder till mobilen.

## Tech stack

- **Frontend:** React 18 + TypeScript + Vite
- **UI:** shadcn/ui + Tailwind CSS
- **Animationer:** Framer Motion
- **Routing:** React Router v6
- **Server-state:** TanStack Query v5
- **Databas & Auth:** Supabase
- **Betalningar:** Stripe
- **Deploy:** Vercel

## Lokal utveckling

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Produktionsbygge
npm run lint       # ESLint
npm test           # Vitest
```

Kräver en `.env.local`-fil med Supabase- och Stripe-nycklar för full funktionalitet.

## Projektstruktur

```
src/
  assets/          # Statiska bilder (dev); Supabase Storage i produktion
  components/
    ui/            # shadcn/ui-primitiver
    layout/        # Header, Footer och globala layoutkomponenter
    sections/      # Sidspecifika sektioner
    shared/        # Återanvändbara domänkomponenter
  hooks/           # Anpassade React-hooks
  lib/             # Supabase-klient, Stripe-helpers, utils
  pages/           # En fil per route
  types/           # Globala TypeScript-typer
```

Se [CLAUDE.md](./CLAUDE.md) för fullständig arkitektur- och designdokumentation.
