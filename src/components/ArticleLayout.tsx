import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { PaperTexture } from './PaperTexture';
import { Breadcrumbs } from './Breadcrumbs';
import { Eyebrow } from './Typography';

import { JsonLd } from './JsonLd';
import { graph, articleNode, collectionNode, type Citation } from '@/lib/schema';
import { PAGES, formatDate } from '@/data/pages';

type Props = {
  eyebrow: string;
  title: string;
  tldr: React.ReactNode;
  children: React.ReactNode;
  date: string;
  author: string;
  slug?: string;
  datePublished?: string;
  dateModified?: string;
  breadcrumbs?: { name: string; href: string }[];
  description?: string;
  citations?: Citation[];
};

// Hub = any manifest page that has children under its path (e.g. /guides).
const HUBS = ['/guides'];

// Child pages of a hub, from the manifest plus the state and case-type data.
const hubChildren = (path: string) => {
  if (!HUBS.includes(path)) return [];
  return PAGES.filter((p) => p.path.startsWith(`${path}/`)).map((p) => ({ name: p.title.replace(/ \| Call Della$/, ''), path: p.path }));
};

export const ArticleLayout = ({
  eyebrow,
  title,
  tldr,
  children,
  date,
  author,
  slug,
  datePublished,
  dateModified,
  breadcrumbs,
  description,
  citations,
}: Props) => {
  // Dates and description come from the manifest when the page is in it.
  const entry = slug ? PAGES.find((p) => p.path === slug) : undefined;
  const published = entry?.datePublished ?? datePublished ?? date;
  const modified = entry?.dateModified ?? dateModified ?? published;
  const hubItems = slug ? hubChildren(slug) : [];
  const articleSchema = slug
    ? graph(
        hubItems.length > 0 &&
          collectionNode({
            path: slug,
            name: title,
            description: entry?.description ?? description ?? '',
            items: hubItems,
          }),
        articleNode({
          path: slug,
          headline: title,
          description: entry?.description ?? description ?? '',
          datePublished: published,
          dateModified: modified,
          citations,
        }),
      )
    : null;

  return (
    <div className="relative min-h-screen flex flex-col">
      {articleSchema && <JsonLd data={articleSchema} />}
      <PaperTexture />
      <div className="relative z-20 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow px-4 md:px-8 py-24 max-w-[800px] mx-auto w-full">
          {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-[36px] md:text-[48px] font-semibold text-[var(--ink)] font-serif tracking-[-0.03em] leading-[1.05] mt-4 mb-6">
            {title}
          </h1>
          <div className="flex flex-wrap gap-4 items-center border-y border-[var(--rule-soft)] py-3 mb-10 text-[11px] font-mono text-[var(--ink-soft)] uppercase tracking-[0.1em]">
            <span>
              BY <a href="/about/andy-norman" className="no-underline hover:underline">{author}</a>, FOUNDER, CALL DELLA
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Published <time dateTime={published}>{formatDate(published)}</time>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Updated <time dateTime={modified}>{formatDate(modified)}</time>
            </span>
            {entry?.reviewer && (
              <>
                <span aria-hidden="true">·</span>
                <span>Reviewed by {entry.reviewer}</span>
              </>
            )}
          </div>

          <div className="tldr answer-block bg-[var(--paper)] border-[1.5px] border-[var(--rule)] p-6 md:p-8 mb-16 shadow-[6px_6px_0_var(--rule)] relative">
            <div className="absolute top-[-1px] left-[22px] bg-[var(--paper-edge)] border-[1.5px] border-[var(--rule)] border-b-0 px-3 py-[3px] text-[9.5px] font-bold tracking-[0.16em] font-mono uppercase -translate-y-full">
              THE SHORT ANSWER
            </div>
            <div className="text-[14.5px] text-[var(--ink)] font-serif italic leading-[1.6]">
              {tldr}
            </div>
          </div>

          <article className="article-body">
            {children}
          </article>
        </main>
        <Footer />
      </div>
    </div>
  );
};
