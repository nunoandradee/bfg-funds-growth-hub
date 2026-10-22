import { useMemo, useState } from "react";
import { AlertTriangle, ArrowRight, CircleCheck, Plus, Trophy, X } from "lucide-react";

import {
  FREQUENCY_OPTIONS,
  NumberField,
  SelectField,
  usd,
} from "@/components/site/CalculatorParts";
import type { Frequency } from "@/lib/calculators";
import { analyzeOffer, bestOffers, type OfferInput } from "@/lib/offer-xray";

type Offer = OfferInput & { id: number };

const MAX_OFFERS = 3;
const NAMES = ["Offer A", "Offer B", "Offer C"];

const blank = (id: number): Offer => ({
  id,
  amount: 50000,
  fees: 1500,
  payback: 67500,
  payment: 562.5,
  frequency: "daily",
});

/**
 * Paste the numbers from up to three offers and see what each one really
 * costs, side by side, with plain-language warnings.
 */
export function OfferXRay() {
  const [offers, setOffers] = useState<Offer[]>([blank(0)]);
  const [revenue, setRevenue] = useState(60000);
  const [nextId, setNextId] = useState(1);

  const results = useMemo(() => offers.map((o) => analyzeOffer(o, revenue)), [offers, revenue]);
  const best = bestOffers(results);
  const comparing = results.filter((r) => r.valid).length > 1;

  const update = (id: number, patch: Partial<OfferInput>) =>
    setOffers((list) => list.map((o) => (o.id === id ? { ...o, ...patch } : o)));
  const add = () => {
    setOffers((list) => [
      ...list,
      { ...blank(nextId), payback: 64000, payment: 1230, frequency: "weekly", fees: 0 },
    ]);
    setNextId((n) => n + 1);
  };
  const remove = (id: number) => setOffers((list) => list.filter((o) => o.id !== id));

  return (
    <div className="space-y-6">
      <div className="grid items-end gap-5 rounded-3xl bg-surface p-6 md:grid-cols-[1fr_minmax(0,22rem)] md:p-8">
        <div>
          <p className="text-lg font-extrabold text-navy">Enter the numbers from each offer</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            You'll find them on the offer or contract. The guide below shows where.
          </p>
        </div>
        <div>
          <NumberField
            id="xray-revenue"
            label="Your average monthly revenue (optional)"
            prefix="$"
            value={revenue}
            onChange={setRevenue}
            min={0}
            hint="Used only to show how much of your revenue the payments would take."
          />
        </div>
      </div>

      <div
        className={`grid gap-6 ${offers.length > 1 ? "lg:grid-cols-2 xl:grid-cols-3" : "lg:grid-cols-2"}`}
      >
        {offers.map((offer, i) => {
          const r = results[i]!;
          const isBest = comparing && (best.lowestApr === i || best.lowestCost === i);
          return (
            <article
              key={offer.id}
              className={`flex flex-col overflow-hidden rounded-3xl border bg-card shadow-card ${
                isBest ? "border-gold ring-2 ring-gold/40" : "border-border"
              }`}
            >
              <header className="flex items-center justify-between gap-3 border-b border-border px-6 py-4">
                <h3 className="text-lg font-extrabold text-navy">{NAMES[i]}</h3>
                {offers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(offer.id)}
                    className="rounded-full p-1.5 text-muted-foreground hover:bg-surface hover:text-navy"
                    aria-label={`Remove ${NAMES[i]}`}
                  >
                    <X className="size-4" />
                  </button>
                )}
              </header>

              <div className="grid gap-4 p-6 sm:grid-cols-2">
                <NumberField
                  id={`amount-${offer.id}`}
                  label="Funding amount"
                  prefix="$"
                  value={offer.amount}
                  onChange={(v) => update(offer.id, { amount: v })}
                  min={0}
                  hint="Called the purchase price on an MCA."
                />
                <NumberField
                  id={`fees-${offer.id}`}
                  label="Fees taken out"
                  prefix="$"
                  value={offer.fees}
                  onChange={(v) => update(offer.id, { fees: v })}
                  min={0}
                  hint="Origination, underwriting, UCC and similar."
                />
                <NumberField
                  id={`payback-${offer.id}`}
                  label="Total payback"
                  prefix="$"
                  value={offer.payback}
                  onChange={(v) => update(offer.id, { payback: v })}
                  min={0}
                  hint="Called the purchased amount or RTR on an MCA."
                />
                <NumberField
                  id={`payment-${offer.id}`}
                  label="Each payment"
                  prefix="$"
                  value={offer.payment}
                  onChange={(v) => update(offer.id, { payment: v })}
                  min={0}
                />
                <div className="sm:col-span-2">
                  <SelectField
                    id={`frequency-${offer.id}`}
                    label="Payment frequency"
                    value={offer.frequency}
                    onChange={(v: Frequency) => update(offer.id, { frequency: v })}
                    options={FREQUENCY_OPTIONS}
                  />
                </div>
              </div>

              <div className="mt-auto bg-navy p-6 text-navy-foreground" aria-live="polite">
                {r.valid ? (
                  <>
                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <p className="text-sm text-navy-foreground/65">Estimated APR</p>
                        <p className="text-4xl font-extrabold tracking-tight text-gold tabular-nums">
                          {r.apr.toFixed(1)}%
                        </p>
                      </div>
                      {comparing && (best.lowestApr === i || best.lowestCost === i) && (
                        <p className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-extrabold text-gold-foreground">
                          <Trophy className="size-3.5" />
                          {best.lowestApr === i && best.lowestCost === i
                            ? "Cheapest overall"
                            : best.lowestApr === i
                              ? "Lowest APR"
                              : "Lowest total cost"}
                        </p>
                      )}
                    </div>
                    <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                      <Stat label="You actually receive" value={usd(r.netFunded)} />
                      <Stat label="Total cost" value={usd(r.totalCost)} />
                      <Stat label="Cost per $1 received" value={usd(r.costPerDollar, 2)} />
                      <Stat label="Factor rate" value={r.factorRate.toFixed(2)} />
                      <Stat label="Paid off in about" value={`${r.termMonths.toFixed(1)} months`} />
                      <Stat label="Payments per month" value={usd(r.monthlyPayment)} />
                    </dl>
                    <ul className="mt-5 space-y-2">
                      {r.flags.length === 0 ? (
                        <li className="flex items-start gap-2 text-sm text-navy-foreground/80">
                          <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
                          No red flags in these numbers. Still compare it with other options.
                        </li>
                      ) : (
                        r.flags.map((f) => (
                          <li
                            key={f.text}
                            className={`flex items-start gap-2 text-sm ${
                              f.tone === "risk"
                                ? "text-[oklch(0.82_0.1_40)]"
                                : "text-navy-foreground/85"
                            }`}
                          >
                            <AlertTriangle
                              aria-hidden
                              className="mt-0.5 size-4 shrink-0 text-gold"
                            />
                            {f.text}
                          </li>
                        ))
                      )}
                    </ul>
                  </>
                ) : (
                  <p className="text-sm text-navy-foreground/75">
                    Enter a total payback above the funding amount and a payment amount to see the
                    real cost.
                  </p>
                )}
              </div>
            </article>
          );
        })}

        {offers.length < MAX_OFFERS && (
          <button
            type="button"
            onClick={add}
            className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-border p-8 text-navy transition-colors hover:border-cobalt/50 hover:bg-surface"
          >
            <span className="grid size-12 place-items-center rounded-full bg-navy text-navy-foreground">
              <Plus className="size-5" />
            </span>
            <span className="text-base font-extrabold">Compare another offer</span>
            <span className="text-sm text-muted-foreground">Up to {MAX_OFFERS} side by side</span>
          </button>
        )}
      </div>

      <div className="flex flex-col items-start justify-between gap-5 rounded-3xl bg-surface p-6 md:flex-row md:items-center md:p-8">
        <div className="max-w-2xl">
          <p className="text-lg font-extrabold text-navy">Want a second opinion on a real offer?</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Send it to a specialist. We'll tell you if it's fair for your business and whether a
            lower-cost option is likely available. No obligation.
          </p>
        </div>
        <a
          href="/apply"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-extrabold text-gold-foreground shadow-lift transition-transform hover:-translate-y-0.5"
        >
          Get a second opinion
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-navy-foreground/60">{label}</dt>
      <dd className="mt-0.5 text-base font-bold tabular-nums">{value}</dd>
    </div>
  );
}
