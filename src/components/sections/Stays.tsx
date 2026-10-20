import type { StaticImageData } from "next/image";
import cottage from "@public/images/client-photos/cottage-gopala-sitout.jpg";
import familyRoom from "@public/images/gallery/gopika.jpg";
import { FlipCard } from "@/components/bits/FlipCard";
import { IconArrow, IconCheck } from "@/components/icons";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";

type Stay = {
  name: string;
  capacity: string;
  body: string;
  rate: string;
  facts: string[];
  href: string;
  linkLabel: string;
  image: StaticImageData;
  alt: string;
};

// From the client's rate sheet (2026-10-20, docs/wireframes/our-nests.md): AC cottages for 3 or 4; the Gopika,
// Nandagokula and Kaustubha family rooms (non-AC, shared occupancy) for 10, 10 and 5. Every stay includes all meals.
const STAYS: Stay[] = [
  {
    name: "Cottages",
    capacity: "Up to 4 guests",
    body: "Four air-conditioned cottages for couples and small families, each with its own washroom and a sit-out.",
    rate: "₹5,000 an adult, ₹2,500 a child over 5. Under 5s stay free.",
    facts: ["Air-conditioned", "Own washroom, hot water", "A private sit-out", "All meals included"],
    href: "/our-nests#cottages",
    linkLabel: "See the cottages",
    image: cottage,
    alt: "Gopala cottage’s sit-out: two chairs and a table on a patterned tile floor, with a garden in front",
  },
  {
    name: "Family rooms",
    capacity: "5 to 10 guests a room",
    body: "Gopika, Nandagokula and Kaustubha: shared rooms for families and groups.",
    rate: "₹3,500 a person, taxes included.",
    facts: ["Sleeps 10, or 5 in Kaustubha", "Two bathrooms (one in Kaustubha)", "Fans, no AC", "All meals included"],
    href: "/our-nests#dormitories",
    linkLabel: "See the family rooms",
    image: familyRoom,
    alt: "Gopika family room: beds made up in rows under a tiled timber roof",
  },
];

/**
 * Stays — "Stay with us on the farm". Two tilting photo cards that flip
 * (FlipCard, on every screen size): the front is the photo, the name and who
 * it sleeps; tap to turn it over for the rate, what it has and a link to Our
 * Nests. Phones: a swipe row with the next card peeking in. Then one "Explore".
 */
export function Stays() {
  return (
    <section id="stays" data-nav="light" data-snap="" className={`bg-paper ${screen}`}>
      <div className={container}>
        <SectionHeader title="Stay with us on the farm" className="mx-auto text-center lg:max-w-none [&>span]:mx-auto" />

        {/* phones: a swipeable row with the next stay peeking in; md+: two columns */}
        <ul className="-mx-s21 mt-s21 flex snap-x snap-mandatory gap-s13 overflow-x-auto scroll-px-s21 px-s21 py-s8 [scrollbar-width:none] md:mx-0 md:mt-s34 md:grid md:grid-cols-2 md:gap-s34 md:overflow-visible md:px-0 lg:gap-s55 squat:mt-s21 [&::-webkit-scrollbar]:hidden">
          {STAYS.map((stay) => (
            <li key={stay.name} className="w-[86%] shrink-0 snap-start md:w-auto">
              <FlipCard
                photo={stay.image}
                alt={stay.alt}
                tag={stay.capacity}
                title={stay.name}
                label={stay.name.toLowerCase()}
                className="h-[clamp(290px,calc(100svh-410px),520px)] md:h-[clamp(300px,calc(100svh-450px),540px)] squat:h-[calc(100svh-410px)]"
                back={
                  <>
                    <p className="text-[13px] font-medium text-farm">{stay.capacity}</p>
                    <h3 className="font-display text-[clamp(22px,2.4vw,28px)] leading-[1.15] text-forest">{stay.name}</h3>
                    <p className="mt-s8 text-[15px] leading-[1.5] text-ink-muted max-sm:hidden squat:hidden">{stay.body}</p>
                    <ul className="mt-s13 grid gap-[6px] text-[15px] leading-[1.4] sm:grid-cols-2 sm:gap-x-s21">
                      {stay.facts.map((f) => (
                        <li key={f} className="flex items-start gap-s8">
                          <IconCheck size={18} className="mt-[1px] shrink-0 text-farm" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-s13 border-t border-line pt-s13 text-[15px] font-medium text-forest">{stay.rate}</p>
                    <a href={stay.href} className="link-gold mt-s13 inline-block text-[15px] font-medium text-forest">
                      {stay.linkLabel}
                    </a>
                  </>
                }
              />
            </li>
          ))}
        </ul>

        <div className="mt-s21 flex justify-center md:mt-s34 squat:mt-s13">
          <a href="/our-nests" className={buttonClass("primary")}>
            Explore
            <IconArrow size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
