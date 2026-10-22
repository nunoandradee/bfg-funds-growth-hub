import { AlertTriangle, ArrowRight, ScanSearch } from "lucide-react";

import { usd } from "@/components/site/CalculatorParts";
import { CountUp } from "@/components/site/CountUp";
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

/** Home page feature for the Offer X-Ray: the pitch beside a real worked example. */
export function OfferXRayTeaser() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-navy px-3.5 py-1.5 text-xs font-bold text-navy-foreground">
            <ScanSearch aria-hidden className="size-4 text-gold" />
            Free BFG tool
          </span>
          <h2 className="mt-5 text-balance-tight text-4xl font-extrabold text-navy md:text-5xl">
            Already have an offer? X-ray it.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Enter the numbers from any offer, ours or anyone else's, and see the real APR, the total
            cost and the warning signs. Compare up to three side by side. Free, and nothing you type
            leaves your browser.
          </p>
          <a
            href="/calculators/offer-x-ray"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-navy-foreground transition-transform hover:-translate-y-0.5"
          >
            Open the Offer X-Ray
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <figure className="rounded-3xl border border-border bg-card shadow-lift">
          <figcaption className="flex items-center justify-between border-b border-border px-6 py-4 text-sm">
            <span className="font-extrabold text-navy">Example offer</span>
            <span className="text-muted-foreground">Illustration</span>
          </figcaption>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 px-6 py-5 text-sm">
            <Pair label="Funding amount" value={usd(EXAMPLE.amount)} />
            <Pair label="Fees taken out" value={usd(EXAMPLE.fees)} />
            <Pair label="Total payback" value={usd(EXAMPLE.payback)} />
            <Pair label="Daily payment" value={usd(EXAMPLE.payment, 2)} />
          </dl>
          <div className="rounded-b-3xl bg-navy px-6 py-6 text-navy-foreground">
            <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
              <div>
                <p className="text-sm text-navy-foreground/65">Real APR</p>
                <p className="text-5xl font-extrabold tracking-tight text-gold tabular-nums">
                  <CountUp to={Math.round(RESULT.apr)} suffix="%" duration={1600} />
                </p>
              </div>
              <div className="pb-1.5 text-sm">
                <p className="text-navy-foreground/65">Cost per $1 received</p>
                <p className="text-lg font-bold tabular-nums">{usd(RESULT.costPerDollar, 2)}</p>
              </div>
            </div>
            <ul className="mt-5 space-y-2">
              {RESULT.flags.map((f) => (
                <li key={f.text} className="flex items-start gap-2 text-sm text-navy-foreground/85">
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
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-base font-bold text-navy tabular-nums">{value}</dd>
    </div>
  );
}
