import { CupSoda, Fish, Shell, Shrimp, type LucideProps } from "lucide-react";

import type { CategoryIcon as CategoryIconName } from "@/lib/menu/types";

/** Lucide has no taco, so this one follows its 24px / 2px-stroke grid. */
function Taco(props: LucideProps) {
  const { size = 24, strokeWidth = 2, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M2.5 18.5a9.5 9.5 0 0 1 19 0Z" />
      <path d="M5.5 12.5c.9-.9 1.9-.9 2.8 0s1.9.9 2.8 0 1.9-.9 2.8 0 1.9.9 2.8 0" />
      <path d="M8 15.5h.01M12 15h.01M16 15.5h.01" />
    </svg>
  );
}

const ICONS = {
  shrimp: Shrimp,
  fish: Fish,
  shell: Shell,
  taco: Taco,
  drink: CupSoda,
} satisfies Record<CategoryIconName, React.ComponentType<LucideProps>>;

export function CategoryIcon({ name, ...props }: { name: CategoryIconName } & LucideProps) {
  const Icon = ICONS[name];
  return <Icon aria-hidden {...props} />;
}
