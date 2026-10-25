// Build-time public config. NEXT_PUBLIC_* vars get inlined into the
// client bundle by Next.js — set them in Coolify build environment or
// `.env.local` before `npm run build`. Fallbacks below match production.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://personalinjuryansweringservice.com';

// The main brand site. Organization, founder and offers live there; feeders reference them.
export const CALLDELLA_URL = 'https://calldella.com';

export const PLAUSIBLE_DOMAIN =
  process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? new URL(SITE_URL).host;

export const N8N_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ??
  'https://auto.juxtarank.com/webhook/call-della';

// GHL booking widget (crm.antekautomation.com), shared by calldella.com and the feeder sites.
export const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ??
  'https://crm.antekautomation.com/widget/booking/4rCy7x8UfYzn4YktNNkF';

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@calldella.com';

// Cloudflare Turnstile ("Call Della forms" widget). The token must be verified
// server-side with the secret key wherever the form posts (n8n now, GHL later).
export const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '0x4AAAAAAFljNkiI7CbG-mOH';
