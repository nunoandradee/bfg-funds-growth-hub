import { createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { CtaBand, PageHero } from "@/components/site/PageParts";
import { COMPANY } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/editorial-standards")({
  head: () =>
    pageHead({
      title: "Editorial Standards | BFG Funds",
      description:
        "How BFG Funds researches, writes, reviews and updates its business funding guides, calculators and product pages.",
      path: "/editorial-standards",
      jsonLd: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Editorial Standards", path: "/editorial-standards" },
        ]),
      ],
    }),
  component: EditorialStandardsPage,
});

const SECTIONS = [
  {
    title: "Written for business owners",
    text: "Our content explains business funding in plain English so owners can make informed decisions. We focus on how products work, what they really cost and who they fit — including when a product is not a good fit.",
  },
  {
    title: "Independent from lenders",
    text: `Guides, calculators and product pages are written by the ${COMPANY.displayName} team. Lenders and funding providers do not write, pay for or approve our content, and no provider can buy a better description of its product.`,
  },
  {
    title: "Accurate and sourced",
    text: "We rely on primary sources wherever possible — the U.S. Small Business Administration, the Federal Reserve and the IRS — and cite them on the page. Cost ranges reflect the broad market and are clearly labeled as approximate; they are never presented as an offer.",
  },
  {
    title: "Reviewed and updated",
    text: "Every page shows the date it was last reviewed. We revisit content when programs, regulations or market conditions change, and at least once a year.",
  },
  {
    title: "Honest about costs",
    text: "We show total payback, payment frequency and fees alongside rates, and we explain how factor rates compare with APR so owners can compare offers fairly.",
  },
  {
    title: "Corrections",
    text: `If you believe something on our site is inaccurate or out of date, email ${COMPANY.email}. We review every report and correct confirmed errors promptly, updating the review date on the page.`,
  },
];

function EditorialStandardsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          crumbs={[{ name: "Home", to: "/" }, { name: "Editorial Standards" }]}
          eyebrow="Editorial Standards"
          title="How we create our content"
          intro="Funding decisions affect your business for months or years. These are the standards behind every guide, calculator and product page on this site."
        />
        <section className="py-16 md:py-20">
          <div className="container-page grid max-w-5xl gap-6 md:grid-cols-2">
            {SECTIONS.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-7">
                <h2 className="text-xl font-extrabold text-navy">{s.title}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </section>
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
