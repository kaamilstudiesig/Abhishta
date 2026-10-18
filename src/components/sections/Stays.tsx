import Image, { type StaticImageData } from "next/image";
import farmhouse from "../../../assets/images/section-2/image-2.jpg";
import orchardPath from "../../../assets/images/slider/slider-6.jpg";
import { SectionHeader, container, screen } from "@/components/ui";

type Stay = {
  name: string;
  capacity: string;
  body: string;
  href: string;
  linkLabel: string;
  image: StaticImageData;
  alt: string;
};

const STAYS: Stay[] = [
  {
    name: "Cozy cottages",
    capacity: "Up to 4 guests",
    body: "Snug, nesty cottages for couples and small families, each opening onto the open land.",
    href: "/our-nests#cottages",
    linkLabel: "See the cottages",
    image: farmhouse,
    alt: "The Abhishta farmhouse with its tiled roof and veranda, seen from above among palms",
  },
  {
    name: "Group dormitories",
    capacity: "5 to 10 guests",
    body: "Simple, clean dorms for friends, families and school groups who travel together.",
    href: "/our-nests#dormitories",
    linkLabel: "See the dormitories",
    image: orchardPath,
    alt: "A red-earth path through mango trees leading to the dormitory building",
  },
];

/**
 * Stays — "Rest your head where the fields begin". One heading, then two
 * quiet editorial columns: a photograph, the name, who it sleeps, one line, one link.
 */
export function Stays() {
  return (
    <section id="stays" data-nav="light" data-snap="" className={`bg-paper ${screen}`}>
      <div className={container}>
        <SectionHeader title="Rest your head where the fields begin" className="mx-auto text-center [&>span]:mx-auto" />

        {/* phones: a swipeable row with the next stay peeking in; md+: two columns */}
        <ul className="-mx-s21 mt-s34 flex snap-x snap-mandatory gap-s13 overflow-x-auto scroll-px-s21 px-s21 pb-s8 [scrollbar-width:none] md:mx-0 md:mt-s55 md:grid md:grid-cols-2 md:gap-s34 md:overflow-visible md:px-0 md:pb-0 lg:gap-s89 [&::-webkit-scrollbar]:hidden">
          {STAYS.map((stay) => (
            <li key={stay.name} className="group w-[84%] shrink-0 snap-start md:w-auto">
              <a href={stay.href} className="block">
                <div className="relative h-[30svh] min-h-[180px] overflow-hidden rounded-card md:h-[32svh]">
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
      </div>
    </section>
  );
}
