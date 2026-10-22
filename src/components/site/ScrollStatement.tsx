import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

const STATEMENT =
  "Banks look at a score. We look at the business you built: your deposits, your seasons, your customers and the work you put in every day.";
const ACCENT_FROM = 6; // "We look at the business you built:" onward gets the accent color on key words
const ACCENT_WORDS = new Set(["business", "built:"]);

/**
 * One big sentence that lights up word by word as it scrolls through the
 * viewport. The words are plain text in the server HTML; only their opacity
 * follows the scroll, and reduced motion shows the sentence fully lit.
 */
export function ScrollStatement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = STATEMENT.split(" ");

  return (
    <section data-motion className="py-24 md:py-36">
      <div className="container-page">
        <p
          ref={ref}
          className="mx-auto max-w-5xl text-[2rem] font-extrabold leading-[1.15] tracking-[-0.03em] text-navy sm:text-5xl md:text-[3.6rem]"
        >
          {words.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
              still={Boolean(reduce)}
              accent={i >= ACCENT_FROM && ACCENT_WORDS.has(word)}
            >
              {word}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
  still,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <>
      <motion.span
        style={{ opacity: still ? 1 : opacity }}
        className={accent ? "text-cobalt" : undefined}
      >
        {children}
      </motion.span>{" "}
    </>
  );
}
