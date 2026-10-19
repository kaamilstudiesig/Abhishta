"use client";

import { useEffect, useId, type CSSProperties, type KeyboardEvent, type RefObject } from "react";
import Image from "next/image";
import { Icon360, IconChevronLeft, IconChevronRight, IconExternal } from "@/components/icons";
import { SELECT_ROOM, tourUrl, type Photo, type Pillows as PillowCount, type Room } from "./rooms";

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
 * Stands in for a photo the client hasn't sent yet: the room's name under a
 * gable of terracotta ceiling tiles (the diamond-pressed tiles in every room).
 * Swapping in the real photo is a one-line change in rooms.ts.
 */
export function RoomPlaceholder({
  room,
  tone,
  action,
}: {
  room: Room;
  tone: Tone;
  action?: { label: string; onClick: () => void };
}) {
  const patternId = useId();
  const dark = tone === "dark";
  return (
    <div
      className={`absolute inset-0 flex flex-col justify-end overflow-hidden ${
        dark ? "text-gold" : "text-farm"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 160 110"
        preserveAspectRatio="xMidYMin slice"
        className="absolute inset-0 size-full"
      >
        <defs>
          <pattern id={patternId} width="9" height="9" patternUnits="userSpaceOnUse">
            <path d="M4.5 0.8 8.2 4.5 4.5 8.2 0.8 4.5Z" fill="none" stroke="currentColor" strokeWidth="0.45" />
            <path d="M4.5 3.2 5.8 4.5 4.5 5.8 3.2 4.5Z" fill="currentColor" opacity="0.6" />
          </pattern>
        </defs>
        <polygon points="-4,66 80,10 164,66" fill={`url(#${patternId})`} opacity={dark ? 0.32 : 0.28} />
        <polyline points="-4,66 80,10 164,66" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
        <path d="M0 66H160" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
        <path d="M80 10V66" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
      </svg>
      <div className="relative p-s21 sm:p-s34">
        <p
          className={`font-display text-[clamp(28px,3.4vw,45px)] leading-[1.05] tracking-[-0.02em] ${dark ? "text-paper" : "text-forest"}`}
        >
          {room.name}
        </p>
        <p className={`mt-s8 text-[15px] ${dark ? "text-paper/80" : "text-ink-muted"}`}>
          Photos of {room.meaning ? room.name : `the ${room.name.toLowerCase()}`} are on their way.
        </p>
        {action ? (
          <button
            type="button"
            onClick={action.onClick}
            className={`mt-s13 inline-flex min-h-[44px] items-center gap-s8 rounded-btn px-s21 text-[15px] font-medium transition-colors duration-300 ${
              dark ? "bg-paper text-forest hover:bg-gold-soft" : "bg-farm text-paper hover:bg-forest"
            }`}
          >
            <Icon360 size={20} />
            {action.label}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export type View = "photos" | "360";

/**
 * One room's media: a Photos | 360° switch and prev/next chevrons above a
 * 16:11 frame. The 360° iframe is created only when the 360° tab is chosen
 * (never before), so the page stays light and scrolling past never gets caught
 * in the viewer. Rooms without a tour scene show photos only, with no switch.
 * The parent section wraps it in the tabpanel.
 */
export function RoomMedia({
  room,
  tone,
  view,
  onViewChange,
  onPrev,
  onNext,
  kind,
  fallback,
}: {
  room: Room;
  tone: Tone;
  view: View;
  onViewChange: (v: View) => void;
  onPrev: () => void;
  onNext: () => void;
  /** "cottage" / "room", for the chevron labels */
  kind: string;
  /** for a room with neither a photo nor a tour scene: somewhere else to look around */
  fallback?: { label: string; onClick: () => void };
}) {
  const dark = tone === "dark";
  const showTour = view === "360" && !!room.tour;

  const seg = (active: boolean) =>
    `inline-flex min-h-[40px] items-center gap-[6px] rounded-btn px-s13 text-[14px] font-medium transition-colors duration-300 sm:px-s21 ${
      active
        ? dark
          ? "bg-paper text-forest"
          : "bg-forest text-paper"
        : dark
          ? "text-paper/75 hover:text-paper"
          : "text-ink-muted hover:text-forest"
    }`;
  const chevron = `grid size-[44px] place-items-center rounded-full border transition-colors duration-300 ${
    dark ? "border-paper/25 text-paper hover:border-paper hover:bg-paper hover:text-forest" : "border-line bg-card text-forest hover:border-forest"
  }`;

  return (
    <div className="min-w-0">
      <div className="mb-s13 flex min-h-[48px] items-center justify-between gap-s13">
        {room.tour ? (
          <div
            role="group"
            aria-label={`How to see ${room.name}`}
            className={`inline-flex rounded-btn p-[4px] ${dark ? "bg-paper/10" : "bg-card ring-1 ring-line"}`}
          >
            <button type="button" aria-pressed={!showTour} onClick={() => onViewChange("photos")} className={seg(!showTour)}>
              Photos
            </button>
            <button type="button" aria-pressed={showTour} onClick={() => onViewChange("360")} className={seg(showTour)}>
              <Icon360 size={18} />
              360°
            </button>
          </div>
        ) : (
          <p className={`text-[14px] ${dark ? "text-paper/70" : "text-ink-muted"}`}>No 360° view of {room.name} yet</p>
        )}
        <div className="flex shrink-0 gap-s8">
          <button type="button" onClick={onPrev} aria-label={`Previous ${kind}`} className={chevron}>
            <IconChevronLeft size={20} />
          </button>
          <button type="button" onClick={onNext} aria-label={`Next ${kind}`} className={chevron}>
            <IconChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        className={`relative aspect-[16/11] overflow-hidden rounded-card lg:aspect-[4/3] ${dark ? "bg-paper/[0.06] ring-1 ring-paper/10" : "bg-card ring-1 ring-line"}`}
      >
        {showTour && room.tour ? (
          <>
            {/* shows through until the tour paints over it */}
            <p className={`absolute inset-0 grid place-items-center text-[15px] ${dark ? "text-paper/70" : "text-ink-muted"}`}>
              Opening the 360° view…
            </p>
            <iframe
              key={room.id}
              src={tourUrl(room.tour.node, room.tour)}
              title={`360° view of ${room.name}`}
              allow="fullscreen; gyroscope; accelerometer; xr-spatial-tracking"
              allowFullScreen
              className="absolute inset-0 size-full"
            />
          </>
        ) : room.photo ? (
          <RoomPhoto key={room.id} photo={room.photo} />
        ) : (
          <RoomPlaceholder
            key={room.id}
            room={room}
            tone={tone}
            action={room.tour ? { label: "See it in 360°", onClick: () => onViewChange("360") } : fallback}
          />
        )}
      </div>

      {showTour && room.tour ? (
        <p className={`mt-s13 flex flex-wrap items-center gap-x-s21 gap-y-[2px] text-[14px] ${dark ? "text-paper/75" : "text-ink-muted"}`}>
          <span>Press start, then drag to look around.</span>
          <a
            href={tourUrl(room.tour.node, room.tour)}
            target="_blank"
            rel="noopener noreferrer"
            className={`tap inline-flex items-center gap-[6px] font-medium ${dark ? "text-paper hover:text-gold" : "text-forest hover:text-farm"}`}
          >
            Open the full tour
            <IconExternal size={16} />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </p>
      ) : null}
    </div>
  );
}

function RoomPhoto({ photo }: { photo: Photo }) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes="(min-width: 1024px) 760px, 100vw"
      placeholder="blur"
      className="nest-fade object-cover"
    />
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
export function useSelectRoom(rooms: Room[], select: (i: number) => void) {
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

/**
 * A row of photos at one height, each as wide as its own proportions (no
 * awkward crops). Phones: a swipe row with the next photo peeking in.
 */
export function PhotoStrip({ photos, label, className = "" }: { photos: Photo[]; label: string; className?: string }) {
  return (
    <ul
      aria-label={label}
      className={`-mx-s21 flex snap-x snap-mandatory gap-s8 overflow-x-auto scroll-px-s21 px-s21 [--strip-h:212px] [scrollbar-width:none] sm:-mx-s34 sm:scroll-px-s34 sm:px-s34 md:mx-0 md:h-[clamp(200px,21vw,290px)] md:snap-none md:gap-s13 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {photos.map((p) => {
        const ratio = p.src.width / p.src.height;
        return (
          <li
            key={p.src.src}
            style={{ "--ar": ratio } as CSSProperties}
            className="relative h-[var(--strip-h)] w-[calc(var(--strip-h)*var(--ar))] shrink-0 snap-start overflow-hidden rounded-[18px] md:h-full md:w-auto md:shrink md:grow-[var(--ar)] md:basis-0"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(min-width: 768px) 34vw, 320px"
              placeholder="blur"
              className="object-cover"
            />
          </li>
        );
      })}
    </ul>
  );
}
