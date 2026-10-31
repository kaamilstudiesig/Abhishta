"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import corporate from "@public/images/client-photos/group-corporate-team-1.jpg";
import school from "@public/images/client-photos/group-students-amphitheatre.jpg";
import outing from "@public/images/client-photos/group-outing.jpg";
import events from "@public/images/client-photos/event-lawn-party.jpg";
import { SlideCards } from "@/components/bits/SlideCards";
import { IconArrow } from "@/components/icons";
import { SectionHeader, container, screen } from "@/components/ui";

type Group = { name: string; body: string; href: string; image: StaticImageData; alt: string };

const GROUPS: Group[] = [
  {
    name: "Corporate offsites",
    body: "Take your team out of the office for games, fresh air and good food.",
    href: "/group-enquiries#corporate",
    image: corporate,
    alt: "A corporate team on the lawn stage, standing between two Kathakali dancers in full costume",
  },
  {
    name: "School agri-tours",
    body: "Children learn where food comes from by harvesting it themselves.",
    href: "/group-enquiries#schools",
    image: school,
    alt: "Students with sketchbooks sitting on the tiled tiers of the amphitheatre, a brass lamp on the stage in front",
  },
  {
    name: "Day outings",
    body: "A short trip from Bangalore. Swim, eat and relax, then head home.",
    href: "/group-enquiries#day-outings",
    image: outing,
    alt: "A shaded veranda with patterned tiles and garden chairs beside a stone path through the lawns",
  },
  {
    name: "Destination events",
    body: "Birthdays, anniversaries and family get-togethers in the open air.",
    href: "/group-enquiries#events",
    image: events,
    alt: "A sample celebration on the lawn: guests gathered by the amphitheatre under the trees, with a balloon arch and tables",
  },
];

/**
 * Bring your people — forest band. A list of the four group types on the left
 * drives a card on the right that slides to the next group (SlideCards): the
 * new card glides in as the old one drifts out, its photo settling from a
 * slight zoom. It only moves when the visitor picks, swipes or uses the arrows.
 */
export function Groups() {
  const [active, setActive] = useState(0);

  return (
    <section id="groups" data-nav="dark" data-snap="" className={`on-dark overflow-hidden bg-forest text-paper ${screen}`}>
      <div className={`${container} grid items-center gap-s34 lg:grid-cols-[1fr_1.618fr] md:max-lg:gap-s21 lg:gap-s89 squat:gap-y-s34`}>
        <div className="min-w-0">
          <SectionHeader
            tone="dark"
            title="Bring your group to the farm"
          />
          {/* phones: a swipeable row of pills; md+: a ruled list */}
          <ul className="-mx-s21 mt-s21 flex gap-s8 overflow-x-auto px-s21 pb-[2px] [scrollbar-width:none] md:mx-0 md:mt-s21 lg:mt-s55 squat:mt-s34 md:grid md:gap-0 md:overflow-visible md:border-t md:border-paper/15 md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
            {GROUPS.map((g, i) => (
              <li key={g.name} className="shrink-0 md:border-b md:border-paper/15">
                <button
                  type="button"
                  aria-pressed={active === i}
                  onClick={() => setActive(i)}
                  className={`flex min-h-[44px] w-full items-center gap-s13 rounded-full border px-s21 text-left text-[15px] whitespace-nowrap transition-colors duration-300 md:rounded-none md:border-0 md:px-0 md:py-[8px] lg:py-s13 squat:py-[8px] md:font-display md:text-h3 ${
                    active === i
                      ? "border-paper/60 bg-paper/10 text-paper md:bg-transparent"
                      : "border-paper/20 text-paper/70 hover:text-paper"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`hidden h-[2px] bg-gold transition-[width] duration-500 ease-[var(--ease-earth)] md:block ${active === i ? "w-s21" : "w-0"}`}
                  />
                  {g.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-[560px] lg:-translate-x-s34">
          <SlideCards
            active={active}
            onActiveChange={setActive}
            label="Group visits"
            className="h-[min(340px,42svh)] sm:h-[440px] squat:h-[400px]"
          >
            {GROUPS.map((g) => (
              <article key={g.name} className="flex h-full flex-col overflow-hidden rounded-card bg-card text-ink shadow-card">
                <div className="relative min-h-0 flex-1 overflow-hidden">
                  <Image
                    src={g.image}
                    alt={g.alt}
                    fill
                    sizes="(min-width: 1024px) 560px, 90vw"
                    placeholder="blur"
                    className="scale-[1.08] object-cover transition-transform duration-[1400ms] ease-[var(--ease-earth)] group-data-[active]/slide:scale-100 motion-reduce:transition-none"
                  />
                </div>
                <div className="px-s21 py-s13 sm:px-s34 sm:py-s21 squat:py-s13">
                  <h3 className="font-display text-[clamp(22px,2.4vw,28px)] leading-[1.15] text-forest">{g.name}</h3>
                  <p className="mt-s8 max-w-[30em] text-[15px] leading-[1.55] text-ink-muted">{g.body}</p>
                  <a href={g.href} className="link-gold mt-s13 inline-block text-[15px] font-medium text-forest">
                    Enquire about {g.name.toLowerCase()}
                  </a>
                </div>
              </article>
            ))}
          </SlideCards>
          <div className="mt-s13 flex items-center justify-center gap-s13 sm:mt-s21 squat:mt-s13">
            <button
              type="button"
              onClick={() => setActive((active - 1 + GROUPS.length) % GROUPS.length)}
              aria-label="Previous group"
              className="grid size-[44px] place-items-center rounded-full border-[1.5px] border-paper/30 text-paper transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-forest"
            >
              <IconArrow size={18} className="rotate-180" />
            </button>
            <p className="min-w-[4em] text-center text-[14px] text-paper/70 tabular-nums" aria-live="polite">
              {active + 1} / {GROUPS.length}
            </p>
            <button
              type="button"
              onClick={() => setActive((active + 1) % GROUPS.length)}
              aria-label="Next group"
              className="grid size-[44px] place-items-center rounded-full border-[1.5px] border-paper/30 text-paper transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-forest"
            >
              <IconArrow size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
