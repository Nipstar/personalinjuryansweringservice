import { calldella } from './utm';

// Per-site settings. This is the only file that differs between feeder repos (plus the pages).
export type NavLink = { href: string; label: string };

export const SITE = {
  id: 'pi',
  name: 'Personal Injury Answering Service',
  domain: 'personalinjuryansweringservice.com',
  // Small line under the logo.
  tagline: 'BY CALL DELLA · PI INTAKE',
  // Main navigation (desktop row and mobile drawer).
  nav: [
    { href: '/personal-injury-intake', label: 'PI intake' },
    { href: '/mass-tort-intake', label: 'Mass tort' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/intake-form', label: 'Intake form' },
    { href: '/about', label: 'About' },
  ] as NavLink[],
  // Optional "Guides" dropdown.
  guides: [] as NavLink[],
  // Footer columns.
  footer: [
    {
      heading: 'This site',
      links: [
        { href: '/', label: 'PI answering service' },
        { href: '/personal-injury-intake', label: 'Personal injury intake' },
        { href: '/intake-automation', label: 'Intake automation' },
        { href: '/mass-tort-intake', label: 'Mass tort intake' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/intake-form', label: 'Free intake form' },
        { href: '/about', label: 'About' },
      ],
    },
    {
      heading: 'Call Della',
      links: [
        { href: calldella('/', 'footer', 'footer-home'), label: 'calldella.com' },
        { href: calldella('/personal-injury', 'footer', 'footer-personal-injury'), label: 'Personal injury intake' },
        { href: calldella('/compliance', 'footer', 'footer-compliance'), label: 'Compliance guides' },
        { href: calldella('/intake-playbook', 'footer', 'footer-playbook'), label: 'Intake playbook' },
        { href: calldella('/operations/law-firm-missed-calls-data', 'footer', 'footer-missed-calls-data'), label: 'Missed-calls data' },
        { href: calldella('/security', 'footer', 'footer-security'), label: 'Security' },
      ],
    },
  ] as { heading: string; links: NavLink[] }[],
};
