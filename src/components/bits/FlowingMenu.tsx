"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { gsap } from "gsap";
import { Icon360 } from "@/components/icons";

export type FlowingMenuItem = {
  label: string;
  detail: string;
  href: string;
  /** a small photo or icon carried in the flowing band between repeats of the detail */
  chip: ReactNode;
};

/**
 * Brand FlowingMenu — adapted from React Bits. A ruled list of large names;
 * hovering (or keyboard-focusing) a row slides a forest band in from the edge
 * the pointer came through, carrying a slow marquee of that row's detail, and
 * slides it out the way the pointer leaves. Every row is a real link (here:
 * a spot in the 360° tour, in a new tab). Touch screens get plain tap targets;
 * with reduced motion the band simply appears and holds still.
 */
export function FlowingMenu({ items, label, className = "" }: { items: FlowingMenuItem[]; label: string; className?: string }) {
  return (
    <nav aria-label={label} className={className}>
      <ul className="border-t border-line">
        {items.map((item) => (
          <Row key={item.href} item={item} />
        ))}
      </ul>
    </nav>
  );
}

type Edge = "top" | "bottom";

function Row({ item }: { item: FlowingMenuItem }) {
  const bandRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const edgeOf = (e: PointerEvent<HTMLElement>): Edge => {
    const r = e.currentTarget.getBoundingClientRect();
    return e.clientY - r.top < r.height / 2 ? "top" : "bottom";
  };

  const slide = (edge: Edge, show: boolean) => {
    const band = bandRef.current;
    const inner = innerRef.current;
    if (!band || !inner) return;
    gsap.killTweensOf([band, inner]);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(band, { autoAlpha: show ? 1 : 0, yPercent: 0 });
      gsap.set(inner, { yPercent: 0 });
      return;
    }
    const out = edge === "top" ? -101 : 101;
    const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "expo.out" } });
    if (show) {
      tl.set(band, { autoAlpha: 1, yPercent: out }).set(inner, { yPercent: -out }).to([band, inner], { yPercent: 0 }, 0);
    } else {
      tl.to(band, { yPercent: out }, 0).to(inner, { yPercent: -out }, 0).set(band, { autoAlpha: 0 });
    }
  };

  const part = (
    <span className="flex shrink-0 items-center">
      <span className="px-s21 font-display text-[clamp(20px,2.6vw,34px)] leading-none whitespace-nowrap">{item.detail}</span>
      <span className="shrink-0">{item.chip}</span>
    </span>
  );

  return (
    <li className="relative overflow-hidden border-b border-line">
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onPointerEnter={(e) => e.pointerType !== "touch" && slide(edgeOf(e), true)}
        onPointerLeave={(e) => e.pointerType !== "touch" && slide(edgeOf(e), false)}
        onFocus={(e) => e.currentTarget.matches(":focus-visible") && slide("top", true)}
        onBlur={() => slide("bottom", false)}
        className="relative flex min-h-[52px] flex-col justify-center gap-[2px] py-[8px] focus-visible:outline-offset-[-2px] sm:flex-row sm:items-center sm:justify-between sm:gap-s21 lg:min-h-[76px]"
      >
        <span className="font-display text-[clamp(19px,2.6vw,34px)] leading-[1.1] text-forest">{item.label}</span>
        <span className="flex items-center gap-s8 text-[13px] leading-[1.35] text-ink-muted sm:text-[15px]">
          {item.detail}
          <Icon360 size={18} className="hidden shrink-0 text-farm sm:block" />
        </span>
        <span className="sr-only">(opens the 360° tour in a new tab)</span>
      </a>
      <div ref={bandRef} aria-hidden="true" className="pointer-events-none invisible absolute inset-0 overflow-hidden bg-forest text-paper">
        <div ref={innerRef} className="flex h-full items-center">
          <div className="flowing-marquee flex w-max">
            {[0, 1].map((copy) => (
              <span key={copy} className="flex">
                {part}
                {part}
                {part}
                {part}
              </span>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}
