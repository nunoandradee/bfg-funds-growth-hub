import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/LegalPage";
import { COMPANY } from "@/data/site";

const TITLE = "Terms of Service | BFG Funds";
const DESCRIPTION = "Terms governing access to and use of the BFG Funds website and business funding services.";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bfgfunds.com/terms-of-service" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://bfgfunds.com/terms-of-service" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of Service" intro={`These Terms govern your use of the website and services offered by ${COMPANY.displayName}.`}>
      <section><h2>Acceptance and eligibility</h2><p>By accessing this website or submitting information, you agree to these Terms and our Privacy Policy. You must be at least 18 years old, authorized to act for the business identified in an application, and provide accurate, current information.</p></section>
      <section><h2>Our services</h2><p>BFG Funds provides business financing information and may connect applicants with third-party funding providers. BFG Funds is not a bank. Submitting an application does not guarantee approval, a particular amount, rate, term, or funding time. All financing is subject to underwriting, verification, and final approval.</p></section>
      <section><h2>Your responsibilities</h2><ul><li>Use the website only for lawful business purposes.</li><li>Do not provide false information, impersonate another person, interfere with the website, or attempt unauthorized access.</li><li>Review all financing disclosures and agreements before accepting an offer.</li><li>Maintain the confidentiality of information used to access any service.</li></ul></section>
      <section><h2>Communications</h2><p>You authorize communications according to the choices you make in our forms. Email or telephone consent does not automatically create SMS consent. SMS participation is voluntary and governed by our <a href="/sms-terms">SMS Terms</a>. You may withdraw SMS consent at any time by replying STOP.</p></section>
      <section><h2>Third-party providers</h2><p>Funding products may be offered by independent third parties with their own terms and privacy practices. We are not responsible for a third party’s products, underwriting decisions, acts, or omissions.</p></section>
      <section><h2>Disclaimers</h2><p>The website and its content are provided “as is” and “as available.” To the fullest extent permitted by law, we disclaim warranties of merchantability, fitness for a particular purpose, accuracy, availability, and non-infringement. Website content is general information, not legal, tax, accounting, or investment advice.</p></section>
      <section><h2>Limitation of liability</h2><p>To the fullest extent permitted by law, {COMPANY.legalName}, its affiliates, personnel, and service providers will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, lost profits, lost data, or business interruption arising from use of the website or services.</p></section>
      <section><h2>Changes and termination</h2><p>We may update these Terms or suspend access to the website at any time. Updated Terms become effective when posted. Continued use after an update constitutes acceptance of the revised Terms.</p></section>
      <section><h2>Contact</h2><p>Questions may be sent to <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>, by phone at <a href={COMPANY.phoneHref}>{COMPANY.phoneDisplay}</a>, or by mail to {COMPANY.address}.</p></section>
    </LegalPage>
  );
}