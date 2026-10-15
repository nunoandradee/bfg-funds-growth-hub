import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import {
  CalculatorShell,
  FREQUENCY_OPTIONS,
  NumberField,
  ResultRow,
  SelectField,
  usd,
} from "@/components/site/CalculatorParts";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { CtaBand, Disclaimer, FaqList, PageHero } from "@/components/site/PageParts";
import { factorRateCost, type Frequency } from "@/lib/calculators";
import { breadcrumbLd, faqLd, pageHead } from "@/lib/seo";

const PATH = "/calculators/merchant-cash-advance-calculator";
const FAQS = [
  {
    q: "What is a factor rate?",
    a: "A multiplier that sets the total payback. At a 1.30 factor rate, a $50,000 advance is repaid as $65,000. The cost is fixed up front and usually doesn't fall if you pay early.",
  },
  {
    q: "How do you convert a factor rate to APR?",
    a: "Find the annual rate at which the scheduled payments exactly repay the amount you actually received (after fees). Because payments start right away and the term is short, the APR is much higher than the factor rate suggests.",
  },
  {
    q: "What factor rates are typical?",
    a: "Market factor rates commonly range from about 1.10 to 1.50, depending on revenue, time in business, credit and existing debt. Every provider prices each file individually.",
  },
];

export const Route = createFileRoute("/calculators/merchant-cash-advance-calculator")({
  head: () =>
    pageHead({
      title: "MCA & Factor Rate Calculator: Factor Rate to APR | BFG Funds",
      description:
        "Free merchant cash advance calculator. Convert a factor rate into total payback, daily or weekly payment and an estimated APR.",
      path: PATH,
      jsonLd: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Calculators", path: "/calculators" },
          { name: "MCA & Factor Rate Calculator", path: PATH },
        ]),
        faqLd(FAQS),
      ],
    }),
  component: McaCalculator,
});

function McaCalculator() {
  const [amount, setAmount] = useState(50000);
  const [factor, setFactor] = useState(1.3);
  const [term, setTerm] = useState(9);
  const [frequency, setFrequency] = useState<Frequency>("daily");
  const [fees, setFees] = useState(0);

  const r = useMemo(
    () => factorRateCost({ amount, factorRate: factor, termMonths: term, frequency, fees }),
    [amount, factor, term, frequency, fees],
  );
  const label =
    frequency === "daily"
      ? "Daily payment"
      : frequency === "weekly"
        ? "Weekly payment"
        : "Monthly payment";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          crumbs={[
            { name: "Home", to: "/" },
            { name: "Calculators", to: "/calculators" },
            { name: "MCA & Factor Rate Calculator" },
          ]}
          eyebrow="Calculator"
          title="Merchant cash advance & factor rate calculator"
          intro="See the total payback, payment and equivalent APR of any factor-rate offer — so you can compare it fairly with a loan."
        />
        <section className="py-14 md:py-20">
          <div className="container-page">
            <CalculatorShell
              inputs={
                <>
                  <NumberField
                    id="amount"
                    label="Funding amount"
                    prefix="$"
                    value={amount}
                    onChange={setAmount}
                    min={1000}
                    step={1000}
                  />
                  <NumberField
                    id="factor"
                    label="Factor rate"
                    value={factor}
                    onChange={setFactor}
                    min={1}
                    max={2}
                    step={0.01}
                    hint="Example: 1.30 means $1.30 repaid per $1 funded."
                  />
                  <NumberField
                    id="term"
                    label="Estimated term"
                    suffix="months"
                    value={term}
                    onChange={setTerm}
                    min={1}
                    max={24}
                  />
                  <SelectField
                    id="frequency"
                    label="Payment frequency"
                    value={frequency}
                    onChange={setFrequency}
                    options={FREQUENCY_OPTIONS}
                  />
                  <NumberField
                    id="fees"
                    label="Fees deducted from funding (optional)"
                    prefix="$"
                    value={fees}
                    onChange={setFees}
                    min={0}
                    step={100}
                  />
                </>
              }
              results={
                <>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Estimate</p>
                  <dl className="mt-4">
                    <ResultRow label="Estimated APR" value={`${r.apr.toFixed(1)}%`} strong />
                    <ResultRow label={label} value={usd(r.payment, 2)} />
                    <ResultRow label="Total payback" value={usd(r.totalPayback)} />
                    <ResultRow label="Cost of funding" value={usd(r.totalCost)} />
                    <ResultRow label="You receive" value={usd(r.netFunded)} />
                  </dl>
                  <a
                    href="/apply"
                    className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gold px-6 py-3.5 text-sm font-extrabold text-gold-foreground"
                  >
                    Check for a lower-cost option
                  </a>
                </>
              }
            />
            <Disclaimer className="mt-6 max-w-3xl" />
            <p className="mt-2 max-w-3xl text-xs text-muted-foreground">
              Assumes equal fixed payments over the estimated term (252 business days per year for
              daily). Revenue-based remittances vary with sales, which changes the actual term and
              APR.{" "}
              <Link
                to="/resources/$slug"
                params={{ slug: "factor-rate-vs-apr" }}
                className="font-semibold text-cobalt underline"
              >
                Read: factor rate vs. APR
              </Link>
            </p>
          </div>
        </section>
        <FaqList faqs={FAQS} />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
