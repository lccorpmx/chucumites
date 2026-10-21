import { Flame, Sparkles, Users } from "lucide-react";

import type { DishTag } from "@/lib/menu/types";
import { cn } from "@/lib/utils";

const TAGS = {
  picante: { label: "Picante", icon: Flame, className: "bg-chile/90 text-white" },
  nuevo: { label: "Nuevo", icon: Sparkles, className: "bg-zest text-ocean-950" },
  "para-compartir": { label: "Para compartir", icon: Users, className: "bg-ocean-300 text-ocean-950" },
} satisfies Record<DishTag, { label: string; icon: React.ComponentType<{ className?: string }>; className: string }>;

export function DishTags({ tags, className }: { tags?: DishTag[]; className?: string }) {
  if (!tags?.length) return null;

  return (
    <span className={cn("flex flex-wrap gap-1.5", className)}>
      {tags.map((tag) => {
        const { label, icon: Icon, className: tone } = TAGS[tag];
        return (
          <span
            key={tag}
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-extrabold tracking-wide uppercase",
              tone,
            )}
          >
            <Icon className="size-3" aria-hidden />
            {label}
          </span>
        );
      })}
    </span>
  );
}
