export const SITE_URL = "https://www.bfgfunds.com";

export const COMPANY = {
  displayName: "BFG Funds",
  street: "W Atlantic Blvd",
  city: "Coconut Creek",
  region: "FL",
  postalCode: "33066",
  address: "W Atlantic Blvd, Coconut Creek, FL 33066, US",
  phoneDisplay: "+1 (786) 642-0539",
  phoneHref: "tel:+17866420539",
  phoneE164: "+17866420539",
  email: "hello@bfgfunds.com",
  logoUrl: "https://cdn.bfgfunds.com/BFGFunds/bfg-logo-horizontal@2x.png",
} as const;

/** Shown wherever amounts, rates or speeds are mentioned. */
export const FUNDING_DISCLAIMER =
  "BFG Funds is not a lender. We connect businesses with independent lenders and funding providers. Amounts, rates, terms and timing are set by each provider after its own review of your business (bank statements, revenue, time in business, credit profile and more) and are not guaranteed.";

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  title: string;
  description: string;
  tagline: string;
  amount: string;
  speed: string;
  term: string;
  /** Typical market cost, as a range; every offer is priced case by case. */
  cost: string;
  overview: string;
  bestFor: readonly string[];
  eligibility: readonly string[];
  documents: readonly string[];
  pros: readonly string[];
  cons: readonly string[];
  howItWorks: readonly { title: string; text: string }[];
  faqs: readonly Faq[];
};

const BASE_DOCUMENTS = [
  "Your most recent business bank statements (usually the last 4 months)",
  "Driver's license or other government ID",
  "Business EIN and basic ownership details",
] as const;

export const SERVICES: readonly Service[] = [
  {
    slug: "business-line-of-credit",
    title: "Business Line of Credit",
    description:
      "Draw only what you need, when you need it. Revolving capital that refills as you repay.",
    tagline: "Revolving capital you can draw on any time",
    amount: "$10K – $500K",
    speed: "As fast as 24 hours",
    term: "Revolving, 6–24 month draw periods",
    cost: "Interest charged only on what you draw; online lines commonly price from the low teens to over 50% APR, plus possible draw or maintenance fees",
    overview:
      "A line of credit sits ready in the background. You draw what you need for payroll, inventory or an unexpected repair, pay interest only on what you use, and the limit refills as you repay.",
    bestFor: [
      "Smoothing seasonal or uneven cash flow",
      "Covering payroll gaps between receivables",
      "Keeping a safety net open without a fixed loan",
    ],
    eligibility: [
      "6+ months in business",
      "$10,000+ in average monthly revenue",
      "550+ personal credit score",
      "A business checking account in good standing",
    ],
    documents: BASE_DOCUMENTS,
    pros: [
      "Pay interest only on what you actually use",
      "Reusable — the limit refills as you repay",
      "Good as a standing safety net",
    ],
    cons: [
      "Limits are often lower than a lump-sum loan",
      "Some lines charge draw or maintenance fees",
      "Lenders can review and adjust the limit",
    ],
    howItWorks: [
      {
        title: "Apply in two minutes",
        text: "Basic business details and how much of a limit you want available.",
      },
      {
        title: "Share recent statements",
        text: "Lenders verify revenue and deposit consistency — no tax returns for most limits.",
      },
      {
        title: "Compare your limit and rate",
        text: "Your specialist lays out each offer's limit, fees and repayment schedule in plain language.",
      },
      {
        title: "Draw on demand",
        text: "Move money to your bank account whenever you need it, often the same day.",
      },
    ],
    faqs: [
      {
        q: "How is a line of credit different from a loan?",
        a: "A loan gives you a lump sum once and you repay it on a schedule. A line of credit gives you a limit you can draw from repeatedly; you only pay interest on what you have drawn, and repaying frees the limit up again.",
      },
      {
        q: "Does a business line of credit require collateral?",
        a: "Many lines from online lenders are unsecured and rely on your revenue and credit profile, usually with a personal guarantee. Larger lines from banks may require collateral such as receivables or equipment.",
      },
      {
        q: "How much of a line can I get?",
        a: "Limits are typically sized from your average monthly deposits and time in business. As a rough guide, many providers start around one month of revenue; the actual limit is set by each lender after review.",
      },
    ],
  },
  {
    slug: "working-capital",
    title: "Working Capital",
    description:
      "Cover payroll, inventory and seasonal gaps with fast, unsecured short-term funding.",
    tagline: "Fast, unsecured cash for day-to-day operations",
    amount: "$30K – $750K",
    speed: "24–48 hours",
    term: "3–18 months",
    cost: "Usually priced with a factor rate (commonly about 1.10–1.45) or a short-term rate; daily or weekly payments",
    overview:
      "Short-term unsecured funding designed for speed. No collateral pledge, minimal paperwork, and a fixed payback schedule that lines up with how your revenue actually arrives.",
    bestFor: [
      "Bridging a slow month or delayed customer payment",
      "Buying inventory ahead of a busy season",
      "Taking on a job that needs upfront spend",
    ],
    eligibility: [
      "6+ months in business",
      "$15,000+ in average monthly revenue",
      "500+ personal credit score considered",
      "No open bankruptcies",
    ],
    documents: BASE_DOCUMENTS,
    pros: ["Fast decisions, often same day", "Minimal paperwork", "No specific collateral"],
    cons: [
      "Costs more than long-term financing",
      "Frequent (daily or weekly) payments",
      "Short terms mean larger payments",
    ],
    howItWorks: [
      {
        title: "Tell us what you need",
        text: "Amount, purpose and timing — the whole form takes about two minutes.",
      },
      {
        title: "Quick funding review",
        text: "A specialist reviews your deposits and matches you with the lowest-cost programs you are likely to qualify for.",
      },
      {
        title: "Compare offers",
        text: "Offers often come back the same business day, with the total payback and payment schedule spelled out.",
      },
      {
        title: "Funds wired",
        text: "Sign electronically with the provider you choose and money can land in as little as 24 hours.",
      },
    ],
    faqs: [
      {
        q: "What can working capital be used for?",
        a: "Most providers allow any legitimate business purpose: payroll, inventory, rent, marketing, repairs, or covering the gap while you wait on customer payments.",
      },
      {
        q: "Will it affect my credit score?",
        a: "Reviewing your options with BFG Funds does not affect your credit. A provider may run a credit check once you choose to move forward with an offer.",
      },
      {
        q: "Can I pay it off early?",
        a: "It depends on the provider. Some offer a discount for early payoff; others charge the full payback amount regardless. Your specialist will point this out for each offer.",
      },
    ],
  },
  {
    slug: "term-loan",
    title: "Term Loan",
    description:
      "A lump sum with fixed payments and clear terms for planned expansion or big purchases.",
    tagline: "Predictable financing for planned growth",
    amount: "$50K – $2M",
    speed: "2–5 business days",
    term: "1–5 years",
    cost: "Fixed or variable interest; bank-style loans start in the single digits, online term loans commonly range from the low teens to 40%+ APR",
    overview:
      "One lump sum, one fixed payment, one clear payoff date. Term loans are often the lowest-cost option for businesses with steady revenue and a specific, planned use of capital.",
    bestFor: [
      "Opening a second location or expanding space",
      "Acquiring another business or buying out a partner",
      "Refinancing more expensive short-term debt",
    ],
    eligibility: [
      "1+ year in business",
      "$25,000+ in average monthly revenue",
      "620+ personal credit score",
      "Profitable or break-even trailing 12 months",
    ],
    documents: [
      ...BASE_DOCUMENTS,
      "For larger amounts: recent business tax return and year-to-date financials",
    ],
    pros: [
      "Predictable payments",
      "Longer terms keep payments manageable",
      "Often cheaper than short-term funding",
    ],
    cons: [
      "Stricter credit and revenue requirements",
      "More documentation for larger amounts",
      "Slower than working capital",
    ],
    howItWorks: [
      {
        title: "Submit your application",
        text: "Business details plus the amount and purpose of the loan.",
      },
      {
        title: "Lender review",
        text: "Bank statements and, for larger amounts, financials or a recent tax return.",
      },
      {
        title: "Compare term sheets",
        text: "Rate, monthly payment and total cost side by side, including any prepayment terms.",
      },
      {
        title: "Close and fund",
        text: "Sign with the lender you choose and receive the full amount by wire or ACH.",
      },
    ],
    faqs: [
      {
        q: "What is a typical term loan length?",
        a: "Most business term loans run one to five years. Longer terms lower the payment but increase the total interest paid.",
      },
      {
        q: "Are term loan payments monthly?",
        a: "Bank and many online term loans are paid monthly. Some online lenders use weekly payments; your specialist will flag the schedule for every offer.",
      },
      {
        q: "Can I use a term loan to refinance other debt?",
        a: "Yes. Replacing expensive short-term balances with a longer term loan is one of the most common uses, as long as the business qualifies.",
      },
    ],
  },
  {
    slug: "sba-loans",
    title: "SBA Loans",
    description:
      "Government-backed financing with longer terms and lower rates for qualified businesses.",
    tagline: "Some of the lowest rates available, if you can wait",
    amount: "$50K – $2M",
    speed: "30–60 days",
    term: "Up to 10 years (25 for real estate)",
    cost: "Rates are capped by the SBA at the Prime rate plus a maximum spread that depends on loan size, plus an SBA guarantee fee",
    overview:
      "SBA 7(a) and 504 programs are partially guaranteed by the U.S. Small Business Administration, which lets lenders offer longer terms and materially lower rates. The trade-off is documentation and time.",
    bestFor: [
      "Long-term expansion where monthly payment matters most",
      "Commercial real estate purchases",
      "Established businesses consolidating debt",
    ],
    eligibility: [
      "2+ years in business",
      "$25,000+ in average monthly revenue",
      "650+ personal credit score",
      "U.S.-based, for-profit business with owner equity contribution",
    ],
    documents: [
      ...BASE_DOCUMENTS,
      "Two years of business and personal tax returns",
      "Year-to-date profit and loss and balance sheet",
      "Debt schedule and use-of-funds summary",
    ],
    pros: [
      "Lowest rates for most small businesses",
      "Long terms keep payments low",
      "Can finance real estate",
    ],
    cons: [
      "Slow — weeks, not days",
      "Heavy documentation",
      "Strict eligibility and possible collateral",
    ],
    howItWorks: [
      {
        title: "Pre-qualification call",
        text: "We confirm SBA eligibility before you spend time on paperwork.",
      },
      {
        title: "Document package",
        text: "Two years of tax returns, financials, debt schedule and a use-of-funds summary.",
      },
      {
        title: "Lender matching",
        text: "We place your file with SBA lenders active in your industry.",
      },
      {
        title: "Approval and closing",
        text: "Commitment letter, closing conditions, then funding — typically 30–60 days.",
      },
    ],
    faqs: [
      {
        q: "Is BFG Funds an SBA lender?",
        a: "No. SBA loans are made by SBA-approved lenders. BFG Funds helps you prepare your file and connects you with lenders that are active in your industry and loan size.",
      },
      {
        q: "What is the difference between SBA 7(a) and 504?",
        a: "7(a) is the general-purpose program (working capital, equipment, refinancing, acquisitions, real estate). 504 is designed for major fixed assets such as buildings and heavy equipment, split between a bank and a Certified Development Company.",
      },
      {
        q: "Why does an SBA loan take so long?",
        a: "Lenders must document SBA eligibility, analyze tax returns and financials, and often secure collateral. A complete document package up front is the best way to shorten the timeline.",
      },
    ],
  },
  {
    slug: "revenue-based-financing",
    title: "Revenue-Based Financing",
    description: "Repay as a percentage of sales, so your payments flex with slow and busy months.",
    tagline: "Payments that flex with your sales",
    amount: "$25K – $1M",
    speed: "24–48 hours",
    term: "Until repaid, typically 4–15 months",
    cost: "A fixed total payback set up front (factor rate commonly about 1.10–1.45), remitted as a percentage of sales",
    overview:
      "Instead of a fixed monthly payment, you remit an agreed percentage of daily or weekly sales. Slow week, smaller payment. It is among the most forgiving structures for businesses with volatile revenue.",
    bestFor: [
      "Seasonal businesses with big swings",
      "High card-volume retail, restaurants and e-commerce",
      "Owners who want payments tied to actual performance",
    ],
    eligibility: [
      "4+ months in business",
      "$10,000+ in average monthly revenue",
      "Consistent daily or weekly deposits",
      "All credit profiles considered",
    ],
    documents: BASE_DOCUMENTS,
    pros: ["Payments rise and fall with sales", "Flexible credit requirements", "Fast funding"],
    cons: [
      "Total cost is higher than bank financing",
      "Early payoff may not reduce the cost",
      "Requires steady deposit history",
    ],
    howItWorks: [
      { title: "Apply online", text: "Share your monthly revenue and how you take payments." },
      {
        title: "Revenue verification",
        text: "Providers review recent statements or processing history.",
      },
      {
        title: "Set your remittance rate",
        text: "Agree on the percentage of sales and the total repayment amount up front.",
      },
      {
        title: "Get funded",
        text: "Funds are often released in as little as one business day; remittance starts the following cycle.",
      },
    ],
    faqs: [
      {
        q: "How is revenue-based financing priced?",
        a: "You agree to repay a fixed total, usually expressed as a factor rate (for example 1.25 means $1.25 repaid for every $1 received). Payments are a percentage of sales, so the time to repay varies with your revenue.",
      },
      {
        q: "What happens in a slow month?",
        a: "Because payments are a share of sales, a slower month generally means a smaller payment. Check each agreement for minimums or reconciliation terms.",
      },
      {
        q: "Is this the same as a merchant cash advance?",
        a: "They are closely related. A merchant cash advance is a purchase of future receivables, often collected as a share of card or bank deposits; revenue-based financing is the broader term for payments tied to revenue.",
      },
    ],
  },
  {
    slug: "equipment-financing",
    title: "Equipment Financing",
    description: "Finance machinery, vehicles or tech using the equipment itself as collateral.",
    tagline: "The equipment secures the financing, so rates stay lower",
    amount: "$20K – $2M",
    speed: "2–5 business days",
    term: "2–7 years, matched to useful life",
    cost: "Fixed monthly payments; rates depend heavily on credit, time in business and the type of asset",
    overview:
      "Because the asset itself is the collateral, equipment financing usually beats unsecured options on rate — often with little or nothing down and possible Section 179 tax treatment (ask your tax advisor).",
    bestFor: [
      "Trucks, trailers and fleet vehicles",
      "Construction, manufacturing and shop machinery",
      "Medical, kitchen, and technology equipment",
    ],
    eligibility: [
      "6+ months in business",
      "$10,000+ in average monthly revenue",
      "600+ personal credit score (lower with a down payment)",
      "A quote or invoice from the equipment vendor",
    ],
    documents: [...BASE_DOCUMENTS, "Vendor quote or invoice for the equipment"],
    pros: [
      "Lower rates than unsecured funding",
      "Little or nothing down in many cases",
      "Payments spread over the asset's useful life",
    ],
    cons: [
      "Money can only be used for the equipment",
      "Older or specialized assets are harder to finance",
      "The equipment can be repossessed if you default",
    ],
    howItWorks: [
      {
        title: "Send the equipment quote",
        text: "Vendor invoice or spec sheet tells lenders the asset value and useful life.",
      },
      {
        title: "Credit and asset review",
        text: "Lenders review you and the equipment together, which helps keep the rate down.",
      },
      {
        title: "Choose your structure",
        text: "Term length, down payment and end-of-term options such as a $1 buyout.",
      },
      {
        title: "Vendor gets paid",
        text: "The lender pays the vendor directly and you take delivery — payments usually begin the next month.",
      },
    ],
    faqs: [
      {
        q: "Can I finance used equipment?",
        a: "Yes, many lenders finance used equipment. Age, condition and resale value affect the term and rate.",
      },
      {
        q: "Do I need a down payment?",
        a: "Strong applicants often qualify with little or nothing down. Newer businesses or lower credit scores may need 10–20% down.",
      },
      {
        q: "Lease or loan — which is better?",
        a: "A loan or $1 buyout lease builds ownership; a fair-market-value lease keeps payments lower when you plan to upgrade. Your tax advisor can tell you how each is treated for your business.",
      },
    ],
  },
  {
    slug: "merchant-cash-advance",
    title: "Merchant Cash Advance",
    description:
      "An advance against future sales, repaid automatically from deposits — built for speed and flexible credit.",
    tagline: "Fast capital based on your sales, not your credit score",
    amount: "$10K – $500K",
    speed: "As fast as 24 hours",
    term: "Typically 3–15 months",
    cost: "A fixed total payback set by a factor rate (commonly about 1.15–1.50); among the most expensive forms of business funding",
    overview:
      "A merchant cash advance (MCA) is not a loan: a provider buys a portion of your future receivables at a discount and collects it through daily or weekly debits. Approvals focus on deposits and sales history, which makes it reachable for businesses that don't fit bank criteria — at a higher cost.",
    bestFor: [
      "Urgent needs where speed matters most",
      "Businesses with strong deposits but limited credit",
      "Short-term opportunities with a clear return",
    ],
    eligibility: [
      "4+ months in business",
      "$10,000+ in average monthly revenue",
      "Consistent deposits in a business bank account",
      "All credit profiles considered",
    ],
    documents: BASE_DOCUMENTS,
    pros: ["Very fast decisions", "Flexible credit requirements", "No specific collateral"],
    cons: [
      "High total cost — compare carefully",
      "Daily or weekly debits affect cash flow",
      "Stacking multiple advances can become unmanageable",
    ],
    howItWorks: [
      { title: "Apply online", text: "Business details and the amount you need." },
      { title: "Statement review", text: "Providers review recent deposits to size the advance." },
      {
        title: "Compare offers",
        text: "Your specialist shows the total payback, factor rate and payment for each offer — and whether a cheaper product fits.",
      },
      {
        title: "Get funded",
        text: "Sign with the provider you choose; funds can arrive in as little as one business day.",
      },
    ],
    faqs: [
      {
        q: "Is a merchant cash advance a loan?",
        a: "No. Legally it is usually structured as a purchase of future receivables, which is why it is priced with a factor rate instead of an interest rate. Use our factor rate calculator to see the equivalent cost.",
      },
      {
        q: "Why would I choose an MCA over a loan?",
        a: "Speed and accessibility. If you qualify for a line of credit, term loan or SBA loan, those are usually cheaper — and your specialist will tell you when that is the case.",
      },
      {
        q: "Can I take a second advance?",
        a: "Taking a new advance while one is still open (stacking) increases daily debits and risk. We review existing positions before recommending any additional funding.",
      },
    ],
  },
  {
    slug: "invoice-factoring",
    title: "Invoice Factoring",
    description:
      "Turn unpaid B2B invoices into cash now instead of waiting 30, 60 or 90 days for customers to pay.",
    tagline: "Get paid now for work you've already done",
    amount: "Up to 90% of invoice value",
    speed: "A few days to set up, then 24–48 hours per invoice",
    term: "Each invoice, until your customer pays",
    cost: "A factoring fee, commonly about 1%–5% of the invoice per month outstanding",
    overview:
      "If your customers are businesses that pay on terms, a factoring company advances most of each invoice up front, collects from your customer, then sends you the balance minus its fee. Approval depends heavily on your customers' credit, not just yours.",
    bestFor: [
      "B2B companies with net-30 to net-90 customers",
      "Trucking, staffing, manufacturing and wholesale",
      "Fast-growing businesses whose receivables outpace cash",
    ],
    eligibility: [
      "Invoices to creditworthy business or government customers",
      "Completed work or delivered goods",
      "No major liens on receivables",
      "Credit challenges considered",
    ],
    documents: [
      ...BASE_DOCUMENTS,
      "Accounts receivable aging report",
      "Sample invoices and customer list",
    ],
    pros: [
      "Cash grows with your sales",
      "Approval based on your customers' credit",
      "No fixed loan payments",
    ],
    cons: [
      "Only works for B2B invoices",
      "Factor may contact your customers",
      "Fees add up if customers pay late",
    ],
    howItWorks: [
      { title: "Share your receivables", text: "Your aging report and the customers you invoice." },
      {
        title: "Customer credit review",
        text: "The factor checks the credit of the businesses that owe you.",
      },
      {
        title: "Submit invoices",
        text: "Send invoices as you issue them and receive an advance on each.",
      },
      {
        title: "Receive the balance",
        text: "When your customer pays, the remaining amount minus the fee is released to you.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between recourse and non-recourse factoring?",
        a: "With recourse factoring you must buy back invoices your customer doesn't pay. Non-recourse shifts some of that risk to the factor, usually for a higher fee and only for specific situations such as customer insolvency.",
      },
      {
        q: "Will my customers know I'm factoring?",
        a: "Usually yes — customers are asked to pay the factor directly. Some providers offer non-notification arrangements for larger, established businesses.",
      },
      {
        q: "Is factoring a loan?",
        a: "No. You are selling invoices at a discount, so it typically does not add debt to your balance sheet.",
      },
    ],
  },
];

export const INDUSTRIES = [
  "Construction",
  "Restaurants & Food Service",
  "Trucking & Logistics",
  "Retail & E-commerce",
  "Healthcare & Medical",
  "Auto Repair",
  "Professional Services",
  "Manufacturing",
  "Beauty & Wellness",
  "Staffing Agencies",
  "Landscaping",
  "Real Estate Services",
];
