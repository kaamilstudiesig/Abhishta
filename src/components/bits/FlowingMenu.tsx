"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { gsap } from "gsap";

export type FlowingMenuItem = {
  label: string;
  detail: string;
  href: string;
  /** a small photo or icon carried in the flowing band between repeats of the detail (and, on touch screens, shown in the row) */
  chip: ReactNode;
  /** opens in a new tab */
  external?: boolean;
  /** runs on click, before the link is followed (e.g. to fill in a form the link leads to) */
  onSelect?: () => void;
};

type Tone = "light" | "dark";

/**
 * Brand FlowingMenu — adapted from React Bits. A ruled list of large names;
 * hovering (or keyboard-focusing) a row slides a band in from the edge the
 * pointer came through, carrying a slow marquee of that row's detail and its
 * photo, and slides it out the way the pointer leaves. On a light band the
 * band is forest; on a dark band it's paper. Every row is a real link. Touch
 * screens never hover, so there each row shows its photo as a small chip; with
 * reduced motion the band simply appears and holds still.
 */
export function FlowingMenu({ items, label, tone = "light", className = "" }: { items: FlowingMenuItem[]; label: string; tone?: Tone; className?: string }) {
  return (
    <nav aria-label={label} className={className}>
      <ul className={`border-t ${tone === "dark" ? "border-paper/15" : "border-line"}`}>
        {items.map((item) => (
          <Row key={item.label} item={item} tone={tone} />
        ))}
      </ul>
    </nav>
  );
}

type Edge = "top" | "bottom";

function Row({ item, tone }: { item: FlowingMenuItem; tone: Tone }) {
  const bandRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const dark = tone === "dark";

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
    <li className={`relative overflow-hidden border-b ${dark ? "border-paper/15" : "border-line"}`}>
      <a
        href={item.href}
        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        onClick={item.onSelect}
        onPointerEnter={(e) => e.pointerType !== "touch" && slide(edgeOf(e), true)}
        onPointerLeave={(e) => e.pointerType !== "touch" && slide(edgeOf(e), false)}
        onFocus={(e) => e.currentTarget.matches(":focus-visible") && slide("top", true)}
        onBlur={() => slide("bottom", false)}
        className="relative flex min-h-[52px] items-center gap-s13 py-[8px] focus-visible:outline-offset-[-2px] lg:min-h-[72px] squat:min-h-[60px]"
      >
        <span className="flex min-w-0 flex-1 flex-col justify-center gap-[2px] sm:flex-row sm:items-center sm:justify-between sm:gap-s21">
          <span className={`font-display text-[clamp(19px,2.6vw,34px)] leading-[1.1] ${dark ? "text-paper" : "text-forest"}`}>{item.label}</span>
          <span className={`text-[13px] leading-[1.35] sm:text-right sm:text-[15px] ${dark ? "text-paper/70" : "text-ink-muted"}`}>{item.detail}</span>
        </span>
        {/* touch screens never see the band, so the row carries its chip */}
        <span aria-hidden="true" className="hidden shrink-0 [@media(hover:none)]:block">
          {item.chip}
        </span>
        {item.external ? <span className="sr-only">(opens in a new tab)</span> : null}
      </a>
      <div
        ref={bandRef}
        aria-hidden="true"
        className={`pointer-events-none invisible absolute inset-0 overflow-hidden ${dark ? "bg-paper text-forest" : "bg-forest text-paper"}`}
      >
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
