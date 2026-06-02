import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spåra din order',
  description:
    'Spåra din Smilo-beställning och se status på leveransen.',
  alternates: { canonical: '/spara-order' },
};

export default function SparaOrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
