import { Eyebrow, Headline, Body } from './Typography';
import { JsonLd } from './JsonLd';
import { faqNode, graph, type QA } from '@/lib/schema';

type Props = { items: QA[]; eyebrow?: string; heading: string; id?: string };

// <details> keeps every answer in the server HTML, so AI crawlers read it, and the
// FAQPage schema is built from the same array, so visible text and schema always match.
export const FAQ = ({ items, eyebrow, heading, id }: Props) => {
  if (!items.length) return null;
  return (
    <section id={id} className="px-6 md:px-8 py-24 max-w-[980px] mx-auto">
      <JsonLd data={graph(faqNode(items))} />
      {eyebrow && <Eyebrow center>{eyebrow}</Eyebrow>}
      <Headline as="h2" size={38} center maxWidth={620}>{heading}</Headline>
      <div className="mt-12">
        {items.map((item, i) => (
          <details key={item.q} className="group border-b border-[var(--rule)]">
            <summary className="list-none [&::-webkit-details-marker]:hidden py-[22px] px-1 flex justify-between items-center gap-[18px] cursor-pointer min-h-[48px]">
              <span className="flex gap-[18px] items-baseline flex-1">
                <span className="text-[11px] font-bold text-[var(--ink-soft)] font-mono tracking-[0.1em]" aria-hidden="true">
                  Q{String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-[18px] font-semibold text-[var(--ink)] font-serif tracking-[-0.01em] m-0">{item.q}</h3>
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink-soft)" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <line x1="12" y1="5" x2="12" y2="19" className="group-open:hidden" />
              </svg>
            </summary>
            <div className="pl-[49px] pr-1 pb-[22px] max-w-[780px]">
              <Body size={15}>{item.a}</Body>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};
