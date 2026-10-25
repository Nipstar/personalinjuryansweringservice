import React from 'react';
import { CTAButton } from '@/components/CTAButton';
import { CRITERIA, CALL_DELLA, FETCHED, type Competitor } from '@/data/competitors';
import { formatDate } from '@/data/pages';
import { DEMO_MINUTES } from '@/lib/plans';

const host = (url: string) => new URL(url).hostname.replace(/^www\./, '') + new URL(url).pathname.replace(/\/$/, '');

// Call Della against one or more competitors on the same criteria. Scrolls inside its own
// box on narrow screens so the page never scrolls sideways.
export const CompareTable = ({ competitors, caption }: { competitors: Competitor[]; caption: string }) => (
  <div className="not-prose my-8">
    <div className="overflow-x-auto border-[1.5px] border-[var(--rule)]">
      <table className={`w-full ${competitors.length > 1 ? 'min-w-[960px]' : 'min-w-[560px]'} border-collapse text-left font-serif text-[14.5px] leading-[1.45] text-[var(--ink)]`}>
        <caption className="caption-bottom px-3 py-3 text-left font-mono text-[11px] tracking-[0.06em] text-[var(--ink-soft)]">
          {caption} Competitor facts as of {formatDate(FETCHED)}, each from the linked page on the competitor&apos;s own site. Call Della
          wrote this table.
        </caption>
        <thead>
          <tr className="bg-[var(--paper-edge)]">
            <th scope="col" className="p-3 font-mono text-[11px] uppercase tracking-[0.1em] align-bottom">Criterion</th>
            <th scope="col" className="p-3 font-mono text-[11px] uppercase tracking-[0.1em] align-bottom">Call Della</th>
            {competitors.map((c) => (
              <th key={c.slug} scope="col" className="p-3 font-mono text-[11px] uppercase tracking-[0.1em] align-bottom">
                {c.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CRITERIA.map(({ key, label }) => (
            <tr key={key} className="border-t border-[var(--rule-soft)] align-top">
              <th scope="row" className="p-3 font-semibold">{label}</th>
              <td className="p-3">{CALL_DELLA[key]}</td>
              {competitors.map((c) => (
                <td key={c.slug} className="p-3">
                  {c.facts[key].text}{' '}
                  <a href={c.facts[key].url} rel="nofollow noopener" className="font-mono text-[10.5px] text-[var(--ink-soft)] underline underline-offset-2 break-all">
                    ({host(c.facts[key].url)})
                  </a>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// The one Book a demo CTA on each compare page.
export const CompareCTA = ({ line }: { line: string }) => (
  <div className="not-prose my-12 border-[1.5px] border-[var(--rule)] bg-[var(--paper)] p-6 md:p-8 shadow-[6px_6px_0_var(--rule)]">
    <p className="m-0 mb-5 font-serif text-[17px] leading-[1.6] text-[var(--ink)]">
      {line} The demo takes {DEMO_MINUTES} minutes: you hear a live Della call for your practice area and see the dossier it produces.
    </p>
    <CTAButton primary>Book a demo</CTAButton>
  </div>
);
