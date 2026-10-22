import { ExternalLink, Lock, Star } from "lucide-react";

import { DATA_PROMISE, DATA_PROMISE_CONFIRMED, REVIEWS, TEAM } from "@/data/trust";

/** Public review ratings, each linking to its source. Hidden until REVIEWS has entries. */
export function ReviewStrip({ dark = false }: { dark?: boolean }) {
  if (REVIEWS.length === 0) return null;
  return (
    <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
      {REVIEWS.map((r) => (
        <li key={r.source}>
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex items-center gap-2 text-sm font-semibold ${
              dark ? "text-navy-foreground/85" : "text-navy"
            }`}
          >
            <Star aria-hidden className="size-4 fill-gold text-gold" />
            {r.rating.toFixed(1)} on {r.source}
            <span className={dark ? "text-navy-foreground/55" : "text-muted-foreground"}>
              ({r.count.toLocaleString("en-US")} reviews)
            </span>
            <ExternalLink aria-hidden className="size-3.5 opacity-50 group-hover:opacity-100" />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** The data promise, once confirmed. Hidden until DATA_PROMISE_CONFIRMED is true. */
export function DataPromise({ dark = false }: { dark?: boolean }) {
  if (!DATA_PROMISE_CONFIRMED) return null;
  return (
    <p
      className={`flex items-start gap-2.5 text-sm font-semibold ${
        dark ? "text-navy-foreground" : "text-navy"
      }`}
    >
      <Lock aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
      {DATA_PROMISE}
    </p>
  );
}

/** The people behind BFG Funds. Hidden until TEAM has entries. */
export function TeamSection() {
  if (TEAM.length === 0) return null;
  return (
    <section className="py-16 md:py-20">
      <div className="container-page">
        <h2 className="text-balance-tight text-3xl font-extrabold text-navy md:text-4xl">
          The people you'll talk to
        </h2>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m) => (
            <li key={m.name}>
              {m.photo && (
                <img
                  src={m.photo}
                  alt={m.name}
                  loading="lazy"
                  className="aspect-[4/5] w-full rounded-3xl object-cover"
                />
              )}
              <p className="mt-5 text-xl font-extrabold text-navy">{m.name}</p>
              <p className="text-sm font-semibold text-cobalt">{m.role}</p>
              {m.experience && <p className="mt-1 text-sm text-muted-foreground">{m.experience}</p>}
              <p className="mt-3 leading-relaxed text-muted-foreground">{m.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
