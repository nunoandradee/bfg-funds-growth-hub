import { ArrowRight, Layers, Lock, ShieldCheck, UserRound, Zap } from "lucide-react";

// Plain facts about the process, shown under the call to action.
const ASSURANCES = [
  { icon: ShieldCheck, text: "No impact on your credit to check options" },
  { icon: Lock, text: "Secure, encrypted application" },
  { icon: UserRound, text: "One dedicated funding specialist" },
  { icon: Layers, text: "8 funding products, one application" },
];

const PILLS = [
  "Business Line of Credit",
  "Revenue-Based Financing",
  "SBA Loans",
  "Same Day Funding",
];

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
      {/* bottom fade into page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,var(--color-background),transparent)] opacity-15"
      />

      <div className="container-page relative py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold">
            <Zap className="size-3.5" />
            Funding without bank delays
          </span>

          <h1 className="mt-6 text-balance-tight text-5xl font-extrabold leading-[1.05] text-navy-foreground md:text-7xl">
            $10K to $2M in <span className="text-gold">24–48 Hours</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-foreground/75">
            BFG Funds helps small and mid-sized U.S. businesses bridge cash flow gaps, make payroll,
            stock inventory and seize growth opportunities — with one application, offers from our
            lender network and approvals measured in hours, not months.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-gold-foreground shadow-lift transition-transform hover:-translate-y-0.5"
            >
              Free Consultation
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/30 px-7 py-3.5 text-sm font-bold text-navy-foreground transition-colors hover:bg-navy-foreground/10"
            >
              See Our Services
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-2.5">
            {PILLS.map((pill) => (
              <li
                key={pill}
                className="rounded-full border border-navy-foreground/15 bg-navy-foreground/5 px-4 py-2 text-xs font-semibold text-navy-foreground/80"
              >
                {pill}
              </li>
            ))}
          </ul>
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
