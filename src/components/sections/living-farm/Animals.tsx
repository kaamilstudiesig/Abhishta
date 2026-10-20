"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import firepit from "@public/images/client-photos/about-firepit.jpg";
import { ExpandingPanels, type Panel } from "@/components/bits/ExpandingPanels";
import { TourViewer } from "@/components/TourViewer";
import { IconCampfire, IconGames, IconGoat, IconHen, IconTractor } from "@/components/icons";
import { SectionHeader, container, screen } from "@/components/ui";
import { GOAT_BREEDS, GOAT_VIEW, YARD_VIEW } from "./farm";

/** Where there's no photo yet: the panel's icon, large, on a quiet field. TODO(client): photos of these. */
function Drawn({ icon: Icon }: { icon: ComponentType<{ size?: number; className?: string }> }) {
  return (
    <div aria-hidden="true" className="grid h-full place-items-center rounded-[calc(var(--radius-card)-8px)] bg-paper/[0.05]">
      <Icon size={112} className="text-gold/80 [stroke-width:1]" />
    </div>
  );
}

const PANELS: Panel[] = [
  {
    id: "goats",
    title: "Feed the goats and sheep",
    icon: IconGoat,
    media: <TourViewer tour={GOAT_VIEW} title="360° view inside the goat and sheep shelter" caption="Goat and sheep shelter" tone="dark" className="h-full" />,
    body: (
      <p>
        They eat from your hand. {GOAT_BREEDS.slice(0, -1).join(", ")} and {GOAT_BREEDS.at(-1)} goats share the shelter
        with Bannur sheep.
      </p>
    ),
  },
  {
    id: "birds",
    title: "Chickens, ducks and rabbits",
    icon: IconHen,
    media: <TourViewer tour={YARD_VIEW} title="360° view of the yard by the chicken coop" caption="The chicken yard" tone="dark" className="h-full" />,
    body: (
      <p>
        Hens wander the yard by the coop, white ducks keep to the duck canopy (turn the view to find them), and the
        rabbit hutch is by the Nandagokula rooms.
      </p>
    ),
  },
  {
    id: "tractor",
    title: "Take a tractor ride",
    icon: IconTractor,
    media: <Drawn icon={IconTractor} />,
    body: <p>See village life from the trailer as the fields go by. Tractor rides cost a little extra.</p>,
  },
  {
    id: "games",
    title: "Play the old games",
    icon: IconGames,
    media: <Drawn icon={IconGames} />,
    body: <p>Lagori, gilli-danda, hopscotch and aluguli mane: easy to learn, hard to stop.</p>,
  },
  {
    id: "bonfire",
    title: "Gather by the bonfire",
    icon: IconCampfire,
    media: (
      <div className="relative h-full overflow-hidden rounded-[calc(var(--radius-card)-8px)]">
        <Image
          src={firepit}
          alt="The bonfire circle: a patterned tile floor ringed by tiered seating under the trees"
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          placeholder="blur"
          className="object-cover"
        />
      </div>
    ),
    body: <p>Evenings end around the fire in the amphitheatre, with stories and the stars overhead.</p>,
  },
];

/**
 * #animals — the animals you can feed and the old pleasures of a farm evening,
 * as expanding panels on the forest band (pills on phones). The open panel
 * shows its 360° view or photo; only one 360° view runs at a time.
 */
export function Animals() {
  return (
    <section id="animals" data-nav="dark" data-snap="" className={`on-dark overflow-hidden bg-forest text-paper ${screen}`}>
      <div className={`${container} flex flex-col`}>
        <SectionHeader
          tone="dark"
          title="Animals, rides and old games"
          className="md:max-w-[46em]"
          lead="Cows, goats, sheep and hens to meet and feed, a tractor ride round the village, and the evening by the fire."
          leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
        />
        <ExpandingPanels
          panels={PANELS}
          label="Things to do with the animals and on a farm evening"
          className="mt-s21 h-[clamp(380px,calc(100svh-372px),560px)] sm:mt-s34 sm:h-[clamp(420px,calc(100svh-480px),600px)] lg:h-[clamp(300px,calc(100svh-420px),560px)] squat:mt-s21"
        />
      </div>
    </section>
  );
}
