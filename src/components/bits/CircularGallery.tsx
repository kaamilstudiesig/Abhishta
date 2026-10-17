"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";
import { IconArrow } from "@/components/icons";

/**
 * Brand CircularGallery — adapted from React Bits. The original paints images
 * onto a WebGL plane; reviews are text, so this version bends real DOM cards
 * along a shallow arc (readable, selectable, screen-reader friendly). Drag,
 * arrow buttons or ←/→ keys turn the wheel; it settles with a soft lerp and
 * snaps a card to centre. The loop is seamless: items are cloned once and the
 * clones are hidden from assistive tech.
 */
type CircularGalleryProps = {
  children: ReactNode;
  label: string;
  /** card width in px (also the spacing unit) */
  itemWidth?: number;
  gap?: number;
  /** arc radius in px — smaller bends harder */
  radius?: number;
  className?: string;
};

export function CircularGallery({
  children,
  label,
  itemWidth = 340,
  gap = 34,
  radius = 2200,
  className = "",
}: CircularGalleryProps) {
  const items = Children.toArray(children);
  const n = items.length;
  const loop = [...items, ...items];
  const rootRef = useRef<HTMLDivElement>(null);
  const state = useRef({ current: 0, target: 0, dragging: false, startX: 0, startTarget: 0, raf: 0, width: itemWidth });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const s = state.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-gallery-card]"));

    const measure = () => {
      const w = Math.min(itemWidth, root.clientWidth * 0.78);
      s.width = w;
      cards.forEach((c) => (c.style.width = `${w}px`));
    };

    const render = () => {
      const step = s.width + gap;
      const span = step * loop.length;
      cards.forEach((card, i) => {
        let x = i * step - s.current;
        x = ((((x + span / 2) % span) + span) % span) - span / 2;
        const theta = x / radius;
        const y = radius * (1 - Math.cos(theta));
        const visible = Math.abs(x) < root.clientWidth;
        card.style.transform = `translate3d(${(x - s.width / 2).toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${theta.toFixed(4)}rad)`;
        card.style.visibility = visible ? "visible" : "hidden";
        card.style.opacity = String(Math.max(0.35, 1 - Math.abs(x) / (root.clientWidth * 0.9)).toFixed(3));
      });
    };

    const tick = () => {
      s.current += (s.target - s.current) * (reduce ? 1 : 0.1);
      if (Math.abs(s.target - s.current) < 0.1) s.current = s.target;
      render();
      s.raf = s.current === s.target && !s.dragging ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!s.raf) s.raf = requestAnimationFrame(tick);
    };
    const snap = () => {
      const step = s.width + gap;
      s.target = Math.round(s.target / step) * step;
      kick();
    };

    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) return;
      s.dragging = true;
      s.startX = e.clientX;
      s.startTarget = s.target;
      root.setPointerCapture(e.pointerId);
      kick();
    };
    const onMove = (e: PointerEvent) => {
      if (!s.dragging) return;
      s.target = s.startTarget - (e.clientX - s.startX) * 1.2;
      kick();
    };
    const onUp = () => {
      if (!s.dragging) return;
      s.dragging = false;
      snap();
    };
    const go = (dir: number) => {
      s.target += dir * (s.width + gap);
      snap();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else return;
      e.preventDefault();
    };
    const onPrev = () => go(-1);
    const onNext = () => go(1);
    const prev = root.querySelector<HTMLButtonElement>("[data-gallery-prev]");
    const next = root.querySelector<HTMLButtonElement>("[data-gallery-next]");
    const stage = root.querySelector<HTMLElement>("[data-gallery-stage]")!;

    measure();
    render();
    const ro = new ResizeObserver(() => {
      measure();
      snap();
      render();
    });
    ro.observe(root);
    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);
    stage.addEventListener("keydown", onKey);
    prev?.addEventListener("click", onPrev);
    next?.addEventListener("click", onNext);

    return () => {
      cancelAnimationFrame(s.raf);
      s.raf = 0;
      ro.disconnect();
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
      stage.removeEventListener("keydown", onKey);
      prev?.removeEventListener("click", onPrev);
      next?.removeEventListener("click", onNext);
    };
  }, [gap, itemWidth, radius, loop.length]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <div
        data-gallery-stage=""
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        data-lenis-prevent-touch=""
        className="relative h-[460px] cursor-grab touch-pan-y overflow-hidden select-none active:cursor-grabbing sm:h-[440px]"
      >
        <div className="absolute top-s21 left-1/2">
          {loop.map((item, i) => (
            <div
              key={i}
              data-gallery-card=""
              aria-hidden={i >= n ? true : undefined}
              inert={i >= n ? true : undefined}
              className="absolute top-0 left-0 will-change-transform"
              style={{ width: itemWidth }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-s21 flex justify-center gap-s13">
        <button
          type="button"
          data-gallery-prev=""
          aria-label="Previous review"
          className="grid size-[48px] place-items-center rounded-full border-[1.5px] border-forest/25 text-farm transition-colors duration-300 hover:border-farm hover:bg-farm hover:text-paper"
        >
          <IconArrow className="rotate-180" size={21} />
        </button>
        <button
          type="button"
          data-gallery-next=""
          aria-label="Next review"
          className="grid size-[48px] place-items-center rounded-full border-[1.5px] border-forest/25 text-farm transition-colors duration-300 hover:border-farm hover:bg-farm hover:text-paper"
        >
          <IconArrow size={21} />
        </button>
      </div>
    </div>
  );
}
