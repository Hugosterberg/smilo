import type { Metadata } from 'next'
import { Fraunces, Lora } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Analytics } from '@/components/layout/Analytics'
import { JsonLd } from '@/components/seo/JsonLd'
import { DiscountPopup } from '@/components/shared/DiscountPopup'
import { organizationSchema, websiteSchema } from '@/lib/seo'

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
  title: {
    default: 'Smilo – Digitalkamera & smart retrokamera utan skärm',
    template: '%s | Smilo',
  },
  description:
    'Smart digitalkamera utan skärm – ett återanvändbart alternativ till engångskameran. Ta bilden i stunden och för enkelt över den till mobilen via USB-C. 40 kr frakt inom Sverige, fri retur.',
  keywords: [
    'engångskamera',
    'digitalkamera',
    'digital kamera',
    'smart kamera',
    'kamera',
    'retrokamera',
    'retro kamera',
    'kamera utan skärm',
    'återanvändbar engångskamera',
    'minneskamera',
    'kamera present',
    'smilo',
  ],
  authors: [{ name: 'Smilo' }],
  creator: 'Smilo',
  publisher: 'Smilo',
  applicationName: 'Smilo',
  metadataBase: new URL('https://smilo.se'),
  alternates: { canonical: '/' },
  category: 'shopping',
  openGraph: {
    title: 'Smilo – Smart digitalkamera utan skärm',
    description:
      'Digitalkamera utan skärm och ett återanvändbart alternativ till engångskameran. Ta bilder, lev vidare – för över till mobilen via USB-C. 40 kr frakt inom Sverige, fri retur.',
    type: 'website',
    locale: 'sv_SE',
    siteName: 'Smilo',
    url: 'https://smilo.se',
    images: [{ url: '/smilo-og.png', width: 1200, height: 630, alt: 'Smilo digital retrokamera' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smilo – Smart digitalkamera utan skärm',
    description:
      'Digitalkamera utan skärm – ett återanvändbart alternativ till engångskameran. För över bilderna till mobilen via USB-C.',
    images: ['/smilo-og.png'],
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/smilo-icon.png', type: 'image/png' }],
    apple: '/smilo-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className={`${fraunces.variable} ${lora.variable}`}>
      <head>
        {/* Värm upp anslutningen till Stripe Checkout redan vid sidladdning så
            redirecten efter "köp"-klicket slipper DNS- och TLS-handskakning. */}
        <link rel="preconnect" href="https://checkout.stripe.com" />
        <link rel="dns-prefetch" href="https://checkout.stripe.com" />
      </head>
      <body className="antialiased">
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <Providers>{children}</Providers>
        <DiscountPopup />
        <Analytics />
      </body>
    </html>
  )
}
