"use client";

import { useCallback, useRef, useState } from "react";
import { IconCheck } from "@/components/icons";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";
import { BOOKING_URL, WHATSAPP_NUMBER } from "@/lib/site";
import { Pillows, onTabKeyDown, useActivePillInView, useSelectRoom } from "./RoomParts";
import { TourLink, TourViewer } from "@/components/TourViewer";
import { NANDAGOKULA } from "./rooms";

// The triple room isn't on Stayflexi; it's booked by asking.
const TRIPLE_ENQUIRY = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Abhishta, I'd like to ask about the Nandagokula triple room.",
)}`;

// Stayflexi: "Shared bathroom", shower, bottled water, toiletries, AC, fan. The tour shows the washroom inside each room.
const FACTS = ["Washroom inside the room, shared by your group", "Shower, bottled water and toiletries", "Air-conditioning and fans"];

/**
 * #dormitories — Nandagokula on a forest band, one screen. Three room tabs
 * (pills on phones) turn one live 360° view between the rooms; beside it, who
 * the room suits, its beds and what's in it. Each room is booked whole by one group.
 */
export function Nandagokula() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const count = NANDAGOKULA.length;
  const room = NANDAGOKULA[active];

  const select = useCallback((i: number) => setActive(i), []);
  useSelectRoom(NANDAGOKULA, select);
  useActivePillInView(listRef, active);

  return (
    <section id="dormitories" data-nav="dark" data-snap="" className={`on-dark bg-forest text-paper ${screen}`}>
      <div
        className={`${container} grid gap-y-s13 sm:gap-y-s21 lg:grid-cols-[1fr_1.618fr] lg:grid-rows-[1fr_auto_auto_auto_1fr] lg:gap-x-s89 lg:gap-y-0 lg:[grid-template-areas:'._frame'_'header_frame'_'tabs_frame'_'details_frame'_'._frame']`}
      >
        <SectionHeader
          tone="dark"
          className="lg:[grid-area:header]"
          title="Nandagokula"
          lead="The village Krishna grew up in. Each room is booked whole, by one group."
          leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
        />

        <div
          ref={listRef}
          role="tablist"
          aria-label="Nandagokula rooms"
          className="relative -mx-s21 flex gap-s8 overflow-x-auto px-s21 py-[2px] [scrollbar-width:none] sm:-mx-s34 sm:px-s34 lg:mx-0 lg:mt-s34 lg:grid lg:gap-0 squat:mt-s21 lg:overflow-visible lg:border-t lg:border-paper/15 lg:px-0 lg:py-0 lg:[grid-area:tabs] [&::-webkit-scrollbar]:hidden"
        >
          {NANDAGOKULA.map((r, i) => {
            const on = i === active;
            return (
              <button
                key={r.id}
                type="button"
                role="tab"
                id={`nandagokula-tab-${r.id}`}
                aria-selected={on}
                aria-controls="nandagokula-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onTabKeyDown(e, count, active, setActive)}
                className={`relative flex min-h-[44px] shrink-0 items-center gap-s8 rounded-btn border px-s21 text-[15px] whitespace-nowrap transition-colors duration-300 lg:justify-between lg:rounded-none lg:border-0 lg:border-b lg:border-paper/15 lg:px-0 lg:py-[10px] lg:text-left squat:py-[8px] lg:font-display lg:text-[clamp(20px,1.7vw,24px)] ${
                  on
                    ? "border-paper/60 bg-paper/10 text-paper lg:bg-transparent"
                    : "border-paper/20 text-paper/70 hover:text-paper lg:border-paper/15"
                }`}
              >
                <span className="flex items-center gap-s13">
                  <span
                    aria-hidden="true"
                    className={`hidden h-[3px] w-s21 origin-left rounded-full bg-gold transition-transform duration-500 ease-[var(--ease-earth)] lg:block ${on ? "scale-x-100" : "scale-x-0"}`}
                  />
                  {r.short}
                </span>
                <span
                  className={`rounded-full px-[8px] py-[1px] font-sans text-[13px] leading-[1.5] tracking-normal ${on ? "bg-gold text-forest" : "bg-paper/10 text-paper/80"}`}
                >
                  <span className="sr-only">sleeps </span>
                  {r.sleeps}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="nandagokula-panel"
          role="tabpanel"
          aria-labelledby={`nandagokula-tab-${room.id}`}
          className="min-w-0 lg:[grid-area:frame]"
        >
          <TourViewer
            tour={room.tour}
            title={`360° view of the Nandagokula ${room.name.toLowerCase()}`}
            tone="dark"
            onPrev={() => setActive((active - 1 + count) % count)}
            onNext={() => setActive((active + 1) % count)}
            prevLabel="Previous room"
            nextLabel="Next room"
            className="h-[max(280px,calc(100svh-444px))] sm:h-[clamp(350px,36svh,460px)] lg:h-[clamp(360px,calc(100svh-280px),580px)]"
          />
          <TourLink tour={room.tour} tone="dark" className="mt-s13 max-lg:hidden" />
        </div>

        <div className="lg:mt-s34 lg:[grid-area:details] squat:mt-s21">
          <p className="flex flex-wrap items-center gap-x-s13 gap-y-[4px]">
            <Pillows {...room.pillows} className="text-gold" />
            <span>
              <span className="font-medium">Sleeps {room.sleeps}</span>
              <span className="text-paper/75">, {room.beds}</span>
            </span>
          </p>
          <p className="mt-[4px] text-[15px] text-paper/75 max-sm:hidden squat:hidden">{room.suits}</p>
          {/* phones, tablets and short laptops get the one-line version below */}
          <ul className="mt-s13 grid gap-[6px] text-[15px] leading-[1.4] text-paper/90 max-lg:hidden squat:hidden">
            {FACTS.map((f) => (
              <li key={f} className="flex items-start gap-s8">
                <IconCheck size={18} className="mt-[1px] shrink-0 text-gold" />
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-s8 hidden text-[15px] text-paper/90 max-lg:block squat:block">Shared washroom, AC and fans</p>
          <a
            href={room.bookable ? BOOKING_URL : TRIPLE_ENQUIRY}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("gold", "mt-s21 max-sm:hidden short:hidden lg:mt-s34 squat:mt-s21")}
          >
            {room.bookable ? "Book a dormitory" : "Ask about the triple room"}
          </a>
        </div>
      </div>
    </section>
  );
}
