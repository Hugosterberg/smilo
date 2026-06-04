import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Tack för din beställning – Smilo',
  robots: { index: false },
};

export default function TackPage() {
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
        <p className="text-muted-foreground leading-relaxed mb-8">
          Vi har tagit emot din beställning och skickar en orderbekräftelse till
          din e-postadress. Din Smilo är på väg!
        </p>

        <Button asChild variant="hero" size="lg" className="w-full sm:w-auto">
          <Link href="/">Tillbaka till Smilo.se</Link>
        </Button>
      </div>
    </main>
  );
}
