import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { CtaBand, Disclaimer, PageHero } from "@/components/site/PageParts";
import {
  DataTable,
  EditorialByline,
  KeyTakeaways,
  SourceList,
  WhyTrust,
  anchorId,
} from "@/components/site/Editorial";
import { findGuide, GUIDES } from "@/data/guides";
import { COMPANY, SERVICES } from "@/data/site";
import { ORGANIZATION_LD, absoluteUrl, breadcrumbLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => {
    const guide = findGuide(params.slug);
    if (!guide) throw notFound();
    return { slug: guide.slug };
  },
  head: ({ loaderData }) => {
    const guide = loaderData ? findGuide(loaderData.slug) : undefined;
    if (!guide)
      return {
        meta: [{ title: "Guide not found | BFG Funds" }, { name: "robots", content: "noindex" }],
      };
    const path = `/resources/${guide.slug}`;
    return pageHead({
      title: `${guide.title} | BFG Funds`,
      description: guide.description,
      path,
      type: "article",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.description,
          dateModified: guide.updated,
          mainEntityOfPage: absoluteUrl(path),
          author: { "@type": "Organization", name: `${COMPANY.displayName} Editorial Team` },
          publisher: {
            "@id": ORGANIZATION_LD["@id"],
            "@type": "Organization",
            name: COMPANY.displayName,
            logo: COMPANY.logoUrl,
          },
        },
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: guide.title, path },
        ]),
      ],
    });
  },
  component: GuidePage,
});

function GuidePage() {
  const { slug } = Route.useLoaderData();
  const guide = findGuide(slug)!;
  const services = guide.services
    .map((s) => SERVICES.find((x) => x.slug === s))
    .filter((s): s is (typeof SERVICES)[number] => Boolean(s));
  const more = GUIDES.filter((g) => g.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          crumbs={[
            { name: "Home", to: "/" },
            { name: "Resources", to: "/resources" },
            { name: guide.category },
          ]}
          eyebrow={guide.category}
          title={guide.title}
          intro={guide.description}
        >
          <EditorialByline updated={guide.updated} readMinutes={guide.readMinutes} />
        </PageHero>

        <div className="container-page grid gap-12 py-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className="max-w-3xl">
            <KeyTakeaways items={guide.takeaways} />
            <nav aria-label="On this page" className="mb-10 rounded-2xl border border-border p-6">
              <p className="text-sm font-bold uppercase tracking-widest text-navy/60">
                On this page
              </p>
              <ol className="mt-3 space-y-2 text-sm">
                {guide.sections.map((section) => (
                  <li key={section.heading}>
                    <a
                      href={`#${anchorId(section.heading)}`}
                      className="font-semibold text-cobalt hover:underline"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            {guide.sections.map((section) => (
              <section
                key={section.heading}
                id={anchorId(section.heading)}
                className="mb-10 scroll-mt-24"
              >
                <h2 className="text-2xl text-navy">{section.heading}</h2>
                {section.paragraphs?.map((p) => (
                  <p
                    key={p.slice(0, 40)}
                    className="mt-4 text-lg leading-relaxed text-muted-foreground"
                  >
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-lg leading-relaxed text-muted-foreground">
                    {section.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {section.table && <DataTable {...section.table} />}
              </section>
            ))}
            <SourceList sources={guide.sources} />
            <Disclaimer className="mt-8 border-t border-border pt-6" />
          </article>

          <aside className="space-y-8 lg:sticky lg:top-24 lg:h-fit">
            <WhyTrust />
            {services.length > 0 && (
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-navy/60">
                  Related funding
                </h2>
                <ul className="mt-4 space-y-3">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className="inline-flex items-center gap-2 font-semibold text-cobalt hover:underline"
                      >
                        {s.title}
                        <ArrowRight className="size-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-navy/60">
                More guides
              </h2>
              <ul className="mt-4 space-y-3 text-sm">
                {more.map((g) => (
                  <li key={g.slug}>
                    <Link
                      to="/resources/$slug"
                      params={{ slug: g.slug }}
                      className="font-semibold text-navy hover:text-cobalt"
                    >
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
