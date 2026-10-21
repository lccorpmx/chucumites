"use client";

import { motion } from "motion/react";

import type { Dish, DishWithFeature } from "@/lib/menu/types";
import { cn } from "@/lib/utils";

import { artAspectRatio, DishArt } from "./dish-art";

interface FeaturedDishProps {
  dish: DishWithFeature;
  /** Position in the list: rows overlap the previous one and the first is the LCP image. */
  index: number;
  onSelect: (dish: Dish) => void;
}

export function FeaturedDish({ dish, index, onSelect }: FeaturedDishProps) {
  const isFirst = index === 0;

  return (
    <motion.li
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={cn("relative", !isFirst && "mt-[-9cqw]")}
      style={{ aspectRatio: artAspectRatio(dish.feature) }}
    >
      <motion.button
        type="button"
        aria-haspopup="dialog"
        onClick={() => onSelect(dish)}
        whileTap={{ scale: 0.985 }}
        className="group absolute inset-0 block rounded-4xl text-left outline-none focus-visible:ring-4 focus-visible:ring-zest/70"
      >
        <DishArt
          feature={dish.feature}
          titleLines={dish.feature.titleLines}
          tagline={dish.tagline}
          sizes="(min-width: 480px) 400px, 84vw"
          isPriority={isFirst}
        />
      </motion.button>
    </motion.li>
  );
}
