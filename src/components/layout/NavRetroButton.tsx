'use client'

import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

type NavRetroButtonVariant = 'default' | 'action'

interface NavRetroButtonProps {
  label: string
  variant?: NavRetroButtonVariant
  onClick: () => void
  className?: string
  large?: boolean
  'aria-label'?: string
}

export function NavRetroButton({
  label,
  variant = 'default',
  onClick,
  className,
  large = false,
  'aria-label': ariaLabel,
}: NavRetroButtonProps) {
  const isAction = variant === 'action'

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        'nav-retro-btn group',
        isAction ? 'nav-retro-btn-action' : 'nav-retro-btn-default',
        large && 'nav-retro-btn-large',
        className
      )}
      whileHover={{ y: -1 }}
      whileTap={{ y: 1, scale: 0.98 }}
    >
      {isAction && (
        <span className="relative flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden>
          <motion.span
            className="absolute inset-0 rounded-full bg-smilo-flash/40"
            animate={{ scale: [0.9, 1.25, 0.9], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <Zap className="relative h-3 w-3 fill-smilo-flash text-smilo-flash" strokeWidth={0} />
        </span>
      )}
      <span>{label}</span>
      {!large && (
        <span
          className={cn(
            'nav-retro-btn-led',
            isAction ? 'bg-smilo-flash' : 'bg-smilo-digital'
          )}
          aria-hidden
        />
      )}
    </motion.button>
  )
}
