import { useState } from "react";

import logoHorizontal from "@/assets/bfg-logo-horizontal.svg.asset.json";

import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";

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

function Dropdown({ label, items }: { label: string; items: NavItem[] }) {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 py-6 text-sm font-semibold text-navy/80 transition-colors hover:text-cobalt group-focus-within:text-cobalt">
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

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="container-page flex items-center justify-between gap-6">
        <Link to="/" className="flex shrink-0 items-center py-4" aria-label="BFG Funds home">
          <img
            src={logoHorizontal.url}
            alt="BFG Funds"
            width={232}
            height={56}
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <Dropdown label="Funding Options" items={FUNDING} />
          <Link
            to="/industries"
            className="py-6 text-sm font-semibold text-navy/80 hover:text-cobalt"
          >
            Industries
          </Link>
          <Dropdown label="Calculators" items={TOOLS} />
          <Dropdown label="Resources" items={RESOURCES} />
          <Link to="/contact" className="py-6 text-sm font-semibold text-navy/80 hover:text-cobalt">
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={COMPANY.phoneHref} className="text-sm font-semibold text-navy hover:text-cobalt">
            {COMPANY.phoneDisplay}
          </a>
          <a
            href="/apply"
            className="rounded-md bg-gold px-5 py-2.5 text-sm font-bold text-gold-foreground transition-colors"
          >
            Apply now
          </a>
        </div>

        <button
          className="rounded-lg p-2 text-navy lg:hidden"
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
                { title: "Contact", href: "/contact" },
              ]}
              onNavigate={close}
            />
            <a
              href={COMPANY.phoneHref}
              onClick={close}
              className="px-2 py-3 text-sm font-bold text-cobalt"
            >
              Call {COMPANY.phoneDisplay}
            </a>
            <a
              href="/apply"
              onClick={close}
              className="mt-1 rounded-md bg-gold px-5 py-3 text-center text-sm font-bold text-gold-foreground"
            >
              Apply now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
