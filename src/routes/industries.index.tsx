import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { CtaBand, PageHero } from "@/components/site/PageParts";
import { INDUSTRY_PAGES } from "@/data/industries";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/industries/")({
  head: () =>
    pageHead({
      title: "Business Funding by Industry | BFG Funds",
      description:
        "Funding options for construction, restaurants, trucking, retail, healthcare, auto repair, staffing and more — matched to how your industry earns and spends.",
      path: "/industries",
      jsonLd: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ]),
      ],
    }),
  component: IndustriesIndex,
});

function IndustriesIndex() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          crumbs={[{ name: "Home", to: "/" }, { name: "Industries" }]}
          eyebrow="Industries We Serve"
          title="Funding built around how your industry works"
          intro="Every industry has its own cash cycle — draws and retainage in construction, reimbursements in healthcare, net-60 freight invoices in trucking. We match you with lenders who understand yours."
        />
        <section className="py-16 md:py-20">
          <div className="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRY_PAGES.map((i) => (
              <Link
                key={i.slug}
                to="/industries/$slug"
                params={{ slug: i.slug }}
                className="group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:border-cobalt/40"
              >
                <h2 className="text-xl text-navy">{i.name}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {i.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cobalt">
                  {i.name} funding
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
