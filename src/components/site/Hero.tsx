import { Fragment, useRef, useState } from "react";
import { ArrowRight, ChevronDown, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { ApplyScreen, PhoneShell, STAGE_BG } from "@/components/site/ScrollStory";

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

const LINE_ONE = ["Funding", "for", "the", "business"];
const LINE_TWO = ["you've", "built."];

// A cinematic opening on the same dark stage as the "Apply. Compare. Get
// funded." scene below: a warm sunrise at the top, a centered headline, the
// amount picker as one glass pill, and the phone from that scene rising from
// the bottom edge. The entrance runs in CSS (styles.css, .hero-*) so the server
// HTML is already the finished hero; Motion only moves things on scroll.
export function Hero() {
  const [amount, setAmount] = useState(100_000);
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0]);
  const sunScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.25]);

  let word = 0;
  const reveal = (w: string, gold = false) => (
    <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      <span
        className={`hero-word inline-block ${gold ? "text-gold" : ""}`}
        style={{ animationDelay: `${150 + word++ * 70}ms` }}
      >
        {w}
      </span>
    </span>
  );

  return (
    <section
      ref={ref}
      id="top"
      data-motion
      data-dark-band
      className={`relative isolate overflow-hidden ${STAGE_BG} text-navy-foreground`}
    >
      {/* Sunrise: a warm glow and a bright horizon line just above the fold. */}
      <motion.div
        aria-hidden
        style={{ scale: sunScale }}
        className="pointer-events-none absolute -top-[42%] left-1/2 -z-10 h-[85%] w-[140%] -translate-x-1/2"
      >
        <div className="hero-sun absolute inset-0 rounded-[50%] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--color-gold)_55%,transparent)_0%,color-mix(in_oklch,var(--color-gold)_14%,transparent)_45%,transparent_70%)] blur-2xl" />
        <div className="absolute inset-x-[18%] bottom-[18%] h-[60%] rounded-[50%] border-b-2 border-[oklch(0.95_0.06_85/0.55)] blur-[1.5px]" />
      </motion.div>

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="container-page relative pt-20 text-center md:pt-28"
      >
        <p
          className="hero-fade mx-auto inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-1.5 text-sm font-semibold text-navy-foreground/80 ring-1 ring-white/10 backdrop-blur"
          style={{ animationDelay: "60ms" }}
        >
          Business funding from $10K to $2M
        </p>
        <h1 className="mx-auto mt-7 max-w-5xl text-[2.7rem] font-extrabold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-[5.4rem]">
          <span className="block">
            {LINE_ONE.map((w, i) => (
              <Fragment key={w}>
                {i > 0 && " "}
                {reveal(w)}
              </Fragment>
            ))}
          </span>
          <span className="block">
            {LINE_TWO.map((w, i) => (
              <Fragment key={w}>
                {i > 0 && " "}
                {reveal(w, true)}
              </Fragment>
            ))}
          </span>
        </h1>
        <p
          className="hero-fade mx-auto mt-6 max-w-xl text-lg leading-relaxed text-navy-foreground/65 md:text-xl"
          style={{ animationDelay: "600ms" }}
        >
          One application, one specialist, and real offers to compare.
        </p>

        <form
          action="/apply"
          method="get"
          className="hero-fade mx-auto mt-9 max-w-lg"
          style={{ animationDelay: "720ms" }}
        >
          <label htmlFor="hero-amount" className="sr-only">
            How much do you need?
          </label>
          <div className="flex flex-col gap-2 rounded-[1.75rem] bg-white/[0.07] p-2 ring-1 ring-white/15 backdrop-blur-md sm:flex-row sm:rounded-full">
            <div className="relative flex-1">
              <select
                id="hero-amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full appearance-none rounded-full bg-transparent py-3.5 pl-5 pr-11 text-base font-bold text-navy-foreground outline-none focus-visible:ring-2 focus-visible:ring-gold [&>option]:text-navy"
              >
                {AMOUNTS.map((a) => (
                  <option key={a.value} value={a.value}>
                    {a.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-navy-foreground/60"
              />
            </div>
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-base font-extrabold text-gold-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              See my options
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-navy-foreground/55">
            <ShieldCheck aria-hidden className="size-4 text-gold" />
            Checking your options won't affect your credit score.
          </p>
        </form>
      </motion.div>

      {/* The phone from the scene below, rising from the bottom edge. */}
      <motion.div
        style={{ y: phoneY }}
        className="relative mx-auto mt-14 w-[17rem] sm:w-[19rem] md:mt-16"
      >
        <div className="pointer-events-none absolute -inset-x-24 -top-10 bottom-0 -z-10 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--color-gold)_30%,transparent),transparent)] blur-2xl" />
        {/* Only the top of the phone shows; the section edge crops the rest. */}
        <div className="hero-phone-in -mb-[95%]">
          <PhoneShell className="aspect-[9/19]">
            <div className="absolute inset-0 px-5 pt-12" aria-hidden>
              <ApplyScreen />
            </div>
          </PhoneShell>
        </div>
      </motion.div>
    </section>
  );
}
