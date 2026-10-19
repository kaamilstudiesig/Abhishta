import type { ComponentType } from "react";
import Image, { type StaticImageData } from "next/image";
import dining from "@public/images/client-photos/group-corporate.jpg";
import campfire from "@public/images/client-photos/about-firepit.jpg";
import {
  Icon360,
  IconArrow,
  IconBath,
  IconCampfire,
  IconDining,
  IconGames,
  IconKoi,
  IconPool,
} from "@/components/icons";
import { SectionHeader, container } from "@/components/ui";
import { tourUrl } from "./rooms";

type Space = {
  name: string;
  detail: string;
  node: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  photo?: { src: StaticImageData; alt: string };
};

const SPACES: Space[] = [
  { name: "Swimming pool", detail: "Open 6:30 am to 6 pm", node: "SwimmingPoolBliss", icon: IconPool },
  {
    name: "Dining hall",
    detail: "Vegetarian, farm-fresh meals",
    node: "Abhishta_03",
    icon: IconDining,
    photo: {
      src: dining,
      alt: "The open-sided dining hall: wooden tables on patterned tiles under a timber-and-tile roof, the garden beyond",
    },
  },
  { name: "Traditional bath", detail: "Hande ole snana, a wood-fired copper-pot bath", node: "Abhishta_15", icon: IconBath },
  { name: "Games and sports", detail: "Cricket, volleyball, carrom, lagori and more", node: "Abhishta_10", icon: IconGames },
  {
    name: "Amphitheatre and campfire",
    detail: "Bonfire and barbecue evenings",
    node: "Amphitheatre",
    icon: IconCampfire,
    photo: {
      src: campfire,
      alt: "The campfire circle: a patterned tile floor facing curved, painted amphitheatre steps under the trees",
    },
  },
  { name: "Koi pond", detail: "A slow minute by the water", node: "Abhishta_11", icon: IconKoi },
];

/**
 * Beyond your door — six shared spaces as simple tiles, each opening that spot
 * in the 360° tour in a new tab. Photos where the client has them, a line icon
 * on a plain tile for the rest.
 */
export function SharedSpaces() {
  return (
    <section id="shared-spaces" data-nav="light" className="bg-paper-deep py-s89 lg:py-s144">
      <div className={container}>
        <SectionHeader title="Beyond your door" lead="The spaces every guest shares. Each one opens in the 360° tour." />

        <ul className="mt-s34 grid grid-cols-2 gap-x-s13 gap-y-s21 md:mt-s55 lg:grid-cols-3 lg:gap-x-s21 lg:gap-y-s34">
          {SPACES.map(({ name, detail, node, icon: Icon, photo }) => (
            <li key={node}>
              <a href={tourUrl(node)} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-gold-soft sm:rounded-card">
                  {photo ? (
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 400px, 50vw"
                      placeholder="blur"
                      className="object-cover transition-transform duration-1000 ease-[var(--ease-earth)] group-hover:scale-[1.03]"
                    />
                  ) : (
                    <span className="absolute inset-0 grid place-items-center text-farm">
                      <Icon size={52} className="-translate-y-[6%] transition-transform duration-700 ease-[var(--ease-earth)] group-hover:scale-[1.08]" />
                    </span>
                  )}
                  <span className="absolute right-s8 bottom-s8 inline-flex items-center gap-[6px] rounded-btn bg-paper/90 p-[6px] text-[13px] font-medium text-forest sm:right-s13 sm:bottom-s13 sm:px-s13">
                    <Icon360 size={16} className="text-farm" />
                    <span className="hidden sm:inline">360°</span>
                  </span>
                </div>
                <h3 className="mt-s13 font-display text-[clamp(18px,1.8vw,22px)] leading-[1.2] text-balance text-forest group-hover:text-farm">
                  {name}
                </h3>
                <p className="mt-[4px] text-[14px] leading-[1.5] text-ink-muted sm:text-[15px]">{detail}</p>
                <span className="sr-only">(opens the 360° tour in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-s55 flex flex-col gap-s13 border-t border-line pt-s34 sm:flex-row sm:items-baseline sm:justify-between lg:mt-s89">
          <span className="max-w-[34em] text-ink">
            <span className="font-display text-h3 text-forest">And the farm itself.</span>{" "}
            <span className="text-ink-muted">Cows at the gaushaale, goats and sheep, ducks and rabbits.</span>
          </span>
          <a href="/the-living-farm" className="link-gold inline-flex shrink-0 items-center gap-s8 font-medium text-forest">
            Meet the living farm
            <IconArrow size={18} />
          </a>
        </p>
      </div>
    </section>
  );
}
