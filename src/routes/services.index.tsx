import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { CtaBand, Disclaimer, PageHero } from "@/components/site/PageParts";
import { SERVICES } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  head: () =>
    pageHead({
      title: "Small Business Funding Options Compared | BFG Funds",
      description:
        "Compare business lines of credit, working capital, term loans, SBA loans, equipment financing, revenue-based financing, merchant cash advances and invoice factoring.",
      path: "/services",
      jsonLd: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Funding Options", path: "/services" },
        ]),
      ],
    }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          crumbs={[{ name: "Home", to: "/" }, { name: "Funding Options" }]}
          eyebrow="Funding Options"
          title="Compare small business funding options"
          intro="Every product below is offered by independent lenders and funding providers in our network. Your specialist helps you find the lowest-cost option you qualify for — and tells you when a cheaper product fits better."
        />

        <section className="py-16 md:py-20">
          <div className="container-page">
            <h2 className="text-3xl font-extrabold text-navy md:text-4xl">At a glance</h2>
            {/* Table on wide screens, cards on phones. */}
            <div className="mt-8 hidden overflow-hidden rounded-2xl border border-border lg:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface text-xs font-bold uppercase tracking-wider text-navy/70">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Speed</th>
                    <th className="p-4">Term</th>
                    <th className="p-4">Best for</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {SERVICES.map((s) => (
                    <tr key={s.slug} className="align-top">
                      <td className="p-4">
                        <Link
                          to="/services/$slug"
                          params={{ slug: s.slug }}
                          className="font-extrabold text-navy hover:text-cobalt"
                        >
                          {s.title}
                        </Link>
                      </td>
                      <td className="p-4 text-navy/80">{s.amount}</td>
                      <td className="p-4 text-navy/80">{s.speed}</td>
                      <td className="p-4 text-navy/80">{s.term}</td>
                      <td className="p-4 text-muted-foreground">{s.bestFor[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:hidden">
              {SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="rounded-2xl border border-border bg-card p-6 shadow-card"
                >
                  <h3 className="text-lg font-extrabold text-navy">{s.title}</h3>
                  <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-xs font-bold uppercase text-muted-foreground">Amount</dt>
                      <dd className="font-semibold text-navy">{s.amount}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-bold uppercase text-muted-foreground">Speed</dt>
                      <dd className="font-semibold text-navy">{s.speed}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-sm text-muted-foreground">{s.bestFor[0]}</p>
                </Link>
              ))}
            </div>
            <Disclaimer className="mt-6 max-w-3xl" />
          </div>
        </section>

        <section className="bg-surface py-16 md:py-20">
          <div className="container-page grid gap-6 md:grid-cols-2">
            {SERVICES.map((s) => (
              <article
                key={s.slug}
                className="flex flex-col rounded-2xl border border-border bg-card p-7"
              >
                <h2 className="text-xl font-extrabold text-navy">{s.title}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{s.overview}</p>
                <p className="mt-4 text-sm text-navy/80">
                  <span className="font-bold">Typical cost: </span>
                  {s.cost}
                </p>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cobalt"
                >
                  Requirements, costs and FAQ
                  <ArrowRight className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
