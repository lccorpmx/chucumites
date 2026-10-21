import type { StaticImageData } from "next/image";

export type CategoryId = "favoritos" | "filetes" | "mariscos" | "tacos" | "bebidas";

export type CategoryIcon = "shrimp" | "fish" | "shell" | "taco" | "drink";

export interface Category {
  id: CategoryId;
  label: string;
  icon: CategoryIcon;
}

export type DishTag = "picante" | "nuevo" | "para-compartir";

/**
 * Art direction for dishes shown as a hero row (plate photo + brush label).
 * Photos are transparent cut-outs anchored to the left edge of the row.
 */
export interface DishFeature {
  image: StaticImageData;
  /** Photo width relative to the row (0–1). */
  width: number;
  /** Title lines rendered inside the brush label. */
  titleLines: string[];
  /** Label box as percentages of the row; it overlaps the photo's right edge. */
  label: { top: number; bottom: number; left: number };
}

export interface Dish {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  /** Price in MXN. */
  price: number;
  categories: CategoryId[];
  tags?: DishTag[];
  feature?: DishFeature;
}

export type DishWithFeature = Dish & { feature: DishFeature };

export interface Menu {
  categories: Category[];
  dishes: Dish[];
}
