import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Check, Landmark } from "lucide-react";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "motion/react";

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

// How long the phone stays on each step's screen, in ms.
const SCENE_MS = [5600, 4200, 4200];
const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The process in three plain steps beside an iPhone that plays each one: the
 * application filling in, offers side by side, then the deposit. The phone
 * cycles only while in view; reduced motion shows the first screen, finished.
 */
export function HowItWorks() {
  const reduce = Boolean(useReducedMotion());
  const phoneRef = useRef<HTMLDivElement>(null);
  const inView = useInView(phoneRef, { amount: 0.4 });
  const [scene, setScene] = useState(0);
  const playing = inView && !reduce;

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setScene((s) => (s + 1) % STEPS.length), SCENE_MS[scene]);
    return () => window.clearTimeout(id);
  }, [playing, scene]);

  return (
    <section id="how-it-works" className="overflow-hidden py-20 md:py-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-balance-tight text-4xl font-extrabold text-navy md:text-5xl">
            Funding that moves at your speed.
          </h2>
          <ol className="mt-10 space-y-3 md:-mx-4">
            {STEPS.map((step, i) => {
              const active = !reduce && scene === i;
              return (
                <li key={step.title}>
                  <button
                    type="button"
                    onClick={() => setScene(i)}
                    aria-pressed={active}
                    className="relative isolate flex w-full gap-5 rounded-3xl p-4 text-left"
                  >
                    {active && (
                      <motion.span
                        layoutId="how-step"
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-3xl bg-surface ring-1 ring-border"
                        transition={{ duration: 0.5, ease }}
                      />
                    )}
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-full text-base font-extrabold transition-colors duration-500 ${
                        active ? "bg-gold text-gold-foreground" : "bg-navy text-navy-foreground"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span>
                      <span className="block text-xl font-extrabold text-navy">{step.title}</span>
                      <span className="mt-1.5 block leading-relaxed text-muted-foreground">
                        {step.text}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
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
          className="relative mx-auto w-[16.5rem] sm:w-[18.5rem]"
          aria-label="Illustration of the BFG Funds application on a phone"
        >
          <div
            aria-hidden
            className="absolute -right-16 top-10 -z-10 size-48 rounded-full bg-gold/35"
          />
          <div
            aria-hidden
            className="absolute -left-14 bottom-16 -z-10 size-28 rounded-full bg-gold/80"
          />
          <motion.div
            ref={phoneRef}
            animate={reduce ? {} : { y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <IPhone>
              <AnimatePresence initial={false}>
                <motion.div
                  key={scene}
                  className="absolute inset-0 flex flex-col px-5 pb-7 pt-14"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.45, ease }}
                >
                  {scene === 0 && <ApplicationScreen still={!playing} />}
                  {scene === 1 && <OffersScreen />}
                  {scene === 2 && <FundedScreen />}
                </motion.div>
              </AnimatePresence>
            </IPhone>
          </motion.div>
          <figcaption className="mt-4 text-center text-xs text-muted-foreground">
            Illustration
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/** A modern iPhone: titanium edge, side buttons, Dynamic Island and status bar. */
function IPhone({ children }: { children: ReactNode }) {
  return (
    <div className="relative aspect-[71.5/147.6]" aria-hidden>
      <span className="absolute -left-[3px] top-[17%] h-[4%] w-[3px] rounded-l-sm bg-[#3a3f48]" />
      <span className="absolute -left-[3px] top-[24%] h-[8%] w-[3px] rounded-l-sm bg-[#3a3f48]" />
      <span className="absolute -left-[3px] top-[34%] h-[8%] w-[3px] rounded-l-sm bg-[#3a3f48]" />
      <span className="absolute -right-[3px] top-[27%] h-[12%] w-[3px] rounded-r-sm bg-[#3a3f48]" />

      {/* Titanium frame */}
      <div className="absolute inset-0 rounded-[3.1rem] bg-[linear-gradient(145deg,#6b7280_0%,#2b2f36_22%,#4b5059_50%,#23262c_78%,#5d636d_100%)] p-[3px] shadow-[0_40px_80px_-30px_oklch(0.24_0.06_260/0.55),0_18px_36px_-18px_oklch(0.24_0.06_260/0.35)]">
        <div className="h-full rounded-[2.95rem] bg-[#0b0c0f] p-[9px]">
          <div className="relative h-full overflow-hidden rounded-[2.4rem] bg-background text-navy">
            <StatusBar />
            <div className="absolute left-1/2 top-2.5 z-20 h-[26px] w-[34%] -translate-x-1/2 rounded-full bg-black" />
            {children}
            <div className="absolute bottom-1.5 left-1/2 z-20 h-1 w-[36%] -translate-x-1/2 rounded-full bg-navy/80" />
            <div className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(120deg,rgba(255,255,255,0.10)_0%,transparent_28%)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="absolute inset-x-0 top-0 z-20 flex h-11 items-center justify-between px-7 text-[12px] font-bold">
      <span className="tabular-nums">9:41</span>
      <span className="flex items-center gap-1">
        <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor">
          <rect x="0" y="7" width="3" height="3" rx="0.7" />
          <rect x="4.3" y="5" width="3" height="5" rx="0.7" />
          <rect x="8.6" y="2.5" width="3" height="7.5" rx="0.7" />
          <rect x="12.9" y="0" width="3" height="10" rx="0.7" />
        </svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
          <path d="M7 2.2c2 0 3.8.8 5.1 2l1-1A8.6 8.6 0 0 0 7 .8 8.6 8.6 0 0 0 .9 3.2l1 1A7.2 7.2 0 0 1 7 2.2Zm0 2.8c1.2 0 2.3.5 3.1 1.2l1-1A5.8 5.8 0 0 0 7 3.6 5.8 5.8 0 0 0 2.9 5.2l1 1C4.7 5.5 5.8 5 7 5Zm0 2.8c.5 0 .9.2 1.2.5L7 9.5 5.8 8.3c.3-.3.7-.5 1.2-.5Z" />
        </svg>
        <span className="relative ml-0.5 h-[11px] w-[22px] rounded-[3px] border border-current/40 p-[1.5px]">
          <span className="block h-full w-[78%] rounded-[1.5px] bg-current" />
        </span>
      </span>
    </div>
  );
}

/** Types `text` out once, starting after `delay` ms. */
function useTyped(text: string, delay: number, still: boolean) {
  const [count, setCount] = useState(still ? text.length : 0);
  useEffect(() => {
    if (still) return;
    let i = 0;
    let tick: number | undefined;
    const start = window.setTimeout(() => {
      tick = window.setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) window.clearInterval(tick);
      }, 55);
    }, delay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(tick);
    };
  }, [text, delay, still]);
  return text.slice(0, count);
}

function ApplicationScreen({ still }: { still: boolean }) {
  const [amount, setAmount] = useState(still ? 100_000 : 0);
  const [step, setStep] = useState(still ? 1 : 0);
  const business = useTyped("Rivera's Café", 1500, still);
  const revenue = useTyped("$85,000", 2500, still);

  useEffect(() => {
    if (still) return;
    const controls = animate(0, 100_000, {
      duration: 1.1,
      delay: 0.3,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setAmount(Math.round(v / 1000) * 1000),
    });
    const t = window.setTimeout(() => setStep(1), 4000);
    return () => {
      controls.stop();
      window.clearTimeout(t);
    };
  }, [still]);

  return (
    <>
      <p className="text-[11px] font-semibold text-muted-foreground">Funding application</p>
      <div className="mt-2.5 flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-border">
            <motion.span
              className="block h-full origin-left bg-gold"
              initial={false}
              animate={{ scaleX: i <= step ? 1 : 0 }}
              transition={{ duration: 0.5, ease }}
            />
          </span>
        ))}
      </div>
      <p className="mt-5 text-[17px] font-extrabold leading-tight">How much funding do you need?</p>
      <p className="mt-3 text-[32px] font-extrabold leading-none tracking-tight tabular-nums">
        ${amount.toLocaleString("en-US")}
      </p>
      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {["$25K", "$50K", "$100K", "$250K"].map((c) => {
          const on = c === "$100K" && amount === 100_000;
          return (
            <span
              key={c}
              className={`rounded-full px-2.5 py-1 text-[10.5px] font-bold transition-colors duration-300 ${
                on ? "bg-navy text-navy-foreground" : "border border-border"
              }`}
            >
              {c}
            </span>
          );
        })}
      </div>
      <div className="mt-5 space-y-2">
        <Field label="Business name" value={business} />
        <Field label="Monthly revenue" value={revenue} />
      </div>
      <motion.span
        className="mt-auto rounded-full bg-gold py-3 text-center text-[13px] font-extrabold text-gold-foreground"
        animate={step === 1 && !still ? { scale: [1, 0.94, 1] } : {}}
        transition={{ duration: 0.35 }}
      >
        Continue
      </motion.span>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div
      className={`rounded-xl border px-3 py-2 transition-colors ${
        value ? "border-navy/40" : "border-border"
      }`}
    >
      <p className="text-[9.5px] font-semibold text-muted-foreground">{label}</p>
      <p className="h-4 text-[12px] font-bold">{value}</p>
    </div>
  );
}

const OFFERS = [
  { amount: "$100,000", payments: "Monthly payments", pick: true },
  { amount: "$85,000", payments: "Weekly payments", pick: false },
];

function OffersScreen() {
  return (
    <>
      <p className="text-[11px] font-semibold text-muted-foreground">Rivera's Café</p>
      <p className="mt-1 text-[19px] font-extrabold leading-tight">Your offers are ready</p>
      <div className="mt-5 space-y-2.5">
        {OFFERS.map((o, i) => (
          <motion.div
            key={o.amount}
            className="relative rounded-2xl border border-border bg-card p-3.5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.25 + i * 0.25 }}
          >
            {o.pick && (
              <motion.span
                className="absolute inset-0 rounded-2xl ring-2 ring-navy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.3 }}
              />
            )}
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold text-muted-foreground">Offer {i + 1}</p>
              {o.pick && (
                <motion.span
                  className="grid size-5 place-items-center rounded-full bg-navy text-navy-foreground"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.9, type: "spring", stiffness: 420, damping: 22 }}
                >
                  <Check className="size-3" strokeWidth={3} />
                </motion.span>
              )}
            </div>
            <p className="mt-1 text-[22px] font-extrabold tabular-nums">{o.amount}</p>
            <p className="text-[11px] font-medium text-muted-foreground">{o.payments}</p>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-[10.5px] leading-snug text-muted-foreground">
        Your specialist walks you through every number before you sign.
      </p>
      <span className="mt-auto rounded-full bg-navy py-3 text-center text-[13px] font-extrabold text-navy-foreground">
        Choose this offer
      </span>
    </>
  );
}

function FundedScreen() {
  return (
    <div className="flex flex-1 flex-col items-center text-center">
      <motion.div
        className="mt-10 grid size-20 place-items-center rounded-full bg-gold/25"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.2 }}
      >
        <span className="grid size-14 place-items-center rounded-full bg-gold text-gold-foreground">
          <svg viewBox="0 0 24 24" className="size-7" fill="none">
            <motion.path
              d="m6 12.5 4 4 8-9"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.55, ease }}
            />
          </svg>
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease }}
      >
        <p className="mt-6 text-[19px] font-extrabold">Funds on the way</p>
        <p className="mt-2 text-[32px] font-extrabold leading-none tracking-tight tabular-nums">
          $100,000
        </p>
      </motion.div>
      <motion.div
        className="mt-7 flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5, ease }}
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface">
          <Landmark className="size-4" />
        </span>
        <span>
          <span className="block text-[12px] font-bold">Business checking</span>
          <span className="block text-[10.5px] text-muted-foreground">Deposit •••• 4821</span>
        </span>
      </motion.div>
    </div>
  );
}
