import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQ } from '@/components/FAQ';
import { CTAButton } from '@/components/CTAButton';
import { SampleDossier } from '@/components/SampleDossier';
import { Prose, Table, Sources, SRC } from '@/components/Prose';
import { ServiceLayout, Hero, Source } from '@/components/Page';
import { pageMeta } from '@/data/pages';
import { type QA } from '@/lib/schema';
import { CONTACT_EMAIL } from '@/lib/config';
import { DEMO_MINUTES } from '@/lib/plans';
import { ALERTS, OBJECTIONS } from '@/lib/copy';
import { calldella } from '@/lib/utm';

const PATH = '/intake-form';
const C = 'intake-form';
export const metadata: Metadata = pageMeta(PATH);

// The questions Della asks on every injury call, in the order she asks them.
const SECTIONS: [string, string[]][] = [
  ['Caller', ['Full name', 'Callback phone and whether texts are fine', 'Email', 'Best time to call back', 'Are you calling for yourself or for someone else, and what is the relationship?']],
  ['Incident', ['What happened, in your own words?', 'Date and time', 'Where did it happen: city, state and the kind of place (road, store, workplace, property)?', 'What kind of incident: vehicle, slip and fall, workplace, product, dog bite, other?']],
  ['Injuries and treatment', ['What injuries do you have?', 'Did you go to the ER, urgent care or a doctor, and when?', 'Are you still being treated, and by whom?', 'Were you in pain or unable to work afterwards?']],
  ['Fault and police', ['Who do you believe was at fault, and why?', 'Did police attend? Is there a report number?', 'Was anyone cited or arrested?']],
  ['Insurance', ['Do you have auto, health or other insurance that applies?', 'Do you know the other party\'s insurer?', 'Has a claim been opened, and have you spoken to any insurer or given a statement?']],
  ['Witnesses and evidence', ['Were there witnesses? Names and numbers if you have them', 'Photos, video, dashcam or a damaged item you still have?']],
  ['Prior lawyers', ['Have you spoken to or hired another lawyer about this?', 'Have you signed anything with anyone about this incident?']],
];

const faq: QA[] = [
  {
    q: 'Is this personal injury intake form free to use?',
    a: 'Yes. Read it, print it or save it as a PDF from your browser, and use it in your own intake. The editable template is the same questions in a document you can change. Email us for it, or use the form on this page when it is live. Nothing here is legal advice, and the form never assesses a claim.',
  },
  {
    q: 'What should a personal injury intake form leave out?',
    a: 'Anything that assesses the claim, quotes a fee or tells the caller they have a case. Those are decisions for the attorney, made after the facts are in. The form should also avoid asking for medical records or statements on the first call. Capture where they are and who holds them, and request them once the firm has taken the matter.',
  },
  {
    q: 'Why does the incident date matter most?',
    a: 'Because it sets the statute-of-limitations clock, and the deadline varies by state and by the kind of claim. An intake form that captures the date, the state and the kind of incident lets the attorney check the deadline before the first callback, and lets the urgent cases, where the deadline is close, go to the front of the queue.',
  },
  OBJECTIONS.bar,
  OBJECTIONS.person,
  OBJECTIONS.price,
];

export default function Page() {
  return (
    <ServiceLayout slug={PATH} crumb="Intake form">
      <Hero
        slug={PATH}
        eyebrow="Free personal injury intake form"
        h1="Free personal injury intake form"
        sub="The questions Della asks on every injury call, readable on this page, printable as a PDF, and available as an editable template by email."
        secondary={{ href: '#form', label: 'Read the form' }}
        trust="Written for personal injury intake · Never assesses the claim · Free to use"
      />

      <Prose>
        <h2>What is this personal injury intake form?</h2>
        <p className="answer-block">
          A personal injury intake form is the set of questions a law firm asks an injured caller on the first call: who they are, what happened,
          the injuries and treatment, fault, insurance, witnesses and any prior lawyer. This one is the script Della runs at night. In Clio&apos;s
          2024 secret-shopper study only 40% of firms answered that call.<Source src={SRC.obj2025} />
        </p>

        <h2>What goes missing without a form?</h2>
        <ul>
          <li>A message that says &ldquo;car accident, please call&rdquo; and nothing else.</li>
          <li>Notes from the associate&apos;s cell phone with the incident date missing, so nobody has checked the limitations deadline.</li>
          <li>A second call to ask the questions that should have been asked the first time, to a caller who has already rung the next firm.</li>
        </ul>
        <p>
          An ABA Law Practice Division survey, reported by <a href={SRC.lmnc2019.url}>Lawyers Mutual NC (2019)</a>, found 42% of callers waited three
          days or more for a reply. A form fixes the second call. Answering the first one is a separate problem, covered on the{' '}
          <Link href="/">personal injury answering service</Link> page.
        </p>

        <h2 id="form" className="scroll-mt-24">The personal injury intake form</h2>
        <p>
          Seven sections, in the order Della asks them. Print this page or save it as a PDF from your browser. Call Della&apos;s playbook explains{' '}
          <a href={calldella('/intake-playbook/what-should-be-on-a-pi-intake-form', C, 'form-post')}>what should be on a PI intake form</a> and why
          each question is there.
        </p>
      </Prose>
      <Table
        caption="Personal injury intake form: the questions in order"
        head={['Section', 'Questions']}
        rows={SECTIONS.map(([section, qs]) => [
          section,
          <ol key={section} className="m-0 pl-5 list-decimal">
            {qs.map((q) => (
              <li key={q} className="mb-1">{q}</li>
            ))}
          </ol>,
        ])}
      />

      <Prose>
        <h2>Get the editable personal injury intake form template</h2>
        {/* shortcut: email fallback only (the brief's empty-webhook state); build the email form (email, firm, page, Turnstile token) when LEAD_WEBHOOK_URL is set. */}
        <p>
          Email <a href={`mailto:${CONTACT_EMAIL}?subject=PI%20intake%20form%20template`}>{CONTACT_EMAIL}</a> and we will send the editable
          template as a document you can change.
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--ink-soft)]">
          Privacy: we use your email to send the template and, if you ask, to arrange a demo. Nothing else.
        </p>

        <h2>How Della uses this form at night</h2>
        <p>
          She answers in your firm&apos;s name, opens with a recording disclosure set for your state and asks these questions one at a time, in
          this order, adjusting to what the caller has already said. She scores every caller for urgency and alerts the attorney on call by {ALERTS}{' '}
          when a call cannot wait. Every call becomes a dossier with a summary, urgency score, recording and transcript, on your desk by 7am. The{' '}
          <a href="/personal-injury-intake">personal injury intake</a> page explains why each field matters to the attorney.
        </p>

        <h2>Hear the form run as a call</h2>
        <p>
          Book a {DEMO_MINUTES}-minute demo and listen to Della take an injury call using these questions, then see the dossier she files. Below is a
          sample, with a test caller.
        </p>
      </Prose>
      <SampleDossier />
      <CTAButton primary>Book a demo</CTAButton>

      <FAQ items={faq} eyebrow="FAQ" heading="Questions about the intake form" />
      <Sources items={[SRC.obj2025, SRC.lmnc2019]} />
    </ServiceLayout>
  );
}
