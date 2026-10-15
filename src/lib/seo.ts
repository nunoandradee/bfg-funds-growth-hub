import { COMPANY, SITE_URL } from "@/data/site";

// One place for every page's <head>: title, description, canonical URL on the
// served host (www), social tags and optional structured data.

export function absoluteUrl(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

type JsonLd = Record<string, unknown>;

/**
 * Structured data as a head entry. The router renders `script:ld+json` meta
 * entries as <script type="application/ld+json">, but its meta type only
 * knows <meta> attributes, hence the cast.
 */
export function ldMeta(data: JsonLd) {
  return { "script:ld+json": data } as unknown as { name: string; content: string };
}

export function pageHead({
  title,
  description,
  path,
  type = "website",
  jsonLd = [],
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  jsonLd?: JsonLd[];
  noindex?: boolean;
}) {
  const url = absoluteUrl(path);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:site_name", content: COMPANY.displayName },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(noindex ? [{ name: "robots", content: "noindex" }] : []),
      ...jsonLd.map(ldMeta),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export const ORGANIZATION_LD: JsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": `${SITE_URL}/#organization`,
  name: COMPANY.displayName,
  url: `${SITE_URL}/`,
  logo: COMPANY.logoUrl,
  image: COMPANY.logoUrl,
  description:
    "BFG Funds helps U.S. small and mid-sized businesses compare business funding options from a network of independent lenders and funding providers.",
  telephone: COMPANY.phoneE164,
  email: COMPANY.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.street,
    addressLocality: COMPANY.city,
    addressRegion: COMPANY.region,
    postalCode: COMPANY.postalCode,
    addressCountry: "US",
  },
  areaServed: { "@type": "Country", name: "United States" },
};

export function breadcrumbLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqLd(faqs: readonly { q: string; a: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
