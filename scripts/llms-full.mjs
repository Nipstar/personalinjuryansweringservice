// Postbuild: write out/llms-full.txt with the main text of every exported page.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const OUT = 'out';
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://calldella.com';

const htmlFiles = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return f.startsWith('_') ? [] : htmlFiles(p);
    return f.endsWith('.html') && !['404.html', '_not-found.html'].includes(f) ? [p] : [];
  });

const decode = (s) =>
  s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#x27;|&#39;|&rsquo;|&lsquo;/g, "'").replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;/g, '-').replace(/&ndash;/g, '-').replace(/&#x2F;/g, '/');

const toText = (html) => {
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? html;
  return decode(
    main
      .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>/g, '')
      .replace(/<(h[1-3])[^>]*>/g, '\n\n## ')
      .replace(/<\/(p|li|h[1-6]|tr|div|section|summary)>/g, '\n')
      .replace(/<(td|th)[^>]*>/g, ' | ')
      .replace(/<[^>]+>/g, ''),
  )
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    .trim();
};

const pages = htmlFiles(OUT)
  .map((f) => {
    const path = '/' + relative(OUT, f).replace(/(index)?\.html$/, '').replace(/\/$/, '');
    const html = readFileSync(f, 'utf8');
    const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? path);
    return { path: path === '/' ? '/' : path, title, text: toText(html) };
  })
  .sort((a, b) => a.path.localeCompare(b.path));

const body =
  `# Call Della: full site text\n\nGenerated at build from ${pages.length} pages. Source: ${SITE}\n\n` +
  pages.map((p) => `---\n\n# ${p.title}\nURL: ${SITE}${p.path === '/' ? '' : p.path}\n\n${p.text}\n`).join('\n');

writeFileSync(join(OUT, 'llms-full.txt'), body);
console.log(`llms-full.txt: ${pages.length} pages, ${Math.round(body.length / 1024)} KB`);
