import type { Metadata } from "next";
import { Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, PLAUSIBLE_DOMAIN } from "@/lib/config";
import { graph, orgNode, websiteNode, founderNode } from "@/lib/schema";
import { page } from "@/data/pages";
import { JsonLd } from "@/components/JsonLd";
import { BookingModal } from "@/components/BookingModal";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  // optional: no late swap, so no LCP repaint or layout shift on slow connections.
  // First visit may keep the metric-matched fallback; the cached font is used after that.
  display: "optional",
});

// Mono is only used for small labels; don't let it compete with the body font for bandwidth.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  preload: false,
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AI Legal Intake for Law Firms, After Hours | Call Della",
    template: "%s | Call Della",
  },
  description: page("/").description,
  applicationName: "Call Della",
  authors: [{ name: "Andy Norman", url: `${SITE_URL}/about/andy-norman` }],
  creator: "Call Della",
  publisher: "Call Della",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Call Della",
    title: "AI Legal Intake for Law Firms, After Hours | Call Della",
    description:
      "Della answers your firm's overnight calls, qualifies every caller, and delivers a triage-ready dossier by dawn.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Call Della" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Legal Intake for Law Firms, After Hours | Call Della",
    description:
      "Della answers your firm's overnight calls and delivers a triage-ready dossier by dawn.",
    images: ["/og-default.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  // Set these in Vercel once Search Console / Bing Webmaster Tools give you the codes.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${jetbrainsMono.variable} h-full antialiased`}
      data-theme="light"
    >
      <head>
        <script
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) };",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-serif bg-[var(--bg)] text-[var(--ink)]">
        <JsonLd data={graph(orgNode(), websiteNode(), founderNode())} />
        {children}
        <BookingModal />
      </body>
    </html>
  );
}
