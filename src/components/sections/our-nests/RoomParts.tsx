"use client";

import { useEffect, type KeyboardEvent, type RefObject } from "react";
import { SELECT_ROOM, type Pillows as PillowCount } from "./rooms";

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
