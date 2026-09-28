import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/LegalPage";
import { COMPANY } from "@/data/site";

const TITLE = "Privacy Policy | BFG Funds";
const DESCRIPTION = "Learn how BFG Funds collects, uses, safeguards, and shares personal and business information.";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bfgfunds.com/privacy-policy" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://bfgfunds.com/privacy-policy" }],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro={`${COMPANY.displayName} respects your privacy and is committed to protecting the information you share with us.`}
    >
      <section>
        <h2>Information we collect</h2>
        <p>We may collect information you provide through our website, applications, forms, telephone calls, emails, and text messages, including:</p>
        <ul>
          <li>Name, email address, mobile phone number, mailing address, and other contact information.</li>
          <li>Business name, ownership details, revenue, funding needs, bank statements, tax identifiers, and application information.</li>
          <li>Website activity, device information, IP address, browser type, and referral data.</li>
          <li>Your communication preferences and records of consent, including SMS opt-in and opt-out records.</li>
        </ul>
      </section>
      <section>
        <h2>How we use information</h2>
        <p>We use information to evaluate and process funding requests, match applicants with funding programs and lending partners, communicate about applications, provide support, prevent fraud, maintain records, comply with law, and improve our services.</p>
      </section>
      <section>
        <h2>SMS and mobile information</h2>
        <p>If you separately opt in, we may use the mobile number you provide to send application updates, funding information, reminders, and support messages. Consent to receive SMS messages is not a condition of applying for or receiving funding.</p>
        <p className="mt-3 font-bold text-navy">Mobile opt-in data and consent will not be shared with or sold to third parties or affiliates for their marketing or promotional purposes.</p>
        <p className="mt-3">We may share information with service providers solely as needed to deliver our messaging program, such as telecommunications providers, subject to confidentiality and use restrictions. See our <a href="/sms-terms">SMS Terms</a> for message frequency and opt-out instructions.</p>
      </section>
      <section>
        <h2>How we share information</h2>
        <p>We may share application information with lenders, brokers, financing partners, credit bureaus, fraud-prevention providers, and vendors that support our services. We may also disclose information when required by law, to protect rights and safety, or in connection with a business transaction. We do not sell personal information for money.</p>
      </section>
      <section>
        <h2>Security and retention</h2>
        <p>We use reasonable administrative, technical, and physical safeguards designed to protect information. No transmission or storage system is completely secure. We retain information only as long as reasonably necessary for the purposes described above and to meet legal and recordkeeping obligations.</p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>You may request access, correction, or deletion of certain personal information by contacting us. You may unsubscribe from marketing email through the link in the message. To stop SMS messages, reply STOP; for help, reply HELP.</p>
      </section>
      <section>
        <h2>Contact us</h2>
        <p>{COMPANY.displayName}<br />{COMPANY.address}<br /><a href={COMPANY.phoneHref}>{COMPANY.phoneDisplay}</a><br /><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p>
      </section>
    </LegalPage>
  );
}