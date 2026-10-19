"use client";

import { useCallback, useRef, useState } from "react";
import dorm1 from "@public/images/client-photos/stay-dorm-1.jpg";
import { IconArrow, IconCheck } from "@/components/icons";
import { SectionHeader, buttonClass, container } from "@/components/ui";
import { BOOKING_URL, WHATSAPP_NUMBER } from "@/lib/site";
import { PhotoStrip, Pillows, RoomMedia, onTabKeyDown, useActivePillInView, useSelectRoom, type View } from "./RoomParts";
import { NANDAGOKULA, type Photo } from "./rooms";

const STRIP: Photo[] = [
  {
    src: dorm1,
    alt: "A Nandagokula dormitory: double beds with folded blankets and towels under a high tiled roof, the door open onto the lawn and palms",
  },
  NANDAGOKULA[1].photo!,
];

// Stayflexi lists the two 10-guest dormitories; the triple room is booked by asking.
const TRIPLE_ENQUIRY = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Abhishta, I'd like to ask about the Nandagokula triple room.",
)}`;

/**
 * #dormitories — Nandagokula, the group rooms, on a forest band. Three tabs
 * (pills on phones) drive one panel: who the room suits, its beds, and the
 * room itself (Photos | 360°). Below: both dormitory photos and the whole-block
 * group stay.
 */
export function Nandagokula() {
  const [active, setActive] = useState(0);
  const [view, setView] = useState<View>("photos");
  const listRef = useRef<HTMLDivElement>(null);
  const count = NANDAGOKULA.length;
  const room = NANDAGOKULA[active];

  const select = useCallback((i: number) => setActive(i), []);
  useSelectRoom(NANDAGOKULA, select);
  useActivePillInView(listRef, active);

  const facts = [room.beds, "Own washroom with a shower", "Air-conditioned, with fans"];

  return (
    <section id="dormitories" data-nav="dark" className="on-dark bg-forest py-s89 text-paper lg:py-s144">
      <div className={container}>
        <SectionHeader
          tone="dark"
          title="Nandagokula"
          lead="The village Krishna grew up in, made for groups who travel together."
        />

        <div
          ref={listRef}
          role="tablist"
          aria-label="Nandagokula rooms"
          className="-mx-s21 mt-s34 flex gap-s8 overflow-x-auto px-s21 py-[2px] [scrollbar-width:none] sm:-mx-s34 sm:px-s34 lg:mx-0 lg:mt-s55 lg:gap-s34 lg:overflow-visible lg:border-b lg:border-paper/15 lg:px-0 lg:py-0 [&::-webkit-scrollbar]:hidden"
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
                className={`relative flex min-h-[44px] shrink-0 items-center gap-s8 rounded-btn border px-s21 text-[15px] whitespace-nowrap transition-colors duration-300 lg:-mb-px lg:rounded-none lg:border-0 lg:border-b-2 lg:px-0 lg:pb-s13 lg:font-display lg:text-[clamp(20px,1.8vw,24px)] ${
                  on
                    ? "border-paper/60 bg-paper/10 text-paper lg:border-gold lg:bg-transparent"
                    : "border-paper/20 text-paper/70 hover:text-paper lg:border-transparent"
                }`}
              >
                {r.short}
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
          className="mt-s21 grid gap-s34 lg:mt-s55 lg:grid-cols-[1fr_1.618fr] lg:items-start lg:gap-s89"
        >
          <RoomMedia
            room={room}
            tone="dark"
            view={view}
            onViewChange={setView}
            onPrev={() => setActive((active - 1 + count) % count)}
            onNext={() => setActive((active + 1) % count)}
            kind="room"
          />

          <div className="lg:order-first lg:pt-[61px]">
            <h3 className="font-display text-[clamp(28px,3vw,42px)] leading-[1.1] text-balance text-paper">{room.name}</h3>
            <p className="mt-s8 text-paper/80">{room.suits}</p>
            <p className="mt-s21 flex flex-wrap items-center gap-x-s13 gap-y-s8">
              <Pillows {...room.pillows} className="text-gold" />
              <span className="font-medium">Sleeps {room.sleeps}</span>
            </p>
            <ul className="mt-s13 grid gap-s8">
              {facts.map((f) => (
                <li key={f} className="flex items-start gap-s13 text-[16px] leading-[1.5] text-paper/90">
                  <IconCheck size={20} className="mt-[2px] shrink-0 text-gold" />
                  {f}
                </li>
              ))}
            </ul>
            {room.id === "triple" ? (
              <a href={TRIPLE_ENQUIRY} target="_blank" rel="noopener noreferrer" className={buttonClass("gold", "mt-s34")}>
                Ask about the triple room
              </a>
            ) : (
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={buttonClass("gold", "mt-s34")}>
                Book a dormitory
              </a>
            )}
          </div>
        </div>

        <div className="mt-s55 grid gap-s34 lg:mt-s89 lg:grid-cols-[1.618fr_1fr] lg:items-end lg:gap-s89">
          <PhotoStrip photos={STRIP} label="Inside Nandagokula" />
          <div>
            <p className="font-display text-[clamp(26px,2.6vw,34px)] leading-[1.15] text-paper">Together, up to 24 guests</p>
            <p className="mt-s13 max-w-[26em] text-paper/80">
              All three rooms sleep up to 24 between them, for a school trip, a camp or a yoga retreat.
            </p>
            <a href="/group-enquiries" className={buttonClass("ghost-light", "mt-s21")}>
              Plan a group stay
              <IconArrow size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
