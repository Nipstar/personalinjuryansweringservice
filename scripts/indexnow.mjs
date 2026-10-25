// Post-deploy: ping IndexNow (Bing, Yandex, etc.) with every URL in the sitemap.
// Run after the production deploy is live: npm run indexnow
import { readFileSync } from 'node:fs';

const KEY = 'eca315b36833fa78d3c0ab1a15976472'; // public/eca315b36833fa78d3c0ab1a15976472.txt must be served at the site root
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://calldella.com';
const host = new URL(SITE).host;
const urlList = [...readFileSync('out/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} for ${urlList.length} URLs`);
if (!res.ok && res.status !== 202) process.exit(1);
