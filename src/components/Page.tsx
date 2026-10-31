// Building blocks for the service pages, in the plan's SPIN order, using the home page's markup.
// Server components only; the calculator, forward box and booking buttons are the only client code.
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { PaperTexture } from './PaperTexture';
import { Breadcrumbs } from './Breadcrumbs';
import { CTAButton } from './CTAButton';
import { Eyebrow, Body } from './Typography';
import { DossierMockup } from './DossierMockup';
import { JsonLd } from './JsonLd';
import { Table } from './Prose';
import { page, formatDate } from '@/data/pages';
import { DEMO_MINUTES } from '@/lib/plans';
import { graph, serviceNode, type Citation } from '@/lib/schema';

export const campaign = (slug: string) => (slug === '/' ? 'home' : slug.replace(/^\//, '').replace(/\//g, '-'));

export const ServiceLayout = ({
  slug,
  crumb,
  serviceName,
  serviceType,
  children,
}: {
  slug: string;
  crumb?: string;
  serviceName?: string;
  serviceType?: string;
  children: React.ReactNode;
}) => {
  const entry = page(slug);
  return (
    <div className="relative min-h-screen flex flex-col">
      {serviceName && <JsonLd data={graph(serviceNode({ path: slug, name: serviceName, description: entry.description, serviceType }))} />}
      <PaperTexture />
      <div className="relative z-20 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow px-4 md:px-8 pt-10 pb-16 max-w-[1180px] mx-auto w-full feeder-main feeder-main-820">
          {crumb && <Breadcrumbs items={[{ name: crumb, href: slug }]} />}
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

const HERO_DOSSIER = {
  intakeId: 'SAMPLE-0001',
  timestamp: 'SAMPLE · TUESDAY · 9:42 PM',
  callerName: 'Test Caller A',
  duration: '6M 05S',
  agentTag: 'DELLA',
  matterLine: 'RE: REAR-END COLLISION · URGENCY 4 OF 5',
  quote: 'Neck and back pain, ER visit the same night. Other driver at fault, police report filed. Other driver’s insurer named. Callback number captured.',
  actionLine: 'Sample brief with a test caller. Call back first thing: treatment started, fault clear.',
};

// Same shape as calldella.com's HomeHero: copy left, sample dossier right, one column under md.
export const Hero = ({
  slug,
  eyebrow = 'After-hours intake specialist',
  h1,
  sub,
  trust,
  secondary = { href: '#dossier', label: 'See the dossier' },
}: {
  slug: string;
  eyebrow?: string;
  h1: string;
  sub: string;
  trust?: string;
  secondary?: { href: string; label: string };
}) => {
  const entry = page(slug);
  return (
    <section className="col-wide pt-4 md:pt-8 pb-12 md:pb-16">
      <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-12 md:gap-16 items-center">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-[36px] md:text-[54px] font-semibold text-[var(--ink)] font-serif tracking-[-0.03em] leading-[1.05] m-0">{h1}</h1>
          <div className="mt-7 max-w-[540px]">
            <Body size={18}>{sub}</Body>
          </div>
          <div className="mt-9 flex flex-wrap gap-4">
            <CTAButton primary large>Book a demo</CTAButton>
            <a
              href={secondary.href}
              className="inline-flex items-center min-h-[48px] px-6 font-mono uppercase font-bold tracking-[0.14em] text-[13px] border-[1.5px] border-[var(--ink)] text-[var(--ink)] !no-underline"
            >
              {secondary.label}
            </a>
          </div>
          <p className="mt-4 !text-[12px] text-[var(--ink-soft)] font-mono tracking-[0.08em] !m-0 !mt-4">
            {trust ?? `The demo takes ${DEMO_MINUTES} minutes: a live Della call for your practice area.`}
          </p>
          <p className="!text-[11px] text-[var(--ink-faint)] font-mono uppercase tracking-[0.1em] !m-0 !mt-2">
            Last updated <time dateTime={entry.dateModified}>{formatDate(entry.dateModified)}</time>
          </p>
        </div>
        <figure className="m-0">
          <DossierMockup variant="hero" data={HERO_DOSSIER} />
          <figcaption className="mt-3 text-[10px] text-[var(--ink-faint)] font-mono tracking-[0.14em] uppercase text-center">
            Sample dossier. A test caller, not a real one.
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
export const Source = ({ src }: { src: Citation }) => (
  <>
    {' '}(<a href={src.url} rel="noopener">{src.publisher}{src.year ? `, ${src.year}` : ''}</a>)
  </>
);

// One row per problem the page has already named, five rows at most.
export const ProblemFix = ({ rows, caption = 'How Della meets it' }: { rows: [string, string][]; caption?: string }) => (
  <Table caption={caption} head={['If this is happening', 'What Della does']} rows={rows} />
);
