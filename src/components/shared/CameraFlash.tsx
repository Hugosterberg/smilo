'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CameraFlashProps {
  /** Ändra värdet för att avfyra en blixt (t.ex. ny färg, eller en räknare). */
  trigger: number | string;
  /** Avfyra inte vid första mountningen. */
  skipInitial?: boolean;
  className?: string;
}

// En kort blixtburst — vit kärna som tonar ut i amber, precis som en kamerablixt.
// Renderas som ett overlay och fångar inga pekhändelser.
export function CameraFlash({ trigger, skipInitial = true, className }: CameraFlashProps) {
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

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-30 overflow-hidden ${className ?? ''}`}
      aria-hidden
    >
      <AnimatePresence>
        {flashKey !== null && (
          <motion.div
            key={flashKey}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.95, 0], scale: [0.6, 1.15, 1.3] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', times: [0, 0.18, 1] }}
            onAnimationComplete={() => setFlashKey(null)}
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 45%, hsl(0 0% 100% / 0.95) 0%, hsl(48 95% 88% / 0.7) 28%, hsl(32 92% 60% / 0.25) 50%, transparent 72%)',
              mixBlendMode: 'screen',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
