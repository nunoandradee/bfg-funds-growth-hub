import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { LeadForm } from "@/components/site/LeadForm";
import { PageHero } from "@/components/site/PageParts";
import { COMPANY } from "@/data/site";

const TITLE = "Contact BFG Funds | Business Funding Support";
const DESCRIPTION =
  "Contact BFG Funds for business funding support by phone, email, or our secure online form.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.bfgfunds.com/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.bfgfunds.com/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const contacts = [
    { icon: Phone, label: "Phone", value: COMPANY.phoneDisplay, href: COMPANY.phoneHref },
    { icon: Mail, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { icon: MapPin, label: "Address", value: COMPANY.address },
  ];
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          crumbs={[{ name: "Home", to: "/" }, { name: "Contact" }]}
          eyebrow="Contact"
          title="Talk with a funding specialist"
          intro="Call, email or send us a few details below. You'll hear back from a person who knows the lenders — not an automated queue."
        >
          <dl className="mt-10 grid gap-6 border-t border-border pt-8 md:grid-cols-3">
            {contacts.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon className="mt-0.5 size-5 shrink-0 text-cobalt" />
                <div>
                  <dt className="text-sm text-muted-foreground">{label}</dt>
                  <dd className="mt-1 font-semibold text-navy">
                    {href ? (
                      <a href={href} className="hover:underline">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </PageHero>
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
