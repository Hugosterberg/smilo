// Renderar strukturerad data (JSON-LD) som Google läser för rich results.
// Server-komponent — ingen 'use client'.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
