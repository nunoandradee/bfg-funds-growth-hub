import { createFileRoute, Link } from "@tanstack/react-router";
import { LockKeyhole, Phone, ShieldCheck } from "lucide-react";

import logoWhite from "@/assets/bfg-logo-white.svg.asset.json";
import { ApplicationForm } from "@/components/site/ApplicationForm";
import { COMPANY, FUNDING_DISCLAIMER } from "@/data/site";

const TITLE = "Apply for Business Funding | BFG Funds";
const DESCRIPTION =
  "Apply online for $10K–$2M in small business funding with BFG Funds. One secure application, no impact to your credit to review options.";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.bfgfunds.com/apply" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.bfgfunds.com/apply" }],
  }),
  component: ApplyPage,
});

const PROMISES = [
  "Seeing your options won't affect your credit score",
  "One specialist from application to funded",
  "Your SSN is encrypted the moment it reaches us and never stored in plain text",
];

const NEXT = [
  { title: "A specialist reviews your file", text: "Usually within one business day." },
  { title: "We bring you the offers", text: "Payment, total cost and term, side by side." },
  { title: "You decide", text: "No obligation to accept any offer." },
];

function ApplyPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* A slim header: the brand and a way to reach a person, nothing to wander off to. */}
      <header className="border-b border-white/10 bg-navy text-navy-foreground">
        <div className="container-page flex items-center justify-between gap-4 py-4">
          <Link to="/" aria-label="BFG Funds home" className="shrink-0">
            <img
              src={logoWhite.url}
              alt="BFG Funds"
              width={232}
              height={56}
              className="h-8 w-auto"
            />
          </Link>
          <div className="flex items-center gap-5 text-sm">
            <span className="hidden items-center gap-2 font-semibold text-navy-foreground/75 sm:inline-flex">
              <LockKeyhole aria-hidden className="size-4 text-gold" />
              Secure application
            </span>
            <a
              href={COMPANY.phoneHref}
              className="inline-flex items-center gap-2 font-bold hover:text-gold"
            >
              <Phone aria-hidden className="size-4 text-gold" />
              {COMPANY.phoneDisplay}
            </a>
          </div>
        </div>
      </header>

      <main className="py-10 md:py-14">
        <div className="container-page grid items-start gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10">
          <aside className="grain relative isolate overflow-hidden rounded-3xl bg-navy p-7 text-navy-foreground md:p-9 lg:sticky lg:top-8">
            <div className="relative z-[1]">
              <h1 className="text-balance-tight text-3xl font-extrabold md:text-4xl">
                One application. Real offers to compare.
              </h1>
              <p className="mt-4 leading-relaxed text-navy-foreground/75">
                From $10K to $2M. It takes about five minutes, and a funding specialist does the
                rest.
              </p>

              <ul className="mt-7 space-y-3 text-sm">
                {PROMISES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-white/10 pt-7">
                <p className="text-sm font-bold">What happens next</p>
                <ol className="mt-4 space-y-4">
                  {NEXT.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gold text-xs font-extrabold text-gold-foreground">
                        {i + 1}
                      </span>
                      <div className="text-sm">
                        <p className="font-bold">{step.title}</p>
                        <p className="mt-0.5 text-navy-foreground/65">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-8 border-t border-white/10 pt-7 text-sm text-navy-foreground/75">
                <p className="font-bold text-navy-foreground">Prefer to talk first?</p>
                <p className="mt-2">
                  Call{" "}
                  <a href={COMPANY.phoneHref} className="font-bold text-gold hover:underline">
                    {COMPANY.phoneDisplay}
                  </a>{" "}
                  or email{" "}
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="font-bold text-gold hover:underline"
                  >
                    {COMPANY.email}
                  </a>
                  .
                </p>
                <p className="mt-2">
                  {COMPANY.displayName} · {COMPANY.city}, {COMPANY.region}
                </p>
              </div>
            </div>
          </aside>
          <ApplicationForm />
        </div>
        <p className="container-page mt-8 max-w-4xl text-center text-xs leading-relaxed text-muted-foreground">
          {FUNDING_DISCLAIMER}
        </p>
        <footer className="container-page mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span>
            © {new Date().getFullYear()} {COMPANY.displayName}
          </span>
          <Link to="/privacy-policy" className="font-semibold text-cobalt">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="font-semibold text-cobalt">
            Terms of Service
          </Link>
          <Link to="/sms-terms" className="font-semibold text-cobalt">
            SMS Terms
          </Link>
        </footer>
      </main>
    </div>
  );
}
