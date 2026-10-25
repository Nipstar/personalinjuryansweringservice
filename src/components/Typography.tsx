import React from 'react';

export const Eyebrow = ({ children, center }: { children: React.ReactNode; center?: boolean }) => (
  <div className={`text-[11px] font-bold text-[var(--ink-soft)] tracking-[0.22em] font-mono uppercase mb-[14px] ${center ? 'text-center' : 'text-left'}`}>
    {children}
  </div>
);

export const Headline = ({ 
  children, 
  size = 36, 
  center, 
  maxWidth,
  as: Component = 'h2'
}: { 
  children: React.ReactNode; 
  size?: number; 
  center?: boolean; 
  maxWidth?: number;
  as?: any;
}) => (
  <Component 
    className={`font-semibold text-[var(--ink)] font-serif tracking-[-0.025em] leading-[1.1] ${center ? 'text-center mx-auto' : 'text-left m-0'}`}
    style={{ fontSize: size, maxWidth }}
  >
    {children}
  </Component>
);

export const Body = ({ 
  children, 
  italic, 
  size = 17, 
  maxWidth = 640, 
  center 
}: { 
  children: React.ReactNode; 
  italic?: boolean; 
  size?: number; 
  maxWidth?: number; 
  center?: boolean; 
}) => (
  <p 
    className={`text-[var(--ink)] font-serif leading-[1.65] ${italic ? 'italic' : 'not-italic'} ${center ? 'text-center mx-auto' : 'text-left m-0'}`}
    style={{ fontSize: size, maxWidth }}
  >
    {children}
  </p>
);
