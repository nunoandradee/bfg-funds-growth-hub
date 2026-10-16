import { useEffect } from "react";

// Sections and cards below the fold fade up as they scroll into view, on every
// page. Content is never hidden in the server HTML (search engines and no-JS
// visitors see everything); only elements still below the viewport are
// prepared for the animation once the page is running. Skipped entirely for
// visitors who ask for reduced motion.
const TARGETS = [
  "main section > .container-page > *",
  "main section .grid > *",
  "main section ol > li",
].join(", ");

export function useScrollReveal(routeKey: string) {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fold = window.innerHeight;
    const pending = Array.from(document.querySelectorAll<HTMLElement>(TARGETS)).filter(
      (el) => !el.dataset["reveal"] && el.getBoundingClientRect().top > fold,
    );
    // Cards in the same grid follow each other by a beat.
    pending.forEach((el) => {
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      const index = siblings.indexOf(el);
      el.style.setProperty("--reveal-delay", `${Math.min(Math.max(index, 0), 5) * 70}ms`);
      el.dataset["reveal"] = "pending";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset["reveal"] = "shown";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    pending.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [routeKey]);
}
