import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Calculator } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { CtaBand, PageHero } from "@/components/site/PageParts";
import { CALCULATORS } from "@/data/calculators";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/calculators/")({
  head: () =>
    pageHead({
      title: "Small Business Funding Calculators | BFG Funds",
      description:
        "Free business loan, merchant cash advance and factor rate calculators, plus an estimate of how much funding your business may qualify for.",
      path: "/calculators",
      jsonLd: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Calculators", path: "/calculators" },
        ]),
      ],
    }),
  component: CalculatorsIndex,
});

function CalculatorsIndex() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          crumbs={[{ name: "Home", to: "/" }, { name: "Calculators" }]}
          eyebrow="Calculators"
          title="Know the numbers before you apply"
          intro="Estimate payments, compare factor rates with APR and see a rough funding range for your business. Free, instant and no personal information required."
        />
        <section className="py-16 md:py-20">
          <div className="container-page grid gap-6 md:grid-cols-3">
            {CALCULATORS.map((c) => (
              <a
                key={c.path}
                href={c.path}
                className="group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:border-cobalt/40"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-navy text-navy-foreground">
                  <Calculator className="size-6" />
                </span>
                <h2 className="mt-5 text-xl text-navy">{c.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {c.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cobalt">
                  Open calculator
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </section>
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
