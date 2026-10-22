import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

const STEPS = [
  {
    title: "Apply once",
    text: "A short online application. Seeing your options won't affect your credit score.",
  },
  {
    title: "We find the right lenders",
    text: "Your specialist takes your business to the providers most likely to approve it.",
  },
  {
    title: "Compare side by side",
    text: "Payment, total payback and term, laid out plainly. If a cheaper option fits, we say so.",
  },
  {
    title: "Get funded",
    text: "Sign the offer you choose. Many programs wire funds within 24 hours of signing.",
  },
];

/**
 * The process as four quiet steps. On wide screens a hairline runs through
 * them and fills in as the reader scrolls past; the steps themselves fade in
 * through the site-wide scroll reveal, so the server HTML shows them.
 */
export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="how-it-works" className="bg-surface py-20 md:py-28">
      <div className="container-page">
        <div className="text-center">
          <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-[-0.035em] text-navy md:text-6xl">
            From application to funded.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-snug text-navy/60 md:text-xl">
            One specialist the whole way. They do the shopping, you make the choice.
          </p>
        </div>

        <ol
          ref={ref}
          className="relative mt-16 grid gap-12 md:mt-20 md:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          <span
            aria-hidden
            className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-px bg-navy/10 lg:block"
          />
          <motion.span
            aria-hidden
            style={{ scaleX: reduce ? 1 : progress }}
            className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-px origin-left bg-gold lg:block"
          />
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative text-center">
              <span className="relative mx-auto grid size-10 place-items-center rounded-full bg-navy text-sm font-bold text-navy-foreground ring-8 ring-surface">
                {i + 1}
              </span>
              <h3 className="mt-6 text-xl font-bold tracking-tight text-navy">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs leading-relaxed text-navy/60">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
