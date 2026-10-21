import type { CategoryId, Dish, DishWithFeature } from "./types";

/** Lowercases and strips accents so "camaron" matches "Camarón". */
export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

export interface DishSelection {
  featured: DishWithFeature[];
  others: Dish[];
}

function hasFeature(dish: Dish): dish is DishWithFeature {
  return dish.feature !== undefined;
}

/**
 * Dishes for the current view: a search query spans every category,
 * otherwise only the active category is shown.
 */
export function selectDishes(dishes: Dish[], category: CategoryId, query: string): DishSelection {
  const terms = normalizeText(query).split(/\s+/).filter(Boolean);

  const matches =
    terms.length > 0
      ? dishes.filter((dish) => {
          const haystack = normalizeText(`${dish.name} ${dish.tagline ?? ""} ${dish.description}`);
          return terms.every((term) => haystack.includes(term));
        })
      : dishes.filter((dish) => dish.categories.includes(category));

  return {
    featured: matches.filter(hasFeature),
    others: matches.filter((dish) => !dish.feature),
  };
}
