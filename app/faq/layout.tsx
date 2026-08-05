import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vanliga frågor om Smilo digitalkamera',
  description:
    'Svar på vanliga frågor om Smilo, den smarta digitalkameran utan skärm. Är det en engångskamera? Funkar den med iPhone och Android? Hur förs bilderna över?',
  alternates: { canonical: '/faq' },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
