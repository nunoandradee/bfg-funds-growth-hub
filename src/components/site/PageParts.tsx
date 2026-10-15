import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { FUNDING_DISCLAIMER, type Faq } from "@/data/site";

export type Crumb = { name: string; to?: string };

/** Navy page header with breadcrumb, shared by the inner pages. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy py-16 text-navy-foreground md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-cobalt/30 blur-3xl"
      />
      <div className="container-page relative">
        <nav aria-label="Breadcrumb" className="text-sm font-semibold text-navy-foreground/60">
          {crumbs.map((c, i) => (
            <span key={c.name}>
              {i > 0 && <span className="px-2">/</span>}
              {c.to ? (
                <a href={c.to} className="hover:text-gold">
                  {c.name}
                </a>
              ) : (
                <span className="text-navy-foreground/90">{c.name}</span>
              )}
            </span>
          ))}
        </nav>
        {eyebrow && (
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
        )}
        <h1
          className={`${eyebrow ? "mt-4" : "mt-8"} max-w-3xl text-balance-tight text-4xl font-extrabold md:text-6xl`}
        >
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-foreground/75">{intro}</p>
        )}
        {children}
      </div>
    </section>
  );
}

export function FaqList({
  faqs,
  title = "Frequently asked questions",
}: {
  faqs: readonly Faq[];
  title?: string;
}) {
  if (faqs.length === 0) return null;
  return (
    <section className="py-16 md:py-20">
      <div className="container-page max-w-4xl">
        <h2 className="text-balance-tight text-3xl font-extrabold text-navy md:text-4xl">
          {title}
        </h2>
        <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((f) => (
            <details key={f.q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-bold text-navy">
                {f.q}
                <span
                  className="mt-0.5 text-cobalt transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Closing call to action used on content pages. */
export function CtaBand({
  title = "See what your business qualifies for",
  text = "One short application, no impact on your credit to review options, and a dedicated specialist who compares offers from our lender network for you.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-cobalt py-14 text-cobalt-foreground">
      <div className="container-page relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="text-balance-tight text-3xl font-extrabold md:text-4xl">{title}</h2>
          <p className="mt-3 text-lg leading-relaxed text-cobalt-foreground/85">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="/apply"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-extrabold text-gold-foreground shadow-lift transition-transform hover:-translate-y-0.5"
          >
            Apply Now
            <ArrowRight className="size-4" />
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-cobalt-foreground/40 px-7 py-3.5 text-sm font-bold hover:bg-cobalt-foreground/10"
          >
            Talk to a specialist
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-muted-foreground ${className}`}>
      {FUNDING_DISCLAIMER}
    </p>
  );
}
