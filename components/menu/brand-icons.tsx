import type { LucideProps } from "lucide-react";

/** Lucide dropped brand icons, so these follow its 24px stroke grid (paths from Tabler Icons, MIT). */
function brandIcon(paths: string[]) {
  return function BrandIcon({ size = 24, strokeWidth = 2, ...rest }: LucideProps) {
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
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    );
  };
}

export const Facebook = brandIcon(["M7 10v4h3v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1h3V3h-3a5 5 0 0 0-5 5v2H7"]);

export const WhatsApp = brandIcon([
  "M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21",
  "M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1",
]);
