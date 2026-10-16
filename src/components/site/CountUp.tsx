import { useEffect, useRef, useState } from "react";

/**
 * A number that counts up when it scrolls into view. The server HTML and
 * reduced-motion visitors get the final value straight away.
 */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1100,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen
    setValue(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(to * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
