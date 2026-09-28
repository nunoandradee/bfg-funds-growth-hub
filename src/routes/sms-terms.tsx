import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/LegalPage";
import { COMPANY } from "@/data/site";

const TITLE = "SMS Terms & Opt-Out | BFG Funds";
const DESCRIPTION = "BFG Funds SMS program terms, message frequency, charges, help, and opt-out instructions.";

export const Route = createFileRoute("/sms-terms")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bfgfunds.com/sms-terms" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://bfgfunds.com/sms-terms" }],
  }),
  component: SmsTermsPage,
});

function SmsTermsPage() {
  return (
    <LegalPage eyebrow="Messaging" title="SMS Terms & Opt-Out" intro={`These terms describe the recurring SMS program operated by ${COMPANY.displayName}.`}>
      <section><h2>Program and consent</h2><p>When you check an SMS consent box and submit a form, you agree to receive recurring automated text messages from BFG Funds at the mobile number provided. Messages may include application updates, document reminders, funding information, and customer support. Consent is not a condition of applying for or receiving funding.</p></section>
      <section><h2>Message frequency and charges</h2><p>Message frequency varies based on your activity, up to 4 messages per month. Message and data rates may apply according to your wireless plan. Carriers are not liable for delayed or undelivered messages.</p></section>
      <section><h2>Opt out</h2><p>Reply <strong className="text-navy">STOP</strong> to any message to unsubscribe. After you send STOP, you may receive one confirmation message, and then no further marketing or application SMS messages will be sent unless you opt in again.</p></section>
      <section><h2>Help</h2><p>Reply <strong className="text-navy">HELP</strong> for assistance. You may also contact us at <a href={COMPANY.phoneHref}>{COMPANY.phoneDisplay}</a> or <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.</p></section>
      <section><h2>Privacy</h2><p>We handle mobile information as described in our <a href="/privacy-policy">Privacy Policy</a>. Mobile opt-in data and consent will not be shared with or sold to third parties or affiliates for their marketing or promotional purposes.</p></section>
      <section><h2>Contact</h2><p>{COMPANY.displayName}<br />{COMPANY.address}</p></section>
    </LegalPage>
  );
}