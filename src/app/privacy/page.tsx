import type { Metadata } from 'next';
import { pageMeta } from '@/data/pages';
import React from 'react';
import { ArticleLayout } from '@/components/ArticleLayout';

export const metadata: Metadata = pageMeta('/privacy');

export default function PrivacyPage() {
  return (
    <ArticleLayout
      eyebrow="LEGAL"
      title="Privacy Policy"
      slug="/privacy"
      breadcrumbs={[{ name: 'Privacy Policy', href: '/privacy' }]}
      author="Call Della Legal"
      date="1 MAY 2026"
      datePublished="2026-05-01"
      dateModified="2026-10-25"
      tldr={
        <>
          <p className="mb-2">This website, personalinjuryansweringservice.com, is run by Call Della, the provider of the Della intake service. Your data is yours. We do not sell your leads, and we do not use your confidential caller audio or transcripts to train public AI models.</p>
          <p className="m-0">This policy outlines exactly how we collect, process, and secure the highly sensitive data flowing through our platform.</p>
        </>
      }
    >
      <h2>1. Who We Are</h2>
      <p>
        personalinjuryansweringservice.com is published by Call Della. Call Della provides the Della after-hours intake service described on this site, and it is built by Antek Automation. Questions about this policy go to hello@calldella.com.
      </p>
      <h3>Visitors to this website</h3>
      <p>
        This site has no accounts and no contact form. We measure visits with Plausible Analytics, which does not use cookies or collect personal data. When you choose Book a demo, the booking calendar loads from our scheduling provider (crm.antekautomation.com) and the details you enter there are used only to arrange and run your demo. If you email us, we use your email only to reply.
      </p>

      <h2>2. Information We Collect Through the Service</h2>
      <p>
        Call Della collects information in two primary categories:
      </p>
      <h3>A. Customer Information</h3>
      <p>
        Information regarding the law firms that subscribe to our service, including billing details, firm configurations, user accounts and, on plans that use one, webhook settings.
      </p>
      <h3>B. Caller Information</h3>
      <p>
        Information provided by prospective clients who speak with Della on behalf of our Customers. This includes:
      </p>
      <ul>
        <li>Audio recordings of the intake call.</li>
        <li>Transcripts generated from the audio.</li>
        <li>Personally Identifiable Information (PII) such as names, phone numbers, and addresses.</li>
        <li>Case-specific facts, which may include details regarding physical injuries or medical treatment.</li>
      </ul>

      <h2>3. How We Use the Information</h2>
      <p>
        Call Della operates strictly as a data processor for the Caller Information. We use this data <strong>exclusively</strong> to:
      </p>
      <ul>
        <li>Facilitate the conversational intake.</li>
        <li>Generate the triage dossier (summary, transcript, extracted data fields).</li>
        <li>Deliver that dossier securely to the Customer (the law firm).</li>
      </ul>

      <h2>4. No Model Training on Caller Data</h2>
      <p>
        We recognize the absolute necessity of attorney-client privilege. <strong>Call Della strictly prohibits the use of Caller Information (audio, transcripts, or summaries) to train public Foundational LLMs.</strong> We use our voice and language model providers, including the Retell AI voice platform, only to run each call and produce the dossier.
      </p>

      <h2>5. Data Sharing and Disclosure</h2>
      <p>
        We do not sell, trade, or rent Caller Information to third parties. Caller Information is only accessible by:
      </p>
      <ul>
        <li>The specific law firm (Customer) that the caller intended to reach.</li>
        <li>Our authorized sub-processors (e.g., cloud hosting providers) strictly for the purpose of executing the Service, all of whom are bound by strict confidentiality agreements.</li>
      </ul>

      <h2>6. Data Security</h2>
      <p>
        We use industry-standard security measures, including at-rest and in-transit encryption (AES-256 and TLS 1.2+), to protect Caller Information from unauthorized access, alteration, disclosure, or destruction. 
      </p>

      <h2>7. Data Deletion Requests</h2>
      <p>
        Because Call Della acts as a data processor on behalf of the law firm, any requests from callers to delete their data must be directed to the respective law firm. We provide our Customers with the tooling necessary to permanently expunge records from our infrastructure upon request.
      </p>
    </ArticleLayout>
  );
}
