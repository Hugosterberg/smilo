import type { MetadataRoute } from 'next';

const SITE_URL = 'https://smilo.se';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/faq', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/engangskamera-vs-digital-retrokamera', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/leverans-faq', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/returer', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/kontakt', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/kopvillkor', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/integritetspolicy', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/spara-order', priority: 0.5, changeFrequency: 'monthly' },
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
