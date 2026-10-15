import type { Faq } from "./site";

export type Industry = {
  slug: string;
  name: string;
  /** Short line for cards and meta descriptions. */
  summary: string;
  intro: string;
  challenges: readonly string[];
  uses: readonly string[];
  /** Service slugs that usually fit best, most relevant first. */
  services: readonly string[];
  faqs: readonly Faq[];
};

export const INDUSTRY_PAGES: readonly Industry[] = [
  {
    slug: "construction",
    name: "Construction",
    summary:
      "Funding for contractors to cover materials, payroll and equipment while waiting on draws and retainage.",
    intro:
      "Construction businesses often front materials and labor weeks before a draw or progress payment arrives, and retainage can hold back a share of every job until completion. The right funding keeps crews working and lets you bid on larger projects without draining your operating account.",
    challenges: [
      "Paying for materials and labor before progress payments arrive",
      "Retainage tying up a percentage of each contract",
      "Seasonal slowdowns in weather-dependent regions",
      "Large equipment purchases or repairs",
    ],
    uses: [
      "Materials and supplies for new jobs",
      "Payroll between draws",
      "Excavators, trucks and trailers",
      "Bonding-related working capital",
    ],
    services: [
      "equipment-financing",
      "business-line-of-credit",
      "working-capital",
      "invoice-factoring",
    ],
    faqs: [
      {
        q: "Can contractors get funding against signed contracts?",
        a: "Some providers consider signed contracts and receivables when sizing an offer. Most still look first at your recent bank deposits and time in business.",
      },
      {
        q: "What is the best option for buying heavy equipment?",
        a: "Equipment financing is usually the lowest-cost route because the machine secures the financing, and payments can be spread over its useful life.",
      },
    ],
  },
  {
    slug: "restaurants",
    name: "Restaurants & Food Service",
    summary:
      "Capital for restaurants, cafés and food businesses to handle renovations, equipment and seasonal swings.",
    intro:
      "Restaurants run on thin margins and daily card sales. A slow season, a broken walk-in cooler or a new location can strain cash quickly. Lenders that look at daily deposits and card volume can move fast, and structures that flex with sales help protect payroll.",
    challenges: [
      "Thin margins and unpredictable foot traffic",
      "Expensive kitchen equipment repairs and replacements",
      "Seasonal and weather-driven sales swings",
      "Build-out costs for new or remodeled locations",
    ],
    uses: [
      "Kitchen equipment and repairs",
      "Renovations and expansion",
      "Inventory and payroll during slow months",
      "Marketing and catering launches",
    ],
    services: [
      "revenue-based-financing",
      "equipment-financing",
      "working-capital",
      "merchant-cash-advance",
    ],
    faqs: [
      {
        q: "Can a restaurant get funding with less-than-perfect credit?",
        a: "Yes. Many providers focus on consistent card sales and bank deposits. Expect higher costs than bank financing if credit is limited.",
      },
      {
        q: "Is there funding that adjusts to slow months?",
        a: "Revenue-based financing collects a percentage of sales, so payments generally shrink when sales do.",
      },
    ],
  },
  {
    slug: "trucking",
    name: "Trucking & Logistics",
    summary:
      "Funding for owner-operators and fleets: trucks, trailers, fuel, repairs and slow-paying freight invoices.",
    intro:
      "Trucking companies carry high fixed costs — fuel, insurance, maintenance and truck payments — while brokers and shippers often pay on 30 to 60 day terms. Pairing equipment financing for trucks with invoice factoring or a line of credit for operating costs is a common way to keep wheels turning.",
    challenges: [
      "Freight invoices paid on 30–60 day terms",
      "Fuel and insurance costs that rise without notice",
      "Unexpected breakdowns and repairs",
      "Growing a fleet without draining cash",
    ],
    uses: [
      "Trucks and trailers",
      "Repairs and maintenance",
      "Fuel and insurance",
      "Covering cash while invoices are outstanding",
    ],
    services: [
      "invoice-factoring",
      "equipment-financing",
      "business-line-of-credit",
      "working-capital",
    ],
    faqs: [
      {
        q: "Can I finance a used truck?",
        a: "Yes. Lenders finance used tractors and trailers; age, mileage and your time in business affect the down payment and rate.",
      },
      {
        q: "Is freight factoring a good fit for small carriers?",
        a: "Factoring is popular with small carriers because approval depends largely on the credit of the brokers and shippers you haul for.",
      },
    ],
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & E-commerce",
    summary: "Inventory and growth capital for stores and online sellers ahead of busy seasons.",
    intro:
      "Retailers and online sellers have to buy inventory months before it sells, and a strong holiday season can require more stock than cash allows. Funding sized to your sales history lets you order ahead, run promotions and expand channels.",
    challenges: [
      "Buying inventory before peak season",
      "Supplier minimums and bulk-order discounts",
      "Marketplace payout delays",
      "Seasonal cash dips after the holidays",
    ],
    uses: [
      "Inventory purchases",
      "Marketing and advertising",
      "New store fixtures or warehouse space",
      "Website and fulfillment upgrades",
    ],
    services: [
      "revenue-based-financing",
      "business-line-of-credit",
      "working-capital",
      "merchant-cash-advance",
    ],
    faqs: [
      {
        q: "Can online sellers qualify using marketplace revenue?",
        a: "Many providers review marketplace and processor deposits into your business bank account. Consistent deposits matter more than where the sales come from.",
      },
      {
        q: "What is the best funding for inventory?",
        a: "A line of credit or revenue-based financing works well for recurring inventory buys because you can repay as the stock sells.",
      },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare & Medical",
    summary:
      "Funding for practices and clinics to bridge insurance reimbursement delays and buy equipment.",
    intro:
      "Medical, dental and veterinary practices often wait weeks for insurance reimbursements while payroll and rent are due on schedule. Equipment is expensive and essential. Lenders familiar with healthcare understand reimbursement cycles and specialized equipment values.",
    challenges: [
      "Insurance reimbursement delays",
      "High-cost diagnostic and treatment equipment",
      "Opening or expanding a practice",
      "Staffing costs that don't wait for payments",
    ],
    uses: [
      "Medical and dental equipment",
      "Practice expansion or acquisition",
      "Payroll during reimbursement gaps",
      "Technology and EHR systems",
    ],
    services: ["equipment-financing", "term-loan", "business-line-of-credit", "sba-loans"],
    faqs: [
      {
        q: "Can a practice finance new imaging or dental equipment?",
        a: "Yes. Equipment financing is common for medical devices, often with terms matched to the equipment's useful life.",
      },
      {
        q: "Are SBA loans used for buying a practice?",
        a: "SBA 7(a) loans are frequently used for practice acquisitions and partner buyouts, given the long terms they allow.",
      },
    ],
  },
  {
    slug: "auto-repair",
    name: "Auto Repair",
    summary:
      "Capital for repair shops and dealers: lifts, diagnostic tools, parts inventory and expansion.",
    intro:
      "Auto repair shops depend on specialized equipment and a steady parts inventory. Adding a bay, upgrading diagnostic tools for newer vehicles or covering a slow month all take capital that should not come out of payroll.",
    challenges: [
      "Expensive lifts and diagnostic equipment",
      "Parts inventory tied up on the shelf",
      "Keeping up with newer vehicle technology",
      "Seasonal demand changes",
    ],
    uses: [
      "Lifts, alignment and diagnostic tools",
      "Parts inventory",
      "Adding bays or a second location",
      "Technician hiring and training",
    ],
    services: ["equipment-financing", "working-capital", "business-line-of-credit", "term-loan"],
    faqs: [
      {
        q: "Can I finance diagnostic equipment with fair credit?",
        a: "Often yes, sometimes with a down payment. Because the equipment secures the financing, lenders can be more flexible than with unsecured loans.",
      },
    ],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    summary:
      "Funding for agencies, consultancies, law and accounting firms to bridge receivables and hire.",
    intro:
      "Professional service firms bill for work already performed and often wait 30 to 90 days to be paid. Growth means hiring ahead of revenue. A line of credit or factoring can smooth the gap between work and payment.",
    challenges: [
      "Long client payment terms",
      "Hiring before new contracts start paying",
      "Uneven project-based revenue",
      "Few hard assets to borrow against",
    ],
    uses: [
      "Payroll for new hires",
      "Bridging client receivables",
      "Office space and technology",
      "Business acquisitions",
    ],
    services: ["business-line-of-credit", "invoice-factoring", "term-loan", "sba-loans"],
    faqs: [
      {
        q: "Can a service business without equipment get funding?",
        a: "Yes. Most providers base decisions on revenue, deposits and credit, not hard assets.",
      },
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    summary:
      "Capital for manufacturers to buy machinery, raw materials and fulfill large purchase orders.",
    intro:
      "Manufacturers carry raw materials, work in progress and finished goods, and large purchase orders can require spending well before the customer pays. Equipment financing for machinery and working capital for materials are the core tools.",
    challenges: [
      "Funding raw materials for large orders",
      "Machinery purchases and upgrades",
      "Long cash conversion cycles",
      "Customers on net-60 or longer terms",
    ],
    uses: [
      "CNC machines and production lines",
      "Raw materials",
      "Fulfilling large purchase orders",
      "Facility expansion",
    ],
    services: ["equipment-financing", "invoice-factoring", "term-loan", "sba-loans"],
    faqs: [
      {
        q: "How can a manufacturer fund a large purchase order?",
        a: "Working capital, a line of credit or factoring the resulting invoices are common approaches, depending on your customer's credit and timeline.",
      },
    ],
  },
  {
    slug: "beauty-wellness",
    name: "Beauty & Wellness",
    summary:
      "Funding for salons, spas, med spas and fitness studios to renovate, buy equipment and grow.",
    intro:
      "Salons, spas and studios compete on experience. Renovations, new equipment and marketing all require capital, and revenue can swing with seasons and staff changes. Providers that review card and deposit history can move quickly.",
    challenges: [
      "Renovations and build-outs",
      "Specialized equipment for treatments",
      "Staff turnover affecting revenue",
      "Seasonal demand",
    ],
    uses: [
      "Salon and spa renovations",
      "Treatment and fitness equipment",
      "Marketing and booking technology",
      "Opening a new location",
    ],
    services: [
      "equipment-financing",
      "revenue-based-financing",
      "working-capital",
      "business-line-of-credit",
    ],
    faqs: [
      {
        q: "Can a med spa finance laser or aesthetic equipment?",
        a: "Yes. Equipment financing is commonly used for aesthetic devices; vendor quotes help lenders size the offer.",
      },
    ],
  },
  {
    slug: "staffing",
    name: "Staffing Agencies",
    summary:
      "Payroll funding for staffing firms that pay workers weekly but get paid by clients on terms.",
    intro:
      "Staffing agencies pay workers every week while clients pay invoices on 30 to 60 day terms. The faster you grow, the bigger that gap gets. Invoice factoring is built for exactly this, and a line of credit can add a cushion.",
    challenges: [
      "Weekly payroll against monthly client payments",
      "Rapid growth widening the cash gap",
      "Payroll taxes and workers' compensation costs",
      "Concentration in a few large clients",
    ],
    uses: [
      "Weekly payroll",
      "Payroll taxes and insurance",
      "Recruiting and onboarding",
      "Taking on larger contracts",
    ],
    services: ["invoice-factoring", "business-line-of-credit", "working-capital"],
    faqs: [
      {
        q: "Why is factoring popular with staffing firms?",
        a: "It converts client invoices into cash within days, so funding grows automatically as you place more workers.",
      },
    ],
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    summary: "Seasonal capital and equipment financing for landscaping and lawn care companies.",
    intro:
      "Landscaping businesses earn most of their revenue in a few busy months and need trucks, mowers and crews ready before the season starts. Equipment financing and a line of credit help you gear up and carry through the off-season.",
    challenges: [
      "Strong seasonality and off-season cash dips",
      "Trucks, trailers and mowers to buy or replace",
      "Hiring crews before the season",
      "Commercial clients paying on terms",
    ],
    uses: [
      "Mowers, trucks and trailers",
      "Pre-season payroll and materials",
      "Off-season expenses",
      "Expanding into hardscaping or snow removal",
    ],
    services: ["equipment-financing", "business-line-of-credit", "working-capital"],
    faqs: [
      {
        q: "Can I get funding in the off-season?",
        a: "Yes, though providers look at your full-year deposits. Applying before the slow season, when recent deposits are strongest, often helps.",
      },
    ],
  },
  {
    slug: "real-estate-services",
    name: "Real Estate Services",
    summary: "Funding for brokerages, property managers and real estate service firms.",
    intro:
      "Brokerages, property managers and related service firms often have commission- or project-based income that arrives unevenly. Working capital and lines of credit help cover marketing, staffing and operating costs between closings.",
    challenges: [
      "Uneven, commission-based income",
      "Marketing costs ahead of listings",
      "Staffing and office expenses",
      "Growth through acquisitions",
    ],
    uses: [
      "Marketing and lead generation",
      "Office expansion",
      "Hiring agents and staff",
      "Acquiring another firm",
    ],
    services: ["business-line-of-credit", "working-capital", "term-loan", "sba-loans"],
    faqs: [
      {
        q: "Does BFG Funds provide mortgages or property loans?",
        a: "No. BFG Funds focuses on business funding for operating companies. For property purchases, an SBA 504 or commercial real estate lender may be the right fit.",
      },
    ],
  },
];

export const findIndustry = (slug: string) => INDUSTRY_PAGES.find((i) => i.slug === slug);
