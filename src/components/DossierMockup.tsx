import React from 'react';
import { Stamp } from './Stamp';
import { Rule } from './Rule';
export type HeroDossier = {
  intakeId: string;
  timestamp: string;
  callerName: string;
  duration: string;
  agentTag: string;
  matterLine: string;
  quote: string;
  actionLine: string;
  languageTag?: string;
};

interface DossierMockupProps {
  variant: 'hero' | 'dashboard';
  data?: HeroDossier;
}

const defaultHeroData: HeroDossier = {
  intakeId: 'INT-04421',
  timestamp: '04 MAY 2026 · 23:42 CDT',
  callerName: 'Maria Gonzalez',
  duration: '4M 18S',
  agentTag: 'DELLA',
  matterLine: 'RE: REAR-END COLLISION, I-90',
  quote:
    '"I was stopped at a red light and this guy just ploughed into me. I\'ve been in pain since and don\'t know what to do."',
  actionLine: 'High-value intake. ER visit confirmed, fault admitted at scene.',
};

export const DossierMockup = ({ variant, data }: DossierMockupProps) => {
  const ariaLabel =
    variant === 'hero'
      ? 'Sample Della intake report: caller name, phone number, incident summary, urgency stamp.'
      : 'Sample morning dossier dashboard: overnight calls sorted by urgency tier with caller details and recommended actions.';

  if (variant === 'hero') {
    const d = data ?? defaultHeroData;
    return (
      <div role="img" aria-label={ariaLabel} className="relative py-[30px] w-full max-w-lg mx-auto">
        <div className="bg-[var(--paper)] border-[1.5px] border-[var(--rule)] p-[22px_26px] shadow-[6px_6px_0_var(--rule)] rotate-[1.5deg] relative">
          <div className="absolute top-[-1px] left-[22px] bg-[var(--paper-edge)] border-[1.5px] border-[var(--rule)] border-b-0 px-3 py-[3px] text-[10px] font-bold text-[var(--ink-soft)] tracking-[0.14em] font-mono -translate-y-full">
            SAMPLE · INTAKE REPORT · {d.intakeId.replace(/^SAMPLE /, '')}
          </div>
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="text-[11px] text-[var(--ink-faint)] font-mono tracking-[0.06em]">{d.timestamp}</div>
              <div className="text-[22px] font-semibold text-[var(--ink)] font-serif mt-1 tracking-[-0.015em]">{d.callerName}</div>
            </div>
            <div className="-rotate-3"><Stamp kind="urgent" size="lg"/></div>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3.5 items-center">
            <Stamp kind="new"/>
            <span className="text-[10px] text-[var(--ink-soft)] font-mono px-[7px] py-[3px] tracking-[0.08em]">{d.duration} · {d.agentTag}</span>
            {d.languageTag && (
              <span className="text-[9.5px] text-[var(--stamp-blue)] font-mono px-[6px] py-[2px] tracking-[0.1em] border border-[var(--stamp-blue)]">
                {d.languageTag}
              </span>
            )}
          </div>
          <div className="border-y border-[var(--rule-soft)] py-2.5 mb-3.5 text-[11px] font-mono text-[var(--ink-soft)] tracking-[0.06em]">
            {d.matterLine}
          </div>
          <p className="text-[13.5px] text-[var(--ink)] font-serif italic leading-[1.55] p-[12px_14px] bg-[var(--paper-edge)] border-l-[3px] border-[var(--rule)] m-0">
            {d.quote}
          </p>
          <div className="mt-3.5 py-2.5 border-t-[2px] border-double border-[var(--stamp-red)] text-[12px] font-serif text-[var(--ink)] leading-[1.5]">
            <span className="font-mono text-[9.5px] font-bold text-[var(--stamp-red)] tracking-[0.18em] block mb-1.5 uppercase">ACTION REQUIRED</span>
            {d.actionLine}
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Variant
  return (
    <div role="img" aria-label={ariaLabel} className="mt-[60px] bg-[var(--paper)] border-[1.5px] border-[var(--rule)] shadow-[8px_8px_0_var(--rule)] overflow-hidden w-full">
      <div className="bg-[var(--paper-edge)] border-b border-[var(--rule)] px-4 py-2.5 flex items-center gap-2.5">
        <div className="flex gap-1.5">
          {['var(--stamp-red)', 'var(--stamp-mustard)', 'var(--stamp-green)'].map(c => (
            <div key={c} className="w-2.5 h-2.5 opacity-50 border border-[var(--rule)]" style={{ background: c }} />
          ))}
        </div>
        <div className="flex-1 ml-3 px-2.5 py-1 bg-[var(--paper)] border border-[var(--rule)] text-[11px] font-mono text-[var(--ink-soft)]">
          app.calldella.com/dashboard
        </div>
      </div>
      <div className="px-5 py-6 md:px-8 md:py-7">
        <div className="text-[10.5px] font-bold text-[var(--ink-soft)] tracking-[0.18em] font-mono mb-1 uppercase">
          OVERNIGHT INTAKE LOG · 04 MAY 2026
        </div>
        <div className="text-[24px] font-semibold text-[var(--ink)] font-serif tracking-[-0.02em]">
          Good evening, Harrison & Moore
        </div>
        <p className="text-[13px] text-[var(--ink-soft)] font-serif italic mt-1.5 mb-6">
          Della handled 6 calls overnight. 2 require urgent follow-up; 2 pending review.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-7">
          {[
            { l:"CALLS TONIGHT", v:"6", s:"since 18:00 CDT" },
            { l:"URGENT", v:"2", s:"callback today" },
            { l:"NEW ENQUIRIES", v:"4", s:"potential clients" },
            { l:"AVG DURATION", v:"3m 47s", s:"vs 3m 12s last wk" }
          ].map(s => (
            <div key={s.l} className="bg-[var(--paper)] border border-[var(--rule)] px-3.5 py-3">
              <div className="text-[8.5px] font-bold text-[var(--ink-soft)] tracking-[0.14em] font-mono uppercase">{s.l}</div>
              <div className="h-[1px] bg-[var(--rule-soft)] my-1.5" />
              <div className="text-[22px] font-semibold text-[var(--ink)] font-serif leading-none tracking-[-0.015em]">{s.v}</div>
              <div className="text-[10px] text-[var(--ink-soft)] font-serif italic mt-1">{s.s}</div>
            </div>
          ))}
        </div>

        <Rule label="Urgent · Callback Required Today" />

        {[
          { name:"Maria Gonzalez", reason:"High-value intake. ER visit confirmed, fault admitted at scene.", time:"23:42", id:"INT-04421" },
          { name:"Sandra Okafor", reason:"Urgent — opposing insurance contact already made. Fracture confirmed.", time:"21:03", id:"INT-04419" }
        ].map(c => (
          <div key={c.id} className="bg-[var(--paper)] border-[1.5px] border-[var(--stamp-red)] border-l-[3px] p-[14px_18px] mb-2.5 relative">
            <div className="absolute top-3 right-3.5 -rotate-3"><Stamp kind="urgent"/></div>
            <div className="text-[9.5px] font-bold text-[var(--ink-soft)] tracking-[0.14em] font-mono uppercase">{c.id} · {c.time}</div>
            <div className="text-[16px] font-semibold text-[var(--ink)] font-serif mt-1">{c.name}</div>
            <div className="text-[12.5px] text-[var(--ink)] font-serif mt-1.5 md:mr-[90px] leading-[1.45]">{c.reason}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
