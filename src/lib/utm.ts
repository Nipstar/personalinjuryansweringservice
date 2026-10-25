import { CALLDELLA_URL, SITE_URL } from './config';

// Every link to calldella.com carries full attribution back to the feeder page and button.
export const calldella = (path: string, campaign: string, content: string) => {
  const u = new URL(path, CALLDELLA_URL);
  u.searchParams.set('utm_source', new URL(SITE_URL).host);
  u.searchParams.set('utm_medium', 'feeder');
  u.searchParams.set('utm_campaign', campaign);
  u.searchParams.set('utm_content', content);
  return u.toString();
};
