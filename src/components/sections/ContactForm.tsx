"use client";

import { useEffect, useState } from 'react';
import { N8N_WEBHOOK_URL, CONTACT_EMAIL, TURNSTILE_SITE_KEY } from '@/lib/config';

const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export const ContactForm = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (document.querySelector(`script[src="${TURNSTILE_SRC}"]`)) return;
    const s = document.createElement('script');
    s.src = TURNSTILE_SRC;
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot
    if (data.get('website')) {
      setStatus('success');
      return;
    }

    const turnstileToken = data.get('cf-turnstile-response');
    if (!turnstileToken) {
      setStatus('error');
      setErrorMsg('Please complete the security check');
      return;
    }

    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      firm: data.get('firm'),
      phone: data.get('phone') || null,
      practiceArea: data.get('practiceArea'),
      firmSize: data.get('firmSize') || null,
      message: data.get('message') || null,
      submittedAt: new Date().toISOString(),
      source: typeof window !== 'undefined' ? window.location.href : 'unknown',
      turnstileToken,
    };

    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Submission failed');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-[var(--paper)] border-[1.5px] border-[var(--rule)] p-[28px_32px] shadow-[6px_6px_0_var(--rule)] relative">
        <div className="absolute top-[-1px] left-[22px] bg-[var(--stamp-green-soft,var(--paper-edge))] border-[1.5px] border-[var(--stamp-green)] border-b-0 px-3 py-[3px] text-[10px] font-bold text-[var(--stamp-green)] tracking-[0.16em] font-mono uppercase -translate-y-full">
          MESSAGE RECEIVED
        </div>
        <p className="text-[18px] text-[var(--ink)] font-serif leading-[1.55] m-0">
          Got it. We&rsquo;ll reply by email. If this is urgent, email <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
        </p>
      </div>
    );
  }

  const fieldClass =
    'w-full px-4 py-3 bg-[var(--paper)] border-[1.5px] border-[var(--rule)] text-[15px] text-[var(--ink)] font-serif focus:outline-none focus:border-[var(--ink)] focus:shadow-[3px_3px_0_var(--rule)] transition-shadow';
  const labelClass =
    'block text-[10px] font-bold text-[var(--ink-soft)] tracking-[0.18em] font-mono uppercase mb-2';

  return (
    <form onSubmit={handleSubmit} className="bg-[var(--paper)] border-[1.5px] border-[var(--rule)] p-[28px_32px] flex flex-col gap-5">
      {/* Honeypot: hidden from users */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>Your name *</label>
          <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Work email *</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="firm" className={labelClass}>Firm name *</label>
          <input id="firm" name="firm" type="text" required autoComplete="organization" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone (optional)</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="practiceArea" className={labelClass}>Practice area *</label>
          <select id="practiceArea" name="practiceArea" required defaultValue="" className={fieldClass}>
            <option value="" disabled>Select one…</option>
            <option value="personal-injury">Personal Injury</option>
            <option value="criminal-defense">Criminal Defense</option>
            <option value="immigration">Immigration</option>
            <option value="multiple">Multiple practice areas</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="firmSize" className={labelClass}>Firm size (optional)</label>
          <select id="firmSize" name="firmSize" defaultValue="" className={fieldClass}>
            <option value="">Select one…</option>
            <option value="solo">Solo</option>
            <option value="2-5">2–5 attorneys</option>
            <option value="6-15">6–15 attorneys</option>
            <option value="16-50">16–50 attorneys</option>
            <option value="50+">50+ attorneys</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>What are you hoping to solve? (optional)</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={fieldClass}
          placeholder="After-hours call volume, practice areas, what happens to calls now. Whatever helps us prepare."
        />
      </div>

      <div className="cf-turnstile min-h-[65px]" data-sitekey={TURNSTILE_SITE_KEY} data-theme="light" data-size="flexible" />

      {status === 'error' && (
        <div className="px-4 py-3 border-[1.5px] border-[var(--stamp-red)] bg-[var(--paper-edge)] text-[13px] font-mono text-[var(--stamp-red)] tracking-[0.06em]">
          Submission failed: {errorMsg}. Email <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a> directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-2 inline-flex items-center justify-center gap-2.5 px-6 py-[14px] bg-[var(--ink)] text-[var(--paper)] border-[1.5px] border-[var(--ink)] text-[13px] font-bold tracking-[0.14em] font-mono uppercase cursor-pointer transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_var(--rule)] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-none"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>

      <p className="text-[11px] font-mono text-[var(--ink-faint)] tracking-[0.08em] mt-2">
        By submitting, you agree to our <a href="/privacy" className="underline">privacy policy</a>. No spam, no sharing.
      </p>
    </form>
  );
};
