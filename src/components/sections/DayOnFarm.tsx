import Image, { type StaticImageData } from "next/image";
import cowCuddling from "../../../assets/images/slider/slider-1.webp";
import harvest from "../../../assets/images/unlock-section/1.webp";
import vegBeds from "../../../assets/images/unlock-section/2.webp";
import bonfire from "../../../assets/images/slider/slider-9.webp";
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

// The card surfaces follow the light through the day: soft gold dawn, clear
// morning, warm midday, forest dusk.
const MOMENTS: Moment[] = [
  {
    time: "Dawn",
    title: "Walk and cuddle",
    body: "Take a nature walk on the red earth. Spend time with the cows at Gau Seva and feel the day begin.",
    activities: ["Nature walks", "Gau Seva cow cuddling"],
    icon: IconDawn,
    image: cowCuddling,
    alt: "A guest hugging a gentle brown cow at the Gau Seva shed",
    surface: "bg-paper-deep",
  },
  {
    time: "Morning",
    title: "Pick and harvest",
    body: "Join the agri-tours through the orchards. Pick fruit and pull vegetables straight from the living field.",
    activities: ["Agri-tours", "Fruit picking", "Harvesting"],
    icon: IconMorning,
    image: harvest,
    alt: "A hand holding a freshly picked green pumpkin against leafy vines",
    surface: "bg-card",
  },
  {
    time: "Midday",
    title: "Eat and swim",
    body: "Sit down to a farm-to-table meal made from what the land gave that morning. Then cool off in the pool.",
    activities: ["Farm-to-table dining", "Pool"],
    icon: IconMidday,
    image: vegBeds,
    alt: "Raised vegetable beds edged with terracotta tiles, full of leafy greens",
    surface: "bg-paper-deep",
  },
  {
    time: "Dusk",
    title: "Play and burn",
    body: "Play lagori and gilli-danda or hopscotch in the fading light. End the day around a bonfire.",
    activities: ["Lagori", "Gilli-danda", "Hopscotch", "Bonfire"],
    icon: IconDusk,
    image: bonfire,
    alt: "A family gathered around an evening bonfire on the farm patio",
    surface: "bg-forest",
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
          <SectionHeader title="A day on the farm runs long" titleClassName="!text-[clamp(28px,3.4vw,45px)]" />
        </div>
      }
    >
      {MOMENTS.map((m) => (
        <div key={m.time} className={`${container} h-full`}>
          <article
            className={`relative grid h-full grid-rows-[minmax(0,2fr)_auto] overflow-hidden rounded-card shadow-card md:grid-cols-[1.618fr_1fr] md:grid-rows-1 ${m.surface} ${m.dark ? "on-dark text-paper" : "text-ink"}`}
          >
            <div className="relative min-h-0">
              <Image src={m.image} alt={m.alt} fill sizes="(min-width: 768px) 60vw, 100vw" placeholder="blur" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center p-s21 sm:p-s34 lg:p-s55">
              <p className={`flex items-center gap-s8 text-[15px] ${m.dark ? "text-gold" : "text-ink-muted"}`}>
                <m.icon size={20} />
                {m.time}
              </p>
              <h3 className={`mt-s13 font-display text-[clamp(26px,3.2vw,45px)] leading-[1.08] tracking-[-0.015em] ${m.dark ? "text-paper" : "text-forest"}`}>
                {m.title}
              </h3>
              <p className={`mt-s13 text-[15px] sm:text-body ${m.dark ? "text-paper/85" : "text-ink-muted"}`}>{m.body}</p>
              <p className={`mt-s21 border-t pt-s13 text-[14px] ${m.dark ? "border-paper/15 text-paper/75" : "border-line text-ink-muted"}`}>
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
