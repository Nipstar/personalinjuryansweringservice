// Per-site settings. This is the only file that differs between feeder repos (plus the pages).
export type NavLink = { href: string; label: string };

export const SITE = {
  id: 'pi',
  name: 'Personal Injury Answering Service',
  domain: 'personalinjuryansweringservice.com',
  // Small line under the logo.
  tagline: 'BY CALL DELLA · PI INTAKE',
  // Main navigation (desktop row and mobile drawer).
  nav: [] as NavLink[],
  // Optional "Guides" dropdown.
  guides: [] as NavLink[],
  // Footer columns.
  footer: [] as { heading: string; links: NavLink[] }[],
};
