"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, Wifi } from "lucide-react";
import { toast } from "sonner";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import type { RestaurantInfo } from "@/lib/restaurant";

import { MenuSheet } from "./menu-sheet";

interface WifiSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  wifi: RestaurantInfo["wifi"];
}

export function WifiSheet({ open, onOpenChange, wifi }: WifiSheetProps) {
  const { copiedValue, copy } = useCopyToClipboard();

  async function handleCopy(label: string, value: string) {
    const ok = await copy(value);
    if (ok) toast.success(`${label} copiada`);
    else toast.error("No se pudo copiar", { description: value });
  }

  const rows = [
    { label: "Red", value: wifi.network },
    { label: "Contraseña", value: wifi.password },
  ];

  return (
    <MenuSheet
      open={open}
      onOpenChange={onOpenChange}
      title="WiFi gratis"
      description="Conéctate y comparte tus platillos favoritos."
    >
      <div className="relative mx-auto my-4 grid size-24 place-items-center" aria-hidden>
        {[0, 1, 2].map((ring) => (
          <motion.span
            key={ring}
            className="absolute inset-0 rounded-full border-2 border-zest/60"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.6, 1.4], opacity: [0.7, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: ring * 0.8, ease: "easeOut" }}
          />
        ))}
        <span className="grid size-16 place-items-center rounded-full bg-zest text-ocean-950">
          <Wifi className="size-8" strokeWidth={2.5} />
        </span>
      </div>

      <dl className="space-y-3 pb-2">
        {rows.map(({ label, value }) => {
          const isCopied = copiedValue === value;
          return (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-ocean-950/60 py-3 pr-3 pl-4"
            >
              <div className="min-w-0 flex-1">
                <dt className="text-xs font-extrabold tracking-[0.2em] text-white/50 uppercase">{label}</dt>
                <dd className="truncate font-mono text-lg font-semibold">{value}</dd>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(label, value)}
                aria-label={`Copiar ${label.toLowerCase()}`}
                className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 transition-colors outline-none hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-zest"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isCopied ? "check" : "copy"}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isCopied ? (
                      <Check aria-hidden className="size-5 text-zest" strokeWidth={3} />
                    ) : (
                      <Copy aria-hidden className="size-5" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          );
        })}
      </dl>
    </MenuSheet>
  );
}
