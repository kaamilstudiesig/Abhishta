"use client";

import { useRef, type ComponentType, type RefObject } from "react";
import { AnimatedBeam } from "@/components/bits/AnimatedBeam";
import { IconBasket, IconCompost, IconCow, IconDining, IconLeaf, IconMilk, IconOrchard, IconPot, IconSprout } from "@/components/icons";
import { SectionHeader, container, screen } from "@/components/ui";

type IconType = ComponentType<{ size?: number; className?: string }>;

const PILLARS: { icon: IconType; title: string; line: string }[] = [
  { icon: IconLeaf, title: "Naturally grown", line: "Grown with sun, water and good soil." },
  { icon: IconCompost, title: "Organic practices", line: "Organic fertiliser and compost feed the land." },
  { icon: IconMilk, title: "Farm-fresh dairy", line: "Milk from the farm’s own cows." },
  { icon: IconDining, title: "Wholesome meals", line: "Simple, home-style food." },
  { icon: IconBasket, title: "Harvest to plate", line: "Learn how it’s grown, then taste it at the table." },
];

function Node({ nodeRef, icon: Icon, label, large = false }: { nodeRef: RefObject<HTMLDivElement | null>; icon: IconType; label: string; large?: boolean }) {
  return (
    <div className="relative z-10 flex flex-col items-center gap-[6px]">
      <div
        ref={nodeRef}
        className={`grid place-items-center rounded-full bg-forest ring-1 ring-paper/25 ${large ? "size-[64px] sm:size-[76px]" : "size-[48px] sm:size-[58px]"}`}
      >
        <Icon size={large ? 30 : 24} className="text-gold" />
      </div>
      <span className="text-center text-[13px] leading-[1.2] text-paper/80 sm:text-[14px]">{label}</span>
    </div>
  );
}

/**
 * #soil-to-table — on the forest band: where a meal comes from, drawn as light
 * travelling from the vegetable rows, the orchard and the gaushaale into the
 * kitchen and on to your plate (AnimatedBeam), then the farm's five pillars.
 * The sitemap's "Soil to table" and "five pillars" share this one screen.
 */
export function SoilToTable() {
  const diagram = useRef<HTMLDivElement>(null);
  const rows = useRef<HTMLDivElement>(null);
  const orchard = useRef<HTMLDivElement>(null);
  const cows = useRef<HTMLDivElement>(null);
  const kitchen = useRef<HTMLDivElement>(null);
  const plate = useRef<HTMLDivElement>(null);

  return (
    <section id="soil-to-table" data-nav="dark" data-snap="" className={`on-dark bg-forest text-paper ${screen}`}>
      <div className={`${container} grid gap-s21 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-x-s89 lg:gap-y-s55 squat:gap-y-s34`}>
        <SectionHeader
          tone="dark"
          title="Farm to table"
          lead="Our vegetables, fruit and milk come from the farm, so the food on your plate is fresh and simple."
          leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
        />

        {/* the journey: three sources, the kitchen, your plate */}
        <div
          ref={diagram}
          role="img"
          aria-label="The vegetable rows, the orchard and the gaushaale feed the kitchen, and the kitchen feeds your plate."
          className="relative grid h-[clamp(190px,30svh,300px)] grid-cols-3 items-center text-paper"
        >
          <div className="flex h-full flex-col justify-between">
            <Node nodeRef={rows} icon={IconSprout} label="Vegetable rows" />
            <Node nodeRef={orchard} icon={IconOrchard} label="Orchard" />
            <Node nodeRef={cows} icon={IconCow} label="Gaushaale" />
          </div>
          <div className="flex justify-center">
            <Node nodeRef={kitchen} icon={IconPot} label="The kitchen" large />
          </div>
          <div className="flex justify-center">
            <Node nodeRef={plate} icon={IconDining} label="Your plate" large />
          </div>
          <AnimatedBeam containerRef={diagram} fromRef={rows} toRef={kitchen} delay={0} />
          <AnimatedBeam containerRef={diagram} fromRef={orchard} toRef={kitchen} delay={0.6} />
          <AnimatedBeam containerRef={diagram} fromRef={cows} toRef={kitchen} delay={1.2} />
          <AnimatedBeam containerRef={diagram} fromRef={kitchen} toRef={plate} delay={1.9} duration={2.6} />
        </div>

        {/* the five pillars; phones: a swipe row */}
        <ul
          aria-label="How the farm grows and cooks"
          className="-mx-s21 flex snap-x snap-mandatory gap-s13 overflow-x-auto scroll-px-s21 px-s21 [scrollbar-width:none] sm:-mx-s34 sm:scroll-px-s34 sm:px-s34 lg:col-span-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-s21 lg:overflow-visible lg:border-t lg:border-paper/15 lg:px-0 lg:pt-s34 squat:pt-s21 [&::-webkit-scrollbar]:hidden"
        >
          {PILLARS.map(({ icon: Icon, title, line }) => (
            <li key={title} className="w-[62%] max-w-[240px] shrink-0 snap-start rounded-card bg-paper/[0.06] p-s13 sm:w-[40%] lg:w-auto lg:max-w-none lg:rounded-none lg:bg-transparent lg:p-0">
              <Icon size={24} className="text-gold" />
              <h3 className="mt-s8 font-display text-[19px] leading-[1.2] text-paper lg:text-[clamp(18px,1.5vw,21px)]">{title}</h3>
              <p className="mt-[4px] text-[14px] leading-[1.45] text-paper/75 lg:text-[15px]">{line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
