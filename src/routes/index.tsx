import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calculator,
  Check,
  Phone,
  Scale,
  ScanSearch,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { HomeEstimator } from "@/components/site/HomeEstimator";
import { HowItWorks } from "@/components/site/HowItWorks";
import { IndustryCarousel } from "@/components/site/IndustryCarousel";
import { Footer } from "@/components/site/Footer";
import { LeadForm } from "@/components/site/LeadForm";
import { OfferXRayTeaser } from "@/components/site/OfferXRayTeaser";
import { ProductExplorer } from "@/components/site/ProductExplorer";
import { CALCULATORS } from "@/data/calculators";
import { GUIDES } from "@/data/guides";
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

/** Plain facts the site already states; no invented volumes or ratings. */
const FACTS = [
  { value: "$10K–$2M", label: "Funding amounts" },
  { value: "8", label: "Funding products compared" },
  { value: "1", label: "Specialist, start to finish" },
];

const WHY = [
  {
    icon: UserRound,
    title: "One specialist",
    text: "The same person from application to funding. No call center, no being passed around.",
  },
  {
    icon: Scale,
    title: "Honest comparisons",
    text: "Payment, total cost and term side by side. If a cheaper option fits, we say so.",
  },
  {
    icon: ShieldCheck,
    title: "No impact to look",
    text: "Seeing your options won't affect your credit score.",
  },
];

const USES = [
  "Purchase inventory",
  "Cover payroll",
  "Buy or upgrade equipment",
  "Expand or renovate",
  "Hire more employees",
  "Launch marketing campaigns",
  "Smooth out slow seasons",
  "Take on a bigger contract",
];

const GUIDE_IMAGES = [blog1, blog2, blog3];

const HOME_FAQS = GENERAL_FAQS.slice(0, 6);

/** The lowest bar across our programs; term and SBA loans ask for more. */
const MINIMUMS = [
  { value: "4+ months", label: "in business" },
  { value: "$10K+", label: "monthly revenue" },
  { value: "Business", label: "checking account" },
  { value: "All", label: "credit scores considered" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Announcement: the free tool nobody else offers. */}
        <section className="bg-gold/15">
          <div className="container-page flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-3 text-center text-sm text-navy">
            <ScanSearch aria-hidden className="size-4 text-navy" />
            <a href="/calculators/offer-x-ray" className="font-bold underline underline-offset-4">
              Try the free Offer X-Ray
            </a>
            <span>See what any funding offer really costs.</span>
          </div>
        </section>

        <Hero />

        {/* Facts card overlapping the hero. */}
        <section className="relative z-10 -mt-16 md:-mt-20">
          <div className="container-page">
            <dl className="grid divide-y divide-border rounded-3xl bg-card shadow-lift ring-1 ring-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {FACTS.map((f) => (
                <div
                  key={f.label}
                  className="flex flex-col items-center px-6 py-7 text-center md:py-9"
                >
                  <dt className="order-2 mt-1 text-sm font-semibold text-muted-foreground">
                    {f.label}
                  </dt>
                  <dd className="order-1 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <IndustryCarousel />

        {/* SERVICES */}
        <section id="services" className="bg-surface py-20 md:py-28">
          <div className="container-page">
            <h2 className="text-center text-balance-tight text-4xl font-extrabold text-navy md:text-5xl">
              Funding options built to work for you.
            </h2>
            <div className="mt-14">
              <ProductExplorer />
            </div>
          </div>
        </section>

        {/* WHY BFG */}
        <section className="bg-navy py-20 text-navy-foreground md:py-24">
          <div className="container-page">
            <h2 className="text-center text-balance-tight text-4xl font-extrabold md:text-5xl">
              See why business owners choose us.
            </h2>
            <div className="mt-14 grid gap-12 md:grid-cols-3">
              {WHY.map(({ icon: Icon, title, text }) => (
                <div key={title} className="text-center">
                  <span className="mx-auto grid size-24 place-items-center rounded-full bg-gold text-gold-foreground">
                    <Icon aria-hidden strokeWidth={1.75} className="size-10" />
                  </span>
                  <h3 className="mt-6 text-xl font-extrabold">{title}</h3>
                  <p className="mx-auto mt-2 max-w-xs leading-relaxed text-navy-foreground/75">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HowItWorks />
        <OfferXRayTeaser />

        {/* WHAT YOU CAN DO */}
        <section id="about" className="py-20 md:py-28">
          <div className="container-page grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="relative mx-auto w-full max-w-md">
              <div
                aria-hidden
                className="absolute -bottom-6 -left-6 size-32 rounded-full bg-gold/35"
              />
              <div className="relative overflow-hidden rounded-t-[999px] rounded-b-3xl">
                <img
                  src={aboutImg}
                  alt="Two business partners shaking hands in a modern office"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-balance-tight text-4xl font-extrabold text-navy md:text-5xl">
                What can you do with funding from BFG?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Whatever the goal, your specialist matches you with the program that fits how money
                moves through your business.
              </p>
              <ul className="mt-8 grid gap-x-8 gap-y-4 rounded-3xl bg-card p-7 shadow-card ring-1 ring-border sm:grid-cols-2">
                {USES.map((use) => (
                  <li key={use} className="flex items-center gap-3 font-semibold text-navy">
                    <Check aria-hidden className="size-5 shrink-0 text-gold" strokeWidth={3} />
                    {use}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* MINIMUM REQUIREMENTS */}
        <section className="bg-surface py-20 md:py-24">
          <div className="container-page">
            <h2 className="text-center text-balance-tight text-3xl font-extrabold text-navy md:text-4xl">
              Are we a match? Check the minimums.
            </h2>
            <dl className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
              {MINIMUMS.map((m) => (
                <div
                  key={m.label}
                  className="rounded-3xl bg-card px-6 py-8 text-center shadow-card"
                >
                  <dt className="order-2 sr-only">{m.label}</dt>
                  <dd>
                    <span className="block text-2xl font-extrabold text-navy md:text-3xl">
                      {m.value}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{m.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Term and SBA loans ask for more time in business and stronger credit.{" "}
              <Link
                to="/resources/$slug"
                params={{ slug: "business-loan-requirements" }}
                className="font-semibold text-cobalt underline"
              >
                Requirements by product
              </Link>
            </p>
          </div>
        </section>

        <HomeEstimator />

        {/* CALCULATORS */}
        <section className="bg-navy py-20 text-navy-foreground md:py-24">
          <div className="container-page">
            <h2 className="text-center text-balance-tight text-4xl font-extrabold md:text-5xl">
              Know the numbers before you apply.
            </h2>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {CALCULATORS.filter((c) => c.path !== "/calculators/offer-x-ray").map((c) => (
                <a
                  key={c.path}
                  href={c.path}
                  className="group flex flex-col rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/10 transition-colors hover:bg-white/[0.1]"
                >
                  <Calculator aria-hidden className="size-6 text-gold" />
                  <h3 className="mt-5 text-lg font-extrabold">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-foreground/70">
                    {c.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold">
                    Open calculator
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* GUIDES */}
        <section id="insights" className="py-20 md:py-28">
          <div className="container-page">
            <h2 className="text-center text-balance-tight text-4xl font-extrabold text-navy md:text-5xl">
              Guides written for owners.
            </h2>
            <div className="mt-12 grid gap-7 md:grid-cols-3">
              {GUIDES.slice(0, 3).map((guide, i) => (
                <article
                  key={guide.slug}
                  className="group relative overflow-hidden rounded-3xl bg-card shadow-card ring-1 ring-border"
                >
                  <img
                    src={GUIDE_IMAGES[i % GUIDE_IMAGES.length]}
                    alt=""
                    width={1024}
                    height={640}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-6">
                    <p className="text-sm font-bold text-cobalt">{guide.category}</p>
                    <h3 className="mt-2 text-lg font-extrabold leading-snug text-navy">
                      <Link
                        to="/resources/$slug"
                        params={{ slug: guide.slug }}
                        className="after:absolute after:inset-0"
                      >
                        {guide.title}
                      </Link>
                    </h3>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-10 text-center">
              <Link
                to="/resources"
                className="inline-flex rounded-full border-2 border-navy px-7 py-3 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-navy-foreground"
              >
                All guides
              </Link>
            </p>
          </div>
        </section>

        <div className="bg-surface">
          <FaqList faqs={HOME_FAQS} title="Questions owners ask us" />
          <div className="container-page -mt-8 max-w-4xl pb-16 md:pb-20">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-sm font-bold text-cobalt"
            >
              See all questions
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* TAKE YOUR CALL */}
        <section className="relative overflow-hidden bg-navy py-20 text-navy-foreground md:py-24">
          <div aria-hidden className="absolute -right-20 -top-24 size-80 rounded-full bg-gold/25" />
          <div
            aria-hidden
            className="absolute -bottom-16 right-40 size-40 rounded-full bg-white/[0.04]"
          />
          <div className="container-page relative">
            <div className="max-w-2xl">
              <h2 className="text-balance-tight text-4xl font-extrabold md:text-5xl">
                We know small business, and we pick up the phone.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-navy-foreground/80">
                You don't need to be a funding expert. A specialist will walk you through your
                options in plain English.
              </p>
              <a
                href={COMPANY.phoneHref}
                className="mt-8 inline-flex items-center gap-3 text-3xl font-extrabold text-gold hover:underline md:text-4xl"
              >
                <Phone aria-hidden className="size-8" />
                {COMPANY.phoneDisplay}
              </a>
              {COMPANY.hours && <p className="mt-2 text-navy-foreground/70">{COMPANY.hours}</p>}
            </div>
          </div>
        </section>

        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
