"use client";

import { Children, useRef, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";

/**
 * Cards that change by sliding: the new card glides in from the side it comes
 * from while the old one drifts out the other way and fades, and the photo in
 * the arriving card settles from a slight zoom (children style it with
 * `group-data-[active]/slide:`). Controlled by `active`; a horizontal swipe,
 * ←/→ on focus, or the caller's own buttons change it. Hidden cards are inert.
 * With reduced motion the cards simply swap.
 */
export function SlideCards({
  active,
  onActiveChange,
  label,
  className = "",
  children,
}: {
  active: number;
  onActiveChange: (n: number) => void;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const cards = Children.toArray(children);
  const total = cards.length;
  const drag = useRef({ id: -1, x: 0, y: 0 });

  const step = (d: number) => onActiveChange((active + d + total) % total);

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
  };
  const onUp = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (d.id !== e.pointerId) return;
    d.id = -1;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(e.clientY - d.y)) step(dx < 0 ? 1 : -1);
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
    else return;
    e.preventDefault();
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onKeyDown={onKey}
      className={`relative touch-pan-y select-none ${className}`}
    >
      {cards.map((card, i) => {
        const on = i === active;
        // cards before the current one wait on the left, later ones on the right, so moving on slides leftwards
        return (
          <div
            key={i}
            data-active={on || undefined}
            inert={!on || undefined}
            aria-hidden={!on || undefined}
            className={`group/slide absolute inset-0 transition-[opacity,translate,scale] duration-700 ease-[var(--ease-earth)] motion-reduce:transition-none ${
              on
                ? "z-10 translate-x-0 scale-100 opacity-100"
                : `z-0 scale-[0.96] opacity-0 ${i < active ? "-translate-x-[8%]" : "translate-x-[8%]"}`
            }`}
          >
            {card}
          </div>
        );
      })}
    </div>
  );
}
