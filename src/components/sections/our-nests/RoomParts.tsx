"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { IconExternal } from "@/components/icons";
import { SELECT_ROOM, tourUrl, type Pillows as PillowCount, type Tour } from "./rooms";

type Tone = "light" | "dark";

/**
 * How many a room sleeps, drawn as pillows: pairs share a double bed, dashed
 * ones are the extra bed (or the top of a "3–4" range). Decorative — the
 * "Sleeps …" text beside it carries the meaning.
 */
export function Pillows({ solo, pairs, extra, className = "" }: PillowCount & { className?: string }) {
  const pillow = "block h-[8px] w-[12px] rounded-[3px]";
  return (
    <span aria-hidden="true" className={`flex flex-wrap items-center gap-x-[5px] gap-y-[5px] ${className}`}>
      {Array.from({ length: pairs }, (_, i) => (
        <span key={`p${i}`} className="flex gap-[2px]">
          <span className={`${pillow} bg-current`} />
          <span className={`${pillow} bg-current`} />
        </span>
      ))}
      {Array.from({ length: solo }, (_, i) => (
        <span key={`s${i}`} className={`${pillow} bg-current`} />
      ))}
      {Array.from({ length: extra }, (_, i) => (
        <span key={`e${i}`} className={`${pillow} border-[1.5px] border-dashed border-current`} />
      ))}
    </span>
  );
}

/**
 * A room's live 360° view from the Turiya tour. The iframe is created only as
 * the section comes near the screen, so the page stays light. Changing `tour`
 * changes only the URL's #fragment: the tour listens for that and turns to
 * the new room in place, so its START card shows once per frame, not on every
 * switch. Size the frame with `className` — Turiya's START button needs at
 * least 280px of height on phones and 350px on wider screens.
 */
export function TourFrame({
  tour,
  title,
  tone,
  className = "",
}: {
  tour: Tour;
  title: string;
  tone: Tone;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const dark = tone === "dark";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-card ${dark ? "bg-paper/[0.06] ring-1 ring-paper/10" : "bg-card ring-1 ring-line"} ${className}`}
    >
      {/* shows through until the tour paints over it */}
      <p className={`absolute inset-0 grid place-items-center text-[15px] ${dark ? "text-paper/70" : "text-ink-muted"}`}>
        Opening the 360° view…
      </p>
      {near ? (
        <iframe
          src={tourUrl(tour.node, tour)}
          title={title}
          allow="fullscreen; gyroscope; accelerometer; xr-spatial-tracking"
          className="absolute inset-0 size-full"
        />
      ) : null}
    </div>
  );
}

/** "Press start, then drag" hint with a link to the same view full screen in the tour. */
export function TourHint({
  tour,
  tone,
  lead = "Press start, then drag to look around.",
  className = "",
}: {
  tour: Tour;
  tone: Tone;
  lead?: string;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <p className={`flex flex-wrap items-center gap-x-s21 gap-y-[2px] text-[14px] ${dark ? "text-paper/75" : "text-ink-muted"} ${className}`}>
      <span>{lead}</span>
      <a
        href={tourUrl(tour.node, tour)}
        target="_blank"
        rel="noopener noreferrer"
        className={`tap inline-flex items-center gap-[6px] font-medium ${dark ? "text-paper hover:text-gold" : "text-forest hover:text-farm"}`}
      >
        Open full screen
        <IconExternal size={16} />
        <span className="sr-only">(opens the tour in a new tab)</span>
      </a>
    </p>
  );
}

/** Arrow / Home / End keys for a tablist whose tabs are its direct children. */
export function onTabKeyDown(e: KeyboardEvent<HTMLElement>, count: number, current: number, go: (i: number) => void) {
  const step: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
  let next: number | null = null;
  if (e.key in step) next = (current + step[e.key] + count) % count;
  if (e.key === "Home") next = 0;
  if (e.key === "End") next = count - 1;
  if (next === null) return;
  e.preventDefault();
  go(next);
  (e.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus();
}

/** Lets the "Which nest is yours?" options pick a room in this section. */
export function useSelectRoom(rooms: { id: string }[], select: (i: number) => void) {
  useEffect(() => {
    const onSelect = (e: Event) => {
      const i = rooms.findIndex((r) => r.id === (e as CustomEvent<string>).detail);
      if (i >= 0) select(i);
    };
    window.addEventListener(SELECT_ROOM, onSelect);
    return () => window.removeEventListener(SELECT_ROOM, onSelect);
  }, [rooms, select]);
}

/** Phones: keep the active pill in view inside its horizontally scrolling row. */
export function useActivePillInView(listRef: RefObject<HTMLElement | null>, active: number) {
  useEffect(() => {
    const list = listRef.current;
    const pill = list?.children[active] as HTMLElement | undefined;
    if (!list || !pill || list.scrollWidth <= list.clientWidth) return;
    const left = pill.offsetLeft - (list.clientWidth - pill.offsetWidth) / 2;
    list.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [listRef, active]);
}
