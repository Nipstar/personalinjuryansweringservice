// Single source of truth for plans, prices and what's included.
// Pages, schema and llms.txt read from here. Never type a price into a page.

export type Plan = {
  id: 'solo' | 'practice' | 'group';
  name: string;
  label: string;
  price: number | null; // USD per month; null = custom
  minutes: number | null;
  audience: string;
  popular: boolean;
};

export const PLANS: Plan[] = [
  { id: 'solo', name: 'Solo', label: 'SOLO · SOLO LAWYERS', price: 329, minutes: 300, audience: 'Solo lawyers', popular: false },
  { id: 'practice', name: 'Practice', label: 'PRACTICE · POPULAR', price: 598, minutes: 600, audience: 'Small and growing firms', popular: true },
  { id: 'group', name: 'Group', label: 'GROUP · MULTI-OFFICE', price: null, minutes: null, audience: 'Firms with more than one practice area or office', popular: false },
];

export const OVERAGE_PER_MINUTE = 0.5;
export const SETUP_FEE = 0;
export const DEMO_MINUTES = 30;

// Included on every plan.
export const INCLUDES = [
  "Della answering in your firm's name, nights, weekends and holidays",
  'The Call Della dashboard: every call as a dossier with summary, urgency score, recording and transcript',
  'Urgent-call email alerts to the attorney on call',
  'A morning brief by 7am in your time zone',
  'Recording disclosure set for your state',
  'Your own Della number, with forwarding and a test call before you go live',
];

export const GROUP_EXTRAS = ['Custom minutes, priced to your volume', 'More than one practice area', 'CRM webhook'];

// Feature flags: claims the copy may only make when true.
export const FLAGS = {
  smsAlerts: false,
  slackAlerts: false,
  crmIntegrations: false, // Filevine, CASEpeer, Lead Docket, Litify, Clio, MyCase
  spanishPI: false,
  spanishCriminal: false,
  spanishImmigration: true,
  soc2: false,
};

export const CATEGORY_DEFINITION =
  "Call Della is an after-hours intake specialist for law firms: personal injury, criminal defense and immigration. Della answers your firm's overnight phone, qualifies every caller, and delivers a triage-ready dossier by dawn.";

export const planByID = (id: Plan['id']) => PLANS.find((p) => p.id === id)!;
export const formatPrice = (p: Plan) => (p.price === null ? 'Custom' : `$${p.price}`);
