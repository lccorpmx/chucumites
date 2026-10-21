"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";

import type { DishFeature } from "@/lib/menu/types";
import { plateSpring } from "@/lib/motion";

import { BrushLabel } from "./brush-label";

const plateVariants: Variants = {
  hidden: { opacity: 0, x: "-22%", rotate: -7, scale: 0.92 },
  visible: { opacity: 1, x: 0, rotate: 0, scale: 1, transition: plateSpring },
};

/** Width / height of the composition, derived from the photo and its relative width. */
export function artAspectRatio({ image, width }: DishFeature): number {
  return image.width / (image.height * width);
}

interface DishArtProps {
  feature: DishFeature;
  titleLines: string[];
  tagline?: string;
  labelSize?: "md" | "lg";
  sizes: string;
  /** Marks the photo as the page's LCP candidate. */
  isPriority?: boolean;
}

/**
 * Art-directed plate photo with its brush label. The label always covers the
 * photo's right edge, so cut-outs can be trimmed there. Must be rendered inside
 * a positioned `@container` whose aspect ratio is `artAspectRatio(feature)`;
 * the parent drives the `hidden` → `visible` variants.
 */
export function DishArt({ feature, titleLines, tagline, labelSize, sizes, isPriority = false }: DishArtProps) {
  const { image, width, label } = feature;

  return (
    <>
      <motion.div
        variants={plateVariants}
        className="absolute top-0 left-0 origin-left"
        style={{ width: `${width * 100}%` }}
      >
        <Image
          src={image}
          alt=""
          sizes={sizes}
          loading={isPriority ? "eager" : "lazy"}
          fetchPriority={isPriority ? "high" : "auto"}
          className="h-auto w-full drop-shadow-[0_22px_22px_rgb(5_18_49/0.5)] transition-transform duration-700 ease-out-expo group-hover:scale-[1.03] group-hover:-rotate-1 group-active:scale-[1.01]"
        />
      </motion.div>

      <BrushLabel
        titleLines={titleLines}
        tagline={tagline}
        size={labelSize}
        className="transition-transform duration-500 ease-out-expo group-hover:-translate-x-[1cqw]"
        style={{ top: `${label.top}%`, bottom: `${label.bottom}%`, left: `${label.left}%`, right: "1.5%" }}
      />
    </>
  );
}
