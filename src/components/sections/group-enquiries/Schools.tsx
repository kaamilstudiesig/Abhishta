import type { ComponentType } from "react";
import Image from "next/image";
import dorm from "@public/images/client-photos/stay-dorm-2.jpg";
import { IconCompost, IconFields, IconGames, IconGoat, IconPool, IconSprout } from "@/components/icons";
import { SectionHeader, container, screen } from "@/components/ui";

const LESSONS: { icon: ComponentType<{ size?: number; className?: string }>; title: string; line: string }[] = [
  { icon: IconFields, title: "Walk the crop rows", line: "A guided tour of how a farm works, season by season." },
  { icon: IconCompost, title: "Learn sustainable farming", line: "Compost, organic growing and looking after soil." },
  { icon: IconGoat, title: "Meet the animals", line: "Live sessions with the cows, goats, sheep and birds." },
  { icon: IconSprout, title: "Plant a sapling", line: "Leave something growing on the farm." },
  { icon: IconGames, title: "Play the old games", line: "Lagori and aluguli mane, cricket and volleyball, carrom." },
  { icon: IconPool, title: "Swim, then sit with the cows", line: "The pool and cow cuddling round off the day." },
];

/**
 * #schools — "The living classroom", on the sage band: what students do, who it
 * suits, and (large screens) the bachelors dormitory where a class can sleep —
 * ten single beds, the room booked whole. Phones: the lessons as a two-column
 * list and the suits line; the dorm photo gives way to keep one screen.
 */
export function Schools() {
  return (
    <section id="schools" data-nav="light" data-snap="" className={`bg-gold-soft ${screen}`}>
      <div className={`${container} grid grid-cols-[minmax(0,1fr)] gap-s21 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-s89`}>
        <div className="min-w-0">
          <SectionHeader
            title="The living classroom"
            lead="School and college groups learn where food comes from with their own hands, on a day outing or a night in the dorms."
            leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
          />
          <ul className="mt-s21 grid grid-cols-2 gap-x-s13 gap-y-s13 sm:mt-s34 sm:gap-x-s34 sm:gap-y-s21 squat:mt-s21 squat:gap-y-s13">
            {LESSONS.map(({ icon: Icon, title, line }) => (
              <li key={title} className="min-w-0">
                <Icon size={24} className="text-farm" />
                <h3 className="mt-[6px] font-display text-[17px] leading-[1.2] text-forest sm:text-[19px]">{title}</h3>
                <p className="mt-[2px] text-[14px] leading-[1.4] text-ink-muted max-sm:hidden sm:text-[15px] squat:hidden">{line}</p>
              </li>
            ))}
          </ul>
          <p className="mt-s21 text-[15px] text-ink sm:mt-s34 squat:mt-s21">
            <span className="font-medium text-forest">Made for</span> school picnics, college field trips and veterinary students.
          </p>
        </div>

        <figure className="max-lg:hidden">
          <div className="relative h-[clamp(300px,calc(100svh-330px),540px)] overflow-hidden rounded-card">
            <Image
              src={dorm}
              alt="The Nandagokula bachelors dormitory: rows of single beds with pink bases under a tiled timber roof, two doors and a mirror at the far end"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-s13 text-[15px] leading-[1.5] text-ink-muted">
            <span className="font-medium text-forest">Staying over?</span> The bachelors dormitory has ten single beds and its own
            washroom, and the room is booked whole for your group.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
