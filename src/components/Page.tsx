// Building blocks for the service pages, in the plan's SPIN order, using the home page's markup.
// Server components only; the calculator, forward box and booking buttons are the only client code.
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { PaperTexture } from './PaperTexture';
import { Breadcrumbs } from './Breadcrumbs';
import { CTAButton } from './CTAButton';
import { JsonLd } from './JsonLd';
import { Table } from './Prose';
import { page, formatDate } from '@/data/pages';
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
        <main className="flex-grow px-4 md:px-8 pt-12 md:pt-20 pb-16 max-w-[820px] mx-auto w-full">
          {crumb && <Breadcrumbs items={[{ name: crumb, href: slug }]} />}
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export const Hero = ({
  slug,
  eyebrow,
  h1,
  sub,
  trust,
  secondary = { href: '#dossier', label: 'See the dossier' },
}: {
  slug: string;
  eyebrow: string;
  h1: string;
  sub: string;
  trust?: string;
  secondary?: { href: string; label: string };
}) => {
  const entry = page(slug);
  return (
    <section className="mb-10">
      <div className="text-[11px] font-bold text-[var(--ink-soft)] tracking-[0.22em] font-mono uppercase mb-[14px]">{eyebrow}</div>
      <h1 className="text-[38px] md:text-[56px] font-semibold text-[var(--ink)] font-serif tracking-[-0.03em] leading-[1.04] m-0">{h1}</h1>
      <p className="font-serif text-[19px] md:text-[21px] leading-[1.5] text-[var(--ink)] mt-6 mb-8 max-w-[640px]">{sub}</p>
      <div className="flex flex-wrap items-center gap-4">
        <CTAButton primary large>Book a demo</CTAButton>
        <a
          href={secondary.href}
          className="inline-flex items-center min-h-[48px] px-6 font-mono uppercase font-bold tracking-[0.14em] text-[13px] border-[1.5px] border-[var(--ink)] text-[var(--ink)] no-underline"
        >
          {secondary.label}
        </a>
      </div>
      {trust && <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-soft)]">{trust}</p>}
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-soft)]">
        Last updated <time dateTime={entry.dateModified}>{formatDate(entry.dateModified)}</time>
      </p>
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
