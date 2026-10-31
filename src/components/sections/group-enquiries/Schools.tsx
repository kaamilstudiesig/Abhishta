import type { ComponentType } from "react";
import Image from "next/image";
import { FlipCard } from "@/components/bits/FlipCard";
import students from "@public/images/client-photos/group-school-team.jpg";
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
 * suits, and (large screens) a student group at the amphitheatre, with where
 * a class can sleep in the caption. Below lg: the photo as a FlipCard — tap
 * to turn it over for what students do and where they sleep.
 */
export function Schools() {
  return (
    <section id="schools" data-nav="light" data-snap="" className={`bg-gold-soft ${screen}`}>
      <div className={`${container} grid grid-cols-[minmax(0,1fr)] gap-s21 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-s89`}>
        <div className="min-w-0">
          <SectionHeader
            title="School and college visits"
            lead="Students learn where food comes from by doing it themselves, on a day trip or an overnight stay."
            leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5] short:hidden"
          />
          <ul className="mt-s21 grid grid-cols-2 gap-x-s13 gap-y-s13 max-lg:hidden sm:mt-s34 sm:gap-x-s34 sm:gap-y-s21 squat:mt-s21 squat:gap-y-s13">
            {LESSONS.map(({ icon: Icon, title, line }) => (
              <li key={title} className="min-w-0">
                <Icon size={24} className="text-farm" />
                <h3 className="mt-[6px] font-display text-[17px] leading-[1.2] text-forest sm:text-[19px]">{title}</h3>
                <p className="mt-[2px] text-[14px] leading-[1.4] text-ink-muted max-sm:hidden sm:text-[15px] squat:hidden">{line}</p>
              </li>
            ))}
          </ul>
          <p className="mt-s21 text-[15px] text-ink max-lg:hidden sm:mt-s34 squat:mt-s21">
            <span className="font-medium text-forest">Made for</span> school picnics, college field trips and veterinary students.
          </p>
        </div>

        <FlipCard
          photo={students}
          alt="A school team in matching tracksuits on the lawn with their coach, palms and a cottage roof behind"
          title="Students on the farm"
          label="what students do on the farm"
          className="h-[clamp(300px,calc(100svh-370px),620px)] w-full lg:hidden"
          back={
            <>
              <h3 className="font-display text-[22px] leading-[1.15] text-forest">What students do here</h3>
              <ul className="mt-s13 grid grid-cols-2 gap-x-s13 gap-y-s13">
                {LESSONS.map(({ icon: Icon, title }) => (
                  <li key={title} className="min-w-0">
                    <Icon size={22} className="text-farm" />
                    <p className="mt-[4px] text-[15px] leading-[1.3] font-medium text-forest">{title}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-s21 border-t border-line pt-s13 text-[14px] leading-[1.5] text-ink-muted">
                <span className="font-medium text-forest">Made for</span> school picnics, college field trips and veterinary students.
                Overnight, Nandagokula sleeps ten with two bathrooms, ₹3,500 a person with every meal.
              </p>
            </>
          }
        />

        <figure className="max-lg:hidden">
          <div className="relative h-[clamp(300px,calc(100svh-330px),540px)] overflow-hidden rounded-card">
            <Image
              src={students}
              alt="A school team in matching tracksuits on the lawn with their coach, palms and a cottage roof behind"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-s13 text-[15px] leading-[1.5] text-ink-muted">
            <span className="font-medium text-forest">Staying over?</span> Nandagokula, a family room, has single beds for ten and two
            bathrooms, at ₹3,500 a person with every meal.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
