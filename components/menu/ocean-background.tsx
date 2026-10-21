/**
 * Decorative water backdrop pinned behind the menu column.
 * Pure CSS/SVG and transform-only animations, so it stays on the compositor.
 */
function WaveBand({ className, opacity }: { className?: string; opacity: number }) {
  // Two identical tiles side by side; translating by -50% loops seamlessly.
  const tile =
    "M0 30 C 60 10, 120 50, 180 30 S 300 10, 360 30 S 480 50, 540 30 S 660 10, 720 30";
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className={className}
      style={{ opacity }}
      aria-hidden
    >
      <path d={tile} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path
        d={tile}
        transform="translate(720 0)"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const BANDS = [
  { top: "26%", opacity: 0.22, slow: false },
  { top: "41%", opacity: 0.14, slow: true },
  { top: "58%", opacity: 0.2, slow: false },
  { top: "74%", opacity: 0.12, slow: true },
  { top: "88%", opacity: 0.18, slow: false },
];

export function OceanBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-1/2 -z-10 w-full max-w-[480px] -translate-x-1/2 overflow-hidden"
    >
      <div className="ocean-surface absolute inset-0" />

      {/* Soft caustic light drifting across the surface. */}
      <div className="absolute -inset-[10%] animate-caustics bg-[radial-gradient(40%_25%_at_30%_40%,rgb(166_226_251/0.35),transparent_70%),radial-gradient(35%_20%_at_75%_65%,rgb(166_226_251/0.25),transparent_70%)] mix-blend-soft-light motion-reduce:animate-none" />

      {BANDS.map(({ top, opacity, slow }) => (
        <div key={top} className="absolute inset-x-0 h-10 overflow-hidden" style={{ top }}>
          <WaveBand
            opacity={opacity}
            className={`h-full w-[300%] text-ocean-200 motion-reduce:animate-none ${
              slow ? "animate-wave-drift-slow" : "animate-wave-drift"
            }`}
          />
        </div>
      ))}

      {/* Deep-water vignette behind the header and the bottom bar. */}
      <div className="absolute inset-x-0 top-0 h-56 bg-linear-to-b from-ocean-950/85 via-ocean-900/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-ocean-950/70 to-transparent" />
    </div>
  );
}
