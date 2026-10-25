import React from 'react';

interface StampProps {
  kind: 'urgent' | 'pending' | 'closed' | 'new' | 'popular' | string;
  label?: string;
  size?: 'sm' | 'lg';
  rotate?: number;
}

export const Stamp = ({ kind, label, size = 'sm', rotate = 0 }: StampProps) => {
  const map: Record<string, { bg: string, fg: string, l: string }> = {
    urgent: { bg: 'var(--stamp-red-soft)', fg: 'var(--stamp-red)', l: 'URGENT' },
    pending: { bg: 'var(--stamp-mustard-soft)', fg: 'var(--stamp-mustard)', l: 'PENDING' },
    closed: { bg: 'var(--stamp-green-soft)', fg: 'var(--stamp-green)', l: 'CLOSED' },
    new: { bg: 'var(--stamp-red-soft)', fg: 'var(--stamp-red)', l: 'NEW INTAKE' },
    popular: { bg: 'var(--stamp-red-soft)', fg: 'var(--stamp-red)', l: 'MOST POPULAR' },
  };

  const s = map[kind] || { bg: 'transparent', fg: 'var(--ink-soft)', l: kind };
  const pad = size === 'lg' ? 'px-[11px] py-[5px]' : 'px-[7px] py-[3px]';
  const fs = size === 'lg' ? 'text-[11px]' : 'text-[9.5px]';

  return (
    <span 
      className={`inline-block border-[1.5px] font-bold tracking-[0.12em] font-mono uppercase whitespace-nowrap ${pad} ${fs}`}
      style={{
        borderColor: s.fg,
        color: s.fg,
        backgroundColor: s.bg,
        transform: rotate ? `rotate(${rotate}deg)` : 'none'
      }}
    >
      {label || s.l}
    </span>
  );
};
