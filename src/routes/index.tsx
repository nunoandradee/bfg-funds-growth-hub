import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { LeadForm } from "@/components/site/LeadForm";
import { FaqList } from "@/components/site/PageParts";
import { CALCULATORS } from "@/data/calculators";
import { GENERAL_FAQS } from "@/data/faqs";
import { GUIDES } from "@/data/guides";
import { INDUSTRY_PAGES } from "@/data/industries";
import { INDUSTRY_PHOTOS, OWNER_AT_WORK } from "@/data/photos";
import { COMPANY, SERVICES, SITE_URL } from "@/data/site";
import { faqLd, pageHead } from "@/lib/seo";

const TITLE = "BFG Funds | $10K–$2M Small Business Funding in 24–48 Hours";
const DESCRIPTION =
  "Compare small business funding from a network of lenders: lines of credit, working capital, SBA loans, term loans, equipment financing and more. One application, decisions often in 24–48 hours.";

const HOME_FAQS = GENERAL_FAQS.slice(0, 6);

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "BFG Funds",
          url: `${SITE_URL}/`,
        },
        faqLd(HOME_FAQS),
      ],
    }),
  component: Index,
});

/** The lowest bar across our programs; term and SBA loans ask for more. */
const MINIMUMS = [
  { value: "4+ months", label: "in business" },
  { value: "$10K+", label: "in monthly revenue" },
  { value: "A business", label: "checking account" },
  { value: "Any credit", label: "score considered" },
];

const STEPS = [
  {
    title: "Tell us about your business",
    text: "A short application and your recent bank statements. That's usually all we need to start.",
  },
  {
    title: "Talk it through with your specialist",
    text: "One person reviews your numbers, asks what the money is for and takes your file to the lenders most likely to say yes.",
  },
  {
    title: "Compare offers and decide",
    text: "We lay out the amount, payment, term and total cost of each offer side by side. You choose — or walk away.",
  },
];

const PHOTO_INDUSTRIES = INDUSTRY_PAGES.filter((i) => INDUSTRY_PHOTOS[i.slug]);

function SectionTitle({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-balance-tight text-3xl leading-tight text-navy md:text-[2.5rem]">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{intro}</p>}
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />

        {/* MINIMUMS */}
        <section className="border-b border-border">
          <div className="container-page flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm font-semibold text-navy">What most programs need</p>
            <dl className="grid flex-1 grid-cols-2 gap-y-4 lg:max-w-4xl lg:grid-cols-4 lg:divide-x lg:divide-border">
              {MINIMUMS.map((m) => (
                <div key={m.label} className="lg:px-6">
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span className="block text-lg font-bold text-navy">{m.value}</span>
                    <span className="text-sm text-muted-foreground">{m.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              to="/resources/$slug"
              params={{ slug: "business-loan-requirements" }}
              className="text-sm font-semibold text-cobalt hover:underline"
            >
              Requirements by product
            </Link>
          </div>
        </section>

        {/* WHO WE WORK WITH */}
        <section id="industries" className="py-20 md:py-24">
          <div className="container-page">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionTitle
                title="We work with the people who keep Main Street running"
                intro="Contractors waiting on a draw. A café owner getting ready for the busy season. A carrier with freight invoices out for 60 days. We know how your business earns and spends — and which lenders do too."
              />
              <Link
                to="/industries"
                className="shrink-0 text-sm font-semibold text-cobalt hover:underline"
              >
                All {INDUSTRY_PAGES.length} industries
              </Link>
            </div>
            <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3">
              {PHOTO_INDUSTRIES.map((industry) => {
                const photo = INDUSTRY_PHOTOS[industry.slug]!;
                return (
                  <li key={industry.slug}>
                    <Link
                      to="/industries/$slug"
                      params={{ slug: industry.slug }}
                      className="group block"
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        className="aspect-[3/2] w-full rounded-md object-cover transition-opacity group-hover:opacity-90"
                      />
                      <h3 className="mt-3 text-base text-navy group-hover:underline sm:mt-4 sm:text-lg">
                        {industry.name}
                      </h3>
                      <p className="mt-1 hidden text-sm leading-relaxed text-muted-foreground sm:block">
                        {industry.summary}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* FUNDING OPTIONS */}
        <section id="services" className="border-t border-border bg-surface py-20 md:py-24">
          <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <SectionTitle
                title="Eight ways to fund a business"
                intro="Some are cheap and slow, some are fast and cost more. Your specialist will tell you honestly which ones fit — including when a cheaper option is worth the wait."
              />
              <Link
                to="/services"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cobalt hover:underline"
              >
                Compare them side by side
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <ul className="divide-y divide-border border-y border-border">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: service.slug }}
                    className="group grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
                  >
                    <span>
                      <span className="block text-lg font-bold text-navy group-hover:underline">
                        {service.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </span>
                    </span>
                    <span className="text-sm text-navy/70 sm:text-right">
                      {service.amount}
                      <span className="block">{service.speed}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* HOW WE WORK */}
        <section className="py-20 md:py-24">
          <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <img
              src={OWNER_AT_WORK.src}
              alt={OWNER_AT_WORK.alt}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-md object-cover"
            />
            <div>
              <SectionTitle
                title="Built for the businesses banks overlook"
                intro="Banks turn down most small businesses because the checklist doesn't line up. We start from the business you actually run — your deposits, your season, your plans — and take it to the lenders who look at the same things."
              />
              <ol className="mt-10 space-y-8">
                {STEPS.map((step, i) => (
                  <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4">
                    <span className="font-display text-3xl leading-none text-cobalt">{i + 1}</span>
                    <div>
                      <h3 className="text-lg text-navy">{step.title}</h3>
                      <p className="mt-1 leading-relaxed text-muted-foreground">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link
                to="/about"
                className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-cobalt hover:underline"
              >
                More about how we work
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* TOOLS AND GUIDES */}
        <section className="border-t border-border bg-surface py-20 md:py-24">
          <div className="container-page">
            <SectionTitle
              title="Know the numbers before you apply"
              intro="Free calculators and plain-English guides, written for owners rather than bankers."
            />
            <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h3 className="text-sm font-semibold text-navy">Calculators</h3>
                <ul className="mt-3 divide-y divide-border border-y border-border">
                  {CALCULATORS.map((c) => (
                    <li key={c.path}>
                      <a href={c.path} className="group block py-4">
                        <span className="font-bold text-navy group-hover:underline">{c.title}</span>
                        <span className="mt-1 block text-sm text-muted-foreground">
                          {c.summary}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-navy">Guides</h3>
                <ul className="mt-3 divide-y divide-border border-y border-border">
                  {GUIDES.slice(0, 4).map((g) => (
                    <li key={g.slug}>
                      <Link
                        to="/resources/$slug"
                        params={{ slug: g.slug }}
                        className="group block py-4"
                      >
                        <span className="font-bold text-navy group-hover:underline">{g.title}</span>
                        <span className="mt-1 block text-sm text-muted-foreground">
                          {g.category} · {g.readMinutes} min read
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/resources"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cobalt hover:underline"
                >
                  All guides
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* QUESTIONS */}
        <FaqList faqs={HOME_FAQS} title="Questions owners ask us" />
        <div className="container-page max-w-4xl pb-20 text-navy/80">
          <p>
            Something else on your mind?{" "}
            <Link to="/faq" className="font-semibold text-cobalt hover:underline">
              Read all questions
            </Link>{" "}
            or call us at{" "}
            <a
              href={COMPANY.phoneHref}
              className="font-semibold text-navy underline underline-offset-4"
            >
              {COMPANY.phoneDisplay}
            </a>
            .
          </p>
        </div>

        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
