import Image, { type StaticImageData } from "next/image";
import cottage from "@public/images/client-photos/stay-cottage-1.jpg";
import dorm from "@public/images/client-photos/stay-dorm-1.jpg";
import { IconArrow } from "@/components/icons";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";

type Stay = {
  name: string;
  capacity: string;
  body: string;
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
    href: "/our-nests#cottages",
    linkLabel: "See the cottages",
    image: cottage,
    alt: "Inside a cottage: a made-up double bed with green cushions under a tiled roof, a carved wooden door and glass doors opening onto the garden",
  },
  {
    name: "Family rooms",
    capacity: "5 to 10 guests a room",
    body: "Gopika, Nandagokula and Kaustubha: shared rooms for families and groups, every meal included.",
    href: "/our-nests#dormitories",
    linkLabel: "See the family rooms",
    image: dorm,
    alt: "A family room with rows of made-up beds under a high tiled roof, its door open onto the lawn",
  },
];

/**
 * Stays — "Rest your head where the fields begin". One heading, then two
 * quiet editorial columns — the cottages and the family rooms: a
 * photograph, the name, who it sleeps, one line, one link to Our Nests —
 * then one "Explore" button to the whole page. On lg+ the heading takes one line.
 */
export function Stays() {
  return (
    <section id="stays" data-nav="light" data-snap="" className={`bg-paper ${screen}`}>
      <div className={container}>
        <SectionHeader title="Stay with us on the farm" className="mx-auto text-center lg:max-w-none [&>span]:mx-auto" />

        {/* phones: a swipeable row with the next stay peeking in; md+: two columns */}
        <ul className="-mx-s21 mt-s34 flex snap-x snap-mandatory gap-s13 overflow-x-auto scroll-px-s21 px-s21 pb-s8 [scrollbar-width:none] md:mx-0 md:mt-s55 squat:mt-s34 md:grid md:grid-cols-2 md:gap-s34 md:overflow-visible md:px-0 md:pb-0 lg:gap-s89 [&::-webkit-scrollbar]:hidden">
          {STAYS.map((stay) => (
            <li key={stay.name} className="group w-[84%] shrink-0 snap-start md:w-auto">
              <a href={stay.href} className="block">
                <div className="relative h-[27svh] min-h-[160px] overflow-hidden rounded-card short:h-[22svh] md:h-[32svh] squat:h-[max(18svh,calc(100svh-620px))] squat:min-h-[120px]">
                  <Image
                    src={stay.image}
                    alt={stay.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    placeholder="blur"
                    className="object-cover transition-transform duration-1000 ease-[var(--ease-earth)] group-hover:scale-[1.02]"
                  />
                </div>
                <div className="mt-s21 flex flex-col gap-[2px] sm:flex-row sm:items-baseline sm:justify-between sm:gap-s21">
                  <h3 className="font-display text-[clamp(24px,2.4vw,28px)] leading-[1.15] text-forest">{stay.name}</h3>
                  <p className="shrink-0 text-[13px] text-ink-muted">{stay.capacity}</p>
                </div>
                <p className="mt-s8 max-w-[30em] text-[15px] leading-[1.6] text-ink-muted sm:text-body">{stay.body}</p>
                <span className="link-gold mt-s13 inline-block text-[15px] font-medium text-forest">
                  {stay.linkLabel}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-s21 flex justify-center md:mt-s34 squat:mt-s21">
          <a href="/our-nests" className={buttonClass("primary")}>
            Explore
            <IconArrow size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
