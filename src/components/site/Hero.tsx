import { ArrowRight } from "lucide-react";

import heroOwners from "@/assets/hero-owners.jpg";
import { ReviewStrip } from "@/components/site/TrustParts";
import { COMPANY } from "@/data/site";

/** The reasons owners come to us; each starts the application. */
const NEEDS = ["Manage cash flow", "Buy equipment", "Grow my business", "Cover expenses"];

// A friendly, human opening: plain promise on the left, owners in an arch
// with soft gold shapes on the right, and the reasons people need funding as
// one-tap pills. Bottom padding leaves room for the facts card that overlaps
// the next section. The entrance runs in CSS (styles.css, .hero-fade).
export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-navy pb-28 text-navy-foreground md:pb-36"
    >
      <div
        aria-hidden
        className="absolute -left-40 top-1/3 -z-10 size-[34rem] rounded-full bg-white/[0.03]"
      />
      <div
        aria-hidden
        className="absolute -right-24 -top-48 -z-10 size-[40rem] rounded-full bg-white/[0.035]"
      />

      <div className="container-page grid items-center gap-12 pt-14 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <h1
            className="hero-fade text-balance-tight text-[2.6rem] font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.6rem]"
            style={{ animationDelay: "80ms" }}
          >
            Business funding from $10K to $2M, <span className="text-gold">built around you.</span>
          </h1>
          <p
            className="hero-fade mt-5 max-w-xl text-lg leading-relaxed text-navy-foreground/80"
            style={{ animationDelay: "200ms" }}
          >
            Apply in minutes. One specialist compares real offers from our lender network, so you
            can choose with the full picture.
          </p>

          <div className="hero-fade mt-9" style={{ animationDelay: "320ms" }}>
            <p className="text-xl font-bold">Why do you need funding?</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {NEEDS.map((need) => (
                <a
                  key={need}
                  href="/apply"
                  className="rounded-full bg-background px-5 py-2.5 text-base font-bold text-navy transition-colors hover:bg-gold hover:text-gold-foreground"
                >
                  {need}
                </a>
              ))}
            </div>
          </div>

          <p
            className="hero-fade mt-7 text-sm text-navy-foreground/75"
            style={{ animationDelay: "420ms" }}
          >
            Prefer to talk first? Call{" "}
            <a
              href={COMPANY.phoneHref}
              className="font-bold text-navy-foreground underline underline-offset-4"
            >
              {COMPANY.phoneDisplay}
            </a>
          </p>
          <div className="mt-5">
            <ReviewStrip dark />
          </div>
        </div>

        <div
          className="hero-fade relative mx-auto w-full max-w-xl"
          style={{ animationDelay: "250ms" }}
        >
          <div
            aria-hidden
            className="absolute -left-6 -top-6 size-32 rounded-full bg-gold/90 md:size-40"
          />
          <div
            aria-hidden
            className="absolute -bottom-8 -right-4 size-28 rounded-full bg-gold/35 md:size-36"
          />
          <div className="relative overflow-hidden rounded-t-[999px] rounded-b-3xl">
            <img
              src={heroOwners}
              alt="Two café owners smiling behind their counter"
              width={1600}
              height={900}
              fetchPriority="high"
              className="aspect-[5/4] w-full object-cover object-center"
            />
          </div>
          <a
            href="/apply"
            className="group absolute -bottom-5 left-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-extrabold text-gold-foreground shadow-lift transition-transform hover:-translate-y-0.5"
          >
            See my options
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
