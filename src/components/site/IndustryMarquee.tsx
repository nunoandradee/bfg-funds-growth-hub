import { Link } from "@tanstack/react-router";
import {
  Briefcase,
  Building2,
  Car,
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
 * One quiet band under the hero: a fixed label and the industries we fund
 * drifting slowly past (CSS, paused on hover, still for reduced motion). The
 * second copy only closes the loop, so it is hidden from assistive tech and
 * the keyboard.
 */
export function IndustryMarquee() {
  const row = (copy: boolean) =>
    INDUSTRY_PAGES.map((industry) => {
      const Icon = INDUSTRY_ICONS[industry.slug] ?? Landmark;
      return (
        <Link
          key={industry.slug}
          to="/industries/$slug"
          params={{ slug: industry.slug }}
          tabIndex={copy ? -1 : undefined}
          className="group inline-flex shrink-0 items-center gap-2.5 px-6 text-base font-semibold text-navy-foreground/55 transition-colors hover:text-navy-foreground focus-visible:text-navy-foreground focus-visible:outline-none md:px-8"
        >
          <Icon
            aria-hidden
            strokeWidth={1.75}
            className="size-[18px] text-gold/80 transition-colors group-hover:text-gold"
          />
          {industry.name}
        </Link>
      );
    });

  return (
    <section
      data-motion
      aria-labelledby="industries-band"
      className="relative border-t border-white/10 bg-navy text-navy-foreground"
    >
      <div className="container-page flex items-center gap-6 py-6">
        <p
          id="industries-band"
          className="hidden shrink-0 border-r border-white/15 pr-6 text-sm font-bold text-navy-foreground md:block"
        >
          Industries we fund
        </p>
        <div className="marquee relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="marquee-track flex w-max">
            <div className="flex">{row(false)}</div>
            <div className="flex" aria-hidden>
              {row(true)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
