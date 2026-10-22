import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  Banknote,
  Briefcase,
  Building2,
  Car,
  ChevronRight,
  CreditCard,
  Factory,
  HandCoins,
  HardHat,
  Landmark,
  Percent,
  Phone,
  ReceiptText,
  Scissors,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
  TreePine,
  Truck,
  Users,
  UtensilsCrossed,
  Wrench,
  Zap,
} from "lucide-react";

import { CountUp } from "@/components/site/CountUp";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { HomeEstimator } from "@/components/site/HomeEstimator";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Footer } from "@/components/site/Footer";
import { LeadForm } from "@/components/site/LeadForm";
import { OfferXRayTeaser } from "@/components/site/OfferXRayTeaser";
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

const INDUSTRY_ICONS: Record<string, typeof Truck> = {
  construction: HardHat,
  restaurants: UtensilsCrossed,
  trucking: Truck,
  "retail-ecommerce": ShoppingBag,
  healthcare: Stethoscope,
  "auto-repair": Car,
  "professional-services": Briefcase,
  manufacturing: Factory,
  "beauty-wellness": Scissors,
  staffing: Users,
  landscaping: TreePine,
  "real-estate-services": Building2,
};

const GUIDE_IMAGES = [blog1, blog2, blog3];

const HOME_FAQS = GENERAL_FAQS.slice(0, 6);

/** The lowest bar across our programs; term and SBA loans ask for more. */
const MINIMUMS: { value: ReactNode; label: string }[] = [
  { value: <CountUp to={4} suffix="+ mo" />, label: "in business" },
  { value: <CountUp to={10} prefix="$" suffix="K+" />, label: "monthly revenue" },
  { value: "Business", label: "checking account" },
  { value: "All", label: "credit scores considered" },
];

/** Apple-style section header: centered headline and one line of support. */
function SectionHead({
  title,
  text,
  dark = false,
}: {
  title: string;
  text?: string;
  dark?: boolean;
}) {
  return (
    <div className="text-center">
      <h2
        className={`mx-auto max-w-3xl text-4xl font-bold tracking-[-0.035em] md:text-6xl ${
          dark ? "" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {text && (
        <p
          className={`mx-auto mt-5 max-w-2xl text-lg leading-snug md:text-xl ${
            dark ? "text-navy-foreground/65" : "text-navy/60"
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );
}

/** The quiet text link Apple pairs with every primary button. */
function MoreLink({
  to,
  children,
  className = "",
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={to}
      className={`group inline-flex items-center gap-0.5 font-semibold text-cobalt ${className}`}
    >
      {children}
      <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <OfferXRayTeaser />

        {/* SERVICES */}
        <section id="services" className="py-20 md:py-28">
          <div className="container-page">
            <SectionHead
              title="Eight ways to fund your next move."
              text="A safety net for slow months or capital for a bigger contract. We find the structure that costs the least."
            />
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((service) => {
                const Icon = SERVICE_ICONS[service.slug] ?? HandCoins;
                return (
                  <Link
                    key={service.slug}
                    to="/services/$slug"
                    params={{ slug: service.slug }}
                    className="group flex flex-col rounded-[1.5rem] bg-surface p-7 transition-transform duration-300 hover:scale-[1.015]"
                  >
                    <Icon aria-hidden strokeWidth={1.75} className="size-7 text-navy" />
                    <h3 className="mt-8 text-xl font-bold tracking-tight text-navy">
                      {service.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/60">
                      {service.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-0.5 text-sm font-semibold text-cobalt">
                      Learn more
                      <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
            <p className="mt-10 text-center">
              <MoreLink to="/services">Compare all funding options</MoreLink>
            </p>
          </div>
        </section>

        <HomeEstimator />

        {/* WHO WE FUND */}
        <section id="about" className="py-20 md:py-28">
          <div className="container-page">
            <SectionHead
              title="Built for the businesses banks overlook."
              text="We look at the business you actually run, not just a credit report, and take it to the lenders that do the same."
            />
            <div className="mt-14 overflow-hidden rounded-[2rem]">
              <img
                src={aboutImg}
                alt="Two business partners shaking hands in a modern office"
                width={1024}
                height={1024}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover sm:aspect-[21/9]"
              />
            </div>
            <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-4">
              {INDUSTRY_PAGES.map((industry) => {
                const Icon = INDUSTRY_ICONS[industry.slug] ?? Landmark;
                return (
                  <li key={industry.slug}>
                    <Link
                      to="/industries/$slug"
                      params={{ slug: industry.slug }}
                      className="group flex items-center gap-3 text-[15px] font-semibold text-navy hover:text-cobalt"
                    >
                      <Icon aria-hidden strokeWidth={1.75} className="size-5 shrink-0 text-gold" />
                      {industry.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-3">
              <MoreLink to="/about">How we work</MoreLink>
              <MoreLink to="/industries">All industries</MoreLink>
            </p>
          </div>
        </section>

        {/* MINIMUM REQUIREMENTS */}
        <section className="bg-surface py-20 md:py-28">
          <div className="container-page">
            <SectionHead
              title="Are we a match?"
              text="The starting point across our programs. Term and SBA loans ask for more time in business and stronger credit."
            />
            <dl className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-y-12 text-center lg:grid-cols-4">
              {MINIMUMS.map((m) => (
                <div key={m.label}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span className="block text-5xl font-bold tracking-[-0.04em] text-navy tabular-nums md:text-6xl">
                      {m.value}
                    </span>
                    <span className="mt-2 block text-navy/60">{m.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-12 text-center">
              <MoreLink to="/resources/business-loan-requirements">
                Requirements by product
              </MoreLink>
            </p>
          </div>
        </section>

        {/* GUIDES */}
        <section id="insights" className="py-20 md:py-28">
          <div className="container-page">
            <SectionHead
              title="Guides written for owners."
              text="Plain answers on cost, requirements and timing, before you sign anything."
            />
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {GUIDES.slice(0, 3).map((guide, i) => (
                <article key={guide.slug} className="group relative">
                  <div className="overflow-hidden rounded-[1.5rem]">
                    <img
                      src={GUIDE_IMAGES[i % GUIDE_IMAGES.length]}
                      alt=""
                      width={1024}
                      height={640}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-5 text-sm font-semibold text-navy/50">{guide.category}</p>
                  <h3 className="mt-1 text-xl font-bold leading-snug tracking-tight text-navy">
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
            <p className="mt-12 text-center">
              <MoreLink to="/resources">All guides</MoreLink>
            </p>
          </div>
        </section>

        <div className="bg-surface">
          <FaqList faqs={HOME_FAQS} title="Questions owners ask us" />
          <div className="container-page -mt-8 max-w-4xl pb-16 md:pb-20">
            <MoreLink to="/faq">See all questions</MoreLink>
          </div>
        </div>

        {/* CLOSING CTA */}
        <section className="bg-navy py-24 text-navy-foreground md:py-32">
          <div className="container-page">
            <SectionHead
              dark
              title="See what your business qualifies for."
              text="One short application, a specialist who picks up the phone, and offers you can actually compare."
            />
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <a
                href="/apply"
                className="rounded-full bg-gold px-7 py-3 text-base font-bold text-gold-foreground transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                See my options
              </a>
              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center gap-2 text-base font-semibold text-gold/90 hover:text-gold"
              >
                <Phone aria-hidden className="size-4" />
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
