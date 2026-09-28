import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { LeadForm } from "@/components/site/LeadForm";
import { COMPANY } from "@/data/site";

const TITLE = "Contact BFG Funds | Business Funding Support";
const DESCRIPTION = "Contact BFG Funds for business funding support by phone, email, or our secure online form.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bfgfunds.com/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://bfgfunds.com/contact" }],
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
        <section className="border-b border-border bg-navy py-16 text-navy-foreground md:py-20">
          <div className="container-page">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Contact BFG Funds</p>
            <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">Talk with a funding specialist</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-foreground/75">Contact {COMPANY.displayName} directly or complete the secure form below.</p>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {contacts.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 border-l-2 border-gold pl-5">
                  <Icon className="mt-0.5 size-5 shrink-0 text-gold" />
                  <div><p className="text-xs font-bold uppercase text-navy-foreground/55">{label}</p>{href ? <a href={href} className="mt-1 block font-semibold hover:text-gold">{value}</a> : <p className="mt-1 font-semibold">{value}</p>}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}