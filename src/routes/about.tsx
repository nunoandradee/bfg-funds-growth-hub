import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { CtaBand, PageHero } from "@/components/site/PageParts";
import { INDUSTRY_PHOTOS } from "@/data/photos";
import { COMPANY } from "@/data/site";
import { breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About BFG Funds | How Our Business Funding Marketplace Works",
      description:
        "BFG Funds connects U.S. small businesses with independent lenders and funding providers. Learn how we work and what we commit to.",
      path: "/about",
      jsonLd: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]),
      ],
    }),
  component: AboutPage,
});

const STEPS = [
  {
    title: "One application, one specialist",
    text: "You apply once and work with a dedicated funding specialist — not a call center and not a dozen lenders calling you.",
  },
  {
    title: "We go to the market for you",
    text: "Your specialist reviews your business and presents your file to the independent lenders and funding providers in our network most likely to approve it at the best terms.",
  },
  {
    title: "You compare, you decide",
    text: "We lay out each offer's amount, total cost, payment and term side by side, and explain the trade-offs in plain English. You choose — or walk away.",
  },
  {
    title: "We stay with you",
    text: "From signing to funding and beyond, the same specialist helps you plan your next step, including moving to lower-cost funding as your business grows.",
  },
];

const COMMITMENTS = [
  "Reviewing your options does not affect your credit score.",
  "We show the total payback and payment of every offer before you sign.",
  "We tell you when a cheaper product fits better — even if it takes longer.",
  "We review existing debt before recommending additional funding.",
  "We collect your documents through secure upload links.",
  "You can opt out of texts at any time by replying STOP.",
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          crumbs={[{ name: "Home", to: "/" }, { name: "About" }]}
          eyebrow="About BFG Funds"
          title="Your partner in the business funding market"
          intro="Banks say no to most small businesses. Dozens of alternative lenders say yes — at very different prices. BFG Funds exists to help owners find the right one, understand the real cost and decide with confidence."
          image={INDUSTRY_PHOTOS["restaurants"]}
        />

        <section className="py-16 md:py-20">
          <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div>
              <h2 className="text-3xl text-navy md:text-4xl">Who we are</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {COMPANY.displayName} is a business funding marketplace based in Coconut Creek,
                Florida, serving small and mid-sized businesses across the United States. We are not
                a bank and we are not a direct lender: we work with a network of independent lenders
                and funding providers — from SBA lenders to equipment financiers, lines of credit
                and revenue-based funders — and match each business with the programs that fit it
                best.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Funding decisions depend on many factors: bank statements, revenue, time in
                business, credit profile, industry and existing debt. Our job is to understand your
                business well enough to present it to the right providers, then help you compare
                what comes back.
              </p>
            </div>
            <div className="self-start border-l-4 border-navy bg-surface p-7">
              <h2 className="text-xl text-navy">What we are not</h2>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                <li>We are not a bank and do not take deposits.</li>
                <li>
                  We do not make credit decisions; each provider approves and prices its own offers.
                </li>
                <li>We do not guarantee approval, amounts, rates or timing.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-surface py-16 md:py-20">
          <div className="container-page">
            <h2 className="text-3xl text-navy md:text-4xl">How working with us works</h2>
            <ol className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
              {STEPS.map(({ title, text }, i) => (
                <li
                  key={title}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-border pt-6"
                >
                  <span className="font-display text-3xl leading-none text-cobalt">{i + 1}</span>
                  <div>
                    <h3 className="text-lg text-navy">{title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 className="text-3xl text-navy md:text-4xl">Our commitments to you</h2>
              <p className="mt-4 text-muted-foreground">
                Read more in our{" "}
                <Link to="/privacy-policy" className="font-semibold text-cobalt underline">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link to="/terms-of-service" className="font-semibold text-cobalt underline">
                  Terms of Service
                </Link>
                .
              </p>
            </div>
            <ul className="divide-y divide-border border-y border-border">
              {COMMITMENTS.map((c) => (
                <li key={c} className="flex items-start gap-3 py-4 text-navy">
                  <Check className="mt-0.5 size-5 shrink-0 text-cobalt" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
