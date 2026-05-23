'use client'

import Image from 'next/image'
import { Smartphone, ArrowRight, Cable } from 'lucide-react'
import { cn } from '@/lib/utils'

const ROTATIONS = [-2, 1.5, -1, 2.5, -1.5, 1, -2.5, 2] as const

const FILM_DATES = [
  "'24 08 12",
  "'25 01 03",
  "'24 11 27",
  "'25 02 14",
  "'24 09 06",
  "'25 03 21",
  "'24 12 31",
  "'25 04 08",
] as const

interface DevelopedPhotoProps {
  src: string
  alt: string
  index?: number
  aspect?: 'landscape' | 'square'
  className?: string
  showTransfer?: boolean
  tilt?: boolean
  /** true = ingen sepia/korn — visar kamerans faktiska skärpa */
  preserveQuality?: boolean
  sizes?: string
  priority?: boolean
}

export function DevelopedPhoto({
  src,
  alt,
  index = 0,
  aspect = 'landscape',
  className,
  showTransfer = true,
  tilt = false,
  preserveQuality = true,
  sizes,
  priority = false,
}: DevelopedPhotoProps) {
  const rotation = tilt ? ROTATIONS[index % ROTATIONS.length] : 0
  const dateStamp = FILM_DATES[index % FILM_DATES.length]

  return (
    <figure
      className={cn('developed-photo group', className)}
      style={{ rotate: `${rotation}deg` }}
    >
      <div className="developed-photo-print">
        <div
          className={cn(
            'developed-photo-image relative overflow-hidden bg-smilo-brown/5',
            aspect === 'square' ? 'aspect-square' : 'aspect-[4/3]'
          )}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={
              sizes ??
              (aspect === 'square'
                ? '(min-width: 1280px) 320px, (min-width: 1024px) 28vw, (min-width: 768px) 33vw, 45vw'
                : '(min-width: 1024px) 16rem, (min-width: 768px) 14rem, 11rem')
            }
            className={cn(
              'object-cover',
              preserveQuality
                ? 'contrast-[1.01] saturate-[1.02]'
                : 'sepia-[0.12] contrast-[1.02]'
            )}
          />

          {!preserveQuality && (
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-multiply developed-photo-grain"
              aria-hidden
            />
          )}

          {showTransfer && (
            <div
              className="absolute top-1.5 right-1.5 z-10 flex items-center gap-0.5 rounded-sm border border-smilo-digital/30 bg-smilo-digital-light/95 px-1 py-0.5 shadow-sm backdrop-blur-sm sm:top-2 sm:right-2 sm:gap-1 sm:px-1.5 sm:py-1"
              title="Förs över till mobilen via USB-C"
            >
              <Cable className="h-3 w-3 shrink-0 text-smilo-digital" aria-hidden />
              <ArrowRight className="h-2.5 w-2.5 shrink-0 text-smilo-flash" aria-hidden />
              <Smartphone className="h-3 w-3 shrink-0 text-smilo-digital" aria-hidden />
              <span className="hidden font-heading text-[8px] uppercase tracking-[0.14em] text-smilo-digital sm:inline">
                Mobil
              </span>
            </div>
          )}

          <span
            className="developed-photo-date absolute bottom-1.5 right-2 z-10 font-mono text-[10px] font-semibold tracking-wide"
            aria-hidden
          >
            {dateStamp}
          </span>
        </div>

        <div className="developed-photo-chin flex flex-nowrap items-center justify-between gap-1 px-2 pt-2">
          <span className="min-w-0 truncate font-mono text-[8px] uppercase tracking-wider text-smilo-brown/35 sm:text-[9px] sm:tracking-widest">
            Smilo · digital
          </span>
          {showTransfer && (
            <span className="flex shrink-0 items-center gap-0.5 whitespace-nowrap font-heading text-[8px] uppercase tracking-[0.1em] text-smilo-digital">
              <span className="inline-block h-1 w-1 shrink-0 rounded-full bg-smilo-digital animate-pulse" aria-hidden />
              {'USB\u2011C'}
            </span>
          )}
        </div>
      </div>

      {showTransfer && (
        <figcaption className="sr-only">
          {alt}. Bilden kan föras över till mobilen via USB-C.
        </figcaption>
      )}
    </figure>
  )
}
