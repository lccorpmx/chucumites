"use client";

import { useDeferredValue, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useInView } from "motion/react";

import { useServiceRequest } from "@/hooks/use-service-request";
import { selectDishes } from "@/lib/menu/select";
import type { CategoryId, Dish, Menu } from "@/lib/menu/types";
import type { RestaurantInfo } from "@/lib/restaurant";

import { ActionBar } from "./action-bar";
import { CategoryTabs } from "./category-tabs";
import { DishSheet } from "./dish-sheet";
import { MenuHeader } from "./menu-header";
import { MenuPanel } from "./menu-panel";
import { NavSheet } from "./nav-sheet";
import { OceanBackground } from "./ocean-background";
import { ReviewSheet } from "./review-sheet";
import { SearchBar } from "./search-bar";
import { WifiSheet } from "./wifi-sheet";

type SheetId = "nav" | "dish" | "wifi" | "review";

const PANEL_ID = "menu-panel";

interface MenuScreenProps {
  menu: Menu;
  restaurant: RestaurantInfo;
}

export function MenuScreen({ menu, restaurant }: MenuScreenProps) {
  const [categoryId, setCategoryId] = useState<CategoryId>(menu.categories[0].id);
  const [query, setQuery] = useState("");
  const [openSheet, setOpenSheet] = useState<SheetId | null>(null);
  // Kept after closing so the sheet can animate out with its content.
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const waiter = useServiceRequest("waiter");
  const bill = useServiceRequest("bill");

  const sentinelRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const isToolbarResting = useInView(sentinelRef, { initial: true });

  const deferredQuery = useDeferredValue(query);
  const isSearching = deferredQuery.trim().length > 0;
  const selection = useMemo(
    () => selectDishes(menu.dishes, categoryId, deferredQuery),
    [menu.dishes, categoryId, deferredQuery],
  );

  const category = menu.categories.find(({ id }) => id === categoryId) ?? menu.categories[0];
  const heading = isSearching
    ? "Resultados"
    : selection.featured.length > 0
      ? `Más ${category.label.toLowerCase()}`
      : category.label;

  /** Brings the top of the list under the sticky toolbar if the user scrolled past it. */
  function revealPanel() {
    const panel = panelRef.current;
    const toolbar = toolbarRef.current;
    if (!panel || !toolbar) return;

    const top = panel.getBoundingClientRect().top + window.scrollY - toolbar.offsetHeight;
    if (window.scrollY > top) window.scrollTo({ top, behavior: "smooth" });
  }

  function changeCategory(id: CategoryId) {
    setCategoryId(id);
    setQuery("");
    revealPanel();
  }

  function selectDish(dish: Dish) {
    setSelectedDish(dish);
    setOpenSheet("dish");
  }

  function sheetState(id: SheetId) {
    return {
      open: openSheet === id,
      onOpenChange: (open: boolean) => setOpenSheet(open ? id : null),
    };
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative isolate mx-auto min-h-dvh w-full max-w-[480px] overflow-x-clip">
        <OceanBackground />

        {/* Container queries let the art-directed parts scale with the column width. */}
        <div className="@container flex min-h-dvh flex-col">
          <MenuHeader restaurant={restaurant} onOpenNav={() => setOpenSheet("nav")} />

          <div ref={sentinelRef} aria-hidden className="h-0" />
          <div ref={toolbarRef} className="sticky top-0 z-30 space-y-3 px-4 pt-3 pb-2">
            <motion.div
              aria-hidden
              initial={false}
              animate={{ opacity: isToolbarResting ? 0 : 1 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 -z-10 border-b border-white/10 bg-ocean-950/80 shadow-[0_12px_30px_rgb(5_18_49/0.45)] backdrop-blur-lg"
            />
            <SearchBar value={query} onChange={setQuery} />
            <CategoryTabs
              categories={menu.categories}
              activeId={categoryId}
              isSearching={isSearching}
              panelId={PANEL_ID}
              onChange={changeCategory}
            />
          </div>

          <main ref={panelRef} className="flex-1 pt-5 pb-[calc(7rem+env(safe-area-inset-bottom))]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isSearching ? "search" : categoryId}
                exit={{ opacity: 0, y: 16, transition: { duration: 0.18 } }}
              >
                <MenuPanel
                  id={PANEL_ID}
                  labelledBy={`tab-${categoryId}`}
                  selection={selection}
                  heading={heading}
                  query={deferredQuery}
                  onSelectDish={selectDish}
                  onClearSearch={() => setQuery("")}
                />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        <ActionBar
          waiter={waiter}
          bill={bill}
          onOpenReview={() => setOpenSheet("review")}
          onOpenWifi={() => setOpenSheet("wifi")}
        />
      </div>

      <NavSheet
        {...sheetState("nav")}
        restaurant={restaurant}
        categories={menu.categories}
        onSelectCategory={(id) => {
          setOpenSheet(null);
          changeCategory(id);
        }}
      />
      <DishSheet {...sheetState("dish")} dish={selectedDish} waiter={waiter} />
      <WifiSheet {...sheetState("wifi")} wifi={restaurant.wifi} />
      <ReviewSheet {...sheetState("review")} reviewUrl={restaurant.reviewUrl} />
    </MotionConfig>
  );
}
