"use client";

import { useEffect, useRef, useState, type MouseEvent, type PointerEvent, type ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { gsap } from "gsap";
import { IconClose } from "@/components/icons";

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
  /** a larger photo: floats beside the pointer on hover, and pops up for a few seconds on a tap */
  preview?: { src: StaticImageData; alt: string };
  /** the label of the popup's button on touch screens (it follows the row's link) */
  action?: string;
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
 *
 * Items with a `preview` photo also get it large: with a mouse, a tilted photo
 * card floats beside the pointer while it's over the row (the band still
 * flows); on touch, a tap pops the photo up over the list for a few seconds
 * with a button to follow the row's link, instead of jumping straight there.
 */
const POP_MS = 3200;

export function FlowingMenu({ items, label, tone = "light", className = "" }: { items: FlowingMenuItem[]; label: string; tone?: Tone; className?: string }) {
  const navRef = useRef<HTMLElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [popped, setPopped] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  // the floating card follows the pointer (set directly, no re-render per move)
  const follow = (e: PointerEvent<HTMLElement>) => {
    const nav = navRef.current;
    const card = floatRef.current;
    if (!nav || !card || e.pointerType === "touch") return;
    const r = nav.getBoundingClientRect();
    card.style.setProperty("--fx", `${e.clientX - r.left}px`);
    card.style.setProperty("--fy", `${e.clientY - r.top}px`);
  };

  const pop = (n: number) => {
    clearTimeout(timer.current);
    setPopped(n);
    timer.current = setTimeout(() => setPopped(null), POP_MS);
  };

  const shown = hovered !== null ? items[hovered]?.preview : undefined;
  const poppedItem = popped !== null ? items[popped] : undefined;

  return (
    <nav ref={navRef} aria-label={label} className={`relative ${className}`} onPointerMove={follow}>
      <ul className={`border-t ${tone === "dark" ? "border-paper/15" : "border-line"}`}>
        {items.map((item, n) => (
          <Row
            key={item.label}
            item={item}
            tone={tone}
            onHover={(on) => setHovered(on ? n : null)}
            onTouchSelect={item.preview ? () => pop(n) : undefined}
          />
        ))}
      </ul>

      {/* mouse: the photo card beside the pointer */}
      <div
        ref={floatRef}
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 left-0 z-30 w-[clamp(200px,18vw,280px)] [translate:calc(var(--fx,0px)+28px)_calc(var(--fy,0px)-50%)] transition-[opacity,scale,rotate] duration-300 ease-[var(--ease-earth)] max-lg:hidden ${
          shown ? "scale-100 rotate-[-3deg] opacity-100" : "scale-90 rotate-0 opacity-0"
        }`}
      >
        {items.map((it, n) =>
          it.preview ? (
            <div
              key={it.label}
              className={`overflow-hidden rounded-card shadow-float ring-4 ring-paper transition-opacity duration-200 ${n === hovered ? "relative opacity-100" : "absolute inset-0 opacity-0"}`}
            >
              <div className="relative aspect-[4/3]">
                <Image src={it.preview.src} alt="" fill sizes="320px" className="object-cover" />
              </div>
            </div>
          ) : null,
        )}
      </div>

      {/* touch: the photo pops up over the list for a few seconds */}
      {poppedItem?.preview ? (
        <div className="absolute inset-x-0 top-1/2 z-30 -translate-y-1/2 px-s8" role="dialog" aria-label={poppedItem.label}>
          <div className="animate-[pop-in_380ms_var(--ease-earth)] overflow-hidden rounded-card bg-paper text-forest shadow-float ring-4 ring-paper motion-reduce:animate-none">
            <div className="relative aspect-[16/10]">
              <Image src={poppedItem.preview.src} alt={poppedItem.preview.alt} fill sizes="92vw" className="object-cover" />
              <button
                type="button"
                onClick={() => setPopped(null)}
                aria-label="Close the photo"
                className="absolute top-s8 right-s8 grid size-[40px] place-items-center rounded-full bg-ink/50 text-paper"
              >
                <IconClose size={18} />
              </button>
            </div>
            <div className="flex items-center justify-between gap-s13 px-s13 py-s13">
              <p className="font-display text-[20px] leading-[1.15]">{poppedItem.label}</p>
              <a
                href={poppedItem.href}
                onClick={poppedItem.onSelect}
                className="inline-flex min-h-[44px] shrink-0 items-center rounded-btn bg-farm px-s13 text-[14px] font-medium text-paper"
              >
                {poppedItem.action ?? "Open"}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}

type Edge = "top" | "bottom";

function Row({
  item,
  tone,
  onHover,
  onTouchSelect,
}: {
  item: FlowingMenuItem;
  tone: Tone;
  onHover: (on: boolean) => void;
  /** set when a tap should pop the photo up rather than follow the link */
  onTouchSelect?: () => void;
}) {
  const lastPointer = useRef<string>("mouse");
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
        onClick={(e: MouseEvent<HTMLAnchorElement>) => {
          if (onTouchSelect && lastPointer.current === "touch") {
            e.preventDefault();
            onTouchSelect();
            return;
          }
          item.onSelect?.();
        }}
        onPointerDown={(e) => (lastPointer.current = e.pointerType)}
        onPointerEnter={(e) => {
          if (e.pointerType === "touch") return;
          slide(edgeOf(e), true);
          onHover(true);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "touch") return;
          slide(edgeOf(e), false);
          onHover(false);
        }}
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
