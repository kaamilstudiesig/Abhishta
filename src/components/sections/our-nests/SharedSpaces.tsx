import type { ComponentType } from "react";
import Image, { type StaticImageData } from "next/image";
import dining from "@public/images/client-photos/group-corporate.jpg";
import campfire from "@public/images/client-photos/about-firepit.jpg";
import { FlowingMenu, type FlowingMenuItem } from "@/components/bits/FlowingMenu";
import { IconArrow, IconBath, IconGames, IconKoi, IconPool } from "@/components/icons";
import { SectionHeader, container, screen } from "@/components/ui";
import { tourUrl } from "@/lib/tour";

const photoChip = (src: StaticImageData) => (
  <span className="relative block h-[clamp(40px,4.4vw,54px)] aspect-[2.2/1] overflow-hidden rounded-full">
    <Image src={src} alt="" fill sizes="120px" className="object-cover" />
  </span>
);
const iconChip = (Icon: ComponentType<{ size?: number; className?: string }>) => (
  <span className="grid size-[clamp(40px,4.4vw,54px)] place-items-center rounded-full bg-gold text-forest">
    <Icon size={26} />
  </span>
);

const SPACES: FlowingMenuItem[] = [
  { label: "Swimming pool", detail: "Open 6:30 am to 6 pm", href: tourUrl("SwimmingPoolBliss"), chip: iconChip(IconPool) },
  { label: "Dining hall", detail: "Vegetarian, farm-fresh meals", href: tourUrl("Abhishta_03"), chip: photoChip(dining) },
  { label: "Traditional bath", detail: "Hande ole snana, a wood-fired copper pot", href: tourUrl("Abhishta_15"), chip: iconChip(IconBath) },
  { label: "Games and sports", detail: "Cricket, volleyball, carrom, lagori", href: tourUrl("Abhishta_10"), chip: iconChip(IconGames) },
  { label: "Amphitheatre and campfire", detail: "Bonfire and barbecue evenings", href: tourUrl("Amphitheatre"), chip: photoChip(campfire) },
  { label: "Koi pond", detail: "A slow minute by the water", href: tourUrl("Abhishta_11"), chip: iconChip(IconKoi) },
];

function FarmLink({ className = "", brief = false }: { className?: string; brief?: boolean }) {
  return (
    <p className={`text-ink-muted ${className}`}>
      <span className="font-medium text-forest">And the farm itself:</span>{" "}
      {brief ? "cows, goats, ducks and rabbits." : "cows at the gaushaale, goats and sheep, ducks and rabbits."}{" "}
      <a href="/the-living-farm" className="link-gold inline-flex items-center gap-[6px] font-medium text-forest">
        Meet the living farm
        <IconArrow size={16} />
      </a>
    </p>
  );
}

/**
 * Beyond your door — one screen: the six shared spaces as a FlowingMenu. Each
 * row opens that spot in the 360° tour (new tab); hovering one carries its
 * detail past in a forest band, with a photo where the client has one.
 */
export function SharedSpaces() {
  return (
    <section id="shared-spaces" data-nav="light" data-snap="" className={`bg-paper-deep ${screen}`}>
      <div className={`${container} grid gap-s13 sm:gap-s21 lg:grid-cols-[1fr_1.618fr] lg:items-center lg:gap-s89`}>
        <div>
          <SectionHeader
            title="Beyond your door"
            lead="The spaces every guest shares. Each one opens in the 360° tour."
            leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
          />
          <FarmLink className="mt-s34 hidden max-w-[26em] lg:block" />
        </div>
        <FlowingMenu items={SPACES} label="Shared spaces in the 360° tour" />
        <FarmLink brief className="text-[15px] leading-[1.5] lg:hidden" />
      </div>
    </section>
  );
}
