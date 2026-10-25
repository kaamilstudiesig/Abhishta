"use client";

import { Children, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { IconArrow } from "@/components/icons";

/**
 * A stack of cards, one in front and the next two peeking out beneath it. Next
 * lifts the front card away to the left as the one behind rises into its place;
 * Previous brings it back. Arrows, a horizontal swipe, or ←/→ on focus step it;
 * it never moves on its own. Cards behind the front one are inert. With reduced
 * motion the cards simply swap.
 */
export function StackCarousel({
  label,
  itemLabel = "card",
  className = "",
  stageClassName = "",
  children,
}: {
  label: string;
  /** what one card is, for the arrow buttons ("review" → "Next review") */
  itemLabel?: string;
  className?: string;
  /** the stage's height (the card's height plus room for the peeking cards) */
  stageClassName?: string;
  children: ReactNode;
}) {
  const cards = Children.toArray(children);
  const n = cards.length;
  const [active, setActive] = useState(0);
  const drag = useRef({ id: -1, x: 0, y: 0 });
  const step = (d: number) => setActive((a) => (a + d + n) % n);

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
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

  // where each card sits: 0 in front, 1 and 2 peeking beneath, the last one lifted away to the left
  const place = (pos: number) => {
    if (pos === 0) return "z-30 translate-y-0 scale-100 rotate-0 opacity-100";
    if (pos === 1) return "z-20 translate-y-[18px] scale-[0.96] opacity-75";
    if (pos === 2) return "z-10 translate-y-[36px] scale-[0.92] opacity-45";
    if (pos === n - 1) return "z-40 -translate-x-[70%] -translate-y-[12px] -rotate-[5deg] opacity-0";
    return "z-0 translate-y-[36px] scale-[0.92] opacity-0";
  };

  const arrow =
    "grid size-[48px] place-items-center rounded-full border-[1.5px] border-forest/25 text-farm transition-colors duration-300 hover:border-farm hover:bg-farm hover:text-paper";

  return (
    <div className={className}>
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onPointerDown={onDown}
        onPointerUp={onUp}
        onKeyDown={onKey}
        className={`relative mx-auto w-full touch-pan-y select-none ${stageClassName}`}
      >
        {cards.map((card, i) => {
          const pos = (i - active + n) % n;
          return (
            <div
              key={i}
              inert={pos !== 0 || undefined}
              aria-hidden={pos !== 0 || undefined}
              className={`absolute inset-x-0 top-0 origin-top transition-[translate,scale,rotate,opacity] duration-700 ease-[var(--ease-earth)] motion-reduce:transition-none ${place(pos)}`}
            >
              {card}
            </div>
          );
        })}
      </div>
      <div className="mt-s13 flex items-center justify-center gap-s13 sm:mt-s21">
        <button type="button" onClick={() => step(-1)} aria-label={`Previous ${itemLabel}`} className={arrow}>
          <IconArrow className="rotate-180" size={21} />
        </button>
        <p className="min-w-[4em] text-center text-[14px] text-ink-muted tabular-nums" aria-live="polite">
          {active + 1} / {n}
        </p>
        <button type="button" onClick={() => step(1)} aria-label={`Next ${itemLabel}`} className={arrow}>
          <IconArrow size={21} />
        </button>
      </div>
    </div>
  );
}
