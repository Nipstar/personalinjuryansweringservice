// Content manifest: one entry per URL. Titles, descriptions and dates live here only.
// Pages read metadata with pageMeta(); sitemap.ts and llms.txt are generated from it.
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/config';

export type PageEntry = {
  path: string;
  title: string; // full <title>, brand included where wanted
  description: string; // 140-160 chars
  primary: string;
  secondaries?: string[];
  section: 'core' | 'service' | 'guide' | 'compare' | 'legal';
  summary: string; // one line for llms.txt
  datePublished: string;
  dateModified: string;
  reviewer?: string;
  priority?: number;
};

const REVAMP = '2026-10-25';

export const PAGES: PageEntry[] = [
  // Placeholder entries: the site agent replaces these with the plan's pages.
  { path: '/', title: 'Home | Call Della', description: 'Placeholder description for the home page of this feeder site. The site agent replaces it with a 140 to 160 character description from the plan.', primary: '', section: 'core', summary: 'Home', datePublished: REVAMP, dateModified: REVAMP, priority: 1.0 },
  { path: '/privacy', title: 'Privacy Policy | Call Della', description: 'The Call Della privacy policy: what we collect from callers and site visitors, how call recordings and transcripts are stored, and who can access them.', primary: 'privacy', section: 'legal', summary: 'Privacy policy', datePublished: '2026-05-01', dateModified: REVAMP, priority: 0.3 },
  { path: '/terms', title: 'Terms of Service | Call Della', description: 'The Call Della terms of service: plans, billing, minutes, acceptable use and the limits of the service. Della takes intake and never gives legal advice.', primary: 'terms', section: 'legal', summary: 'Terms of service', datePublished: '2026-05-01', dateModified: REVAMP, priority: 0.3 },
];

export const page = (path: string): PageEntry => {
  const p = PAGES.find((x) => x.path === path);
  if (!p) throw new Error(`No manifest entry for ${path}`);
  return p;
};

// Metadata for a page from the manifest. `absolute` keeps the title as written.
export const pageMeta = (path: string, extra: Partial<Metadata> = {}): Metadata => {
  const p = page(path);
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  const image = '/og-default.png';
  return {
    title: { absolute: p.title },
    description: p.description,
    alternates: { canonical: path },
    openGraph: { title: p.title, description: p.description, url, type: p.section === 'core' || p.section === 'service' ? 'website' : 'article', images: [{ url: image, width: 1200, height: 630, alt: p.title }] },
    twitter: { card: 'summary_large_image', title: p.title, description: p.description, images: [image] },
    ...extra,
  };
};

// "25 October 2026" style for visible dates.
export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
