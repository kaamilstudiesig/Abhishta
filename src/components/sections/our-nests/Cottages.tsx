"use client";

import { useState } from "react";
import Image from "next/image";
import { IconCheck, IconChevronLeft, IconChevronRight } from "@/components/icons";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";
import { BOOKING_URL } from "@/lib/site";
import { Pillows } from "./RoomParts";
import { TourLink, TourViewer } from "@/components/TourViewer";
import { COTTAGE_NAMES, COTTAGE_PILLOWS, COTTAGE_VIEWS, RATES } from "./rooms";
import { glass } from "@/components/bits/glass";
import { GlassFill } from "@/components/bits/LiquidGlass";

// Stayflexi's cottage amenities, plus the sit-out from the official site.
const FACTS = ["Own washroom", "Hot water", "Air-conditioned", "Kettle, wardrobe", "Toiletries", "Private sit-out"];

const names = `${COTTAGE_NAMES.slice(0, -1).join(", ")} and ${COTTAGE_NAMES.at(-1)}`;

/**
 * #cottages — one screen: a slideshow of the cottages — 360° views of Mayura,
 * Mathura and Mayura's washroom, then photos of Gopala and Govinda (no 360°
 * view there) — beside what every cottage has. The
 * four names are said once, in the lead. Phones: heading, view, facts.
 */
export function Cottages() {
  const [view, setView] = useState(0);
  const count = COTTAGE_VIEWS.length;
  const current = COTTAGE_VIEWS[view];
  // the 360° player stays mounted on the nearest 360° slide before this one while a photo shows over it
  const tour = COTTAGE_VIEWS.slice(0, view + 1).findLast((s) => s.tour)?.tour ?? COTTAGE_VIEWS[0].tour!;
  const prev = () => setView((view - 1 + count) % count);
  const next = () => setView((view + 1) % count);
  const control =
    `z-10 grid size-[40px] place-items-center rounded-full text-paper transition-colors duration-300 hover:bg-white/20 ${glass("dark")}`;

  return (
    <section id="cottages" data-nav="light" data-snap="" className={`bg-paper-deep ${screen}`}>
      <div
        className={`${container} grid gap-y-s21 lg:grid-cols-[1.618fr_1fr] lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-s89 lg:gap-y-0 lg:[grid-template-areas:'frame_.'_'frame_header'_'frame_details'_'frame_.']`}
      >
        <SectionHeader
          className="lg:[grid-area:header]"
          title="The cottages"
          lead={`Four cottages named for Krishna’s story: ${names}.`}
          leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
        />

        <div className="relative min-w-0 lg:[grid-area:frame]">
          {current.photo ? (
            <div role="group" aria-label={current.title} className="absolute inset-x-0 top-0 z-20 h-[max(280px,calc(100svh-438px))] overflow-hidden rounded-card bg-card ring-1 ring-line sm:h-[clamp(350px,36svh,460px)] lg:h-[clamp(360px,calc(100svh-280px),580px)]">
              <Image src={current.photo} alt={current.title} fill sizes="(min-width: 1024px) 55vw, 100vw" placeholder="blur" className="object-cover" />
              <span className={`absolute bottom-s13 left-s13 rounded-full px-s13 py-[6px] text-[13px] font-medium text-paper ${glass("dark")}`}>
                <GlassFill />
                {`${current.name} · ${view + 1} of ${count}`}
              </span>
              <button type="button" onClick={prev} aria-label="Previous cottage view" className={`absolute top-1/2 left-s13 -translate-y-1/2 ${control}`}>
                <GlassFill />
                <IconChevronLeft size={20} />
              </button>
              <button type="button" onClick={next} aria-label="Next cottage view" className={`absolute top-1/2 right-s13 -translate-y-1/2 ${control}`}>
                <GlassFill />
                <IconChevronRight size={20} />
              </button>
            </div>
          ) : null}
          <TourViewer
            tour={tour}
            title={current.tour ? current.title : "360° view of the cottages"}
            caption={`${current.name} · ${view + 1} of ${count}`}
            tone="light"
            onPrev={prev}
            onNext={next}
            prevLabel="Previous cottage view"
            nextLabel="Next cottage view"
            className="h-[max(280px,calc(100svh-438px))] sm:h-[clamp(350px,36svh,460px)] lg:h-[clamp(360px,calc(100svh-280px),580px)]"
          />
          <TourLink tour={tour} tone="light" className="mt-s13 max-sm:hidden short:hidden" />
        </div>

        <div className="lg:mt-s34 lg:[grid-area:details]">
          <p className="flex flex-wrap items-center gap-x-s13 gap-y-[4px] text-forest">
            <Pillows {...COTTAGE_PILLOWS} className="text-farm" />
            <span>
              <span className="font-medium">Sleeps 4</span>
              <span className="text-ink-muted max-sm:hidden"> in Mayura and Mathura, 3 in Gopala and Govinda</span>
            </span>
          </p>
          <ul className="mt-s13 grid grid-cols-2 gap-x-s21 gap-y-[6px] text-[14px] leading-[1.4] sm:max-w-[30em] sm:text-[15px]">
            {FACTS.map((f) => (
              <li key={f} className="flex items-start gap-s8">
                <IconCheck size={18} className="mt-[1px] shrink-0 text-farm" />
                {f}
              </li>
            ))}
          </ul>
          {/* phones lean on the floating "Book a stay" button instead, so the 360° view can be taller */}
          <div className="mt-s21 flex flex-wrap items-center gap-x-s21 gap-y-s8 max-sm:hidden lg:mt-s34 short:hidden">
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
