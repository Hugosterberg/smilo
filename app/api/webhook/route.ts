import { NextRequest, NextResponse, after } from 'next/server';
import Stripe from 'stripe';
import { escapeHtml } from '@/lib/escape-html';
import {
  orderEmailShell,
  orderDetailRows,
  orderTotalBox,
} from '@/lib/order-email';
import {
  getCameraColorById,
  getCameraColorByName,
  type CameraColorId,
} from '@/lib/camera-colors';
import {
  claimCheckoutInventory,
  markCheckoutInventoryPending,
  releaseCheckoutInventory,
} from '@/lib/camera-inventory';
import { getResend, type ResendEmailPayload } from '@/lib/resend';
import { getSupabaseAdmin } from '@/lib/supabase';

// Signaturverifieringen använder Node:s crypto synkront – tvinga Node-runtime
// (inte Edge) så constructEvent fungerar.
export const runtime = 'nodejs';

// Resend kastar inte vid API-fel – det returnerar { data, error }. Den här
// hjälparen normaliserar både kastade undantag och returnerade fel till ett enda
// resultat så att inget misslyckat utskick passerar tyst.
async function sendEmail(
  payload: ResendEmailPayload,
  label: string
): Promise<{ ok: boolean; error?: string }> {
  const resend = getResend();
  if (!resend) {
    const error = 'RESEND_API_KEY saknas';
    console.error(`Cannot send ${label} email: ${error}`);
    return { ok: false, error };
  }

  try {
    const { error } = await resend.emails.send(payload);
    if (error) {
      console.error(`Resend rejected ${label} email:`, error);
      return { ok: false, error: `${error.name}: ${error.message}` };
    }
    return { ok: true };
  } catch (err) {
    console.error(`Threw while sending ${label} email:`, err);
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

function parseWebhookColorIds(
  colorIdsValue: string | undefined,
  colorsValue: string | undefined
): CameraColorId[] {
  const colorIds = (colorIdsValue ?? '')
    .split(',')
    .map((value) => getCameraColorById(value.trim())?.id)
    .filter((colorId): colorId is CameraColorId => Boolean(colorId));

  if (colorIds.length > 0) {
    return colorIds;
  }

  return (colorsValue ?? '')
    .split(',')
    .map((value) => getCameraColorByName(value.trim())?.id)
    .filter((colorId): colorId is CameraColorId => Boolean(colorId));
}

function parseCheckoutQuantity(value: string | undefined): number | null {
  const quantity = Number(value);
  return Number.isInteger(quantity) && quantity > 0 ? quantity : null;
}

function getReservationId(session: Stripe.Checkout.Session): string | null {
  const value = session.metadata?.reservation_id;
  return value && value.trim() ? value : null;
}

function isPaymentLinkSession(session: Stripe.Checkout.Session): boolean {
  return typeof session.payment_link === 'string' && session.payment_link.trim().length > 0;
}

// Stripe levererar minst en gång – claima event-id:t innan mail skickas så att
// retries inte ger dubbla ordermail. Används för Payment Link-ordrar som inte
// går genom claim_checkout_inventory (som redan är idempotent per session).
async function claimWebhookEvent(
  eventId: string
): Promise<'claimed' | 'duplicate' | 'unavailable'> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return 'unavailable';

  const { error } = await supabase
    .from('processed_webhook_events')
    .insert({ event_id: eventId });

  if (!error) return 'claimed';
  if (error.code === '23505') return 'duplicate';

  console.error('Kunde inte registrera webhook-event för idempotens:', error);
  return 'unavailable';
}

type WebhookSecretCandidate = {
  name: string;
  value: string;
  livemode: boolean | null;
};

function getWebhookSecretCandidates(): WebhookSecretCandidate[] {
  const candidates: WebhookSecretCandidate[] = [];

  if (process.env.STRIPE_WEBHOOK_SECRET) {
    candidates.push({
      name: 'STRIPE_WEBHOOK_SECRET',
      value: process.env.STRIPE_WEBHOOK_SECRET,
      livemode: process.env.VERCEL_ENV === 'production' ? true : null,
    });
  }

  if (process.env.VERCEL_ENV !== 'production' && process.env.STRIPE_WEBHOOK_SECRET_TEST) {
    candidates.push({
      name: 'STRIPE_WEBHOOK_SECRET_TEST',
      value: process.env.STRIPE_WEBHOOK_SECRET_TEST,
      livemode: false,
    });
  }

  return candidates;
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  // Leveransadressen flyttades till collected_information.shipping_details i nyare API-versioner;
  // faller tillbaka på toppnivå (äldre versioner) och customer_details som sista utväg.
  const shipping =
    session.collected_information?.shipping_details ??
    (session as Stripe.Checkout.Session & {
      shipping_details?: { address?: Stripe.Address; name?: string };
    }).shipping_details;
  const addr = shipping?.address ?? session.customer_details?.address ?? null;

  const customerEmail = session.customer_details?.email ?? 'okänd';
  // Faktureringsnamnet kan saknas – faller tillbaka på leveransmottagarens namn.
  const customerName = session.customer_details?.name ?? shipping?.name ?? 'okänd';
  const recipientName = shipping?.name ?? customerName;
  // amount_total kan vara 0 (t.ex. 100 %-rabattkod). 0 är falsy, så jämför mot null
  // i stället – annars visas "okänd" för gratisordrar.
  const total =
    session.amount_total != null
      ? `${(session.amount_total / 100).toFixed(0)} kr`
      : 'okänd';
  const colors = (session.metadata?.colors ?? 'okänd').split(',').join(', ');
  const quantity = session.metadata?.quantity ?? '?';
  const adapter = session.metadata?.adapter === 'yes' ? 'Ja' : 'Nej';
  const orderId = session.id;

  const addressStr = addr
    ? [addr.line1, addr.line2, addr.postal_code, addr.city, addr.country]
        .filter(Boolean)
        .join(', ')
    : 'okänd';

  // Kunddata kommer från fritextfält i Stripe Checkout – escapa allt som
  // interpoleras in i HTML-mallarna. (Ämnesrader är inte HTML och escapas inte.)
  const safeName = escapeHtml(customerName);
  const safeEmail = escapeHtml(customerEmail);
  const safeRecipient = escapeHtml(recipientName);
  const safeAddress = escapeHtml(addressStr);
  const safeColors = escapeHtml(colors);

  const adminEmail = sendEmail({
    from: 'Smilo <noreply@smilo.se>',
    to: 'info@smilo.se',
    replyTo: customerEmail !== 'okänd' ? customerEmail : undefined,
    subject: `Ny beställning – ${customerName} (${total})`,
    html: orderEmailShell({
      heading: 'Ny beställning! 🎉',
      intro: 'En ny order har kommit in på Smilo. Här är detaljerna:',
      body:
        orderDetailRows([
          ['Order-ID', orderId],
          ['Kund', safeName],
          ['E-post', safeEmail],
          ['Mottagare', safeRecipient],
          ['Leveransadress', safeAddress],
          ['Antal kameror', quantity],
          ['Färger', safeColors],
          ['USB-C-adapter', adapter],
        ]) + orderTotalBox(total),
    }),
  }, 'admin');

  const customerEmailSend =
    customerEmail !== 'okänd'
      ? sendEmail({
          from: 'Smilo <noreply@smilo.se>',
          to: customerEmail,
          subject: 'Tack för din beställning hos Smilo!',
          html: orderEmailShell({
            heading: 'Tack för din beställning!',
            intro: `Hej ${safeName}, vi har tagit emot din beställning och betalningen har gått igenom. Vi packar och skickar din kamera så snart som möjligt. Du får ett mejl när paketet är på väg.`,
            body:
              `<p style="margin:0 0 10px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1.2px;color:#9a8f80">Din beställning</p>` +
              orderDetailRows([
                ['Antal kameror', quantity],
                ['Färger', safeColors],
                ['USB-C-adapter', adapter],
                ['Leveransadress', safeAddress],
              ]) +
              orderTotalBox(total) +
              `<p style="margin:26px 0 0;font-size:14px;line-height:1.65;color:#4a443d">Har du frågor om din order? Svara på det här mejlet eller kontakta oss på <a href="mailto:info@smilo.se" style="color:#6B7B4B;font-weight:500">info@smilo.se</a>.</p>
               <p style="margin:18px 0 0;font-size:12px;color:#b3a995">Ordernummer: ${orderId}</p>
               <p style="margin:20px 0 0;font-size:14px;color:#2a2018">Vänliga hälsningar,<br/>Smilo</p>`,
          }),
        }, 'kund')
      : Promise.resolve<{ ok: boolean; error?: string }>({ ok: true });

  const [adminResult, customerResult] = await Promise.all([
    adminEmail,
    customerEmailSend,
  ]);

  // Vi har redan svarat Stripe 200. Om ett bekräftelsemail fallerar larmar vi så att
  // en betald order aldrig tappas tyst.
  const failures: string[] = [];
  if (!adminResult.ok) failures.push(`Adminmail: ${adminResult.error}`);
  if (!customerResult.ok) failures.push(`Kundmail (${customerEmail}): ${customerResult.error}`);

  if (failures.length > 0) {
    console.error(`Order ${orderId} – e-post misslyckades:`, failures.join(' | '));
    await sendEmail(
      {
        from: 'Smilo <noreply@smilo.se>',
        to: 'info@smilo.se',
        subject: `⚠️ Order ${orderId} betald men bekräftelsemail misslyckades`,
        html: `
          <h2 style="font-family:sans-serif;color:#b00">Ett bekräftelsemail kunde inte skickas</h2>
          <p style="font-family:sans-serif;font-size:14px">
            Betalningen gick igenom men minst ett mail fallerade. Kontakta kunden manuellt.
          </p>
          <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
            <tr><td style="padding:6px 16px 6px 0;color:#666">Order-ID</td><td>${orderId}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#666">Kund</td><td>${safeName} (${safeEmail})</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#666">Totalt</td><td>${total}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top">Fel</td><td>${escapeHtml(failures.join(' | '))}</td></tr>
          </table>
        `,
      },
      'alert'
    );
  }
}

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  const webhookSecrets = getWebhookSecretCandidates();

  if (webhookSecrets.length === 0 || !stripeKey) {
    console.error(
      'Webhook saknar konfiguration:',
      !stripeKey && 'STRIPE_SECRET_KEY',
      webhookSecrets.length === 0 && 'STRIPE_WEBHOOK_SECRET'
    );
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2026-04-22.dahlia' });

  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  // Prova varje hemlighet – den första som verifierar signaturen vinner.
  let event: Stripe.Event | null = null;
  let matchedSecret: WebhookSecretCandidate | null = null;
  let lastError: unknown;
  for (const secret of webhookSecrets) {
    try {
      event = stripe.webhooks.constructEvent(body, signature, secret.value);
      matchedSecret = secret;
      break;
    } catch (err) {
      lastError = err;
    }
  }

  if (!event) {
    // Ingen av de konfigurerade hemligheterna matchade. Vanligaste orsaken: slutpunktens
    // signeringshemlighet i Stripe stämmer inte med någon av env-variablerna.
    console.error(
      'Webhook-signaturen kunde inte verifieras mot någon konfigurerad hemlighet ' +
        '(STRIPE_WEBHOOK_SECRET' +
        (process.env.VERCEL_ENV !== 'production' ? ' / STRIPE_WEBHOOK_SECRET_TEST' : '') +
        '):',
      lastError instanceof Error ? lastError.message : lastError
    );
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (
    !matchedSecret ||
    (matchedSecret.livemode !== null && event.livemode !== matchedSecret.livemode)
  ) {
    console.error('Webhook-läge matchar inte signeringshemligheten:', {
      eventLivemode: event.livemode,
      secret: matchedSecret?.name,
    });
    return NextResponse.json({ error: 'Webhook mode mismatch' }, { status: 400 });
  }

  console.log(
    `Webhook mottagen: ${event.type} (${event.livemode ? 'live' : 'test'})`
  );

  if (
    event.type === 'checkout.session.completed' ||
    event.type === 'checkout.session.async_payment_succeeded'
  ) {
    const session = event.data.object as Stripe.Checkout.Session;
    const fulfillable =
      event.type === 'checkout.session.async_payment_succeeded' ||
      session.payment_status === 'paid' ||
      session.payment_status === 'no_payment_required';

    if (!fulfillable) {
      const reservationId = getReservationId(session);
      if (!reservationId) {
        console.error(
          `Checkout-session ${session.id} inväntar async betalning men saknar reservation_id.`
        );
        return NextResponse.json({
          received: true,
          fulfillable: false,
          missingReservation: true,
        });
      }

      const pending = await markCheckoutInventoryPending(session.id, reservationId);
      if (!pending.ok || !pending.marked) {
        console.error(
          `Checkout-session ${session.id} inväntar async betalning men reservationen kunde inte låsas: ${pending.error}`
        );
        return NextResponse.json({ error: 'Inventory reservation pending failed' }, { status: 500 });
      }

      return NextResponse.json({ received: true, fulfillable: false, pendingPayment: true });
    }

    const colorIds = parseWebhookColorIds(session.metadata?.color_ids, session.metadata?.colors);
    const quantity = parseCheckoutQuantity(session.metadata?.quantity);

    if (!quantity || colorIds.length !== quantity) {
      console.error('Checkout-session saknar giltig lagerdata:', {
        eventId: event.id,
        sessionId: session.id,
        paymentLink: session.payment_link,
        quantity: session.metadata?.quantity,
        colorIds: session.metadata?.color_ids,
        colors: session.metadata?.colors,
      });

      if (isPaymentLinkSession(session)) {
        const eventClaim = await claimWebhookEvent(event.id);
        if (eventClaim === 'duplicate') {
          console.log(`Webhook-event ${event.id} redan hanterat – hoppar över.`);
          return NextResponse.json({ received: true, duplicate: true });
        }

        // 'unavailable' (DB nere) → skicka ändå; hellre risk för dubblettmail
        // än att en betald order aldrig når inkorgen.
        console.warn(
          `Checkout-session ${session.id} kommer fran Stripe Payment Link utan lager-metadata. ` +
            'Hoppar over lagerminskning och skickar ordermail som manuell order.'
        );
        after(() => handleCheckoutCompleted(session));
        return NextResponse.json({
          received: true,
          manualPaymentLink: true,
          inventorySkipped: true,
        });
      }

      return NextResponse.json({ error: 'Invalid checkout inventory metadata' }, { status: 500 });
    }

    const claim = await claimCheckoutInventory(session.id, getReservationId(session), colorIds);
    if (!claim.ok) {
      console.error(`Order ${session.id} betalad men lager kunde inte minskas: ${claim.error}`);
      return NextResponse.json({ error: 'Inventory update failed' }, { status: 500 });
    }

    if (claim.alreadyProcessed) {
      console.log(`Checkout-session ${session.id} redan lagerhanterad – hoppar över.`);
      return NextResponse.json({ received: true, duplicate: true });
    }

    // Lager är nu atomiskt minskat och sessionen claimad. Mailen skickas efter
    // 200-svaret så Stripe inte retryar bara för att e-postleverantören är långsam.
    after(() => handleCheckoutCompleted(session));
  }

  if (
    event.type === 'checkout.session.expired' ||
    event.type === 'checkout.session.async_payment_failed'
  ) {
    const session = event.data.object as Stripe.Checkout.Session;
    const release = await releaseCheckoutInventory(session.id, getReservationId(session));

    if (!release.ok) {
      console.error(`Kunde inte släppa lagerreservation för ${session.id}: ${release.error}`);
      return NextResponse.json({ error: 'Inventory release failed' }, { status: 500 });
    }

    return NextResponse.json({ received: true, released: release.released === true });
  }

  return NextResponse.json({ received: true });
}
