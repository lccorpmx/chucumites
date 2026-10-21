"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Star } from "lucide-react";

import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { MenuSheet } from "./menu-sheet";

const RATINGS = [1, 2, 3, 4, 5] as const;
const RATING_LABELS = ["Mala", "Regular", "Buena", "Muy buena", "¡Excelente!"];

interface ReviewSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reviewUrl: string;
}

export function ReviewSheet({ open, onOpenChange, reviewUrl }: ReviewSheetProps) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const shown = hovered || rating;

  return (
    <MenuSheet
      open={open}
      onOpenChange={onOpenChange}
      title="¿Qué tal tu visita?"
      description="Tu opinión nos ayuda a seguir sirviendo lo mejor del mar."
    >
      <div
        role="radiogroup"
        aria-label="Calificación"
        className="flex justify-center gap-2 py-4"
        onPointerLeave={() => setHovered(0)}
      >
        {RATINGS.map((value) => {
          const isFilled = value <= shown;
          return (
            <motion.button
              key={value}
              type="button"
              role="radio"
              aria-checked={rating === value}
              aria-label={`${value} de 5 estrellas`}
              onClick={() => setRating(value)}
              onPointerEnter={() => setHovered(value)}
              whileTap={{ scale: 0.8 }}
              animate={rating === value ? { scale: [1, 1.35, 1], rotate: [0, -12, 0] } : { scale: 1 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              className="grid size-12 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-zest"
            >
              <Star
                aria-hidden
                className={cn(
                  "size-10 transition-colors duration-200",
                  isFilled ? "fill-zest text-zest" : "fill-transparent text-white/40",
                )}
              />
            </motion.button>
          );
        })}
      </div>

      <p aria-live="polite" className="h-6 text-center font-display text-xl tracking-wide text-white uppercase">
        {shown > 0 && RATING_LABELS[shown - 1]}
      </p>

      <AnimatePresence initial={false}>
        {rating > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-4 pb-2 text-center">
              <p className="text-white/80">
                {rating >= 4
                  ? "¡Gracias! ¿Nos ayudas compartiéndolo en Google? Solo toma un minuto."
                  : "Gracias por decírnoslo. Cuéntanos qué podemos mejorar; lo leemos todo."}
              </p>
              <a
                href={reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-zest font-extrabold text-ocean-950 shadow-[0_10px_24px_rgb(216_245_60/0.3)] outline-none focus-visible:ring-4 focus-visible:ring-white/60"
              >
                Escribir reseña en Google
                <ExternalLink aria-hidden className="size-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MenuSheet>
  );
}
