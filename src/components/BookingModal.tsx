"use client";

import React, { useEffect, useRef, useState } from 'react';
import { BOOKING_URL } from '@/lib/config';

const EMBED_SCRIPT = 'https://crm.antekautomation.com/js/form_embed.js';
const WIDGET_ID = BOOKING_URL.split('/').pop();

export const BookingModal = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Widget loads on first open only: it's ~2 MB and was the main cause of slow mobile LCP.
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded || document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) return;
    const s = document.createElement('script');
    s.src = EMBED_SCRIPT;
    s.async = true;
    document.body.appendChild(s);
  }, [loaded]);

  useEffect(() => {
    const handleOpen = () => {
      setLoaded(true);
      dialogRef.current?.showModal();
    };
    const handleClose = () => dialogRef.current?.close();

    window.addEventListener('open-booking-modal', handleOpen);
    window.addEventListener('close-booking-modal', handleClose);

    return () => {
      window.removeEventListener('open-booking-modal', handleOpen);
      window.removeEventListener('close-booking-modal', handleClose);
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-[var(--bg)]/80 backdrop:backdrop-blur-sm bg-transparent p-0 m-auto border-none open:flex flex-col w-[95%] max-w-[920px] h-[90vh] max-h-[800px]"
      onClick={(e) => {
        if (e.target === dialogRef.current) dialogRef.current.close();
      }}
    >
      <div className="bg-[var(--paper)] border-[1.5px] border-[var(--rule)] relative w-full h-full flex flex-col overflow-hidden shadow-[12px_12px_0_var(--rule)]">
        <div className="bg-[var(--paper-edge)] border-b border-[var(--rule)] px-4 py-3 flex justify-between items-center shrink-0">
          <div className="text-[10px] font-bold text-[var(--ink)] tracking-[0.16em] font-mono uppercase">
            BOOK A DEMO
          </div>
          <button
            onClick={() => dialogRef.current?.close()}
            aria-label="Close booking modal"
            className="w-6 h-6 border-[1.5px] border-[var(--rule)] flex items-center justify-center bg-[var(--paper)] cursor-pointer hover:bg-[var(--paper-deep)] transition-colors"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto">
          {loaded && (
            <iframe
              src={BOOKING_URL}
              id={`${WIDGET_ID}_modal`}
              title="Book a demo with Call Della"
              className="w-full min-h-full border-0 overflow-hidden bg-[var(--paper)]"
              scrolling="no"
              allow="payment"
            />
          )}
        </div>
      </div>
    </dialog>
  );
};

export const openBookingModal = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('open-booking-modal'));
  }
};
