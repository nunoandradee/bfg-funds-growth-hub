import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, FileText, Lock, UploadCloud, X } from "lucide-react";

const STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA",
  "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR",
  "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

const ENTITY_TYPES = [
  "Limited Liability Company (LLC)",
  "Corporation",
  "Sole Proprietorship",
  "Partnership",
];

const AMOUNTS = [30_000, 50_000, 100_000, 250_000, 500_000, 1_000_000, 2_000_000];

const STEPS = ["Funding", "Business", "Owner", "Documents", "Review & sign"] as const;

const CONSENT_CONTACT =
  "I agree to receive calls, texts, and emails from BFG Funds regarding my application, including communications sent using automated technology. Consent is not a condition of funding. Message and data rates may apply.";
const CONSENT_SHARE =
  "I certify that the information provided is accurate and authorize BFG Funds to share my application with its lending partners and obtain a soft-pull credit report.";

const MAX_FILES = 6;
const MAX_FILE_BYTES = 10 * 1024 * 1024;

type Values = {
  amount: string;
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  ein: string;
  entityType: string;
  startDate: string; // MM/YYYY
  ownership: string;
  bStreet: string;
  bCity: string;
  bState: string;
  bZip: string;
  dob: string; // MM/DD/YYYY
  ssn: string;
  sameAddress: boolean;
  hStreet: string;
  hCity: string;
  hState: string;
  hZip: string;
};

const EMPTY: Values = {
  amount: "",
  fullName: "",
  email: "",
  phone: "",
  businessName: "",
  ein: "",
  entityType: "",
  startDate: "",
  ownership: "100",
  bStreet: "",
  bCity: "",
  bState: "",
  bZip: "",
  dob: "",
  ssn: "",
  sameAddress: false,
  hStreet: "",
  hCity: "",
  hState: "",
  hZip: "",
};

type Errors = Partial<Record<keyof Values | "files" | "signature" | "consent" | "submit", string | undefined>>;

const fieldCls =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-shadow focus:border-cobalt focus:ring-4 focus:ring-cobalt/15";
const labelCls = "mb-2 block text-sm font-semibold text-navy";

const digits = (v: string) => v.replace(/\D/g, "");
const money = (n: number) => `$${n.toLocaleString("en-US")}`;

function maskPhone(v: string) {
  const d = digits(v).slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}
function maskEin(v: string) {
  const d = digits(v).slice(0, 9);
  return d.length > 2 ? `${d.slice(0, 2)}-${d.slice(2)}` : d;
}
function maskSsn(v: string) {
  const d = digits(v).slice(0, 9);
  if (d.length < 4) return d;
  if (d.length < 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 5)}-${d.slice(5)}`;
}
function maskDate(v: string, parts: number) {
  const d = digits(v).slice(0, parts === 2 ? 6 : 8);
  if (parts === 2) return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  if (d.length < 3) return d;
  if (d.length < 5) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}
function validMonthYear(v: string) {
  const m = /^(\d{2})\/(\d{4})$/.exec(v);
  if (!m) return false;
  const mm = Number(m[1]);
  const yyyy = Number(m[2]);
  const now = new Date();
  return mm >= 1 && mm <= 12 && yyyy >= 1900 && (yyyy < now.getFullYear() || (yyyy === now.getFullYear() && mm <= now.getMonth() + 1));
}
function validDob(v: string) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(v);
  if (!m) return false;
  const d = new Date(Number(m[3]), Number(m[1]) - 1, Number(m[2]));
  if (d.getMonth() !== Number(m[1]) - 1 || d.getDate() !== Number(m[2])) return false;
  const age = (Date.now() - d.getTime()) / (365.25 * 24 * 3600 * 1000);
  return age >= 18 && age <= 110;
}

function validate(step: number, v: Values, files: File[], signed: boolean, consents: [boolean, boolean]): Errors {
  const e: Errors = {};
  // Only name + email + amount are required so you can be contacted and matched.
  // Everything else (phone, EIN, SSN, DOB, addresses, documents, signature, consents)
  // is optional — fill in what you have and a specialist will follow up.
  if (step === 0) {
    if (Number(digits(v.amount)) < 5000) e.amount = "Enter the amount you need (at least $5,000).";
    if (v.fullName.trim().length < 2) e.fullName = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Enter a valid email address.";
  }
  if (step === 3) {
    if (files.length > MAX_FILES) e.files = `Upload up to ${MAX_FILES} files.`;
  }
  void v; void signed; void consents;
  return e;
}

export function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [v, setV] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [files, setFiles] = useState<File[]>([]);
  const [signed, setSigned] = useState(false);
  const [consents, setConsents] = useState<[boolean, boolean]>([false, false]);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [trap, setTrap] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Prefill the amount from ?amount= (e.g. links from the home page).
  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("amount");
    if (raw && Number(digits(raw)) > 0) setV((s) => ({ ...s, amount: money(Number(digits(raw))) }));
  }, []);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setV((s) => ({ ...s, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined, submit: undefined }));
  };

  const go = (to: number) => {
    setStep(to);
    setErrors({});
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const next = () => {
    const e = validate(step, v, files, signed, consents);
    if (Object.keys(e).length) return setErrors(e);
    go(step + 1);
  };

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    const bad = incoming.find(
      (f) => !(f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")) || f.size > MAX_FILE_BYTES,
    );
    if (bad) return setErrors((e) => ({ ...e, files: "Only PDF files up to 10 MB each." }));
    setFiles((cur) => [...cur, ...incoming].slice(0, MAX_FILES));
    setErrors((e) => ({ ...e, files: undefined }));
  };

  async function submit() {
    const e = validate(4, v, files, signed, consents);
    if (Object.keys(e).length) return setErrors(e);
    setSending(true);
    setErrors({});
    const home = v.sameAddress
      ? { street: v.bStreet, city: v.bCity, state: v.bState, zip: v.bZip }
      : { street: v.hStreet, city: v.hCity, state: v.hState, zip: v.hZip };
    const [mm, yyyy] = v.startDate.split("/");
    const fd = new FormData();
    fd.set("full_name", v.fullName.trim());
    fd.set("email_address", v.email.trim());
    fd.set("contact_number", digits(v.phone));
    fd.set("requested_amount", digits(v.amount));
    fd.set("business_legal_name", v.businessName.trim());
    fd.set("business_tax_id", digits(v.ein));
    fd.set("entity_type", v.entityType);
    fd.set("business_start_date", `${mm}/01/${yyyy}`);
    fd.set("ownership_percentage", String(Number(v.ownership)));
    fd.set("business_street", v.bStreet.trim());
    fd.set("business_city", v.bCity.trim());
    fd.set("business_state", v.bState);
    fd.set("business_zip", v.bZip);
    fd.set("business_country", "US");
    fd.set("business_address", `${v.bStreet.trim()}, ${v.bCity.trim()}, ${v.bState} ${v.bZip}`);
    fd.set("date_of_birth", v.dob);
    fd.set("ssn", digits(v.ssn));
    fd.set("home_street", home.street.trim());
    fd.set("home_city", home.city.trim());
    fd.set("home_state", home.state);
    fd.set("home_zip", home.zip);
    fd.set("home_country", "US");
    fd.set("home_address", `${home.street.trim()}, ${home.city.trim()}, ${home.state} ${home.zip}`);
    fd.set("signature", canvasRef.current?.toDataURL("image/png") ?? "");
    fd.set("communication_consent", "agreed");
    fd.set("language", "en");
    fd.set("assigned_to", "mike");
    fd.set("website", trap);
    files.forEach((f) => fd.append("bank_statements", f));

    try {
      const res = await fetch("/api/apply", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setErrors({ submit: data.error ?? "We couldn’t submit your application. Please try again in a moment." });
        return;
      }
      setDone(true);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setErrors({ submit: "Connection problem. Please check your internet and try again." });
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div ref={topRef} className="rounded-3xl border border-border bg-card p-8 text-center shadow-lift md:p-12">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-gold/20">
          <Check className="size-8 text-navy" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-navy">Application submitted</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Thank you, {v.fullName.trim().split(/\s+/)[0]}. A BFG Funds specialist is reviewing your application and will
          reach out with next steps — usually within one business day.
        </p>
      </div>
    );
  }

  return (
    <div ref={topRef} className="scroll-mt-24 rounded-3xl border border-border bg-card p-6 shadow-lift md:p-9">
      <div className="mb-8 flex items-center gap-2 sm:gap-3">
        {STEPS.map((label, i) => (
          <div key={label} className="flex-1">
            <div className={`h-1.5 rounded-full transition-colors ${i <= step ? "bg-gold" : "bg-border"}`} />
            <span
              className={`mt-2 hidden text-xs font-semibold sm:block ${i <= step ? "text-navy" : "text-muted-foreground"}`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      <p className="mb-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:hidden">
        Step {step + 1} of {STEPS.length} · {STEPS[step]}
      </p>

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

      {step === 0 && (
        <Section title="How much funding do you need?" sub="From $30K to $2M. Checking your options won't affect your credit score.">
          <Field label="Amount" error={errors.amount}>
            <input
              inputMode="numeric"
              placeholder="$100,000"
              className={fieldCls}
              value={v.amount}
              onChange={(e) => set("amount", digits(e.target.value) ? money(Number(digits(e.target.value).slice(0, 9))) : "")}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {AMOUNTS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => set("amount", money(a))}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors ${
                    digits(v.amount) === String(a)
                      ? "border-navy bg-navy text-navy-foreground"
                      : "border-border text-navy hover:border-navy"
                  }`}
                >
                  {a >= 1_000_000 ? `$${a / 1_000_000}M` : `$${a / 1000}K`}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Full legal name" error={errors.fullName}>
            <input className={fieldCls} autoComplete="name" value={v.fullName} onChange={(e) => set("fullName", e.target.value)} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Email" error={errors.email}>
              <input type="email" autoComplete="email" className={fieldCls} value={v.email} onChange={(e) => set("email", e.target.value)} />
            </Field>
            <Field label="Mobile (optional)" error={errors.phone}>
              <input
                type="tel"
                autoComplete="tel-national"
                placeholder="(555) 555-5555"
                className={fieldCls}
                value={v.phone}
                onChange={(e) => set("phone", maskPhone(e.target.value))}
              />
            </Field>
          </div>
        </Section>
      )}

      {step === 1 && (
        <Section title="About your business (optional)" sub="Fill in what you have — a specialist can help you complete the rest.">
          <Field label="Legal business name (optional)" error={errors.businessName}>
            <input className={fieldCls} autoComplete="organization" value={v.businessName} onChange={(e) => set("businessName", e.target.value)} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="EIN (Tax ID) (optional)" error={errors.ein}>
              <input inputMode="numeric" placeholder="12-3456789" className={fieldCls} value={v.ein} onChange={(e) => set("ein", maskEin(e.target.value))} />
            </Field>
            <Field label="Entity type (optional)" error={errors.entityType}>
              <select className={fieldCls} value={v.entityType} onChange={(e) => set("entityType", e.target.value)}>
                <option value="">Select an option</option>
                {ENTITY_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Business start date (optional)" error={errors.startDate}>
              <input inputMode="numeric" placeholder="MM/YYYY" className={fieldCls} value={v.startDate} onChange={(e) => set("startDate", maskDate(e.target.value, 2))} />
            </Field>
            <Field label="Your ownership % (optional)" error={errors.ownership}>
              <input inputMode="numeric" className={fieldCls} value={v.ownership} onChange={(e) => set("ownership", digits(e.target.value).slice(0, 3))} />
            </Field>
          </div>
          <Address
            prefix="Business address (optional)"
            street={v.bStreet}
            city={v.bCity}
            state={v.bState}
            zip={v.bZip}
            errors={{ street: errors.bStreet, city: errors.bCity, state: errors.bState, zip: errors.bZip }}
            onChange={(k, val) => set(({ street: "bStreet", city: "bCity", state: "bState", zip: "bZip" } as const)[k], val)}
          />
        </Section>
      )}

      {step === 2 && (
        <Section title="About you (optional)" sub="Helpful for verification, but not required to start. Your data is encrypted.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Date of birth (optional)" error={errors.dob}>
              <input inputMode="numeric" placeholder="MM/DD/YYYY" autoComplete="bday" className={fieldCls} value={v.dob} onChange={(e) => set("dob", maskDate(e.target.value, 3))} />
            </Field>
            <Field label="Social Security Number (optional)" error={errors.ssn}>
              <input inputMode="numeric" placeholder="123-45-6789" autoComplete="off" className={fieldCls} value={v.ssn} onChange={(e) => set("ssn", maskSsn(e.target.value))} />
            </Field>
          </div>
          <label className="flex items-center gap-3 text-sm font-semibold text-navy">
            <input
              type="checkbox"
              className="size-4 rounded accent-[var(--cobalt)]"
              checked={v.sameAddress}
              onChange={(e) => set("sameAddress", e.target.checked)}
            />
            My home address is the same as the business address
          </label>
          {!v.sameAddress && (
            <Address
              prefix="Home address"
              street={v.hStreet}
              city={v.hCity}
              state={v.hState}
              zip={v.hZip}
              errors={{ street: errors.hStreet, city: errors.hCity, state: errors.hState, zip: errors.hZip }}
              onChange={(k, val) => set(({ street: "hStreet", city: "hCity", state: "hState", zip: "hZip" } as const)[k], val)}
            />
          )}
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="size-3.5" /> Protected with bank-level encryption. A soft credit pull does not affect your score.
          </p>
        </Section>
      )}

      {step === 3 && (
        <Section
          title="Bank statements"
          sub="Upload your last 3 months of business bank statements for a faster decision. You can also send them later."
        >
          <label
            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-surface px-6 py-10 text-center transition-colors hover:border-cobalt"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              addFiles(e.dataTransfer.files);
            }}
          >
            <UploadCloud className="size-8 text-cobalt" />
            <span className="mt-3 text-sm font-bold text-navy">Drop PDFs here or click to browse</span>
            <span className="mt-1 text-xs text-muted-foreground">Up to 6 files · PDF · 10 MB each</span>
            <input
              type="file"
              accept="application/pdf,.pdf"
              multiple
              className="hidden"
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </label>
          {errors.files && <FieldError message={errors.files} />}
          {files.length > 0 && (
            <ul className="space-y-2">
              {files.map((f, i) => (
                <li key={`${f.name}-${i}`} className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm">
                  <FileText className="size-4 shrink-0 text-cobalt" />
                  <span className="min-w-0 flex-1 truncate font-medium text-navy">{f.name}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${f.name}`}
                    onClick={() => setFiles((cur) => cur.filter((_, j) => j !== i))}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Section>
      )}

      {step === 4 && (
        <Section title="Review and sign" sub="Confirm your details and sign to submit your application.">
          <dl className="grid gap-x-6 gap-y-3 rounded-2xl bg-surface p-5 text-sm sm:grid-cols-2">
            <Summary label="Amount requested" value={v.amount} />
            <Summary label="Applicant" value={v.fullName} />
            <Summary label="Business" value={v.businessName} />
            <Summary label="Email" value={v.email} />
            <Summary label="Mobile" value={v.phone} />
            <Summary label="Bank statements" value={files.length ? `${files.length} file(s)` : "Send later"} />
          </dl>
          <SignaturePad canvasRef={canvasRef} onSigned={setSigned} />
          {errors.signature && <FieldError message={errors.signature} />}
          <div className="space-y-3">
            {[CONSENT_CONTACT, CONSENT_SHARE].map((text, i) => (
              <label key={i} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                <input
                  type="checkbox"
                  className="mt-1 size-4 shrink-0 rounded accent-[var(--cobalt)]"
                  checked={consents[i]}
                  onChange={(e) => {
                    const next: [boolean, boolean] = [...consents] as [boolean, boolean];
                    next[i] = e.target.checked;
                    setConsents(next);
                    setErrors((er) => ({ ...er, consent: undefined }));
                  }}
                />
                <span>{text}</span>
              </label>
            ))}
            {errors.consent && <FieldError message={errors.consent} />}
          </div>
        </Section>
      )}

      {errors.submit && (
        <p className="mt-6 rounded-xl bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">{errors.submit}</p>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => go(step - 1)}
            disabled={sending}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-bold text-navy transition-colors hover:bg-surface disabled:opacity-60"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
        ) : (
          <span className="text-xs font-medium text-muted-foreground">Takes about 5 minutes</span>
        )}
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-bold text-gold-foreground shadow-card transition-transform hover:-translate-y-0.5"
          >
            {step === 3 && files.length === 0 ? "Skip for now" : "Continue"}
            <ArrowRight className="size-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={sending}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-bold text-gold-foreground shadow-card transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {sending ? "Submitting…" : "Submit application"}
            {!sending && <ArrowRight className="size-4" />}
          </button>
        )}
      </div>
    </div>
  );
}

function Section({ title, sub, children }: { title: string; sub: string; children: ReactNode }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-extrabold text-navy">{title}</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">{sub}</p>
      </div>
      {children}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string | undefined; children: ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
      <FieldError message={error} />
    </div>
  );
}

function FieldError({ message }: { message?: string | undefined }) {
  if (!message) return null;
  return <p className="mt-2 text-xs font-semibold text-destructive">{message}</p>;
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-semibold text-navy">{value || "—"}</dd>
    </div>
  );
}

function Address({
  prefix,
  street,
  city,
  state,
  zip,
  errors,
  onChange,
}: {
  prefix: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  errors: { street?: string | undefined; city?: string | undefined; state?: string | undefined; zip?: string | undefined };
  onChange: (key: "street" | "city" | "state" | "zip", value: string) => void;
}) {
  return (
    <div className="space-y-5">
      <Field label={prefix} error={errors.street}>
        <input className={fieldCls} placeholder="Street address" autoComplete="street-address" value={street} onChange={(e) => onChange("street", e.target.value)} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-[1fr_120px_120px]">
        <Field label="City" error={errors.city}>
          <input className={fieldCls} autoComplete="address-level2" value={city} onChange={(e) => onChange("city", e.target.value)} />
        </Field>
        <Field label="State" error={errors.state}>
          <select className={fieldCls} value={state} onChange={(e) => onChange("state", e.target.value)}>
            <option value="">—</option>
            {STATES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="ZIP" error={errors.zip}>
          <input inputMode="numeric" autoComplete="postal-code" className={fieldCls} value={zip} onChange={(e) => onChange("zip", digits(e.target.value).slice(0, 5))} />
        </Field>
      </div>
    </div>
  );
}

function SignaturePad({
  canvasRef,
  onSigned,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  onSigned: (signed: boolean) => void;
}) {
  const drawing = useRef(false);
  const [hasInk, setHasInk] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#13294B";
  }, [canvasRef]);

  const point = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    setHasInk(false);
    onSigned(false);
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className={labelCls.replace("mb-2 ", "")}>Signature</span>
        {hasInk && (
          <button type="button" onClick={clear} className="text-xs font-bold text-cobalt hover:underline">
            Clear
          </button>
        )}
      </div>
      <canvas
        ref={canvasRef}
        className="h-36 w-full touch-none rounded-2xl border border-input bg-background"
        onPointerDown={(e) => {
          const ctx = canvasRef.current?.getContext("2d");
          if (!ctx) return;
          drawing.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          const p = point(e);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
        }}
        onPointerMove={(e) => {
          if (!drawing.current) return;
          const ctx = canvasRef.current?.getContext("2d");
          if (!ctx) return;
          const p = point(e);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
          if (!hasInk) {
            setHasInk(true);
            onSigned(true);
          }
        }}
        onPointerUp={() => {
          drawing.current = false;
        }}
      />
      {!hasInk && <p className="mt-2 text-xs text-muted-foreground">Sign with your finger or mouse.</p>}
    </div>
  );
}
