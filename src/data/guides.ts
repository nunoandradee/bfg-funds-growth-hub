export type GuideSection = {
  heading: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  table?: { columns: readonly string[]; rows: readonly (readonly string[])[]; note?: string };
};

export type Source = { title: string; url: string };

/** Official and primary sources cited by the guides. */
export const SOURCES = {
  sba7a: {
    title: "U.S. Small Business Administration — 7(a) loans",
    url: "https://www.sba.gov/funding-programs/loans/7a-loans",
  },
  sba504: {
    title: "U.S. Small Business Administration — 504 loans",
    url: "https://www.sba.gov/funding-programs/loans/504-loans",
  },
  sbaTerms: {
    title: "U.S. Small Business Administration — Terms, conditions and eligibility",
    url: "https://www.sba.gov/partners/lenders/7a-loan-program/terms-conditions-eligibility",
  },
  fedSbcs: {
    title: "Federal Reserve — Small Business Credit Survey",
    url: "https://www.fedsmallbusiness.org/survey",
  },
  fedPrime: {
    title: "Federal Reserve — Selected Interest Rates (H.15), bank prime loan rate",
    url: "https://www.federalreserve.gov/releases/h15/",
  },
  irs179: {
    title: "IRS — Section 179 deduction (Publication 946)",
    url: "https://www.irs.gov/publications/p946",
  },
} satisfies Record<string, Source>;

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  /** ISO date the guide was last reviewed. */
  updated: string;
  readMinutes: number;
  /** Short summary box shown at the top of the guide. */
  takeaways: readonly string[];
  sections: readonly GuideSection[];
  sources: readonly Source[];
  /** Related service slugs. */
  services: readonly string[];
};

export const GUIDES: readonly Guide[] = [
  {
    slug: "business-loan-rates",
    title: "Business Loan Rates: Typical Ranges by Product",
    description:
      "Typical small business loan rates and costs by product — bank vs. online lenders, SBA rate caps, factor rates and factoring fees — and what drives your rate.",
    category: "Costs & Rates",
    updated: "2026-10-15",
    readMinutes: 6,
    takeaways: [
      "Bank and SBA loans are the cheapest but hardest to get; online and alternative products cost more and decide faster.",
      "SBA 7(a) rates are capped at the Prime rate plus a maximum spread that depends on loan size.",
      "Your rate depends mostly on revenue, time in business, credit, existing debt and the product you choose.",
    ],
    services: ["term-loan", "business-line-of-credit", "sba-loans", "merchant-cash-advance"],
    sources: [SOURCES.sbaTerms, SOURCES.sba7a, SOURCES.fedPrime, SOURCES.fedSbcs],
    sections: [
      {
        heading: "Typical cost ranges by product",
        paragraphs: [
          "The ranges below are approximate and reflect the broad market for U.S. small business funding. Rates move with the Prime rate, and every lender prices each business individually.",
        ],
        table: {
          columns: ["Product", "Banks & SBA lenders", "Online & alternative providers"],
          rows: [
            ["Term loan", "Roughly single digits to mid-teens APR", "Low teens to 40%+ APR"],
            [
              "Business line of credit",
              "Roughly single digits to mid-teens APR",
              "Low teens to 50%+ APR, plus possible draw fees",
            ],
            ["SBA 7(a) loan", "Prime + a capped spread (see below)", "—"],
            [
              "Equipment financing",
              "Single digits to low teens APR",
              "Low teens to 30%+ APR, depending on credit and asset",
            ],
            ["Working capital / revenue-based", "—", "Factor rate about 1.10–1.45"],
            ["Merchant cash advance", "—", "Factor rate about 1.15–1.50"],
            ["Invoice factoring", "—", "About 1%–5% of the invoice per month outstanding"],
          ],
          note: "Approximate market ranges for illustration only; not an offer or a quote.",
        },
      },
      {
        heading: "SBA 7(a) maximum interest rates",
        paragraphs: [
          "The SBA caps what lenders may charge on 7(a) loans. For variable-rate loans, the maximum is a base rate (commonly the Prime rate) plus a spread that shrinks as the loan gets larger:",
        ],
        table: {
          columns: ["Loan amount", "Maximum variable rate"],
          rows: [
            ["$50,000 or less", "Base rate + 6.5%"],
            ["$50,001 – $250,000", "Base rate + 6.0%"],
            ["$250,001 – $350,000", "Base rate + 4.5%"],
            ["More than $350,000", "Base rate + 3.0%"],
          ],
          note: "Fixed-rate caps are higher. Check the SBA's current terms before relying on these figures.",
        },
      },
      {
        heading: "What determines your rate",
        bullets: [
          "Monthly revenue and how consistent your deposits are",
          "Time in business",
          "Personal credit score of the owners",
          "Existing debt and open advances",
          "Collateral (equipment, receivables, real estate)",
          "Term length and payment frequency",
        ],
      },
      {
        heading: "How to compare rates fairly",
        paragraphs: [
          "Rates are quoted in different ways — APR, interest rate, factor rate or a monthly factoring fee. Convert offers to the same terms: total amount repaid, payment amount and frequency, and fees taken out of the funding. Our factor rate calculator converts a factor rate into an estimated APR.",
        ],
      },
    ],
  },
  {
    slug: "how-to-get-a-small-business-loan",
    title: "How to Get a Small Business Loan: A Step-by-Step Guide",
    description:
      "The practical steps to get small business funding: know your numbers, pick the right product, prepare documents and compare offers.",
    category: "Getting Started",
    updated: "2026-10-15",
    readMinutes: 7,
    takeaways: [
      "Start from the purpose: one-time investments fit term, SBA or equipment financing; recurring needs fit a line of credit or working capital.",
      "Most decisions start with your last 4 months of business bank statements, time in business and credit.",
      "Compare offers on total payback and payment schedule, not just the quoted rate.",
    ],
    sources: [SOURCES.fedSbcs, SOURCES.sba7a],
    services: ["term-loan", "business-line-of-credit", "working-capital"],
    sections: [
      {
        heading: "1. Decide what the money is for",
        paragraphs: [
          "The purpose of the funding points to the right product. A one-time purchase with a long payoff (a building, a major piece of equipment, an acquisition) fits a term loan, SBA loan or equipment financing. Recurring or unpredictable needs (payroll gaps, inventory, slow months) fit a line of credit or working capital.",
          "Write down the amount, what it will pay for, and how the business will repay it. Lenders ask these questions, and having clear answers makes every conversation faster.",
        ],
      },
      {
        heading: "2. Know your numbers",
        paragraphs: ["Before applying, gather the figures every provider will look at:"],
        bullets: [
          "Average monthly revenue (deposits) over the last 4–6 months",
          "Time in business, counted from your business formation or first revenue",
          "Personal credit score of the owners",
          "Existing business debt, including any open advances",
          "Number of negative-balance days or overdrafts in recent statements",
        ],
      },
      {
        heading: "3. Match the product to your profile",
        paragraphs: [
          "Banks and SBA lenders offer the lowest rates but expect two or more years in business, good credit and full financial statements, and they take weeks. Online lenders and alternative funders decide in hours or days and accept a wider range of profiles, at a higher cost.",
          "The best approach is to start with the cheapest option you realistically qualify for, and only move to faster, more expensive products when timing or eligibility requires it.",
        ],
      },
      {
        heading: "4. Prepare your documents",
        bullets: [
          "Recent business bank statements (usually the last 4 months)",
          "Government-issued ID for each owner",
          "Business EIN and ownership details",
          "For larger loans: business and personal tax returns, profit and loss statement and balance sheet",
          "For equipment: the vendor's quote or invoice",
        ],
      },
      {
        heading: "5. Compare offers on total cost",
        paragraphs: [
          "Offers can be quoted as an APR, an interest rate, a factor rate or a total payback amount, which makes them hard to compare. Look at the total amount you will repay, the payment amount and frequency, fees deducted from the funding, and whether paying early saves money.",
          "A funding specialist can put offers side by side for you; you can also use our calculators to convert factor rates into an estimated APR.",
        ],
      },
      {
        heading: "6. Close and plan repayment",
        paragraphs: [
          "Read the agreement before signing, confirm when the first payment is due and make sure the account that will be debited has the cash to cover it. Paying on time builds the history you need for larger, cheaper funding next time.",
        ],
      },
    ],
  },
  {
    slug: "business-loan-requirements",
    title: "Business Loan Requirements: What Lenders Look For",
    description:
      "Time in business, revenue, credit score, bank statements and more — the requirements behind business funding decisions and how to strengthen each one.",
    category: "Getting Started",
    updated: "2026-10-15",
    readMinutes: 6,
    takeaways: [
      "Lenders look at time in business, monthly revenue, credit, cash-flow health and existing debt.",
      "Alternative providers often start at 4–6 months in business and about $10K in monthly deposits.",
      "Bank and SBA loans typically expect 2+ years, stronger credit and full financial statements.",
    ],
    sources: [SOURCES.sbaTerms, SOURCES.fedSbcs],
    services: ["working-capital", "term-loan", "sba-loans"],
    sections: [
      {
        heading: "The five factors almost every lender checks",
        bullets: [
          "Time in business — many alternative providers start at 4–6 months; banks and SBA lenders typically want 2+ years",
          "Monthly revenue — commonly $10,000+ in average monthly deposits for alternative funding",
          "Personal credit score — some products accept scores in the 500s; term and SBA loans usually expect 620–680+",
          "Cash flow health — consistent deposits, few negative days, healthy average daily balance",
          "Existing debt — open loans or advances and how much of your revenue already goes to payments",
        ],
      },
      {
        heading: "Why bank statements matter so much",
        paragraphs: [
          "For most small business funding, recent bank statements are the single most important document. They show real revenue, how steady it is, how much cash you keep on hand and what debts you are already paying. Many providers make decisions on statements alone for amounts under a few hundred thousand dollars.",
        ],
      },
      {
        heading: "Requirements by product (typical market ranges)",
        bullets: [
          "Merchant cash advance / revenue-based: 4+ months in business, $10K+ monthly revenue, all credit considered",
          "Working capital: 6+ months, $15K+ monthly revenue, 500+ credit considered",
          "Line of credit: 6+ months, $10K+ monthly revenue, 550+ credit",
          "Term loan: 1+ year, $25K+ monthly revenue, 620+ credit",
          "SBA loan: 2+ years, solid financials, 650+ credit, owner equity",
        ],
        paragraphs: [
          "These are general market guidelines, not guarantees. Each provider sets its own criteria and prices every file individually.",
        ],
      },
      {
        heading: "How to strengthen your application",
        bullets: [
          "Run all business income through one business bank account",
          "Avoid overdrafts and negative balance days in the months before applying",
          "Pay down or consolidate expensive short-term positions where possible",
          "Check your personal credit report for errors",
          "Have your documents ready before you apply",
        ],
      },
    ],
  },
  {
    slug: "factor-rate-vs-apr",
    title: "Factor Rate vs. APR: How to Compare the Real Cost of Funding",
    description:
      "What a factor rate is, why it isn't the same as an interest rate, and how to convert a factor rate into an estimated APR.",
    category: "Costs & Rates",
    updated: "2026-10-15",
    readMinutes: 6,
    takeaways: [
      "A factor rate sets a fixed total payback: 1.30 on $50,000 means $65,000 repaid.",
      "Because terms are short and payments start right away, the equivalent APR is much higher than the factor suggests.",
      "Compare total payback, payment frequency, fees and early-payoff terms.",
    ],
    sources: [SOURCES.fedSbcs],
    services: ["merchant-cash-advance", "revenue-based-financing", "working-capital"],
    sections: [
      {
        heading: "What is a factor rate?",
        paragraphs: [
          "A factor rate is a multiplier that sets the total you will repay. A $50,000 advance at a 1.30 factor rate means you repay $65,000 — $15,000 is the cost of the funding. Factor rates are common for merchant cash advances, revenue-based financing and some short-term working capital.",
          "Unlike interest, the cost is fixed up front. It does not shrink as you pay down the balance, and paying early often does not reduce it unless the agreement includes an early payoff discount.",
        ],
      },
      {
        heading: "Why a factor rate looks cheaper than it is",
        paragraphs: [
          "A 1.30 factor rate sounds like 30%, but that cost is spread over a short time — often 6 to 12 months — and you start repaying immediately, usually every business day. Because the average balance you actually hold is much smaller than the original amount, the equivalent annual percentage rate (APR) is far higher than 30%.",
          "For example, $50,000 at a 1.30 factor repaid daily over 9 months works out to an APR of roughly 70% or more. The shorter the term, the higher the equivalent APR.",
        ],
      },
      {
        heading: "How to compare offers",
        bullets: [
          "Total payback: the clearest number — how much leaves your account in total",
          "Payment amount and frequency: daily, weekly or monthly, and whether it fits your cash flow",
          "Term: shorter terms mean bigger payments and a higher APR for the same factor",
          "Fees: origination or underwriting fees deducted from the funding raise the real cost",
          "Early payoff terms: whether paying early saves anything",
        ],
      },
      {
        heading: "When a factor-rate product still makes sense",
        paragraphs: [
          "Speed and accessibility have value. If the funding lets you complete a profitable job, buy discounted inventory or avoid a costly disruption, a higher cost can be justified. The key is knowing the true cost and confirming you don't qualify for something cheaper first.",
        ],
      },
    ],
  },
  {
    slug: "bad-credit-business-loans",
    title: "Business Funding With Bad Credit: Your Real Options",
    description:
      "Can you get business funding with a low credit score? Which products consider bad credit, what they cost and how to improve your chances.",
    category: "Getting Started",
    updated: "2026-10-15",
    readMinutes: 6,
    takeaways: [
      "With credit below about 600, revenue-based products, factoring and equipment financing are the most realistic options.",
      "Lower credit usually means higher cost and more frequent payments.",
      "Paying a short-term product on time can open the door to cheaper funding later.",
    ],
    sources: [SOURCES.fedSbcs],
    services: [
      "revenue-based-financing",
      "merchant-cash-advance",
      "equipment-financing",
      "invoice-factoring",
    ],
    sections: [
      {
        heading: "Yes — but revenue matters more than ever",
        paragraphs: [
          "With a personal credit score below roughly 600, bank loans and SBA loans are usually out of reach. Many alternative providers, however, base decisions primarily on your business bank deposits. If your business has steady revenue, you likely have options.",
        ],
      },
      {
        heading: "Products that consider lower credit scores",
        bullets: [
          "Revenue-based financing and merchant cash advances — sized on deposits and sales",
          "Invoice factoring — based largely on your customers' credit",
          "Equipment financing — the equipment secures the deal; a down payment helps",
          "Secured lines of credit — backed by collateral or receivables",
        ],
      },
      {
        heading: "What it will cost",
        paragraphs: [
          "Lower credit usually means higher pricing, shorter terms and more frequent payments. Compare the total payback and payment schedule carefully and avoid taking more than the business can comfortably repay.",
        ],
      },
      {
        heading: "How to improve your chances",
        bullets: [
          "Keep deposits consistent and avoid negative balance days",
          "Apply for an amount in line with your monthly revenue",
          "Explain past credit events (medical, divorce, a past business) — context helps",
          "Pay any current funding on time; it builds history for better offers",
          "Check your credit report for errors and dispute them",
        ],
      },
      {
        heading: "A path to better terms",
        paragraphs: [
          "Many businesses use a short-term product to solve an immediate need, pay it on time, and qualify for a cheaper line of credit or term loan six to twelve months later. A good funding partner should help you plan that path rather than keep you in expensive funding.",
        ],
      },
    ],
  },
  {
    slug: "line-of-credit-vs-term-loan",
    title: "Business Line of Credit vs. Term Loan: Which Is Right for You?",
    description:
      "How lines of credit and term loans differ in structure, cost and use, with clear examples of when to choose each.",
    category: "Comparisons",
    updated: "2026-10-15",
    readMinutes: 5,
    takeaways: [
      "Term loans fit one planned expense; lines of credit fit recurring or unpredictable needs.",
      "Lines charge interest only on what you draw; term loans charge on the full balance.",
      "Many established businesses use both.",
    ],
    sources: [SOURCES.fedSbcs],
    services: ["business-line-of-credit", "term-loan"],
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          "Choose a term loan for a single, planned expense with a long payoff — an expansion, an acquisition, a renovation. Choose a line of credit for recurring or unpredictable needs — payroll timing, inventory, emergencies — where you want money available without paying for it until you use it.",
        ],
      },
      {
        heading: "How they compare",
        bullets: [
          "Funding: term loan pays a lump sum once; a line lets you draw repeatedly up to a limit",
          "Interest: term loans charge on the full balance; lines charge only on what you draw",
          "Payments: term loans have fixed payments; line payments vary with your balance",
          "Amounts: term loans are often larger; lines are sized to recurring needs",
          "Terms: term loans run 1–5+ years; lines often have 6–24 month draw periods and renew",
        ],
      },
      {
        heading: "Can I have both?",
        paragraphs: [
          "Yes. Many established businesses use a term loan for a major investment and keep a line of credit open for day-to-day cash flow. Lenders will look at your total payment obligations when deciding on the second product.",
        ],
      },
    ],
  },
  {
    slug: "sba-loan-vs-term-loan",
    title: "SBA Loan vs. Online Term Loan: Cost, Speed and Requirements",
    description:
      "SBA loans offer lower rates and longer terms; online term loans offer speed. Compare requirements, timelines and costs.",
    category: "Comparisons",
    updated: "2026-10-15",
    readMinutes: 5,
    takeaways: [
      "SBA loans have rates capped at Prime plus a set spread and terms up to 10 years (25 for real estate).",
      "They take 30–60 days or more and require full documentation.",
      "Online term loans fund in days at a higher rate.",
    ],
    sources: [SOURCES.sba7a, SOURCES.sbaTerms, SOURCES.sba504],
    services: ["sba-loans", "term-loan"],
    sections: [
      {
        heading: "The trade-off: cost vs. time",
        paragraphs: [
          "SBA loans are partially guaranteed by the U.S. Small Business Administration, so lenders can offer long terms and rates capped at the Prime rate plus a set spread. The cost is time and paperwork: 30 to 60 days or more and a full financial package. Online term loans can fund in days with less documentation, at a higher rate.",
        ],
      },
      {
        heading: "Choose an SBA loan when",
        bullets: [
          "You have 2+ years in business, good credit and solid financials",
          "The amount is large and the monthly payment matters most",
          "You are buying real estate, a business or major equipment",
          "You can wait several weeks for funding",
        ],
      },
      {
        heading: "Choose an online term loan when",
        bullets: [
          "You need funds in days, not weeks",
          "Your business is younger or financials are less formal",
          "The opportunity's return justifies a higher rate",
          "You plan to refinance into cheaper debt later",
        ],
      },
      {
        heading: "A common strategy",
        paragraphs: [
          "Some businesses take a faster loan for an immediate opportunity, then refinance with an SBA loan once they have the documentation and history in place. Ask about prepayment terms before signing so refinancing stays an option.",
        ],
      },
    ],
  },
  {
    slug: "what-lenders-look-for-in-bank-statements",
    title: "What Lenders Look for in Your Business Bank Statements",
    description:
      "Deposits, average daily balance, negative days and existing debt payments — how funders read bank statements and how to prepare.",
    category: "Underwriting",
    updated: "2026-10-15",
    readMinutes: 5,
    takeaways: [
      "Recent bank statements are the core of most small business funding decisions.",
      "Funders check deposits, average daily balance, negative days and existing debt payments.",
      "Send complete PDF statements and avoid overdrafts before applying.",
    ],
    sources: [SOURCES.fedSbcs],
    services: ["working-capital", "revenue-based-financing", "business-line-of-credit"],
    sections: [
      {
        heading: "Why statements come first",
        paragraphs: [
          "For most small business funding, your recent business bank statements are the core of the decision. They show what the business really earns and how it manages cash — information a credit score alone can't provide. Most providers ask for the last 3 to 4 months.",
        ],
      },
      {
        heading: "What funders check",
        bullets: [
          "Total monthly deposits and the trend over recent months",
          "Number of deposits — many small deposits signal steady sales",
          "Average daily balance — how much cushion the account keeps",
          "Negative balance days and overdraft or NSF fees",
          "Recurring debits to other lenders or funders",
          "Large one-time deposits (transfers, loans) that aren't real revenue",
        ],
      },
      {
        heading: "How to prepare",
        bullets: [
          "Send complete statements as PDFs downloaded from your bank — all pages, not screenshots",
          "Keep business and personal finances in separate accounts",
          "Avoid negative days in the months before you apply",
          "Be ready to explain unusual deposits or dips (seasonality, a large one-time job)",
        ],
      },
    ],
  },
  {
    slug: "fast-business-funding",
    title: "Fast Business Funding: How to Get Capital in 24–48 Hours",
    description:
      "Which business funding products can fund in a day or two, what they require and how to avoid costly mistakes when speed matters.",
    category: "Getting Started",
    updated: "2026-10-15",
    readMinutes: 5,
    takeaways: [
      "Working capital, revenue-based financing and cash advances can fund in 24–48 hours.",
      "Having statements and ID ready is the biggest time saver.",
      "Faster funding costs more — confirm total payback before signing.",
    ],
    sources: [SOURCES.fedSbcs],
    services: ["working-capital", "merchant-cash-advance", "business-line-of-credit"],
    sections: [
      {
        heading: "Which products can fund fastest",
        bullets: [
          "Merchant cash advances and revenue-based financing — often 24–48 hours",
          "Short-term working capital — often 24–48 hours",
          "Online lines of credit — a few days to set up, then same-day or next-day draws",
          "Invoice factoring — a few days to set up, then 1–2 days per invoice",
        ],
        paragraphs: [
          "SBA and bank loans take weeks and are not realistic when you need money this week.",
        ],
      },
      {
        heading: "How to move faster",
        bullets: [
          "Apply early in the business day",
          "Have your last 4 months of statements and ID ready",
          "Answer the specialist's questions promptly",
          "Sign electronically as soon as you choose an offer",
        ],
      },
      {
        heading: "Don't let speed hide the cost",
        paragraphs: [
          "Fast funding usually costs more. Before signing, confirm the total payback, the payment amount and frequency, and any fees taken out of the funds. Borrow what you need, not the maximum offered, and make sure the payment fits comfortably in your weekly cash flow.",
        ],
      },
    ],
  },
];

export const findGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
