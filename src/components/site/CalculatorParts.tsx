import { useEffect, useState, type ReactNode } from "react";

export const usd = (n: number, digits = 0) =>
  Number.isFinite(n)
    ? n.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: digits,
        minimumFractionDigits: digits,
      })
    : "—";

export function NumberField({
  id,
  label,
  value,
  onChange,
  min,
  max,
  prefix,
  suffix,
  hint,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  /** Kept for callers; the field accepts any decimal. */
  step?: number;
  prefix?: string;
  suffix?: string;
  hint?: string;
}) {
  // The text being typed is kept as-is ("1." or an empty field mid-edit);
  // only complete numbers reach the calculation.
  const [text, setText] = useState(String(value));
  useEffect(() => {
    if (Number(text.replace(",", ".")) !== value) setText(String(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-bold text-navy">{label}</span>
      <span className="mt-1.5 flex items-center rounded-xl border border-input bg-background focus-within:border-cobalt focus-within:ring-2 focus-within:ring-cobalt/20">
        {prefix && (
          <span className="pl-4 text-sm font-semibold text-muted-foreground">{prefix}</span>
        )}
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={text}
          aria-describedby={hint ? `${id}-hint` : undefined}
          onChange={(e) => {
            const next = e.target.value.replace(/[^\d.,]/g, "");
            setText(next);
            const n = Number(next.replace(",", "."));
            if (next.trim() !== "" && Number.isFinite(n)) {
              onChange(n);
            }
          }}
          onBlur={() => {
            // Out-of-range values are pulled back in once the visitor leaves the field.
            const clamped = Math.min(max ?? Infinity, Math.max(min ?? -Infinity, value));
            if (clamped !== value) onChange(clamped);
            setText(String(clamped));
          }}
          className="w-full bg-transparent px-3 py-3 text-base font-semibold text-navy outline-none"
        />
        {suffix && (
          <span className="pr-4 text-sm font-semibold text-muted-foreground">{suffix}</span>
        )}
      </span>
      {hint && (
        <span id={`${id}-hint`} className="mt-1 block text-xs text-muted-foreground">
          {hint}
        </span>
      )}
    </label>
  );
}

export function SelectField<T extends string>({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: readonly { value: T; label: string }[];
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-bold text-navy">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-base font-semibold text-navy outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/20"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

/** Two-column calculator: inputs on the left, results on the right (stacked on phones). */
export function CalculatorShell({ inputs, results }: { inputs: ReactNode; results: ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
        {inputs}
      </div>
      <div
        className="rounded-3xl bg-navy p-6 text-navy-foreground shadow-lift md:p-8"
        aria-live="polite"
      >
        {results}
      </div>
    </div>
  );
}

export function ResultRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-navy-foreground/15 py-3 last:border-0">
      <dt className="text-sm text-navy-foreground/70">{label}</dt>
      <dd className={strong ? "text-2xl font-extrabold text-gold" : "text-lg font-bold"}>
        {value}
      </dd>
    </div>
  );
}

export const FREQUENCY_OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "weekly", label: "Weekly" },
  { value: "daily", label: "Daily (business days)" },
] as const;
