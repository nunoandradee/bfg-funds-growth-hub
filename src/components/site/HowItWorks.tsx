import { useRef } from "react";
import { ClipboardCheck, Network, Scale, Send } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Apply once",
    text: "A short online application with your business basics. Seeing your options won't affect your credit score.",
  },
  {
    icon: Network,
    title: "We take it to the right lenders",
    text: "Your specialist presents your business to the providers most likely to approve it: SBA lenders, equipment financiers, credit lines and revenue-based funders.",
  },
  {
    icon: Scale,
    title: "Compare offers side by side",
    text: "Payment, total payback and term, laid out plainly. When a cheaper option fits better, we tell you.",
  },
  {
    icon: Send,
    title: "Get funded",
    text: "Sign the offer you choose. Many programs wire funds within 24 hours of signing.",
  },
];

/**
 * The process as one story: the headline stays put while the steps scroll by,
 * and a line fills in step with the reader's progress. The steps themselves
 * fade in through the site-wide scroll reveal, so the server HTML shows them.
 */
export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-balance-tight text-4xl font-extrabold text-navy md:text-5xl">
            From application to funded, with one specialist
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            You talk to the same person the whole way. They do the shopping, you make the choice.
          </p>
        </div>

        <ol ref={ref} className="relative space-y-6">
          <span aria-hidden className="absolute bottom-6 left-[1.6rem] top-6 w-px bg-border" />
          <motion.span
            aria-hidden
            style={{ scaleY: reduce ? 1 : progress }}
            className="absolute bottom-6 left-[1.6rem] top-6 w-px origin-top bg-cobalt"
          />
          {STEPS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="relative flex gap-6">
              <div className="relative z-10 grid size-[3.25rem] shrink-0 place-items-center rounded-2xl bg-navy text-navy-foreground shadow-card">
                <Icon className="size-5" />
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <h3 className="text-lg font-extrabold text-navy">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
