import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { FUNDING_DISCLAIMER, type Faq } from "@/data/site";

export type Crumb = { name: string; to?: string };

/** Page header shared by the inner pages: light, quiet, optional photo. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: { src: string; alt: string } | undefined;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-surface">
      <div
        className={`container-page py-12 md:py-16 ${image ? "grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16" : ""}`}
      >
        <div>
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            {crumbs.map((c, i) => (
              <span key={c.name}>
                {i > 0 && <span className="px-2 text-border">/</span>}
                {c.to ? (
                  <a href={c.to} className="hover:text-navy hover:underline">
                    {c.name}
                  </a>
                ) : (
                  <span className="text-navy">{c.name}</span>
                )}
              </span>
            ))}
          </nav>
          {eyebrow && <p className="mt-8 text-sm font-semibold text-cobalt">{eyebrow}</p>}
          <h1
            className={`${eyebrow ? "mt-2" : "mt-8"} max-w-3xl text-balance-tight text-4xl leading-[1.1] text-navy md:text-5xl`}
          >
            {title}
          </h1>
          {intro && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>
          )}
          {children}
        </div>
        {image && (
          <img
            src={image.src}
            alt={image.alt}
            className="aspect-[4/3] w-full rounded-lg object-cover"
          />
        )}
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
        <h2 className="text-balance-tight text-3xl text-navy md:text-4xl">{title}</h2>
        <div className="mt-8 divide-y divide-border border-y border-border">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-semibold text-navy">
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
  title = "Talk to us about your business",
  text = "One application, a specialist who knows the lenders, and offers explained in plain English. Checking your options won't affect your credit.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-navy py-16 text-navy-foreground">
      <div className="container-page flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="text-balance-tight text-3xl md:text-4xl">{title}</h2>
          <p className="mt-3 text-lg leading-relaxed text-navy-foreground/75">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="/apply"
            className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3.5 text-sm font-bold text-gold-foreground transition-colors hover:bg-gold/90"
          >
            Check my options
            <ArrowRight className="size-4" />
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md border border-navy-foreground/30 px-6 py-3.5 text-sm font-semibold hover:bg-navy-foreground/10"
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
