import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Car,
  Factory,
  HardHat,
  Landmark as BankIcon,
  Mail,
  Phone,
  Scissors,
  ShoppingBag,
  Stethoscope,
  TreePine,
  Truck,
  Users,
  UtensilsCrossed,
  BadgeCheck,
  Banknote,
  Calculator,
  ClipboardCheck,
  CreditCard,
  FileSearch,
  Gauge,
  HandCoins,
  Headphones,
  Landmark,
  Network,
  Percent,
  ReceiptText,
  Scale,
  Send,
  Settings2,
  ShieldCheck,
  UserRound,
  Wrench,
  Zap,
} from "lucide-react";

import { CountUp } from "@/components/site/CountUp";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { HomeEstimator } from "@/components/site/HomeEstimator";
import { Footer } from "@/components/site/Footer";
import { LeadForm } from "@/components/site/LeadForm";
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

const WHY = [
  { icon: Zap, title: "Fast Decisions", text: "Many programs decide in 24–48 hours, not weeks." },
  {
    icon: Settings2,
    title: "Many Options",
    text: "Eight funding products from a network of lenders.",
  },
  {
    icon: BadgeCheck,
    title: "All Credit Considered",
    text: "Many providers look at revenue, not just your score.",
  },
  {
    icon: Headphones,
    title: "Personalized Support",
    text: "One specialist from application to funded.",
  },
];

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Apply Online",
    text: "A two-minute application with basic business details.",
  },
  {
    icon: FileSearch,
    title: "Quick Funding Review",
    text: "Your specialist reviews revenue and matches you to programs.",
  },
  {
    icon: Gauge,
    title: "Compare Offers",
    text: "See amounts, payments and total cost, often the same day.",
  },
  {
    icon: Send,
    title: "Get Funded",
    text: "Funds can be wired in as little as 24 hours after you sign.",
  },
];

const MARKETPLACE = [
  {
    icon: UserRound,
    title: "One application",
    text: "Apply once. Your specialist presents your business to the providers most likely to approve it.",
  },
  {
    icon: Network,
    title: "A network of lenders",
    text: "SBA lenders, equipment financiers, lines of credit and revenue-based funders — not one lender's product.",
  },
  {
    icon: Scale,
    title: "Honest comparisons",
    text: "Total payback, payment and term side by side — and we tell you when a cheaper option fits better.",
  },
];

const GUIDE_IMAGES = [blog1, blog2, blog3];

const HOME_FAQS = GENERAL_FAQS.slice(0, 6);

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

/** The lowest bar across our programs; term and SBA loans ask for more. */
const MINIMUMS: { value: ReactNode; label: string }[] = [
  { value: <CountUp to={4} suffix="+ months" />, label: "in business" },
  { value: <CountUp to={10} prefix="$" suffix="K+" />, label: "monthly revenue" },
  { value: "Business", label: "checking account" },
  { value: "All credit", label: "scores considered" },
];

function Index() {
  const [visible, setVisible] = useState(3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />

        {/* HOW THE MARKETPLACE WORKS */}
        <section className="border-b border-border bg-background py-14">
          <div className="container-page grid gap-8 md:grid-cols-3">
            {MARKETPLACE.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold/20 text-navy">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-navy">{title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <HomeEstimator />

        {/* ABOUT */}
        <section id="about" className="py-20 md:py-28">
          <div className="container-page grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cobalt">
                About BFG Funds
              </span>
              <h2 className="mt-4 text-balance-tight text-4xl font-extrabold text-navy md:text-5xl">
                Built for the businesses banks overlook
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Small and mid-sized companies drive the U.S. economy, yet they're the first to get a
                "no" when a bank's checklist doesn't line up. BFG Funds exists to change that — we
                look at the business you actually run, not just a credit report, and take it to the
                lenders that do the same.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Your specialist reviews deposits, revenue trends and industry cycles, then matches
                you with the programs that fit how money moves through your business. The result:
                faster answers, offers you can actually compare, and a funding partner who picks up
                the phone.
              </p>
              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-navy-foreground transition-transform hover:-translate-y-0.5"
              >
                How we work
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="relative">
              <div
                aria-hidden
                className="absolute -right-4 -top-4 size-40 rounded-3xl bg-gold/25 blur-2xl"
              />
              <img
                src={aboutImg}
                alt="Two business partners shaking hands in a modern office"
                width={1024}
                height={1024}
                loading="lazy"
                className="relative w-full rounded-3xl object-cover shadow-lift"
              />
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="bg-surface py-20 md:py-28">
          <div className="container-page">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cobalt">
                Funding Options
              </span>
              <h2 className="mt-4 text-balance-tight text-4xl font-extrabold text-navy md:text-5xl">
                Eight ways to fund your next move
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Whether you need a safety net for slow months or capital to take on a bigger
                contract, we'll help you find the structure that costs the least and moves the
                fastest.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((service) => {
                const Icon = SERVICE_ICONS[service.slug] ?? HandCoins;
                return (
                  <article
                    key={service.slug}
                    className="group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:border-cobalt/40"
                  >
                    <div className="grid size-12 place-items-center rounded-xl bg-navy text-navy-foreground transition-colors group-hover:bg-cobalt">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-extrabold text-navy">{service.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <Link
                      to="/services/$slug"
                      params={{ slug: service.slug }}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-cobalt"
                    >
                      Learn More
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </article>
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

        {/* WHY CHOOSE US */}
        <section id="why" className="py-20 md:py-28">
          <div className="container-page">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cobalt">
                Why BFG Funds
              </span>
              <h2 className="mt-4 text-balance-tight text-4xl font-extrabold text-navy md:text-5xl">
                A funding partner that moves at your speed
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                No committees, no endless document requests, no vanishing account rep. Here's what
                working with us actually looks like.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {WHY.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-cobalt/40 hover:shadow-card"
                >
                  <div className="grid size-11 place-items-center rounded-xl bg-gold/20 text-navy">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MINIMUM REQUIREMENTS */}
        <section className="bg-surface py-16 md:py-20">
          <div className="container-page">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-balance-tight text-3xl font-extrabold text-navy md:text-4xl">
                  Are we a match? Check the minimums.
                </h2>
                <p className="mt-3 text-muted-foreground">
                  The starting point across our programs. Term and SBA loans ask for more time in
                  business and stronger credit.
                </p>
              </div>
              <Link
                to="/resources/$slug"
                params={{ slug: "business-loan-requirements" }}
                className="inline-flex items-center gap-2 text-sm font-bold text-cobalt"
              >
                Requirements by product
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {MINIMUMS.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-border bg-card p-6 text-center shadow-card transition-all hover:-translate-y-1 hover:border-cobalt/40"
                >
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span className="block text-2xl font-extrabold text-navy md:text-3xl">
                      {m.value}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{m.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section id="industries" className="py-20 md:py-28">
          <div className="container-page">
            <div className="max-w-3xl">
              <h2 className="text-balance-tight text-4xl font-extrabold text-navy md:text-5xl">
                Your industry, understood
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Draws and retainage, insurance reimbursements, net-60 freight invoices — we match
                you with lenders who know how your industry earns and spends.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {INDUSTRY_PAGES.slice(0, 6).map((industry) => {
                const Icon = INDUSTRY_ICONS[industry.slug] ?? BankIcon;
                return (
                  <Link
                    key={industry.slug}
                    to="/industries/$slug"
                    params={{ slug: industry.slug }}
                    className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-cobalt/40"
                  >
                    <Icon className="size-7 text-gold" />
                    <h3 className="mt-4 text-lg font-extrabold text-navy">{industry.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {industry.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cobalt">
                      Learn more
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
            <Link
              to="/industries"
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-navy px-7 py-3 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-navy-foreground"
            >
              View all {INDUSTRY_PAGES.length} industries
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        {/* PROCESS */}
        <section className="py-20 md:py-28">
          <div className="container-page">
            <div className="max-w-3xl">
              <h2 className="text-balance-tight text-4xl font-extrabold text-navy md:text-5xl">
                Our Streamlined Funding Process
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Four steps between where you are now and money in your account. Most clients finish
                the first one on their phone.
              </p>
            </div>
            <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {STEPS.map(({ icon: Icon, title, text }, i) => (
                <li
                  key={title}
                  className="relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:border-cobalt/40"
                >
                  <span className="absolute -right-2 -top-4 text-7xl font-extrabold text-navy/5">
                    {i + 1}
                  </span>
                  <div className="grid size-11 place-items-center rounded-xl bg-cobalt text-cobalt-foreground">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CALCULATORS */}
        <section className="bg-navy py-20 text-navy-foreground md:py-28">
          <div className="container-page">
            <div className="max-w-2xl">
              <h2 className="text-balance-tight text-4xl font-extrabold md:text-5xl">
                Know the numbers before you apply
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-navy-foreground/70">
                Free calculators to estimate payments, compare factor rates with APR and see a rough
                funding range for your business.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {CALCULATORS.map((c) => (
                <a
                  key={c.path}
                  href={c.path}
                  className="group flex h-full flex-col rounded-2xl border border-navy-foreground/15 bg-navy-foreground/[0.06] p-7 transition-colors hover:border-gold/60"
                >
                  <Calculator className="size-6 text-gold" />
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
            <div className="max-w-3xl">
              <h2 className="text-balance-tight text-4xl font-extrabold text-navy md:text-5xl">
                Guides &amp; Resources
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Practical guidance on capital, cash flow and growth — written for owners, not
                bankers.
              </p>
            </div>
            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {GUIDES.slice(0, visible).map((guide, i) => (
                <article
                  key={guide.slug}
                  className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card"
                >
                  <img
                    src={GUIDE_IMAGES[i % GUIDE_IMAGES.length]}
                    alt=""
                    width={1024}
                    height={640}
                    loading="lazy"
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-6">
                    <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-navy">
                      {guide.category}
                    </span>
                    <h3 className="mt-4 text-lg font-extrabold leading-snug text-navy">
                      {guide.title}
                    </h3>
                    <Link
                      to="/resources/$slug"
                      params={{ slug: guide.slug }}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cobalt"
                    >
                      Read More
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {visible < GUIDES.length && (
                <button
                  onClick={() => setVisible((v) => v + 3)}
                  className="rounded-full border border-navy px-7 py-3 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-navy-foreground"
                >
                  Load More
                </button>
              )}
              <Link
                to="/resources"
                className="rounded-full bg-navy px-7 py-3 text-sm font-bold text-navy-foreground transition-transform hover:-translate-y-0.5"
              >
                All guides
              </Link>
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

        {/* TALK TO A PERSON */}
        <section className="border-y border-border bg-surface py-16">
          <div className="container-page flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-balance-tight text-3xl font-extrabold text-navy md:text-4xl">
                Rather talk it through? Call a real person.
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                Talk to a dedicated funding specialist. No call center, no script — just someone who
                knows the lenders and will tell you what fits.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={COMPANY.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-7 py-4 text-base font-extrabold text-navy-foreground transition-transform hover:-translate-y-0.5"
              >
                <Phone className="size-5" />
                {COMPANY.phoneDisplay}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy px-7 py-4 text-base font-bold text-navy hover:bg-navy hover:text-navy-foreground"
              >
                <Mail className="size-5" />
                Email us
              </a>
            </div>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="relative overflow-hidden bg-cobalt py-16 text-cobalt-foreground">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-1/2 size-96 -translate-y-1/2 rounded-full bg-navy/40 blur-3xl"
          />
          <div className="container-page relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-balance-tight text-4xl font-extrabold md:text-5xl">
                Get Funded. Grow Faster.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-cobalt-foreground/85">
                From $10,000 to $2 million for growth, payroll, inventory and everyday cash flow —
                matched to your revenue, with many programs funding in as little as 24 hours.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-lg font-extrabold text-gold-foreground shadow-lift transition-transform hover:-translate-y-0.5"
            >
              See Your Options
              <ArrowRight className="size-5" />
            </a>
          </div>
        </section>

        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
