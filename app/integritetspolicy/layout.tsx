import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Integritetspolicy',
  description:
    'Så hanterar Smilo dina personuppgifter och cookies. Läs vår integritetspolicy.',
  alternates: { canonical: '/integritetspolicy' },
};

export default function IntegritetspolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
