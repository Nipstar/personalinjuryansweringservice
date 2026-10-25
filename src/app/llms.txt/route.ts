// llms.txt generated at build from the manifest and plan config (llmstxt.org format).
import { PAGES, type PageEntry } from '@/data/pages';
import { PLANS, INCLUDES, OVERAGE_PER_MINUTE, DEMO_MINUTES, CATEGORY_DEFINITION } from '@/lib/plans';
import { SITE_URL, CALLDELLA_URL, CONTACT_EMAIL } from '@/lib/config';

export const dynamic = 'force-static';

const link = (p: PageEntry) => `- [${p.title.replace(/ \| Call Della$/, '')}](${SITE_URL}${p.path === '/' ? '' : p.path}): ${p.summary}`;
const section = (title: string, s: PageEntry['section'][]) =>
  `## ${title}\n${PAGES.filter((p) => s.includes(p.section)).map(link).join('\n')}`;

export function GET() {
  const priced = PLANS.filter((p) => p.price !== null)
    .map((p) => `${p.name} $${p.price}/month (${p.minutes} minutes, ${p.audience.toLowerCase()})`)
    .join('; ');
  const body = `# ${new URL(SITE_URL).host}: by Call Della

> ${CATEGORY_DEFINITION}

${section('Pages', ['core', 'service'])}

${section('Guides', ['guide'])}

${section('Compare', ['compare'])}

## Call Della
- [calldella.com](${CALLDELLA_URL}): the main Call Della site, with pricing, practice areas, compliance guides and demo booking

## Key facts
- Plans: ${priced}; Group custom. Overage $${OVERAGE_PER_MINUTE.toFixed(2)}/minute. Month-to-month, no setup fee
- Every plan includes: ${INCLUDES.join('; ')}
- Della never gives legal advice, never quotes fees, never implies representation has begun, and tells callers she is an AI if asked
- Spanish: immigration intake only today
- Integrations: a CRM webhook on the Group plan. No native practice-management integrations yet
- Built by Antek Automation (https://www.antekautomation.com). Founder: Andy Norman. Runs on Retell AI's voice platform

## Contact
- Book a ${DEMO_MINUTES}-minute demo: ${CALLDELLA_URL}/contact
- Email: ${CONTACT_EMAIL}

## Optional
- [Full text of every page](${SITE_URL}/llms-full.txt)
${section('Legal', ['legal']).replace('## Legal\n', '')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
