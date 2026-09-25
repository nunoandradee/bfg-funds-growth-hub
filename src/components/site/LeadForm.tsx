import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { INDUSTRIES } from "@/data/site";

const TIME_IN_BUSINESS = [
  "I currently don't own a business",
  "Less than 6 months",
  "6-12 months",
  "1-2 years",
  "2-5 years",
  "5+ years",
];

const REVENUE_BANDS = [
  "Less than $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000 - $250,000",
  "$250,000+",
];

const CREDIT_BANDS = [
  "Excellent (720+)",
  "Good (680-719)",
  "Fair (620-679)",
  "Poor (550-619)",
  "Challenged (below 550)",
  "Not sure",
];

const schema = z.object({
  timeInBusiness: z.string().min(1, "Select how long you've been in business"),
  amount: z
    .string()
    .min(1, "Enter how much you need")
    .refine((v) => Number(v.replace(/[^0-9]/g, "")) >= 1000, "Enter at least $1,000"),
  revenue: z.string().min(1, "Select your gross monthly revenue"),
  creditScore: z.string().min(1, "Select your stated credit score"),
  industry: z.string().min(1, "Select your industry"),
  firstName: z.string().trim().min(1, "First name is required").max(60),
  lastName: z.string().trim().min(1, "Last name is required").max(60),
  mobile: z
    .string()
    .trim()
    .min(10, "Enter a valid mobile number")
    .max(20)
    .regex(/^[0-9+()\-.\s]+$/, "Enter a valid mobile number"),
  businessName: z.string().trim().min(1, "Legal business name is required").max(120),
  email: z.string().trim().email("Enter a valid email address").max(255),
  terms: z.literal(true, { errorMap: () => ({ message: "Please accept the terms to continue" }) }),
});

type FormState = {
  timeInBusiness: string;
  amount: string;
  revenue: string;
  creditScore: string;
  industry: string;
  firstName: string;
  lastName: string;
  mobile: string;
  businessName: string;
  email: string;
  terms: boolean;
};

const EMPTY: FormState = {
  timeInBusiness: "",
  amount: "",
  revenue: "",
  creditScore: "",
  industry: "",
  firstName: "",
  lastName: "",
  mobile: "",
  businessName: "",
  email: "",
  terms: false,
};

const STEP_FIELDS: (keyof FormState)[][] = [
  ["timeInBusiness", "amount"],
  ["revenue", "creditScore", "industry"],
  ["firstName", "lastName", "mobile", "businessName", "email", "terms"],
];

const STEP_LABELS = ["Your business", "Funding profile", "Contact details"];

const CONSENT_TEXT =
  "I agree to the terms & conditions and consent to be contacted about funding options.";

const fieldCls =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-shadow focus:border-cobalt focus:ring-4 focus:ring-cobalt/15";
const labelCls = "mb-2 block text-sm font-semibold text-navy";

export function LeadForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [trap, setTrap] = useState("");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateStep = (index: number) => {
    const result = schema.safeParse(values);
    if (result.success) return true;
    const stepErrors: Partial<Record<keyof FormState, string>> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof FormState;
      if (STEP_FIELDS[index]?.includes(key) && !stepErrors[key]) stepErrors[key] = issue.message;
    }
    if (Object.keys(stepErrors).length === 0) return true;
    setErrors(stepErrors);
    return false;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 2));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending || !validateStep(2)) return;
    const result = schema.safeParse(values);
    if (!result.success) return;
    setSending(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          timeInBusiness: values.timeInBusiness,
          amount: values.amount,
          revenue: values.revenue,
          creditScore: values.creditScore,
          industry: values.industry,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.mobile,
          businessName: values.businessName,
          email: values.email,
          consent: values.terms,
          consentText: CONSENT_TEXT,
          pageUrl: window.location.href,
          website: trap,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !data.ok) throw new Error("failed");
      setDone(true);
      toast.success("Application received — a funding specialist will call you shortly.");
    } catch {
      toast.error("We couldn’t submit your request. Please try again in a moment.");
    } finally {
      setSending(false);
    }
  };

  const formatCurrency = (raw: string) => {
    const digits = raw.replace(/[^0-9]/g, "").slice(0, 9);
    return digits ? `$${Number(digits).toLocaleString("en-US")}` : "";
  };

  return (
    <section id="contact" className="bg-surface py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-balance-tight text-4xl font-extrabold text-navy md:text-5xl">
            Have Questions? We Are All Ears!
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Tell us a little about your business and we'll match you with the funding program that
            fits — line of credit, working capital, SBA, equipment or revenue-based. It takes about
            two minutes and there's no obligation.
          </p>
          <ul className="mt-8 space-y-3 text-sm font-medium text-navy/80">
            {[
              "No impact to your credit to review options",
              "A real funding specialist, not a call center",
              "Decisions in as little as 24 hours",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 size-5 shrink-0 text-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-lift md:p-9">
          {done ? (
            <div className="py-14 text-center">
              <div className="mx-auto grid size-14 place-items-center rounded-full bg-gold/20 text-gold-foreground">
                <Check className="size-7 text-navy" />
              </div>
              <h3 className="mt-5 text-2xl font-extrabold text-navy">Application received</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Thanks, {values.firstName}. A BFG Funds specialist will reach out shortly to review
                your options.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              {/* Honeypot for bots — hidden from people and assistive tech. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
                value={trap}
                onChange={(e) => setTrap(e.target.value)}
              />
              <div className="mb-8 flex items-center gap-3">
                {STEP_LABELS.map((label, i) => (
                  <div key={label} className="flex-1">
                    <div
                      className={`h-1.5 rounded-full transition-colors ${i <= step ? "bg-gold" : "bg-border"}`}
                    />
                    <span
                      className={`mt-2 block text-xs font-semibold ${i <= step ? "text-navy" : "text-muted-foreground"}`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {step === 0 && (
                <div className="space-y-5">
                  <div>
                    <label className={labelCls} htmlFor="timeInBusiness">
                      How long have you been operating your business?
                    </label>
                    <select
                      id="timeInBusiness"
                      className={fieldCls}
                      value={values.timeInBusiness}
                      onChange={(e) => set("timeInBusiness", e.target.value)}
                    >
                      <option value="">Select an option</option>
                      {TIME_IN_BUSINESS.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                    <FieldError message={errors.timeInBusiness} />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="amount">
                      How much do you need?
                    </label>
                    <input
                      id="amount"
                      inputMode="numeric"
                      placeholder="$50,000"
                      className={fieldCls}
                      value={values.amount}
                      onChange={(e) => set("amount", formatCurrency(e.target.value))}
                    />
                    <FieldError message={errors.amount} />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className={labelCls} htmlFor="revenue">
                      Gross monthly revenue
                    </label>
                    <select
                      id="revenue"
                      className={fieldCls}
                      value={values.revenue}
                      onChange={(e) => set("revenue", e.target.value)}
                    >
                      <option value="">Select a range</option>
                      {REVENUE_BANDS.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                    <FieldError message={errors.revenue} />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="creditScore">
                      Stated credit score
                    </label>
                    <select
                      id="creditScore"
                      className={fieldCls}
                      value={values.creditScore}
                      onChange={(e) => set("creditScore", e.target.value)}
                    >
                      <option value="">Select a range</option>
                      {CREDIT_BANDS.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                    <FieldError message={errors.creditScore} />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="industry">
                      Industry
                    </label>
                    <select
                      id="industry"
                      className={fieldCls}
                      value={values.industry}
                      onChange={(e) => set("industry", e.target.value)}
                    >
                      <option value="">Select your industry</option>
                      {INDUSTRIES.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                      <option>Other</option>
                    </select>
                    <FieldError message={errors.industry} />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelCls} htmlFor="firstName">
                        First name
                      </label>
                      <input
                        id="firstName"
                        className={fieldCls}
                        value={values.firstName}
                        onChange={(e) => set("firstName", e.target.value)}
                      />
                      <FieldError message={errors.firstName} />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="lastName">
                        Last name
                      </label>
                      <input
                        id="lastName"
                        className={fieldCls}
                        value={values.lastName}
                        onChange={(e) => set("lastName", e.target.value)}
                      />
                      <FieldError message={errors.lastName} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="mobile">
                      Mobile
                    </label>
                    <input
                      id="mobile"
                      type="tel"
                      className={fieldCls}
                      placeholder="(555) 555-5555"
                      value={values.mobile}
                      onChange={(e) => set("mobile", e.target.value)}
                    />
                    <FieldError message={errors.mobile} />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="businessName">
                      Legal business name
                    </label>
                    <input
                      id="businessName"
                      className={fieldCls}
                      value={values.businessName}
                      onChange={(e) => set("businessName", e.target.value)}
                    />
                    <FieldError message={errors.businessName} />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="email">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={fieldCls}
                      value={values.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                    <FieldError message={errors.email} />
                  </div>
                  <div>
                    <label className="flex items-start gap-3 text-sm text-muted-foreground">
                      <input
                        type="checkbox"
                        className="mt-0.5 size-4 rounded border-input accent-[var(--cobalt)]"
                        checked={values.terms}
                        onChange={(e) => set("terms", e.target.checked)}
                      />
                      <span>
                        I agree to the{" "}
                        <a href="#terms" className="font-semibold text-cobalt underline">
                          terms &amp; conditions
                        </a>{" "}
                        and consent to be contacted about funding options.
                      </span>
                    </label>
                    <FieldError message={errors.terms} />
                  </div>
                </div>
              )}

              <div className="mt-8 flex items-center justify-between gap-3">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-bold text-navy transition-colors hover:bg-surface"
                  >
                    <ArrowLeft className="size-4" />
                    Back
                  </button>
                ) : (
                  <span className="text-xs font-medium text-muted-foreground">
                    Step {step + 1} of 3
                  </span>
                )}

                {step < 2 ? (
                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-bold text-gold-foreground shadow-card transition-transform hover:-translate-y-0.5"
                  >
                    Continue
                    <ArrowRight className="size-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-bold text-gold-foreground shadow-card transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {sending ? "Submitting…" : "Submit Application"}
                    <ArrowRight className="size-4" />
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function FieldError({ message }: { message?: string | undefined }) {
  if (!message) return null;
  return <p className="mt-2 text-xs font-semibold text-destructive">{message}</p>;
}
