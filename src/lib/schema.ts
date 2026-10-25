// JSON-LD builders. Every entity has a stable @id; the feeder sites reference the same ids.
import { SITE_URL, CALLDELLA_URL, CONTACT_EMAIL } from './config';
import { CATEGORY_DEFINITION, PLANS } from './plans';

export const ORG_ID = `${CALLDELLA_URL}/#org`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const FOUNDER_ID = `${CALLDELLA_URL}/about/andy-norman#person`;
export const FOUNDER_URL = `${CALLDELLA_URL}/about/andy-norman`;

type Node = Record<string, unknown>;

export const graph = (...nodes: (Node | null | undefined | false)[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes.filter(Boolean),
});

export const ANTEK = {
  '@type': 'Organization',
  name: 'Antek Automation',
  url: 'https://www.antekautomation.com',
  sameAs: [
    'https://www.linkedin.com/company/antek-automation',
    'https://x.com/AntekAutomation',
    'https://www.youtube.com/@AntekAutomation',
    'https://www.instagram.com/antekautomation/',
    'https://www.facebook.com/people/Antek-Automation-Intelligent-Voice-Ai-Chat-Agents/61587195202811/',
    'https://www.crunchbase.com/organization/antek-automation',
    'https://clutch.co/profile/antek-automation',
  ],
};

export const orgNode = (): Node => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Call Della',
  alternateName: 'Della',
  url: CALLDELLA_URL,
  logo: { '@type': 'ImageObject', url: `${CALLDELLA_URL}/logo.png`, width: 512, height: 512 },
  image: `${CALLDELLA_URL}/og-default.png`,
  description: CATEGORY_DEFINITION,
  foundingDate: '2026',
  founder: { '@id': FOUNDER_ID },
  // Call Della has no profiles of its own yet; entity trust comes via the parent brand.
  parentOrganization: ANTEK,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: CONTACT_EMAIL,
    areaServed: 'US',
    availableLanguage: ['English'],
  },
  areaServed: { '@type': 'Country', name: 'United States' },
  knowsAbout: [
    'legal intake',
    'personal injury intake',
    'criminal defense intake',
    'immigration intake',
    'after-hours legal intake',
    'ABA Formal Opinion 512',
  ],
  sameAs: [],
});

export const websiteNode = (): Node => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: new URL(SITE_URL).host,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-US',
});

export const founderNode = (): Node => ({
  '@type': 'Person',
  '@id': FOUNDER_ID,
  name: 'Andy Norman',
  jobTitle: 'Founder',
  url: FOUNDER_URL,
  worksFor: { '@id': ORG_ID },
  knowsAbout: ['legal intake operations', 'voice AI', 'after-hours call handling'],
  sameAs: ['https://www.linkedin.com/in/andy-norman-ab78443a1', 'https://www.antekautomation.com/#founder'],
});

export type Citation = { name: string; url: string; publisher?: string; year?: string };

export const articleNode = (a: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  citations?: Citation[];
  type?: 'Article' | 'BlogPosting';
}): Node => ({
  '@type': a.type ?? 'Article',
  '@id': `${SITE_URL}${a.path}#article`,
  headline: a.headline,
  description: a.description,
  url: `${SITE_URL}${a.path}`,
  mainEntityOfPage: `${SITE_URL}${a.path}`,
  datePublished: a.datePublished,
  dateModified: a.dateModified,
  author: { '@id': FOUNDER_ID },
  publisher: { '@id': ORG_ID },
  image: `${SITE_URL}/og-default.png`,
  inLanguage: 'en-US',
  citation: a.citations?.map((c) => ({ '@type': 'CreativeWork', name: c.name, url: c.url, ...(c.publisher ? { publisher: c.publisher } : {}) })),
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.answer-block'] },
});

export const breadcrumbNode = (items: { name: string; href: string }[]): Node => ({
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', href: '/' }, ...items].map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: `${SITE_URL}${it.href === '/' ? '' : it.href}`,
  })),
});

export type QA = { q: string; a: string };

export const faqNode = (items: QA[]): Node => ({
  '@type': 'FAQPage',
  mainEntity: items.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});

export const offerNodes = (): Node[] =>
  PLANS.map((p) => ({
    '@type': 'Offer',
    '@id': `${CALLDELLA_URL}/pricing#${p.id}`,
    name: p.name,
    url: `${CALLDELLA_URL}/pricing`,
    priceCurrency: 'USD',
    ...(p.price !== null
      ? {
          price: String(p.price),
          priceSpecification: { '@type': 'UnitPriceSpecification', price: String(p.price), priceCurrency: 'USD', unitText: 'MONTH', referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' } },
          description: `${p.minutes} minutes a month. ${p.audience}. Overage $0.50 per minute.`,
        }
      : { description: 'Custom minutes, more than one practice area and a CRM webhook, priced to your volume.' }),
    availability: 'https://schema.org/InStock',
    seller: { '@id': ORG_ID },
  }));

export const serviceNode = (s: { path: string; name: string; description: string; serviceType?: string }): Node => ({
  '@type': 'Service',
  '@id': `${SITE_URL}${s.path}#service`,
  name: s.name,
  serviceType: s.serviceType ?? 'After-hours legal intake',
  description: s.description,
  url: `${SITE_URL}${s.path}`,
  provider: { '@id': ORG_ID },
  audience: { '@type': 'BusinessAudience', audienceType: 'Law firms' },
  areaServed: { '@type': 'Country', name: 'United States' },
  offers: PLANS.map((p) => ({ '@id': `${CALLDELLA_URL}/pricing#${p.id}` })),
});

// Hub pages: the page is a collection whose main entity is the list of its child pages.
export const collectionNode = (c: {
  path: string;
  name: string;
  description: string;
  items: { name: string; path: string }[];
}): Node => ({
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}${c.path}#page`,
  url: `${SITE_URL}${c.path}`,
  name: c.name,
  description: c.description,
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': ORG_ID },
  inLanguage: 'en-US',
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: c.items.length,
    itemListElement: c.items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: `${SITE_URL}${it.path}`,
    })),
  },
});
