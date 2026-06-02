import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const BUNDLE_PRICES: Record<number, number> = {
  1: 74900,   // 749 kr
  2: 134900,  // 1349 kr
  3: 189900,  // 1899 kr
  5: 299500,  // 2995 kr
};

const ADAPTER_PRICE_PER_UNIT = 9900; // 99 kr per adapter

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'Betalningsfunktionen är inte konfigurerad.' },
      { status: 503 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2026-04-22.dahlia',
  });

  try {
    const body = await req.json();
    const { quantity, colors, adapterAdded } = body as {
      quantity: number;
      colors: string[];
      adapterAdded: boolean;
    };

    if (![1, 2, 3, 5].includes(quantity)) {
      return NextResponse.json({ error: 'Ogiltigt antal' }, { status: 400 });
    }

    const cameraLabel = quantity === 1 ? '1 kamera' : `${quantity} kameror`;
    const colorSummary = colors.slice(0, quantity).join(', ');

    const lineItems = [
      {
        price_data: {
          currency: 'sek',
          product_data: {
            name: `Smilo retro kamera – ${cameraLabel}`,
            description: `Färg: ${colorSummary}`,
          },
          unit_amount: BUNDLE_PRICES[quantity],
        },
        quantity: 1,
      },
    ];

    if (adapterAdded) {
      lineItems.push({
        price_data: {
          currency: 'sek',
          product_data: {
            name: 'USB-C-adapter',
            description: 'Krävs för iPhone 14 eller äldre',
          },
          unit_amount: ADAPTER_PRICE_PER_UNIT,
        },
        quantity: quantity,
      });
    }

    const origin = req.headers.get('origin') ?? 'https://smilo.se';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${origin}/tack?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#produkt`,
      locale: 'sv',
      shipping_address_collection: {
        allowed_countries: ['SE'],
      },
      metadata: {
        quantity: String(quantity),
        colors: colors.slice(0, quantity).join(','),
        adapter: adapterAdded ? 'yes' : 'no',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { error: 'Något gick fel. Försök igen senare.' },
      { status: 500 }
    );
  }
}
