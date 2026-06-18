import crypto from 'node:crypto';
import fs from 'node:fs';

// Läs webhook-hemligheten direkt ur .env.local (samma som dev-servern använder).
const env = fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf8');
const secret = env.match(/^STRIPE_WEBHOOK_SECRET=(.+)$/m)?.[1].trim();
if (!secret) throw new Error('Hittade ingen STRIPE_WEBHOOK_SECRET i .env.local');

// En checkout.session.completed-händelse identisk med den Stripe skickar efter ett köp.
const event = {
  id: 'evt_test_' + crypto.randomBytes(8).toString('hex'),
  object: 'event',
  type: 'checkout.session.completed',
  livemode: false,
  created: Math.floor(Date.now() / 1000),
  data: {
    object: {
      id: 'cs_test_' + crypto.randomBytes(8).toString('hex'),
      object: 'checkout.session',
      amount_total: 134900,
      currency: 'sek',
      payment_status: 'paid',
      customer_details: {
        email: 'hugo.osterberg@hotmail.se',
        name: 'Hugo Österberg',
        address: {
          line1: 'Testgatan 1',
          line2: null,
          postal_code: '11122',
          city: 'Stockholm',
          country: 'SE',
        },
      },
      collected_information: {
        shipping_details: {
          name: 'Hugo Österberg',
          address: {
            line1: 'Testgatan 1',
            line2: null,
            postal_code: '11122',
            city: 'Stockholm',
            country: 'SE',
          },
        },
      },
      metadata: { quantity: '2', colors: 'Svart, Vit', color_ids: 'black,white', adapter: 'yes' },
    },
  },
};

const payload = JSON.stringify(event);
const timestamp = Math.floor(Date.now() / 1000);
const signature = crypto
  .createHmac('sha256', secret)
  .update(`${timestamp}.${payload}`, 'utf8')
  .digest('hex');

const port = process.env.PORT ?? '3000';
const res = await fetch(`http://localhost:${port}/api/webhook`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Stripe-Signature': `t=${timestamp},v1=${signature}`,
  },
  body: payload,
});

console.log('HTTP', res.status, await res.text());
