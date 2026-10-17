"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Brand ScrollExpand — adapted from React Bits for a snapped, one-screen page.
 * The original scrubs the expansion through a tall scroll track; here the page
 * is exactly one viewport, so the expansion plays once the page has settled in
 * view: the media opens from a centred, 21px-rounded card to full bleed, and
 * progress is exposed to children as the CSS custom properties --p (expansion)
 * and --reveal (overlay), so headings and overlays choreograph themselves in CSS.
 * Leaving the page resets it, so it plays again on return.
 *
 * The stage also flips its data-nav tone from light to dark as the photo takes
 * over, and fires a "navtone" event so the navbar can follow.
 *
 * Reduced motion: shown fully expanded with the overlay visible.
 */
type Insets = { top: number; right: number; bottom: number; left: number };

type ScrollExpandProps = {
  media: ReactNode;
  heading?: ReactNode;
  overlay?: ReactNode;
  /** flat dark shade over the media that deepens with progress, for text contrast */
  shade?: boolean;
  /** seconds to wait after arriving before expanding */
  delay?: number;
  start?: Insets;
  startNarrow?: Insets;
  id?: string;
  className?: string;
};

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
  shade = false,
  delay = 0.9,
  start: startWide = CENTRED,
  startNarrow = CENTRED_NARROW,
  id,
  className = "",
}: ScrollExpandProps) {
  const stageRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      const frame = frameRef.current;
      const mediaEl = mediaRef.current;
      if (!stage || !frame || !mediaEl) return;

      const setTone = (dark: boolean) => {
        const tone = dark ? "dark" : "light";
        if (stage.dataset.nav === tone) return;
        stage.dataset.nav = tone;
        window.dispatchEvent(new Event("navtone"));
      };

      const narrow = window.matchMedia("(max-width: 767px)").matches;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const start = narrow ? startNarrow : startWide;

      const apply = (p: number) => {
        const e = smooth(0, 1, p);
        const inset = (v: number) => (v * (1 - e)).toFixed(3);
        frame.style.clipPath = `inset(${inset(start.top)}% ${inset(start.right)}% ${inset(start.bottom)}% ${inset(start.left)}% round ${(21 * (1 - e)).toFixed(2)}px)`;
        mediaEl.style.transform = `scale(${(1.18 - 0.18 * e).toFixed(4)})`;
        stage.style.setProperty("--p", e.toFixed(4));
        stage.style.setProperty("--reveal", smooth(0.72, 1, p).toFixed(4));
        setTone(e > 0.6);
      };

      if (reduce) {
        apply(1);
        return;
      }

      const state = { p: 0 };
      apply(0);
      const tween = gsap.to(state, {
        p: 1,
        duration: 2.2,
        ease: "power2.inOut",
        paused: true,
        onUpdate: () => apply(state.p),
      });

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio >= 0.9) {
            tween.delay(delay).play();
          } else if (entry.intersectionRatio <= 0.1) {
            tween.pause(0);
            apply(0);
          }
        },
        { threshold: [0, 0.1, 0.9, 1] },
      );
      io.observe(stage);
      return () => {
        io.disconnect();
        tween.kill();
      };
    },
    { dependencies: [delay, startWide, startNarrow] },
  );

  return (
    <section
      id={id}
      ref={stageRef}
      data-snap=""
      data-nav="light"
      className={`relative h-svh min-h-[560px] w-full overflow-hidden [--p:0] [--reveal:0] ${className}`}
    >
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
    </section>
  );
}
