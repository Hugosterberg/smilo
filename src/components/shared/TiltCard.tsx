'use client';

import Tilt from 'react-parallax-tilt';
import { useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximal lutningsvinkel i grader. */
  max?: number;
  /** Skala vid hover. */
  scale?: number;
  /** Visa glansreflex (lins/blixt). */
  glare?: boolean;
}

// 3D-tilt med ljusreflex som följer muspekaren — ger kameran/produkten en
// premiumkänsla av glas och metall. Stängs av vid reducerad rörelse.
export function TiltCard({
  children,
  className,
  max = 12,
  scale = 1.04,
  glare = true,
}: TiltCardProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Tilt
      className={className}
      tiltMaxAngleX={max}
      tiltMaxAngleY={max}
      scale={scale}
      transitionSpeed={900}
      glareEnable={glare}
      glareMaxOpacity={glare ? 0.28 : 0}
      glareColor="hsl(45, 95%, 92%)"
      glarePosition="all"
      glareBorderRadius="16px"
      tiltReverse
    >
      {children}
    </Tilt>
  );
}
