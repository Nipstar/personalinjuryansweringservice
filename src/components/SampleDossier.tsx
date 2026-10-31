import { Stamp } from './Stamp';

// A sample dossier from a test call. Labelled "Sample"; never shows a phone number.
const ROWS: [string, string][] = [
  ['Caller', 'Test Caller A'],
  ['Matter', 'Rear-end collision, Tuesday 9:42pm'],
  ['Injuries', 'Neck and back pain, ER visit the same night'],
  ['Fault', 'Other driver at fault, police report filed'],
  ['Insurance', "Other driver's insurer named"],
  ['Urgency', '4 of 5'],
  ['Callback', 'Number captured'],
];

export const SampleDossier = () => (
  <figure id="dossier" className="relative mt-10 mb-6 max-w-[560px] scroll-mt-24">
    <div className="bg-[var(--paper)] border-[1.5px] border-[var(--rule)] p-[22px_26px] shadow-[6px_6px_0_var(--rule)] relative">
      <div className="absolute top-[-1px] left-[22px] bg-[var(--paper-edge)] border-[1.5px] border-[var(--rule)] border-b-0 px-3 py-[3px] text-[10px] font-bold text-[var(--ink-soft)] tracking-[0.14em] font-mono -translate-y-full">
        SAMPLE · INTAKE DOSSIER · TEST CALL
      </div>
      <div className="flex justify-between items-start mb-4 gap-4">
        <div className="text-[20px] font-semibold text-[var(--ink)] font-serif tracking-[-0.015em]">Personal injury intake</div>
        <div className="-rotate-3 shrink-0"><Stamp kind="urgent" /></div>
      </div>
      <dl className="m-0 border-t border-[var(--rule-soft)]">
        {ROWS.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[96px_1fr] gap-3 py-2 border-b border-[var(--rule-soft)]">
            <dt className="font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-[var(--ink-soft)] pt-[3px]">{k}</dt>
            <dd className="m-0 font-serif text-[15px] text-[var(--ink)]">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
    <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--ink-soft)]">
      Sample: a test call, not a real caller
    </figcaption>
  </figure>
);
