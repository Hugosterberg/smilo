import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import Stripe from 'stripe';
import {
  getCameraColorById,
  getCameraColorByName,
  getStockRequestIssues,
  type CameraColorId,
} from '@/lib/camera-colors';
import {
  readCameraInventory,
  attachCheckoutSessionToReservation,
  releaseCheckoutInventory,
  reserveCameraInventory,
} from '@/lib/camera-inventory';

const BUNDLE_PRICES: Record<number, number> = {
  1: 74900,   // 749 kr
  2: 134900,  // 1349 kr
  3: 189900,  // 1899 kr
  5: 299500,  // 2995 kr
};

const ADAPTER_PRICE_PER_UNIT = 9900; // 99 kr per adapter
const CHECKOUT_RESERVATION_MINUTES = 35;
const DEFAULT_SITE_URL = 'https://smilo.se';
const ALLOWED_CHECKOUT_HOSTS = new Set(['smilo.se', 'www.smilo.se', 'localhost', '127.0.0.1']);

// Singleton på modulnivå – återanvänder keep-alive-anslutningen mot Stripe
// mellan varma anrop så vi slipper en ny TLS-handskakning per köp.
let stripeClient: Stripe | null = null;

function getStripe(): Stripe | null {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-04-22.dahlia',
      telemetry: false,
    });
  }
  return stripeClient;
}

function parseCheckoutColorIds(body: { colorIds?: unknown; colors?: unknown }, quantity: number) {
  const colorIds = Array.isArray(body.colorIds)
    ? body.colorIds
        .slice(0, quantity)
        .map((colorId) => (typeof colorId === 'string' ? getCameraColorById(colorId)?.id : undefined))
        .filter((colorId): colorId is CameraColorId => Boolean(colorId))
    : [];

  if (colorIds.length > 0) {
    return colorIds;
  }

  return Array.isArray(body.colors)
    ? body.colors
        .slice(0, quantity)
        .map((colorName) =>
          typeof colorName === 'string' ? getCameraColorByName(colorName)?.id : undefined
        )
        .filter((colorId): colorId is CameraColorId => Boolean(colorId))
    : [];
}

function getCheckoutOrigin(req: NextRequest): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, '');
  }

  const origin = req.headers.get('origin');
  if (!origin) return DEFAULT_SITE_URL;

  try {
    const url = new URL(origin);
    if (ALLOWED_CHECKOUT_HOSTS.has(url.hostname)) {
      return url.origin;
    }
  } catch {
    return DEFAULT_SITE_URL;
  }

  return DEFAULT_SITE_URL;
}

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: 'Betalningsfunktionen är inte konfigurerad.' },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { quantity, adapterAdded } = body as {
      quantity: number;
      adapterAdded: boolean;
    };

    if (![1, 2, 3, 5].includes(quantity)) {
      return NextResponse.json({ error: 'Ogiltigt antal' }, { status: 400 });
    }

    const selectedColorIds = parseCheckoutColorIds(body, quantity);
    if (selectedColorIds.length !== quantity) {
      return NextResponse.json(
        { error: 'Välj en giltig färg för varje kamera.' },
        { status: 400 }
      );
    }

    const inventoryResult = await readCameraInventory();
    if (inventoryResult.error) {
      return NextResponse.json(
        { error: 'Lagerstatus kunde inte kontrolleras. Försök igen senare.' },
        { status: 503 }
      );
    }

    const stockIssues = getStockRequestIssues(selectedColorIds, inventoryResult.items);
    if (stockIssues.length > 0) {
      return NextResponse.json({ error: stockIssues[0].message }, { status: 409 });
    }

    const cameraLabel = quantity === 1 ? '1 kamera' : `${quantity} kameror`;
    const colorSummary = selectedColorIds
      .map((colorId) => getCameraColorById(colorId)?.name)
      .filter(Boolean)
      .join(', ');

    const reservationId = randomUUID();
    const reservationExpiresAt = new Date(Date.now() + CHECKOUT_RESERVATION_MINUTES * 60 * 1000);
    const reservation = await reserveCameraInventory(
      reservationId,
      selectedColorIds,
      reservationExpiresAt
    );

    if (!reservation.ok) {
      return NextResponse.json(
        { error: reservation.error ?? 'Det finns inte tillräckligt många kameror kvar.' },
        { status: 409 }
      );
    }

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

    const origin = getCheckoutOrigin(req);

    const shippingRateId = process.env.STRIPE_SHIPPING_RATE_ID;

    let session: Stripe.Checkout.Session;
    try {
      session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: lineItems,
        success_url: `${origin}/tack?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/#produkt`,
        expires_at: Math.floor(reservationExpiresAt.getTime() / 1000),
        locale: 'sv',
        // Visar fältet "Lägg till kampanjkod" i kassan (t.ex. NY50). Själva rabatten
        // definieras som en promotion code i Stripe – aldrig priser från klienten.
        allow_promotion_codes: true,
        shipping_address_collection: {
          allowed_countries: ['SE'],
        },
        ...(shippingRateId
          ? { shipping_options: [{ shipping_rate: shippingRateId }] }
          : {}),
        metadata: {
          quantity: String(quantity),
          colors: colorSummary,
          color_ids: selectedColorIds.join(','),
          reservation_id: reservationId,
          adapter: adapterAdded ? 'yes' : 'no',
        },
      });
    } catch (err) {
      await releaseCheckoutInventory(null, reservationId);
      throw err;
    }

    const attached = await attachCheckoutSessionToReservation(reservationId, session.id);
    if (!attached.ok) {
      await releaseCheckoutInventory(null, reservationId);
      try {
        await stripe.checkout.sessions.expire(session.id);
      } catch (err) {
        console.error('Kunde inte stänga Stripe-session efter misslyckad reservation:', err);
      }

      return NextResponse.json(
        { error: 'Kassan kunde inte öppnas. Försök igen.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { error: 'Något gick fel. Försök igen senare.' },
      { status: 500 }
    );
  }
}
