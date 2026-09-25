import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";

import { SERVICES, RESOURCES } from "@/data/site";

function Dropdown({
  label,
  items,
}: {
  label: string;
  items: { title: string; href?: string; to?: string; slug?: string }[];
}) {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 py-6 text-sm font-semibold text-navy/80 transition-colors hover:text-cobalt">
        {label}
        <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 translate-y-1 rounded-xl border border-border bg-popover p-2 opacity-0 shadow-lift transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        {items.map((item) =>
          item.slug ? (
            <Link
              key={item.title}
              to="/services/$slug"
              params={{ slug: item.slug }}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-navy/80 transition-colors hover:bg-surface hover:text-cobalt"
            >
              {item.title}
            </Link>
          ) : (
            <a
              key={item.title}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-navy/80 transition-colors hover:bg-surface hover:text-cobalt"
            >
              {item.title}
            </a>
          ),
        )}
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="container-page flex items-center justify-between gap-6">
        <a href="/#top" className="flex shrink-0 items-center gap-2 py-4" aria-label="BFG Funds home">
          {/* Placeholder wordmark — swap for a real logo asset later */}
          <span className="grid size-9 place-items-center rounded-lg bg-navy text-sm font-extrabold text-navy-foreground">
            B
          </span>
          <span className="text-lg font-extrabold tracking-tight text-navy">
            BFG <span className="text-cobalt">FUNDS</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          <a href="/#top" className="py-6 text-sm font-semibold text-navy/80 hover:text-cobalt">
            Home
          </a>
          <a href="/#why" className="py-6 text-sm font-semibold text-navy/80 hover:text-cobalt">
            Why BFG Funds
          </a>
          <Dropdown
            label="Funding Services"
            items={SERVICES.map((s) => ({ title: s.title, slug: s.slug }))}
          />
          <a href="/#industries" className="py-6 text-sm font-semibold text-navy/80 hover:text-cobalt">
            Industries We Serve
          </a>
          <Dropdown label="Resources" items={RESOURCES} />
          <a href="/#contact" className="py-6 text-sm font-semibold text-navy/80 hover:text-cobalt">
            Contact Us
          </a>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="/#contact"
            className="text-sm font-bold text-navy hover:text-cobalt"
          >
            See Your Options
          </a>
          <a
            href="/apply"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-gold-foreground shadow-card transition-transform hover:-translate-y-0.5"
          >
            Apply Now
          </a>
        </div>

        <button
          className="rounded-lg p-2 text-navy lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {[
              { title: "Home", href: "/#top" },
              { title: "Why BFG Funds", href: "/#why" },

              { title: "Industries We Serve", href: "/#industries" },
              { title: "Resources", href: "/#insights" },
              { title: "Contact Us", href: "/#contact" },
            ].map((l) => (
              <a
                key={l.title}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-sm font-semibold text-navy/85 hover:bg-surface"
              >
                {l.title}
              </a>
            ))}
            <p className="px-2 pt-3 text-xs font-bold uppercase tracking-[0.2em] text-cobalt">
              Funding Services
            </p>
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-sm font-semibold text-navy/85 hover:bg-surface"
              >
                {s.title}
              </Link>
            ))}
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="px-2 py-3 text-sm font-bold text-cobalt"
            >
              See Your Options
            </a>
            <a
              href="/apply"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-full bg-gold px-5 py-3 text-center text-sm font-bold text-gold-foreground"
            >
              Apply Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
