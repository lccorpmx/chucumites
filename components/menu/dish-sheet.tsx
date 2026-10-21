"use client";

import { motion } from "motion/react";
import { ConciergeBell, Loader2 } from "lucide-react";

import type { ServiceRequest } from "@/hooks/use-service-request";
import { formatPrice } from "@/lib/format";
import type { Dish } from "@/lib/menu/types";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { artAspectRatio, DishArt } from "./dish-art";
import { DishTags } from "./dish-tags";
import { MenuSheet } from "./menu-sheet";

interface DishSheetProps {
  dish: Dish | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  waiter: ServiceRequest;
}

export function DishSheet({ dish, open, onOpenChange, waiter }: DishSheetProps) {
  if (!dish) return null;

  const price = formatPrice(dish.price);

  // Same composition as the list row, with the price in the brush label.
  const media = dish.feature && (
    <motion.div
      key={dish.id}
      initial="hidden"
      animate="visible"
      className="@container relative mt-3"
      style={{ aspectRatio: artAspectRatio(dish.feature) }}
    >
      <DishArt
        feature={dish.feature}
        titleLines={[price]}
        tagline="por orden"
        labelSize="lg"
        sizes="(min-width: 480px) 400px, 84vw"
      />
    </motion.div>
  );

  return (
    <MenuSheet open={open} onOpenChange={onOpenChange} title={dish.name} description={dish.tagline} media={media}>
      <motion.div
        key={dish.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.15 }}
        className="space-y-5 pb-2"
      >
        <DishTags tags={dish.tags} />
        <p className="leading-relaxed text-white/85">{dish.description}</p>

        <div
          className={cn(
            "flex items-center justify-between gap-4",
            !dish.feature && "rounded-2xl border border-white/10 bg-ocean-950/60 p-3 pl-4",
          )}
        >
          {!dish.feature && (
            <div>
              <p className="text-xs font-extrabold tracking-[0.2em] text-white/50 uppercase">Precio</p>
              <p className="font-display text-4xl leading-none tracking-wide text-zest">{price}</p>
            </div>
          )}
          <motion.button
            type="button"
            onClick={waiter.request}
            disabled={waiter.isPending || waiter.isRequested}
            whileTap={{ scale: 0.95 }}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-zest px-5 font-extrabold text-ocean-950 shadow-[0_10px_24px_rgb(216_245_60/0.3)] transition-opacity outline-none focus-visible:ring-4 focus-visible:ring-white/60 disabled:opacity-60"
          >
            {waiter.isPending ? (
              <Loader2 aria-hidden className="size-5 animate-spin" />
            ) : (
              <ConciergeBell aria-hidden className="size-5" />
            )}
            {waiter.isRequested ? "Mesero en camino" : "Ordenar con mesero"}
          </motion.button>
        </div>
      </motion.div>
    </MenuSheet>
  );
}
