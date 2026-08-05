import { NextRequest, NextResponse, after } from 'next/server';
import { z } from 'zod';
import { getSupabaseAdmin } from '@/lib/supabase';
import { DISCOUNT_CODE, DISCOUNT_AMOUNT_LABEL } from '@/lib/discount';
import { getResend } from '@/lib/resend';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(255),
  source: z.string().trim().max(50).optional(),
});

async function sendWelcomeEmail(email: string) {
  const resend = getResend();
  if (!resend) return;

  try {
    const { error } = await resend.emails.send({
      from: 'Smilo <noreply@smilo.se>',
      to: email,
      subject: `Välkommen till Smilo – ${DISCOUNT_AMOUNT_LABEL} rabatt på ditt första köp 🎉`,
      html: `
        <div style="background:#f3ece0;padding:32px 16px;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif">
          <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.06)">
            <div style="background:linear-gradient(135deg,#4a3f35,#6B7B4B);padding:36px 32px;text-align:center;color:#f6efe2">
              <p style="margin:0;font-size:13px;letter-spacing:2px;text-transform:uppercase;opacity:0.8">Välkommen till Smilo</p>
              <h1 style="margin:10px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:600">Tack för att du är med! 🎉</h1>
            </div>
            <div style="padding:32px">
              <p style="font-size:15px;line-height:1.6;color:#444;margin:0 0 24px">
                Du är nu anmäld till vårt nyhetsbrev och får nyheter, erbjudanden och inspiration direkt i inkorgen.
                Som tack får du <strong>${DISCOUNT_AMOUNT_LABEL} rabatt</strong> på ditt första köp.
              </p>
              <div style="border:2px dashed #6B7B4B;border-radius:14px;padding:20px;text-align:center;background:#f7f9f2">
                <p style="margin:0 0 6px;font-size:13px;color:#6B7B4B;letter-spacing:1px;text-transform:uppercase">Din rabattkod</p>
                <p style="margin:0;font-size:32px;font-weight:700;letter-spacing:4px;color:#3a3128">${DISCOUNT_CODE}</p>
                <p style="margin:8px 0 0;font-size:13px;color:#888">Ange koden i kassan – ${DISCOUNT_AMOUNT_LABEL} dras av på ordern.</p>
              </div>
              <div style="text-align:center;margin:28px 0 8px">
                <a href="https://smilo.se/#produkt" style="display:inline-block;background:#6B7B4B;color:#fff;text-decoration:none;font-size:15px;font-weight:600;padding:13px 32px;border-radius:999px">Börja handla</a>
              </div>
              <p style="font-size:12px;line-height:1.6;color:#aaa;text-align:center;margin:20px 0 0">
                Gäller ett första köp. Har du frågor? Kontakta oss på
                <a href="mailto:info@smilo.se" style="color:#6B7B4B">info@smilo.se</a>.
              </p>
            </div>
          </div>
        </div>
      `,
    });
    if (error) console.error('Välkomstmail nekades av Resend:', error);
  } catch (err) {
    console.error('Välkomstmail kastade fel:', err);
  }
}

export async function POST(req: NextRequest) {
  // Begränsa per IP – anmälan triggar välkomstmail och ska inte gå att spamma.
  const rate = checkRateLimit(`newsletter:${getClientIp(req.headers)}`, 5, 10 * 60 * 1000);
  if (!rate.ok) {
    return NextResponse.json(
      { error: 'För många försök. Vänta en stund och försök igen.' },
      { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds) } }
    );
  }

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

  // Popup-anmälan ger rabattkod via ett välkomstmail. Skickas efter svaret så att
  // formuläret känns snabbt – koden visas dessutom direkt i popupen.
  if (source === 'popup') {
    after(() => sendWelcomeEmail(email));
  }

  return NextResponse.json({ ok: true });
}
