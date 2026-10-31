"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Image from "next/image";
import { glass } from "@/components/bits/glass";
import { GlassFill } from "@/components/bits/LiquidGlass";
import { IconChevronLeft, IconChevronRight, IconDining, IconMilk, IconOrchard, IconPot, IconSprout } from "@/components/icons";
import { TourViewer } from "@/components/TourViewer";
import { SectionHeader, container, screen } from "@/components/ui";
import { onTabKeyDown, useActivePillInView } from "@/components/sections/our-nests/RoomParts";
import { FARM_STOPS, SELECT_STOP } from "./farm";

const ICONS: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  rows: IconSprout,
  orchard: IconOrchard,
  cows: IconMilk,
  kitchen: IconPot,
  plate: IconDining,
};

/**
 * #from-the-farm — right after Farm to table (client, 2026-10-31): the same
 * five stops, now to look at. A tab per stop (pills on phones) turns one live
 * 360° view between the orchard, the gaushaale and the dining hall; the
 * vegetable rows have no 360° view, so their photo shows over the viewer.
 * Each node of the diagram above opens its stop here.
 */
export function FarmViews() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const count = FARM_STOPS.length;
  const stop = FARM_STOPS[active];
  // the 360° player stays mounted on the nearest 360° stop while a photo shows over it
  const tour = FARM_STOPS.slice(0, active + 1).findLast((s) => s.tour)?.tour ?? FARM_STOPS.find((s) => s.tour)!.tour!;
  const prev = () => setActive((active - 1 + count) % count);
  const next = () => setActive((active + 1) % count);
  const control = `z-10 grid size-[40px] place-items-center rounded-full text-paper transition-colors duration-300 hover:bg-white/20 ${glass("dark")}`;
  const frameHeight = "h-[max(220px,calc(100svh-420px))] sm:h-[clamp(320px,38svh,460px)] lg:h-[clamp(360px,calc(100svh-280px),580px)]";

  useEffect(() => {
    const onSelect = (e: Event) => {
      const i = FARM_STOPS.findIndex((s) => s.id === (e as CustomEvent<string>).detail);
      if (i >= 0) setActive(i);
    };
    window.addEventListener(SELECT_STOP, onSelect);
    return () => window.removeEventListener(SELECT_STOP, onSelect);
  }, []);
  useActivePillInView(listRef, active);

  return (
    <section id="from-the-farm" data-nav="light" data-snap="" className={`bg-paper-deep ${screen}`}>
      <div
        className={`${container} grid grid-cols-[minmax(0,1fr)] gap-y-s13 sm:gap-y-s21 lg:grid-cols-[1fr_1.618fr] lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-s89 lg:gap-y-0 lg:[grid-template-areas:'._frame'_'header_frame'_'tabs_frame'_'._frame']`}
      >
        <SectionHeader
          className="lg:[grid-area:header]"
          title="See where it comes from"
          lead="Look around each stop on the way to your plate."
          leadClassName="max-sm:mt-s8 max-sm:text-[15px] max-sm:leading-[1.5]"
        />

        <div
          ref={listRef}
          role="tablist"
          aria-label="From the soil to your plate"
          className="relative -mx-s21 flex min-w-0 gap-s8 overflow-x-auto px-s21 py-[2px] [scrollbar-width:none] sm:-mx-s34 sm:px-s34 lg:mx-0 lg:mt-s34 lg:grid lg:gap-0 lg:overflow-visible lg:border-t lg:border-line lg:px-0 lg:py-0 lg:[grid-area:tabs] squat:mt-s21 [&::-webkit-scrollbar]:hidden"
        >
          {FARM_STOPS.map((s, i) => {
            const on = i === active;
            const Icon = ICONS[s.id];
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                id={`farm-stop-tab-${s.id}`}
                aria-selected={on}
                aria-controls="farm-stop-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onTabKeyDown(e, count, active, setActive)}
                className={`relative flex min-h-[44px] shrink-0 items-center gap-s8 rounded-btn border px-s13 text-[15px] whitespace-nowrap transition-colors duration-300 lg:grid lg:grid-cols-[24px_1fr] lg:gap-x-s13 lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-[10px] lg:text-left lg:whitespace-normal squat:py-[7px] ${
                  on ? "border-forest bg-forest text-paper lg:bg-transparent lg:text-forest" : "border-forest/25 text-forest/75 hover:text-forest lg:text-forest/55"
                }`}
              >
                <Icon size={20} className={on ? "text-gold lg:text-farm" : "text-farm"} />
                <span className="lg:font-display lg:text-[clamp(19px,1.6vw,23px)] lg:leading-[1.2]">{s.label}</span>
                {/* large screens: the open stop says a line about itself */}
                <span className={`col-start-2 hidden text-[15px] leading-[1.4] text-ink-muted ${on ? "lg:block" : ""}`}>{s.line}</span>
              </button>
            );
          })}
        </div>

        <div id="farm-stop-panel" role="tabpanel" aria-labelledby={`farm-stop-tab-${stop.id}`} className="relative min-w-0 lg:[grid-area:frame]">
          {stop.photo ? (
            <div role="group" aria-label={stop.caption} className={`absolute inset-x-0 top-0 z-20 overflow-hidden rounded-card bg-card ring-1 ring-line ${frameHeight}`}>
              <Image src={stop.photo.src} alt={stop.photo.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" placeholder="blur" className="object-cover" />
              <span className={`absolute bottom-s13 left-s13 rounded-full px-s13 py-[6px] text-[13px] font-medium text-paper ${glass("dark")}`}>
                <GlassFill />
                <span className="relative">{`${stop.caption}, ${active + 1} of ${count}`}</span>
              </span>
              <button type="button" onClick={prev} aria-label="Previous stop" className={`absolute top-1/2 left-s13 -translate-y-1/2 ${control}`}>
                <GlassFill />
                <IconChevronLeft size={20} />
              </button>
              <button type="button" onClick={next} aria-label="Next stop" className={`absolute top-1/2 right-s13 -translate-y-1/2 ${control}`}>
                <GlassFill />
                <IconChevronRight size={20} />
              </button>
            </div>
          ) : null}
          <TourViewer
            tour={tour}
            title={stop.tour ? `360° view: ${stop.caption.toLowerCase()}` : "360° view of the farm"}
            caption={`${stop.caption}, ${active + 1} of ${count}`}
            tone="light"
            onPrev={prev}
            onNext={next}
            prevLabel="Previous stop"
            nextLabel="Next stop"
            className={frameHeight}
          />
          {/* phones and tablets: the stop's line under the view */}
          <p className="mt-s8 text-[15px] leading-[1.45] text-ink-muted lg:hidden short:hidden">{stop.line}</p>
        </div>
      </div>
    </section>
  );
}
