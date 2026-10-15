import { createFileRoute } from "@tanstack/react-router";
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
import { loanPayment, type Frequency } from "@/lib/calculators";
import { breadcrumbLd, faqLd, pageHead } from "@/lib/seo";

const PATH = "/calculators/business-loan-calculator";
const FAQS = [
  {
    q: "How is a business loan payment calculated?",
    a: "Most term loans are amortized: each payment covers that period's interest plus part of the principal, so the payment stays the same while the balance falls. The payment depends on the amount, the rate and the number of payments.",
  },
  {
    q: "What rate should I enter?",
    a: "Use the APR from an offer if you have one. Bank and SBA loans are usually in the single digits to low teens; online term loans and lines of credit commonly range from the low teens to over 40% APR depending on your profile.",
  },
  {
    q: "Why does a weekly or daily schedule change the total cost?",
    a: "More frequent payments reduce the balance faster, which slightly lowers total interest at the same APR — but the payments come out of your account more often, which matters for cash flow.",
  },
];

export const Route = createFileRoute("/calculators/business-loan-calculator")({
  head: () =>
    pageHead({
      title: "Business Loan Calculator: Estimate Payments & Total Cost | BFG Funds",
      description:
        "Free business loan calculator. Enter amount, APR and term to estimate your monthly, weekly or daily payment, total interest and total repaid.",
      path: PATH,
      jsonLd: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Calculators", path: "/calculators" },
          { name: "Business Loan Calculator", path: PATH },
        ]),
        faqLd(FAQS),
      ],
    }),
  component: BusinessLoanCalculator,
});

function BusinessLoanCalculator() {
  const [amount, setAmount] = useState(100000);
  const [apr, setApr] = useState(18);
  const [term, setTerm] = useState(24);
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [fee, setFee] = useState(0);

  const result = useMemo(
    () => loanPayment(amount, apr, term, frequency),
    [amount, apr, term, frequency],
  );
  const feeAmount = (amount * fee) / 100;
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
            { name: "Business Loan Calculator" },
          ]}
          eyebrow="Calculator"
          title="Business loan calculator"
          intro="Estimate the payment and total cost of a term loan, equipment financing or a line of credit draw."
        />
        <section className="py-14 md:py-20">
          <div className="container-page">
            <CalculatorShell
              inputs={
                <>
                  <NumberField
                    id="amount"
                    label="Loan amount"
                    prefix="$"
                    value={amount}
                    onChange={setAmount}
                    min={1000}
                    step={1000}
                  />
                  <NumberField
                    id="apr"
                    label="Interest rate (APR)"
                    suffix="%"
                    value={apr}
                    onChange={setApr}
                    min={0}
                    max={200}
                    step={0.25}
                  />
                  <NumberField
                    id="term"
                    label="Term"
                    suffix="months"
                    value={term}
                    onChange={setTerm}
                    min={1}
                    max={300}
                  />
                  <SelectField
                    id="frequency"
                    label="Payment frequency"
                    value={frequency}
                    onChange={setFrequency}
                    options={FREQUENCY_OPTIONS}
                  />
                  <NumberField
                    id="fee"
                    label="Origination fee (optional)"
                    suffix="%"
                    value={fee}
                    onChange={setFee}
                    min={0}
                    max={20}
                    step={0.5}
                    hint="Fees deducted from the funds reduce what you actually receive."
                  />
                </>
              }
              results={
                <>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Estimate</p>
                  <dl className="mt-4">
                    <ResultRow label={label} value={usd(result.payment, 2)} strong />
                    <ResultRow label="Number of payments" value={String(result.payments)} />
                    <ResultRow label="Total interest" value={usd(result.totalCost)} />
                    <ResultRow label="Total repaid" value={usd(result.totalPaid)} />
                    {feeAmount > 0 && (
                      <ResultRow label="Funds received after fee" value={usd(amount - feeAmount)} />
                    )}
                  </dl>
                  <a
                    href="/apply"
                    className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gold px-6 py-3.5 text-sm font-extrabold text-gold-foreground"
                  >
                    See real offers for your business
                  </a>
                </>
              }
            />
            <Disclaimer className="mt-6 max-w-3xl" />
            <p className="mt-2 max-w-3xl text-xs text-muted-foreground">
              Estimates assume a fixed rate and level payments; daily schedules assume 252 business
              days per year. Actual offers may differ.
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
