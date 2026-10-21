"use client";

import { AnimatePresence, motion } from "motion/react";
import { CircleCheck, ConciergeBell, Loader2, ReceiptText, Star, Wifi, type LucideIcon } from "lucide-react";

import type { ServiceRequest } from "@/hooks/use-service-request";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ActionBarProps {
  waiter: ServiceRequest;
  bill: ServiceRequest;
  onOpenReview: () => void;
  onOpenWifi: () => void;
}

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  service?: ServiceRequest;
  doneLabel?: string;
  hasPopup?: boolean;
}

function ActionButton({ icon: Icon, label, onClick, service, doneLabel, hasPopup }: ActionButtonProps) {
  const isPending = service?.isPending ?? false;
  const isDone = service?.isRequested ?? false;
  const state = isPending ? "pending" : isDone ? "done" : "idle";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-haspopup={hasPopup ? "dialog" : undefined}
      aria-disabled={isPending || isDone || undefined}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "group relative flex min-h-16 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 pt-2 pb-1.5 text-white outline-none",
        "not-first:before:absolute not-first:before:inset-y-3 not-first:before:left-0 not-first:before:w-px not-first:before:bg-white/20",
        "focus-visible:ring-2 focus-visible:ring-zest focus-visible:ring-inset",
      )}
    >
      <span className="relative grid size-8 place-items-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={state}
            initial={{ scale: 0.3, opacity: 0, rotate: -45 }}
            animate={
              state === "done"
                ? { scale: 1, opacity: 1, rotate: [0, -16, 12, -8, 0] }
                : { scale: 1, opacity: 1, rotate: 0 }
            }
            exit={{ scale: 0.3, opacity: 0 }}
            transition={{ duration: state === "done" ? 0.6 : 0.2, ease: EASE_OUT_EXPO }}
            className="grid place-items-center"
          >
            {state === "pending" && <Loader2 aria-hidden className="size-7 animate-spin" />}
            {state === "done" && <CircleCheck aria-hidden className="size-7 text-zest" strokeWidth={2} />}
            {state === "idle" && (
              <Icon
                aria-hidden
                className="size-7 transition-transform duration-300 group-hover:-translate-y-0.5"
                strokeWidth={1.75}
              />
            )}
          </motion.span>
        </AnimatePresence>
      </span>
      <span
        className={cn(
          "text-[0.72rem] leading-tight font-bold whitespace-nowrap min-[380px]:text-[0.8rem]",
          isDone && "text-zest",
        )}
      >
        {isDone && doneLabel ? doneLabel : label}
      </span>
    </motion.button>
  );
}

export function ActionBar({ waiter, bill, onOpenReview, onOpenWifi }: ActionBarProps) {
  return (
    <motion.nav
      aria-label="Acciones rápidas"
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.35 }}
      className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[480px] border-t border-white/10 bg-ocean-950/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_32px_rgb(5_18_49/0.5)] backdrop-blur-md"
    >
      <div className="flex items-stretch">
        <ActionButton icon={Star} label="Reseña" onClick={onOpenReview} hasPopup />
        <ActionButton
          icon={ConciergeBell}
          label="Pedir mesero"
          doneLabel="En camino"
          onClick={waiter.request}
          service={waiter}
        />
        <ActionButton
          icon={ReceiptText}
          label="Pedir cuenta"
          doneLabel="Solicitada"
          onClick={bill.request}
          service={bill}
        />
        <ActionButton icon={Wifi} label="WiFi" onClick={onOpenWifi} hasPopup />
      </div>
    </motion.nav>
  );
}
