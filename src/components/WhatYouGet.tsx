import { Table } from './Prose';
import { PLANS, INCLUDES, GROUP_EXTRAS, OVERAGE_PER_MINUTE, SETUP_FEE, formatPrice, planByID } from '@/lib/plans';

// "What you get": every price shown with what it includes, all from plans.ts.
export const WhatYouGet = () => {
  const priced = PLANS.filter((p) => p.price !== null);
  const group = planByID('group');
  const extra = `$${OVERAGE_PER_MINUTE.toFixed(2)} each`;
  return (
    <>
      <Table
        caption="What you get on each plan"
        head={['', ...priced.map((p) => p.name)]}
        rows={[
          ['Price', ...priced.map((p) => `${formatPrice(p)} a month`)],
          ['Minutes included', ...priced.map((p) => String(p.minutes))],
          ['Built for', ...priced.map((p) => p.audience)],
          ...INCLUDES.map((i) => [i, ...priced.map(() => 'Yes')]),
          ['Extra minutes', ...priced.map(() => extra)],
        ]}
      />
      <p className="font-serif text-[16px] leading-[1.6] text-[var(--ink)]">
        {group.name}: {GROUP_EXTRAS.map((g) => (g[1] === g[1].toUpperCase() ? g : g[0].toLowerCase() + g.slice(1))).join(', ')}. Every plan is
        month-to-month{SETUP_FEE === 0 ? ' with no setup fee' : ''}.
      </p>
    </>
  );
};
