"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import corporate from "../../../assets/images/stock/corporate-offsite.jpg";
import school from "../../../assets/images/youtube-video-thumb.jpg";
import mangoes from "../../../assets/images/slider/slider-3.jpg";
import events from "../../../assets/images/stock/destination-events.jpg";
import { CardSwap } from "@/components/bits/CardSwap";
import { SectionHeader, container, screen } from "@/components/ui";

type Group = { name: string; body: string; href: string; image: StaticImageData; alt: string };

const GROUPS: Group[] = [
  {
    name: "Corporate offsites",
    body: "Trade the boardroom for the bullock cart and let the fields do the talking.",
    href: "/group-enquiries#corporate",
    image: corporate,
    alt: "A team sharing a long, laughing meal at one table",
  },
  {
    name: "School agri-tours",
    body: "Children learn where food comes from by pulling it from the earth themselves.",
    href: "/group-enquiries#schools",
    image: school,
    alt: "A father and child feeding young calves through a bamboo fence",
  },
  {
    name: "Day outings",
    body: "A quick escape from Bangalore. Swim, eat and breathe before heading back.",
    href: "/group-enquiries#day-outings",
    image: mangoes,
    alt: "Mango trees heavy with green fruit in the orchard",
  },
  {
    name: "Destination events",
    body: "Weddings, birthdays and reunions under a sky that never feels crowded.",
    href: "/group-enquiries#events",
    image: events,
    alt: "A long celebration table laid with flowers and glassware",
  },
];

/**
 * Bring your people — forest band. A list of the four group types on the left
 * drives a CardSwap deck on the right; the deck also turns on its own.
 */
export function Groups() {
  const [active, setActive] = useState(0);
  // Once the visitor picks a group, the deck stops turning on its own.
  const [picked, setPicked] = useState(false);

  return (
    <section id="groups" data-nav="dark" data-snap="" className={`on-dark overflow-hidden bg-forest text-paper ${screen}`}>
      <div className={`${container} grid items-center gap-s55 lg:grid-cols-[1fr_1.618fr] lg:gap-s89`}>
        <div>
          <SectionHeader
            tone="dark"
            title="Bring your people to the open land"
          />
          <ul className="mt-s55 grid border-t border-paper/15">
            {GROUPS.map((g, i) => (
              <li key={g.name} className="border-b border-paper/15">
                <button
                  type="button"
                  aria-pressed={active === i}
                  onClick={() => {
                    setPicked(true);
                    setActive(i);
                  }}
                  className={`flex w-full items-center gap-s13 py-s13 text-left font-display text-h3 transition-colors duration-300 ${
                    active === i ? "text-paper" : "text-paper/60 hover:text-paper"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-[2px] bg-gold transition-[width] duration-500 ease-[var(--ease-earth)] ${active === i ? "w-s21" : "w-0"}`}
                  />
                  {g.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <CardSwap
          active={active}
          onActiveChange={setActive}
          interval={picked ? null : 7000}
          className="mx-auto h-[460px] w-full max-w-[640px] translate-y-s34 sm:h-[520px] lg:-translate-x-s34"
        >
          {GROUPS.map((g) => (
            <article key={g.name} className="overflow-hidden rounded-card bg-card text-ink shadow-card">
              <div className="relative aspect-[16/10]">
                <Image src={g.image} alt={g.alt} fill sizes="(min-width: 1024px) 560px, 90vw" placeholder="blur" className="object-cover" />
              </div>
              <div className="p-s21 sm:px-s34 sm:py-s21">
                <h3 className="font-display text-[clamp(22px,2.4vw,28px)] leading-[1.15] text-forest">{g.name}</h3>
                <p className="mt-s8 max-w-[30em] text-[15px] leading-[1.55] text-ink-muted">{g.body}</p>
                <a href={g.href} className="link-gold mt-s13 inline-block text-[15px] font-medium text-forest">
                  Enquire about {g.name.toLowerCase()}
                </a>
              </div>
            </article>
          ))}
        </CardSwap>
      </div>
    </section>
  );
}
