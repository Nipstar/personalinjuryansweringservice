import type { Metadata } from 'next';
import { ContactForm } from '@/components/sections/ContactForm';
import { ServiceLayout } from '@/components/Page';
import { Eyebrow } from '@/components/Typography';
import { pageMeta } from '@/data/pages';
import { CONTACT_EMAIL } from '@/lib/config';
import { DEMO_MINUTES } from '@/lib/plans';

const SLUG = '/contact';
export const metadata: Metadata = pageMeta(SLUG);

export default function Contact() {
  return (
    <ServiceLayout slug={SLUG} crumb="Contact">
      <section className="mb-10">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="text-[36px] md:text-[48px] font-semibold text-[var(--ink)] font-serif tracking-[-0.03em] leading-[1.05] m-0">Talk to Call Della</h1>
        <p className="font-serif text-[18px] leading-[1.6] text-[var(--ink)] mt-6 mb-0 max-w-[600px]">
          Ask about your practice area, your call volume or how Della would fit your firm. We reply by email, usually the same working day.
          If you would rather hear her first, book a {DEMO_MINUTES}-minute demo from any page. You can also email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </section>
      <ContactForm />
    </ServiceLayout>
  );
}
