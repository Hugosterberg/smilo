import type { Metadata } from 'next'
import { Fraunces, Lora } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Analytics } from '@/components/layout/Analytics'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'Smilo – Retrokamera som överför bilder till mobilen',
  description: 'Smilo är en digital retrokamera utan skärm – fånga ögonblicket och för enkelt över bilderna till mobilen via USB-C. Fri frakt inom Sverige.',
  keywords: ['retro kamera', 'digital kamera', 'smilo', 'kamera utan skärm', 'analog känsla', 'minneskamera', 'present', 'bildöverföring'],
  authors: [{ name: 'Smilo' }],
  metadataBase: new URL('https://smilo.se'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Smilo – Retrokameran som låter dig leva i stunden',
    description: 'Digital retrokamera utan skärm. Ta bilder, lev vidare – och för över bilderna till mobilen när du vill. Fri frakt & fri retur inom Sverige.',
    type: 'website',
    locale: 'sv_SE',
    siteName: 'Smilo',
    url: 'https://smilo.se',
    images: [{ url: '/smilo-og.png', width: 1200, height: 1200 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smilo – Retrokameran som låter dig leva i stunden',
    description: 'Digital retrokamera utan skärm. Ta bilder, lev vidare – och för över bilderna till mobilen när du vill.',
    images: ['/smilo-og.png'],
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/smilo-icon.png', type: 'image/png' }],
    apple: '/smilo-icon.png',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className={`${fraunces.variable} ${lora.variable}`}>
      <body className="antialiased">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
