import type { CSSProperties } from "react";

/**
 * Brand GradualBlur — adapted from React Bits. Stacked backdrop-filter layers,
 * each masked to a band, build an exponential blur ramp toward one edge; an
 * optional tint (paper or forest) settles underneath like morning haze.
 * Pure CSS — no client JS.
 */
type GradualBlurProps = {
  position?: "top" | "bottom";
  height?: string;
  strength?: number;
  layers?: number;
  tint?: string;
  className?: string;
};

export function GradualBlur({
  position = "bottom",
  height = "89px",
  strength = 1.6,
  layers = 6,
  tint,
  className = "",
}: GradualBlurProps) {
  const toward = position === "top" ? "to top" : "to bottom";
  const max = strength * 10;
  const level = (u: number) => (max * (Math.pow(2, 4 * u) - 1)) / 15;

  const steps: CSSProperties[] = Array.from({ length: layers }, (_, i) => {
    const from = level(i / layers);
    const to = level((i + 1) / layers);
    const radius = Math.sqrt(Math.max(to * to - from * from, 0)).toFixed(2);
    const mask = `linear-gradient(${toward}, transparent ${((i / layers) * 100).toFixed(1)}%, #000 ${(((i + 1) / layers) * 100).toFixed(1)}%)`;
    return {
      position: "absolute",
      inset: 0,
      backdropFilter: `blur(${radius}px)`,
      WebkitBackdropFilter: `blur(${radius}px)`,
      maskImage: mask,
      WebkitMaskImage: mask,
    };
  });

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 ${position === "top" ? "top-0" : "bottom-0"} ${className}`}
      style={{ height }}
    >
      {steps.map((style, i) => (
        <div key={i} style={style} />
      ))}
      {tint ? (
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(${toward}, transparent, ${tint})` }}
        />
      ) : null}
    </div>
  );
}
