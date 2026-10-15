import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, FileText, Minus, Plus } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LeadForm } from "@/components/site/LeadForm";
import { FaqList, PageHero } from "@/components/site/PageParts";
import { CONTENT_REVIEWED, SERVICES } from "@/data/site";
import { EditorialByline } from "@/components/site/Editorial";
import { INDUSTRY_PAGES } from "@/data/industries";
import { GUIDES } from "@/data/guides";
import { ORGANIZATION_LD, breadcrumbLd, faqLd, pageHead, absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { slug: service.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Service not found | BFG Funds" }, { name: "robots", content: "noindex" }],
      };
    }
    const service = SERVICES.find((s) => s.slug === loaderData.slug)!;
    const path = `/services/${service.slug}`;
    return pageHead({
      title: `${service.title}: Rates, Requirements & How It Works | BFG Funds`,
      description: `${service.tagline}. ${service.amount}, ${service.speed.toLowerCase()} to funding. Compare requirements, typical costs and offers from our lender network.`,
      path,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          serviceType: service.title,
          description: service.overview,
          url: absoluteUrl(path),
          provider: { "@id": ORGANIZATION_LD["@id"] },
          areaServed: { "@type": "Country", name: "United States" },
        },
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Funding Options", path: "/services" },
          { name: service.title, path },
        ]),
        faqLd(service.faqs),
      ],
    });
  },
  notFoundComponent: ServiceNotFound,
  component: ServicePage,
});

function ServiceNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-page py-28 text-center">
        <h1 className="text-4xl text-navy">We don't offer that program</h1>
        <p className="mt-4 text-muted-foreground">
          The funding service you're looking for doesn't exist.
        </p>
        <Link
          to="/services"
          className="mt-8 inline-flex rounded-md bg-navy px-6 py-3 text-sm font-bold text-navy-foreground"
        >
          See all funding options
        </Link>
      </main>
      <Footer />
    </div>
  );
}

function ServicePage() {
  const { slug } = Route.useLoaderData();
  const service = SERVICES.find((s) => s.slug === slug)!;
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);
  const industries = INDUSTRY_PAGES.filter((i) => i.services.includes(service.slug));
  const guides = GUIDES.filter((g) => g.services.includes(service.slug)).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          crumbs={[
            { name: "Home", to: "/" },
            { name: "Funding options", to: "/services" },
            { name: service.title },
          ]}
          eyebrow="Funding option"
          title={service.title}
          intro={`${service.tagline}. ${service.description}`}
        >
          <EditorialByline updated={CONTENT_REVIEWED} />
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/apply"
              className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3.5 text-sm font-bold text-gold-foreground transition-colors hover:bg-gold/90"
            >
              Check my options
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-navy/25 px-6 py-3.5 text-sm font-semibold text-navy hover:bg-navy/5"
            >
              Talk to a specialist
            </a>
          </div>
          <dl className="mt-12 grid gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Funding amount", value: service.amount },
              { label: "Speed to funding", value: service.speed },
              { label: "Typical term", value: service.term },
              { label: "Typical cost", value: service.cost },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                <dd
                  className={`mt-1 text-navy ${stat.label === "Typical cost" ? "text-sm leading-relaxed" : "text-lg font-bold"}`}
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </PageHero>

        {/* OVERVIEW + ELIGIBILITY */}
        <section className="py-20 md:py-24">
          <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm font-semibold text-cobalt">Overview</p>
              <h2 className="mt-4 text-balance-tight text-3xl text-navy md:text-4xl">
                Is {service.title.toLowerCase()} the right fit?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {service.overview}
              </p>
              <ul className="mt-8 space-y-3">
                {service.bestFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-navy/80">
                    <Check className="mt-1 size-5 shrink-0 text-cobalt" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12 grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-lg font-extrabold text-navy">Pros</h3>
                  <ul className="mt-4 space-y-3 text-sm text-navy/80">
                    {service.pros.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <Plus className="mt-0.5 size-4 shrink-0 text-cobalt" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-lg font-extrabold text-navy">Cons</h3>
                  <ul className="mt-4 space-y-3 text-sm text-navy/80">
                    {service.cons.map((c) => (
                      <li key={c} className="flex items-start gap-2">
                        <Minus className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <aside className="h-fit rounded-3xl border border-border bg-surface p-8 shadow-card">
              <h3 className="text-xl font-extrabold text-navy">Typical eligibility</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                General market guidelines — providers regularly fund businesses that miss one of
                these.
              </p>
              <ul className="mt-6 space-y-4">
                {service.eligibility.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-semibold text-navy">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-cobalt text-navy-foreground">
                      <Check className="size-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 text-xl font-extrabold text-navy">What you'll need</h3>
              <ul className="mt-4 space-y-3">
                {service.documents.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-navy/80">
                    <FileText className="mt-0.5 size-4 shrink-0 text-cobalt" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="/apply"
                className="mt-8 flex items-center justify-center gap-2 rounded-md bg-navy px-6 py-3 text-sm font-bold text-navy-foreground transition-colors"
              >
                Check my options
                <ArrowRight className="size-4" />
              </a>
            </aside>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-surface py-20 md:py-24">
          <div className="container-page">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-cobalt">How it works</p>
              <h2 className="mt-4 text-balance-tight text-3xl text-navy md:text-4xl">
                From application to funded in four steps
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {service.howItWorks.map((step, i) => (
                <article
                  key={step.title}
                  className="rounded-2xl border border-border bg-card p-7 shadow-card"
                >
                  <span className="text-4xl font-extrabold text-cobalt/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-extrabold text-navy">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </article>
              ))}
            </div>
            <p className="mt-10 flex items-center gap-2 text-sm font-semibold text-navy/70">
              <Clock className="size-4 text-cobalt" />
              Typical time to funding for this program: {service.speed.toLowerCase()}.
            </p>
          </div>
        </section>

        <FaqList faqs={service.faqs} title={`${service.title} FAQ`} />

        {/* INDUSTRIES + GUIDES */}
        {(industries.length > 0 || guides.length > 0) && (
          <section className="border-t border-border py-16">
            <div className="container-page grid gap-12 lg:grid-cols-2">
              {industries.length > 0 && (
                <div>
                  <h2 className="text-2xl text-navy">Popular with</h2>
                  <ul className="mt-5 flex flex-wrap gap-2.5">
                    {industries.map((i) => (
                      <li key={i.slug}>
                        <Link
                          to="/industries/$slug"
                          params={{ slug: i.slug }}
                          className="inline-flex rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-navy/85 hover:border-cobalt hover:text-cobalt"
                        >
                          {i.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {guides.length > 0 && (
                <div>
                  <h2 className="text-2xl text-navy">Related guides</h2>
                  <ul className="mt-5 space-y-3">
                    {guides.map((g) => (
                      <li key={g.slug}>
                        <Link
                          to="/resources/$slug"
                          params={{ slug: g.slug }}
                          className="inline-flex items-center gap-2 font-semibold text-cobalt hover:underline"
                        >
                          {g.title}
                          <ArrowRight className="size-4" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* OTHER SERVICES */}
        <section className="bg-surface py-20 md:py-24">
          <div className="container-page">
            <h2 className="text-balance-tight text-3xl text-navy md:text-4xl">
              Other funding options
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  to="/services/$slug"
                  params={{ slug: other.slug }}
                  className="group rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:border-cobalt/40"
                >
                  <h3 className="text-lg font-extrabold text-navy">{other.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {other.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cobalt">
                    Learn more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
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
