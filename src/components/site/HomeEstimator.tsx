import { useMemo, useState } from "react";
import { ArrowRight, Calculator } from "lucide-react";

import { loanPayment } from "@/lib/calculators";

// A quick, honest estimate on the home page: pick an amount and a term, see a
// monthly payment range across typical market rates. Never an offer.
const LOW_APR = 12;
const HIGH_APR = 35;
const TERMS = [6, 12, 18, 24, 36];
const MIN = 10_000;
const MAX = 500_000;
const STEP = 5_000;

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function HomeEstimator() {
  const [amount, setAmount] = useState(100_000);
  const [term, setTerm] = useState(12);

  const { low, high } = useMemo(
    () => ({
      low: loanPayment(amount, LOW_APR, term, "monthly"),
      high: loanPayment(amount, HIGH_APR, term, "monthly"),
    }),
    [amount, term],
  );
  const fill = ((amount - MIN) / (MAX - MIN)) * 100;

  return (
    <section className="py-16 md:py-20" aria-labelledby="estimator-title">
      <div className="container-page">
        <div className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-card lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 md:p-10">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cobalt">
              <Calculator className="size-4" />
              Quick estimate
            </span>
            <h2
              id="estimator-title"
              className="mt-3 text-balance-tight text-3xl font-extrabold text-navy md:text-4xl"
            >
              What could your payment look like?
            </h2>

            <div className="mt-8">
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor="estimator-amount" className="text-sm font-bold text-navy">
                  Funding amount
                </label>
                <span className="text-3xl font-extrabold text-navy tabular-nums">
                  {usd(amount)}
                </span>
              </div>
              <input
                id="estimator-amount"
                type="range"
                min={MIN}
                max={MAX}
                step={STEP}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="estimator-range mt-4 h-2 w-full cursor-pointer appearance-none rounded-full"
                style={{
                  background: `linear-gradient(to right, var(--color-cobalt) ${fill}%, var(--color-border) ${fill}%)`,
                }}
              />
              <div className="mt-2 flex justify-between text-xs font-semibold text-muted-foreground">
                <span>{usd(MIN)}</span>
                <span>{usd(MAX)}+</span>
              </div>
            </div>

            <fieldset className="mt-8">
              <legend className="text-sm font-bold text-navy">Term</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {TERMS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={term === t}
                    onClick={() => setTerm(t)}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                      term === t
                        ? "bg-navy text-navy-foreground shadow-card"
                        : "bg-surface text-navy hover:bg-border"
                    }`}
                  >
                    {t} months
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div
            className="flex flex-col justify-between gap-8 bg-navy p-6 text-navy-foreground md:p-10"
            aria-live="polite"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                Estimated monthly payment
              </p>
              <p className="mt-3 text-4xl font-extrabold tabular-nums md:text-5xl">
                {usd(low.payment)} – {usd(high.payment)}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-navy-foreground/70">
                Over {term} months at typical market rates of {LOW_APR}%–{HIGH_APR}% APR. Your real
                offer depends on your revenue, time in business and credit — checking it won't
                affect your score.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`/apply?amount=${amount}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-extrabold text-gold-foreground shadow-lift transition-transform hover:-translate-y-0.5"
              >
                See my real options
                <ArrowRight className="size-4" />
              </a>
              <a
                href="/calculators"
                className="inline-flex items-center justify-center rounded-full border border-navy-foreground/30 px-6 py-3.5 text-sm font-bold hover:bg-navy-foreground/10"
              >
                More calculators
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
