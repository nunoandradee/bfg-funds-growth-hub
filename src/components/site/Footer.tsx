import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import logoWhite from "@/assets/bfg-logo-white.svg.asset.json";
import { COMPANY, SERVICES } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-navy py-14 text-navy-foreground">
      <div className="container-page grid gap-10 md:grid-cols-4">
        <div>
          <img
            src={logoWhite.url}
            alt="BFG Funds"
            width={232}
            height={56}
            className="h-9 w-auto"
          />
          <p className="mt-3 text-sm leading-relaxed text-navy-foreground/65">
            Fast, reliable funding for small and mid-sized U.S. businesses.
          </p>
          <Link to="/contact" className="mt-4 inline-block text-sm font-bold text-gold">
            See Your Options
          </Link>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-navy-foreground/60">
            Funding
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-navy-foreground/75">
            {SERVICES.map((s) => (
              <li key={s.title}>
                <a href="/#services" className="hover:text-gold">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-navy-foreground/60">
            Company
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-navy-foreground/75">
            {["About", "Industries We Serve", "Blog", "Careers", "Case Studies"].map((l) => (
              <li key={l}>
                <a href="/#insights" className="hover:text-gold">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-navy-foreground/60">
            Contact
          </h3>
          <address className="mt-4 space-y-3 text-sm not-italic text-navy-foreground/75">
            <p className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-gold" />{COMPANY.address}</p>
            <a href={COMPANY.phoneHref} className="flex items-center gap-2 hover:text-gold"><Phone className="size-4 text-gold" />{COMPANY.phoneDisplay}</a>
            <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:text-gold"><Mail className="size-4 text-gold" />{COMPANY.email}</a>
          </address>
        </div>
      </div>
      <div className="container-page mt-12 flex flex-col gap-4 border-t border-navy-foreground/15 pt-6 text-xs text-navy-foreground/55 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {COMPANY.displayName}. All rights reserved. Not a bank. Funding subject to approval.</p>
        <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link to="/privacy-policy" className="hover:text-gold">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-gold">Terms of Service</Link>
          <Link to="/sms-terms" className="hover:text-gold">SMS Terms &amp; Opt-Out</Link>
          <Link to="/contact" className="hover:text-gold">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
