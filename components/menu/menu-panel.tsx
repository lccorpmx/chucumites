"use client";

import { AnimatePresence, motion } from "motion/react";
import { SearchX } from "lucide-react";

import type { DishSelection } from "@/lib/menu/select";
import type { Dish } from "@/lib/menu/types";
import { EASE_OUT_EXPO } from "@/lib/motion";

import { DishListItem } from "./dish-list-item";
import { FeaturedDish } from "./featured-dish";

interface MenuPanelProps {
  id: string;
  labelledBy: string;
  selection: DishSelection;
  heading: string;
  query: string;
  onSelectDish: (dish: Dish) => void;
  onClearSearch: () => void;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
      className="relative mb-4 inline-block font-display text-[2.1rem] leading-none tracking-wide text-white uppercase [text-shadow:0_3px_0_var(--color-ocean-950)]"
    >
      {children}
      <svg viewBox="0 0 120 10" preserveAspectRatio="none" aria-hidden className="absolute -bottom-2 left-0 h-2.5 w-full">
        <motion.path
          d="M2 7c30-5 70-6 116-3"
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          className="stroke-zest"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.2 }}
        />
      </svg>
    </motion.h2>
  );
}

function EmptyState({ query, onClearSearch }: { query: string; onClearSearch: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
      className="mx-4 mt-4 rounded-3xl border border-white/10 bg-ocean-950/75 px-6 py-10 text-center backdrop-blur-sm"
    >
      <motion.span
        className="inline-grid"
        animate={{ rotate: [0, -10, 10, -6, 0] }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <SearchX aria-hidden className="size-12 text-zest" strokeWidth={1.75} />
      </motion.span>
      <p className="mt-4 font-display text-3xl tracking-wide uppercase">Sin resultados</p>
      <p className="mt-2 text-white/75">
        No encontramos “{query.trim()}”. Prueba con camarón, filete o tacos.
      </p>
      <button
        type="button"
        onClick={onClearSearch}
        className="mt-6 inline-flex h-11 items-center rounded-full bg-zest px-6 font-extrabold text-ocean-950 outline-none focus-visible:ring-4 focus-visible:ring-white/60"
      >
        Ver todo el menú
      </button>
    </motion.div>
  );
}

export function MenuPanel({ id, labelledBy, selection, heading, query, onSelectDish, onClearSearch }: MenuPanelProps) {
  const { featured, others } = selection;
  const total = featured.length + others.length;
  const isSearching = query.trim().length > 0;

  return (
    <section
      id={id}
      role="tabpanel"
      aria-labelledby={isSearching ? undefined : labelledBy}
      aria-label={isSearching ? "Resultados de búsqueda" : undefined}
    >
      <p className="sr-only" aria-live="polite">
        {isSearching ? `${total} ${total === 1 ? "platillo encontrado" : "platillos encontrados"}` : ""}
      </p>

      {total === 0 ? (
        <EmptyState query={query} onClearSearch={onClearSearch} />
      ) : (
        <>
          {featured.length > 0 && (
            <ul className="relative">
              {featured.map((dish, index) => (
                <FeaturedDish key={dish.id} dish={dish} index={index} onSelect={onSelectDish} />
              ))}
            </ul>
          )}

          {others.length > 0 && (
            <div className={featured.length > 0 ? "mt-10 px-4" : "mt-2 px-4"}>
              <SectionHeading>{heading}</SectionHeading>
              <ul className="space-y-3">
                <AnimatePresence>
                  {others.map((dish, index) => (
                    <DishListItem key={dish.id} dish={dish} index={index} onSelect={onSelectDish} />
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          )}
        </>
      )}
    </section>
  );
}
