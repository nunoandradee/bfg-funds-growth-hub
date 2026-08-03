import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Banknote,
  Check,
  Clock,
  CreditCard,
  Landmark,
  Percent,
  Phone,
  ShieldCheck,
  Wallet,
  Wrench,
} from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LeadForm } from "@/components/site/LeadForm";
import { PHONE_DISPLAY, PHONE_TEL, SERVICES } from "@/data/site";

const ICONS: Record<string, typeof CreditCard> = {
  "business-line-of-credit": CreditCard,
  "working-capital": Banknote,
  "term-loan": Landmark,
  "sba-loans": ShieldCheck,
  "revenue-based-financing": Percent,
  "equipment-financing": Wrench,
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Service not found | BFG Funds" }, { name: "robots", content: "noindex" }],
      };
    }
    const { service } = loaderData;
    const title = `${service.title} | BFG Funds`;
    const description = `${service.tagline}. ${service.amount} with funding in ${service.speed.toLowerCase()} — see eligibility, how it works and apply in two minutes.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ServiceNotFound,
  component: ServicePage,
});

function ServiceNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-page py-28 text-center">
        <h1 className="text-4xl font-extrabold text-navy">We don't offer that program</h1>
        <p className="mt-4 text-muted-foreground">
          The funding service you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-navy px-6 py-3 text-sm font-bold text-navy-foreground"
        >
          Back to home
        </Link>
      </main>
      <Footer />
    </div>
  );
}

function ServicePage() {
  const { service } = Route.useLoaderData();
  const Icon = ICONS[service.slug] ?? Wallet;
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-navy py-20 text-navy-foreground md:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-cobalt/30 blur-3xl"
          />
          <div className="container-page relative">
            <nav aria-label="Breadcrumb" className="text-sm font-semibold text-navy-foreground/60">
              <Link to="/" className="hover:text-gold">
                Home
              </Link>
              <span className="px-2">/</span>
              <Link to="/" hash="services" className="hover:text-gold">
                Funding Services
              </Link>
              <span className="px-2">/</span>
              <span className="text-navy-foreground/90">{service.title}</span>
            </nav>

            <div className="mt-8 grid size-14 place-items-center rounded-2xl bg-cobalt">
              <Icon className="size-7" />
            </div>
            <h1 className="mt-6 max-w-3xl text-balance-tight text-4xl font-extrabold md:text-6xl">
              {service.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-foreground/75">
              {service.tagline}. {service.description}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-gold-foreground shadow-card transition-transform hover:-translate-y-0.5"
              >
                Start your application
                <ArrowRight className="size-4" />
              </a>
              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/25 px-7 py-3.5 text-sm font-bold hover:border-gold hover:text-gold"
              >
                <Phone className="size-4" />
                {PHONE_DISPLAY}
              </a>
            </div>

            <dl className="mt-14 grid gap-6 border-t border-navy-foreground/15 pt-8 sm:grid-cols-3">
              {[
                { label: "Funding amount", value: service.amount },
                { label: "Speed to funding", value: service.speed },
                { label: "Typical term", value: service.term },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 text-xl font-extrabold">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* OVERVIEW + BEST FOR */}
        <section className="py-20 md:py-24">
          <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cobalt">
                Overview
              </span>
              <h2 className="mt-4 text-balance-tight text-3xl font-extrabold text-navy md:text-4xl">
                Is {service.title.toLowerCase()} the right fit?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {service.overview}
              </p>
              <ul className="mt-8 space-y-3">
                {service.bestFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-navy/80">
                    <Check className="mt-1 size-5 shrink-0 text-gold" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ELIGIBILITY */}
            <aside className="rounded-3xl border border-border bg-surface p-8 shadow-card">
              <h3 className="text-xl font-extrabold text-navy">Eligibility</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                General guidelines — we regularly fund businesses that miss one of these.
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
              <a
                href="#contact"
                className="mt-8 flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-navy-foreground transition-transform hover:-translate-y-0.5"
              >
                Check if you qualify
                <ArrowRight className="size-4" />
              </a>
            </aside>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-surface py-20 md:py-24">
          <div className="container-page">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cobalt">
                How it works
              </span>
              <h2 className="mt-4 text-balance-tight text-3xl font-extrabold text-navy md:text-4xl">
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
              <Clock className="size-4 text-gold" />
              Average time to funding for this program: {service.speed.toLowerCase()}.
            </p>
          </div>
        </section>

        {/* OTHER SERVICES */}
        <section className="py-20 md:py-24">
          <div className="container-page">
            <h2 className="text-balance-tight text-3xl font-extrabold text-navy md:text-4xl">
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
