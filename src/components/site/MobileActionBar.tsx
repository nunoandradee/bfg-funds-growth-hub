import { useEffect, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";

import { COMPANY } from "@/data/site";

/**
 * Phones only: Call and Apply stay one tap away once the visitor scrolls past
 * the top of the page (where the header already shows them).
 */
export function MobileActionBar() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!shown}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_-12px_rgba(15,23,42,0.25)] backdrop-blur-md transition-transform duration-300 lg:hidden ${
        shown ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-md gap-3">
        <a
          href={COMPANY.phoneHref}
          tabIndex={shown ? 0 : -1}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-navy px-4 py-3 text-sm font-bold text-navy"
        >
          <Phone className="size-4" />
          Call us
        </a>
        <a
          href="/apply"
          tabIndex={shown ? 0 : -1}
          className="inline-flex flex-[1.4] items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-extrabold text-gold-foreground shadow-card"
        >
          Apply now
          <ArrowRight className="size-4" />
        </a>
      </div>
    </div>
  );
}
