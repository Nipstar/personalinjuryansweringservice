import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PaperTexture } from '@/components/PaperTexture';
import { CTAButton } from '@/components/CTAButton';
import { FAQ } from '@/components/FAQ';
import { JsonLd } from '@/components/JsonLd';
import { Prose, Table, SRC } from '@/components/Prose';
import { MissedCallSection } from '@/components/MissedCallSection';
import { SampleDossier } from '@/components/SampleDossier';
import { WhatYouGet } from '@/components/WhatYouGet';
import { ForwardBox } from '@/components/ForwardBox';
import { pageMeta, page, formatDate } from '@/data/pages';
import { graph, serviceNode, type QA } from '@/lib/schema';
import { planByID, formatPrice, OVERAGE_PER_MINUTE, SETUP_FEE, DEMO_MINUTES, FLAGS, GROUP_EXTRAS } from '@/lib/plans';
import { calldella } from '@/lib/utm';
import { SITE } from '@/lib/site';

export const metadata: Metadata = pageMeta('/');

const C = 'home';
const solo = planByID('solo');
const practice = planByID('practice');
const group = planByID('group');
const alerts = FLAGS.smsAlerts ? 'email and text' : 'email';

const faq: QA[] = [
  {
    q: 'We already have an answering service. Why change?',
    a: 'Most answering services take a message. Della takes the intake: what happened, the injuries, treatment, fault and insurance, with an urgency score on top. Call your current service and book a Della demo in the same week, and compare what would reach your desk the next morning.',
  },
  {
    q: 'Will callers mind speaking to an AI?',
    a: "Della introduces herself by name, speaks calmly and asks one question at a time. If a caller asks whether she's an AI, she tells them. Book a demo, listen to a live call for a personal injury caller, and judge the conversation for yourself.",
  },
  {
    q: 'Is this allowed under bar rules?',
    a: "Della never gives legal advice, never quotes fees and never implies the firm has taken the case. She collects facts; you decide what happens next. Every call opens with a recording disclosure set for your state. For the detail, see Call Della's compliance guides, including ABA Formal Opinion 512.",
  },
  {
    q: 'What does it cost?',
    a: `${solo.name} is ${formatPrice(solo)} a month with ${solo.minutes} minutes, built for solo lawyers. ${practice.name} is ${formatPrice(practice)} a month with ${practice.minutes} minutes. Both include the Call Della dashboard, urgent-call alerts and a morning brief by 7am. ${group.name} is priced to your volume. Extra minutes are $${OVERAGE_PER_MINUTE.toFixed(2)} each. Month-to-month${SETUP_FEE === 0 ? ', no setup fee' : ''}.`,
  },
  {
    q: 'Does it work with our case management software?',
    a: FLAGS.crmIntegrations
      ? 'Every call reaches you as a dossier in the Call Della portal and as an email summary, and Della connects directly to the case management systems listed on calldella.com.'
      : `Every call reaches you as a dossier in the Call Della portal and as an email summary, so it works alongside any system. There are no direct case management integrations yet. On the ${group.name} plan, a ${GROUP_EXTRAS.includes('CRM webhook') ? 'CRM webhook' : 'custom export'} can send each call to your own system.`,
  },
  {
    q: 'How do calls reach Della?',
    a: "You forward your office line to Della after hours, when nobody answers, or both. Your number doesn't change. Before you go live, you get your own Della number, forwarding is set up with you, and you make a test call to hear exactly what your callers will hear.",
  },
];

const rows = [
  ['Calls go to voicemail at night', "Answers in your firm's name, every night, weekend and holiday"],
  [
    'Messages arrive with no case detail',
    'Asks what an experienced intake specialist would ask: incident type and date, jurisdiction, injuries, treatment, fault, insurance, prior counsel and statute-of-limitations risk',
  ],
  ['The urgent call waits with the rest', `Scores every caller for urgency and alerts the attorney on call by ${alerts} straight away`],
  ['Mornings start with callbacks in the dark', 'Delivers every call as a dossier by dawn: summary, urgency, recording and transcript'],
  ['You carry the phone home', 'Takes the overnight shift, so your days start with a sorted list instead of a stack of voicemails'],
];

const forward = `Our after-hours injury calls go to voicemail or a message service, and many of those callers ring the next firm. Della, from Call Della, answers them in our name, takes the full intake and has a dossier on our desks by dawn, with urgent cases sent to the attorney on call. From ${formatPrice(solo)} a month with the dashboard and alerts included, month-to-month. See a demo: ${SITE.domain}`;

const p = page('/');
const linkCls = 'underline underline-offset-4 decoration-[var(--rule-soft)] hover:decoration-[var(--ink)]';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <JsonLd data={graph(serviceNode({ path: '/', name: 'Personal injury answering service for law firms', description: p.description, serviceType: 'After-hours personal injury intake' }))} />
      <PaperTexture />
      <div className="relative z-20 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow px-4 md:px-8 pt-12 md:pt-20 pb-16 max-w-[820px] mx-auto w-full">
          <section>
            <div className="text-[11px] font-bold text-[var(--ink-soft)] tracking-[0.22em] font-mono uppercase mb-[14px]">For personal injury law firms</div>
            <h1 className="text-[38px] md:text-[56px] font-semibold text-[var(--ink)] font-serif tracking-[-0.03em] leading-[1.04] m-0">
              Personal injury answering service for law firms
            </h1>
            <p className="font-serif text-[19px] md:text-[21px] leading-[1.5] text-[var(--ink)] mt-6 mb-8 max-w-[640px]">
              Della takes the overnight calls. You take the morning. Every after-hours injury caller is answered, qualified and on your desk by dawn.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <CTAButton primary large>Book a demo</CTAButton>
              <a href="#dossier" className="inline-flex items-center min-h-[48px] px-6 font-mono uppercase font-bold tracking-[0.14em] text-[13px] border-[1.5px] border-[var(--ink)] text-[var(--ink)] no-underline">
                See the dossier
              </a>
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-soft)]">
              Built for personal injury intake from the first call · Never gives legal advice · Month-to-month
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-soft)]">
              Last updated <time dateTime={p.dateModified}>{formatDate(p.dateModified)}</time>
            </p>
          </section>

          <Prose>
            <h2>What is a personal injury answering service?</h2>
            <p className="answer-block">
              A personal injury answering service takes a law firm&apos;s calls when the office is closed. Most take a name, a number and a message. An
              intake specialist goes further, asking what happened and when, what the injuries are, what treatment has followed and who was at fault, so
              an attorney can judge the case before the first callback.
            </p>

            <h2>Where do injury calls go after the office closes?</h2>
            <p>
              Accidents don&apos;t keep office hours, and neither do the calls that follow them. For most PI practices, an after-hours call ends in one of
              three places.
            </p>
            <ul>
              <li>Voicemail, where many callers hang up and try the next firm on the results page.</li>
              <li>A message service, which passes on a name, a number and &ldquo;please call back&rdquo;, but nothing about the case.</li>
              <li>Your own cell phone, answered at 10pm, at dinner and at weekends, for as long as you can keep it up.</li>
            </ul>

            <h2>What does a missed injury call cost?</h2>
            <p>
              In Clio&apos;s 2024 secret-shopper study of 500 US law firms, only 40% answered when a prospective client called, as reported by the{' '}
              <a href={SRC.obj2025.url}>Oklahoma Bar Journal (2025)</a>. An injured caller rarely waits for the office to open. They call the next firm,
              and the marketing spend that made your phone ring goes with them. Call Della collects more figures like this in its{' '}
              <a href={calldella('/operations/law-firm-missed-calls-data', C, 'missed-calls-data')}>law firm missed-calls data</a>.
            </p>
          </Prose>

          <MissedCallSection campaign={C} />

          <Prose>
            <h2>What would it be worth to have those calls qualified by morning?</h2>
            <ul>
              <li>If every after-hours injury caller was on your desk at 7am with the facts already taken, how many more of them would you sign?</li>
              <li>How much sooner could you reach the strong cases if you knew at a glance which ones they were?</li>
              <li>What would you do with the first hour of the day if it wasn&apos;t spent returning cold voicemails?</li>
            </ul>

            <h2>How Della handles your overnight calls</h2>
          </Prose>
          <Table caption="How Della handles your overnight calls" head={['If this is happening', 'What Della does']} rows={rows} />
          <Prose>
            <p>
              If you have an intake team, Della covers the hours they aren&apos;t there and hands them a sorted morning. If it&apos;s just you, she covers
              the hours you can&apos;t. The questions she asks are set out on the <a href="/personal-injury-intake">personal injury intake</a> page and in
              the free <a href="/intake-form">personal injury intake form</a>. For what to automate and what to keep with people, see{' '}
              <a href="/intake-automation">personal injury intake automation</a>. Firms that also take campaign cases can read the{' '}
              <a href="/mass-tort-intake">mass tort intake guide</a>. Call Della&apos;s own{' '}
              <a href={calldella('/personal-injury', C, 'practice-page')}>personal injury intake page</a> has the full detail.
            </p>
            <p>
              Criminal defense or immigration? Della has intake built for those practices too: see Call Della&apos;s{' '}
              <a href={calldella('/criminal-defense', C, 'criminal-defense-line')}>criminal defense intake</a> and{' '}
              <a href={calldella('/immigration', C, 'immigration-line')}>immigration intake</a> pages.
            </p>

            <h2>Hear Della take a call</h2>
            <p>
              The quickest way to judge Della is to hear her work. Book a {DEMO_MINUTES}-minute demo and we&apos;ll run a live call while you listen: a
              caller rear-ended on the drive home, and every question she asks. Then we walk you through the dossier she files.
            </p>
          </Prose>
          <SampleDossier />
          <CTAButton primary>Book a demo</CTAButton>
        </main>

        <FAQ items={faq} eyebrow="Objections, answered" heading="Questions PI attorneys ask" />

        <div className="px-4 md:px-8 pb-16 max-w-[820px] mx-auto w-full">
          <Prose>
            <p>
              More on the bar rules: <a href={calldella('/compliance', C, 'faq-compliance')}>Call Della&apos;s compliance guides</a>, including{' '}
              <a href={calldella('/compliance/aba-formal-opinion-512-explained', C, 'faq-aba-512')}>ABA Formal Opinion 512 explained</a> and{' '}
              <a href={calldella('/compliance/call-recording-consent-by-state', C, 'faq-recording-consent')}>call recording consent by state</a>. Full
              plan detail is on the <a href="/pricing">pricing page</a>.
            </p>

            <h2>Getting started</h2>
            <p>
              Book a demo first. If she fits your firm, setup is short: answer a few questions, get your Della number, make a test call, then forward
              your line to her after hours.
            </p>
            <h2>What you get</h2>
          </Prose>
          <WhatYouGet />
          <div className="mt-6">
            <CTAButton primary large>Book a demo</CTAButton>
          </div>
          <ForwardBox heading="Forward this to your managing partner" subject="After-hours injury calls: Della from Call Della" text={forward} />
          <p className="font-serif text-[14px] text-[var(--ink-soft)]">
            Source: Clio 2024 Legal Trends Report figures as reported in{' '}
            <a href={SRC.obj2025.url} className={linkCls}>{SRC.obj2025.name}</a>, {SRC.obj2025.publisher}, September 2025. Checked 25 October 2026.
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}
