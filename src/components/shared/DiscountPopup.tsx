'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Gift, Loader2, Check, Copy, Aperture } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { CameraFlash } from '@/components/shared/CameraFlash';
import { DISCOUNT_CODE, DISCOUNT_AMOUNT_LABEL } from '@/lib/discount';

const STORAGE_KEY = 'smilo_discount_popup_v1';
const SHOW_DELAY_MS = 8000;
// Har besökaren bara sett (men inte anmält sig) visas popupen igen efter en vecka.
const SHOW_AGAIN_AFTER_MS = 7 * 24 * 60 * 60 * 1000;

// L-formade fokusparenteser i sökarens hörn – som en kameras AF-ram.
function FocusBrackets() {
  // De övre hörnen ligger under readout-listen och stäng-krysset.
  const corners = [
    'left-4 top-11 border-l-2 border-t-2',
    'right-4 top-11 border-r-2 border-t-2',
    'left-4 bottom-4 border-l-2 border-b-2',
    'right-4 bottom-4 border-r-2 border-b-2',
  ];
  return (
    <>
      {corners.map((c, i) => (
        <motion.span
          key={c}
          aria-hidden
          className={`absolute h-5 w-5 rounded-[2px] border-smilo-gold/70 ${c}`}
          initial={{ opacity: 0, scale: 1.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: 'easeOut' }}
        />
      ))}
    </>
  );
}

export function DiscountPopup() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [alreadyMember, setAlreadyMember] = useState(false);
  const [flash, setFlash] = useState(0);

  useEffect(() => {
    if (window.location.pathname.startsWith('/tack') || window.location.pathname.startsWith('/admin')) return;

    const stored = localStorage.getItem(STORAGE_KEY);
    // Redan anmäld → visa aldrig igen. Annars: visa igen först när en vecka gått.
    if (stored === 'subscribed') return;
    const lastSeen = Number(stored);
    if (Number.isFinite(lastSeen) && Date.now() - lastSeen < SHOW_AGAIN_AFTER_MS) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const startTimer = () => {
      timer = setTimeout(() => {
        setOpen(true);
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
      }, SHOW_DELAY_MS);
    };

    // Krocka inte med cookie-bannern: om den fortfarande visas väntar vi tills
    // besökaren gjort sitt cookie-val innan vi armerar popupen.
    const host = window.location.hostname;
    const isLocalHost =
      host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local');
    const consent = localStorage.getItem('smilo-cookie-consent');
    const bannerPending =
      consent !== 'granted' &&
      consent !== 'denied' &&
      !isLocalHost &&
      Boolean(process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_CLARITY_ID);

    if (!bannerPending) {
      startTimer();
      return () => clearTimeout(timer);
    }

    const onConsent = () => startTimer();
    window.addEventListener('smilo-cookie-consent', onConsent, { once: true });
    return () => {
      window.removeEventListener('smilo-cookie-consent', onConsent);
      clearTimeout(timer);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'popup' }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? 'Något gick fel. Försök igen.');
        return;
      }

      setAlreadyMember(Boolean(data.alreadySubscribed));
      setFlash((n) => n + 1); // avfyra kamerablixten
      setSubscribed(true);
      localStorage.setItem(STORAGE_KEY, 'subscribed');
    } catch {
      toast.error('Något gick fel. Försök igen.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(DISCOUNT_CODE);
      toast.success('Rabattkoden kopierad!');
    } catch {
      // Vissa webbläsare blockerar clipboard – koden syns ändå på skärmen.
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md gap-0 overflow-hidden rounded-3xl border border-smilo-brown/10 p-0 bg-smilo-cream-light shadow-2xl [&>button]:right-3 [&>button]:top-3 [&>button]:z-40 [&>button]:text-smilo-cream/70 [&>button]:transition-colors [&>button]:hover:text-white [&>button]:focus:ring-smilo-gold">
        {/* Kamerablixt vid lyckad anmälan */}
        <CameraFlash trigger={flash} origin={{ x: 50, y: 24 }} />

        {/* Sökaren – kamerakroppen */}
        <div className="relative overflow-hidden bg-gradient-to-br from-smilo-brown via-smilo-olive-dark to-smilo-brown px-6 pb-7 pt-0 text-center text-smilo-cream-light">
          {/* Digital exponerings-readout */}
          <div className="-mx-6 mb-6 flex items-center justify-between bg-black/30 py-1.5 pl-5 pr-11 font-mono text-[10px] uppercase tracking-[0.18em] text-smilo-digital-light/80">
            <span className="flex items-center gap-1.5">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-red-500"
                animate={reduceMotion ? undefined : { opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />
              REC
            </span>
            <span className="text-smilo-cream/55">f/2.8 · 1/125 · ISO&nbsp;400</span>
          </div>

          <FocusBrackets />

          {/* Objektiv med rabatten i centrum */}
          <motion.div
            className="relative mx-auto h-[88px] w-[88px]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.1 }}
          >
            <div className="smilo-lens-glow absolute inset-0 rounded-full bg-smilo-gold/40 blur-xl" aria-hidden />
            {/* Fokusring med markeringar – roterar långsamt */}
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-full border-2 border-dashed border-smilo-cream/25"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
            />
            {/* Linsglas */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-smilo-olive-dark to-black ring-1 ring-white/10" aria-hidden />
            <div
              className="absolute inset-2 rounded-full"
              aria-hidden
              style={{
                background:
                  'radial-gradient(circle at 34% 28%, rgba(255,255,255,0.55), transparent 46%)',
              }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <Gift className="h-7 w-7 text-smilo-gold drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]" aria-hidden />
            </div>
          </motion.div>

          <motion.p
            className="smilo-retro-label mt-4 text-smilo-gold-soft"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Exklusivt för nya prenumeranter
          </motion.p>
          <motion.p
            className="mt-1 font-display text-4xl font-bold leading-none"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36 }}
          >
            {DISCOUNT_AMOUNT_LABEL} rabatt
          </motion.p>
        </div>

        {/* Innehåll */}
        <div className="relative px-6 py-6 sm:px-8">
          <AnimatePresence mode="wait">
            {!subscribed ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <DialogTitle className="text-center font-display text-xl font-bold text-smilo-brown">
                  Signa upp för uppdateringar från Smilo
                </DialogTitle>
                <DialogDescription className="mt-2 text-center text-sm leading-relaxed text-muted-foreground">
                  Få nyheter och inspiration i inkorgen, och {DISCOUNT_AMOUNT_LABEL}{' '}
                  rabatt på ditt första köp direkt.
                </DialogDescription>

                <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-2.5">
                  <label htmlFor="discount-email" className="sr-only">
                    E-postadress
                  </label>
                  <input
                    id="discount-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="din@email.se"
                    disabled={isLoading}
                    className="w-full rounded-full border border-smilo-brown/15 bg-white px-5 py-3 text-sm text-smilo-brown placeholder:text-smilo-brown/40 focus:border-smilo-olive focus:outline-none focus:ring-1 focus:ring-smilo-olive disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="smilo-shine smilo-flash-ring flex items-center justify-center gap-2 rounded-full bg-smilo-olive px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Exponerar…
                      </>
                    ) : (
                      <>
                        <Aperture className="h-4 w-4" aria-hidden />
                        Hämta min rabattkod
                      </>
                    )}
                  </button>
                </form>

                <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
                  Genom att anmäla dig godkänner du vår{' '}
                  <Link href="/integritetspolicy" className="underline hover:text-smilo-olive">
                    integritetspolicy
                  </Link>
                  . Avsluta när du vill.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                <DialogTitle className="font-display text-xl font-bold text-smilo-brown">
                  <span className="inline-flex items-center gap-2">
                    <Check className="h-5 w-5 text-smilo-olive" aria-hidden />
                    Bilden är tagen!
                  </span>
                </DialogTitle>
                <DialogDescription className="mx-auto mt-1.5 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {alreadyMember
                    ? 'Du är redan med i klubben! Här är din rabattkod, klicka på kortet för att kopiera den.'
                    : `Vi har mejlat din rabattkod${email ? ` till ${email}` : ''}. Klicka på kortet för att kopiera den.`}
                </DialogDescription>

                {/* Framkallat polaroid med rabattkoden */}
                <motion.button
                  type="button"
                  onClick={copyCode}
                  aria-label={`Kopiera rabattkoden ${DISCOUNT_CODE}`}
                  className="developed-photo-print group mx-auto mt-5 block w-60 rounded-[3px]"
                  initial={{ opacity: 0, y: 18, rotate: -7, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, rotate: -2, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 17, delay: 0.18 }}
                  whileHover={reduceMotion ? undefined : { rotate: 0, scale: 1.03 }}
                >
                  <div className="developed-photo-image relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-smilo-olive-dark to-black">
                    <div className="developed-photo-grain absolute inset-0 opacity-[0.18] mix-blend-overlay" aria-hidden />
                    <div className="absolute inset-0 grid place-items-center">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-smilo-gold/80">
                          Rabattkod
                        </p>
                        <p className="font-display text-3xl font-bold tracking-[0.18em] text-smilo-cream-light">
                          {DISCOUNT_CODE}
                        </p>
                        <p className="mt-1 text-[11px] text-smilo-cream/60">
                          {DISCOUNT_AMOUNT_LABEL} på första köpet
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="developed-photo-chin flex items-center justify-between px-1.5 pt-1.5">
                    <span className="developed-photo-date font-mono text-[10px] tracking-wider">
                      SMILO &rsquo;26
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-medium text-smilo-brown-light opacity-70 transition group-hover:opacity-100">
                      <Copy className="h-3 w-3" aria-hidden />
                      Kopiera
                    </span>
                  </div>
                </motion.button>

                <Link
                  href="/#produkt"
                  onClick={() => setOpen(false)}
                  className="smilo-shine mt-5 flex items-center justify-center rounded-full bg-smilo-olive px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 active:scale-95"
                >
                  Börja handla
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
