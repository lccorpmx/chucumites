import type { Transition } from "motion/react";

/** Shared motion language so every surface moves the same way. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const snappySpring = { type: "spring", stiffness: 420, damping: 32 } satisfies Transition;

export const plateSpring = { type: "spring", stiffness: 70, damping: 15, mass: 0.9 } satisfies Transition;
