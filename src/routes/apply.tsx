import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { ApplicationForm } from "@/components/site/ApplicationForm";

const TITLE = "Apply for Business Funding | BFG Funds";
const DESCRIPTION =
  "Apply online for $30K–$2M in small business funding with BFG Funds. One secure application, no impact to your credit to review options.";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ApplyPage,
});

function ApplyPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="py-14 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <aside className="lg:pt-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Funding application</p>
            <h1 className="text-balance-tight mt-3 text-4xl font-extrabold text-navy md:text-5xl">
              Get funded in as little as 24–48 hours
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              One secure application gives our funding specialists everything they need to match you with the right
              program — from $30K to $2M.
            </p>
            <ul className="mt-8 space-y-3 text-sm font-medium text-navy/80">
              {[
                "No impact to your credit to review options",
                "A dedicated funding specialist from apply to funded",
                "Bank-level encryption on every document",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
          <ApplicationForm />
        </div>
      </main>
    </div>
  );
}
