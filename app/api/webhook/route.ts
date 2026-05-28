import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!webhookSecret || !stripeKey) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2026-04-22.dahlia' });

  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerEmail = session.customer_details?.email ?? 'okänd';
    const customerName = session.customer_details?.name ?? 'okänd';
    const total = session.amount_total
      ? `${(session.amount_total / 100).toFixed(0)} kr`
      : 'okänd';
    const colors = (session.metadata?.colors ?? 'okänd').split(',').join(', ');
    const quantity = session.metadata?.quantity ?? '?';
    const adapter = session.metadata?.adapter === 'yes' ? 'Ja' : 'Nej';
    const orderId = session.id;

    // Leveransadressen flyttades till collected_information.shipping_details i nyare API-versioner;
    // faller tillbaka på toppnivå (äldre versioner) och customer_details som sista utväg.
    const shipping =
      session.collected_information?.shipping_details ??
      (session as Stripe.Checkout.Session & {
        shipping_details?: { address?: Stripe.Address; name?: string };
      }).shipping_details;
    const addr = shipping?.address ?? session.customer_details?.address ?? null;
    const recipientName = shipping?.name ?? customerName;
    const addressStr = addr
      ? [addr.line1, addr.line2, addr.postal_code, addr.city, addr.country]
          .filter(Boolean)
          .join(', ')
      : 'okänd';

    const adminEmail = resend.emails.send({
      from: 'Smilo <noreply@smilo.se>',
      to: 'info@smilo.se',
      replyTo: customerEmail !== 'okänd' ? customerEmail : undefined,
      subject: `Ny beställning – ${customerName} (${total})`,
      html: `
        <h2 style="font-family:sans-serif">Ny beställning på Smilo!</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
          <tr><td style="padding:6px 16px 6px 0;color:#666">Order-ID</td><td>${orderId}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#666">Kund</td><td>${customerName}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#666">E-post</td><td>${customerEmail}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#666">Mottagare</td><td>${recipientName}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#666">Leveransadress</td><td>${addressStr}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#666">Antal kameror</td><td>${quantity}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#666">Färger</td><td>${colors}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#666">USB-C-adapter</td><td>${adapter}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#666">Totalt</td><td><strong>${total}</strong></td></tr>
        </table>
      `,
    });

    const customerEmailSend =
      customerEmail !== 'okänd'
        ? resend.emails.send({
            from: 'Smilo <noreply@smilo.se>',
            to: customerEmail,
            subject: 'Tack för din beställning hos Smilo!',
            html: `
              <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
                <h1 style="font-size:24px;font-weight:600;letter-spacing:-0.5px">Tack för din beställning!</h1>
                <p style="font-size:15px;line-height:1.6;color:#444">
                  Hej ${customerName}, vi har tagit emot din beställning och betalningen har gått igenom.
                  Vi packar och skickar din kamera så snart som möjligt – du får ett mejl när paketet är på väg.
                </p>
                <h2 style="font-size:16px;font-weight:600;margin-top:32px">Din beställning</h2>
                <table style="border-collapse:collapse;font-size:14px;width:100%">
                  <tr><td style="padding:6px 16px 6px 0;color:#666">Antal kameror</td><td>${quantity}</td></tr>
                  <tr><td style="padding:6px 16px 6px 0;color:#666">Färger</td><td>${colors}</td></tr>
                  <tr><td style="padding:6px 16px 6px 0;color:#666">USB-C-adapter</td><td>${adapter}</td></tr>
                  <tr><td style="padding:6px 16px 6px 0;color:#666">Leveransadress</td><td>${addressStr}</td></tr>
                  <tr><td style="padding:12px 16px 6px 0;color:#666;border-top:1px solid #eee">Totalt betalt</td><td style="padding-top:12px;border-top:1px solid #eee"><strong>${total}</strong></td></tr>
                </table>
                <p style="font-size:14px;line-height:1.6;color:#444;margin-top:32px">
                  Har du frågor om din order? Svara på det här mejlet eller kontakta oss på
                  <a href="mailto:info@smilo.se" style="color:#1a1a1a">info@smilo.se</a>.
                </p>
                <p style="font-size:13px;color:#999;margin-top:32px">Ordernummer: ${orderId}</p>
                <p style="font-size:14px;color:#1a1a1a;margin-top:24px">Vänliga hälsningar,<br/>Smilo</p>
              </div>
            `,
          })
        : Promise.resolve();

    const results = await Promise.allSettled([adminEmail, customerEmailSend]);
    results.forEach((result, i) => {
      if (result.status === 'rejected') {
        console.error(
          `Failed to send ${i === 0 ? 'admin' : 'customer'} email:`,
          result.reason
        );
      }
    });
  }

  return NextResponse.json({ received: true });
}
