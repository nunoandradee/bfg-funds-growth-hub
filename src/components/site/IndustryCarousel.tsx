import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Car,
  ChevronRight,
  Factory,
  HardHat,
  Landmark,
  Scissors,
  ShoppingBag,
  Stethoscope,
  TreePine,
  Truck,
  Users,
  UtensilsCrossed,
} from "lucide-react";

import { INDUSTRY_PAGES } from "@/data/industries";

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

/**
 * The industries we fund as a slow belt of cards under the hero, on a light
 * band so the page breathes after the navy hero. CSS drives the drift (paused on hover or focus, still for reduced
 * motion). The second copy only closes the loop, so it is hidden from
 * assistive tech and the keyboard.
 */
export function IndustryCarousel() {
  const cards = (copy: boolean) =>
    INDUSTRY_PAGES.map((industry) => {
      const Icon = INDUSTRY_ICONS[industry.slug] ?? Landmark;
      return (
        <Link
          key={industry.slug}
          to="/industries/$slug"
          params={{ slug: industry.slug }}
          tabIndex={copy ? -1 : undefined}
          className="group relative flex w-[19rem] shrink-0 flex-col rounded-2xl bg-card p-6 ring-1 ring-border transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <div className="flex items-start justify-between">
            <span className="grid size-12 place-items-center rounded-xl bg-gold/15 text-[oklch(0.55_0.12_70)] transition-colors duration-300 group-hover:bg-gold group-hover:text-gold-foreground">
              <Icon aria-hidden strokeWidth={1.75} className="size-6" />
            </span>
            <ArrowUpRight
              aria-hidden
              className="size-5 text-navy/25 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy"
            />
          </div>
          <p className="mt-6 text-lg font-bold tracking-tight text-navy">{industry.name}</p>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {industry.summary}
          </p>
        </Link>
      );
    });

  return (
    <section
      data-motion
      aria-labelledby="industries-belt"
      className="bg-background pb-12 pt-12 md:pb-16 md:pt-16"
    >
      <div className="container-page flex items-end justify-between gap-6">
        <h2 id="industries-belt" className="text-lg font-bold tracking-tight text-navy md:text-xl">
          Industries we fund
        </h2>
        <Link
          to="/industries"
          className="group inline-flex items-center gap-0.5 text-sm font-semibold text-cobalt"
        >
          View all {INDUSTRY_PAGES.length}
          <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div className="belt mt-7 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        {/* Each copy carries its trailing gap as padding so the loop lands exactly at -50%. */}
        <div className="belt-track flex w-max">
          <div className="flex gap-4 pr-4">{cards(false)}</div>
          <div className="flex gap-4 pr-4" aria-hidden>
            {cards(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
