"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Menu } from "lucide-react";

import logo from "@/assets/brand/logo.webp";
import type { RestaurantInfo } from "@/lib/restaurant";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface MenuHeaderProps {
  restaurant: RestaurantInfo;
  onOpenNav: () => void;
}

export function MenuHeader({ restaurant, onOpenNav }: MenuHeaderProps) {
  const [mariscos, tostadas] = restaurant.slogan.split("&").map((part) => part.trim());

  return (
    <header className="relative px-4 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <div className="flex items-center justify-center gap-[1.5cqw] pt-[1cqw] pr-[5cqw]">
        <motion.div
          initial={{ opacity: 0, scale: 0.4, rotate: -25 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.05 }}
          className="shrink-0"
        >
          <motion.div
            animate={{ y: [0, -4, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: 1 }}
          >
            <Image
              src={logo}
              alt=""
              loading="eager"
              sizes="80px"
              className="size-[19cqw] max-w-none drop-shadow-[0_6px_10px_rgb(5_18_49/0.5)]"
            />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.12 }}
          className="font-brand leading-none text-white"
        >
          <span className="sr-only">{restaurant.name}</span>
          <span aria-hidden className="text-outline block text-[6.2cqw] tracking-wide">
            Los
          </span>
          <span aria-hidden className="text-outline -mt-[1.4cqw] block text-[10.5cqw] tracking-tight">
            Chucumites
          </span>
          <span className="mt-[0.6cqw] block text-right font-sans text-[3.3cqw] font-black tracking-wide uppercase">
            <span className="text-ocean-300">{mariscos}</span>
            <span className="text-white"> &amp; </span>
            <span className="text-chile [text-shadow:0_1px_0_rgb(255_255_255/0.35)]">{tostadas}</span>
          </span>
        </motion.h1>
      </div>

      <motion.button
        type="button"
        onClick={onOpenNav}
        aria-label="Abrir menú de información"
        aria-haspopup="dialog"
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.3 }}
        whileTap={{ scale: 0.88 }}
        className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-2 grid size-12 place-items-center rounded-full text-white outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-zest"
      >
        <Menu className="size-8 drop-shadow-[0_2px_3px_rgb(5_18_49/0.6)]" strokeWidth={2.75} aria-hidden />
      </motion.button>
    </header>
  );
}
