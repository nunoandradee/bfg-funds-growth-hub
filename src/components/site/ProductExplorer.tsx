import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { SERVICES } from "@/data/site";

const CYCLE_MS = 6000;

/**
 * The eight products as an explorer instead of eight identical cards: pick a
 * product on the left (pills on phones) and a navy panel on the right shows
 * what it is, its amount, speed and term, and who it suits. It cycles on its
 * own on desktop, with a progress bar on the active tab, until the visitor
 * hovers or picks one; touch screens and reduced motion never cycle.
 */
export function ProductExplorer() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userPicked, setUserPicked] = useState(false);
  const reduce = useReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const list = useRef<HTMLDivElement>(null);
  // Touch screens don't cycle: the panel shouldn't change under a reader's thumb.
  const [touch, setTouch] = useState(false);
  useEffect(() => setTouch(window.matchMedia("(pointer: coarse)").matches), []);
  const cycling = !reduce && !touch && !paused && !userPicked;

  // When the tabs are a scrolling row of pills (phones), keep the active one in view.
  useEffect(() => {
    const row = list.current;
    const tab = tabs.current[active];
    if (!row || !tab || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: tab.offsetLeft - 20, behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    if (!cycling) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % SERVICES.length), CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [cycling, active]);

  const pick = (i: number) => {
    setActive(i);
    setUserPicked(true);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (i + 1) % SERVICES.length
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? (i - 1 + SERVICES.length) % SERVICES.length
          : null;
    if (next === null) return;
    e.preventDefault();
    pick(next);
    tabs.current[next]?.focus();
  };

  const service = SERVICES[active]!;

  return (
    <div
      className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div
        ref={list}
        role="tablist"
        aria-label="Funding products"
        aria-orientation="vertical"
        className="relative -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0"
      >
        {SERVICES.map((s, i) => {
          const selected = i === active;
          return (
            <button
              key={s.slug}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`product-tab-${s.slug}`}
              aria-selected={selected}
              aria-controls="product-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => pick(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`relative shrink-0 overflow-hidden rounded-full px-5 py-3 text-left text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:rounded-2xl lg:px-6 lg:py-4 lg:text-lg ${
                selected
                  ? "bg-navy text-navy-foreground lg:bg-card lg:text-navy lg:shadow-card"
                  : "bg-card text-navy/70 hover:text-navy lg:bg-transparent"
              }`}
            >
              {s.title}
              {selected && (
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 hidden h-1 bg-border lg:block"
                >
                  <span
                    key={`${active}-${cycling}`}
                    className={`block h-full bg-gold ${cycling ? "product-progress" : "w-full"}`}
                    style={cycling ? { animationDuration: `${CYCLE_MS}ms` } : undefined}
                  />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div
        id="product-panel"
        role="tabpanel"
        aria-labelledby={`product-tab-${service.slug}`}
        className="relative min-h-[30rem] overflow-hidden rounded-[2rem] bg-navy p-7 text-navy-foreground md:p-10"
      >
        <div aria-hidden className="absolute -right-24 -top-24 size-72 rounded-full bg-gold/15" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={service.slug}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <p className="text-sm font-bold text-gold">{service.tagline}</p>
            <h3 className="mt-2 text-balance-tight text-3xl font-extrabold md:text-4xl">
              {service.title}
            </h3>
            <p className="mt-4 max-w-xl leading-relaxed text-navy-foreground/75">
              {service.description}
            </p>

            <dl className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Amount", value: service.amount },
                { label: "Speed", value: service.speed },
                { label: "Term", value: service.term },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10"
                >
                  <dt className="text-xs font-bold uppercase tracking-wide text-navy-foreground/55">
                    {stat.label}
                  </dt>
                  <dd className="mt-1.5 font-extrabold leading-snug">{stat.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 text-sm font-bold">Best for</p>
            <ul className="mt-3 space-y-2">
              {service.bestFor.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-navy-foreground/85">
                  <Check aria-hidden strokeWidth={3} className="mt-0.5 size-4 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-extrabold text-gold-foreground transition-transform hover:-translate-y-0.5"
              >
                Learn about {service.title}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="/apply"
                className="inline-flex items-center rounded-full border-2 border-white/25 px-6 py-3 text-sm font-bold hover:bg-white/10"
              >
                Apply
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
