import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calculator } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { CtaBand, PageHero } from "@/components/site/PageParts";
import { CALCULATORS } from "@/data/calculators";
import { GUIDES } from "@/data/guides";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/resources/")({
  head: () =>
    pageHead({
      title: "Small Business Funding Guides & Resources | BFG Funds",
      description:
        "Plain-English guides on business loan requirements, factor rates vs. APR, bad credit funding, SBA loans and how lenders read bank statements.",
      path: "/resources",
      jsonLd: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
        ]),
      ],
    }),
  component: ResourcesIndex,
});

function ResourcesIndex() {
  const categories = [...new Set(GUIDES.map((g) => g.category))];
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          crumbs={[{ name: "Home", to: "/" }, { name: "Resources" }]}
          eyebrow="Resources"
          title="Funding guides written for owners, not bankers"
          intro="Understand your options, the real cost of funding and what lenders look for — before you apply."
        />

        {categories.map((category) => (
          <section key={category} className="border-b border-border py-14">
            <div className="container-page">
              <h2 className="text-2xl font-extrabold text-navy md:text-3xl">{category}</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {GUIDES.filter((g) => g.category === category).map((g) => (
                  <Link
                    key={g.slug}
                    to="/resources/$slug"
                    params={{ slug: g.slug }}
                    className="group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:border-cobalt/40"
                  >
                    <h3 className="text-lg font-extrabold leading-snug text-navy">{g.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {g.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cobalt">
                      Read guide · {g.readMinutes} min
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="bg-surface py-14">
          <div className="container-page">
            <h2 className="text-2xl font-extrabold text-navy md:text-3xl">Calculators</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {CALCULATORS.map((c) => (
                <a
                  key={c.path}
                  href={c.path}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 hover:border-cobalt/40"
                >
                  <Calculator className="mt-0.5 size-5 shrink-0 text-cobalt" />
                  <span>
                    <span className="block font-extrabold text-navy">{c.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{c.summary}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
