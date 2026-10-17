"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Brand ScrollExpand — adapted from React Bits for window scroll + Lenis.
 * A tall track holds a sticky, viewport-high stage. As the track scrolls,
 * progress (0→1) opens the media from a rounded 21px card to full bleed, and is
 * exposed to children as the CSS custom property --p on the stage, so headings
 * and overlays can choreograph themselves in plain CSS.
 *
 * Reduced motion: the media is shown full bleed with overlays visible (--p: 1).
 */
type ScrollExpandProps = {
  media: ReactNode;
  heading?: ReactNode;
  overlay?: ReactNode;
  /** viewport-heights of scrolling spent expanding */
  distance?: number;
  /** viewport-heights held at full bleed for reading the overlay */
  hold?: number;
  /** starting card insets, % of the stage, for ≥768px and for phones */
  start?: Insets;
  startNarrow?: Insets;
  /** flat dark shade over the media that deepens with progress, for text contrast */
  shade?: boolean;
  className?: string;
};

type Insets = { top: number; right: number; bottom: number; left: number };
const CENTRED: Insets = { top: 34, right: 20, bottom: 8, left: 20 };
const CENTRED_NARROW: Insets = { top: 40, right: 6, bottom: 10, left: 6 };

const clamp = (v: number, a = 0, b = 1) => Math.min(Math.max(v, a), b);
const smooth = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export function ScrollExpand({
  media,
  heading,
  overlay,
  distance = 1.1,
  hold = 0.9,
  start: startWide = CENTRED,
  startNarrow = CENTRED_NARROW,
  shade = false,
  className = "",
}: ScrollExpandProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const stage = stageRef.current;
      const frame = frameRef.current;
      const mediaEl = mediaRef.current;
      if (!track || !stage || !frame || !mediaEl) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
          narrow: "(max-width: 767px)",
        },
        (ctx) => {
          const { motion, narrow } = ctx.conditions as { motion: boolean; narrow: boolean };
          if (!motion) {
            stage.style.setProperty("--p", "1");
            stage.style.setProperty("--reveal", "1");
            frame.style.clipPath = "none";
            return;
          }
          const start = narrow ? startNarrow : startWide;
          const apply = (p: number) => {
            const e = smooth(0, 1, p);
            const inset = (v: number) => (v * (1 - e)).toFixed(3);
            const r = 21 * (1 - e);
            frame.style.clipPath = `inset(${inset(start.top)}% ${inset(start.right)}% ${inset(start.bottom)}% ${inset(start.left)}% round ${r.toFixed(2)}px)`;
            mediaEl.style.transform = `scale(${(1.18 - 0.18 * e).toFixed(4)})`;
            stage.style.setProperty("--p", e.toFixed(4));
            stage.style.setProperty("--reveal", smooth(0.72, 1, p).toFixed(4));
          };
          apply(0);
          ScrollTrigger.create({
            trigger: track,
            start: "top top",
            end: () => `+=${window.innerHeight * distance}`,
            onUpdate: (self) => apply(self.progress),
            invalidateOnRefresh: true,
          });
        },
      );
      return () => mm.revert();
    },
    { dependencies: [distance, startWide, startNarrow] },
  );

  return (
    <div
      ref={trackRef}
      className={`relative ${className}`}
      style={{ height: `calc(100svh * ${1 + distance + hold})` }}
    >
      <div ref={stageRef} className="sticky top-0 h-svh w-full overflow-hidden [--p:0] [--reveal:0]">
        <div ref={frameRef} className="absolute inset-0 overflow-hidden will-change-[clip-path]">
          <div ref={mediaRef} className="absolute inset-0 origin-center will-change-transform">
            {media}
          </div>
          {shade ? (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black opacity-[calc(var(--p)*0.5)]" />
          ) : null}
        </div>
        {heading}
        {overlay}
      </div>
    </div>
  );
}
