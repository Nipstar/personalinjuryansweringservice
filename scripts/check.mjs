// Post-build checks on out/: copy rules, phone numbers, UTMs, FAQ schema and meta descriptions.
// Run after `npm run build`: `npm test`. Exits 1 on any failure.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const OUT = 'out';
const files = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return f === '_next' ? [] : files(p);
    return /\.(html|txt|xml)$/.test(f) ? [p] : [];
  });

const decode = (s) =>
  s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&rsquo;|&lsquo;/g, "'").replace(/&ldquo;|&rdquo;/g, '"').replace(/&mdash;/g, '—').replace(/&amp;/g, '&');

const visible = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>|<!--[\s\S]*?-->|<!DOCTYPE[^>]*>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/\s+/g, ' ');

const BANNED = ['leverage', 'seamless', 'robust', 'cutting-edge', 'revolutionary', 'solutions', 'game-changer', 'unlock', 'ai-powered', 'next-generation'];
const PHONE = /(?:\+?1[\s.-]?)?\(?\b[2-9]\d{2}\)?[\s.-]\d{3}[\s.-]\d{4}\b/;
const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];

const fails = [];
const fail = (f, msg) => fails.push(`${relative(OUT, f)}: ${msg}`);

for (const f of files(OUT)) {
  const raw = readFileSync(f, 'utf8');
  const isHtml = f.endsWith('.html');
  const text = isHtml ? visible(raw) : raw;
  // Titles and meta content are copy too.
  const metaText = isHtml ? [...raw.matchAll(/<(?:title)>([^<]*)<|<meta[^>]+content="([^"]*)"/g)].map((m) => decode(m[1] ?? m[2])).join(' ') : '';
  const copy = `${text} ${metaText}`;
  // URLs are not copy (e.g. a competitor path containing a banned word).
  const words = copy.replace(/\S+\.[a-z]{2,}\/\S*/gi, ' ');

  if (/tel:/i.test(raw)) fail(f, 'tel: link');
  const phone = copy.match(PHONE);
  if (phone) fail(f, `phone number "${phone[0]}"`);
  if (/—/.test(copy)) fail(f, 'em dash');
  if (f.endsWith('.html') && /!/.test(words)) fail(f, `exclamation mark near "${words.slice(Math.max(0, words.indexOf('!') - 40), words.indexOf('!') + 5)}"`);
  for (const b of BANNED) if (new RegExp(`\\b${b}\\b`, 'i').test(words)) fail(f, `banned word "${b}"`);
  if (raw.includes('TODO(')) fail(f, 'TODO( left in output');

  if (!isHtml) continue;

  for (const m of raw.matchAll(/href="(https?:\/\/(?:www\.)?calldella\.com[^"]*)"/g)) {
    const u = new URL(decode(m[1]));
    const missing = UTM.filter((k) => !u.searchParams.get(k));
    if (missing.length) fail(f, `calldella.com link without ${missing.join(', ')}: ${m[1]}`);
  }

  const desc = raw.match(/<meta name="description" content="([^"]*)"/);
  if (desc && !f.endsWith('404.html') && !f.includes('_not-found')) {
    const n = decode(desc[1]).length;
    if (n < 140 || n > 160) fail(f, `meta description is ${n} chars`);
  }

  for (const m of raw.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const data = JSON.parse(m[1]);
    const nodes = data['@graph'] ?? [data];
    for (const n of nodes.filter((x) => x['@type'] === 'FAQPage')) {
      for (const q of n.mainEntity) {
        if (!text.includes(q.name)) fail(f, `FAQ question not visible: ${q.name}`);
        if (!text.includes(q.acceptedAnswer.text)) fail(f, `FAQ answer not visible verbatim: ${q.name}`);
      }
    }
    if (/"@type":"(Review|AggregateRating)"/.test(m[1])) fail(f, 'Review or AggregateRating schema');
  }
}

if (fails.length) {
  console.error(`check: ${fails.length} failure(s)\n` + fails.map((x) => `  - ${x}`).join('\n'));
  process.exit(1);
}
console.log(`check: ${files(OUT).length} files passed`);
