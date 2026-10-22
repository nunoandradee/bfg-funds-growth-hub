import { useRef, type ReactNode } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

import { usd } from "@/components/site/CalculatorParts";
import { loanPayment } from "@/lib/calculators";
import { analyzeOffer } from "@/lib/offer-xray";

// Example numbers for the illustration, computed with the site's own math.
const AMOUNT = 100_000;
const LINE = loanPayment(AMOUNT, 24, 24, "monthly");
const MCA = analyzeOffer({
  amount: AMOUNT,
  fees: 2500,
  payback: 135_000,
  payment: 1125,
  frequency: "daily",
});

const STEPS = [
  { word: "Apply.", text: "One short application. No impact on your credit to see options." },
  { word: "Compare.", text: "Real offers side by side: payment, total cost and term." },
  { word: "Get funded.", text: "Sign the one you choose. Many programs wire within 24 hours." },
] as const;

/**
 * The process as one pinned scene: a phone in the middle walks through
 * applying, comparing and getting funded while the matching word lights up
 * around it. The section is three screens tall; the stage sticks to the
 * viewport while the reader scrolls through it. Reduced motion gets the same
 * content as a still layout.
 */
export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section
      ref={ref}
      id="how-it-works"
      data-motion
      aria-label="How it works"
      className={`relative ${STAGE_BG} text-navy-foreground ${reduce ? "" : "h-[320vh]"}`}
    >
      <div
        className={`${reduce ? "py-20" : "sticky top-0 h-[100dvh]"} flex items-center overflow-hidden`}
      >
        {/* Warm glow behind the phone, rising like a sunrise as the scene starts. */}
        <Glow progress={scrollYProgress} still={Boolean(reduce)} />

        <div className="container-page relative grid w-full items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
          <Word
            step={0}
            progress={scrollYProgress}
            still={Boolean(reduce)}
            className="lg:text-right"
          />
          <Phone progress={scrollYProgress} still={Boolean(reduce)} />
          <div className="space-y-3 sm:space-y-6 lg:space-y-16">
            <Word step={1} progress={scrollYProgress} still={Boolean(reduce)} />
            <Word step={2} progress={scrollYProgress} still={Boolean(reduce)} />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Each step owns a third of the scroll. */
const PHASES: [number, number][] = [
  [0, 0.36],
  [0.33, 0.69],
  [0.66, 1],
];

/** Linear interpolation through (stop, value) pairs, clamped at both ends. */
function piecewise(p: number, stops: number[], values: number[]): number {
  if (p <= stops[0]!) return values[0]!;
  for (let i = 1; i < stops.length; i++) {
    if (p <= stops[i]!) {
      const t = (p - stops[i - 1]!) / (stops[i]! - stops[i - 1]! || 1);
      return values[i - 1]! + (values[i]! - values[i - 1]!) * t;
    }
  }
  return values[values.length - 1]!;
}

// A function transform on purpose: Motion would otherwise hand a plain
// scroll-linked opacity to the browser's ScrollTimeline, which mapped these
// multi-stop ranges wrongly and left earlier screens showing.
function useStepOpacity(progress: MotionValue<number>, step: number, low: number) {
  const [a, b] = PHASES[step]!;
  const fade = 0.05;
  const stops =
    step === 0 ? [0, b - fade, b] : step === 2 ? [a, a + fade, 1] : [a, a + fade, b - fade, b];
  const values = step === 0 ? [1, 1, low] : step === 2 ? [low, 1, 1] : [low, 1, 1, low];
  return useTransform(progress, (p) => piecewise(p, stops, values));
}

function Word({
  step,
  progress,
  still,
  className = "",
}: {
  step: 0 | 1 | 2;
  progress: MotionValue<number>;
  still: boolean;
  className?: string;
}) {
  const opacity = useStepOpacity(progress, step, 0.12);
  const blur = useTransform(opacity, [0.12, 1], ["blur(6px)", "blur(0px)"]);
  const y = useTransform(opacity, [0.12, 1], [12, 0]);
  return (
    <motion.div style={still ? {} : { opacity, filter: blur, y }} className={className}>
      <p className="text-4xl font-extrabold tracking-[-0.04em] sm:text-6xl xl:text-[5.5rem]">
        <span className={step === 2 ? "text-gold" : undefined}>{STEPS[step].word}</span>
      </p>
      <p
        className={`mt-2 hidden max-w-xs text-base leading-relaxed text-navy-foreground/60 sm:block ${
          className.includes("text-right") ? "lg:ml-auto" : ""
        }`}
      >
        {STEPS[step].text}
      </p>
    </motion.div>
  );
}

function Glow({ progress, still }: { progress: MotionValue<number>; still: boolean }) {
  const scale = useTransform(progress, [0, 0.4], [0.7, 1.1]);
  const opacity = useTransform(progress, [0, 0.15, 0.85, 1], [0.35, 0.9, 0.9, 0.5]);
  return (
    <motion.div
      aria-hidden
      style={still ? {} : { scale, opacity }}
      className="pointer-events-none absolute left-1/2 top-1/2 size-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--color-gold)_55%,transparent)_0%,color-mix(in_oklch,var(--color-gold)_16%,transparent)_40%,transparent_68%)] blur-2xl"
    />
  );
}

/** The dark stage colour shared by the hero and this scene. */
export const STAGE_BG = "bg-[oklch(0.16_0.035_260)]";

/** Phone frame with a notch; its screen content is positioned inside. */
export function PhoneShell({
  children,
  className = "aspect-[9/16] sm:aspect-[9/19]",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-[3rem] bg-[oklch(0.22_0.02_260)] p-2.5 shadow-[0_40px_120px_-30px_rgb(0_0_0/0.8),0_0_0_1px_rgb(255_255_255/0.08)_inset] ${className}`}
    >
      <div className="relative h-full overflow-hidden rounded-[2.4rem] bg-background text-navy">
        <div className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-[oklch(0.15_0.02_260)]" />
        {children}
      </div>
    </div>
  );
}

function Phone({ progress, still }: { progress: MotionValue<number>; still: boolean }) {
  const rotate = useTransform(progress, [0, 0.5, 1], [-4, 0, 4]);
  const y = useTransform(progress, [0, 1], [30, -30]);
  return (
    <motion.figure
      style={still ? {} : { rotate, y }}
      className="relative mx-auto w-[15rem] sm:w-[17rem] xl:w-[19rem]"
      aria-label="Illustration of the BFG Funds journey: apply, compare offers, get funded"
    >
      <PhoneShell>
        <Screen step={0} progress={progress} still={still}>
          <ApplyScreen />
        </Screen>
        <Screen step={1} progress={progress} still={still}>
          <CompareScreen />
        </Screen>
        <Screen step={2} progress={progress} still={still}>
          <FundedScreen />
        </Screen>
      </PhoneShell>
      <figcaption className="mt-4 text-center text-xs text-navy-foreground/40">
        Illustration
      </figcaption>
    </motion.figure>
  );
}

function Screen({
  step,
  progress,
  still,
  children,
}: {
  step: 0 | 1 | 2;
  progress: MotionValue<number>;
  still: boolean;
  children: ReactNode;
}) {
  const opacity = useStepOpacity(progress, step, 0);
  const scale = useTransform(opacity, [0, 1], [0.96, 1]);
  // Reduced motion shows the comparison, the heart of the story.
  if (still)
    return step === 1 ? <div className="absolute inset-0 px-5 pt-12">{children}</div> : null;
  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 px-5 pt-12"
      aria-hidden={step !== 1}
    >
      {children}
    </motion.div>
  );
}

export function ApplyScreen() {
  return (
    <div className="flex h-full flex-col pb-6">
      <p className="text-xs font-semibold text-muted-foreground">Funding application</p>
      <div className="mt-3 flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full ${i === 0 ? "bg-gold" : "bg-border"}`}
          />
        ))}
      </div>
      <p className="mt-6 text-lg font-extrabold leading-tight">How much funding do you need?</p>
      <p className="mt-4 text-4xl font-extrabold tracking-tight tabular-nums">{usd(AMOUNT)}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {["$25K", "$50K", "$100K", "$250K", "$500K"].map((c) => (
          <span
            key={c}
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
              c === "$100K" ? "bg-navy text-navy-foreground" : "border border-border text-navy"
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
  );
}

function CompareScreen() {
  return (
    <div className="flex h-full flex-col pb-6">
      <p className="text-xs font-semibold text-muted-foreground">Your offers</p>
      <p className="mt-1 text-lg font-extrabold leading-tight">Side by side, plainly</p>
      <div className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
        <div className="rounded-2xl border-2 border-gold p-3 sm:p-3.5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-extrabold">Line of credit</p>
            <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-extrabold text-gold-foreground">
              Lowest cost
            </span>
          </div>
          <dl className="mt-2 grid grid-cols-2 gap-y-1.5 text-[11px] sm:mt-3 sm:gap-y-2">
            <dt className="text-muted-foreground">APR</dt>
            <dd className="text-right font-bold">24.0%</dd>
            <dt className="text-muted-foreground">Monthly</dt>
            <dd className="text-right font-bold">{usd(LINE.payment)}</dd>
            <dt className="text-muted-foreground">Total cost</dt>
            <dd className="text-right font-bold">{usd(LINE.totalCost)}</dd>
          </dl>
        </div>
        <div className="rounded-2xl border border-border p-3 sm:p-3.5">
          <p className="text-sm font-extrabold">Merchant cash advance</p>
          <dl className="mt-2 grid grid-cols-2 gap-y-1.5 text-[11px] sm:mt-3 sm:gap-y-2">
            <dt className="text-muted-foreground">APR</dt>
            <dd className="text-right font-bold">{MCA.apr.toFixed(0)}%</dd>
            <dt className="text-muted-foreground">Daily</dt>
            <dd className="text-right font-bold">{usd(1125)}</dd>
            <dt className="text-muted-foreground">Total cost</dt>
            <dd className="text-right font-bold">{usd(MCA.totalCost)}</dd>
          </dl>
        </div>
      </div>
      <p className="mt-auto hidden text-center text-[11px] text-muted-foreground sm:block">
        Your specialist explains every number.
      </p>
    </div>
  );
}

function FundedScreen() {
  return (
    <div className="flex h-full flex-col items-center pb-6 text-center">
      <span className="mt-10 grid size-20 place-items-center rounded-full bg-gold/20">
        <span className="grid size-14 place-items-center rounded-full bg-gold text-gold-foreground">
          <Check className="size-7" strokeWidth={3} />
        </span>
      </span>
      <p className="mt-6 text-xs font-semibold text-muted-foreground">Offer signed</p>
      <p className="mt-1 text-3xl font-extrabold tracking-tight tabular-nums">{usd(AMOUNT)}</p>
      <p className="mt-1 text-sm font-bold">Funds on the way</p>
      <div className="mt-6 w-full space-y-2 rounded-2xl bg-surface p-4 text-left text-[11px]">
        <p className="flex justify-between">
          <span className="text-muted-foreground">Product</span>
          <span className="font-bold">Line of credit</span>
        </p>
        <p className="flex justify-between">
          <span className="text-muted-foreground">Monthly payment</span>
          <span className="font-bold">{usd(LINE.payment)}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-muted-foreground">Your specialist</span>
          <span className="font-bold">Same person, start to finish</span>
        </p>
      </div>
      <p className="mt-auto text-[11px] text-muted-foreground">
        Many programs wire within 24 hours of signing.
      </p>
    </div>
  );
}
