"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";

import type { Category, CategoryId } from "@/lib/menu/types";
import { EASE_OUT_EXPO, snappySpring } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { CategoryIcon } from "./category-icon";

interface CategoryTabsProps {
  categories: Category[];
  activeId: CategoryId;
  /** Dims the selection while a search spans every category. */
  isSearching: boolean;
  panelId: string;
  onChange: (id: CategoryId) => void;
}

export function CategoryTabs({ categories, activeId, isSearching, panelId, onChange }: CategoryTabsProps) {
  const tabRefs = useRef(new Map<CategoryId, HTMLButtonElement>());

  // Keep the active chip in view when it changes (tap, keyboard or side menu).
  useEffect(() => {
    tabRefs.current.get(activeId)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeId]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const index = categories.findIndex((category) => category.id === activeId);
    const targets: Record<string, number> = {
      ArrowRight: (index + 1) % categories.length,
      ArrowLeft: (index - 1 + categories.length) % categories.length,
      Home: 0,
      End: categories.length - 1,
    };
    const next = targets[event.key];
    if (next === undefined) return;

    event.preventDefault();
    const nextId = categories[next].id;
    onChange(nextId);
    tabRefs.current.get(nextId)?.focus();
  }

  return (
    <motion.div
      layoutScroll
      role="tablist"
      aria-label="Categorías del menú"
      onKeyDown={handleKeyDown}
      className="scrollbar-none mask-fade-x -mx-4 flex snap-x gap-2 overflow-x-auto scroll-px-4 px-4 py-1.5"
    >
      {categories.map((category, index) => {
        const isActive = category.id === activeId;
        return (
          <motion.button
            key={category.id}
            ref={(node) => {
              if (node) tabRefs.current.set(category.id, node);
              else tabRefs.current.delete(category.id);
            }}
            type="button"
            role="tab"
            id={`tab-${category.id}`}
            aria-selected={isActive}
            aria-controls={panelId}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(category.id)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.25 + index * 0.05 }}
            whileTap={{ scale: 0.94 }}
            className={cn(
              "relative flex h-10 shrink-0 snap-start items-center gap-1.5 rounded-full border-2 border-ocean-700/70 bg-ocean-900/90 pr-3.5 pl-2.5 shadow-[0_6px_14px_rgb(5_18_49/0.35)] outline-none",
              "font-display text-[0.95rem] tracking-wide uppercase transition-colors duration-300",
              "focus-visible:ring-2 focus-visible:ring-white/80",
              isActive ? "text-zest" : "text-white hover:border-ocean-400",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="active-category"
                aria-hidden
                animate={{ opacity: isSearching ? 0.35 : 1 }}
                transition={snappySpring}
                className="absolute -inset-0.5 rounded-full border-[3px] border-zest bg-ocean-950 shadow-[0_0_20px_rgb(216_245_60/0.4)]"
              />
            )}
            <CategoryIcon
              name={category.icon}
              strokeWidth={1.75}
              className={cn(
                "relative size-5.5 transition-colors duration-300",
                isActive ? "text-zest" : "text-ocean-300",
              )}
            />
            <span className="relative">{category.label}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
