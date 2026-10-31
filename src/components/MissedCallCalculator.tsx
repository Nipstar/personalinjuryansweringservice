'use client';

// Copied from calldella.com's src/app/operations/calculators.tsx (missed-call part only), so all three
// sites carry the same calculator. The formula is also written out in the server HTML by MissedCallSection.
// Sliders start on labelled example figures, not benchmarks.
import React, { useState } from 'react';

const usd = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const Shell = ({ title, children, result }: { title: string; children: React.ReactNode; result: React.ReactNode }) => (
  <form className="my-10 border-[1.5px] border-[var(--rule)] bg-[var(--paper-edge)] p-5 md:p-8" onSubmit={(e) => e.preventDefault()} aria-label={title}>
    <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--ink-soft)] mb-6">{title}</p>
    {children}
    <output aria-live="polite" className="block mt-8 border-t-[1.5px] border-[var(--rule)] pt-6 font-serif text-[var(--ink)]">
      {result}
    </output>
  </form>
);


export const missedCallCost = (missed: number, newShare: number, signRate: number, fee: number) =>
  missed * (newShare / 100) * (signRate / 100) * fee;

type Slider = { id: 'missed' | 'newShare' | 'signRate' | 'fee'; label: string; hint: string; min: number; max: number; step: number; fmt: (n: number) => string };

const SLIDERS: Slider[] = [
  { id: 'missed', label: 'Missed calls per month', hint: 'Voicemail, rang out or hung up, from your phone log', min: 0, max: 300, step: 5, fmt: (n) => `${n}` },
  { id: 'newShare', label: 'Share that are new-matter inquiries', hint: 'Leave out existing clients, vendors and spam', min: 0, max: 100, step: 5, fmt: (n) => `${n}%` },
  { id: 'signRate', label: 'Your sign rate on answered inquiries', hint: 'Signed matters divided by new inquiries answered', min: 0, max: 100, step: 5, fmt: (n) => `${n}%` },
  { id: 'fee', label: 'Average fee per signed matter', hint: 'The fee you receive, not the gross settlement', min: 0, max: 50000, step: 500, fmt: (n) => usd(n) },
];

export type MissedCallExample = { missed: number; newShare: number; signRate: number; fee: number };

// Starting positions are examples for the reader to move, not industry averages.
export const DEFAULT_EXAMPLE: MissedCallExample = { missed: 40, newShare: 50, signRate: 25, fee: 5000 };

export const MissedCallCalculator = ({ example = DEFAULT_EXAMPLE }: { example?: MissedCallExample }) => {
  const [v, setV] = useState<MissedCallExample>(example);
  const month = missedCallCost(v.missed, v.newShare, v.signRate, v.fee);
  const matters = v.missed * (v.newShare / 100) * (v.signRate / 100);
  return (
    <Shell
      title="Missed-call cost calculator"
      result={
        <>
          <span className="block text-[15px] text-[var(--ink-soft)]">Fees at risk from missed calls</span>
          <span className="block text-[32px] font-semibold">{usd(month)} a month</span>
          <span className="block text-[17px]">
            {usd(month * 12)} a year, about {matters.toFixed(1)} signed matters a month, if missed callers would sign at your normal rate.
          </span>
        </>
      }
    >
      <p className="font-serif text-[14px] italic text-[var(--ink-soft)] mt-0 mb-6">
        The sliders start on example figures, not industry averages. Move them to your firm&rsquo;s numbers.
      </p>
      <div className="grid gap-7 md:grid-cols-2">
        {SLIDERS.map((f) => (
          <label key={f.id} htmlFor={`mc-${f.id}`} className="block">
            <span className="flex justify-between items-baseline gap-3">
              <span className="font-serif text-[16px] font-semibold text-[var(--ink)]">{f.label}</span>
              <span className="font-mono text-[16px] font-bold text-[var(--ink)] tabular-nums">{f.fmt(v[f.id])}</span>
            </span>
            <span className="block font-serif text-[14px] text-[var(--ink-soft)] mb-2">{f.hint}</span>
            <input
              id={`mc-${f.id}`}
              type="range"
              min={f.min}
              max={f.max}
              step={f.step}
              value={v[f.id]}
              aria-valuetext={f.fmt(v[f.id])}
              onChange={(e) => setV((s) => ({ ...s, [f.id]: Number(e.target.value) }))}
              className="calc-slider w-full"
            />
          </label>
        ))}
      </div>
    </Shell>
  );
};
