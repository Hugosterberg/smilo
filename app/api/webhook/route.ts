import { NextRequest, NextResponse, after } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { getSupabaseAdmin } from '@/lib/supabase';
import { escapeHtml } from '@/lib/escape-html';

// Signaturverifieringen använder Node:s crypto synkront – tvinga Node-runtime
// (inte Edge) så constructEvent fungerar.
export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);

// Resend kastar inte vid API-fel – det returnerar { data, error }. Den här
// hjälparen normaliserar både kastade undantag och returnerade fel till ett enda
// resultat så att inget misslyckat utskick passerar tyst.
async function sendEmail(
  payload: Parameters<typeof resend.emails.send>[0],
  label: string
): Promise<{ ok: boolean; error?: string }> {
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

// Idempotens: "claimar" event-id:t i databasen. Returnerar true om händelsen redan
// är hanterad (då ska vi hoppa över). Stripe levererar minst en gång och kan skicka
// samma händelse flera gånger – utan detta kan kunden få dubbla bekräftelsemail.
async function isDuplicateEvent(eventId: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  // Ingen idempotenslagring konfigurerad – fortsätt hellre än att tappa mailet.
  if (!supabase) return false;

  const { error } = await supabase
    .from('processed_webhook_events')
    .insert({ event_id: eventId });

  if (!error) return false; // claim lyckades → ny händelse
  if (error.code === '23505') return true; // unique_violation → redan hanterad

  // Annat DB-fel: logga men blockera inte utskicket.
  console.error('Kunde inte claima webhook-event för idempotens:', error);
  return false;
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
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
    html: `
      <h2 style="font-family:sans-serif">Ny beställning på Smilo!</h2>
      <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
        <tr><td style="padding:6px 16px 6px 0;color:#666">Order-ID</td><td>${orderId}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#666">Kund</td><td>${safeName}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#666">E-post</td><td>${safeEmail}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#666">Mottagare</td><td>${safeRecipient}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#666">Leveransadress</td><td>${safeAddress}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#666">Antal kameror</td><td>${quantity}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#666">Färger</td><td>${safeColors}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#666">USB-C-adapter</td><td>${adapter}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#666">Totalt</td><td><strong>${total}</strong></td></tr>
      </table>
    `,
  }, 'admin');

  const customerEmailSend =
    customerEmail !== 'okänd'
      ? sendEmail({
          from: 'Smilo <noreply@smilo.se>',
          to: customerEmail,
          subject: 'Tack för din beställning hos Smilo!',
          html: `
            <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
              <h1 style="font-size:24px;font-weight:600;letter-spacing:-0.5px">Tack för din beställning!</h1>
              <p style="font-size:15px;line-height:1.6;color:#444">
                Hej ${safeName}, vi har tagit emot din beställning och betalningen har gått igenom.
                Vi packar och skickar din kamera så snart som möjligt – du får ett mejl när paketet är på väg.
              </p>
              <h2 style="font-size:16px;font-weight:600;margin-top:32px">Din beställning</h2>
              <table style="border-collapse:collapse;font-size:14px;width:100%">
                <tr><td style="padding:6px 16px 6px 0;color:#666">Antal kameror</td><td>${quantity}</td></tr>
                <tr><td style="padding:6px 16px 6px 0;color:#666">Färger</td><td>${safeColors}</td></tr>
                <tr><td style="padding:6px 16px 6px 0;color:#666">USB-C-adapter</td><td>${adapter}</td></tr>
                <tr><td style="padding:6px 16px 6px 0;color:#666">Leveransadress</td><td>${safeAddress}</td></tr>
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

  // En slutpunkt kan ta emot både test- och live-händelser, men varje läge har sin
  // egen signeringshemlighet. Vi provar alla konfigurerade hemligheter och låter den
  // som matchar avgöra. Lägg test-lägets whsec_… i STRIPE_WEBHOOK_SECRET_TEST.
  const webhookSecrets = [
    process.env.STRIPE_WEBHOOK_SECRET,
    process.env.STRIPE_WEBHOOK_SECRET_TEST,
  ].filter((s): s is string => Boolean(s));

  if (webhookSecrets.length === 0 || !stripeKey) {
    console.error(
      'Webhook saknar konfiguration:',
      !stripeKey && 'STRIPE_SECRET_KEY',
      webhookSecrets.length === 0 && 'STRIPE_WEBHOOK_SECRET / STRIPE_WEBHOOK_SECRET_TEST'
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
  let lastError: unknown;
  for (const secret of webhookSecrets) {
    try {
      event = stripe.webhooks.constructEvent(body, signature, secret);
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
        '(STRIPE_WEBHOOK_SECRET / STRIPE_WEBHOOK_SECRET_TEST):',
      lastError instanceof Error ? lastError.message : lastError
    );
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  console.log(
    `Webhook mottagen: ${event.type} (${event.livemode ? 'live' : 'test'})`
  );

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const eventId = event.id;

    // Svara Stripe direkt och skicka mailen efteråt. Då hinner Stripe aldrig timea
    // ut (vilket annars ger omförsök → dubbla mail). after() håller funktionen vid
    // liv tills bakgrundsarbetet är klart.
    after(async () => {
      if (await isDuplicateEvent(eventId)) {
        console.log(`Webhook ${eventId} redan hanterad – hoppar över.`);
        return;
      }
      await handleCheckoutCompleted(session);
    });
  }

  return NextResponse.json({ received: true });
}
