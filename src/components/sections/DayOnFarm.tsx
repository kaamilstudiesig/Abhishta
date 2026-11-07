import { Fragment } from "react";
import Image, { type StaticImageData } from "next/image";
import dawn from "@public/images/client-photos/day-dawn.jpg";
import morning from "@public/images/client-photos/day-morning.jpg";
import midday from "@public/images/client-photos/day-midday.jpg";
import dusk from "@public/images/client-photos/day-dusk.jpg";
import { ScrollStack } from "@/components/bits/ScrollStack";
import { IconDawn, IconDusk, IconMidday, IconMorning } from "@/components/icons";
import { SectionHeader, container } from "@/components/ui";

type Moment = {
  time: string;
  title: string;
  body: string;
  activities: string[];
  icon: typeof IconDawn;
  image: StaticImageData;
  alt: string;
  surface: string;
  dark?: boolean;
};

// The card surfaces follow the light through the day: blush dawn, clear
// pale-sky morning, sunlit noon, twilight-plum dusk.
const MOMENTS: Moment[] = [
  {
    time: "Dawn",
    title: "Walk, Connect & Unwind",
    body: "Begin your morning with a leisurely walk through the tranquil landscapes of Abhishta. As the day unfolds, spend a little time with the gentle souls of the farm through Gau Seva and the heartwarming experience of cow cuddling.",
    activities: ["Nature Walks", "Gau Seva", "Cow Cuddling"],
    icon: IconDawn,
    image: dawn,
    alt: "A stone bench in a quiet orchard clearing, framed by low mango branches",
    surface: "bg-[#f2ddd2]",
  },
  {
    time: "Morning",
    title: "Pick & Harvest",
    body: "Explore the beauty of farm life on a guided tour through Abhishta's landscapes. Experience the simple pleasure of picking fresh fruits and harvesting seasonal vegetables straight from the fields.",
    activities: ["Agri-Tours", "Fruit Picking", "Harvesting"],
    icon: IconMorning,
    image: morning,
    alt: "A garden gazebo with a scalloped canopy on the lawn, beside a painted clay pot",
    surface: "bg-[#e3ebe8]",
  },
  {
    time: "Midday",
    title: "Savour, Relax & Rejuvenate",
    body: "Enjoy wholesome, freshly prepared farm-to-table meals, featuring fresh produce from the farm. Afterwards, unwind by the pool or take a refreshing dip as you soak in the tranquillity of the countryside.",
    activities: ["Farm-to-Table Dining", "Swimming", "Leisure"],
    icon: IconMidday,
    image: midday,
    alt: "Tables and chairs in the dining hall, behind a low wall painted with white folk figures",
    surface: "bg-[#f3e4b9]",
  },
  {
    time: "Dusk",
    title: "Gather Around Good Times",
    body: "Bring out your playful side with a selection of traditional outdoor games. As twilight sets in, come together around the bonfire and enjoy an evening filled with warmth, stories, and memorable company.",
    activities: ["Outdoor Games", "Bonfire Gatherings"],
    icon: IconDusk,
    image: dusk,
    alt: "The garden gazebo on the lawn, lined with potted plants and small solar lamps",
    surface: "bg-[#3a2d39]",
    dark: true,
  },
];

/**
 * A day in the farm — four moments, dawn to dusk. One scroll brings up one
 * card, and it holds until the next scroll (ScrollStack + scroll snapping).
 */
export function DayOnFarm() {
  return (
    <ScrollStack
      id="a-day-on-the-farm"
      className="bg-paper"
      header={
        <div className={container}>
          <SectionHeader
            title="A full day on the farm"
            className="[&>span]:mb-s13 md:[&>span]:mb-s21"
            titleClassName="!text-[clamp(24px,3.4vw,45px)]"
          />
        </div>
      }
    >
      {MOMENTS.map((m) => (
        <div key={m.time} className={`${container} h-full`}>
          <article
            className={`relative grid h-full grid-rows-[minmax(0,1fr)_auto] overflow-hidden rounded-card shadow-card md:grid-cols-[1.618fr_1fr] md:grid-rows-1 ${m.surface} ${m.dark ? "on-dark text-paper" : "text-ink"}`}
          >
            <div className="relative min-h-0">
              <Image src={m.image} alt={m.alt} fill sizes="(min-width: 768px) 60vw, 100vw" placeholder="blur" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center px-s21 pt-s13 pb-s13 sm:p-s34 lg:p-s55">
              <p className={`flex items-center gap-s8 text-[15px] ${m.dark ? "text-gold" : "text-[#4f4f44]"}`}>
                <m.icon size={20} />
                {m.time}
              </p>
              <h3 className={`mt-[4px] font-display text-[clamp(21px,3.2vw,45px)] md:mt-s13 leading-[1.08] tracking-[-0.015em] ${m.dark ? "text-paper" : "text-forest"}`}>
                {m.title}
              </h3>
              <p className={`mt-[6px] text-[14px] leading-[1.45] sm:text-[15px] sm:leading-[1.55] md:mt-s13 lg:text-body ${m.dark ? "text-paper/85" : "text-[#4f4f44]"}`}>{m.body}</p>
              <p className={`mt-s8 border-t pt-s8 text-[12.5px] leading-[1.5] md:mt-s21 md:pt-s13 md:text-[14px] ${m.dark ? "border-paper/15 text-paper/75" : "border-ink/10 text-[#4f4f44]"}`}>
                {m.activities.map((a, i) => (
                  <Fragment key={a}>
                    {i > 0 ? " · " : null}
                    <span className="whitespace-nowrap">{a}</span>
                  </Fragment>
                ))}
              </p>
            </div>
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-forest opacity-[var(--dim)]" />
          </article>
        </div>
      ))}
    </ScrollStack>
  );
}
