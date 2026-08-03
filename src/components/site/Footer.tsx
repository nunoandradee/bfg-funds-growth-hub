import { PHONE_DISPLAY, PHONE_TEL, SERVICES } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-navy py-14 text-navy-foreground">
      <div className="container-page grid gap-10 md:grid-cols-4">
        <div>
          <span className="text-lg font-extrabold tracking-tight">
            BFG <span className="text-gold">FUNDS</span>
          </span>
          <p className="mt-3 text-sm leading-relaxed text-navy-foreground/65">
            Fast, reliable funding for small and mid-sized U.S. businesses.
          </p>
          <a href={PHONE_TEL} className="mt-4 inline-block text-sm font-bold text-gold">
            {PHONE_DISPLAY}
          </a>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-navy-foreground/60">
            Funding
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-navy-foreground/75">
            {SERVICES.map((s) => (
              <li key={s.title}>
                <a href="#services" className="hover:text-gold">
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
                <a href="#insights" className="hover:text-gold">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-navy-foreground/60">
            Get funded
          </h3>
          <p className="mt-4 text-sm text-navy-foreground/70">
            Apply in minutes. No impact to your credit to see options.
          </p>
          <a
            href="#contact"
            className="mt-4 inline-block rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-gold-foreground"
          >
            Apply Now
          </a>
        </div>
      </div>
      <div className="container-page mt-12 border-t border-navy-foreground/15 pt-6 text-xs text-navy-foreground/55">
        © {new Date().getFullYear()} BFG Funds. All rights reserved. Not a bank. Funding subject to
        approval.
      </div>
    </footer>
  );
}
