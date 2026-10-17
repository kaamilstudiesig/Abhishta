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
import { SectionHeader, buttonClass, container, sectionPad } from "@/components/ui";
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
    <section id="stays" data-nav="light" data-snap="" className={`bg-paper-deep ${sectionPad}`}>
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

        <ul className="mt-s55 grid gap-s34 md:grid-cols-2">
          {STAYS.map((stay) => (
            <li key={stay.name} className="group flex flex-col overflow-hidden rounded-card bg-card shadow-card">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={stay.image}
                  alt={stay.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  placeholder="blur"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-earth)] group-hover:scale-[1.03]"
                />
                <span className="absolute top-s21 left-s21 inline-flex items-center gap-s8 rounded-full bg-paper py-[6px] pr-s13 pl-s8 text-[13px] font-bold text-forest shadow-card">
                  <IconGuests size={18} className="text-farm" />
                  {stay.capacity}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-s21 sm:p-s34">
                <h3 className="font-display text-[clamp(28px,3vw,34px)] leading-[1.1] font-light text-forest">
                  {stay.name}
                </h3>
                <p className="mt-s13 text-ink-muted">{stay.body}</p>
                <ul className="mt-s21 grid border-t border-line">
                  {stay.features.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-s13 border-b border-line py-s13 text-[15px] text-ink">
                      <Icon size={22} className="shrink-0 text-farm" />
                      {label}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-s21 pt-s34">
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
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

        <div className="mt-s34 rounded-card bg-card p-s21 ring-1 ring-line sm:p-s34">
          <h3 className="font-display text-h3 text-forest">Shared by every guest</h3>
          <ul className="mt-s21 grid grid-cols-2 gap-x-s21 gap-y-s21 sm:grid-cols-3 lg:grid-cols-5">
            {SHARED.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-s13 text-[15px] text-ink">
                <span className="grid size-[44px] shrink-0 place-items-center rounded-full bg-gold-soft text-forest">
                  <Icon size={22} />
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
