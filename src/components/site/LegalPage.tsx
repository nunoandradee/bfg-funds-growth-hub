import type { ReactNode } from "react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

export function LegalPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <header className="border-b border-border bg-surface py-16 md:py-20">
          <div className="container-page max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cobalt">{eyebrow}</p>
            <h1 className="mt-4 text-4xl font-extrabold text-navy md:text-5xl">{title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">{intro}</p>
            <p className="mt-4 text-sm font-semibold text-navy/70">Effective September 28, 2026</p>
          </div>
        </header>
        <div className="container-page max-w-4xl py-14 md:py-20">
          <div className="space-y-10 text-base leading-7 text-muted-foreground [&_a]:font-semibold [&_a]:text-cobalt [&_a]:underline [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-navy [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}