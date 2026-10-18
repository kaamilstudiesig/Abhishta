"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import corporate from "@/assets/images/stock-corporate-offsite.jpg";
import school from "@/assets/images/calves-feeding.jpg";
import mangoes from "@/assets/images/mango-orchard.jpg";
import events from "@/assets/images/stock-destination-events.jpg";
import { CardSwap } from "@/components/bits/CardSwap";
import { IconArrow } from "@/components/icons";
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
 * drives a CardSwap deck on the right. The deck only moves when the visitor
 * drags it (or picks a group), never on its own.
 */
export function Groups() {
  const [active, setActive] = useState(0);

  return (
    <section id="groups" data-nav="dark" data-snap="" className={`on-dark overflow-hidden bg-forest text-paper ${screen}`}>
      <div className={`${container} grid items-center gap-s34 lg:grid-cols-[1fr_1.618fr] lg:gap-s89`}>
        <div className="min-w-0">
          <SectionHeader
            tone="dark"
            title="Bring your people to the open land"
          />
          {/* phones: a swipeable row of pills; md+: a ruled list */}
          <ul className="-mx-s21 mt-s21 flex gap-s8 overflow-x-auto px-s21 pb-[2px] [scrollbar-width:none] md:mx-0 md:mt-s55 md:grid md:gap-0 md:overflow-visible md:border-t md:border-paper/15 md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
            {GROUPS.map((g, i) => (
              <li key={g.name} className="shrink-0 md:border-b md:border-paper/15">
                <button
                  type="button"
                  aria-pressed={active === i}
                  onClick={() => setActive(i)}
                  className={`flex min-h-[44px] w-full items-center gap-s13 rounded-full border px-s21 text-left text-[15px] whitespace-nowrap transition-colors duration-300 md:rounded-none md:border-0 md:px-0 md:py-s13 md:font-display md:text-h3 ${
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

        <CardSwap
          active={active}
          onActiveChange={setActive}
          label="Group visits"
          className="mx-auto h-[min(340px,42svh)] w-full max-w-[560px] translate-y-[14px] sm:h-[440px] sm:translate-y-[26px] lg:-translate-x-s34"
        >
          {GROUPS.map((g) => (
            <article key={g.name} className="overflow-hidden rounded-card bg-card text-ink shadow-card">
              <div className="relative aspect-[16/9]">
                <Image src={g.image} alt={g.alt} fill sizes="(min-width: 1024px) 560px, 90vw" placeholder="blur" className="object-cover" />
              </div>
              <div className="px-s21 py-s13 sm:px-s34 sm:py-s21">
                <h3 className="font-display text-[clamp(22px,2.4vw,28px)] leading-[1.15] text-forest">{g.name}</h3>
                <p className="mt-s8 max-w-[30em] text-[15px] leading-[1.55] text-ink-muted">{g.body}</p>
                <a href={g.href} className="link-gold mt-s13 inline-block text-[15px] font-medium text-forest">
                  Enquire about {g.name.toLowerCase()}
                </a>
              </div>
            </article>
          ))}
        </CardSwap>
        <p className="-mt-s13 flex items-center justify-center gap-s8 text-[13px] text-paper/60 lg:col-start-2 lg:mt-0">
          <IconArrow size={14} className="rotate-180" aria-hidden="true" />
          Drag the card to see more
          <IconArrow size={14} aria-hidden="true" />
        </p>
      </div>
    </section>
  );
}
