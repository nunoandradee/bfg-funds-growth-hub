import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { CalculatorShell, NumberField, SelectField, usd } from "@/components/site/CalculatorParts";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { CtaBand, Disclaimer, FaqList, PageHero } from "@/components/site/PageParts";
import { estimateFunding, type CreditBand, type TimeInBusiness } from "@/lib/calculators";
import { breadcrumbLd, faqLd, pageHead } from "@/lib/seo";

const PATH = "/calculators/how-much-funding-can-i-get";
const FAQS = [
  {
    q: "How do lenders decide how much to offer?",
    a: "Most small business funding is sized from your average monthly bank deposits, then adjusted for time in business, credit, existing debt and cash-flow health (balances, negative days).",
  },
  {
    q: "Is this estimate an offer?",
    a: "No. It uses general market rules of thumb. Actual amounts are set by each provider after reviewing your bank statements and application.",
  },
  {
    q: "How can I qualify for more?",
    a: "Higher and steadier deposits, fewer negative balance days, less existing debt and more time in business all increase what providers are willing to offer.",
  },
];

const TIB_OPTIONS = [
  { value: "under-6", label: "Less than 6 months" },
  { value: "6-12", label: "6–12 months" },
  { value: "12-24", label: "1–2 years" },
  { value: "24-plus", label: "2+ years" },
] as const satisfies readonly { value: TimeInBusiness; label: string }[];

const CREDIT_OPTIONS = [
  { value: "under-550", label: "Below 550" },
  { value: "550-619", label: "550–619" },
  { value: "620-679", label: "620–679" },
  { value: "680-plus", label: "680 or higher" },
] as const satisfies readonly { value: CreditBand; label: string }[];

export const Route = createFileRoute("/calculators/how-much-funding-can-i-get")({
  head: () =>
    pageHead({
      title: "How Much Business Funding Can I Get? Free Estimate | BFG Funds",
      description:
        "Estimate how much small business funding you may qualify for based on monthly revenue, time in business and credit score — no personal information required.",
      path: PATH,
      jsonLd: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Calculators", path: "/calculators" },
          { name: "How Much Funding Can I Get?", path: PATH },
        ]),
        faqLd(FAQS),
      ],
    }),
  component: FundingEstimator,
});

function FundingEstimator() {
  const [revenue, setRevenue] = useState(40000);
  const [tib, setTib] = useState<TimeInBusiness>("12-24");
  const [credit, setCredit] = useState<CreditBand>("620-679");
  const estimates = useMemo(
    () => estimateFunding({ monthlyRevenue: revenue, timeInBusiness: tib, credit }),
    [revenue, tib, credit],
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          crumbs={[
            { name: "Home", to: "/" },
            { name: "Calculators", to: "/calculators" },
            { name: "How Much Funding Can I Get?" },
          ]}
          eyebrow="Calculator"
          title="How much funding can my business get?"
          intro="A quick, rough range based on how providers commonly size offers. No personal information needed."
        />
        <section className="py-14 md:py-20">
          <div className="container-page">
            <CalculatorShell
              inputs={
                <>
                  <NumberField
                    id="revenue"
                    label="Average monthly revenue (bank deposits)"
                    prefix="$"
                    value={revenue}
                    onChange={setRevenue}
                    min={0}
                    step={1000}
                  />
                  <SelectField
                    id="tib"
                    label="Time in business"
                    value={tib}
                    onChange={setTib}
                    options={TIB_OPTIONS}
                  />
                  <SelectField
                    id="credit"
                    label="Personal credit score"
                    value={credit}
                    onChange={setCredit}
                    options={CREDIT_OPTIONS}
                  />
                </>
              }
              results={
                <>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                    Rough range
                  </p>
                  {estimates.length === 0 ? (
                    <p className="mt-4 leading-relaxed text-navy-foreground/80">
                      Most providers look for at least 4 months in business and about $10,000 in
                      monthly deposits. Talk to a specialist about options as your business grows.
                    </p>
                  ) : (
                    <ul className="mt-4 divide-y divide-navy-foreground/15">
                      {estimates.map((e) => (
                        <li key={e.slug} className="flex items-baseline justify-between gap-4 py-3">
                          <Link
                            to="/services/$slug"
                            params={{ slug: e.slug }}
                            className="text-sm text-navy-foreground/80 hover:text-gold"
                          >
                            {e.product}
                          </Link>
                          <span className="text-right font-bold">
                            {usd(e.low)} – {usd(e.high)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <a
                    href="/apply"
                    className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gold px-6 py-3.5 text-sm font-extrabold text-gold-foreground"
                  >
                    Get your real numbers
                  </a>
                </>
              }
            />
            <Disclaimer className="mt-6 max-w-3xl" />
          </div>
        </section>
        <FaqList faqs={FAQS} />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
