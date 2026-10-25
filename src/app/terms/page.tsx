import type { Metadata } from 'next';
import { pageMeta } from '@/data/pages';
import React from 'react';
import { ArticleLayout } from '@/components/ArticleLayout';

export const metadata: Metadata = pageMeta('/terms');

export default function TermsPage() {
  return (
    <ArticleLayout
      eyebrow="LEGAL"
      title="Terms of Service"
      slug="/terms"
      breadcrumbs={[{ name: 'Terms of Service', href: '/terms' }]}
      author="Call Della Legal"
      date="1 MAY 2026"
      datePublished="2026-05-01"
      dateModified="2026-05-01"
      tldr={
        <>
          <p className="mb-2">These Terms of Service govern your use of the Call Della AI intake platform.</p>
          <p className="m-0">By using our service, you acknowledge that Call Della is a technology vendor, not a law firm, and provides no legal advice to your prospective clients.</p>
        </>
      }
    >
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using Call Della ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. The Service is offered subject to your acceptance without modification of all of the terms and conditions contained herein.
      </p>

      <h2>2. Nature of the Service</h2>
      <p>
        Call Della provides an automated voice AI conversational interface designed to collect factual intake information from individuals seeking legal representation.
      </p>
      <ul>
        <li><strong>Not a Law Firm:</strong> Call Della is a software-as-a-service (SaaS) provider. We are not a law firm.</li>
        <li><strong>No Legal Advice:</strong> Call Della does not and cannot provide legal advice, legal opinions, or recommendations regarding legal rights.</li>
        <li><strong>No Attorney-Client Relationship:</strong> The use of Call Della to communicate with a prospective client does not establish an attorney-client relationship between Call Della and the caller, nor does it guarantee that the law firm utilizing Call Della will accept the caller's case.</li>
      </ul>

      <h2>3. Law Firm Responsibilities</h2>
      <p>
        As a law firm ("Customer") utilizing Call Della, you are solely responsible for:
      </p>
      <ul>
        <li>Ensuring that your use of the Service complies with the rules of professional conduct in your jurisdiction(s).</li>
        <li>Reviewing all intake dossiers for accuracy before taking any legal action or allowing statutes of limitations to expire.</li>
        <li>Providing appropriate disclosures to callers regarding the use of AI, as required by your state bar.</li>
      </ul>

      <h2>4. Intellectual Property</h2>
      <p>
        The Service and its original content, features, and functionality are owned by Call Della and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. 
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        In no event shall Call Della, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
      </p>
      <p>
        Specifically, Call Della assumes no liability for missed statutory deadlines or spoliation of evidence resulting from inaccuracies in the automated transcription or summary generation.
      </p>

      <h2>6. Termination</h2>
      <p>
        We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
      </p>

      <h2>7. Changes</h2>
      <p>
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect for existing customers.
      </p>
    </ArticleLayout>
  );
}
