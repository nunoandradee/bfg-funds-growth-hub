import { Check, Headphones, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { usd } from "@/components/site/CalculatorParts";
import { loanPayment } from "@/lib/calculators";
import { analyzeOffer } from "@/lib/offer-xray";

// Example offers for $100,000, computed with the site's own math.
const TERM = loanPayment(100_000, 15, 36, "monthly");
const LINE = loanPayment(100_000, 24, 24, "monthly");
const MCA = analyzeOffer({
  amount: 100_000,
  fees: 2500,
  payback: 135_000,
  payment: 1125,
  frequency: "daily",
});
const OFFERS = [
  { name: "Term loan", detail: "36 months", cost: TERM.totalCost },
  { name: "Line of credit", detail: "24 months", cost: LINE.totalCost },
  {
    name: "Merchant cash advance",
    detail: `about ${Math.round(MCA.termMonths)} months`,
    cost: MCA.totalCost,
  },
].map((o, _, all) => ({ ...o, best: o.cost === Math.min(...all.map((x) => x.cost)) }));
const MAX_COST = Math.max(...OFFERS.map((o) => o.cost));

const view = { once: true, amount: 0.5 } as const;
const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Why owners choose BFG, shown rather than told: a bento of three tiles, each
 * with a small illustration that plays once as it comes into view. The text is
 * always rendered; only the decorative visuals animate, and reduced motion
 * shows them in their final state.
 */
export function WhyChooseUs() {
  const reduce = Boolean(useReducedMotion());

  return (
    <section className="bg-navy py-20 text-navy-foreground md:py-28">
      <div className="container-page">
        <h2 className="text-center text-balance-tight text-4xl font-extrabold md:text-5xl">
          See why business owners choose us.
        </h2>

        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
          {/* Honest comparisons */}
          <article className="flex flex-col rounded-[2rem] bg-white/[0.05] p-7 ring-1 ring-white/10 md:p-10 lg:col-span-2 lg:row-span-2">
            <h3 className="text-2xl font-extrabold md:text-3xl">Honest comparisons</h3>
            <p className="mt-3 max-w-lg leading-relaxed text-navy-foreground/75">
              Payment, total cost and term side by side. If a cheaper option fits your business, we
              say so, even when it takes longer.
            </p>

            <div className="mt-auto pt-8">
              <div className="flex items-center justify-between text-xs font-semibold text-navy-foreground/50">
                <span>Total cost on $100,000</span>
                <span>Example</span>
              </div>
              <ul className="mt-4 space-y-5">
                {OFFERS.map((offer, i) => (
                  <li key={offer.name}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-bold">
                        {offer.name}
                        <span className="ml-2 text-sm font-medium text-navy-foreground/50">
                          {offer.detail}
                        </span>
                      </span>
                      <span
                        className={`text-lg font-extrabold tabular-nums ${offer.best ? "text-gold" : ""}`}
                      >
                        {usd(offer.cost)}
                      </span>
                    </div>
                    <motion.div
                      initial={reduce ? false : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={view}
                      transition={{ duration: 1.1, delay: 0.15 + i * 0.25, ease }}
                      style={{ width: `${(offer.cost / MAX_COST) * 100}%` }}
                      className={`mt-2 h-3 origin-left rounded-full ${offer.best ? "bg-gold" : "bg-white/25"}`}
                    />
                  </li>
                ))}
              </ul>
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={view}
                transition={{ duration: 0.5, delay: 1.2, ease }}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-extrabold text-gold-foreground"
              >
                <Check aria-hidden strokeWidth={3} className="size-4" />
                We tell you which one costs less
              </motion.p>
            </div>
          </article>

          {/* One specialist */}
          <article className="rounded-[2rem] bg-white/[0.05] p-7 ring-1 ring-white/10">
            <h3 className="text-xl font-extrabold">One specialist</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-foreground/75">
              The same person from application to funding. No call center, no being passed around.
            </p>
            <ol className="relative mt-6 space-y-3">
              <motion.span
                aria-hidden
                initial={reduce ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={view}
                transition={{ duration: 1, delay: 0.2, ease }}
                className="absolute bottom-4 left-4 top-4 w-px origin-top bg-gold/60"
              />
              {["Application", "Offers", "Funding"].map((step, i) => (
                <motion.li
                  key={step}
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={view}
                  transition={{ duration: 0.45, delay: 0.25 + i * 0.25, ease }}
                  className="relative flex items-center gap-3"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gold text-gold-foreground">
                    <Headphones aria-hidden className="size-4" />
                  </span>
                  <span className="text-sm font-bold">{step}</span>
                  <span className="ml-auto text-xs text-navy-foreground/50">Same specialist</span>
                </motion.li>
              ))}
            </ol>
          </article>

          {/* No impact to look */}
          <article className="rounded-[2rem] bg-white/[0.05] p-7 ring-1 ring-white/10">
            <h3 className="text-xl font-extrabold">No impact to look</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-foreground/75">
              Seeing your options won't affect your credit score.
            </p>
            <div className="mt-5 flex items-end gap-5">
              <ScoreGauge still={reduce} />
              <p className="mb-2 inline-flex items-center gap-1.5 text-sm font-bold text-gold">
                <ShieldCheck aria-hidden className="size-4" />
                Score unchanged
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/** A half-circle gauge whose needle sweeps, then settles back where it started. */
function ScoreGauge({ still }: { still: boolean }) {
  return (
    <svg viewBox="0 0 120 70" className="w-32 shrink-0" aria-hidden>
      <path
        d="M10 62 A50 50 0 0 1 110 62"
        fill="none"
        stroke="rgb(255 255 255 / 0.15)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M10 62 A50 50 0 0 1 110 62"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="157"
        strokeDashoffset="45"
      />
      <motion.g
        style={{ transformOrigin: "60px 62px", transformBox: "view-box" }}
        initial={still ? false : { rotate: 20 }}
        whileInView={{ rotate: still ? 20 : [20, -55, 48, 20] }}
        viewport={view}
        transition={{ duration: 1.8, delay: 0.3, ease: "easeInOut" }}
      >
        <line
          x1="60"
          y1="62"
          x2="60"
          y2="22"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </motion.g>
      <circle cx="60" cy="62" r="5" fill="white" />
    </svg>
  );
}
