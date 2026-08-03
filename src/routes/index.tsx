import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  ClipboardCheck,
  CreditCard,
  FileSearch,
  Gauge,
  HandCoins,
  Headphones,
  Landmark,
  Percent,
  Phone,
  Send,
  Settings2,
  ShieldCheck,
  Star,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";

import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Footer } from "@/components/site/Footer";
import { LeadForm } from "@/components/site/LeadForm";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { INDUSTRIES, PHONE_DISPLAY, PHONE_TEL, SERVICES } from "@/data/site";
import aboutImg from "@/assets/about.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const TITLE = "BFG Funds | $30K–$2M Small Business Funding in 24–48 Hours";
const DESCRIPTION =
  "BFG Funds provides fast small business funding from $30K to $2M — lines of credit, working capital, SBA loans, equipment and revenue-based financing with approvals in 24–48 hours.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SERVICE_ICONS = [CreditCard, Banknote, Landmark, ShieldCheck, Percent, Wrench];

const WHY = [
  { icon: Zap, title: "Fast Approvals", text: "Decisions in 24–48 hours, not weeks." },
  { icon: Settings2, title: "Flexible Options", text: "Terms shaped around your cash flow cycle." },
  { icon: BadgeCheck, title: "All Credit Welcome", text: "We look at revenue, not just your score." },
  { icon: Headphones, title: "Personalized Support", text: "One specialist from apply to funded." },
];

const STEPS = [
  { icon: ClipboardCheck, title: "Apply Online", text: "A two-minute application with basic business details." },
  { icon: FileSearch, title: "Quick Funding Review", text: "We review revenue and match you to programs." },
  { icon: Gauge, title: "Same-Day Approval", text: "Get your offer and terms, often the same day." },
  { icon: Send, title: "Fast Fund Transfer", text: "Funds wired to your account in as little as 24 hours." },
];

const TESTIMONIALS = [
  {
    quote:
      "We needed inventory before our busiest quarter and the bank wanted 45 days. BFG Funds had us funded in two.",
    name: "Marcus Reyes",
    detail: "Retail Distributor — Tampa, FL",
  },
  {
    quote:
      "Our revenue swings hard by season. The revenue-based option means payments never squeeze payroll.",
    name: "Danielle Ochoa",
    detail: "Restaurant Group — Austin, TX",
  },
  {
    quote:
      "Credit wasn't perfect after 2023. They looked at our deposits instead and approved a $250K line.",
    name: "Sam Whitfield",
    detail: "Construction — Columbus, OH",
  },
];

const POSTS = [
  { img: blog1, tag: "Working Capital", title: "5 signs your business is ready for a credit line" },
  { img: blog2, tag: "Case Study", title: "How a 3-location restaurant group funded expansion" },
  { img: blog3, tag: "SBA Loans", title: "SBA vs. term loan: which fits a contractor best?" },
  { img: blog3, tag: "Cash Flow", title: "Managing seasonal dips without cutting payroll" },
  { img: blog1, tag: "Equipment", title: "When financing equipment beats paying cash" },
  { img: blog2, tag: "Underwriting", title: "What lenders actually look for in bank statements" },
];

function Index() {
  const [visible, setVisible] = useState(3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />

        {/* CLIENT LOGOS */}
        <section className="border-b border-border bg-background py-10">
          <div className="container-page">
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Trusted by growing businesses
            </p>
            <div className="mt-7 grid grid-cols-2 items-center gap-6 opacity-55 grayscale sm:grid-cols-4 lg:grid-cols-7">
              {["Northgate", "Ironline", "Vellum Co.", "BrightPath", "Harbor & Co", "Cedarworks", "Kinetic"].map(
                (name) => (
                  <div
                    key={name}
                    className="flex items-center justify-center gap-2 rounded-lg border border-border/70 px-3 py-3"
                  >
                    <Building2 className="size-4 text-navy" />
                    <span className="text-sm font-bold tracking-tight text-navy">{name}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

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
                underwrite the business you actually run, not just a credit report.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Our team reviews deposits, revenue trends and industry cycles to structure funding
                that fits how money moves through your business. The result: faster answers, honest
                terms, and a funding partner who picks up the phone.
              </p>
              <a
                href="#why"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-navy-foreground transition-transform hover:-translate-y-0.5"
              >
                Learn More
                <ArrowRight className="size-4" />
              </a>
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
                Funding Services
              </span>
              <h2 className="mt-4 text-balance-tight text-4xl font-extrabold text-navy md:text-5xl">
                Six ways to fund your next move
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Whether you need a safety net for slow months or capital to take on a bigger
                contract, we'll match you with the structure that costs the least and moves the
                fastest.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service, i) => {
                const Icon = SERVICE_ICONS[i] ?? HandCoins;
                return (
                  <article
                    key={service.title}
                    className="group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:border-cobalt/40"
                  >
                    <div className="grid size-12 place-items-center rounded-xl bg-navy text-navy-foreground transition-colors group-hover:bg-cobalt">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-extrabold text-navy">{service.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <a
                      href="#contact"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-cobalt"
                    >
                      Learn More
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </article>
                );
              })}
            </div>
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
                <div key={title} className="rounded-2xl border border-border bg-card p-7">
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

        {/* INDUSTRIES */}
        <section id="industries" className="bg-surface py-16">
          <div className="container-page">
            <h2 className="text-balance-tight text-3xl font-extrabold text-navy md:text-4xl">
              Industries We Serve
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              From jobsites to storefronts, we fund the operators keeping American main streets
              running.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {INDUSTRIES.map((industry) => (
                <li
                  key={industry}
                  className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-navy/85"
                >
                  <Truck className="size-3.5 text-cobalt" />
                  {industry}
                </li>
              ))}
            </ul>
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
                  className="relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card"
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

        {/* TESTIMONIALS */}
        <section className="bg-navy py-20 text-navy-foreground md:py-28">
          <div className="container-page">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-balance-tight text-4xl font-extrabold md:text-5xl">
                  What Our Clients Are Saying
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-navy-foreground/70">
                  Thousands of owners have used BFG Funds to cover payroll, buy equipment and take on
                  work they'd otherwise turn down.
                </p>
              </div>
              <a
                href="https://www.trustpilot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-3 rounded-2xl border border-navy-foreground/20 bg-navy-foreground/5 px-5 py-4"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-gold text-gold" />
                  ))}
                </div>
                <span className="text-sm font-bold">4.9 out of 5 stars</span>
              </a>
            </div>

            <Carousel opts={{ align: "start" }} className="mt-12">
              <CarouselContent>
                {TESTIMONIALS.map((t) => (
                  <CarouselItem key={t.name} className="md:basis-1/2 lg:basis-1/3">
                    <figure className="flex h-full flex-col rounded-2xl border border-navy-foreground/15 bg-navy-foreground/[0.06] p-7">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="size-4 fill-gold text-gold" />
                        ))}
                      </div>
                      <blockquote className="mt-5 flex-1 text-base leading-relaxed text-navy-foreground/90">
                        "{t.quote}"
                      </blockquote>
                      <figcaption className="mt-6">
                        <span className="block text-sm font-bold">{t.name}</span>
                        <span className="block text-xs text-navy-foreground/60">{t.detail}</span>
                      </figcaption>
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-8 flex gap-3">
                <CarouselPrevious className="static translate-y-0 border-navy-foreground/25 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground" />
                <CarouselNext className="static translate-y-0 border-navy-foreground/25 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground" />
              </div>
            </Carousel>
          </div>
        </section>

        {/* INSIGHTS */}
        <section id="insights" className="py-20 md:py-28">
          <div className="container-page">
            <div className="max-w-3xl">
              <h2 className="text-balance-tight text-4xl font-extrabold text-navy md:text-5xl">
                Latest Insights &amp; Resources
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Practical guidance on capital, cash flow and growth — written for owners, not
                bankers.
              </p>
            </div>
            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {POSTS.slice(0, visible).map((post, i) => (
                <article key={`${post.title}-${i}`} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                  <img
                    src={post.img}
                    alt={post.title}
                    width={1024}
                    height={640}
                    loading="lazy"
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-6">
                    <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-navy">
                      {post.tag}
                    </span>
                    <h3 className="mt-4 text-lg font-extrabold leading-snug text-navy">
                      {post.title}
                    </h3>
                    <a
                      href="#insights"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cobalt"
                    >
                      Read More
                      <ArrowRight className="size-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            {visible < POSTS.length && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setVisible((v) => v + 3)}
                  className="rounded-full border border-navy px-7 py-3 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-navy-foreground"
                >
                  Load More
                </button>
              </div>
            )}
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
                From $30,000 to $2 million for growth, payroll, inventory and everyday cash flow —
                structured around your revenue and funded in as little as 24 hours.
              </p>
            </div>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-lg font-extrabold text-gold-foreground shadow-lift transition-transform hover:-translate-y-0.5"
            >
              <Phone className="size-5" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </section>

        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
