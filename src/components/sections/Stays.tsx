import Image, { type StaticImageData } from "next/image";
import farmhouse from "../../../assets/images/section-2/image-2.jpg";
import orchardPath from "../../../assets/images/slider/slider-6.jpg";
import {
  IconDining,
  IconFire,
  IconGuests,
  IconLeaf,
  IconParking,
  IconPool,
  IconSitOut,
  IconTrail,
  IconField,
} from "@/components/icons";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";
import { BOOKING_URL } from "@/lib/site";

type Stay = {
  name: string;
  capacity: string;
  body: string;
  features: { icon: typeof IconGuests; label: string }[];
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
    features: [
      { icon: IconGuests, label: "Sleeps up to 4" },
      { icon: IconSitOut, label: "Private sit-out with field views" },
      { icon: IconLeaf, label: "Built from eco-friendly materials" },
    ],
    href: "/our-nests#cottages",
    linkLabel: "See the cottages",
    image: farmhouse,
    alt: "The Abhishta farmhouse with its tiled roof and veranda, seen from above among palms",
  },
  {
    name: "Group dormitories",
    capacity: "5–10 guests",
    body: "Simple, clean dorms for friends, families and school groups who travel together and sleep easy.",
    features: [
      { icon: IconGuests, label: "One dorm for 5, two for 10" },
      { icon: IconField, label: "School visits, camps and retreats" },
      { icon: IconSitOut, label: "Steps from the lawns and bonfire" },
    ],
    href: "/our-nests#dormitories",
    linkLabel: "See the dormitories",
    image: orchardPath,
    alt: "A red-earth path through mango trees leading to the dormitory building",
  },
];

const SHARED = [
  { icon: IconPool, label: "Swimming pool" },
  { icon: IconDining, label: "Farm-to-table meals" },
  { icon: IconFire, label: "Bonfire evenings" },
  { icon: IconTrail, label: "Nature trails" },
  { icon: IconParking, label: "Parking on site" },
];

/**
 * Stays — "Rest your head where the fields begin". A header row, two equal
 * stay cards (photo, capacity, what you get, two clear actions), and a band of
 * what every guest shares on the farm.
 */
export function Stays() {
  return (
    <section id="stays" data-nav="light" data-snap="" className={`bg-paper-deep ${screen}`}>
      <div className={container}>
        <div className="flex flex-col gap-s21 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Stay"
            title="Rest your head where the fields begin"
            lead="Two kinds of rest: one for the small group and one for the larger. Both simple, clean and close to the land."
          />
          <a href="/our-nests" className={buttonClass("secondary", "w-fit shrink-0")}>
            Explore our nests
          </a>
        </div>

        <ul className="mt-s34 grid gap-s21 lg:grid-cols-2 lg:gap-s34">
          {STAYS.map((stay) => (
            <li
              key={stay.name}
              className="group grid overflow-hidden rounded-card bg-card shadow-card sm:grid-cols-[2fr_3fr]"
            >
              <div className="relative aspect-[16/10] overflow-hidden sm:aspect-auto">
                <Image
                  src={stay.image}
                  alt={stay.alt}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 100vw"
                  placeholder="blur"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-earth)] group-hover:scale-[1.03]"
                />
                <span className="absolute top-s13 left-s13 inline-flex items-center gap-[6px] rounded-full bg-paper py-[5px] pr-s13 pl-s8 text-[13px] font-bold text-forest shadow-card">
                  <IconGuests size={17} className="text-farm" />
                  {stay.capacity}
                </span>
              </div>
              <div className="flex flex-col p-s21 lg:p-s34">
                <h3 className="font-display text-[clamp(24px,2.4vw,30px)] leading-[1.1] font-light text-forest">
                  {stay.name}
                </h3>
                <p className="mt-s8 text-[15px] leading-[1.55] text-ink-muted">{stay.body}</p>
                <ul className="mt-s13 grid gap-[6px]">
                  {stay.features.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-s8 text-[14px] text-ink">
                      <Icon size={19} className="shrink-0 text-farm" />
                      {label}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-x-s21 gap-y-s8 pt-s21">
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "min-h-[44px] px-s21")}>
                    Book this stay
                  </a>
                  <a href={stay.href} className="link-gold text-[15px] font-medium text-forest">
                    {stay.linkLabel}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-s21 flex flex-col gap-s13 rounded-card bg-card px-s21 py-s13 ring-1 ring-line lg:mt-s34 lg:flex-row lg:items-center lg:gap-s34 lg:px-s34">
          <h3 className="shrink-0 font-display text-[19px] text-forest">Shared by every guest</h3>
          <ul className="grid flex-1 grid-cols-2 gap-x-s21 gap-y-s13 sm:grid-cols-3 lg:grid-cols-5">
            {SHARED.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-s8 text-[14px] text-ink">
                <span className="grid size-[36px] shrink-0 place-items-center rounded-full bg-gold-soft text-forest">
                  <Icon size={19} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
