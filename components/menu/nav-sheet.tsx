"use client";

import { motion } from "motion/react";
import { ChevronRight, Clock, MapPin, Phone } from "lucide-react";

import type { Category, CategoryId } from "@/lib/menu/types";
import type { RestaurantInfo } from "@/lib/restaurant";
import { EASE_OUT_EXPO } from "@/lib/motion";

import { CategoryIcon } from "./category-icon";
import { MenuSheet } from "./menu-sheet";

interface NavSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  restaurant: RestaurantInfo;
  categories: Category[];
  onSelectCategory: (id: CategoryId) => void;
}

function reveal(index: number) {
  return {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.45, ease: EASE_OUT_EXPO, delay: 0.12 + index * 0.04 },
  };
}

export function NavSheet({ open, onOpenChange, restaurant, categories, onSelectCategory }: NavSheetProps) {
  return (
    <MenuSheet
      side="right"
      open={open}
      onOpenChange={onOpenChange}
      title={restaurant.name}
      description={restaurant.slogan}
      className="pt-6"
    >
      <nav aria-label="Categorías">
        <h2 className="mb-2 text-xs font-extrabold tracking-[0.2em] text-white/50 uppercase">Menú</h2>
        <ul className="space-y-1">
          {categories.map((category, index) => (
            <motion.li key={category.id} {...reveal(index)}>
              <button
                type="button"
                onClick={() => onSelectCategory(category.id)}
                className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left font-display text-xl tracking-wide uppercase transition-colors outline-none hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-zest"
              >
                <CategoryIcon name={category.icon} className="size-6 text-ocean-300" strokeWidth={1.75} />
                <span className="flex-1">{category.label}</span>
                <ChevronRight
                  aria-hidden
                  className="size-5 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-zest"
                />
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>

      <motion.section {...reveal(categories.length)} className="mt-8 space-y-5 border-t border-white/10 pt-6 pb-6">
        <h2 className="text-xs font-extrabold tracking-[0.2em] text-white/50 uppercase">Visítanos</h2>

        <div className="flex gap-3">
          <Clock aria-hidden className="mt-0.5 size-5 shrink-0 text-zest" />
          <dl className="space-y-1 text-sm">
            {restaurant.hours.map(({ days, time }) => (
              <div key={days}>
                <dt className="font-bold">{days}</dt>
                <dd className="text-white/70">{time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <a
          href={restaurant.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-3 rounded-lg text-sm outline-none hover:text-zest focus-visible:ring-2 focus-visible:ring-zest"
        >
          <MapPin aria-hidden className="size-5 shrink-0 text-zest" />
          {restaurant.address}
        </a>

        <a
          href={`tel:${restaurant.phone.replace(/\s+/g, "")}`}
          className="flex gap-3 rounded-lg text-sm outline-none hover:text-zest focus-visible:ring-2 focus-visible:ring-zest"
        >
          <Phone aria-hidden className="size-5 shrink-0 text-zest" />
          {restaurant.phone}
        </a>
      </motion.section>
    </MenuSheet>
  );
}
