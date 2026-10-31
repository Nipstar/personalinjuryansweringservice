'use client';

import { useState } from 'react';

const btn =
  'inline-flex items-center min-h-[48px] px-5 font-mono uppercase font-bold tracking-[0.14em] text-[11.5px] border-[1.5px] border-[var(--ink)] text-[var(--ink)] bg-transparent cursor-pointer no-underline';

// The forwardable note for the managing partner: the text is in the server HTML, the buttons copy or email it.
export const ForwardBox = ({ heading, subject, text }: { heading: string; subject: string; text: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };
  return (
    <section className="my-16 border-[1.5px] border-dashed border-[var(--rule)] bg-[var(--paper)] p-6 md:p-8" aria-labelledby="forward-box">
      <h2 id="forward-box" className="font-serif text-[22px] font-semibold text-[var(--ink)] m-0 mb-4">{heading}</h2>
      <p className="font-serif text-[16px] leading-[1.6] text-[var(--ink)] italic m-0 mb-6">{text}</p>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={copy} className={btn}>
          {copied ? 'Copied' : 'Copy text'}
        </button>
        <a href={`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`} className={btn}>
          Email it
        </a>
      </div>
      <span className="sr-only" aria-live="polite">{copied ? 'Text copied to the clipboard' : ''}</span>
    </section>
  );
};
