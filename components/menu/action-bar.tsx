"use client";

import { motion } from "motion/react";
import { Star, Wifi, type LucideProps } from "lucide-react";

import { EASE_OUT_EXPO } from "@/lib/motion";
import type { RestaurantInfo } from "@/lib/restaurant";
import { cn } from "@/lib/utils";

import { Facebook, WhatsApp } from "./brand-icons";

interface ActionBarProps {
  restaurant: RestaurantInfo;
  onOpenWifi: () => void;
}

/** External links open in a new tab; everything else opens a sheet. */
type ActionButtonProps = {
  icon: React.ComponentType<LucideProps>;
  label: string;
} & ({ href: string; onClick?: never } | { onClick: () => void; href?: never });

const actionClassName = cn(
  "group relative flex min-h-16 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 pt-2 pb-1.5 text-white outline-none",
  "not-first:before:absolute not-first:before:inset-y-3 not-first:before:left-0 not-first:before:w-px not-first:before:bg-white/20",
  "focus-visible:ring-2 focus-visible:ring-zest focus-visible:ring-inset",
);

function ActionButton({ icon: Icon, label, href, onClick }: ActionButtonProps) {
  const content = (
    <>
      <span className="grid size-8 place-items-center">
        <Icon
          aria-hidden
          className="size-7 transition-transform duration-300 group-hover:-translate-y-0.5"
          strokeWidth={1.75}
        />
      </span>
      <span className="text-[0.72rem] leading-tight font-bold whitespace-nowrap min-[380px]:text-[0.8rem]">
        {label}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.9 }}
        className={actionClassName}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      whileTap={{ scale: 0.9 }}
      className={actionClassName}
    >
      {content}
    </motion.button>
  );
}

export function ActionBar({ restaurant, onOpenWifi }: ActionBarProps) {
  return (
    <motion.nav
      aria-label="Acciones rápidas"
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.35 }}
      className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[480px] border-t border-white/10 bg-ocean-950/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_32px_rgb(5_18_49/0.5)] backdrop-blur-md"
    >
      <div className="flex items-stretch">
        <ActionButton icon={Star} label="Reseña" href={restaurant.reviewUrl} />
        <ActionButton icon={Wifi} label="WiFi" onClick={onOpenWifi} />
        <ActionButton icon={Facebook} label="Facebook" href={restaurant.facebookUrl} />
        <ActionButton icon={WhatsApp} label="WhatsApp" href={restaurant.whatsappUrl} />
      </div>
    </motion.nav>
  );
}
