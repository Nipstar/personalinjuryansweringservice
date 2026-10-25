"use client";

import React from "react";
import { openBookingModal } from "./BookingModal";

const Icon = ({ n, s = 16, c = "currentColor" }: { n: string, s?: number, c?: string }) => {
  if (n === "arrow") {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
      </svg>
    );
  }
  return null;
};

interface CTAButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  dark?: boolean;
  large?: boolean;
  onClick?: () => void;
}

export const CTAButton = ({ children, primary, dark, large, onClick }: CTAButtonProps) => {
  const bg = dark ? "var(--paper)" : (primary ? "var(--ink)" : "transparent");
  const fg = dark ? "var(--ink)" : (primary ? "var(--paper)" : "var(--ink)");
  const border = dark ? "var(--paper)" : "var(--ink)";
  
  const handleClick = onClick || openBookingModal;
  
  return (
    <button 
      onClick={handleClick} 
      className={`inline-flex items-center gap-2.5 font-mono uppercase font-bold tracking-[0.14em] cursor-pointer transition-all duration-150 ${large ? "px-6 py-[14px] text-[13px]" : "px-5 py-[11px] text-[11.5px]"}`}
      style={{
        background: bg,
        color: fg,
        border: `1.5px solid ${border}`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translate(-2px,-2px)";
        e.currentTarget.style.boxShadow = `4px 4px 0 ${dark ? "var(--paper)80" : "var(--rule)"}`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translate(0,0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {children}
      <Icon n="arrow" s={large ? 15 : 13} c={fg}/>
    </button>
  );
};
