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
import { DEMO_MINUTES } from '@/lib/plans';
import { ALERTS, GROUP, OBJECTIONS, forwardText } from '@/lib/copy';
import { calldella } from '@/lib/utm';

const PATH = '/intake-automation';
const C = 'intake-automation';
export const metadata: Metadata = pageMeta(PATH);

const faq: QA[] = [
  {
    q: 'Does Della do the follow-up?',
    a: `Della automates the first call, the qualifying questions and the urgent-call alert. Follow-up runs where it should: in your team's morning brief and, on the ${GROUP.name} plan, in your own CRM through the dossier webhook. She does not send texts or emails to callers on your behalf, and she never chases anyone to sign.`,
  },
  {
    q: 'Will automating intake lose callers who want a person?',
    a: 'It loses fewer than voicemail does. Della answers every call, speaks calmly, asks one question at a time and tells callers she is an AI if asked. The callers you lose today are the ones who reach a recording at 9pm. Listen to a live demo call and judge the conversation against your current after-hours experience.',
  },
  OBJECTIONS.person,
  OBJECTIONS.bar,
  OBJECTIONS.software,
  OBJECTIONS.price,
];

export default function Page() {
  return (
    <ServiceLayout slug={PATH} crumb="Intake automation" serviceName="Personal injury intake automation" serviceType="Personal injury intake automation">
      <Hero
        slug={PATH}
        eyebrow="Personal injury intake automation"
        h1="Automate personal injury intake without losing the caller"
        sub="Automate the first call, the qualifying and the routing. Keep the advice, the fee and the sign-up with people. Della does the first three at night."
        trust="Built for personal injury intake from the first call · Never gives legal advice · Month-to-month"
      />

      <Prose>
        <h2>What is personal injury intake automation?</h2>
        <p className="answer-block">
          Personal injury intake automation is using software to take the first call, ask the qualifying questions, score urgency and route the
          matter to the right attorney, so people handle only the decisions. It matters most after hours: in Clio&apos;s 2024 secret-shopper study
          only 40% of law firms answered a prospective client&apos;s call.<Source src={SRC.obj2025} />
        </p>

        <h2>Where does the work pile up now?</h2>
        <ul>
          <li>Overnight calls go to voicemail, and the morning starts with cold callbacks.</li>
          <li>A message service sends a name and a number, and someone retypes it into the CRM before the intake has even begun.</li>
          <li>The urgent call, a client in the ER with a clear liability case, sits in the queue with the rest until 9am.</li>
          <li>Follow-up happens when someone remembers, not when the caller is still deciding.</li>
        </ul>

        <h2>What does the manual version cost?</h2>
        <p>
          An ABA Law Practice Division survey, reported by <a href={SRC.lmnc2019.url}>Lawyers Mutual NC (2019)</a>, found fewer than 10% of callers
          reached a lawyer, 32% went to voicemail and 42% waited three days or more for a reply. Every one of those delays is a point where the caller
          rings the next firm. The marketing that made the phone ring is spent either way.
        </p>
      </Prose>

      <MissedCallSection campaign={C} />

      <Prose>
        <h2>What would it change if the first call ran itself?</h2>
        <ul>
          <li>If every overnight caller were qualified and scored by 7am, how would your intake coordinator spend the first hour?</li>
          <li>If the urgent case reached the attorney on call at 9:45pm, how many of those would you sign?</li>
          <li>What would stop falling through the gap between the call and the file?</li>
        </ul>

        <h2>How Della meets it</h2>
      </Prose>
      <ProblemFix
        rows={[
          ['Overnight calls go to voicemail', "Answers in your firm's name, every night, weekend and holiday"],
          ['Messages get retyped before intake begins', 'Takes the full injury intake on the first call and files it as a dossier with the recording and transcript'],
          ['The urgent call waits until 9am', `Scores every caller for urgency and alerts the attorney on call by ${ALERTS} straight away`],
          ['Follow-up depends on memory', `Puts every call in the morning brief by 7am, and on the ${GROUP.name} plan passes each dossier to your CRM by webhook`],
        ]}
      />

      <Prose>
        <h2>What should you automate, and what stays with people?</h2>
        <p>
          The test is simple. If a step needs judgment, a fee or a signature, it stays with a person. If it needs the same questions asked the same way
          at any hour, it can be automated.
        </p>
      </Prose>
      <Table
        caption="Which intake steps to automate"
        head={['Step', 'Automate?', 'Who does it']}
        rows={[
          ['Answering the first call, any hour', 'Yes', 'Della, in your firm’s name'],
          ['Asking the qualifying questions', 'Yes', 'Della, the same questions every time'],
          ['Scoring urgency and alerting the attorney on call', 'Yes', `Della, by ${ALERTS}`],
          ['Filing the call: summary, recording, transcript', 'Yes', 'Della, by 7am'],
          ['Follow-up sequences to callers', 'Yes, in your CRM', `Your system, fed by the morning brief or the ${GROUP.name} webhook`],
          ['Legal advice and case assessment', 'No', 'The attorney'],
          ['Quoting the fee and the retainer', 'No', 'The attorney'],
          ['Signing the client', 'No', 'Your team'],
        ]}
      />

      <Prose>
        <h2>How to automate personal injury intake in four steps</h2>
        <ol>
          <li>Forward your office line after hours, when nobody answers, or both. Your number does not change.</li>
          <li>Della answers, opens with the recording disclosure for your state and takes the injury intake, one question at a time.</li>
          <li>Urgent callers reach the attorney on call by {ALERTS} straight away. Everything else is in the morning brief by 7am.</li>
          <li>Your team works the brief, and your CRM runs follow-up on the dossier, by hand or through the {GROUP.name} webhook.</li>
        </ol>
        <p>
          The questions she asks are set out on the <a href="/personal-injury-intake">personal injury intake</a> page and in the free{' '}
          <a href="/intake-form">intake form</a>. Call Della&apos;s playbook covers the{' '}
          <a href={calldella('/intake-playbook/law-firm-client-intake-process', C, 'intake-process')}>law firm client intake process</a> end to end.
        </p>

        <h2>Is a personal injury intake AI agent the right tool?</h2>
        <p>
          For the first call, yes, if it is built for injury intake and never advises. A general-purpose AI receptionist takes a message in more
          words. Della asks what an experienced intake specialist asks: incident type and date, jurisdiction, injuries, treatment, fault, insurance,
          prior counsel and statute-of-limitations risk. For the decisions that follow, a person is the right tool, and the table above keeps them
          there.
        </p>

        <h2>Hear Della take a call</h2>
        <p>
          Book a {DEMO_MINUTES}-minute demo and we run a live injury call while you listen, then walk you through the dossier she files and where it
          lands in your workflow. Below is a sample, with a test caller.
        </p>
      </Prose>
      <SampleDossier />
      <CTAButton primary>Book a demo</CTAButton>

      <FAQ items={faq} eyebrow="Objections, answered" heading="Questions about automating intake" />

      <Prose>
        <h2>What you get</h2>
      </Prose>
      <WhatYouGet />
      <div className="mt-6">
        <CTAButton primary large>Book a demo</CTAButton>
      </div>
      <ForwardBox
        heading="Forward this to your managing partner"
        subject="Automating after-hours injury intake: Della from Call Della"
        text={forwardText('Our after-hours injury calls go to voicemail or a message service, and the intake gets retyped by hand the next morning.')}
      />
      <Sources items={[SRC.obj2025, SRC.lmnc2019]} />
    </ServiceLayout>
  );
}
