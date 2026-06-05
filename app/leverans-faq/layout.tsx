import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frakt & leverans',
  description:
    'Allt om frakt och leverans av din Smilo-kamera. 49 kr frakt inom Sverige och leverans inom 2–4 arbetsdagar.',
  alternates: { canonical: '/leverans-faq' },
};

export default function LeveransLayout({ children }: { children: React.ReactNode }) {
  return children;
}
