import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { escapeHtml } from '@/lib/escape-html';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(10).max(2000),
});

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'Kontaktfunktionen är inte konfigurerad just nu.' },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Ogiltig förfrågan.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Kontrollera att alla fält är korrekt ifyllda.' }, { status: 400 });
  }

  const { name, email, subject, message } = parsed.data;

  try {
    const { error } = await resend.emails.send({
      from: 'Smilo <noreply@smilo.se>',
      to: 'info@smilo.se',
      replyTo: email,
      subject: `Kontaktformulär: ${subject}`,
      html: `
        <h2 style="font-family:sans-serif">Nytt meddelande via kontaktformuläret</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
          <tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top">Namn</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top">E-post</td><td>${escapeHtml(email)}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top">Ämne</td><td>${escapeHtml(subject)}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top">Meddelande</td><td style="white-space:pre-wrap">${escapeHtml(message)}</td></tr>
        </table>
      `,
    });

    if (error) {
      console.error('Failed to send contact email:', error);
      return NextResponse.json({ error: 'Kunde inte skicka meddelandet. Försök igen senare.' }, { status: 502 });
    }
  } catch (err) {
    console.error('Contact email error:', err);
    return NextResponse.json({ error: 'Något gick fel. Försök igen senare.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
