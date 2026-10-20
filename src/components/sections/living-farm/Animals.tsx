"use client";

import { useState, type ComponentType } from "react";
import { CardSwap } from "@/components/bits/CardSwap";
import { TourViewer } from "@/components/TourViewer";
import { Icon360, IconCampfire, IconGames, IconGoat, IconHen, IconTractor } from "@/components/icons";
import { SectionHeader, container, screen } from "@/components/ui";
import type { Tour } from "@/lib/tour";
import { GOAT_VIEW, YARD_VIEW } from "./farm";

type Item = {
  name: string;
  line: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  /** the 360° view of this; without one, the card shows its icon until there's a photo (TODO(client): tractor photo) */
  tour?: Tour;
  place?: string;
};

// 360° views first; a photo only where the tour has no view.
const ITEMS: Item[] = [
  { name: "Feed the goats and sheep", line: "Jamnapari, Boer and Thalassery goats, and Bannur sheep.", icon: IconGoat, tour: GOAT_VIEW, place: "The goat and sheep shelter" },
  { name: "Chickens, ducks and rabbits", line: "Hens in the yard, ducks by the canopy, rabbits by the rooms.", icon: IconHen, tour: YARD_VIEW, place: "The chicken yard" },
  { name: "Take a tractor ride", line: "See village life from the trailer. A little extra cost.", icon: IconTractor },
  { name: "Play the old games", line: "Lagori, gilli-danda, hopscotch and aluguli mane.", icon: IconGames, tour: { node: "Abhishta_10", pan: 95, tilt: -14 }, place: "The games corner" },
  { name: "Gather by the bonfire", line: "End the evening with stories under the stars.", icon: IconCampfire, tour: { node: "Amphitheatre", pan: 12, tilt: -5 }, place: "The campfire area" },
];

/**
 * #animals — the same pattern as the homepage's "Bring your group to the
 * farm": a list on the left drives a card deck on the right. Each card is
 * mostly its live 360° view, with one short line under it. Only the front
 * card runs a 360° view; dragging the view turns it (the deck moves with the
 * list, the view's arrows, a drag on the card's text, or ←/→).
 */
export function Animals() {
  const [active, setActive] = useState(0);
  const count = ITEMS.length;
  const go = (d: number) => setActive((active + d + count) % count);

  return (
    <section id="animals" data-nav="dark" data-snap="" className={`on-dark overflow-hidden bg-forest text-paper ${screen}`}>
      <div className={`${container} grid items-center gap-s34 lg:grid-cols-[1fr_1.618fr] md:max-lg:gap-s13 lg:gap-s89 squat:gap-y-s34`}>
        <div className="min-w-0">
          <SectionHeader tone="dark" title="Animals, rides and old games" />
          {/* phones: a swipeable row of pills; md+: a ruled list */}
          <ul className="-mx-s21 mt-s21 flex gap-s8 overflow-x-auto px-s21 pb-[2px] [scrollbar-width:none] md:mx-0 md:mt-s13 lg:mt-s55 squat:mt-s34 md:grid md:gap-0 md:overflow-visible md:border-t md:border-paper/15 md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
            {ITEMS.map((it, i) => (
              <li key={it.name} className="shrink-0 md:border-b md:border-paper/15">
                <button
                  type="button"
                  aria-pressed={active === i}
                  onClick={() => setActive(i)}
                  className={`flex min-h-[44px] w-full items-center gap-s13 rounded-full border px-s21 text-left text-[15px] whitespace-nowrap transition-colors duration-300 md:rounded-none md:border-0 md:px-0 md:py-[8px] lg:py-s13 squat:py-[6px] md:font-display md:text-[clamp(19px,1.9vw,24px)] ${
                    active === i ? "border-paper/60 bg-paper/10 text-paper md:bg-transparent" : "border-paper/20 text-paper/70 hover:text-paper"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`hidden h-[2px] bg-gold transition-[width] duration-500 ease-[var(--ease-earth)] md:block ${active === i ? "w-s21" : "w-0"}`}
                  />
                  {it.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <CardSwap
          active={active}
          onActiveChange={setActive}
          label="Animals, rides and old games"
          className="mx-auto h-[min(320px,41svh)] w-full max-w-[560px] translate-y-[14px] sm:h-[440px] sm:translate-y-[26px] md:max-lg:translate-y-0 lg:-translate-x-s34 squat:h-[400px] squat:translate-y-[13px]"
        >
          {ITEMS.map((it, i) => {
            const Icon = it.icon;
            return (
              <article key={it.name} className="overflow-hidden rounded-card bg-card text-ink shadow-card">
                <div data-no-swap="" className="relative aspect-[16/10] bg-paper-deep squat:aspect-[2/1]">
                  {it.tour && i === active ? (
                    <TourViewer
                      tour={it.tour}
                      title={`360° view: ${it.place?.toLowerCase()}`}
                      caption={it.place}
                      tone="light"
                      bleed
                      onPrev={() => go(-1)}
                      onNext={() => go(1)}
                      prevLabel="Previous"
                      nextLabel="Next"
                      className="h-full"
                    />
                  ) : (
                    <div aria-hidden="true" className="grid h-full place-items-center">
                      <Icon size={96} className="text-farm/60 [stroke-width:1]" />
                      {it.tour ? (
                        <span className="absolute bottom-s13 left-s13 inline-flex items-center gap-[6px] text-[13px] text-ink-muted">
                          <Icon360 size={16} /> 360° view
                        </span>
                      ) : null}
                    </div>
                  )}
                </div>
                <div className="px-s21 py-s13 sm:px-s34 sm:py-s21 squat:py-s13">
                  <h3 className="font-display text-[clamp(20px,2.2vw,26px)] leading-[1.15] text-forest">{it.name}</h3>
                  <p className="mt-[4px] text-[15px] leading-[1.5] text-ink-muted">{it.line}</p>
                </div>
              </article>
            );
          })}
        </CardSwap>
        <p className="-mt-s13 flex items-center justify-center gap-s8 text-[13px] text-paper/60 md:max-lg:mt-0 lg:col-start-2 lg:mt-0">
          Drag the view to look around · pick from the list for more
        </p>
      </div>
    </section>
  );
}
