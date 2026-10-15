import { createFileRoute } from "@tanstack/react-router";

import { CALCULATORS } from "@/data/calculators";
import { GUIDES } from "@/data/guides";
import { INDUSTRY_PAGES } from "@/data/industries";
import { SERVICES } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

// Every indexable page, generated from the same data the pages render, so a
// new service, industry or guide is listed automatically.
function sitemapPaths(): { path: string; priority: string; lastmod?: string }[] {
  return [
    { path: "/", priority: "1.0" },
    { path: "/services", priority: "0.9" },
    ...SERVICES.map((s) => ({ path: `/services/${s.slug}`, priority: "0.9" })),
    { path: "/industries", priority: "0.8" },
    ...INDUSTRY_PAGES.map((i) => ({ path: `/industries/${i.slug}`, priority: "0.7" })),
    { path: "/calculators", priority: "0.8" },
    ...CALCULATORS.map((c) => ({ path: c.path, priority: "0.8" })),
    { path: "/resources", priority: "0.7" },
    ...GUIDES.map((g) => ({ path: `/resources/${g.slug}`, priority: "0.7", lastmod: g.updated })),
    { path: "/about", priority: "0.6" },
    { path: "/faq", priority: "0.6" },
    { path: "/editorial-standards", priority: "0.4" },
    { path: "/contact", priority: "0.6" },
    { path: "/apply", priority: "0.8" },
    { path: "/privacy-policy", priority: "0.2" },
    { path: "/terms-of-service", priority: "0.2" },
    { path: "/sms-terms", priority: "0.2" },
  ];
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = sitemapPaths()
          .map(
            (u) =>
              `  <url><loc>${absoluteUrl(u.path)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}<priority>${u.priority}</priority></url>`,
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        return new Response(xml, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
