import { AlertTriangle, ChevronRight } from "lucide-react";

import { usd } from "@/components/site/CalculatorParts";
import { analyzeOffer } from "@/lib/offer-xray";

// A worked example, computed with the same math as the tool itself.
const EXAMPLE = {
  amount: 50000,
  fees: 1500,
  payback: 67500,
  payment: 562.5,
  frequency: "daily",
} as const;
const RESULT = analyzeOffer(EXAMPLE);

/**
 * Home page feature for the Offer X-Ray, as a dark full-width tile: a
 * centered pitch and the worked example presented like the product itself.
 */
export function OfferXRayTeaser() {
  return (
    <section className="bg-navy py-20 text-navy-foreground md:py-28">
      <div className="container-page text-center">
        <p className="text-base font-semibold text-gold">Offer X-Ray</p>
        <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-[-0.035em] md:text-6xl">
          Already have an offer? See what it really costs.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-snug text-navy-foreground/65 md:text-xl">
          Enter the numbers from any offer, ours or anyone else's. Real APR, total cost and warning
          signs, in seconds. Free, and nothing you type leaves your browser.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <a
            href="/calculators/offer-x-ray"
            className="rounded-full bg-gold px-7 py-3 text-base font-bold text-gold-foreground transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Open the Offer X-Ray
          </a>
          <a
            href="/calculators"
            className="group inline-flex items-center gap-0.5 text-base font-semibold text-gold/90 hover:text-gold"
          >
            All calculators
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <figure className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-[1.75rem] bg-white/[0.06] text-left ring-1 ring-white/10 md:mt-20">
          <figcaption className="flex items-center justify-between px-6 py-4 text-sm md:px-8">
            <span className="font-semibold">Example offer</span>
            <span className="text-navy-foreground/50">Illustration</span>
          </figcaption>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 px-6 py-6 text-sm sm:grid-cols-4 md:px-8">
            <Pair label="Funding amount" value={usd(EXAMPLE.amount)} />
            <Pair label="Fees taken out" value={usd(EXAMPLE.fees)} />
            <Pair label="Total payback" value={usd(EXAMPLE.payback)} />
            <Pair label="Daily payment" value={usd(EXAMPLE.payment, 2)} />
          </dl>
          <div className="flex flex-col gap-6 border-t border-white/10 px-6 py-7 sm:flex-row sm:items-center sm:justify-between md:px-8">
            <div>
              <p className="text-sm text-navy-foreground/55">Real APR</p>
              <p className="text-6xl font-bold tracking-[-0.04em] text-gold tabular-nums">
                {Math.round(RESULT.apr)}%
              </p>
            </div>
            <ul className="space-y-2 sm:max-w-xs">
              <li className="text-sm text-navy-foreground/80">
                Cost per $1 received:{" "}
                <span className="font-bold text-navy-foreground">
                  {usd(RESULT.costPerDollar, 2)}
                </span>
              </li>
              {RESULT.flags.map((f) => (
                <li key={f.text} className="flex items-start gap-2 text-sm text-navy-foreground/80">
                  <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
                  {f.text}
                </li>
              ))}
            </ul>
          </div>
        </figure>
      </div>
    </section>
  );
}

function Pair({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-navy-foreground/55">{label}</dt>
      <dd className="mt-1 text-base font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
