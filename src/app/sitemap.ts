import { MetadataRoute } from 'next';
import { PAGES } from '@/data/pages';
import { SITE_URL } from '@/lib/config';

export const dynamic = 'force-static';

const url = (path: string) => `${SITE_URL}${path === '/' ? '' : path}`;

// lastModified comes from each page's dateModified, never the build time.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((p) => ({ url: url(p.path), lastModified: p.dateModified, priority: p.priority ?? 0.6 })),
  ];
}
