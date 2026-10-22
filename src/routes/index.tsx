import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowRight,
  Banknote,
  Calculator,
  CreditCard,
  HandCoins,
  Landmark,
  Percent,
  Phone,
  ReceiptText,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";

import { CountUp } from "@/components/site/CountUp";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { HomeEstimator } from "@/components/site/HomeEstimator";
import { HowItWorks } from "@/components/site/HowItWorks";
import { IndustryCarousel } from "@/components/site/IndustryCarousel";
import { Footer } from "@/components/site/Footer";
import { LeadForm } from "@/components/site/LeadForm";
import { OfferXRayTeaser } from "@/components/site/OfferXRayTeaser";
import { ScrollStatement } from "@/components/site/ScrollStatement";
import { Spotlight } from "@/components/site/Spotlight";
import { CALCULATORS } from "@/data/calculators";
import { GUIDES } from "@/data/guides";
import { INDUSTRY_PAGES } from "@/data/industries";
import { COMPANY, SERVICES, SITE_URL } from "@/data/site";
import { faqLd, pageHead } from "@/lib/seo";
import { GENERAL_FAQS } from "@/data/faqs";
import { FaqList } from "@/components/site/PageParts";
import aboutImg from "@/assets/about.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const TITLE = "BFG Funds | $10K–$2M Small Business Funding in 24–48 Hours";
const DESCRIPTION =
  "Compare small business funding from a network of lenders: lines of credit, working capital, SBA loans, term loans, equipment financing and more. One application, decisions often in 24–48 hours.";

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

const SERVICE_ICONS: Record<string, typeof CreditCard> = {
  "business-line-of-credit": CreditCard,
  "working-capital": Banknote,
  "term-loan": Landmark,
  "sba-loans": ShieldCheck,
  "revenue-based-financing": Percent,
  "equipment-financing": Wrench,
  "merchant-cash-advance": Zap,
  "invoice-factoring": ReceiptText,
};

/**
 * Bento layout for the eight products: two wide tiles per row band so the
 * grid has rhythm instead of eight identical cards.
 */
const SERVICE_TILES: Record<string, { span: string; tone: keyof typeof TONES }> = {
  "business-line-of-credit": { span: "md:col-span-2", tone: "navy" },
  "working-capital": { span: "", tone: "mint" },
  "term-loan": { span: "", tone: "sky" },
  "sba-loans": { span: "", tone: "sand" },
  "revenue-based-financing": { span: "", tone: "peach" },
  "equipment-financing": { span: "md:col-span-2", tone: "navy" },
  "merchant-cash-advance": { span: "md:col-span-2", tone: "plain" },
  "invoice-factoring": { span: "md:col-span-2", tone: "gold" },
};

const TONES = {
  navy: {
    card: "bg-navy text-navy-foreground border-transparent",
    icon: "bg-gold text-gold-foreground",
    body: "text-navy-foreground/75",
    link: "text-gold",
    spot: "color-mix(in oklch, var(--color-gold) 18%, transparent)",
  },
  mint: {
    card: "bg-mint text-navy border-transparent",
    icon: "bg-mint-ink text-white",
    body: "text-navy/70",
    link: "text-mint-ink",
    spot: "color-mix(in oklch, var(--color-mint-ink) 10%, transparent)",
  },
  sky: {
    card: "bg-sky text-navy border-transparent",
    icon: "bg-sky-ink text-white",
    body: "text-navy/70",
    link: "text-sky-ink",
    spot: "color-mix(in oklch, var(--color-sky-ink) 10%, transparent)",
  },
  sand: {
    card: "bg-sand text-navy border-transparent",
    icon: "bg-sand-ink text-white",
    body: "text-navy/70",
    link: "text-sand-ink",
    spot: "color-mix(in oklch, var(--color-sand-ink) 10%, transparent)",
  },
  peach: {
    card: "bg-peach text-navy border-transparent",
    icon: "bg-peach-ink text-white",
    body: "text-navy/70",
    link: "text-peach-ink",
    spot: "color-mix(in oklch, var(--color-peach-ink) 10%, transparent)",
  },
  gold: {
    card: "bg-gold/15 text-navy border-gold/30",
    icon: "bg-gold text-gold-foreground",
    body: "text-navy/75",
    link: "text-navy",
    spot: "color-mix(in oklch, var(--color-gold) 25%, transparent)",
  },
  plain: {
    card: "bg-card text-navy border-border hover:shadow-lift hover:border-cobalt/30",
    icon: "bg-navy text-navy-foreground",
    body: "text-muted-foreground",
    link: "text-cobalt",
    spot: undefined,
  },
} as const;

const GUIDE_IMAGES = [blog1, blog2, blog3];

const HOME_FAQS = GENERAL_FAQS.slice(0, 6);

/** The lowest bar across our programs; term and SBA loans ask for more. */
const MINIMUMS: { value: ReactNode; label: string }[] = [
  { value: <CountUp to={4} suffix="+ months" />, label: "in business" },
  { value: <CountUp to={10} prefix="$" suffix="K+" />, label: "monthly revenue" },
  { value: "Business", label: "checking account" },
  { value: "All credit", label: "scores considered" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <IndustryCarousel />
        <ScrollStatement />
        <HowItWorks />
        <OfferXRayTeaser />
        <HomeEstimator />

        {/* SERVICES */}
        <section id="services" className="py-20 md:py-28">
          <div className="container-page">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cobalt">
                Funding Options
              </span>
              <h2 className="mt-4 text-balance-tight text-4xl font-extrabold text-navy md:text-5xl">
                Eight ways to fund your next move
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                A safety net for slow months or capital for a bigger contract. We find the structure
                that costs the least and moves the fastest.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((service) => {
                const Icon = SERVICE_ICONS[service.slug] ?? HandCoins;
                const tile = SERVICE_TILES[service.slug] ?? { span: "", tone: "plain" as const };
                const tone = TONES[tile.tone];
                const wide = tile.span !== "";
                return (
                  <Spotlight
                    key={service.slug}
                    style={tone.spot ? ({ "--spot-color": tone.spot } as CSSProperties) : undefined}
                    className={`group flex flex-col rounded-3xl border p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 ${tone.card} ${tile.span} ${wide ? "md:p-9" : ""}`}
                  >
                    <div
                      className={`grid size-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${tone.icon}`}
                    >
                      <Icon className="size-6" />
                    </div>
                    <h3
                      className={`mt-6 font-extrabold ${wide ? "text-2xl md:text-3xl" : "text-xl"}`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`mt-3 flex-1 text-sm leading-relaxed ${wide ? "max-w-md md:text-base" : ""} ${tone.body}`}
                    >
                      {service.description}
                    </p>
                    <Link
                      to="/services/$slug"
                      params={{ slug: service.slug }}
                      className={`mt-6 inline-flex items-center gap-2 text-sm font-bold after:absolute after:inset-0 after:rounded-3xl ${tone.link}`}
                    >
                      Learn more
                      <span className="sr-only"> about {service.title}</span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Spotlight>
                );
              })}
            </div>
            <Link
              to="/services"
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-navy px-7 py-3 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-navy-foreground"
            >
              Compare all funding options
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        {/* MINIMUM REQUIREMENTS */}
        <section className="border-y border-border bg-surface py-16 md:py-20">
          <div className="container-page">
            <div className="max-w-2xl">
              <h2 className="text-balance-tight text-3xl font-extrabold text-navy md:text-4xl">
                Are we a match? Check the minimums.
              </h2>
              <p className="mt-3 text-muted-foreground">
                The starting point across our programs. Term and SBA loans ask for more time in
                business and stronger credit.
              </p>
            </div>
            <dl className="mt-12 grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-border">
              {MINIMUMS.map((m) => (
                <div key={m.label} className="lg:px-8 lg:first:pl-0">
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span className="block text-4xl font-extrabold tracking-tight text-navy tabular-nums md:text-5xl">
                      {m.value}
                    </span>
                    <span className="mt-2 block text-sm font-semibold text-muted-foreground">
                      {m.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              to="/resources/$slug"
              params={{ slug: "business-loan-requirements" }}
              className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-cobalt"
            >
              Requirements by product
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-20 md:py-28">
          <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative order-last lg:order-first">
              <img
                src={aboutImg}
                alt="Two business partners shaking hands in a modern office"
                width={1024}
                height={1024}
                loading="lazy"
                className="w-full rounded-3xl object-cover shadow-lift"
              />
            </div>
            <div>
              <h2 className="text-balance-tight text-4xl font-extrabold text-navy md:text-5xl">
                Built for the businesses banks overlook
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Small and mid-sized companies are the first to hear "no" when a bank's checklist
                doesn't line up. We look at the business you actually run, not just a credit report,
                and take it to the lenders that do the same.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Your specialist reviews deposits, revenue trends and industry cycles, then matches
                you with the programs that fit how money moves through your business.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-navy-foreground transition-transform hover:-translate-y-0.5"
                >
                  How we work
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/industries"
                  className="inline-flex items-center gap-2 text-sm font-bold text-cobalt"
                >
                  All {INDUSTRY_PAGES.length} industries we fund
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CALCULATORS */}
        <section className="grain relative isolate overflow-hidden bg-navy py-20 text-navy-foreground md:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-cobalt/40 blur-3xl"
          />
          <div className="container-page relative z-[1]">
            <div className="max-w-2xl">
              <h2 className="text-balance-tight text-4xl font-extrabold md:text-5xl">
                Know the numbers before you apply
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-navy-foreground/70">
                Free calculators to estimate payments, compare factor rates with APR and see a rough
                funding range for your business.
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {CALCULATORS.filter((c) => c.path !== "/calculators/offer-x-ray").map((c) => (
                <Spotlight
                  key={c.path}
                  style={
                    {
                      "--spot-color": "color-mix(in oklch, var(--color-gold) 16%, transparent)",
                    } as CSSProperties
                  }
                  className="group flex h-full flex-col rounded-3xl border border-navy-foreground/15 bg-navy-foreground/[0.05] p-7 transition-colors hover:border-gold/50"
                >
                  <Calculator className="size-6 text-gold" />
                  <h3 className="mt-5 text-lg font-extrabold">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-foreground/70">
                    {c.summary}
                  </p>
                  <a
                    href={c.path}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold after:absolute after:inset-0 after:rounded-3xl"
                  >
                    Open calculator
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Spotlight>
              ))}
            </div>
          </div>
        </section>

        {/* GUIDES */}
        <section id="insights" className="py-20 md:py-28">
          <div className="container-page">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-2xl text-balance-tight text-4xl font-extrabold text-navy md:text-5xl">
                Guides written for owners, not bankers
              </h2>
              <Link
                to="/resources"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-navy px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-navy-foreground"
              >
                All guides
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-12 grid gap-7 md:grid-cols-3">
              {GUIDES.slice(0, 3).map((guide, i) => (
                <article key={guide.slug} className="group relative">
                  <div className="overflow-hidden rounded-3xl">
                    <img
                      src={GUIDE_IMAGES[i % GUIDE_IMAGES.length]}
                      alt=""
                      width={1024}
                      height={640}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-5 text-sm font-bold text-cobalt">{guide.category}</p>
                  <h3 className="mt-2 text-xl font-extrabold leading-snug text-navy">
                    <Link
                      to="/resources/$slug"
                      params={{ slug: guide.slug }}
                      className="after:absolute after:inset-0 group-hover:text-cobalt"
                    >
                      {guide.title}
                    </Link>
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FaqList faqs={HOME_FAQS} title="Questions owners ask us" />
        <div className="container-page -mt-8 max-w-4xl pb-16 md:pb-20">
          <Link to="/faq" className="inline-flex items-center gap-2 text-sm font-bold text-cobalt">
            See all questions
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* CLOSING CTA */}
        <section className="grain relative isolate overflow-hidden bg-navy py-20 text-navy-foreground">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-1/2 size-96 -translate-y-1/2 rounded-full bg-cobalt/35 blur-3xl"
          />
          <div className="container-page relative z-[1] flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-balance-tight text-4xl font-extrabold md:text-5xl">
                See what your business qualifies for
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-navy-foreground/75">
                One short application, a specialist who picks up the phone, and offers you can
                actually compare.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-extrabold text-gold-foreground shadow-lift transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
              >
                See Your Options
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-foreground/30 px-8 py-4 text-base font-bold hover:bg-navy-foreground/10"
              >
                <Phone className="size-5" />
                {COMPANY.phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
