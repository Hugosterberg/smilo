import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakta oss',
  description:
    'Frågor om Smilo-kameran, din order eller något annat? Kontakta vårt svenska kundteam på info@smilo.se så hjälper vi dig.',
  alternates: { canonical: '/kontakt' },
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return children;
}
