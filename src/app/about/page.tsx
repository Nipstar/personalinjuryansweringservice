import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleLayout } from '@/components/ArticleLayout';
import { CTAButton } from '@/components/CTAButton';
import { Prose, Table, Sources, SRC } from '@/components/Prose';
import { pageMeta, page } from '@/data/pages';
import { CATEGORY_DEFINITION, DEMO_MINUTES } from '@/lib/plans';
import { calldella } from '@/lib/utm';

const PATH = '/about';
const C = 'about';
export const metadata: Metadata = pageMeta(PATH);

export default function Page() {
  const p = page(PATH);
  return (
    <ArticleLayout
      eyebrow="About · Call Della"
      title="Who built Della, and why"
      slug={PATH}
      author="Andy Norman"
      date={p.datePublished}
      breadcrumbs={[{ name: 'About', href: PATH }]}
      citations={[SRC.obj2025]}
      tldr={<p className="m-0">{CATEGORY_DEFINITION}</p>}
    >
      <Prose>
        <h2>Why Call Della exists</h2>
        <p>
          Because the injured caller rings the evening it happens, and nobody picks up. In Clio&apos;s 2024 secret-shopper study only 40% of law firms
          answered a prospective client&apos;s call, as reported by the <a href={SRC.obj2025.url}>Oklahoma Bar Journal (2025)</a>, and the services
          that do answer at night mostly take a name and a number. Call Della was built to take the intake instead: the facts of the matter, an
          urgency score, the recording and the transcript, on the attorney&apos;s desk by dawn.
        </p>

        <h2>Who is behind it</h2>
        <p>
          Call Della was founded by <a href={calldella('/about/andy-norman', C, 'founder')}>Andy Norman</a> and is built by Antek Automation on the
          Retell AI voice platform. Della is the persona on the phone: an intake specialist, not a receptionist, trained on what a personal injury
          intake has to capture. This site and <a href={calldella('/', C, 'brand')}>calldella.com</a> describe the same service in the same words.
        </p>

        <h2>Who you contract with</h2>
        <p>
          Call Della. Plans are month-to-month with no setup fee, and every plan is published on this site&apos;s{' '}
          <a href="/pricing">pricing page</a> and on calldella.com. Call data is encrypted in transit and at rest, your firm owns every recording and
          transcript, retention is set per firm, and your callers&apos; data is never used to train AI models. The full statement is on{' '}
          <a href={calldella('/security', C, 'security')}>calldella.com/security</a>.
        </p>

        <h2>What Della does, and what she never does</h2>
      </Prose>
      <Table
        caption="Della's scope"
        head={['Della does', 'Della never does']}
        rows={[
          ["Answers in your firm's name, nights, weekends and holidays", 'Pretends she is not an AI when asked directly'],
          ['Takes the full personal injury intake on the first call', 'Gives legal advice'],
          ['Scores urgency and alerts the attorney on call', 'Quotes fees or commits the firm to representation'],
          ['Files every call as a dossier by 7am', 'Argues with callers or pressures them to sign'],
        ]}
      />
      <Prose>
        <p>
          Your team takes the morning. Della takes the overnight calls. The <Link href="/">personal injury answering service</Link> page explains how, and
          the <a href="/pricing">pricing page</a> says where a live service is the better fit.
        </p>

        <h2>Hear her first</h2>
        <p>The demo takes {DEMO_MINUTES} minutes: a live Della call for an injury caller while you listen, then the dossier she files.</p>
      </Prose>
      <CTAButton primary large>Book a demo</CTAButton>
      <Sources items={[SRC.obj2025]} />
    </ArticleLayout>
  );
}
