import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

import heroOwners from "@/assets/hero-owners.jpg";
import { COMPANY } from "@/data/site";

const AMOUNTS = [
  { value: 10_000, label: "$10,000" },
  { value: 25_000, label: "$25,000" },
  { value: 50_000, label: "$50,000" },
  { value: 100_000, label: "$100,000" },
  { value: 250_000, label: "$250,000" },
  { value: 500_000, label: "$500,000" },
  { value: 1_000_000, label: "$1,000,000" },
  { value: 2_000_000, label: "$2,000,000" },
];

export function Hero() {
  const [amount, setAmount] = useState(100_000);

  return (
    <section id="top" className="border-b border-border bg-surface">
      <div className="container-page grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-20">
        <div>
          <h1 className="text-balance-tight text-4xl leading-[1.08] text-navy md:text-6xl">
            Funding for the business you've built.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            From $10K to $2M across eight funding products. Apply once, work with one specialist,
            and compare real offers from our lender network — often within 24 to 48 hours.
          </p>

          <form action="/apply" method="get" className="mt-8 max-w-xl">
            <label htmlFor="hero-amount" className="text-sm font-bold text-navy">
              How much do you need?
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <select
                  id="hero-amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="h-14 w-full appearance-none rounded-lg border border-input bg-background pl-4 pr-11 text-base font-semibold text-navy outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/20"
                >
                  {AMOUNTS.map((a) => (
                    <option key={a.value} value={a.value}>
                      {a.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-navy/60"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-gold px-7 text-base font-extrabold text-gold-foreground transition-colors hover:bg-gold/90"
              >
                See my options
                <ArrowRight className="size-5" />
              </button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Checking your options won't affect your credit score. Takes about 5 minutes.
            </p>
          </form>

          <p className="mt-8 border-t border-border pt-6 text-sm text-navy/80">
            Prefer to talk first? Call a funding specialist at{" "}
            <a
              href={COMPANY.phoneHref}
              className="font-bold text-navy underline underline-offset-4"
            >
              {COMPANY.phoneDisplay}
            </a>
          </p>
        </div>

        <figure className="relative">
          <img
            src={heroOwners}
            alt="Two café owners smiling behind their counter"
            width={1600}
            height={900}
            fetchPriority="high"
            className="aspect-[4/3] w-full rounded-xl object-cover object-center lg:aspect-[3/2]"
          />
        </figure>
      </div>
    </section>
  );
}
