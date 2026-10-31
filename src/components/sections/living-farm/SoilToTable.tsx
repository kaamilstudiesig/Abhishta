"use client";

import { useState, type ComponentType } from "react";
import Image, { type StaticImageData } from "next/image";
import cropRows from "@public/images/client-photos/farm-crop-rows.jpg";
import { glass } from "@/components/bits/glass";
import { GlassFill } from "@/components/bits/LiquidGlass";
import {
  IconArrow,
  IconBasket,
  IconChevronLeft,
  IconChevronRight,
  IconCompost,
  IconDining,
  IconLeaf,
  IconMilk,
  IconOrchard,
  IconPot,
  IconSprout,
} from "@/components/icons";
import { TourViewer } from "@/components/TourViewer";
import { SectionHeader, container, screen } from "@/components/ui";
import type { Tour } from "@/lib/tour";
import { COW_VIEWS, ORCHARD_VIEW } from "./farm";

type IconType = ComponentType<{ size?: number; className?: string; "aria-hidden"?: "true" }>;

const PILLARS: { icon: IconType; title: string; line: string }[] = [
  { icon: IconLeaf, title: "Naturally grown", line: "Grown with sun, water and good soil." },
  { icon: IconCompost, title: "Organic practices", line: "Organic fertiliser and compost feed the land." },
  { icon: IconMilk, title: "Farm-fresh dairy", line: "Milk from the farm’s own cows." },
  { icon: IconDining, title: "Wholesome meals", line: "Simple, home-style food." },
  { icon: IconBasket, title: "Harvest to plate", line: "Learn how it’s grown, then taste it at the table." },
];

/** The way a meal travels, each stop shown as a live 360° view or, where the tour has none, a photo. */
const STOPS: { icon: IconType; label: string; caption: string; tour?: Tour; photo?: { src: StaticImageData; alt: string } }[] = [
  {
    icon: IconSprout,
    label: "Vegetable rows",
    caption: "The vegetable rows",
    photo: { src: cropRows, alt: "The farm's crop rows seen from above, green beds between rows of young trees" },
  },
  { icon: IconOrchard, label: "Orchard", caption: "The orchard path", tour: ORCHARD_VIEW },
  { icon: IconMilk, label: "Gaushaale", caption: "Milk from the gaushaale", tour: COW_VIEWS[0].tour },
  { icon: IconPot, label: "The buffet", caption: "Lunch at the buffet", tour: { node: "Abhishta_03", pan: -150, tilt: -8 } },
  { icon: IconDining, label: "Your plate", caption: "The dining hall", tour: { node: "Abhishta_03", pan: 22, tilt: -8 } },
];

/**
 * #soil-to-table — on the forest band: where a meal comes from. A row of stops
 * (vegetable rows → orchard → gaushaale → buffet → your plate) picks what the
 * frame shows: a live 360° view where the tour has one, a photo where it
 * doesn't (the client's rule, 2026-10-31). Then the farm's five pillars.
 * The sitemap's "Soil to table" and "five pillars" share this one screen.
 */
export function SoilToTable() {
  const [active, setActive] = useState(0);
  const stop = STOPS[active];
  const count = STOPS.length;

  return (
    <section id="soil-to-table" data-nav="dark" data-snap="" className={`on-dark bg-forest text-paper ${screen}`}>
      <div className={`${container} grid gap-s21 short:gap-s13 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-x-s89 lg:gap-y-s55 squat:gap-y-s34`}>
        <div>
          <SectionHeader
            tone="dark"
            title="Farm to table"
            lead="Our vegetables, fruit and milk come from the farm, so the food on your plate is fresh and simple."
            leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
          />

          {/* the stops; phones: a swipe row */}
          <ol
            aria-label="From the soil to your plate"
            className="-mx-s21 mt-s21 flex items-center gap-[6px] overflow-x-auto px-s21 py-[2px] [scrollbar-width:none] short:mt-s13 sm:-mx-s34 sm:px-s34 lg:mx-0 lg:mt-s34 lg:flex-wrap lg:gap-y-s8 lg:overflow-visible lg:px-0 squat:mt-s21 [&::-webkit-scrollbar]:hidden"
          >
            {STOPS.map(({ icon: Icon, label }, i) => (
              <li key={label} className="flex shrink-0 items-center gap-[6px]">
                {i > 0 ? <IconArrow size={14} aria-hidden="true" className="text-paper/40" /> : null}
                <button
                  type="button"
                  aria-pressed={active === i}
                  onClick={() => setActive(i)}
                  className={`inline-flex min-h-[44px] items-center gap-[6px] rounded-full border px-s13 text-[14px] whitespace-nowrap transition-colors duration-300 sm:text-[15px] ${
                    active === i
                      ? "border-gold bg-paper text-forest"
                      : "border-paper/25 text-paper/80 hover:border-paper/60 hover:text-paper"
                  }`}
                >
                  <Icon size={18} className={active === i ? "text-farm" : "text-gold"} />
                  {label}
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* what the chosen stop looks like */}
        <div className="h-[clamp(150px,24svh,280px)] short:h-[clamp(130px,19svh,200px)] sm:h-[34svh] lg:h-[clamp(260px,40svh,440px)] squat:h-[clamp(220px,36svh,300px)]">
          {stop.tour ? (
            <TourViewer
              tour={stop.tour}
              title={`360° view: ${stop.caption.toLowerCase()}`}
              caption={`${stop.caption}, ${active + 1} of ${count}`}
              tone="dark"
              onPrev={() => setActive((active - 1 + count) % count)}
              onNext={() => setActive((active + 1) % count)}
              prevLabel="Previous stop"
              nextLabel="Next stop"
              className="size-full"
            />
          ) : stop.photo ? (
            <figure className="relative size-full overflow-hidden rounded-card ring-1 ring-paper/10">
              <Image src={stop.photo.src} alt={stop.photo.alt} fill sizes="(min-width: 1024px) 50vw, 92vw" placeholder="blur" className="object-cover" />
              <figcaption className={`absolute bottom-s13 left-s13 rounded-full px-s13 py-[6px] text-[13px] font-medium text-paper ${glass("dark")}`}>
                <GlassFill />
                <span className="relative">{`${stop.caption}, ${active + 1} of ${count}`}</span>
              </figcaption>
              <button
                type="button"
                onClick={() => setActive((active - 1 + count) % count)}
                aria-label="Previous stop"
                className={`absolute top-1/2 left-s13 grid size-[40px] -translate-y-1/2 place-items-center rounded-full text-paper transition-colors duration-300 hover:bg-white/20 ${glass("dark")}`}
              >
                <GlassFill />
                <IconChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => setActive((active + 1) % count)}
                aria-label="Next stop"
                className={`absolute top-1/2 right-s13 grid size-[40px] -translate-y-1/2 place-items-center rounded-full text-paper transition-colors duration-300 hover:bg-white/20 ${glass("dark")}`}
              >
                <GlassFill />
                <IconChevronRight size={20} />
              </button>
            </figure>
          ) : null}
        </div>

        {/* the five pillars; phones: a swipe row */}
        <ul
          aria-label="How the farm grows and cooks"
          className="-mx-s21 flex snap-x snap-mandatory gap-s13 overflow-x-auto scroll-px-s21 px-s21 [scrollbar-width:none] sm:-mx-s34 sm:scroll-px-s34 sm:px-s34 lg:col-span-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-s21 lg:overflow-visible lg:border-t lg:border-paper/15 lg:px-0 lg:pt-s34 squat:pt-s21 [&::-webkit-scrollbar]:hidden"
        >
          {PILLARS.map(({ icon: Icon, title, line }) => (
            <li key={title} className="w-[62%] max-w-[240px] shrink-0 snap-start lg:snap-align-none rounded-card bg-paper/[0.06] p-s13 sm:w-[40%] lg:w-auto lg:max-w-none lg:rounded-none lg:bg-transparent lg:p-0">
              <Icon size={24} className="text-gold" />
              <h3 className="mt-s8 font-display text-[19px] leading-[1.2] text-paper lg:text-[clamp(18px,1.5vw,21px)]">{title}</h3>
              <p className="mt-[4px] text-[14px] leading-[1.45] text-paper/75 lg:text-[15px]">{line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
