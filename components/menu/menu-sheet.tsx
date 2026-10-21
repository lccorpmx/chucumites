"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface MenuSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Rendered above the title, e.g. a dish photo. */
  media?: React.ReactNode;
  side?: "bottom" | "right";
  className?: string;
  children: React.ReactNode;
}

/** Brand-styled sheet shared by every overlay in the menu. */
export function MenuSheet({
  open,
  onOpenChange,
  title,
  description,
  media,
  side = "bottom",
  className,
  children,
}: MenuSheetProps) {
  const isBottom = side === "bottom";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={side}
        className={cn(
          "gap-0 overflow-y-auto overscroll-contain border-white/10 bg-ocean-900 text-white",
          "[background-image:radial-gradient(120%_60%_at_100%_0%,rgb(29_116_223/0.35),transparent_60%)]",
          isBottom
            ? "mx-auto max-h-[90dvh] w-full max-w-[480px] rounded-t-[1.75rem] border-x pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-[0_-24px_60px_rgb(0_0_0/0.45)]"
            : "w-[86%] max-w-sm pb-[env(safe-area-inset-bottom)]",
          className,
        )}
      >
        {isBottom && <div aria-hidden className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-white/25" />}
        {media}
        <SheetHeader className="gap-1 px-6 pt-4 pb-3 text-left">
          <SheetTitle className="pr-10 font-display text-[2rem] leading-none font-normal tracking-wide text-zest uppercase">
            {title}
          </SheetTitle>
          {description ? (
            <SheetDescription className="text-[0.95rem] text-white/75">{description}</SheetDescription>
          ) : (
            <SheetDescription className="sr-only">{title}</SheetDescription>
          )}
        </SheetHeader>
        <div className="px-6">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
