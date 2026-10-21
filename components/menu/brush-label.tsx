"use client";

import { motion, type Variants } from "motion/react";

import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

const panelVariants: Variants = {
  hidden: { opacity: 0, x: 28, clipPath: "inset(0% 0% 0% 100%)" },
  visible: {
    opacity: 1,
    x: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.75, ease: EASE_OUT_EXPO, delay: 0.15 },
  },
};

const textVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: "55%", skewX: -8 },
  visible: { opacity: 1, y: 0, skewX: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

const taglineVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.6 } },
};

const sparkVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { delay: 0.7 + i * 0.08, duration: 0.35, ease: "easeOut" },
  }),
};

/** Rough dry-brush panel; stretched to fit, so its edges stay irregular at any size. */
function BrushShape({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 140"
      preserveAspectRatio="none"
      aria-hidden
      className={cn("pointer-events-none", className)}
    >
      <path
        className="fill-ocean-950/95"
        d="M7 9C42 4 88 8 128 5s58-3 68 3l-4 14 7 12-6 16 5 16-7 16 6 16-5 16 6 14-4 6c-44 4-94-2-134 2S14 139 4 133l4-15-6-16 5-16-6-16 5-16-6-16 5-16Z"
      />
      <path
        className="fill-ocean-950/80"
        d="M189 27h10v3h-10zM191 74h9v2.5h-9zM0 58h9v3H0zM2 112h8v2.5H2zM40 135h60v3H40z"
      />
      <path
        className="fill-white/[0.05]"
        d="M14 22c50-3 110-2 172 0v2c-62-1-122-2-172 1zM12 108c60 2 118 1 176-1v2c-58 3-116 3-176 1z"
      />
    </svg>
  );
}

function Sparks({ className }: { className?: string }) {
  const strokes = ["M6 28 3 13", "M13 23l11-13", "M17 32l15-4"];
  return (
    <svg viewBox="0 0 36 40" fill="none" aria-hidden className={cn("pointer-events-none", className)}>
      {strokes.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          custom={i}
          variants={sparkVariants}
          className="stroke-zest"
          strokeWidth={4}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

interface BrushLabelProps {
  titleLines: string[];
  tagline?: string;
  /** `lg` suits short titles such as a price. */
  size?: "md" | "lg";
  style?: React.CSSProperties;
  className?: string;
}

export function BrushLabel({ titleLines, tagline, size = "md", style, className }: BrushLabelProps) {
  return (
    <div
      className={cn("absolute drop-shadow-[0_10px_18px_rgb(5_18_49/0.45)]", className)}
      style={style}
    >
      <Sparks className="absolute -top-[6.5cqw] right-[0.5cqw] w-[6.5cqw]" />
      <Sparks className="absolute right-[1cqw] -bottom-[6.5cqw] w-[6cqw] -scale-y-100" />

      <motion.div
        variants={panelVariants}
        className="relative flex size-full flex-col items-center justify-center px-[2.5cqw] py-[2.5cqw] text-center"
      >
        <BrushShape className="absolute inset-0 size-full" />

        <motion.h3
          variants={textVariants}
          className={cn(
            "relative font-display tracking-[0.01em] text-zest uppercase",
            size === "lg" ? "text-[10cqw]" : "text-[6cqw]",
            // After the size: tailwind-merge drops a line-height that precedes a font-size.
            "leading-[0.98]",
          )}
        >
          {titleLines.map((line) => (
            // Clip only the bottom edge so accents and the italic overhang stay visible.
            <span key={line} className="block whitespace-nowrap [clip-path:inset(-50%_-10%_0_-10%)]">
              <motion.span variants={lineVariants} className="inline-block">
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h3>

        {tagline && (
          <motion.p
            variants={taglineVariants}
            className="relative mt-[1.2cqw] text-[3.4cqw] leading-[1.15] font-bold text-balance text-white"
          >
            {tagline}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
