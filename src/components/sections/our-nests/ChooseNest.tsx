"use client";

import { IconArrow } from "@/components/icons";
import { SectionHeader, container } from "@/components/ui";
import { Pillows } from "./RoomParts";
import { COTTAGE_PILLOWS, NANDAGOKULA, selectRoom, type Pillows as PillowCount } from "./rooms";

type Option = { name: string; suits: string; sleeps: string; pillows: PillowCount; href: string; room: string };

const OPTIONS: Option[] = [
  {
    name: "Cottage",
    suits: "For couples and small families.",
    sleeps: "Sleeps up to 5",
    pillows: COTTAGE_PILLOWS,
    href: "#cottages",
    room: "mayura",
  },
  ...NANDAGOKULA.map((r) => ({
    name: r.name,
    suits: r.suits,
    sleeps: `Sleeps ${r.sleeps}`,
    pillows: r.pillows,
    href: "#dormitories",
    room: r.id,
  })),
];

/**
 * "Which nest is yours?" — the four ways to stay, one line each, with how many
 * each sleeps drawn as pillows. Each option jumps to its room below and opens
 * its tab there. Phones: a swipe row with the next option peeking in.
 */
export function ChooseNest() {
  return (
    <section id="choose-your-nest" data-nav="light" className="bg-paper py-s89 lg:py-s144">
      <div className={container}>
        <SectionHeader title="Which nest is yours?" lead="A cottage of your own, or a room in Nandagokula for families and groups." />

        <ul className="-mx-s21 mt-s34 flex snap-x snap-mandatory gap-s13 overflow-x-auto scroll-px-s21 px-s21 pb-s8 [scrollbar-width:none] sm:-mx-s34 sm:scroll-px-s34 sm:px-s34 md:mx-0 md:mt-s55 md:grid md:grid-cols-2 md:gap-s21 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
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
