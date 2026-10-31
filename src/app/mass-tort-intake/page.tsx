import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleLayout } from '@/components/ArticleLayout';
import { FAQ } from '@/components/FAQ';
import { CTAButton } from '@/components/CTAButton';
import { Prose, Table, Sources, SRC } from '@/components/Prose';
import { pageMeta, page } from '@/data/pages';
import { type QA } from '@/lib/schema';
import { calldella } from '@/lib/utm';

// Published as a guide while Della has no mass tort screening flow (plan gate). Switch to the
// service template when a screening flow is live; do not claim it before then.
const PATH = '/mass-tort-intake';
const C = 'mass-tort-intake';
export const metadata: Metadata = pageMeta(PATH);

const faq: QA[] = [
  {
    q: 'What is mass tort intake?',
    a: 'Mass tort intake is the screening of inbound callers against the criteria for a specific campaign: the product or exposure, the dates, the diagnosis and the proof. A single-event injury intake asks what happened to one person. Mass tort intake asks whether this person fits a case the firm is already building.',
  },
  {
    q: 'How is a mass tort different from a class action?',
    a: 'In a mass tort each plaintiff keeps an individual claim, with their own injuries and damages, even when the cases are coordinated for pretrial proceedings. In a class action one or more representatives sue on behalf of a class, and class members are bound by the result. Intake for a mass tort therefore has to capture each caller as a separate client.',
  },
  {
    q: 'Why do mass tort calls come in spikes?',
    a: 'Because they are driven by advertising. A television, radio or digital campaign for a drug, device or exposure produces calls in waves that follow the media schedule, often outside office hours. A firm that screens by hand cannot staff for the peak, so the overflow goes to voicemail or to a call center.',
  },
  {
    q: 'Does Della screen mass tort callers?',
    a: 'Not today. Della is built for personal injury and accident calls: she takes the facts of one incident, scores urgency and files a dossier. She is not built to screen callers against campaign criteria. If your firm also takes single-event injury calls at night, that is where she fits. This page will change when a screening flow is live.',
  },
  {
    q: 'What should a mass tort intake vendor be able to show you?',
    a: 'Their criteria sheet for your campaign, the script built from it, a sample of the data they hand over, the hours they cover, how they handle a surge, and how a caller who does not fit is treated. Ask to hear a recorded call. A vendor who cannot show those is selling call volume, not intake.',
  },
];

export default function Page() {
  const p = page(PATH);
  return (
    <ArticleLayout
      eyebrow="Guide · Mass tort intake"
      title="Mass tort intake: screen every inbound call against your criteria"
      slug={PATH}
      author="Andy Norman"
      date={p.datePublished}
      breadcrumbs={[{ name: 'Mass tort intake', href: PATH }]}
      citations={[SRC.wexMassTort, SRC.wexMdl, SRC.usc1407, SRC.obj2025]}
      tldr={
        <p className="m-0">
          Mass tort intake is the screening of inbound callers against the criteria for a campaign: the product or exposure, the dates, the diagnosis
          and the proof. A mass tort is a civil action with many plaintiffs harmed by the same product or event, each keeping an individual claim, as
          the <a href={SRC.wexMassTort.url}>Legal Information Institute</a> defines it.
        </p>
      }
    >
      <Prose>
        <h2>What is mass tort intake?</h2>
        <p>
          Mass tort intake is the first conversation between a firm and a caller who may belong to a case the firm is already building: a drug, a
          medical device, a product or an exposure that has harmed many people in a similar way. Unlike a single-event personal injury intake, which
          asks what happened to one person, mass tort intake asks whether this caller fits. Did they use the product, between which dates, with what
          diagnosis, and can they prove it? Each caller who fits becomes an individual client with an individual claim, even when thousands of such
          claims are later coordinated. Federal courts can transfer civil actions sharing common questions of fact to one district for pretrial
          proceedings under <a href={SRC.usc1407.url}>28 U.S. Code § 1407</a>, the multidistrict litigation statute, which is why mass tort intake
          data has to be clean enough to feed a plaintiff fact sheet later.
        </p>

        <h2>How is mass tort intake different from personal injury intake?</h2>
        <p>
          Three ways. First, criteria come before facts: the firm already knows what a qualifying case looks like, so intake is a screen, not an
          open interview. Second, volume comes in spikes: campaigns for a specific drug or device produce waves of calls that follow the advertising
          schedule, many of them at night. Third, the output feeds a mass process: a plaintiff fact sheet, a census, a settlement matrix, so the data
          has to be captured the same way every time. A firm that handles both kinds of call needs two different scripts and, often, two different
          ways of answering the phone.
        </p>
      </Prose>
      <Table
        caption="Single-event injury intake against mass tort intake"
        head={['', 'Personal injury intake', 'Mass tort intake']}
        rows={[
          ['The question', 'What happened to you?', 'Do you fit this campaign?'],
          ['Script', 'Open questions on one incident', 'Criteria checklist for one product or exposure'],
          ['Volume', 'Steady, driven by accidents', 'Spikes, driven by advertising'],
          ['Output', 'A dossier for an attorney to judge', 'A screened record for a fact sheet or census'],
          ['Caller who does not fit', 'Referred or declined by the attorney', 'Declined on the call, by script, or referred'],
        ]}
      />

      <Prose>
        <h2>How do firms run mass tort intake?</h2>
        <p>
          The firm writes a criteria sheet for each campaign: product or exposure, dates of use, qualifying diagnoses, disqualifying facts and the
          proof it needs, such as prescription records or a pathology report. The sheet becomes a script, and the script is run by whoever answers the
          phone: in-house intake staff during the day, and a call center or intake vendor for the overflow and the nights. Every call is logged in a
          fixed format so that a caller can be matched to the criteria, retained, and later moved into the litigation data. The weak point is the same
          as in single-event intake: the hours nobody is there. In Clio&apos;s 2024 secret-shopper study only 40% of law firms answered a prospective
          client&apos;s call at all, as reported by the <a href={SRC.obj2025.url}>Oklahoma Bar Journal (2025)</a>, and a campaign caller who reaches
          voicemail rings the next firm advertising the same case.
        </p>

        <h2>What should a mass tort intake call capture?</h2>
      </Prose>
      <Table
        caption="Fields a mass tort intake record should capture"
        head={['Field', 'Why it matters']}
        rows={[
          ['Product, device or exposure, and how the caller knows', 'The first criterion on every sheet'],
          ['Dates of use or exposure, start and end', 'Matches the campaign window and the limitations period'],
          ['Diagnosis, date and the physician who made it', 'The qualifying injury and where the records are'],
          ['Treatment and ongoing symptoms', 'Damages and the medical records to request'],
          ['Proof available: prescriptions, implant card, lot number, pathology', 'Whether the claim can be documented'],
          ['Prior lawyer or signed retainer elsewhere', 'Whether the caller is already represented'],
          ['Contact details, best time and consent to contact', 'Follow-up and the retainer'],
        ]}
      />

      <Prose>
        <h2>What should you ask a mass tort intake call center?</h2>
        <ul>
          <li>Who writes the criteria sheet and the script, and who signs it off?</li>
          <li>What does a screened record look like, and in what format does it reach us?</li>
          <li>Which hours are covered, and what happens to calls in a surge?</li>
          <li>How is a caller who does not fit treated, and is that recorded?</li>
          <li>Can we hear a recorded call before we sign?</li>
          <li>How is the data stored, for how long, and who owns it?</li>
        </ul>

        <h2>Where Della fits today</h2>
        <p>
          Della is built for personal injury and accident calls: she takes the facts of one incident, scores urgency and files a dossier by dawn. She
          is not built to screen callers against campaign criteria, and this page will say so until a screening flow is live. If your firm also takes
          single-event injury calls at night, that is where she fits: the <Link href="/">personal injury answering service</Link> page explains what she
          does, and <a href="/personal-injury-intake">personal injury intake</a> sets out the questions she asks. For the rules on what any intake
          service may and may not say to a caller, see Call Della&apos;s{' '}
          <a href={calldella('/compliance', C, 'compliance')}>compliance guides</a>.
        </p>
        <p>If you want to hear how Della handles a single-event injury call, book a demo.</p>
      </Prose>
      <CTAButton primary>Book a demo</CTAButton>

      <FAQ items={faq} heading="Mass tort intake: common questions" />
      <Sources items={[SRC.wexMassTort, SRC.wexMdl, SRC.usc1407, SRC.obj2025]} />
    </ArticleLayout>
  );
}
