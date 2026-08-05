import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Smilo – Digital retrokamera',
    short_name: 'Smilo',
    description:
      'Smart digitalkamera utan skärm, ett återanvändbart alternativ till engångskameran.',
    start_url: '/',
    display: 'standalone',
    lang: 'sv-SE',
    background_color: '#f3ece0',
    theme_color: '#1f2937',
    icons: [
      {
        src: '/smilo-icon.png',
        sizes: 'any',
        type: 'image/png',
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
