import type { Metadata } from 'next';
import { FAQ } from '@/components/FAQ';
import { CTAButton } from '@/components/CTAButton';
import { MissedCallSection } from '@/components/MissedCallSection';
import { SampleDossier } from '@/components/SampleDossier';
import { WhatYouGet } from '@/components/WhatYouGet';
import { ForwardBox } from '@/components/ForwardBox';
import { Prose, Table, Sources, SRC } from '@/components/Prose';
import { ServiceLayout, Hero, Source, ProblemFix } from '@/components/Page';
import { pageMeta } from '@/data/pages';
import { type QA } from '@/lib/schema';
import { FLAGS, DEMO_MINUTES, formatPrice } from '@/lib/plans';
import { ALERTS, OBJECTIONS, SOLO, forwardText } from '@/lib/copy';
import { calldella } from '@/lib/utm';

const PATH = '/personal-injury-intake';
const C = 'personal-injury-intake';
export const metadata: Metadata = pageMeta(PATH);

const faq: QA[] = [
  {
    q: 'What does a personal injury intake specialist do?',
    a: 'A personal injury intake specialist answers new-case calls, asks a set list of questions, records the answers, flags urgent matters and passes each file to an attorney. A good specialist is calm with distressed callers and never gives legal advice or promises the firm will take the case. Della does this job after hours.',
  },
  {
    q: 'How long should a personal injury intake call take?',
    a: 'Long enough to capture the facts an attorney needs to judge the case, and no longer. Callers are often in pain or shaken, so the questions should come one at a time and in a sensible order. A clear incident date, injuries, treatment, fault and insurance matter more than a fixed number of minutes.',
  },
  {
    q: 'Does Della replace our daytime intake team?',
    a: 'No. Della covers the hours your intake team is not there: nights, weekends and holidays. She hands the team a sorted morning, with every overnight call filed as a dossier and the urgent ones already flagged, so they spend the first hour on the strongest cases instead of returning voicemails.',
  },
  {
    q: 'Can Della take personal injury intake in Spanish?',
    a: FLAGS.spanishPI
      ? 'Yes. Della can take personal injury intake in Spanish as well as English, and the dossier reaches the firm in English with the full transcript attached for the attorney to review.'
      : 'Not yet. Della takes personal injury intake in English today. Spanish-language intake is live on Call Della’s immigration flow only. If a large share of your injury callers speak Spanish, raise it in the demo so we can tell you where that work stands.',
  },
  OBJECTIONS.person,
  OBJECTIONS.bar,
  OBJECTIONS.price,
];

export default function Page() {
  return (
    <ServiceLayout slug={PATH} crumb="Personal injury intake" serviceName="Personal injury intake, day and night" serviceType="Personal injury intake">
      <Hero
        slug={PATH}
        eyebrow="Personal injury intake"
        h1="Personal injury intake that doesn't stop at 6pm"
        sub="The injured caller rings the evening it happens. Della takes the full intake at night and leaves a screened case on your desk by dawn, not a name and a number."
        trust="Built for personal injury intake from the first call · Never gives legal advice · Month-to-month"
      />

      <Prose>
        <h2>What is personal injury intake?</h2>
        <p className="answer-block">
          Personal injury intake is the first call between an injured person and a law firm, where the firm records what happened, the injuries,
          treatment, fault and insurance. It matters most when the office is closed: in Clio&apos;s 2024 secret-shopper study, only 40% of law firms
          answered a prospective client&apos;s call.<Source src={SRC.obj2025} />
        </p>

        <h2>Where does the 9pm injury call go now?</h2>
        <ul>
          <li>Voicemail. The caller, often still in the ER car park, hangs up and tries the next firm on the results page.</li>
          <li>A message service, which passes on a name, a number and &ldquo;car accident, please call&rdquo;, and nothing about the case.</li>
          <li>Your intake coordinator&apos;s cell phone, with the facts on a notepad and half of them never reaching the file.</li>
        </ul>

        <h2>What does it cost when intake stops at 6pm?</h2>
        <p>
          Accidents happen on the drive home, at weekends and on holidays, and the caller is often at their most motivated that same evening. In a
          survey by the ABA Law Practice Division, reported by <a href={SRC.lmnc2019.url}>Lawyers Mutual NC (2019)</a>, fewer than 10% of callers
          reached a lawyer and 32% of calls went straight to voicemail. Clio&apos;s 2024 secret-shopper study, reported by the{' '}
          <a href={SRC.obj2025.url}>Oklahoma Bar Journal (2025)</a>, found only 40% of firms answered at all and 48% were unreachable, neither
          answering nor returning the message. Whatever the firm spent to make the phone ring is spent either way. What changes is who gets the case.
        </p>
      </Prose>

      <MissedCallSection campaign={C} />

      <Prose>
        <h2>What would it be worth if every overnight caller arrived already screened?</h2>
        <ul>
          <li>If the facts were taken on the first call, how many callbacks would start with a decision instead of a repeat of the intake?</li>
          <li>How many more strong cases would you reach while the caller was still deciding?</li>
          <li>Who on your team gets their evenings back?</li>
        </ul>

        <h2>How Della meets it</h2>
      </Prose>
      <ProblemFix
        rows={[
          ['Injury calls go to voicemail at night', "Answers in your firm's name, every night, weekend and holiday"],
          ['Messages arrive with no case detail', 'Asks the incident, injury, treatment, fault, insurance and prior-counsel questions on the first call'],
          ['Facts go missing between the call and the file', 'Files every call as a dossier by dawn: summary, urgency score, recording and transcript'],
          ['The urgent call waits with the rest', `Scores every caller for urgency and alerts the attorney on call by ${ALERTS} straight away`],
        ]}
      />

      <Prose>
        <h2>What does a complete personal injury intake capture?</h2>
        <p>
          Enough on the first call for an attorney to judge the case without calling back to start again. That means the incident type, date and
          location; what the caller remembers about how it happened; the injuries and the treatment so far; who the caller thinks was at fault and
          whether police attended; the insurers on both sides; any witnesses; and whether the caller has spoken to another lawyer or given a statement
          to an insurer. The incident date matters most, because it sets the statute-of-limitations clock. Intake should not assess the claim, quote a
          fee or tell the caller they have a case. Those are decisions for the attorney. The free <a href="/intake-form">personal injury intake form</a>{' '}
          gives every question in full.
        </p>
      </Prose>
      <Table
        caption="The fields a first-call PI intake should capture"
        head={['Field', 'Why the attorney needs it']}
        rows={[
          ['Incident type, date and location', 'Case type, venue and the statute-of-limitations deadline'],
          ['How it happened', 'The caller’s account, in their words, for the first fault read'],
          ['Injuries and treatment', 'Severity, ER or urgent care visits, ongoing treatment'],
          ['Fault and police report', 'Liability and whether a report exists'],
          ['Insurance', 'Both sides’ insurers and any claim already opened'],
          ['Witnesses and evidence', 'Names, photos, dashcam or video'],
          ['Prior lawyer or statements', 'Whether another firm is involved or the caller has spoken to an insurer'],
        ]}
      />

      <Prose>
        <h2>Should you hire a night personal injury intake specialist?</h2>
        <p>
          Hiring a night personal injury intake specialist works if you have the volume to keep one busy and the management time to train, schedule and
          cover them. A trained person can handle the hardest calls, adapt to anything and, under attorney supervision, take on tasks Della does not do.
          The costs are payroll and benefits for unsociable hours, plus cover for sickness, holidays and turnover, because the night shift is the hardest
          seat to keep filled. Della suits the opposite case: a firm whose night calls are steady but too few, or too spread out, for a full shift. Many
          firms end up with both: people in the day, Della at night.
        </p>
      </Prose>
      <Table
        caption="Della compared with a night intake hire"
        head={['', 'Night intake specialist', 'Della']}
        rows={[
          ['Hours', 'The shifts you staff and cover', 'Every night, weekend and holiday'],
          ['Cost basis', 'Payroll, benefits, cover and training', `Monthly plan from ${formatPrice(SOLO)}, month-to-month`],
          ['Legal advice', 'Never, under attorney supervision', 'Never, and says so if asked'],
          ['Spanish', 'If you hire a bilingual specialist', FLAGS.spanishPI ? 'Yes' : 'English only for personal injury today'],
          ['Morning handover', 'Notes in your system', 'A dossier per call and a brief by 7am'],
        ]}
      />

      <Prose>
        <h2>How is a personal injury intake service different from an answering service?</h2>
        <p>
          A personal injury intake service takes the case facts, while a general answering service takes a message. The difference shows up the next
          morning. A message gives the attorney a name, a number and a line such as &ldquo;car accident, please call&rdquo;, so the first callback is
          really the first intake, held hours later with a caller who may have moved on. An intake service asks the injury questions on the first call,
          records the answers in a fixed format and flags the urgent matters, so the attorney can rank the callbacks before picking up the phone. When
          you compare personal injury intake services, ask three things. Who writes the questions? What does the morning handover look like? How are
          urgent calls escalated, and to whom? The <a href="/pricing">pricing page</a> compares how the main services charge.
        </p>

        <h2>How does Della run personal injury intake at night?</h2>
        <p>
          By answering in your firm&apos;s name, opening with a recording disclosure set for your state and asking one question at a time. She covers
          the incident, injuries, treatment, fault, police report, insurance, witnesses and any prior lawyer, then confirms the callback details. She
          scores every caller for urgency and alerts the attorney on call by {ALERTS} when a call cannot wait. Every call becomes a dossier with a
          summary, urgency score, recording and transcript, and the morning brief is on your desk by 7am. She never gives legal advice, never quotes
          fees and never says the firm has taken the case. If a caller asks whether she is an AI, she tells them. Call Della&apos;s{' '}
          <a href={calldella('/personal-injury', C, 'practice-page')}>personal injury page</a> covers the flow in detail, and its playbook explains{' '}
          <a href={calldella('/intake-playbook/how-to-write-pi-intake-script', C, 'pi-script')}>how to write a PI intake script</a> and{' '}
          <a href={calldella('/intake-playbook/intake-red-flags-declining-cases', C, 'red-flags')}>the red flags for declining cases</a>. For what to
          automate and what to keep with people, see <a href="/intake-automation">personal injury intake automation</a>.
        </p>

        <h2>Hear Della take a call</h2>
        <p>
          Book a {DEMO_MINUTES}-minute demo and we run a live call while you listen: a caller hurt on the drive home, and every question she asks.
          Then we walk you through the dossier she files. Below is a sample, with a test caller.
        </p>
      </Prose>
      <SampleDossier />
      <CTAButton primary>Book a demo</CTAButton>

      <FAQ items={faq} eyebrow="Objections, answered" heading="Personal injury intake: common questions" />

      <Prose>
        <h2>What you get</h2>
      </Prose>
      <WhatYouGet />
      <div className="mt-6">
        <CTAButton primary large>Book a demo</CTAButton>
      </div>
      <ForwardBox
        heading="Forward this to your managing partner"
        subject="After-hours injury intake: Della from Call Della"
        text={forwardText('Our after-hours injury calls go to voicemail or a message service, and every callback starts the intake from nothing.')}
      />
      <Sources items={[SRC.obj2025, SRC.lmnc2019]} />
    </ServiceLayout>
  );
}
