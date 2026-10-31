"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { IconCheck, IconChevronLeft, IconChevronRight } from "@/components/icons";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";
import { BOOKING_URL } from "@/lib/site";
import { Pillows, onTabKeyDown, useActivePillInView, useSelectRoom } from "./RoomParts";
import { TourLink, TourViewer } from "@/components/TourViewer";
import { COTTAGES, COTTAGE_NAMES, RATES } from "./rooms";
import { glass } from "@/components/bits/glass";
import { GlassFill } from "@/components/bits/LiquidGlass";

// Stayflexi's cottage amenities, plus the sit-out from the official site.
const FACTS = ["Own washroom", "Hot water", "Air-conditioned", "Kettle, wardrobe", "Toiletries", "Private sit-out"];

const names = `${COTTAGE_NAMES.slice(0, -1).join(", ")} and ${COTTAGE_NAMES.at(-1)}`;

/**
 * #cottages — one screen: a tab per cottage (pills on phones), as in Family
 * rooms. Mayura and Mathura show the tour's live 360° view; Gopala and Govinda
 * have none, so their photo shows over the viewer. Beside it, how many the
 * cottage sleeps and what every cottage has. Phones: heading, tabs, view, facts.
 */
export function Cottages() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const count = COTTAGES.length;
  const cottage = COTTAGES[active];
  // the 360° player stays mounted on the nearest 360° cottage before this one while a photo shows over it
  const tour = COTTAGES.slice(0, active + 1).findLast((c) => c.tour)?.tour ?? COTTAGES[0].tour!;
  const prev = () => setActive((active - 1 + count) % count);
  const next = () => setActive((active + 1) % count);
  const control =
    `z-10 grid size-[40px] place-items-center rounded-full text-paper transition-colors duration-300 hover:bg-white/20 ${glass("dark")}`;
  const frameHeight = "h-[max(240px,calc(100svh-500px))] sm:h-[clamp(320px,34svh,440px)] lg:h-[clamp(360px,calc(100svh-280px),580px)]";

  const select = useCallback((i: number) => setActive(i), []);
  useSelectRoom(COTTAGES, select);
  useActivePillInView(listRef, active);

  return (
    <section id="cottages" data-nav="light" data-snap="" className={`bg-paper-deep ${screen}`}>
      <div
        className={`${container} grid gap-y-s13 sm:gap-y-s21 lg:grid-cols-[1.618fr_1fr] lg:grid-rows-[1fr_auto_auto_auto_1fr] lg:gap-x-s89 lg:gap-y-0 lg:[grid-template-areas:'frame_.'_'frame_header'_'frame_tabs'_'frame_details'_'frame_.']`}
      >
        <SectionHeader
          className="lg:[grid-area:header]"
          title="The cottages"
          lead={`Four cottages named for Krishna’s story: ${names}.`}
          leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
        />

        <div
          ref={listRef}
          role="tablist"
          aria-label="Cottages"
          className="relative -mx-s21 flex gap-s8 overflow-x-auto px-s21 py-[2px] [scrollbar-width:none] sm:-mx-s34 sm:px-s34 lg:mx-0 lg:mt-s34 lg:grid lg:gap-0 squat:mt-s21 lg:overflow-visible lg:border-t lg:border-line lg:px-0 lg:py-0 lg:[grid-area:tabs] [&::-webkit-scrollbar]:hidden"
        >
          {COTTAGES.map((c, i) => {
            const on = i === active;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                id={`cottage-tab-${c.id}`}
                aria-selected={on}
                aria-controls="cottage-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onTabKeyDown(e, count, active, setActive)}
                className={`relative flex min-h-[44px] shrink-0 items-center gap-s8 rounded-btn border px-s21 text-[15px] whitespace-nowrap transition-colors duration-300 lg:justify-between lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-[10px] lg:text-left squat:py-[8px] lg:font-display lg:text-[clamp(20px,1.7vw,24px)] ${
                  on
                    ? "border-forest bg-forest text-paper lg:bg-transparent lg:text-forest"
                    : "border-forest/25 text-forest/75 hover:text-forest lg:text-forest/55"
                }`}
              >
                <span className="flex items-center gap-s13">
                  <span
                    aria-hidden="true"
                    className={`hidden h-[3px] w-s21 origin-left rounded-full bg-gold transition-transform duration-500 ease-[var(--ease-earth)] lg:block ${on ? "scale-x-100" : "scale-x-0"}`}
                  />
                  {c.name}
                </span>
                <span
                  className={`rounded-full px-[8px] py-[1px] font-sans text-[13px] leading-[1.5] tracking-normal ${on ? "bg-gold text-forest" : "bg-forest/10 text-forest/80"}`}
                >
                  <span className="sr-only">sleeps </span>
                  {c.sleeps}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="cottage-panel"
          role="tabpanel"
          aria-labelledby={`cottage-tab-${cottage.id}`}
          className="relative min-w-0 lg:[grid-area:frame]"
        >
          {cottage.photo ? (
            <div role="group" aria-label={cottage.title} className={`absolute inset-x-0 top-0 z-20 overflow-hidden rounded-card bg-card ring-1 ring-line ${frameHeight}`}>
              <Image src={cottage.photo} alt={cottage.title} fill sizes="(min-width: 1024px) 55vw, 100vw" placeholder="blur" className="object-cover" />
              <span className={`absolute bottom-s13 left-s13 rounded-full px-s13 py-[6px] text-[13px] font-medium text-paper ${glass("dark")}`}>
                <GlassFill />
                {cottage.name}
              </span>
              <button type="button" onClick={prev} aria-label="Previous cottage" className={`absolute top-1/2 left-s13 -translate-y-1/2 ${control}`}>
                <GlassFill />
                <IconChevronLeft size={20} />
              </button>
              <button type="button" onClick={next} aria-label="Next cottage" className={`absolute top-1/2 right-s13 -translate-y-1/2 ${control}`}>
                <GlassFill />
                <IconChevronRight size={20} />
              </button>
            </div>
          ) : null}
          <TourViewer
            tour={tour}
            title={cottage.tour ? cottage.title : "360° view of the cottages"}
            caption={cottage.name}
            tone="light"
            onPrev={prev}
            onNext={next}
            prevLabel="Previous cottage"
            nextLabel="Next cottage"
            className={frameHeight}
          />
          <TourLink tour={tour} tone="light" className="mt-s13 max-sm:hidden short:hidden" />
        </div>

        <div className="lg:mt-s34 lg:[grid-area:details] squat:mt-s21">
          <p className="flex flex-wrap items-center gap-x-s13 gap-y-[4px] text-forest">
            <Pillows {...cottage.pillows} className="text-farm" />
            <span className="font-medium">Sleeps {cottage.sleeps}</span>
          </p>
          <ul className="mt-s13 grid grid-cols-2 gap-x-s21 gap-y-[6px] text-[14px] leading-[1.4] sm:max-w-[30em] sm:text-[15px] short:mt-s8">
            {FACTS.map((f) => (
              <li key={f} className="flex items-start gap-s8">
                <IconCheck size={18} className="mt-[1px] shrink-0 text-farm" />
                {f}
              </li>
            ))}
          </ul>
          {/* phones lean on the floating "Book a stay" button instead, so the 360° view can be taller */}
          <div className="mt-s21 flex flex-wrap items-center gap-x-s21 gap-y-s8 max-sm:hidden lg:mt-s34 short:hidden squat:mt-s21">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
              Book a cottage
            </a>
            <span className="text-[14px] text-ink-muted">
              {RATES.cottageAdult} an adult, {RATES.cottageChild} a child over 5, all meals included. Children under 5 stay free.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
