import React from 'react';

export const Rule = ({ label, mt = 0 }: { label?: string; mt?: number }) => (
  <div className="flex items-center gap-[14px] max-w-full mb-[18px]" style={{ marginTop: mt }}>
    <div className="h-[1px] bg-[var(--rule-soft)]" style={{ flex: label ? "0 0 30px" : 1 }} />
    {label && (
      <>
        <span className="text-[10px] font-bold text-[var(--ink-soft)] tracking-[0.22em] font-mono uppercase whitespace-nowrap">
          {label}
        </span>
        <div className="flex-1 h-[1px] bg-[var(--rule-soft)]" />
      </>
    )}
  </div>
);
