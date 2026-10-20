import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import dawn from "@public/images/client-photos/day-dawn.jpg";
import { BentoTile, MagicBento } from "@/components/bits/MagicBento";
import { TourViewer } from "@/components/TourViewer";
import { IconFields, IconOrchard, IconPath, IconSprout } from "@/components/icons";
import { SectionHeader, container, screen } from "@/components/ui";
import { ORCHARD_VIEW } from "./farm";

function TileText({ icon: Icon, title, children }: { icon: ComponentType<{ size?: number; className?: string }>; title: string; children: ReactNode }) {
  return (
    <div className="max-sm:px-s13">
      {/* the tile's icon drawn large and faint in its top corner (the tile is the positioned box), until there's a photo */}
      <Icon size={132} aria-hidden="true" className="pointer-events-none absolute top-s13 right-s13 text-farm/[0.13] [stroke-width:0.75] max-md:hidden squat:hidden" />
      <Icon size={26} className="relative text-farm" />
      <h3 className="relative mt-s13 font-display text-[clamp(20px,1.8vw,26px)] leading-[1.15] text-balance text-forest">{title}</h3>
      <p className="relative mt-[6px] max-w-[32em] text-[15px] leading-[1.5] text-ink-muted">{children}</p>
    </div>
  );
}

/**
 * #work-the-land — the four hands-on things to do on the land, as a bento whose
 * rims catch the pointer's light (MagicBento): the orchard in 360° as the large
 * tile, the guided agri-tour, harvesting vegetables, and nature walks with the
 * orchard bench photo. Phones: a swipe row of the four tiles.
 */
export function WorkTheLand() {
  return (
    <section id="work-the-land" data-nav="light" data-snap="" className={`bg-paper ${screen}`}>
      <div className={container}>
        <SectionHeader
          title="Farm activities"
          lead="Pick fruit, harvest vegetables and learn about farming from the people who work here."
          leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
        />

        <MagicBento className="-mx-s21 mt-s21 flex snap-x snap-mandatory gap-s13 overflow-x-auto scroll-px-s21 px-s21 pb-s8 [scrollbar-width:none] sm:-mx-s34 sm:scroll-px-s34 sm:px-s34 md:mx-0 md:mt-s34 md:grid md:h-[clamp(420px,calc(100svh-440px),560px)] md:grid-cols-2 md:grid-rows-[1.4fr_1fr_1fr] md:overflow-visible md:px-0 md:pb-0 lg:h-[clamp(300px,calc(100svh-420px),520px)] lg:grid-cols-4 lg:grid-rows-2 [&::-webkit-scrollbar]:hidden">
          <BentoTile className="flex h-[min(400px,58svh)] w-[86%] shrink-0 snap-start flex-col p-s8 md:col-span-2 md:h-auto md:w-auto lg:col-span-2 lg:row-span-2">
            <TourViewer tour={ORCHARD_VIEW} title="360° view of the orchard path" caption="The orchard" tone="light" className="min-h-0 flex-1" />
            <div className="px-s13 pt-s13 pb-s8 sm:px-s21">
              <h3 className="flex items-center gap-s13 font-display text-[clamp(20px,1.8vw,26px)] leading-[1.15] text-forest">
                <IconOrchard size={26} className="shrink-0 text-farm" />
                Pick fruit in the orchard
              </h3>
              <p className="mt-[6px] text-[15px] leading-[1.5] text-ink-muted">Whatever is ripe that season, straight from the tree.</p>
            </div>
          </BentoTile>

          <BentoTile className="flex h-[min(400px,58svh)] w-[86%] shrink-0 snap-start flex-col justify-end p-s8 pb-s21 md:col-span-2 md:p-s21 md:h-auto md:w-auto sm:p-s34 lg:col-span-2 lg:p-s34 squat:p-s21">
            {/* phones: the tall swipe tile would be mostly empty, so it carries the fields from above in 360° */}
            <TourViewer
              tour={{ node: "BirdsEyeView01", pan: -85, tilt: -40 }}
              title="360° view of the farm's fields from above"
              caption="The fields from above"
              tone="light"
              className="mb-s13 min-h-0 flex-1 md:hidden"
            />
            <TileText icon={IconFields} title="Walk the fields on a guided agri-tour">
              Seasonal crops, the old methods, and how a farm can look after its soil. On a day outing it starts at 9:30 am.
            </TileText>
          </BentoTile>

          <BentoTile className="flex h-[min(400px,58svh)] w-[86%] shrink-0 snap-start flex-col justify-end p-s8 pb-s21 md:h-auto md:w-auto md:p-s21 sm:p-s34 lg:p-s21 xl:p-s34 squat:p-s21">
            {/* phones: the icon drawn large fills the tall tile until there's a photo of the vegetable rows (TODO(client)) */}
            <div aria-hidden="true" className="mb-s13 grid min-h-0 flex-1 place-items-center rounded-[calc(var(--radius-card)-8px)] bg-paper-deep md:hidden">
              <IconSprout size={104} className="text-farm/55 [stroke-width:1]" />
            </div>
            <TileText icon={IconSprout} title="Harvest vegetables">
              Pull them from the soil and learn how they’re grown organically.
            </TileText>
          </BentoTile>

          <BentoTile className="flex h-[min(400px,58svh)] w-[86%] shrink-0 snap-start flex-col justify-end md:h-auto md:w-auto">
            <Image
              src={dawn}
              alt="A stone bench in a quiet orchard clearing, framed by low mango branches"
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 768px) 45vw, 86vw"
              placeholder="blur"
              className="-z-10 object-cover"
            />
            <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(0_0_0/0.72),rgb(0_0_0/0.25)_70%,rgb(0_0_0/0.1))]" />
            <div className="on-dark p-s21 text-paper sm:p-s34 lg:p-s21 xl:p-s34 squat:p-s21">
              <IconPath size={26} className="text-gold" />
              <h3 className="mt-s13 font-display text-[clamp(20px,1.8vw,26px)] leading-[1.15] text-paper">Take a nature walk</h3>
              <p className="mt-[6px] text-[15px] leading-[1.5] text-paper/85">Shaded paths around the farm, with a guide or on your own.</p>
            </div>
          </BentoTile>
        </MagicBento>
      </div>
    </section>
  );
}
