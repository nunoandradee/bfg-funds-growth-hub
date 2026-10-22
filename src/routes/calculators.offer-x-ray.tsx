import { createFileRoute, Link } from "@tanstack/react-router";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { OfferXRay } from "@/components/site/OfferXRay";
import { CtaBand, Disclaimer, FaqList, PageHero } from "@/components/site/PageParts";
import { breadcrumbLd, faqLd, pageHead } from "@/lib/seo";

const PATH = "/calculators/offer-x-ray";

const WHERE = [
  {
    term: "Funding amount",
    text: "On a merchant cash advance contract this is the purchase price: what the funder pays for your future receivables, before fees.",
  },
  {
    term: "Fees taken out",
    text: "Origination, underwriting, UCC filing or similar fees subtracted before the money reaches your account. They change what you actually receive.",
  },
  {
    term: "Total payback",
    text: "The purchased amount, also called RTR (right to receive): everything you will hand back.",
  },
  {
    term: "Each payment",
    text: "The fixed daily or weekly debit. If yours is a percentage of sales, use your typical debit over the last few weeks.",
  },
];

const FAQS = [
  {
    q: "Why does the APR look so much higher than the factor rate?",
    a: "A factor rate is charged once on the whole amount, but you start paying it back right away and over a short term. APR spreads the cost over a year and accounts for that, which is why a 1.35 factor rate over six months can mean an APR well above 100%.",
  },
  {
    q: "Is a high APR always a bad deal?",
    a: "Not always. Fast, short-term funding costs more, and for a short-lived opportunity that can still make sense. The X-Ray shows the real cost so you can decide with the full picture and compare it with alternatives.",
  },
  {
    q: "Do you store the numbers I enter?",
    a: "No. The X-Ray runs entirely in your browser and nothing you type is sent to us. If you want a specialist to review an offer, you choose to send it.",
  },
  {
    q: "Can I check an offer from another company?",
    a: "Yes. That's what it's for. Enter the numbers from any offer, from any funder or bank, and compare up to three side by side.",
  },
];

export const Route = createFileRoute("/calculators/offer-x-ray")({
  head: () =>
    pageHead({
      title: "Offer X-Ray: See What a Funding Offer Really Costs | BFG Funds",
      description:
        "Free tool: enter the numbers from any business funding or merchant cash advance offer and see the real APR, total cost and warning signs. Compare up to three offers side by side.",
      path: PATH,
      jsonLd: [
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Calculators", path: "/calculators" },
          { name: "Offer X-Ray", path: PATH },
        ]),
        faqLd(FAQS),
      ],
    }),
  component: OfferXRayPage,
});

function OfferXRayPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          crumbs={[
            { name: "Home", to: "/" },
            { name: "Calculators", to: "/calculators" },
            { name: "Offer X-Ray" },
          ]}
          eyebrow="Free tool"
          title="Offer X-Ray: see what an offer really costs"
          intro="Already have an offer, from us or anyone else? Enter its numbers and see the real APR, the total cost and the warning signs. Compare up to three side by side."
        />
        <section className="py-14 md:py-20">
          <div className="container-page">
            <OfferXRay />
            <Disclaimer className="mt-6 max-w-3xl" />
            <p className="mt-2 max-w-3xl text-xs text-muted-foreground">
              Estimates assume equal fixed payments (252 business days per year for daily).
              Sales-based remittances vary, which changes the actual term and APR. Nothing you enter
              leaves your browser.{" "}
              <Link
                to="/resources/$slug"
                params={{ slug: "factor-rate-vs-apr" }}
                className="font-semibold text-cobalt underline"
              >
                Read: factor rate vs. APR
              </Link>
            </p>
          </div>
        </section>

        <section className="border-t border-border bg-surface py-16 md:py-20">
          <div className="container-page">
            <h2 className="max-w-2xl text-balance-tight text-3xl font-extrabold text-navy md:text-4xl">
              Where to find each number in your offer
            </h2>
            <dl className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
              {WHERE.map((w) => (
                <div key={w.term}>
                  <dt className="text-base font-extrabold text-navy">{w.term}</dt>
                  <dd className="mt-2 leading-relaxed text-muted-foreground">{w.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <FaqList faqs={FAQS} />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
