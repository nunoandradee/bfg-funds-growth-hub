import { createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { CtaBand, FaqList, PageHero } from "@/components/site/PageParts";
import { GENERAL_FAQS } from "@/data/faqs";
import { breadcrumbLd, faqLd, pageHead } from "@/lib/seo";

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
        faqLd(GENERAL_FAQS),
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
        <FaqList faqs={GENERAL_FAQS} title="General questions" />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
