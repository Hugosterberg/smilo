import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Returer & byten',
  description:
    '30 dagars öppet köp och fri retur inom Sverige på din Smilo-kamera. Så här gör du för att returnera eller byta.',
  alternates: { canonical: '/returer' },
};

export default function ReturerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
