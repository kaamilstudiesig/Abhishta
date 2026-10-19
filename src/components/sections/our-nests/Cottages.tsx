"use client";

import { useCallback, useRef, useState } from "react";
import cottage2 from "@public/images/client-photos/stay-cottage-2.jpg";
import sitout from "@public/images/client-photos/stay-cottage-sitout.jpg";
import { IconCheck } from "@/components/icons";
import { SectionHeader, buttonClass, container } from "@/components/ui";
import { BOOKING_URL } from "@/lib/site";
import { PhotoStrip, Pillows, RoomMedia, onTabKeyDown, useActivePillInView, useSelectRoom, type View } from "./RoomParts";
import { COTTAGES, COTTAGE_PILLOWS, type Photo } from "./rooms";

const FACTS = ["Air-conditioned, with fans", "Own washroom with hot water", "Wardrobe, kettle and toiletries", "A private sit-out"];

const STRIP: Photo[] = [
  COTTAGES[1].photo!,
  {
    src: cottage2,
    alt: "A cottage bedroom from the bed: green cushions on white linen, a folding extra bed, a standing fan and the carved door open to the veranda",
  },
  COTTAGES[0].photo!,
  {
    src: sitout,
    alt: "Gopala's sit-out: two wicker chairs and a small table on a patterned tile veranda with carved timber pillars, behind a bed of yellow crotons",
  },
];

/**
 * #cottages — the four cottage names, set large, are the tabs: picking one
 * shows that cottage in the panel (Photos | 360° where the tour has the room)
 * and captions what the name means. Every cottage has the same facts, so they
 * sit once beside the names. 61.8 / 38.2 split; phones stack with name pills.
 */
export function Cottages() {
  const [active, setActive] = useState(0);
  const [view, setView] = useState<View>("photos");
  const listRef = useRef<HTMLDivElement>(null);
  const count = COTTAGES.length;
  const room = COTTAGES[active];

  const select = useCallback((i: number) => setActive(i), []);
  useSelectRoom(COTTAGES, select);
  useActivePillInView(listRef, active);

  return (
    <section id="cottages" data-nav="light" className="bg-paper-deep py-s89 lg:py-s144">
      <div className={container}>
        <SectionHeader
          title="The cottages"
          lead="Four cottages named for Krishna’s story, each with its own washroom and sit-out."
        />

        <div className="mt-s34 grid gap-y-s21 lg:mt-s55 lg:grid-cols-[1.618fr_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-s89 lg:gap-y-0 lg:[grid-template-areas:'media_tabs'_'media_details']">

          <div
            ref={listRef}
            role="tablist"
            aria-label="Cottages"
            className="-mx-s21 flex gap-s8 overflow-x-auto px-s21 py-[2px] [scrollbar-width:none] sm:-mx-s34 sm:px-s34 lg:mx-0 lg:grid lg:gap-0 lg:overflow-visible lg:border-t lg:border-line lg:px-0 lg:py-0 lg:[grid-area:tabs] [&::-webkit-scrollbar]:hidden"
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
                  className={`group flex min-h-[44px] shrink-0 items-center rounded-btn border px-s21 text-[15px] whitespace-nowrap transition-colors duration-300 lg:min-h-0 lg:items-baseline lg:justify-between lg:gap-s13 lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-s13 lg:text-left ${
                    on
                      ? "border-forest bg-forest text-paper lg:bg-transparent lg:text-forest"
                      : "border-line bg-card text-ink-muted hover:text-forest lg:bg-transparent"
                  }`}
                >
                  {/* desktop: a leaf-green bar grows in and the name steps right (transforms only; the step is reserved by pr) */}
                  <span className="relative lg:pr-[34px] lg:font-display lg:text-[clamp(30px,3vw,42px)] lg:leading-[1.1]">
                    <span
                      aria-hidden="true"
                      className={`absolute top-1/2 left-0 hidden h-[3px] w-s21 origin-left -translate-y-1/2 rounded-full bg-farm transition-transform duration-500 ease-[var(--ease-earth)] lg:block ${on ? "scale-x-100" : "scale-x-0"}`}
                    />
                    <span
                      translate="no"
                      className={`block transition-transform duration-500 ease-[var(--ease-earth)] ${on ? "lg:translate-x-[34px]" : ""}`}
                    >
                      {c.name}
                    </span>
                  </span>
                  <span className={`hidden min-w-0 text-right text-[15px] lg:block ${on ? "text-ink" : "text-ink-muted"}`}>{c.meaning}</span>
                </button>
              );
            })}
          </div>

          <div
            id="cottage-panel"
            role="tabpanel"
            aria-labelledby={`cottage-tab-${room.id}`}
            className="min-w-0 lg:[grid-area:media]"
          >
            <RoomMedia
              room={room}
              tone="light"
              view={view}
              onViewChange={setView}
              onPrev={() => setActive((active - 1 + count) % count)}
              onNext={() => setActive((active + 1) % count)}
              kind="cottage"
              fallback={{
                label: "See Mayura in 360°",
                onClick: () => {
                  setActive(0);
                  setView("360");
                },
              }}
            />
            <p className="mt-s13 flex items-baseline gap-s13 lg:hidden">
              <span className="font-display text-h3 text-forest">{room.name}</span>
              <span className="text-ink-muted">{room.meaning}</span>
            </p>
          </div>

          <div className="lg:mt-s34 lg:[grid-area:details]">
            <p className="flex flex-wrap items-center gap-x-s13 gap-y-s8 text-forest">
              <Pillows {...COTTAGE_PILLOWS} className="text-farm" />
              <span>
                <span className="font-medium">Sleeps up to 5</span>
                <span className="text-ink-muted">: beds for 4 and an extra bed</span>
              </span>
            </p>
            <ul className="mt-s13 grid gap-s8">
              {FACTS.map((f) => (
                <li key={f} className="flex items-start gap-s13 text-[16px] leading-[1.5]">
                  <IconCheck size={20} className="mt-[2px] shrink-0 text-farm" />
                  {f}
                </li>
              ))}
            </ul>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "mt-s34")}>
              Book a cottage
            </a>
            <p className="mt-s13 text-[14px] text-ink-muted">Rates for each meal plan are on the booking page.</p>
          </div>
        </div>

        <PhotoStrip photos={STRIP} label="Inside the cottages" className="mt-s55 lg:mt-s89" />
      </div>
    </section>
  );
}
