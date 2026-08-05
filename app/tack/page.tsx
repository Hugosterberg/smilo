import Link from 'next/link';
import Image from 'next/image';
import Stripe from 'stripe';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Tack för din beställning – Smilo',
  robots: { index: false },
};

type OrderSummary = {
  email: string | null;
  quantity: string | null;
  colors: string | null;
  adapter: boolean;
  total: string | null;
  orderId: string;
};

async function getOrderSummary(sessionId: string | undefined): Promise<OrderSummary | null> {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!sessionId || !sessionId.startsWith('cs_') || !stripeKey) {
    return null;
  }

  try {
    const stripe = new Stripe(stripeKey, { apiVersion: '2026-04-22.dahlia' });
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const paid =
      session.payment_status === 'paid' ||
      session.payment_status === 'no_payment_required';
    if (!paid) return null;

    return {
      email: session.customer_details?.email ?? null,
      quantity: session.metadata?.quantity ?? null,
      colors: session.metadata?.colors?.split(',').join(', ') ?? null,
      adapter: session.metadata?.adapter === 'yes',
      total: session.amount_total != null ? `${(session.amount_total / 100).toFixed(0)} kr` : null,
      orderId: session.id,
    };
  } catch (err) {
    console.error('Kunde inte hämta checkout-session för /tack:', err);
    return null;
  }
}

export default async function TackPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const order = await getOrderSummary(session_id);

  return (
    <main className="min-h-[100dvh] bg-smilo-cream flex flex-col items-center justify-center px-6 py-10 text-center pt-[max(2.5rem,env(safe-area-inset-top))] pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-md">
        <Image
          src="/assets/smilo-retro-camera-2-black.png"
          alt="Smilo"
          width={448}
          height={448}
          priority
          className="h-44 w-44 sm:h-56 sm:w-56 object-contain mx-auto mb-4"
        />

        <div className="w-20 h-20 rounded-full bg-smilo-olive/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-smilo-olive" />
        </div>

        <h1 className="text-3xl font-display font-bold text-smilo-brown mb-3">
          Tack för din beställning!
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-6">
          {order?.email ? (
            <>
              Betalningen har gått igenom. En orderbekräftelse skickas till{' '}
              <span className="font-medium text-smilo-brown">{order.email}</span>.
              Din Smilo är på väg!
            </>
          ) : (
            <>
              Vi har tagit emot din beställning och skickar en orderbekräftelse till
              din e-postadress. Din Smilo är på väg!
            </>
          )}
        </p>

        {order && (
          <div className="mb-8 rounded-2xl bg-white p-5 text-left shadow-soft">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-smilo-brown/50">
              Din beställning
            </p>
            <dl className="space-y-2 text-sm">
              {order.quantity && (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Antal kameror</dt>
                  <dd className="font-medium text-smilo-brown">{order.quantity}</dd>
                </div>
              )}
              {order.colors && (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Färger</dt>
                  <dd className="font-medium text-smilo-brown text-right">{order.colors}</dd>
                </div>
              )}
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">USB-C-adapter</dt>
                <dd className="font-medium text-smilo-brown">{order.adapter ? 'Ja' : 'Nej'}</dd>
              </div>
              {order.total && (
                <div className="flex justify-between gap-4 border-t border-border pt-2">
                  <dt className="font-semibold text-smilo-brown">Totalt</dt>
                  <dd className="font-bold text-smilo-brown">{order.total}</dd>
                </div>
              )}
            </dl>
            <p className="mt-4 break-all text-[11px] text-muted-foreground/70">
              Ordernummer: {order.orderId}
            </p>
          </div>
        )}

        <Button asChild variant="hero" size="lg" className="w-full sm:w-auto">
          <Link href="/">Tillbaka till Smilo.se</Link>
        </Button>
        <p className="mt-4 text-xs text-muted-foreground">
          Frågor om din order?{' '}
          <Link href="/kontakt" className="underline underline-offset-4 hover:text-smilo-brown">
            Kontakta oss
          </Link>
        </p>
      </div>
    </main>
  );
}
