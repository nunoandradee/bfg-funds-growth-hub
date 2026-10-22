import { useEffect, useRef, useState } from "react";

import logoHorizontal from "@/assets/bfg-logo-horizontal.svg.asset.json";
import logoWhite from "@/assets/bfg-logo-white.svg.asset.json";

import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, Phone, X } from "lucide-react";

import { CALCULATORS } from "@/data/calculators";
import { COMPANY, SERVICES } from "@/data/site";

type NavItem = { title: string; href: string };

const FUNDING: NavItem[] = [
  ...SERVICES.map((s) => ({ title: s.title, href: `/services/${s.slug}` })),
  { title: "Compare all options", href: "/services" },
];

const TOOLS: NavItem[] = [
  ...CALCULATORS.map((c) => ({ title: c.title, href: c.path })),
  { title: "All calculators", href: "/calculators" },
];

const RESOURCES: NavItem[] = [
  { title: "Guides", href: "/resources" },
  { title: "FAQ", href: "/faq" },
  { title: "About BFG Funds", href: "/about" },
];

function Dropdown({ label, items, dark }: { label: string; items: NavItem[]; dark: boolean }) {
  return (
    <div className="group relative">
      <button
        className={`flex items-center gap-1 py-6 text-sm font-semibold transition-colors ${
          dark
            ? "text-navy-foreground/80 hover:text-gold group-focus-within:text-gold"
            : "text-navy/80 hover:text-cobalt group-focus-within:text-cobalt"
        }`}
      >
        {label}
        <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 translate-y-1 rounded-xl border border-border bg-popover p-2 opacity-0 shadow-lift transition-all group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-navy/80 transition-colors hover:bg-surface hover:text-cobalt"
          >
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
}

function MobileGroup({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: NavItem[];
  onNavigate: () => void;
}) {
  return (
    <>
      <p className="px-2 pt-3 text-xs font-bold uppercase tracking-[0.2em] text-cobalt">{label}</p>
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className="rounded-lg px-2 py-3 text-sm font-semibold text-navy/85 hover:bg-surface"
        >
          {item.title}
        </a>
      ))}
    </>
  );
}

/**
 * While a page opens on a navy band (the home hero, inner page headers) the
 * header wears the same navy so the two read as one surface; once that band
 * scrolls under it, the header turns into frosted white.
 */
function useOverDarkBand() {
  const [dark, setDark] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const band = ref.current?.parentElement?.querySelector("main > section:first-child");
    if (!band || !band.classList.contains("bg-navy") || !("IntersectionObserver" in window)) return;
    const headerHeight = ref.current?.offsetHeight ?? 72;
    const observer = new IntersectionObserver(
      ([entry]) => setDark(Boolean(entry?.isIntersecting)),
      {
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
      },
    );
    observer.observe(band);
    return () => observer.disconnect();
  }, []);
  return { ref, dark };
}

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const band = useOverDarkBand();
  const dark = band.dark && !open;
  const link = `py-6 text-sm font-semibold transition-colors ${
    dark ? "text-navy-foreground/80 hover:text-gold" : "text-navy/80 hover:text-cobalt"
  }`;

  return (
    <header
      ref={band.ref}
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        dark
          ? "border-transparent bg-navy"
          : "border-border/70 bg-background/85 backdrop-blur-xl backdrop-saturate-150"
      }`}
    >
      <div className="container-page flex items-center justify-between gap-6">
        <Link to="/" className="flex shrink-0 items-center py-4" aria-label="BFG Funds home">
          <img
            src={dark ? logoWhite.url : logoHorizontal.url}
            alt="BFG Funds"
            width={232}
            height={56}
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <Dropdown label="Funding Options" items={FUNDING} dark={dark} />
          <Link to="/industries" className={link}>
            Industries
          </Link>
          <Dropdown label="Calculators" items={TOOLS} dark={dark} />
          <Dropdown label="Resources" items={RESOURCES} dark={dark} />
          <Link to="/contact" className={link}>
            Contact Us
          </Link>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={COMPANY.phoneHref}
            className={`inline-flex items-center gap-2 text-sm font-bold transition-colors ${
              dark ? "text-navy-foreground hover:text-gold" : "text-navy hover:text-cobalt"
            }`}
          >
            <Phone aria-hidden className="size-4" />
            {COMPANY.phoneDisplay}
          </a>
          <a
            href="/apply"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-gold-foreground shadow-card transition-transform hover:-translate-y-0.5"
          >
            Apply Now
          </a>
        </div>

        <button
          className={`rounded-lg p-2 lg:hidden ${dark ? "text-navy-foreground" : "text-navy"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-border bg-background lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            <MobileGroup label="Funding Options" items={FUNDING} onNavigate={close} />
            <MobileGroup label="Calculators" items={TOOLS} onNavigate={close} />
            <MobileGroup
              label="Company"
              items={[
                { title: "Industries", href: "/industries" },
                ...RESOURCES,
                { title: "Contact Us", href: "/contact" },
              ]}
              onNavigate={close}
            />
            <a
              href="/apply"
              onClick={close}
              className="mt-3 rounded-full bg-gold px-5 py-3 text-center text-sm font-bold text-gold-foreground"
            >
              Apply Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
