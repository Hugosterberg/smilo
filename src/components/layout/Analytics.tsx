'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import Link from 'next/link';

const STORAGE_KEY = 'smilo-cookie-consent';
type Consent = 'granted' | 'denied';

// Laddar Google Analytics 4 och Microsoft Clarity, men FÖRST efter att
// besökaren aktivt godkänt cookies. Skripten renderas dessutom bara när
// respektive ID finns satt (NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_CLARITY_ID).
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const hasTracking = Boolean(gaId || clarityId);

  const [consent, setConsent] = useState<Consent | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'granted' || stored === 'denied') {
      setConsent(stored);
    }
  }, []);

  const choose = (value: Consent) => {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  };

  const loadScripts = mounted && hasTracking && consent === 'granted';
  const showBanner = mounted && hasTracking && consent === null;

  return (
    <>
      {loadScripts && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}

      {loadScripts && clarityId && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      )}

      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            role="dialog"
            aria-label="Samtycke till cookies"
            className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border border-smilo-cream/15 bg-smilo-brown/95 backdrop-blur-sm p-4 sm:p-5 shadow-2xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Cookie className="w-5 h-5 text-smilo-gold shrink-0 mt-0.5" aria-hidden />
                <p className="text-sm text-smilo-cream-light/90 leading-relaxed text-balance">
                  Vi använder cookies för att förstå hur sajten används och
                  förbättra din upplevelse. Läs mer i vår{' '}
                  <Link
                    href="/integritetspolicy"
                    className="underline hover:text-smilo-gold transition-colors"
                  >
                    integritetspolicy
                  </Link>
                  .
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => choose('denied')}
                  className="rounded-full border border-smilo-cream/20 text-smilo-cream-light/80 text-sm font-medium px-4 py-2 hover:bg-smilo-cream/10 transition"
                >
                  Endast nödvändiga
                </button>
                <button
                  onClick={() => choose('granted')}
                  className="rounded-full bg-smilo-gold text-smilo-brown text-sm font-semibold px-4 py-2 hover:brightness-105 active:scale-95 transition"
                >
                  Acceptera alla
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
