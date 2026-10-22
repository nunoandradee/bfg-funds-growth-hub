import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { LeadForm } from "@/components/site/LeadForm";
import { Disclaimer, FaqList, PageHero } from "@/components/site/PageParts";
import { findIndustry, INDUSTRY_PAGES } from "@/data/industries";
import { CONTENT_REVIEWED, SERVICES } from "@/data/site";
import { EditorialByline } from "@/components/site/Editorial";
import { breadcrumbLd, faqLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const industry = findIndustry(params.slug);
    if (!industry) throw notFound();
    return { slug: industry.slug };
  },
  head: ({ loaderData }) => {
    const industry = loaderData ? findIndustry(loaderData.slug) : undefined;
    if (!industry)
      return {
        meta: [{ title: "Industry not found | BFG Funds" }, { name: "robots", content: "noindex" }],
      };
    const path = `/industries/${industry.slug}`;
    return pageHead({
      title: `${industry.name} Business Funding & Loans | BFG Funds`,
      description: industry.summary,
      path,
      jsonLd: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.name, path },
        ]),
        faqLd(industry.faqs),
      ],
    });
  },
  component: IndustryPage,
});

function IndustryPage() {
  const { slug } = Route.useLoaderData();
  const industry = findIndustry(slug)!;
  const services = industry.services
    .map((s) => SERVICES.find((x) => x.slug === s))
    .filter((s): s is (typeof SERVICES)[number] => Boolean(s));
  const others = INDUSTRY_PAGES.filter((i) => i.slug !== slug).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          crumbs={[
            { name: "Home", to: "/" },
            { name: "Industries", to: "/industries" },
            { name: industry.name },
          ]}
          eyebrow="Industry Funding"
          title={`${industry.name} business funding`}
          intro={industry.summary}
        >
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/apply"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-gold-foreground shadow-card transition-transform hover:-translate-y-0.5"
            >
              Start your application
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/25 px-7 py-3.5 text-sm font-bold hover:border-gold hover:text-gold"
            >
              See Your Options
            </a>
          </div>
          <EditorialByline updated={CONTENT_REVIEWED} />
        </PageHero>

        <section className="py-16 md:py-20">
          <div className="container-page grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold text-navy">
                Why {industry.name.toLowerCase()} businesses need flexible funding
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{industry.intro}</p>
              <h3 className="mt-8 text-lg font-extrabold text-navy">Common challenges</h3>
              <ul className="mt-4 space-y-3">
                {industry.challenges.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-navy/80">
                    <Check className="mt-1 size-5 shrink-0 text-gold" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <aside className="h-fit rounded-3xl border border-border bg-surface p-8">
              <h3 className="text-xl font-extrabold text-navy">How owners use the funding</h3>
              <ul className="mt-5 space-y-3">
                {industry.uses.map((u) => (
                  <li key={u} className="flex items-start gap-3 text-sm font-semibold text-navy">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold text-gold-foreground">
                      <Check className="size-3" />
                    </span>
                    {u}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="bg-surface py-16 md:py-20">
          <div className="container-page">
            <h2 className="text-3xl font-extrabold text-navy md:text-4xl">
              Funding options that fit {industry.name.toLowerCase()}
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:border-cobalt/40"
                >
                  <h3 className="text-xl font-extrabold text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-navy/80">
                    {s.amount} · {s.speed}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cobalt">
                    Learn more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
            <Disclaimer className="mt-6 max-w-3xl" />
          </div>
        </section>

        <FaqList faqs={industry.faqs} title={`${industry.name} funding FAQ`} />

        <section className="border-t border-border py-12">
          <div className="container-page">
            <h2 className="text-xl font-extrabold text-navy">Other industries we serve</h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {others.map((i) => (
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
        </section>

        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
