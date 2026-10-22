import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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

/** A collapsible group in the phone menu (native details/summary, keyboard friendly). */
function MobileSection({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: NavItem[];
  onNavigate: () => void;
}) {
  return (
    <details className="group border-b border-white/10">
      <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-2xl font-bold [&::-webkit-details-marker]:hidden">
        {label}
        <ChevronDown
          aria-hidden
          className="size-6 text-gold transition-transform duration-300 group-open:rotate-180"
        />
      </summary>
      <div className="-mt-1 flex flex-col pb-5">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className="rounded-xl py-2.5 text-lg font-medium text-navy-foreground/80 hover:text-gold"
          >
            {item.title}
          </a>
        ))}
      </div>
    </details>
  );
}

/**
 * Phones: the menu takes the whole screen on navy, with large, friendly links
 * and the two actions that matter (apply, call) always within thumb reach.
 * The page underneath stops scrolling while it is open; Esc closes it.
 */
function MobileMenu({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const link = "block border-b border-white/10 py-5 text-2xl font-bold hover:text-gold";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="mobile-menu fixed inset-0 z-[60] flex flex-col bg-navy text-navy-foreground lg:hidden"
    >
      <div className="container-page flex items-center justify-between py-4">
        <Link to="/" onClick={onClose} aria-label="BFG Funds home">
          <img src={logoWhite.url} alt="BFG Funds" width={232} height={56} className="h-9 w-auto" />
        </Link>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="grid size-11 place-items-center rounded-full bg-white/10 text-navy-foreground"
        >
          <X className="size-6" />
        </button>
      </div>

      <nav className="container-page flex-1 overflow-y-auto pb-6">
        <MobileSection label="Funding options" items={FUNDING} onNavigate={onClose} />
        <a href="/industries" onClick={onClose} className={link}>
          Industries
        </a>
        <MobileSection label="Calculators" items={TOOLS} onNavigate={onClose} />
        <a href="/resources" onClick={onClose} className={link}>
          Guides
        </a>
        <a href="/about" onClick={onClose} className={link}>
          About us
        </a>
        <a href="/faq" onClick={onClose} className={link}>
          FAQ
        </a>
        <a href="/contact" onClick={onClose} className={link}>
          Contact
        </a>
      </nav>

      <div className="container-page grid gap-3 border-t border-white/10 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
        <a
          href="/apply"
          onClick={onClose}
          className="rounded-full bg-gold py-4 text-center text-lg font-extrabold text-gold-foreground"
        >
          Apply Now
        </a>
        <a
          href={COMPANY.phoneHref}
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/25 py-3.5 text-lg font-bold"
        >
          <Phone aria-hidden className="size-5" />
          Call {COMPANY.phoneDisplay}
        </a>
      </div>
    </div>
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
  const close = useCallback(() => setOpen(false), []);
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

      {/* Portalled to <body>: the header's backdrop blur would otherwise trap a
          fixed overlay inside the header's own box. */}
      {open && createPortal(<MobileMenu onClose={close} />, document.body)}
    </header>
  );
}
