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
    title: "Walk and cuddle",
    body: "Start the day with a nature walk. Then spend some time with the cows at the gaushaale.",
    activities: ["Nature walks", "Gau Seva cow cuddling"],
    icon: IconDawn,
    image: dawn,
    alt: "A stone bench in a quiet orchard clearing, framed by low mango branches",
    surface: "bg-[#f2ddd2]",
  },
  {
    time: "Morning",
    title: "Pick and harvest",
    body: "Join a guided farm tour. Pick fresh fruit and pull vegetables straight from the field.",
    activities: ["Agri-tours", "Fruit picking", "Harvesting"],
    icon: IconMorning,
    image: morning,
    alt: "A garden gazebo with a scalloped canopy on the lawn, beside a painted clay pot",
    surface: "bg-[#e3ebe8]",
  },
  {
    time: "Midday",
    title: "Eat and swim",
    body: "Sit down to a fresh meal made with food from the farm. Then cool off in the pool.",
    activities: ["Farm-to-table dining", "Pool"],
    icon: IconMidday,
    image: midday,
    alt: "Tables and chairs in the dining hall, behind a low wall painted with white folk figures",
    surface: "bg-[#f3e4b9]",
  },
  {
    time: "Dusk",
    title: "Play and relax",
    body: "Play lagori, gilli-danda or hopscotch in the evening. End the day around a bonfire.",
    activities: ["Lagori", "Gilli-danda", "Hopscotch", "Bonfire"],
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
            <div className="flex flex-col justify-center px-s21 pt-s13 pb-s21 sm:p-s34 lg:p-s55">
              <p className={`flex items-center gap-s8 text-[15px] ${m.dark ? "text-gold" : "text-[#4f4f44]"}`}>
                <m.icon size={20} />
                {m.time}
              </p>
              <h3 className={`mt-[6px] font-display text-[clamp(24px,3.2vw,45px)] md:mt-s13 leading-[1.08] tracking-[-0.015em] ${m.dark ? "text-paper" : "text-forest"}`}>
                {m.title}
              </h3>
              <p className={`mt-s8 text-[15px] leading-[1.55] sm:text-body md:mt-s13 ${m.dark ? "text-paper/85" : "text-[#4f4f44]"}`}>{m.body}</p>
              <p className={`mt-s21 hidden border-t pt-s13 text-[14px] md:block ${m.dark ? "border-paper/15 text-paper/75" : "border-ink/10 text-[#4f4f44]"}`}>
                {m.activities.join(", ")}
              </p>
            </div>
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-forest opacity-[var(--dim)]" />
          </article>
        </div>
      ))}
    </ScrollStack>
  );
}
