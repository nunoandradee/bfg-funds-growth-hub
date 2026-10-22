import { useEffect } from "react";

// Smooth, weighted scrolling (Lenis) across the site. Native scroll position
// is kept, so anchors, Motion's useScroll and the scroll reveal keep working.
// Skipped for visitors who ask for reduced motion and on touch screens, where
// the native feel is better.
export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;
    let destroyed = false;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;

    void import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      lenis = new Lenis({ duration: 1.1, anchors: true });
      const loop = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);
}
