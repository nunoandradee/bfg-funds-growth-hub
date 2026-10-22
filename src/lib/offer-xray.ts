// Offer X-Ray: reads a funding offer the way it is written in the contract
// (amount funded, total payback, payment and fees) and works out what it
// really costs. Pure functions only; estimates, never advice.

import { impliedApr, PERIODS_PER_YEAR, type Frequency } from "./calculators";

export type OfferInput = {
  /** Funding amount before fees (the "purchase price" on an MCA contract). */
  amount: number;
  /** Fees taken out of the funding: origination, underwriting, UCC, etc. */
  fees: number;
  /** Total you pay back (the "purchased amount" or "RTR" on an MCA contract). */
  payback: number;
  /** Each scheduled payment. */
  payment: number;
  frequency: Exclude<Frequency, "monthly"> | "monthly";
};

export type OfferFlag = { tone: "warn" | "risk"; text: string };

export type OfferAnalysis = {
  valid: boolean;
  netFunded: number;
  totalCost: number;
  factorRate: number;
  payments: number;
  termMonths: number;
  apr: number;
  /** Dollars of cost for every dollar actually received. */
  costPerDollar: number;
  /** Payment load per month, for comparing with revenue. */
  monthlyPayment: number;
  /** Share of monthly revenue the payments take (0 when revenue is unknown). */
  revenueShare: number;
  flags: OfferFlag[];
};

const pct = (n: number) => `${Math.round(n * 100)}%`;

export function analyzeOffer(input: OfferInput, monthlyRevenue = 0): OfferAnalysis {
  const amount = Math.max(0, input.amount);
  const fees = Math.min(Math.max(0, input.fees), amount);
  const payback = Math.max(0, input.payback);
  const payment = Math.max(0, input.payment);
  const netFunded = amount - fees;
  const valid = amount > 0 && payback > amount && payment > 0 && payment <= payback;

  const perYear = PERIODS_PER_YEAR[input.frequency];
  const payments = valid ? payback / payment : 0;
  const termMonths = valid ? (payments / perYear) * 12 : 0;
  // Fractional payment counts are rounded up: the last payment is partial.
  const apr = valid
    ? impliedApr(netFunded, payment, Math.max(1, Math.round(payments)), input.frequency)
    : 0;
  const totalCost = valid ? payback - netFunded : 0;
  const monthlyPayment = valid ? (payment * perYear) / 12 : 0;
  const revenueShare = valid && monthlyRevenue > 0 ? monthlyPayment / monthlyRevenue : 0;

  const flags: OfferFlag[] = [];
  if (valid) {
    const factorRate = payback / amount;
    if (apr >= 100)
      flags.push({ tone: "risk", text: `Triple-digit APR (about ${Math.round(apr)}%).` });
    else if (apr >= 60)
      flags.push({ tone: "warn", text: `High APR (about ${Math.round(apr)}%). Worth comparing.` });
    if (factorRate >= 1.45)
      flags.push({ tone: "warn", text: `High factor rate (${factorRate.toFixed(2)}).` });
    if (amount > 0 && fees / amount >= 0.05)
      flags.push({
        tone: "warn",
        text: `Fees take ${pct(fees / amount)} of the funding before you receive it.`,
      });
    if (termMonths < 4)
      flags.push({
        tone: "warn",
        text: "Very short term: the whole cost is paid back in under four months.",
      });
    if (revenueShare >= 0.25)
      flags.push({
        tone: "risk",
        text: `Payments take ${pct(revenueShare)} of your monthly revenue.`,
      });
    else if (revenueShare >= 0.15)
      flags.push({
        tone: "warn",
        text: `Payments take ${pct(revenueShare)} of your monthly revenue.`,
      });
  }

  return {
    valid,
    netFunded,
    totalCost,
    factorRate: valid ? payback / amount : 0,
    payments,
    termMonths,
    apr,
    costPerDollar: valid && netFunded > 0 ? totalCost / netFunded : 0,
    monthlyPayment,
    revenueShare,
    flags,
  };
}

/** Index of the offer with the lowest APR and of the one with the lowest total cost. */
export function bestOffers(results: OfferAnalysis[]): { lowestApr: number; lowestCost: number } {
  let lowestApr = -1;
  let lowestCost = -1;
  results.forEach((r, i) => {
    if (!r.valid) return;
    if (lowestApr < 0 || r.apr < results[lowestApr]!.apr) lowestApr = i;
    if (lowestCost < 0 || r.totalCost < results[lowestCost]!.totalCost) lowestCost = i;
  });
  return { lowestApr, lowestCost };
}
