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
  { path: '/', title: 'Personal Injury Answering Service for Law Firms | Call Della', description: "Della answers your firm's after-hours injury calls, qualifies every caller and has a triage-ready dossier on your desk by dawn. Book a demo to hear her live.", primary: 'personal injury answering service', secondaries: ['personal injury law firm answering service', 'personal injury attorney answering service'], section: 'core', summary: 'After-hours personal injury intake for law firms: every caller answered, qualified and filed as a dossier by 7am', datePublished: REVAMP, dateModified: REVAMP, priority: 1.0 },
  { path: '/personal-injury-intake', title: 'Personal Injury Intake, Day and Night | Call Della', description: 'What a complete first-call personal injury intake captures, how firms cover it after 6pm, and how Della compares with hiring a night intake specialist.', primary: 'personal injury intake', secondaries: ['personal injury intake specialist', 'personal injury intake services'], section: 'service', summary: 'What a complete first-call PI intake captures, and Della against hiring a night intake specialist', datePublished: REVAMP, dateModified: REVAMP, priority: 0.9 },
  { path: '/intake-automation', title: 'Personal Injury Intake Automation for Law Firms | Call Della', description: 'Which parts of personal injury intake to automate (first call, qualifying, routing, follow-up) and which stay with people: advice, fees and the sign-up.', primary: 'personal injury intake automation', secondaries: ['law firm intake follow up automation', 'how to automate personal injury intake', 'personal injury intake ai agent'], section: 'service', summary: 'What to automate in PI intake and what stays with the attorney', datePublished: REVAMP, dateModified: REVAMP, priority: 0.8 },
  { path: '/mass-tort-intake', title: 'Mass Tort Intake: What It Is and How Firms Run It | Call Della', description: 'What mass tort intake is, how firms screen inbound callers against campaign criteria, handle volume spikes and night calls, and what to ask an intake vendor.', primary: 'mass tort intake', secondaries: ['mass tort intake services', 'mass tort legal intake', 'what is mass tort intake', 'mass tort intake call center'], section: 'guide', summary: 'Guide: what mass tort intake is and how firms run criteria screening, spikes and night calls', datePublished: REVAMP, dateModified: REVAMP, priority: 0.8 },
  { path: '/pricing', title: 'Personal Injury Answering Service Pricing | Call Della', description: "Per-minute, per-call and flat pricing for personal injury answering services explained, with Della's plans and a dated comparison against four services.", primary: 'personal injury answering service pricing', secondaries: ['personal injury intake service comparison'], section: 'service', summary: "How PI answering services charge, Della's plans and a dated comparison", datePublished: REVAMP, dateModified: REVAMP, priority: 0.9 },
  { path: '/intake-form', title: 'Free Personal Injury Intake Form Template and PDF | Call Della', description: 'The questions Della asks on every personal injury call, laid out as an intake form you can read, print or save as a PDF, plus an editable template by email.', primary: 'personal injury intake form template', secondaries: ['personal injury intake form pdf', 'personal injury intake form'], section: 'guide', summary: 'The PI intake questions Della asks on every call, as a printable form, with an editable template by email', datePublished: REVAMP, dateModified: REVAMP, priority: 0.7 },
  { path: '/about', title: 'About: Who Built Della and Why | Call Della', description: 'Call Della was founded by Andy Norman and is built by Antek Automation on the Retell AI voice platform. Why it exists, who runs it and what Della never does.', primary: 'about call della', section: 'core', summary: 'Who built Della, why, and what she never does', datePublished: REVAMP, dateModified: REVAMP, priority: 0.5 },
  { path: '/contact', title: 'Contact Call Della | Call Della', description: 'Ask Call Della about after-hours legal intake for your firm: practice areas, call volume, plans and setup. We reply by email, usually the same working day.', primary: 'contact call della', section: 'core', summary: 'Ask a question or request a callback by email', datePublished: '2026-10-31', dateModified: '2026-10-31', priority: 0.4 },
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
