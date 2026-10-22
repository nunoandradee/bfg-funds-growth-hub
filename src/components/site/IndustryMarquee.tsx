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
 * The industries we fund, drifting past under the hero. The second copy only
 * closes the loop, so it is hidden from assistive tech and the keyboard.
 */
export function IndustryMarquee() {
  const row = (copy: boolean) =>
    INDUSTRY_PAGES.map((industry) => {
      const Icon = INDUSTRY_ICONS[industry.slug] ?? Landmark;
      return (
        <Link
          key={`${industry.slug}-${copy ? "b" : "a"}`}
          to="/industries/$slug"
          params={{ slug: industry.slug }}
          tabIndex={copy ? -1 : undefined}
          className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-border bg-card px-5 py-3 text-sm font-bold text-navy transition-colors hover:border-cobalt/40 hover:text-cobalt"
        >
          <Icon aria-hidden className="size-4 text-gold" />
          {industry.name}
        </Link>
      );
    });

  return (
    <section data-motion aria-label="Industries we fund" className="border-b border-border py-8">
      <div className="marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max gap-3">
          <div className="flex gap-3">{row(false)}</div>
          <div className="flex gap-3" aria-hidden>
            {row(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
