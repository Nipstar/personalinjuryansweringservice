"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CTAButton } from "./CTAButton";
import { SITE, type NavLink } from "@/lib/site";


const navLinkClass =
  "inline-flex items-center min-h-[48px] hover:text-[var(--stamp-red)] focus-visible:text-[var(--stamp-red)] transition-colors no-underline";

const Chevron = ({ open, size = 10 }: { open: boolean; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s" }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// Disclosure menu (button + list of links). Escape closes and returns focus; tabbing out closes.
const Dropdown = ({ id, label, links, open, setOpen }: { id: string; label: string; links: NavLink[]; open: boolean; setOpen: (v: boolean) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  return (
    <div
      ref={ref}
      className="relative"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          btn.current?.focus();
        }
      }}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={btn}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
        className="flex items-center gap-1.5 min-h-[48px] bg-transparent border-none p-0 m-0 font-bold tracking-[0.14em] font-mono uppercase text-[12px] text-[var(--ink)] cursor-pointer hover:text-[var(--stamp-red)] transition-colors"
      >
        {label}
        <Chevron open={open} />
      </button>
      <ul
        id={id}
        hidden={!open}
        className="absolute top-full right-0 mt-1 w-[260px] m-0 p-0 list-none bg-[var(--paper)] border-[1.5px] border-[var(--rule)] shadow-[5px_5px_0_var(--rule)] z-40"
      >
        {links.map((l) => (
          <li key={l.href} className="border-b border-[var(--rule-soft)] last:border-b-0">
            <a
              href={l.href}
              className="flex items-center min-h-[48px] px-5 py-3 text-[12px] font-bold tracking-[0.14em] font-mono uppercase text-[var(--ink)] no-underline hover:bg-[var(--paper-edge)] focus-visible:bg-[var(--paper-edge)]"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mobileLinkClass =
  "flex items-center min-h-[48px] py-3 border-b border-[var(--rule-soft)] text-[16px] font-bold tracking-[0.14em] font-mono uppercase text-[var(--ink)] no-underline";

const MobileGroup = ({ id, label, links, onNavigate }: { id: string; label: string; links: NavLink[]; onNavigate: () => void }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="flex items-center justify-between w-full min-h-[48px] text-left bg-transparent border-0 border-b border-[var(--rule-soft)] p-0 py-3 cursor-pointer text-[16px] font-bold tracking-[0.14em] font-mono uppercase text-[var(--ink)]"
      >
        <span>{label}</span>
        <Chevron open={open} size={14} />
      </button>
      <ul id={id} hidden={!open} className="m-0 p-0 list-none bg-[var(--paper-edge)] border-x border-[var(--rule-soft)]">
        {links.map((l) => (
          <li key={l.href} className="border-b border-[var(--rule-soft)] last:border-b-0">
            <a
              href={l.href}
              onClick={onNavigate}
              className="flex items-center min-h-[48px] px-5 py-3 text-[14px] font-bold tracking-[0.14em] font-mono uppercase text-[var(--ink)] no-underline"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export const Header = () => {
  const [openMenu, setOpenMenu] = useState<"guides" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const openBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      openBtn.current?.focus();
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-30 bg-[var(--bg)]/90 border-b border-[var(--rule)] px-4 md:px-8 py-2 flex justify-between items-center backdrop-blur-md">
      <Link href="/" className="block no-underline py-1.5">
        <div className="text-[20px] md:text-[22px] font-semibold text-[var(--ink)] font-serif tracking-tight leading-none">
          call della
        </div>
        <div className="text-[8.5px] font-bold text-[var(--ink-soft)] tracking-[0.22em] font-mono mt-[3px] uppercase">
          {SITE.tagline}
        </div>
      </Link>

      <nav aria-label="Main" className="hidden lg:flex items-center gap-7 text-[12px] font-bold text-[var(--ink)] tracking-[0.14em] font-mono uppercase">
        {SITE.nav.map((l) => (
          <a key={l.href} href={l.href} className={navLinkClass}>{l.label}</a>
        ))}
        {SITE.guides.length > 0 && (
          <Dropdown
            id="nav-guides"
            label="Guides"
            links={SITE.guides}
            open={openMenu === "guides"}
            setOpen={(v) => setOpenMenu(v ? "guides" : null)}
          />
        )}
        <CTAButton primary>Book a demo</CTAButton>
      </nav>

      <button
        ref={openBtn}
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav"
        className="lg:hidden flex flex-col justify-center items-center w-12 h-12 border-[1.5px] border-[var(--ink)] bg-transparent cursor-pointer gap-[5px]"
      >
        <span className="block w-5 h-[1.5px] bg-[var(--ink)]" aria-hidden="true" />
        <span className="block w-5 h-[1.5px] bg-[var(--ink)]" aria-hidden="true" />
        <span className="block w-5 h-[1.5px] bg-[var(--ink)]" aria-hidden="true" />
      </button>

      {mobileOpen && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 bg-[var(--bg)] flex flex-col lg:hidden"
        >
          <div className="flex justify-between items-center px-4 py-2 border-b border-[var(--rule)]">
            <Link href="/" onClick={closeMobile} className="block no-underline py-1.5">
              <div className="text-[20px] font-semibold text-[var(--ink)] font-serif tracking-tight leading-none">
                call della
              </div>
              <div className="text-[8.5px] font-bold text-[var(--ink-soft)] tracking-[0.22em] font-mono mt-[3px] uppercase">
                {SITE.tagline}
              </div>
            </Link>
            <button
              ref={closeBtn}
              type="button"
              onClick={closeMobile}
              aria-label="Close menu"
              className="w-12 h-12 border-[1.5px] border-[var(--ink)] bg-transparent cursor-pointer flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-grow overflow-y-auto px-4 py-6 flex flex-col">
            {SITE.nav.map((l) => (
              <a key={l.href} href={l.href} onClick={closeMobile} className={mobileLinkClass}>{l.label}</a>
            ))}
            {SITE.guides.length > 0 && <MobileGroup id="mobile-guides" label="Guides" links={SITE.guides} onNavigate={closeMobile} />}

            <div className="mt-8" onClick={closeMobile}>
              <CTAButton primary large>Book a demo</CTAButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
