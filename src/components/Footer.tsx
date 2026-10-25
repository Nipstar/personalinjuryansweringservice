import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/config";
import { CATEGORY_DEFINITION } from "@/lib/plans";
import { SITE } from "@/lib/site";

type Col = { title: string; links: { href: string; label: string }[] };

const cols: Col[] = [
  ...SITE.footer.map((f) => ({ title: f.heading, links: f.links })),
  {
    title: "Contact",
    links: [{ href: `mailto:${CONTACT_EMAIL}`, label: CONTACT_EMAIL }],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of service" },
    ],
  },
];

const linkClass =
  "inline-flex items-center min-h-[32px] text-[13.5px] text-[var(--ink)] font-serif no-underline hover:underline decoration-[var(--rule-soft)] underline-offset-4 break-all sm:break-normal";

export const Footer = () => (
  <footer className="px-4 md:px-8 pt-[60px] pb-8 border-t border-[var(--rule)]">
    <div className="max-w-[1180px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-x-6 gap-y-10">
      <div className="col-span-2 md:col-span-3 lg:col-span-1">
        <Link href="/" className="block no-underline">
          <div className="text-[22px] font-semibold text-[var(--ink)] font-serif tracking-tight leading-none">call della</div>
          <div className="text-[9.5px] font-bold text-[var(--ink-soft)] tracking-[0.22em] font-mono mt-1.5 uppercase">{SITE.tagline}</div>
        </Link>
        <p className="text-[13px] text-[var(--ink-soft)] font-serif italic mt-3.5 max-w-[320px]">{CATEGORY_DEFINITION}</p>
      </div>

      {cols.map((c) => (
        <nav key={c.title} aria-label={c.title}>
          <h2 className="text-[10px] font-bold text-[var(--ink-soft)] font-mono tracking-[0.18em] mb-3.5 mt-0 uppercase">{c.title}</h2>
          <ul className="flex flex-col gap-1 m-0 p-0 list-none">
            {c.links.map((l) => (
              <li key={l.href + l.label}>
                <a href={l.href} className={linkClass}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>
    <div className="max-w-[1180px] mx-auto mt-10 pt-5 border-t border-[var(--rule-soft)] text-center text-[10px] text-[var(--ink-soft)] font-mono tracking-[0.18em]">
      © 2026 CALL DELLA · ALL RIGHTS RESERVED · DELLA IS MADE BY{' '}
      <a href="https://www.antekautomation.com" className="text-[var(--ink-soft)] underline decoration-[var(--rule-soft)] underline-offset-4 hover:text-[var(--ink)]">ANTEK AUTOMATION</a>
    </div>
  </footer>
);
