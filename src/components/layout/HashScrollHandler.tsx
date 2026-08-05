'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/** Scrollar till hash-ankare efter navigering till startsidan (t.ex. /#galleri från kontakt). */
export function HashScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/') return

    const scrollToHash = () => {
      const hash = window.location.hash
      if (!hash) return
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    scrollToHash()
    const t = window.setTimeout(scrollToHash, 100)

    // Fångar även hash-byten utan sidnavigering (t.ex. bakåt/framåt i historiken).
    window.addEventListener('hashchange', scrollToHash)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('hashchange', scrollToHash)
    }
  }, [pathname])

  return null
}
