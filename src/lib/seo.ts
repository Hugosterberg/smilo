import { faqs } from '@/lib/faqs';

export const SITE_URL = 'https://smilo.se';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Smilo',
  url: SITE_URL,
  logo: `${SITE_URL}/smilo-icon.png`,
  email: 'info@smilo.se',
  description:
    'Smilo är en svensk digital retrokamera utan skärm – ett smart, återanvändbart alternativ till engångskameran.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'SE',
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Smilo',
  url: SITE_URL,
  inLanguage: 'sv-SE',
  publisher: { '@type': 'Organization', name: 'Smilo' },
};

export type ProductReviewStats = {
  averageRating: number;
  reviewCount: number;
};

export function createProductSchema(inStock = true, reviewStats?: ProductReviewStats) {
  const aggregateRating =
    reviewStats && reviewStats.reviewCount > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: String(reviewStats.averageRating),
            reviewCount: String(reviewStats.reviewCount),
          },
        }
      : {};

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Smilo retrokamera',
    description:
      'Digital retrokamera utan skärm – ta bilder i stunden och för enkelt över dem till mobilen via USB-C. Ett smart, återanvändbart alternativ till engångskameran.',
    image: [
      `${SITE_URL}/smilo-og.png`,
      `${SITE_URL}/assets/smilo-black-transparent.png`,
      `${SITE_URL}/assets/smilo-white-transparent.png`,
      `${SITE_URL}/assets/smilo-pink-transparent.png`,
      `${SITE_URL}/assets/smilo-brown-transparent.png`,
      `${SITE_URL}/assets/smilo-turquoise-transparent.png`,
      `${SITE_URL}/assets/smilo-green-transparent.png`,
    ],
    brand: { '@type': 'Brand', name: 'Smilo' },
    category: 'Digitalkamera',
    audience: { '@type': 'Audience', audienceType: 'Present, vardag, fest' },
    ...aggregateRating,
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/#produkt`,
      priceCurrency: 'SEK',
      price: '749',
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      priceValidUntil: '2026-12-31',
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', value: '49', currency: 'SEK' },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'SE',
        },
      },
    },
  };
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
};
