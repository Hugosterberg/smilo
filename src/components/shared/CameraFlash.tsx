'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CameraFlashProps {
  /** Ändra värdet för att avfyra en blixt (t.ex. ny färg, eller en räknare). */
  trigger: number | string;
  /** Avfyra inte vid första mountningen. */
  skipInitial?: boolean;
  /** Var blixten utgår ifrån, i procent av overlay-ytan (kamerans blixtlampa). */
  origin?: { x: number; y: number };
  className?: string;
}

// En kort, realistisk kamerablixt: ett intensivt vitt xenon-sken som slår ut
// från kamerans blixtlampa, med bloom och ett svagt stjärnkors. Renderas som
// overlay och fångar inga pekhändelser.
export function CameraFlash({
  trigger,
  skipInitial = true,
  origin = { x: 56, y: 33 },
  className,
}: CameraFlashProps) {
  const reduceMotion = useReducedMotion();
  const [flashKey, setFlashKey] = useState<number | null>(null);
  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    if (isFirst) {
      setIsFirst(false);
      if (skipInitial) return;
    }
    setFlashKey(Date.now());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  if (reduceMotion) return null;

  const { x, y } = origin;
  const pos = `${x}% ${y}%`;

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-30 overflow-hidden ${className ?? ''}`}
      aria-hidden
    >
      <AnimatePresence>
        {flashKey !== null && (
          <motion.div
            key={flashKey}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, times: [0, 0.06, 0.25, 1], ease: 'easeOut' }}
            onAnimationComplete={() => setFlashKey(null)}
          >
            {/* Kort helbilds-sken — som när blixten lyser upp rummet */}
            <motion.div
              className="absolute inset-0"
              style={{
                mixBlendMode: 'screen',
                background: `radial-gradient(circle at ${pos}, rgba(255,255,255,0.85) 0%, rgba(244,248,255,0.5) 35%, rgba(255,255,255,0.12) 70%, rgba(255,255,255,0) 100%)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.95, 0] }}
              transition={{ duration: 0.6, times: [0, 0.08, 0.6], ease: 'easeOut' }}
            />

            {/* Intensiv hetfläck + bloom som slår ut från blixtlampan */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 0.12 }}
              animate={{ scale: [0.12, 1, 1.7] }}
              transition={{ duration: 0.6, times: [0, 0.16, 1], ease: 'easeOut' }}
              style={{
                transformOrigin: pos,
                mixBlendMode: 'screen',
                background: `radial-gradient(circle at ${pos}, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 6%, rgba(230,242,255,0.92) 12%, rgba(255,249,231,0.5) 22%, rgba(255,255,255,0) 40%)`,
              }}
            />

            {/* Horisontell stjärnstråle från blixten */}
            <motion.div
              className="absolute"
              style={{
                top: `${y}%`,
                left: 0,
                right: 0,
                height: '2px',
                transformOrigin: `${x}% 50%`,
                transform: 'translateY(-50%)',
                mixBlendMode: 'screen',
                background: `linear-gradient(90deg, transparent 8%, rgba(255,255,255,0.85) ${x}%, transparent 92%)`,
              }}
              initial={{ scaleX: 0.1, opacity: 0 }}
              animate={{ scaleX: [0.1, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, times: [0, 0.18, 1], ease: 'easeOut' }}
            />

            {/* Vertikal stjärnstråle från blixten */}
            <motion.div
              className="absolute"
              style={{
                left: `${x}%`,
                top: 0,
                bottom: 0,
                width: '2px',
                transformOrigin: `50% ${y}%`,
                transform: 'translateX(-50%)',
                mixBlendMode: 'screen',
                background: `linear-gradient(180deg, transparent 14%, rgba(255,255,255,0.75) ${y}%, transparent 86%)`,
              }}
              initial={{ scaleY: 0.1, opacity: 0 }}
              animate={{ scaleY: [0.1, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, times: [0, 0.18, 1], ease: 'easeOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
