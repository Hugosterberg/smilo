# CLAUDE.md — Smilo (smilo.se)

## Projektöversikt

Smilo är en e-handelsbutik för retrokameror med modern teknik — bilderna överförs trådlöst direkt till mobilen. Webbplatsen ska ge ett premium-intryck och sälja en enda primär produkt i olika färgvarianter.

**Domän:** www.smilo.se  
**Bransch:** Consumer electronics / lifestyle  
**Primärt språk på sajten:** Svenska

---

## Teknikstack

| Lager | Val |
|---|---|
| Frontend | React 18 + TypeScript + NextJS |
| Routing | React Router v6 |
| UI-komponenter | shadcn/ui (Radix UI + Tailwind CSS) |
| Animationer | Framer Motion |
| Formulär | React Hook Form + Zod |
| Server-state | TanStack Query v5 |
| Databas & Auth | Supabase (Postgres + Storage + Auth) |
| Betalningar | Stripe (Checkout Sessions + Webhooks) |
| Deploy | Vercel (frontend) + Supabase (backend) |
| Pakethanterare | npm (bun.lockb finns men använd npm i CI) |

---

## Arkitektur

### Mappstruktur

```
src/
  assets/          # Statiska bilder (lokala dev-bilder; produktion = Supabase Storage)
  components/
    ui/            # shadcn/ui-primitiver — rör inte manuellt
    layout/        # Header, Footer, och globala layout-komponenter
    sections/      # Sidspecifika sektioner (HeroSection, ProductSection m.fl.)
    shared/        # Återanvändbara domänkomponenter (ProductCard, OrderSummary m.fl.)
  hooks/           # Anpassade React-hooks
  lib/
    supabase.ts    # Supabase-klient (singleton)
    stripe.ts      # Stripe-helpers
    utils.ts       # shadcn cn() + generella utilities
  pages/           # En fil per route, minimal logik — delegera till komponenter/hooks
  types/           # Globala TypeScript-typer och Supabase-genererade typer
```

### Datahämtning

- All server-state hanteras via **TanStack Query** — inga direkta fetch-anrop i komponenter.
- Supabase-anrop ska vara inkapslerade i egna hook-filer under `src/hooks/` (t.ex. `useProducts`, `useOrders`).
- Optimistiska uppdateringar används där det förbättrar UX märkbart (t.ex. varukorg).

### Betalningsflöde

```
Kund väljer produkt/färg
  → Stripe Checkout Session skapas (Supabase Edge Function)
  → Kund betalar på Stripe hosted page
  → Stripe Webhook → Supabase Edge Function
    → Order sparas i databasen med status "paid"
    → Orderbekräftelse skickas via e-post (Resend)
    → Admin-notifiering
  → Kund redirectas till /tack-sida
```

### Admin-flöde (internt)

- `/admin`-route skyddad med Supabase Auth (e-post + lösenord).
- Admin kan se orderlista, markera ordrar som skickade, hantera produkt-media.

---

## Supabase-schema (planerat)

### Tabeller

**products**
- `id`, `slug`, `name`, `description`, `price_sek` (integer, ören), `in_stock`, `created_at`

**product_variants**
- `id`, `product_id` (fk), `color_name`, `color_hex`, `sku`, `stock_quantity`

**product_media**
- `id`, `product_id` (fk), `variant_id` (nullable), `url` (Supabase Storage), `media_type` (image/video), `sort_order`

**orders**
- `id`, `stripe_session_id` (unique), `stripe_payment_intent_id`, `status` (pending/paid/shipped/cancelled), `customer_email`, `customer_name`, `shipping_address` (jsonb), `line_items` (jsonb), `total_sek`, `created_at`, `shipped_at`

**order_items**
- `id`, `order_id` (fk), `variant_id` (fk), `quantity`, `unit_price_sek`

### Row Level Security

- `products` och `product_media`: läs-access för alla, skriv-access kräver admin-roll.
- `orders` och `order_items`: insert via service_role (webhook), läs-access för admin-roll.

---

## Designprinciper

### Visuell identitet

- **Känsla:** Premium, minimalistiskt, lite nostalgiskt — som ett välgjort kameravarumärke.
- **Typsnitt:** Prioritera eleganta serif-rubriker + clean sans-serif för brödtext.
- **Färgpalett:** Neutral bas (vit/off-white/djup svart) med produktfärgerna som accenter.
- **Imagery:** Stort, luftigt utrymme runt produkten. Lifestyle-foton dominerar.
- **Animationer:** Subtila och ändamålsenliga — använd Framer Motion sparsamt.

### UX-regler

- Mobil-first. Alla layouts designas för mobil, sedan skalas upp.
- CTA ska vara tydlig och singular per sektion — undvik konkurrens om uppmärksamheten.
- Produktbilder ska vara högupplösta och lazy-loadade.
- Formulär valideras inline med tydliga felmeddelanden på svenska.

### Tillgänglighet

- Semantisk HTML (använd `<main>`, `<nav>`, `<section>`, `<article>`).
- Alla bilder kräver meningsfulla `alt`-texter.
- Fokus-states ska vara synliga (åsidosätt aldrig `outline` utan alternativ).
- WCAG AA-kontrast på all text.

---

## Kodriktlinjer

### Generellt

- **TypeScript strict mode** — inga `any`, inga `@ts-ignore` utan förklaring.
- Komponenter ska vara fokuserade: en komponent, ett ansvar.
- Exportera alltid med named exports från `components/` och `hooks/` — default export bara i `pages/`.
- Inga kommentarer som förklarar *vad* koden gör — endast kommentarer för icke-uppenbara *varför*.

### Miljövariabler

Alla hemligheter lagras i `.env.local` (aldrig i git). Namnkonvention:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY` (server-side, Supabase Edge Functions)
- `STRIPE_WEBHOOK_SECRET` (server-side)

### Felhantering

- Använd React Error Boundaries för kritiska sektioner (checkout, produktlista).
- Visa alltid användarvänliga felmeddelanden på svenska — aldrig råa tekniska fel.
- Logga fel till konsolen i dev, men undvik `console.log` i produktion.

### Testning

- Enhetstester för affärslogik (prisberäkning, ordervalidering) med Vitest.
- Inga tester för rena UI-komponenter utan logik.
- Testa Stripe webhook-handler noggrant — det är kritisk betalningslogik.

---

## Deployment

### Vercel

- Branch `main` → automatisk deploy till produktion (smilo.se).
- Branch `dev` → preview-deploy för staging.
- Miljövariabler sätts i Vercel dashboard — aldrig i kod.
- `vercel.json` om routing behöver konfigureras (SPA fallback för React Router).

### Supabase

- Migrationer versionshanteras under `supabase/migrations/`.
- Kör aldrig SQL direkt i produktionsdatabasen — alltid via migrationer.
- Edge Functions för: skapa Stripe-session, hantera Stripe webhook, skicka e-post.

---

## Säkerhet

- Stripe Webhook-signaturer **måste** verifieras — returnera 400 om signaturen misslyckas.
- Supabase service_role-nyckeln **får aldrig** exponeras i frontend-kod.
- Produktpriser valideras alltid server-side (Edge Function) — aldrig lita på klient-skickat pris.
- Rate limiting på checkout-endpoint för att förhindra missbruk.

---

## Lokalt dev-setup

```bash
npm install
npm run dev        # Startar på http://localhost:5173
npm run build      # Produktionsbygge
npm run lint       # ESLint-kontroll
npm test           # Kör Vitest
```

Kräver `.env.local` med Supabase- och Stripe-nycklar för full funktionalitet.

---

## Prioriterad roadmap

1. **Statisk landing page** (pågående) — hero, produktsektion, galleri, FAQ
2. **Supabase-integration** — schema, produktdata från DB, Supabase Storage för media
3. **Checkout-flöde** — Stripe Checkout Session via Edge Function, bekräftelsesida
4. **Webhook & orderhantering** — spara order, skicka bekräftelsemejl (Resend)
5. **Admin-panel** — orderlista, skicka-markering, produkthantering
6. **Auth** — Supabase Auth för admin-inloggning
