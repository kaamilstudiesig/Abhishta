import Image, { type StaticImageData } from "next/image";
import farmhouse from "../../../assets/images/section-2/image-2.jpg";
import orchardPath from "../../../assets/images/slider/slider-6.jpg";
import { IconGuests, IconSitOut } from "@/components/icons";
import { SectionHeader, container, sectionPad } from "@/components/ui";

type Stay = {
  name: string;
  capacity: string;
  body: string;
  detail: string;
  href: string;
  linkLabel: string;
  image: StaticImageData;
  alt: string;
};

const STAYS: Stay[] = [
  {
    name: "Cozy cottages",
    capacity: "Up to 4 guests",
    body: "Built from simple, natural materials, each cottage opens onto a private sit-out facing the open land.",
    detail: "Private sit-outs",
    href: "/our-nests#cottages",
    linkLabel: "See the cottages",
    image: farmhouse,
    alt: "The Abhishta farmhouse with its tiled roof and veranda, seen from above among palms",
  },
  {
    name: "Group dormitories",
    capacity: "5–10 guests",
    body: "Simple, clean dorms for friends, families and school groups who travel together and sleep easy.",
    detail: "Three dorms on the farm",
    href: "/our-nests#dormitories",
    linkLabel: "See the dormitories",
    image: orchardPath,
    alt: "A red-earth path through mango trees leading to the dormitory building",
  },
];

/** Stays — deliberately quiet: two clean cards, capacity badges, a link to Our Nests. */
export function Stays() {
  return (
    <section id="stays" data-nav="light" className={`bg-paper-deep ${sectionPad}`}>
      <div className={container}>
        <SectionHeader
          eyebrow="Stay"
          title="Rest your head where the fields begin"
          lead="The farm holds two kinds of rest: one for the small group and one for the larger. Both are simple and clean."
        />
        <ul className="mt-s55 grid gap-s21 md:grid-cols-[1.618fr_1fr] md:gap-s34">
          {STAYS.map((stay) => (
            <li key={stay.name} className="group flex flex-col overflow-hidden rounded-card bg-card shadow-card">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={stay.image}
                  alt={stay.alt}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  placeholder="blur"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-earth)] group-hover:scale-[1.03]"
                />
                <span className="absolute top-s21 left-s21 inline-flex items-center gap-s8 rounded-full bg-gold-soft py-[5px] pr-s13 pl-s8 text-[13px] font-bold text-forest">
                  <IconGuests size={18} />
                  {stay.capacity}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-s21 sm:p-s34">
                <h3 className="font-display text-[clamp(22px,2.4vw,28px)] leading-[1.15] text-forest">{stay.name}</h3>
                <p className="mt-s8 max-w-[32em] text-ink-muted">{stay.body}</p>
                <p className="mt-s13 inline-flex items-center gap-s8 text-[15px] text-ink">
                  <IconSitOut size={20} className="text-farm" />
                  {stay.detail}
                </p>
                <a href={stay.href} className="link-gold mt-s21 w-fit pt-s8 text-[15px] font-medium text-forest">
                  {stay.linkLabel}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
