import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseAdmin } from '@/lib/supabase';

const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(255),
  source: z.string().trim().max(50).optional(),
});

export async function POST(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Nyhetsbrevet är inte konfigurerat just nu.' },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Ogiltig förfrågan.' }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Ange en giltig e-postadress.' },
      { status: 400 }
    );
  }

  const { email, source } = parsed.data;

  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email, source: source ?? 'footer' });

  if (error) {
    // 23505 = unique_violation: adressen är redan registrerad. Behandla som
    // lyckat så att vi inte avslöjar vilka adresser som finns i listan.
    if (error.code === '23505') {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { error: 'Något gick fel. Försök igen senare.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
