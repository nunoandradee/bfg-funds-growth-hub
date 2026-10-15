// Estimate math for the public calculators. Pure functions only.

export type Frequency = "daily" | "weekly" | "monthly";

/** Payments per year: business days, weeks or months. */
export const PERIODS_PER_YEAR: Record<Frequency, number> = { daily: 252, weekly: 52, monthly: 12 };

/** Number of payments for a term given in months. */
export function paymentCount(termMonths: number, frequency: Frequency): number {
  return Math.max(1, Math.round((termMonths / 12) * PERIODS_PER_YEAR[frequency]));
}

/** Amortized loan: level payment for an annual rate (APR, %) over a term. */
export function loanPayment(
  amount: number,
  aprPercent: number,
  termMonths: number,
  frequency: Frequency,
) {
  const n = paymentCount(termMonths, frequency);
  const r = aprPercent / 100 / PERIODS_PER_YEAR[frequency];
  const payment = r === 0 ? amount / n : (amount * r) / (1 - Math.pow(1 + r, -n));
  const totalPaid = payment * n;
  return { payment, payments: n, totalPaid, totalCost: totalPaid - amount };
}

/**
 * Annual rate (APR, %) that makes `payments` level payments of `payment`
 * repay `netFunded`. Solved by bisection on the periodic rate.
 */
export function impliedApr(
  netFunded: number,
  payment: number,
  payments: number,
  frequency: Frequency,
): number {
  if (netFunded <= 0 || payment <= 0 || payments <= 0) return 0;
  if (payment * payments <= netFunded) return 0;
  const pv = (r: number) => (payment * (1 - Math.pow(1 + r, -payments))) / r;
  let lo = 1e-9;
  let hi = 1;
  while (pv(hi) > netFunded && hi < 1e6) hi *= 2;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (pv(mid) > netFunded) lo = mid;
    else hi = mid;
  }
  return ((lo + hi) / 2) * PERIODS_PER_YEAR[frequency] * 100;
}

/** Factor-rate product (MCA, revenue-based): total payback, payment and equivalent APR. */
export function factorRateCost(input: {
  amount: number;
  factorRate: number;
  termMonths: number;
  frequency: Frequency;
  /** Fees deducted from the funding, in dollars. */
  fees?: number;
}) {
  const fees = Math.max(0, input.fees ?? 0);
  const totalPayback = input.amount * input.factorRate;
  const payments = paymentCount(input.termMonths, input.frequency);
  const payment = totalPayback / payments;
  const netFunded = input.amount - fees;
  return {
    totalPayback,
    totalCost: totalPayback - netFunded,
    payments,
    payment,
    netFunded,
    apr: impliedApr(netFunded, payment, payments, input.frequency),
  };
}

export type CreditBand = "under-550" | "550-619" | "620-679" | "680-plus";
export type TimeInBusiness = "under-6" | "6-12" | "12-24" | "24-plus";

export type FundingEstimate = { product: string; slug: string; low: number; high: number };

/**
 * Rough market rules of thumb for what providers often offer, based on
 * average monthly revenue, time in business and credit. Indicative only:
 * every provider prices each file after its own review.
 */
export function estimateFunding(input: {
  monthlyRevenue: number;
  timeInBusiness: TimeInBusiness;
  credit: CreditBand;
}): FundingEstimate[] {
  const rev = Math.max(0, input.monthlyRevenue);
  const months = { "under-6": 3, "6-12": 9, "12-24": 18, "24-plus": 36 }[input.timeInBusiness];
  const score = { "under-550": 520, "550-619": 590, "620-679": 650, "680-plus": 700 }[input.credit];
  const out: FundingEstimate[] = [];
  const round = (n: number) => Math.round(n / 1000) * 1000;
  const push = (product: string, slug: string, low: number, high: number) => {
    if (high >= 5000) out.push({ product, slug, low: round(low), high: round(high) });
  };

  if (rev < 10000 || months < 4) return out;

  push("Revenue-based financing / cash advance", "revenue-based-financing", rev * 0.5, rev * 1.5);
  if (months >= 6 && rev >= 15000 && score >= 500)
    push("Working capital", "working-capital", rev * 0.75, rev * 1.75);
  if (months >= 6 && score >= 550)
    push("Business line of credit", "business-line-of-credit", rev * 0.5, rev * 1.25);
  if (months >= 12 && rev >= 25000 && score >= 620)
    push("Term loan", "term-loan", rev * 1, rev * 3);
  if (months >= 24 && rev >= 25000 && score >= 650)
    push("SBA loan", "sba-loans", rev * 2, Math.min(rev * 10, 5_000_000));
  return out;
}
