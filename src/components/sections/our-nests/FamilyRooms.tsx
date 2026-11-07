"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { IconCheck, IconChevronLeft, IconChevronRight, IconExternal } from "@/components/icons";
import { SectionHeader, container, screen } from "@/components/ui";
import { tourUrl } from "@/lib/tour";
import { glass } from "@/components/bits/glass";
import { GlassFill } from "@/components/bits/LiquidGlass";
import { Pillows, onTabKeyDown, useActivePillInView, useSelectRoom } from "./RoomParts";
import { FAMILY_ROOMS, RATES } from "./rooms";

/**
 * #dormitories (the id the homepage links to) — the three family rooms on a
 * forest band, one screen: Gopika, Nandagokula and Kaustubha (client's rate
 * sheet). Room tabs (pills on phones) switch a photo slideshow of the room,
 * as on the cottages (arrows and a count; the last photo is the block from
 * outside), with a link to the room's 360° view in the tour. Beside it, who
 * the room suits, its beds, bathrooms and the per-person rate.
 */
export function FamilyRooms() {
  const [active, setActiveRoom] = useState(0);
  const [shot, setShot] = useState(0); // which photo of the open room
  // a new room starts on its first photo
  const setActive = useCallback((i: number) => {
    setActiveRoom(i);
    setShot(0);
  }, []);
  const listRef = useRef<HTMLDivElement>(null);
  const count = FAMILY_ROOMS.length;
  const room = FAMILY_ROOMS[active];
  const shots = room.photos.length;
  const photo = room.photos[shot];
  const prev = () => setShot((shot - 1 + shots) % shots);
  const next = () => setShot((shot + 1) % shots);
  const control =
    `z-10 grid size-[40px] place-items-center rounded-full text-paper transition-colors duration-300 hover:bg-white/20 ${glass("dark")}`;
  const facts = [
    `${room.bathrooms} in the room`,
    "Fans, no air-conditioning",
    `${RATES.familyRoom} a person, meals and taxes included`,
  ];

  useSelectRoom(FAMILY_ROOMS, setActive);
  useActivePillInView(listRef, active);

  return (
    <section id="dormitories" data-nav="dark" data-snap="" className={`on-dark bg-forest text-paper ${screen}`}>
      <div
        className={`${container} grid gap-y-s13 sm:gap-y-s21 lg:grid-cols-[1fr_1.618fr] lg:grid-rows-[1fr_auto_auto_auto_1fr] lg:gap-x-s89 lg:gap-y-0 lg:[grid-template-areas:'._frame'_'header_frame'_'tabs_frame'_'details_frame'_'._frame']`}
      >
        <SectionHeader
          tone="dark"
          className="lg:[grid-area:header]"
          title="Family rooms"
          lead={`Shared rooms for families and groups, ${RATES.familyRoom} a person.`}
          leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
        />

        <div
          ref={listRef}
          role="tablist"
          aria-label="Family rooms"
          className="relative -mx-s21 flex gap-s8 overflow-x-auto px-s21 py-[2px] [scrollbar-width:none] sm:-mx-s34 sm:px-s34 lg:mx-0 lg:mt-s34 lg:grid lg:gap-0 squat:mt-s21 lg:overflow-visible lg:border-t lg:border-paper/15 lg:px-0 lg:py-0 lg:[grid-area:tabs] [&::-webkit-scrollbar]:hidden"
        >
          {FAMILY_ROOMS.map((r, i) => {
            const on = i === active;
            return (
              <button
                key={r.id}
                type="button"
                role="tab"
                id={`family-room-tab-${r.id}`}
                aria-selected={on}
                aria-controls="family-room-panel"
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
                  {r.name}
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
          id="family-room-panel"
          role="tabpanel"
          aria-labelledby={`family-room-tab-${room.id}`}
          className="min-w-0 lg:[grid-area:frame]"
        >
          <div
            role="group"
            aria-roledescription="slideshow"
            aria-label={`Photos of the ${room.name} family room`}
            className="relative h-[max(240px,calc(100svh-488px))] overflow-hidden rounded-card bg-paper/[0.06] ring-1 ring-paper/10 sm:h-[clamp(320px,34svh,440px)] lg:h-[clamp(360px,calc(100svh-280px),580px)]"
          >
            <Image
              key={photo.src.src}
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              placeholder="blur"
              style={{ objectPosition: photo.focus }}
              className="animate-[fade-in_500ms_ease-out] object-cover motion-reduce:animate-none"
            />
            {/* a soft shade at the bottom and sides, so the clear-glass count and arrows read on white walls */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.4),transparent_30%),linear-gradient(to_right,rgb(0_0_0/0.22),transparent_16%,transparent_84%,rgb(0_0_0/0.22))]"
            />
            <span aria-live="polite" className={`absolute bottom-s13 left-s13 rounded-full px-s13 py-[6px] text-[13px] font-medium text-paper ${glass("dark")}`}>
              <GlassFill />
              {`${room.name} · ${shot + 1} of ${shots}`}
            </span>
            <button type="button" onClick={prev} aria-label={`Previous photo of ${room.name}`} className={`absolute top-1/2 left-s13 -translate-y-1/2 ${control}`}>
              <GlassFill />
              <IconChevronLeft size={20} />
            </button>
            <button type="button" onClick={next} aria-label={`Next photo of ${room.name}`} className={`absolute top-1/2 right-s13 -translate-y-1/2 ${control}`}>
              <GlassFill />
              <IconChevronRight size={20} />
            </button>
          </div>
          <a
            href={tourUrl(room.tour.node, room.tour)}
            target="_blank"
            rel="noopener noreferrer"
            className="tap mt-s8 inline-flex items-center gap-[6px] text-[14px] font-medium text-paper hover:text-gold sm:mt-s13"
          >
            See {room.name} in 360°
            <IconExternal size={15} />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
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
            {facts.map((f) => (
              <li key={f} className="flex items-start gap-s8">
                <IconCheck size={18} className="mt-[1px] shrink-0 text-gold" />
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-s8 hidden text-[15px] text-paper/90 max-lg:block squat:block">
            {room.bathrooms}, fans, no AC
          </p>
        </div>
      </div>
    </section>
  );
}
