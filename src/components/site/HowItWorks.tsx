import { ArrowRight, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    title: "Complete the application.",
    text: "A short online application, designed to take just a few minutes.",
  },
  {
    title: "Compare your offers.",
    text: "Your specialist brings real offers side by side and explains every number.",
  },
  {
    title: "Receive your funds.",
    text: "Sign the offer you choose. Many programs fund within 24 hours of signing.",
  },
];

/** The process in three plain steps beside a phone showing the application. */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="overflow-hidden py-20 md:py-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-balance-tight text-4xl font-extrabold text-navy md:text-5xl">
            Funding that moves at your speed.
          </h2>
          <ol className="mt-10 space-y-8">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-navy text-base font-extrabold text-navy-foreground">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-extrabold text-navy">{step.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <a
            href="/apply"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-extrabold text-gold-foreground transition-transform hover:-translate-y-0.5"
          >
            Apply Now
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <figure
          className="relative mx-auto w-[16rem] sm:w-[18rem]"
          aria-label="Illustration of the BFG Funds application"
        >
          <div
            aria-hidden
            className="absolute -right-16 top-10 -z-10 size-48 rounded-full bg-gold/35"
          />
          <div
            aria-hidden
            className="absolute -left-14 bottom-16 -z-10 size-28 rounded-full bg-gold/80"
          />
          <div className="relative aspect-[9/19] rounded-[3rem] bg-navy p-2.5 shadow-lift">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[2.4rem] bg-background px-5 pb-6 pt-12 text-navy">
              <div className="absolute left-1/2 top-2.5 h-6 w-24 -translate-x-1/2 rounded-full bg-navy" />
              <p className="text-xs font-semibold text-muted-foreground">Funding application</p>
              <div className="mt-3 flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={`h-1 flex-1 rounded-full ${i === 0 ? "bg-gold" : "bg-border"}`}
                  />
                ))}
              </div>
              <p className="mt-6 text-lg font-extrabold leading-tight">
                How much funding do you need?
              </p>
              <p className="mt-4 text-4xl font-extrabold tracking-tight tabular-nums">$100,000</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["$25K", "$50K", "$100K", "$250K"].map((c) => (
                  <span
                    key={c}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      c === "$100K" ? "bg-navy text-navy-foreground" : "border border-border"
                    }`}
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="mt-6 space-y-2.5">
                <div className="rounded-xl border border-border px-3 py-2.5 text-xs text-muted-foreground">
                  Business name
                </div>
                <div className="rounded-xl border border-border px-3 py-2.5 text-xs text-muted-foreground">
                  Monthly revenue
                </div>
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <ShieldCheck aria-hidden className="size-3.5 text-gold" />
                Won't affect your credit score
              </p>
              <span className="mt-auto rounded-full bg-gold py-3 text-center text-sm font-extrabold text-gold-foreground">
                Continue
              </span>
            </div>
          </div>
          <figcaption className="mt-3 text-center text-xs text-muted-foreground">
            Illustration
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
