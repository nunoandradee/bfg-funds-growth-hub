import { useRef } from "react";
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
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

import { INDUSTRY_PAGES } from "@/data/industries";

type IndustryPage = (typeof INDUSTRY_PAGES)[number];

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

const COPIES = 4; // enough repeats to cover the widest screens while looping
const half = Math.ceil(INDUSTRY_PAGES.length / 2);
const ROWS = [INDUSTRY_PAGES.slice(0, half), INDUSTRY_PAGES.slice(half)];

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * The industries we fund, as two big bands drifting in opposite directions
 * under the hero. Scrolling speeds them up and can flip their direction.
 * The first copy of each row is the real link list; the repeats only close
 * the loop and are hidden from assistive tech and the keyboard.
 */
export function IndustryMarquee() {
  return (
    <section
      data-motion
      aria-label="Industries we fund"
      className="grain relative isolate overflow-hidden border-t border-white/10 bg-navy py-8 text-navy-foreground md:py-10"
    >
      <div className="relative z-[1] space-y-3 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] md:space-y-4">
        {ROWS.map((row, i) => (
          <Band key={i} items={row} baseVelocity={i === 0 ? -2.2 : 2.2} />
        ))}
      </div>
    </section>
  );
}

function Band({ items, baseVelocity }: { items: readonly IndustryPage[]; baseVelocity: number }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`);
  const direction = useRef(1);
  const paused = useRef(false);
  // Same markup either way, so the server HTML matches; reduced motion just
  // never moves it.
  const reduce = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (paused.current || reduce) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;
    moveBy += direction.current * moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className="overflow-hidden"
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
    >
      <motion.div style={{ x }} className="flex w-max">
        {Array.from({ length: COPIES }, (_, copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy > 0 || undefined}
          >
            <Row items={items} copy={copy > 0} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function Row({ items, copy }: { items: readonly IndustryPage[]; copy: boolean }) {
  return items.map((industry) => {
    const Icon = INDUSTRY_ICONS[industry.slug] ?? Landmark;
    return (
      <Link
        key={industry.slug}
        to="/industries/$slug"
        params={{ slug: industry.slug }}
        tabIndex={copy ? -1 : undefined}
        className="group inline-flex shrink-0 items-center gap-4 px-4 py-1 text-2xl font-extrabold tracking-[-0.02em] text-navy-foreground/35 transition-colors duration-300 hover:text-navy-foreground focus-visible:text-navy-foreground focus-visible:outline-none md:gap-5 md:px-6 md:text-[2.6rem]"
      >
        <Icon
          aria-hidden
          strokeWidth={1.75}
          className="size-6 text-gold/70 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:text-gold md:size-8"
        />
        {industry.name}
      </Link>
    );
  });
}
