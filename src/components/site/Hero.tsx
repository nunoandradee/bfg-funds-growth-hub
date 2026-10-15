import { useState } from "react";
import { ArrowRight, Clock, Layers, Lock, ShieldCheck, UserRound, Zap } from "lucide-react";

import { SERVICES } from "@/data/site";

// Plain facts about the process, shown under the call to action.
const ASSURANCES = [
  { icon: ShieldCheck, text: "No impact on your credit to check options" },
  { icon: Lock, text: "Secure, encrypted application" },
  { icon: UserRound, text: "One dedicated funding specialist" },
  { icon: Layers, text: "8 funding products, one application" },
];

const AMOUNTS = [
  { value: 10_000, label: "$10K" },
  { value: 50_000, label: "$50K" },
  { value: 100_000, label: "$100K" },
  { value: 250_000, label: "$250K" },
  { value: 500_000, label: "$500K" },
  { value: 1_000_000, label: "$1M+" },
];

/** What the money is for → the product that usually fits it best. */
const PURPOSES = [
  { label: "Cash flow & payroll", slug: "business-line-of-credit" },
  { label: "Inventory", slug: "working-capital" },
  { label: "Equipment or vehicles", slug: "equipment-financing" },
  { label: "Expansion", slug: "term-loan" },
  { label: "Real estate", slug: "sba-loans" },
  { label: "Unpaid invoices", slug: "invoice-factoring" },
];

/** Quick start: amount and purpose, then the full application with the amount filled in. */
function QuickStart() {
  const [amount, setAmount] = useState(100_000);
  const [purpose, setPurpose] = useState<string | null>(null);
  const fit = purpose ? SERVICES.find((s) => s.slug === purpose) : undefined;

  const chip = (active: boolean) =>
    `rounded-xl border px-3 py-2.5 text-sm font-bold transition-colors ${
      active
        ? "border-navy bg-navy text-navy-foreground"
        : "border-border bg-background text-navy hover:border-navy"
    }`;

  return (
    <div className="rounded-3xl bg-card p-6 text-card-foreground shadow-lift md:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cobalt">See your options</p>
      <h2 className="mt-2 text-2xl font-extrabold text-navy">How much do you need?</h2>

      <div className="mt-5 grid grid-cols-3 gap-2" role="group" aria-label="Funding amount">
        {AMOUNTS.map((a) => (
          <button
            key={a.value}
            type="button"
            aria-pressed={amount === a.value}
            onClick={() => setAmount(a.value)}
            className={chip(amount === a.value)}
          >
            {a.label}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm font-bold text-navy">What is it for?</p>
      <div className="mt-2 grid grid-cols-2 gap-2" role="group" aria-label="Use of funds">
        {PURPOSES.map((p) => (
          <button
            key={p.slug}
            type="button"
            aria-pressed={purpose === p.slug}
            onClick={() => setPurpose(p.slug)}
            className={`${chip(purpose === p.slug)} text-left font-semibold`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <p className="mt-4 min-h-5 text-sm text-muted-foreground">
        {fit ? (
          <>
            Often a good fit:{" "}
            <a href={`/services/${fit.slug}`} className="font-semibold text-cobalt hover:underline">
              {fit.title}
            </a>
          </>
        ) : (
          "Your specialist will compare every option that fits."
        )}
      </p>

      <a
        href={`/apply?amount=${amount}`}
        className="mt-5 flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 text-base font-extrabold text-gold-foreground shadow-card transition-transform hover:-translate-y-0.5"
      >
        Check my options
        <ArrowRight className="size-5" />
      </a>
      <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Clock className="size-3.5" />
        Takes about 5 minutes · No impact on your credit
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy">
      {/* soft light sweep */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-52 size-[42rem] rounded-full bg-cobalt/45 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-64 right-[-10rem] size-[36rem] rounded-full bg-gold/20 blur-[130px]"
      />
      {/* subtle diagonal sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.05)_50%,transparent_65%)]"
      />

      <div className="container-page relative py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold">
              <Zap className="size-3.5" />
              Funding without bank delays
            </span>

            <h1 className="mt-6 text-balance-tight text-5xl font-extrabold leading-[1.05] text-navy-foreground md:text-7xl">
              $10K to $2M in <span className="text-gold">24–48 Hours</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-foreground/75">
              BFG Funds helps small and mid-sized U.S. businesses bridge cash flow gaps, make
              payroll, stock inventory and seize growth opportunities — with one application, offers
              from our lender network and approvals measured in hours, not months.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/30 px-7 py-3.5 text-sm font-bold text-navy-foreground transition-colors hover:bg-navy-foreground/10"
              >
                Free Consultation
              </a>
              <a
                href="/services"
                className="inline-flex items-center gap-2 px-2 py-3.5 text-sm font-bold text-navy-foreground/85 hover:text-gold"
              >
                Compare funding options
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>

          <QuickStart />
        </div>

        <ul className="mt-14 grid gap-4 border-t border-navy-foreground/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {ASSURANCES.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-3 text-sm font-semibold text-navy-foreground/85"
            >
              <Icon className="size-5 shrink-0 text-gold" />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
