"use client";

import { IconArrow } from "@/components/icons";
import { SectionHeader, container, screen } from "@/components/ui";
import { Pillows } from "./RoomParts";
import { COTTAGE_PILLOWS, FAMILY_ROOMS, selectRoom, type Pillows as PillowCount } from "./rooms";

type Option = { name: string; suits: string; sleeps: string; pillows: PillowCount; href: string; room: string };

const OPTIONS: Option[] = [
  {
    name: "Cottage",
    suits: "For couples and small families.",
    sleeps: "Sleeps 3 or 4",
    pillows: COTTAGE_PILLOWS,
    href: "#cottages",
    room: "cottage",
  },
  ...FAMILY_ROOMS.map((r) => ({
    name: r.name,
    suits: r.suits,
    sleeps: `Sleeps ${r.sleeps}`,
    pillows: r.pillows,
    href: "#dormitories",
    room: r.id,
  })),
];

/**
 * "Choose your nest" — the four ways to stay, one line each, with how many
 * each sleeps drawn as pillows. Each option jumps to its room below and opens
 * its tab there. Phones: a swipe row with the next option peeking in.
 */
export function ChooseNest() {
  return (
    <section id="choose-your-nest" data-nav="light" data-snap="" className={`bg-paper ${screen}`}>
      <div className={container}>
        <SectionHeader
          title="Choose your nest"
          lead="An air-conditioned cottage of your own, or a family room for a bigger group."
          leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
        />

        <ul className="-mx-s21 mt-s34 flex snap-x snap-mandatory gap-s13 overflow-x-auto scroll-px-s21 px-s21 pb-s8 [scrollbar-width:none] sm:-mx-s34 sm:scroll-px-s34 sm:px-s34 md:mx-0 md:mt-s55 squat:mt-s34 md:grid md:grid-cols-2 md:gap-s21 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {OPTIONS.map((o) => (
            <li key={o.room} className="w-[78%] max-w-[320px] shrink-0 snap-start sm:w-[44%] md:w-auto md:max-w-none">
              <a
                href={o.href}
                onClick={() => selectRoom(o.room)}
                className="group flex h-full flex-col rounded-card bg-card p-s21 ring-1 ring-line transition-[box-shadow] duration-300 hover:ring-forest/60 sm:p-s34 lg:p-s21 xl:p-s34"
              >
                <Pillows {...o.pillows} className="min-h-[24px] text-farm" />
                <h3 className="mt-s21 font-display text-[clamp(22px,2vw,28px)] leading-[1.15] text-balance text-forest">{o.name}</h3>
                <p className="mt-s8 mb-s21 text-[15px] leading-[1.55] text-ink-muted">{o.suits}</p>
                <p className="mt-auto flex items-center justify-between gap-s13 border-t border-line pt-s13 text-[15px] font-medium text-forest">
                  {o.sleeps}
                  <IconArrow
                    size={18}
                    aria-hidden="true"
                    className="rotate-90 text-farm transition-transform duration-300 group-hover:translate-y-[3px]"
                  />
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
