"use client";

import { motion, type Variants } from "motion/react";

import { formatPrice } from "@/lib/format";
import type { Dish } from "@/lib/menu/types";
import { EASE_OUT_EXPO } from "@/lib/motion";

import { DishTags } from "./dish-tags";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO, delay: Math.min(index, 6) * 0.05 },
  }),
};

interface DishListItemProps {
  dish: Dish;
  /** Used to stagger the items that enter together. */
  index: number;
  onSelect: (dish: Dish) => void;
}

export function DishListItem({ dish, index, onSelect }: DishListItemProps) {
  return (
    <motion.li
      layout="position"
      custom={index}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
    >
      <motion.button
        type="button"
        aria-haspopup="dialog"
        onClick={() => onSelect(dish)}
        whileTap={{ scale: 0.98 }}
        className="group relative flex w-full items-start gap-4 overflow-hidden rounded-2xl border border-white/10 bg-ocean-950/75 p-4 text-left shadow-[0_12px_30px_rgb(5_18_49/0.35)] backdrop-blur-sm transition-colors duration-300 outline-none hover:border-zest/50 focus-visible:ring-4 focus-visible:ring-zest/60"
      >
        <span
          aria-hidden
          className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-zest opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[1.6rem] leading-none tracking-wide text-zest uppercase">
            {dish.name}
          </span>
          <span className="mt-1.5 line-clamp-2 text-sm leading-snug text-white/75">{dish.description}</span>
          <DishTags tags={dish.tags} className="mt-2.5" />
        </span>
        <span className="shrink-0 rounded-full bg-zest px-3 py-1 font-display text-xl leading-tight tracking-wide text-ocean-950 shadow-[0_6px_16px_rgb(216_245_60/0.25)]">
          {formatPrice(dish.price)}
        </span>
      </motion.button>
    </motion.li>
  );
}
