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
    const colors = session.metadata?.colors ?? 'okänd';
    const quantity = session.metadata?.quantity ?? '?';
    const adapter = session.metadata?.adapter === 'yes' ? 'Ja' : 'Nej';
    const orderId = session.id;

    // shipping_details added in newer Stripe API versions
    const shippingDetails = (session as Stripe.Checkout.Session & {
      shipping_details?: { address?: Stripe.Address };
    }).shipping_details;
    const addr = shippingDetails?.address;
    const addressStr = addr
      ? [addr.line1, addr.line2, addr.postal_code, addr.city].filter(Boolean).join(', ')
      : 'okänd';

    try {
      await resend.emails.send({
        from: 'Smilo <noreply@smilo.se>',
        to: 'info@smilo.se',
        subject: `Ny beställning – ${customerName} (${total})`,
        html: `
          <h2 style="font-family:sans-serif">Ny beställning på Smilo!</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
            <tr><td style="padding:6px 16px 6px 0;color:#666">Order-ID</td><td>${orderId}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#666">Kund</td><td>${customerName}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#666">E-post</td><td>${customerEmail}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#666">Leveransadress</td><td>${addressStr}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#666">Antal kameror</td><td>${quantity}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#666">Färger</td><td>${colors}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#666">USB-C-adapter</td><td>${adapter}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#666">Totalt</td><td><strong>${total}</strong></td></tr>
          </table>
        `,
      });
    } catch (emailErr) {
      console.error('Failed to send order email:', emailErr);
    }
  }

  return NextResponse.json({ received: true });
}
