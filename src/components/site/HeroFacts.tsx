/**
 * Four plain facts directly under the hero, on the same navy so they read as
 * its footing. Static on purpose: the numbers are the point, not the motion.
 * Every figure here is already stated elsewhere on the site.
 */
const FACTS = [
  { value: "$10K–$2M", label: "Funding amounts" },
  { value: "8", label: "Funding products compared" },
  { value: "24–48h", label: "Typical decision time" },
  { value: "1", label: "Specialist, start to finish" },
];

// Hairlines between cells: a 2x2 grid on phones, one row on wide screens.
const CELL_BORDERS = [
  "",
  "border-l border-white/10 pl-6 md:pl-10",
  "border-t border-white/10 lg:border-l lg:border-t-0 lg:pl-10",
  "border-l border-t border-white/10 pl-6 md:pl-10 lg:border-t-0",
];

export function HeroFacts() {
  return (
    <section
      aria-label="BFG Funds at a glance"
      className="border-t border-white/10 bg-navy text-navy-foreground"
    >
      <dl className="container-page grid grid-cols-2 lg:grid-cols-4">
        {FACTS.map((fact, i) => (
          <div key={fact.label} className={`flex flex-col py-7 md:py-9 ${CELL_BORDERS[i]}`}>
            <dt className="order-2 mt-1.5 text-sm text-navy-foreground/55">{fact.label}</dt>
            <dd className="order-1 text-3xl font-extrabold tracking-[-0.03em] tabular-nums md:text-4xl">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
