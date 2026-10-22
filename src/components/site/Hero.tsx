import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import heroOwners from "@/assets/hero-owners.jpg";

const HEADLINE = ["Funding for the", "business you've built."];

// Apple-style opening: a centered headline, one line of support, two quiet
// calls to action and a large photograph. The entrance runs in CSS
// (styles.css, .hero-*) so the server HTML is already the finished hero;
// Motion only eases the photo as the page scrolls.
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);

  return (
    <section
      ref={ref}
      id="top"
      data-motion
      className="overflow-hidden bg-background pt-14 md:pt-20"
    >
      <div className="container-page text-center">
        <h1 className="mx-auto max-w-4xl text-[2.75rem] font-bold leading-[1.04] tracking-[-0.04em] text-navy sm:text-6xl lg:text-[5rem]">
          {HEADLINE.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <span className="hero-word block" style={{ animationDelay: `${100 + i * 120}ms` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>
        <p
          className="hero-fade mx-auto mt-5 max-w-2xl text-xl leading-snug text-navy/60 md:text-2xl"
          style={{ animationDelay: "420ms" }}
        >
          From $10K to $2M. One application, one specialist, and real offers to compare.
        </p>
        <div
          className="hero-fade mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          style={{ animationDelay: "540ms" }}
        >
          <a
            href="/apply"
            className="rounded-full bg-gold px-7 py-3 text-base font-bold text-gold-foreground transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            See my options
          </a>
          <a
            href="#how-it-works"
            className="group inline-flex items-center gap-0.5 text-base font-semibold text-cobalt"
          >
            How it works
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
        <p className="hero-fade mt-4 text-sm text-navy/45" style={{ animationDelay: "620ms" }}>
          Checking your options won't affect your credit score.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-[88rem] px-3 md:mt-16 md:px-6">
        <div className="hero-photo overflow-hidden rounded-[2rem]">
          <motion.img
            style={{ scale }}
            src={heroOwners}
            alt="Two café owners smiling behind their counter"
            width={1600}
            height={900}
            fetchPriority="high"
            className="aspect-[4/3] w-full object-cover object-center sm:aspect-[16/9] lg:aspect-[21/9]"
          />
        </div>
      </div>
    </section>
  );
}
