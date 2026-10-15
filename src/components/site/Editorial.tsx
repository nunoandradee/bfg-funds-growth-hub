import { Link } from "@tanstack/react-router";
import { BadgeCheck, ExternalLink, Lightbulb } from "lucide-react";

import type { Source } from "@/data/guides";
import { COMPANY } from "@/data/site";

// Credibility building blocks for content pages: who reviewed it and when,
// a summary box, data tables, cited sources and the editorial promise.

export function anchorId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** "Written by … · Reviewed … · Updated …" line under a page title (dark background). */
export function EditorialByline({
  updated,
  readMinutes,
}: {
  updated: string;
  readMinutes?: number;
}) {
  return (
    <p className="mt-6 text-sm text-muted-foreground">
      Written and reviewed by the{" "}
      <Link
        to="/editorial-standards"
        className="font-semibold text-navy underline-offset-4 hover:underline"
      >
        {COMPANY.displayName} Editorial Team
      </Link>{" "}
      · Updated {formatDate(updated)}
      {readMinutes ? ` · ${readMinutes} min read` : ""}
    </p>
  );
}

export function KeyTakeaways({ items }: { items: readonly string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mb-8 border-l-4 border-navy bg-surface p-6">
      <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-navy">
        <Lightbulb className="size-4 text-navy" />
        Key takeaways
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-navy/85">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

export function DataTable({
  columns,
  rows,
  note,
}: {
  columns: readonly string[];
  rows: readonly (readonly string[])[];
  note?: string;
}) {
  return (
    <figure className="mt-6">
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="bg-surface text-xs font-bold uppercase tracking-wider text-navy/70">
            <tr>
              {columns.map((c) => (
                <th key={c} scope="col" className="p-4">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr key={row.join("|")} className="align-top">
                {row.map((cell, i) =>
                  i === 0 ? (
                    <th key={i} scope="row" className="p-4 font-bold text-navy">
                      {cell}
                    </th>
                  ) : (
                    <td key={i} className="p-4 text-navy/80">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <figcaption className="mt-2 text-xs text-muted-foreground">{note}</figcaption>}
    </figure>
  );
}

export function SourceList({ sources }: { sources: readonly Source[] }) {
  if (sources.length === 0) return null;
  return (
    <section className="mt-10 border-t border-border pt-6">
      <h2 className="text-sm font-bold uppercase tracking-widest text-navy/60">Sources</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-cobalt hover:underline"
            >
              {s.title}
              <ExternalLink className="size-3.5" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Sidebar box: why readers can rely on the content. */
export function WhyTrust() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-navy/60">
        <BadgeCheck className="size-4 text-cobalt" />
        Why trust this guide
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Our guides are written for business owners, reviewed for accuracy, cite official sources and
        are updated when programs or market conditions change. Lenders do not write, pay for or
        approve our content.
      </p>
      <Link
        to="/editorial-standards"
        className="mt-3 inline-block text-sm font-semibold text-cobalt hover:underline"
      >
        Our editorial standards
      </Link>
    </div>
  );
}
