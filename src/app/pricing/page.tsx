import type { Metadata } from 'next';
import { FAQ } from '@/components/FAQ';
import { CTAButton } from '@/components/CTAButton';
import { MissedCallSection } from '@/components/MissedCallSection';
import { SampleDossier } from '@/components/SampleDossier';
import { WhatYouGet } from '@/components/WhatYouGet';
import { ForwardBox } from '@/components/ForwardBox';
import { CompareTable } from '@/components/compare/CompareTable';
import { Prose, Table, Sources, SRC } from '@/components/Prose';
import { ServiceLayout, Hero, Source, ProblemFix } from '@/components/Page';
import { COMPETITORS, competitor, FETCHED } from '@/data/competitors';
import { pageMeta, formatDate } from '@/data/pages';
import { type QA } from '@/lib/schema';
import { DEMO_MINUTES, formatPrice } from '@/lib/plans';
import { ALERTS, OBJECTIONS, OVERAGE, PRICE_ANSWER, SOLO, PRACTICE, forwardText } from '@/lib/copy';
import { calldella } from '@/lib/utm';

const PATH = '/pricing';
const C = 'pricing';
export const metadata: Metadata = pageMeta(PATH);

const asOf = formatDate(FETCHED);
const posh = competitor('posh');
const smith = competitor('smith-ai');
const al = competitor('answering-legal');

const faq: QA[] = [
  {
    q: 'Is a cheap per-minute plan better for a small PI firm?',
    a: 'Only if your calls are short and few. A proper injury intake runs several minutes, so a low monthly fee with a per-minute rate can cost more than a flat plan once the calls are real. Count last month\'s after-hours calls, multiply by a realistic call length, and price each plan on that, not on the entry figure.',
  },
  {
    q: 'Is there a setup fee or a contract?',
    a: `Not with Della. Every plan is month-to-month with no setup fee, and extra minutes are ${OVERAGE} each. Of the services compared here, ${al.name} publishes no setup fees and no long-term contracts, ${posh.name} and ${smith.name} publish month-to-month terms, and ${competitor('ruby').name} does not publish its contract length. Each fact is linked above.`,
  },
  OBJECTIONS.price,
  OBJECTIONS.already,
  OBJECTIONS.person,
  OBJECTIONS.software,
];

const src = (url: string) => (
  <>
    {' '}
    <a href={url} rel="nofollow noopener">(source)</a>
  </>
);

export default function Page() {
  return (
    <ServiceLayout slug={PATH} crumb="Pricing" serviceName="Personal injury answering service" serviceType="After-hours personal injury intake">
      <Hero
        slug={PATH}
        eyebrow="Pricing"
        h1="What a personal injury answering service costs"
        sub="Per-minute, per-call and flat pricing explained, every published price checked and dated, and a missed-call sum you do yourself before you look at any of them."
        secondary={{ href: '#published-prices', label: 'See the prices' }}
        trust="Competitor prices from their own sites, dated · No prices from memory · Della's plans at the end, after the sum"
      />

      <Prose>
        <h2>What does a personal injury answering service cost?</h2>
        <p className="answer-block">
          As of {asOf}, published prices for answering services that take law firm calls ran from{' '}
          <a href={posh.facts.price.url} rel="nofollow noopener">$65 a month at {posh.name}</a> to{' '}
          <a href={smith.facts.price.url} rel="nofollow noopener">$2,100 a month at {smith.name}</a>, with per-minute or per-call charges on top of
          most plans. Some, including {al.name}, publish no price. The right comparison is cost per qualified injury call, not the monthly fee.
        </p>

        <h2>Where does the money go now?</h2>
        <ul>
          <li>You pay per minute for a service that takes a name and a number, then pay staff to make the callback.</li>
          <li>The overage line on the invoice is bigger than the plan.</li>
          <li>You pay for the ads that make the phone ring at 9pm, and nobody answers it.</li>
        </ul>

        <h2>What does a missed injury call cost against any of these prices?</h2>
        <p>
          Before comparing fees, put a number on the other side of the ledger. In Clio&apos;s 2024 secret-shopper study only 40% of law firms answered
          a prospective client&apos;s call<Source src={SRC.obj2025} />, and an ABA Law Practice Division survey found 32% of calls to law firms went
          straight to voicemail.<Source src={SRC.lmnc2019} /> One signed injury case usually pays for a year of any service on this page.
        </p>
      </Prose>

      <MissedCallSection campaign={C} />

      <Prose>
        <h2>What would it be worth to pay one predictable fee for qualified calls?</h2>
        <ul>
          <li>If the bill were the same every month, what would you stop checking?</li>
          <li>If every after-hours injury caller arrived qualified at 7am, how many would you sign, and what is one of those worth?</li>
        </ul>

        <h2>How Della meets it</h2>
      </Prose>
      <ProblemFix
        rows={[
          ['Per-minute bills for messages', `One monthly fee with the dashboard, ${ALERTS} alerts and the morning brief included`],
          ['Overage surprises', `Extra minutes at ${OVERAGE} each, stated up front`],
          ['Ad spend rings a phone nobody answers at night', "Answers in your firm's name every night, weekend and holiday, and takes the injury intake"],
        ]}
      />

      <Prose>
        <h2>How do answering services charge? The three pricing models</h2>
      </Prose>
      <Table
        caption="Pricing models for law firm answering services"
        head={['Model', 'How it works', 'What to watch']}
        rows={[
          ['Per minute', 'A monthly plan with a minute allowance, then a per-minute rate', 'An injury intake runs several minutes, so the allowance goes fast. Check the overage rate and whether hold time counts'],
          ['Per call', 'A monthly plan with a call allowance, then a per-call rate', 'Short calls cost the same as long ones. Check what counts as a call: wrong numbers, hang-ups, existing clients'],
          ['Flat monthly', 'One fee with minutes included and the features stated', 'Check what is included and what each extra minute costs. Della is priced this way'],
        ]}
      />

      <Prose>
        <h2 id="published-prices" className="scroll-mt-24">Published prices, checked on {asOf}</h2>
        <p>
          Each fact below is from the company&apos;s own pricing page, linked. &quot;Not published&quot; means the page does not state it. Re-check
          before you sign, because prices change.
        </p>
      </Prose>
      <Table
        caption="Published price, overage and contract terms by service"
        head={['Service', 'Published price', 'Overage', 'Contract terms']}
        rows={COMPETITORS.map((c) => [
          c.name,
          <>{c.facts.price.text}{src(c.facts.price.url)}</>,
          <>{c.facts.overage.text}{src(c.facts.overage.url)}</>,
          <>{c.facts.contract.text}{src(c.facts.contract.url)}</>,
        ])}
      />

      <Prose>
        <h2>Personal injury intake service comparison: the same ten criteria for everyone</h2>
        <p>
          Price is one row of ten. The table scores Call Della and four services a PI firm is likely to be weighing on who answers, hours, intake
          depth, urgent-call handling, integrations, Spanish and contract terms. Call Della wrote it and is one of the five. Every competitor fact
          is from that company&apos;s own site, linked and dated. On a phone the table stacks, one criterion at a time.
        </p>
      </Prose>
      <CompareTable competitors={COMPETITORS} caption="Call Della, Smith.ai, Answering Legal, Posh and Ruby on the same ten criteria." />
      <Prose>
        <p>
          The one-to-one comparisons are on calldella.com:{' '}
          {COMPETITORS.map((c, i) => (
            <span key={c.slug}>
              <a href={calldella(`/compare/${c.slug}`, C, 'compare-list')}>{c.name} vs Call Della</a>
              {i < COMPETITORS.length - 1 ? ', ' : '.'}
            </span>
          ))}
        </p>

        <h2>Hear what you would be paying for</h2>
        <p>
          Price what you would get, not what you would pay. Book a {DEMO_MINUTES}-minute demo and we run a live injury call while you listen, then
          walk you through the dossier. Below is a sample, with a test caller.
        </p>
      </Prose>
      <SampleDossier />
      <CTAButton primary>Book a demo</CTAButton>

      <FAQ items={faq} eyebrow="Objections, answered" heading="Questions about price" />

      <Prose>
        <h2>What does Della cost?</h2>
        <p>{PRICE_ANSWER}</p>
      </Prose>
      <WhatYouGet />
      <Prose>
        <p>
          For the sum behind the price, calldella.com has a{' '}
          <a href={calldella('/operations/cost-per-signed-case-calculator', C, 'cost-per-case')}>cost per signed case calculator</a> and a{' '}
          <a href={calldella('/operations/after-hours-intake-comparison', C, 'after-hours-comparison')}>comparison of after-hours intake options</a>,
          including voicemail and in-house night staff.
        </p>
      </Prose>
      <div className="mt-6">
        <CTAButton primary large>Book a demo</CTAButton>
      </div>
      <ForwardBox
        heading="Forward this to your managing partner"
        subject="After-hours injury calls, priced: Della from Call Della"
        text={forwardText(`Our after-hours injury calls go to voicemail or a per-minute message service, and I have priced the options: ${formatPrice(SOLO)} or ${formatPrice(PRACTICE)} a month flat is the one to look at.`)}
      />
      <Sources items={[SRC.obj2025, SRC.lmnc2019]} />
    </ServiceLayout>
  );
}
