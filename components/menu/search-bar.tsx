"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";

import { EASE_OUT_EXPO } from "@/lib/motion";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        inputRef.current?.blur(); // Dismiss the on-screen keyboard.
      }}
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.15 }}
      className="group relative"
    >
      <label htmlFor="menu-search" className="sr-only">
        Buscar en el menú
      </label>
      <Search
        aria-hidden
        strokeWidth={2.5}
        className="pointer-events-none absolute top-1/2 left-4 size-6 -translate-y-1/2 text-ocean-950 transition-transform duration-300 group-focus-within:scale-110"
      />
      <input
        ref={inputRef}
        id="menu-search"
        type="search"
        inputMode="search"
        enterKeyHint="search"
        autoComplete="off"
        placeholder="¿Qué se te antoja?"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full appearance-none rounded-full border-2 border-transparent bg-white pr-12 pl-13 text-base font-semibold text-ocean-950 shadow-[0_10px_24px_rgb(5_18_49/0.3)] transition-[border-color,box-shadow] duration-300 outline-none placeholder:font-medium placeholder:text-slate-400 focus:border-zest focus:shadow-[0_0_0_4px_rgb(216_245_60/0.35),0_10px_24px_rgb(5_18_49/0.3)] [&::-webkit-search-cancel-button]:hidden"
      />
      <AnimatePresence>
        {value && (
          <motion.button
            type="button"
            aria-label="Limpiar búsqueda"
            onClick={() => {
              onChange("");
              inputRef.current?.focus();
            }}
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
            transition={{ duration: 0.2 }}
            className="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-ocean-900/10 text-ocean-950 outline-none hover:bg-ocean-900/20 focus-visible:ring-2 focus-visible:ring-ocean-500"
          >
            <X className="size-4" strokeWidth={3} aria-hidden />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
