import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Eye, Handshake, Network, ShieldCheck, UserRound } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { CtaBand, PageHero } from "@/components/site/PageParts";
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
    icon: UserRound,
    title: "One application, one specialist",
    text: "You apply once and work with a dedicated funding specialist — not a call center and not a dozen lenders calling you.",
  },
  {
    icon: Network,
    title: "We go to the market for you",
    text: "Your specialist reviews your business and presents your file to the independent lenders and funding providers in our network most likely to approve it at the best terms.",
  },
  {
    icon: Eye,
    title: "You compare, you decide",
    text: "We lay out each offer's amount, total cost, payment and term side by side, and explain the trade-offs in plain English. You choose — or walk away.",
  },
  {
    icon: Handshake,
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
        />

        <section className="py-16 md:py-20">
          <div className="container-page grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold text-navy md:text-4xl">Who we are</h2>
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
            <div className="rounded-3xl border border-border bg-surface p-8">
              <h2 className="text-xl font-extrabold text-navy">What we are not</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>We are not a bank and do not take deposits.</li>
                <li>
                  We do not make credit decisions; each provider approves and prices its own offers.
                </li>
                <li>We do not guarantee approval, amounts, rates or timing.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 md:py-20">
          <div className="container-page">
            <h2 className="text-3xl font-extrabold text-navy md:text-4xl">
              How working with us works
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {STEPS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl border border-border bg-card p-7">
                  <div className="grid size-11 place-items-center rounded-xl bg-cobalt text-cobalt-foreground">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <ShieldCheck className="size-10 text-cobalt" />
              <h2 className="mt-4 text-3xl font-extrabold text-navy md:text-4xl">
                Our commitments to you
              </h2>
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
            <ul className="grid gap-4 sm:grid-cols-2">
              {COMMITMENTS.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 text-sm font-semibold text-navy"
                >
                  <BadgeCheck className="size-5 shrink-0 text-gold" />
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
