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
 * The industries we fund as a slow belt of cards under the hero, on the same
 * navy. CSS drives the drift (paused on hover or focus, still for reduced
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
          className="group relative flex w-[19rem] shrink-0 flex-col rounded-2xl bg-white/[0.045] p-6 ring-1 ring-white/10 transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:bg-white/[0.08] hover:ring-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <div className="flex items-start justify-between">
            <span className="grid size-12 place-items-center rounded-xl bg-gold/15 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-gold-foreground">
              <Icon aria-hidden strokeWidth={1.75} className="size-6" />
            </span>
            <ArrowUpRight
              aria-hidden
              className="size-5 text-navy-foreground/30 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
            />
          </div>
          <p className="mt-6 text-lg font-bold tracking-tight text-navy-foreground">
            {industry.name}
          </p>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-navy-foreground/55">
            {industry.summary}
          </p>
        </Link>
      );
    });

  return (
    <section
      data-motion
      aria-labelledby="industries-belt"
      className="border-t border-white/10 bg-navy pb-12 pt-10 text-navy-foreground md:pb-16 md:pt-12"
    >
      <div className="container-page flex items-end justify-between gap-6">
        <h2 id="industries-belt" className="text-lg font-bold tracking-tight md:text-xl">
          Industries we fund
        </h2>
        <Link
          to="/industries"
          className="group inline-flex items-center gap-0.5 text-sm font-semibold text-gold hover:text-gold/80"
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
