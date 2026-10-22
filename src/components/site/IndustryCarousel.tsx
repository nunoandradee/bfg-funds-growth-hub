import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";

import autoRepair from "@/assets/industries/auto-repair.jpg";
import beautyWellness from "@/assets/industries/beauty-wellness.jpg";
import construction from "@/assets/industries/construction.jpg";
import healthcare from "@/assets/industries/healthcare.jpg";
import landscaping from "@/assets/industries/landscaping.jpg";
import manufacturing from "@/assets/industries/manufacturing.jpg";
import professionalServices from "@/assets/industries/professional-services.jpg";
import realEstateServices from "@/assets/industries/real-estate-services.jpg";
import restaurants from "@/assets/industries/restaurants.jpg";
import retailEcommerce from "@/assets/industries/retail-ecommerce.jpg";
import staffing from "@/assets/industries/staffing.jpg";
import trucking from "@/assets/industries/trucking.jpg";
import { INDUSTRY_PAGES } from "@/data/industries";

/** One photograph per industry (free Unsplash photos, saved in src/assets/industries). */
const PHOTOS: Record<string, string> = {
  construction,
  restaurants,
  trucking,
  "retail-ecommerce": retailEcommerce,
  healthcare,
  "auto-repair": autoRepair,
  "professional-services": professionalServices,
  manufacturing,
  "beauty-wellness": beautyWellness,
  staffing,
  landscaping,
  "real-estate-services": realEstateServices,
};

/**
 * The industries we fund as a slow belt of photo cards: the work itself, with
 * the industry's name over a soft shade. Hovering pauses the belt, zooms the
 * photo and reveals the link text. CSS drives the drift (still for reduced
 * motion). The second copy only closes the loop, so it is hidden from
 * assistive tech and the keyboard.
 */
export function IndustryCarousel() {
  const cards = (copy: boolean) =>
    INDUSTRY_PAGES.map((industry) => (
      <Link
        key={industry.slug}
        to="/industries/$slug"
        params={{ slug: industry.slug }}
        tabIndex={copy ? -1 : undefined}
        className="group relative block aspect-[3/4] w-[15rem] shrink-0 overflow-hidden rounded-3xl bg-navy shadow-card focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold md:w-[17.5rem]"
      >
        {PHOTOS[industry.slug] && (
          <img
            src={PHOTOS[industry.slug]}
            alt=""
            width={720}
            height={960}
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent transition-opacity duration-500 group-hover:from-navy/95" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-navy-foreground">
          <p className="text-xl font-extrabold leading-tight tracking-tight">{industry.name}</p>
          <p className="mt-2 inline-flex translate-y-2 items-center gap-1.5 text-sm font-bold text-gold opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            See funding options
            <ArrowRight aria-hidden className="size-4" />
          </p>
        </div>
      </Link>
    ));

  return (
    <section
      data-motion
      aria-labelledby="industries-belt"
      className="bg-background pb-14 pt-14 md:pb-20 md:pt-20"
    >
      <div className="container-page flex items-end justify-between gap-6">
        <h2
          id="industries-belt"
          className="text-balance-tight text-3xl font-extrabold text-navy md:text-4xl"
        >
          Funding for the work you do.
        </h2>
        <Link
          to="/industries"
          className="group inline-flex shrink-0 items-center gap-0.5 text-sm font-bold text-cobalt"
        >
          All {INDUSTRY_PAGES.length} industries
          <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div className="belt mt-9 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        {/* Each copy carries its trailing gap as padding so the loop lands exactly at -50%. */}
        <div className="belt-track flex w-max">
          <div className="flex gap-5 pr-5">{cards(false)}</div>
          <div className="flex gap-5 pr-5" aria-hidden>
            {cards(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
