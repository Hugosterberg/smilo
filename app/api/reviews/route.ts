import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseAdmin } from '@/lib/supabase';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const reviewSchema = z.object({
  name: z.string().trim().min(2, 'Ange ditt namn.').max(80),
  title: z
    .string()
    .trim()
    .max(120)
    .optional()
    .transform((value) => (value ? value : null)),
  rating: z.number().int().min(1).max(5),
  body: z.string().trim().min(10, 'Skriv minst 10 tecken.').max(1000),
});

export async function POST(req: NextRequest) {
  const rate = checkRateLimit(`reviews:${getClientIp(req.headers)}`, 3, 10 * 60 * 1000);
  if (!rate.ok) {
    return NextResponse.json(
      { error: 'För många recensioner på kort tid. Vänta en stund och försök igen.' },
      { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds) } }
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Recensioner är inte konfigurerade just nu.' },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Ogiltig förfrågan.' }, { status: 400 });
  }

  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    const message =
      parsed.error.errors[0]?.message ?? 'Kontrollera att alla fält är korrekt ifyllda.';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // Nya recensioner publiceras inte direkt – de granskas i /admin först,
  // så att spam och olämpligt innehåll aldrig når sajten.
  const { error } = await supabase.from('product_reviews').insert({
    author_name: parsed.data.name,
    title: parsed.data.title,
    rating: parsed.data.rating,
    body: parsed.data.body,
    published: false,
  });

  if (error) {
    console.error('Kunde inte spara recension:', error);
    return NextResponse.json(
      { error: 'Något gick fel. Försök igen senare.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
