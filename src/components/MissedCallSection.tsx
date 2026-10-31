import { MissedCallCalculator, type MissedCallExample } from './MissedCallCalculator';
import { calldella } from '@/lib/utm';

// Example starting positions for this PI site. Labelled as examples on the page, not benchmarks.
export const PI_EXAMPLE: MissedCallExample = { missed: 40, newShare: 50, signRate: 20, fee: 10000 };

const para = 'text-[17px] text-[var(--ink)] font-serif leading-[1.65] m-0';
const link = 'underline decoration-[var(--rule-soft)] underline-offset-4 hover:decoration-[var(--ink)]';

// Mirrors calldella.com's components/sections/MissedCallSection.tsx. `matter` tunes the wording
// for a practice area; the formula never changes. `campaign` is the page slug for the UTM link.
export const MissedCallSection = ({ campaign, matter = 'injury case', example = PI_EXAMPLE }: { campaign: string; matter?: string; example?: MissedCallExample }) => (
  <section id="missed-call-cost" className="py-14">
    <h2 className="font-serif text-[26px] md:text-[34px] font-semibold tracking-[-0.025em] leading-[1.1] text-[var(--ink)] m-0">
      What are missed calls costing your firm?
    </h2>
    <div className="mt-6 flex flex-col gap-4">
      <p className={para}>
        The cost of a missed call is the fee from the {matter} that caller would have signed. Work it out for your own firm:{' '}
        <strong>missed calls a month &times; share that are new matters &times; your sign rate &times; your average fee</strong>. The sliders start
        on example figures. Move them to your own numbers.
      </p>
      <MissedCallCalculator example={example} />
      <p className={para}>
        For the method and what to count as a missed call, see the{' '}
        <a href={calldella('/operations/missed-call-cost-calculator', campaign, 'missed-call-calculator')} className={link}>
          full missed-call cost calculator on calldella.com
        </a>
        .
      </p>
    </div>
  </section>
);
