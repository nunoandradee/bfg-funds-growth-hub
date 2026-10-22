import type { HTMLAttributes, PointerEvent } from "react";

/**
 * A card that lights up under the pointer. The position goes straight into CSS
 * variables (no React state), and the glow itself lives in styles.css.
 */
export function Spotlight({ className = "", children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - box.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - box.top}px`);
  };
  return (
    <div {...rest} onPointerMove={onPointerMove} className={`spotlight ${className}`}>
      {children}
    </div>
  );
}
