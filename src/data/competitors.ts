// Competitor facts for the /compare pages. Every fact comes from the competitor's own
// site, fetched on FETCHED, and carries the URL it came from. "Not published" means the
// page we fetched does not state it. Re-fetch and update FETCHED before changing a fact.
import type { Citation } from '@/lib/schema';
import { INCLUDES, GROUP_EXTRAS, OVERAGE_PER_MINUTE, SETUP_FEE, FLAGS, planByID, formatPrice } from '@/lib/plans';

export const FETCHED = '2026-10-25';

export type CriterionKey =
  | 'who'
  | 'hours'
  | 'price'
  | 'volume'
  | 'overage'
  | 'intake'
  | 'urgent'
  | 'integrations'
  | 'spanish'
  | 'contract';

export const CRITERIA: { key: CriterionKey; label: string }[] = [
  { key: 'who', label: 'Who answers' },
  { key: 'hours', label: 'Hours covered' },
  { key: 'price', label: 'Published price' },
  { key: 'volume', label: 'Minutes or calls included' },
  { key: 'overage', label: 'Overage' },
  { key: 'intake', label: 'Legal intake depth' },
  { key: 'urgent', label: 'Urgent-call handling' },
  { key: 'integrations', label: 'Integrations' },
  { key: 'spanish', label: 'Spanish' },
  { key: 'contract', label: 'Contract terms' },
];

export type Fact = { text: string; url: string };

export type Competitor = {
  slug: string; // route under /compare
  name: string;
  category: string; // the competitor's own term for what it sells
  sources: { label: string; url: string }[];
  facts: Record<CriterionKey, Fact>;
};

const solo = planByID('solo');
const practice = planByID('practice');
const group = planByID('group');
const usd = (n: number) => `$${n.toFixed(2)}`;

const spanishAreas = [
  FLAGS.spanishPI && 'personal injury',
  FLAGS.spanishCriminal && 'criminal defense',
  FLAGS.spanishImmigration && 'immigration',
].filter(Boolean) as string[];

// Call Della's column, built from plans.ts so a price change never leaves a stale page.
export const CALL_DELLA: Record<CriterionKey, string> = {
  who: 'AI. Della is an AI intake specialist and tells callers so if asked',
  hours: 'Nights, weekends and holidays (after hours only)',
  price: `${formatPrice(solo)}/month (${solo.name}), ${formatPrice(practice)}/month (${practice.name}), ${group.name} custom`,
  volume: `${solo.minutes} minutes (${solo.name}), ${practice.minutes} minutes (${practice.name}), ${group.name} custom`,
  overage: `${usd(OVERAGE_PER_MINUTE)} per minute`,
  intake: 'Practice-specific intake for personal injury, criminal defense and immigration only. Every call becomes a dossier with summary, urgency score, recording and transcript',
  urgent: `${INCLUDES[2]}${FLAGS.smsAlerts ? ' and SMS' : ''}, plus ${INCLUDES[3].toLowerCase()}`,
  integrations: FLAGS.crmIntegrations
    ? 'Practice-management integrations available'
    : `${GROUP_EXTRAS.includes('CRM webhook') ? `CRM webhook on the ${group.name} plan only` : 'None'}. No native Clio, MyCase or other practice-management integration`,
  spanish: spanishAreas.length ? `Spanish on ${spanishAreas.join(', ')} intake only` : 'English only',
  contract: `Month-to-month${SETUP_FEE === 0 ? ', no setup fee' : ''}`,
};

const SMITH_PRICING = 'https://smith.ai/pricing/receptionists';
const SMITH_AI = 'https://smith.ai/pricing/ai-receptionist';
const SMITH_HYBRID = 'https://smith.ai/pricing/hybrid-ai-human-receptionists';
const SMITH_LEGAL = 'https://smith.ai/industries/legal-law-firms-answering-service';

const AL_HOME = 'https://www.answeringlegal.com/';
const AL_PRICING = 'https://www.answeringlegal.com/answering-service-pricing-plans';
const AL_INTEGRATIONS = 'https://www.answeringlegal.com/integrations';

const POSH_PRICING = 'https://posh.com/pricing/';
const POSH_AI = 'https://posh.com/ai/';
const POSH_FAQS = 'https://posh.com/faqs/';
const POSH_ATTORNEY = 'https://posh.com/industry/attorney-answering-service/';

const RUBY_PRICING = 'https://www.ruby.com/plans-and-pricing/';
const RUBY_INTEGRATIONS = 'https://www.ruby.com/solutions/integrations/';
const RUBY_LEGAL = 'https://www.ruby.com/industries/legal/';

export const COMPETITORS: Competitor[] = [
  {
    slug: 'smith-ai',
    name: 'Smith.ai',
    category: 'virtual receptionists and AI receptionist',
    sources: [
      { label: 'smith.ai/pricing/receptionists', url: SMITH_PRICING },
      { label: 'smith.ai/pricing/ai-receptionist', url: SMITH_AI },
      { label: 'smith.ai/pricing/hybrid-ai-human-receptionists', url: SMITH_HYBRID },
      { label: 'smith.ai legal page', url: SMITH_LEGAL },
    ],
    facts: {
      who: { text: 'Your choice of human-first (live receptionists), AI-first or hybrid', url: SMITH_PRICING },
      hours: { text: '24/7, or only the hours you set', url: SMITH_PRICING },
      price: { text: 'Human-first: $300, $810 or $2,100/month, Enterprise custom. AI-first: free, $150 or $500/month. Hybrid presets from $2.50 per call', url: SMITH_PRICING },
      volume: { text: 'Human-first: 30, 90 or 300 calls. AI-first: 25 calls free, 75 calls on Pro, 300 calls on Enterprise', url: SMITH_AI },
      overage: { text: 'Human-first: $11.50, $10.50 or $8.50 per call over plan. AI-first free tier: $3.00 per call after 25', url: SMITH_PRICING },
      intake: { text: 'Lead screening, qualification and intake on every plan; practice-specific legal intake and conflict checks listed for law firms', url: SMITH_LEGAL },
      urgent: { text: 'Live transfers to set destinations (1, 2 or 10 free by plan, $15/month per extra destination)', url: SMITH_PRICING },
      integrations: { text: 'First CRM free, $0.50 per call for each additional CRM. Names Clio, HubSpot, Salesforce and Zapier', url: SMITH_PRICING },
      spanish: { text: 'Dedicated Spanish line add-on, $1.00 per call', url: SMITH_PRICING },
      contract: { text: 'Month-to-month. 30-day money-back guarantee for new clients, up to $1,000, overage excluded', url: SMITH_PRICING },
    },
  },
  {
    slug: 'answering-legal',
    name: 'Answering Legal',
    category: 'legal answering service',
    sources: [
      { label: 'answeringlegal.com', url: AL_HOME },
      { label: 'answeringlegal.com pricing page', url: AL_PRICING },
      { label: 'answeringlegal.com/integrations', url: AL_INTEGRATIONS },
    ],
    facts: {
      who: { text: 'Live, U.S.-based receptionists who answer only for lawyers', url: AL_HOME },
      hours: { text: '24/7/365', url: AL_HOME },
      price: { text: 'Not published. Prices are shown after you submit a contact form', url: AL_PRICING },
      volume: { text: 'Not published. Free trial of 400 minutes, no credit card required', url: AL_HOME },
      overage: { text: 'Not published', url: AL_PRICING },
      intake: { text: 'Custom legal intake for every new client caller, with first-stage intake and warm transfers', url: AL_HOME },
      urgent: { text: 'Transfers callers to you, pending your availability; detailed message after every call', url: AL_HOME },
      integrations: { text: '76 integrations, with direct ones for Clio Grow, MyCase, Lead Docket, Lawmatics, Smokeball, PracticePanther and Zapier', url: AL_INTEGRATIONS },
      spanish: { text: 'English or Spanish, U.S.-based bilingual staff', url: AL_HOME },
      contract: { text: 'No long-term contracts, no setup fees', url: AL_PRICING },
    },
  },
  {
    slug: 'posh',
    name: 'Posh',
    category: 'virtual receptionist service',
    sources: [
      { label: 'posh.com/pricing', url: POSH_PRICING },
      { label: 'posh.com/ai', url: POSH_AI },
      { label: 'posh.com/faqs', url: POSH_FAQS },
      { label: 'posh.com attorney page', url: POSH_ATTORNEY },
    ],
    facts: {
      who: { text: 'Live, U.S.-based receptionists, with optional AI-enabled plans that mix AI and live answering', url: POSH_AI },
      hours: { text: '24/7/365, or on demand when you choose', url: POSH_FAQS },
      price: { text: 'Live plans from $65/month to $1,900/month (prices effective 1 January 2026)', url: POSH_PRICING },
      volume: { text: 'From 0 to 1,000 receptionist minutes, for example 100 minutes for $215 or 500 minutes for $975', url: POSH_PRICING },
      overage: { text: '$1.90 to $2.30 per additional live minute; AI-enabled plans charge about half that for AI minutes ($1.10 on Vogue AI)', url: POSH_AI },
      intake: { text: 'Customized legal intake on your practice areas; supports your internal conflict check process', url: POSH_ATTORNEY },
      urgent: { text: 'Transfers when you set your status to "Accepting Transfers" in the Posh app', url: POSH_FAQS },
      integrations: { text: 'Via the Posh portal. Names Rocket Matter, Calendly, Acuity Scheduling and Zapier, and covers Clio set-up in its FAQ', url: POSH_FAQS },
      spanish: { text: 'English and Spanish guaranteed at no extra charge, Monday to Friday, 9am to 6pm Eastern; outside those hours when a bilingual receptionist is available', url: POSH_FAQS },
      contract: { text: 'Month-to-month. Free trial of 7 days or 250 minutes, whichever comes first', url: POSH_PRICING },
    },
  },
  {
    slug: 'ruby',
    name: 'Ruby',
    category: 'virtual receptionist service',
    sources: [
      { label: 'ruby.com/plans-and-pricing', url: RUBY_PRICING },
      { label: 'ruby.com/solutions/integrations', url: RUBY_INTEGRATIONS },
      { label: 'ruby.com legal page', url: RUBY_LEGAL },
    ],
    facts: {
      who: { text: 'Live receptionists ("100% live"), with AI-assisted call flows and transcripts', url: RUBY_PRICING },
      hours: { text: '24/7, including after hours, weekends and holidays', url: RUBY_PRICING },
      price: { text: '$250, $395, $720 or $1,725/month; larger plans through sales', url: RUBY_PRICING },
      volume: { text: '50, 100, 200 or 500 receptionist minutes', url: RUBY_PRICING },
      overage: { text: 'Not published on the pricing page', url: RUBY_PRICING },
      intake: { text: 'Lead qualification and intake, with the information collected set by you; scheduling and payment collection', url: RUBY_LEGAL },
      urgent: { text: 'No specific urgent-call process published; personalized call handling, call forwarding, app and email notifications', url: RUBY_PRICING },
      integrations: { text: 'Native Clio integration; also lists 8am MyCase, Lawmatics, HubSpot and Zapier-powered connections', url: RUBY_INTEGRATIONS },
      spanish: { text: '24/7 Spanish and bilingual call handling available', url: RUBY_PRICING },
      contract: { text: 'Contract length not published; no activation, onboarding or setup fees', url: RUBY_PRICING },
    },
  },
];

export const competitor = (slug: string) => COMPETITORS.find((c) => c.slug === slug)!;

// Each competitor page we fetched, as Article citations.
export const competitorCitations = (c: Competitor): Citation[] =>
  c.sources.map((s) => ({ name: `${c.name}: ${s.label}`, url: s.url, publisher: c.name, year: FETCHED.slice(0, 4) }));
