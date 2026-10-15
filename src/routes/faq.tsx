import { createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { CtaBand, FaqList, PageHero } from "@/components/site/PageParts";
import { breadcrumbLd, faqLd, pageHead } from "@/lib/seo";

const GENERAL = [
  {
    q: "Is BFG Funds a lender?",
    a: "No. BFG Funds is a business funding marketplace. We connect your business with independent lenders and funding providers and help you compare their offers. Each provider makes its own credit decision.",
  },
  {
    q: "Does applying affect my credit score?",
    a: "Reviewing your options with BFG Funds does not affect your credit score. A provider may run a credit check if you decide to move forward with a specific offer.",
  },
  {
    q: "What do I need to apply?",
    a: "Usually your most recent business bank statements (the last 4 months), a government ID, your business EIN and basic ownership details. Larger loans and SBA loans also require tax returns and financial statements.",
  },
  {
    q: "How fast can I get funded?",
    a: "Working capital, revenue-based financing and merchant cash advances can fund in as little as 24–48 hours after approval. Term loans and equipment financing typically take a few business days, and SBA loans 30–60 days or more.",
  },
  {
    q: "How much can my business get?",
    a: "Most offers are sized from your average monthly deposits, time in business, credit profile and existing debt. Try our funding estimate calculator for a rough range.",
  },
  {
    q: "What does funding cost?",
    a: "It varies widely by product and profile — from SBA loans priced near the Prime rate to short-term factor-rate products that cost much more. We show the total payback, payment and term of every offer before you sign.",
  },
  {
    q: "Can I get funding with bad credit?",
    a: "Often, yes. Revenue-based financing, merchant cash advances, invoice factoring and equipment financing consider lower credit scores, usually at a higher cost.",
  },
  {
    q: "Which states do you serve?",
    a: "We work with businesses across the United States. Some products and providers are not available in every state.",
  },
  {
    q: "How do I stop text messages?",
    a: "Reply STOP to any message at any time. See our SMS Terms for details.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead({
      title: "Business Funding FAQ | BFG Funds",
      description:
        "Answers about BFG Funds, credit checks, documents, funding speed, costs and bad credit options.",
      path: "/faq",
      jsonLd: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]),
        faqLd(GENERAL),
      ],
    }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          crumbs={[{ name: "Home", to: "/" }, { name: "FAQ" }]}
          eyebrow="FAQ"
          title="Frequently asked questions"
          intro="Straight answers about how business funding works and how we work with you."
        />
        <FaqList faqs={GENERAL} title="General questions" />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
