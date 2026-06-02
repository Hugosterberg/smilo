import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Köpvillkor',
  description:
    'Smilos köpvillkor – betalning, leverans, ångerrätt och garanti vid köp av Smilo digitalkamera.',
  alternates: { canonical: '/kopvillkor' },
};

export default function KopvillkorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
