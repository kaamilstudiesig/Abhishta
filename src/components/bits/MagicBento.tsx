"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Brand MagicBento — adapted from React Bits (border glow and spotlight only:
 * no particles, tilt or magnetism). As the pointer moves over the grid, each
 * tile's rim lights up in leaf green where the pointer is near it, and a soft
 * light follows the pointer inside the tile. Nothing moves on its own; on touch
 * screens the tiles simply sit still.
 */

/** how far (px) from a tile the pointer starts to light its rim */
const REACH = 220;

const ring: CSSProperties = {
  background: "radial-gradient(260px circle at var(--bx, -999px) var(--by, -999px), var(--color-farm), transparent 70%)",
  opacity: "var(--bn, 0)",
  // paint only the 1.5px rim
  padding: "1.5px",
  mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
};
const spot: CSSProperties = {
  background:
    "radial-gradient(420px circle at var(--bx, -999px) var(--by, -999px), color-mix(in oklab, var(--color-gold-soft) 85%, transparent), transparent 65%)",
  opacity: "var(--bn, 0)",
};

export function MagicBento({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const grid = ref.current;
    if (!grid || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const tiles = Array.from(grid.querySelectorAll<HTMLElement>("[data-bento-tile]"));
    let raf = 0;
    let x = -9999;
    let y = -9999;
    const paint = () => {
      raf = 0;
      for (const tile of tiles) {
        const r = tile.getBoundingClientRect();
        // distance from the pointer to the tile's edge (0 inside it)
        const dx = Math.max(r.left - x, 0, x - r.right);
        const dy = Math.max(r.top - y, 0, y - r.bottom);
        tile.style.setProperty("--bx", `${(x - r.left).toFixed(1)}px`);
        tile.style.setProperty("--by", `${(y - r.top).toFixed(1)}px`);
        tile.style.setProperty("--bn", Math.max(0, 1 - Math.hypot(dx, dy) / REACH).toFixed(3));
      }
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      x = y = -9999;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    // listen on the section, so rims start to glow as the pointer approaches
    const area = grid.closest("section") ?? grid;
    area.addEventListener("pointermove", onMove);
    area.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <ul ref={ref} className={className}>
      {children}
    </ul>
  );
}

/** One tile of a MagicBento: a card whose rim and inside catch the pointer's light. */
export function BentoTile({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <li data-bento-tile="" className={`relative isolate overflow-hidden rounded-card bg-card ring-1 ring-line ${className}`}>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500" style={spot} />
      {children}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-300" style={ring} />
    </li>
  );
}
