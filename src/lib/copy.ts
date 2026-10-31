// Copy strings built from plans.ts and FLAGS, so a price or flag change reaches every page.
import { FLAGS, GROUP_EXTRAS, OVERAGE_PER_MINUTE, SETUP_FEE, planByID, formatPrice } from './plans';
import { SITE } from './site';

export const SOLO = planByID('solo');
export const PRACTICE = planByID('practice');
export const GROUP = planByID('group');

export const ALERTS = FLAGS.smsAlerts ? 'email and text' : 'email';
export const OVERAGE = `$${OVERAGE_PER_MINUTE.toFixed(2)}`;

export const PRICE_ANSWER = `${SOLO.name} is ${formatPrice(SOLO)} a month with ${SOLO.minutes} minutes, built for solo lawyers. ${PRACTICE.name} is ${formatPrice(PRACTICE)} a month with ${PRACTICE.minutes} minutes. Both include the Call Della dashboard, urgent-call ${ALERTS} alerts and a morning brief by 7am. ${GROUP.name} is priced to your volume and adds ${GROUP_EXTRAS.map((g) => g[0].toLowerCase() + g.slice(1)).join(', ')}. Extra minutes are ${OVERAGE} each. Every plan is month-to-month${SETUP_FEE === 0 ? ' with no setup fee' : ''}.`;

export const FROM_PRICE = `From ${formatPrice(SOLO)} a month`;

export const forwardText = (opening: string) =>
  `${opening} Della, from Call Della, answers them in our name, takes the full injury intake and has a dossier on our desks by dawn, with urgent cases sent to the attorney on call. ${FROM_PRICE} with the dashboard and alerts included, month-to-month. See a demo: ${SITE.domain}`;

// Objection answers shared by the service pages (40 to 80 words each, verbatim in FAQ schema).
export const OBJECTIONS = {
  already: { q: 'We already have an answering service. Why change?', a: 'Most answering services take a message. Della takes the intake: what happened, the injuries, treatment, fault and insurance, with an urgency score on top. Put what reached your desk from last night beside a Della dossier and compare. If your current service already delivers that, keep it.' },
  person: { q: 'Will callers mind speaking to an AI?', a: "Della introduces herself by name, speaks calmly and asks one question at a time. If a caller asks whether she's an AI, she tells them. Every call is recorded, so you can hear exactly how each caller was treated. Book a demo, listen to a live injury call, and judge the conversation for yourself." },
  bar: { q: 'Is this allowed under bar rules?', a: "Della never gives legal advice, never quotes fees and never implies the firm has taken the case. She collects facts, and you decide what happens next. Every call opens with a recording disclosure set for your state. Call Della's compliance guides on calldella.com cover ABA Formal Opinion 512 and consent by state." },
  price: { q: 'What does it cost?', a: PRICE_ANSWER },
  software: { q: 'Does it work with our case management software?', a: FLAGS.crmIntegrations ? 'Every call reaches you as a dossier in the Call Della dashboard and as an email summary, and Della connects directly to the case management systems listed on calldella.com.' : `Every call reaches you as a dossier in the Call Della dashboard and as an email summary, so it works alongside any system. There are no direct case management integrations yet. The ${GROUP.name} plan includes a CRM webhook that can pass each dossier to your own system.` },
  forwarding: { q: 'How do calls reach Della?', a: "You forward your office line to Della after hours, when nobody answers, or both. Your number doesn't change. Before you go live, you get your own Della number, forwarding is set up with you, and you make a test call to hear her first." },
};
