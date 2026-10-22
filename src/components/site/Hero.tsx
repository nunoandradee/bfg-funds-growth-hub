import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import heroOwners from "@/assets/hero-owners.jpg";
import { SERVICES } from "@/data/site";

const AMOUNTS = [
  { value: 10_000, label: "$10,000" },
  { value: 25_000, label: "$25,000" },
  { value: 50_000, label: "$50,000" },
  { value: 100_000, label: "$100,000" },
  { value: 250_000, label: "$250,000" },
  { value: 500_000, label: "$500,000" },
  { value: 1_000_000, label: "$1,000,000" },
  { value: 2_000_000, label: "$2,000,000" },
];

const HEADLINE = ["Funding", "for", "the", "business", "you've", "built."];
const ACCENT_FROM = 4; // "you've built." in gold

// The entrance runs in CSS (styles.css, .hero-*) so the server HTML is the
// finished hero: nothing waits for JavaScript and search engines see it all.
// Motion only adds the scroll parallax and the rotating product name.
export function Hero() {
  const [amount, setAmount] = useState(100_000);
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);

  return (
    <section
      ref={ref}
      id="top"
      data-motion
      className="grain relative isolate overflow-hidden bg-navy text-navy-foreground"
    >
      <div aria-hidden className="hero-orb hero-orb-a" />
      <div aria-hidden className="hero-orb hero-orb-b" />

      <div className="container-page relative z-[1] grid items-center gap-12 pb-16 pt-12 md:pb-20 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-24 lg:pt-20">
        <div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.05] tracking-[-0.035em] [text-wrap:balance] sm:text-5xl lg:text-[4.1rem]">
            {HEADLINE.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden pb-1 align-bottom">
                <span
                  className={`hero-word inline-block ${i >= ACCENT_FROM ? "text-gold" : ""}`}
                  style={{ animationDelay: `${120 + i * 70}ms` }}
                >
                  {word}
                </span>
                {i < HEADLINE.length - 1 && " "}
              </span>
            ))}
          </h1>
          <p
            className="hero-fade mt-6 max-w-xl text-lg leading-relaxed text-navy-foreground/75"
            style={{ animationDelay: "560ms" }}
          >
            From $10K to $2M across eight funding products. One application, one specialist, and
            real offers to compare.
          </p>

          <form
            action="/apply"
            method="get"
            className="hero-fade mt-9 max-w-xl"
            style={{ animationDelay: "680ms" }}
          >
            <label htmlFor="hero-amount" className="text-sm font-bold text-navy-foreground">
              How much do you need?
            </label>
            <div className="mt-2.5 flex flex-col gap-3 rounded-2xl bg-navy-foreground/[0.07] p-2 ring-1 ring-navy-foreground/15 sm:flex-row">
              <div className="relative flex-1">
                <select
                  id="hero-amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="h-14 w-full appearance-none rounded-xl bg-background pl-4 pr-11 text-base font-bold text-navy outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {AMOUNTS.map((a) => (
                    <option key={a.value} value={a.value}>
                      {a.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-navy/60"
                />
              </div>
              <button
                type="submit"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-gold px-7 text-base font-extrabold text-gold-foreground shadow-lift transition-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                See my options
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <p className="mt-3 flex items-center gap-2 text-sm text-navy-foreground/65">
              <ShieldCheck aria-hidden className="size-4 text-gold" />
              Checking your options won't affect your credit score.
            </p>
          </form>
        </div>

        <div className="relative">
          <motion.figure style={{ y: photoY }} className="hero-photo relative">
            <img
              src={heroOwners}
              alt="Two café owners smiling behind their counter"
              width={1600}
              height={900}
              fetchPriority="high"
              className="aspect-[4/3] w-full rounded-3xl object-cover object-center shadow-lift lg:aspect-[5/4]"
            />
          </motion.figure>
          <motion.div
            style={{ y: cardY }}
            className="hero-card absolute -bottom-8 left-4 right-4 sm:-left-6 sm:right-auto sm:w-80"
          >
            <ProductTicker />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Cycles through the eight funding products we compare for each client. */
function ProductTicker() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SERVICES.length), 2200);
    return () => window.clearInterval(id);
  }, [reduce]);

  const service = SERVICES[index]!;
  return (
    <div className="rounded-2xl bg-navy/70 p-5 text-navy-foreground shadow-lift ring-1 ring-white/15 backdrop-blur-xl">
      <p className="text-xs font-bold text-navy-foreground/60">We compare for you</p>
      <div className="relative mt-1 h-8 overflow-hidden" aria-live="off">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={service.slug}
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -28, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="absolute inset-x-0 text-xl font-extrabold"
          >
            {service.title}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="mt-4 flex gap-1.5" aria-hidden>
        {SERVICES.map((s, i) => (
          <span
            key={s.slug}
            className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
              i <= index ? "bg-gold" : "bg-white/15"
            }`}
          />
        ))}
      </div>
      <p className="mt-3 text-xs text-navy-foreground/60">
        {SERVICES.length} products, one application.
      </p>
    </div>
  );
}
