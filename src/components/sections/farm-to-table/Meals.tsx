import type { ComponentType } from "react";
import Image from "next/image";
import buffet from "@public/images/client-photos/tour-dining-buffet.jpg";
import pavilionTables from "@public/images/client-photos/dining-pavilion-tables.jpg";
import { IconDawn, IconDusk, IconMidday, IconMorning } from "@/components/icons";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";
import { BOOKING_URL, DAY_OUTING_ENQUIRY } from "@/lib/site";

const MEALS: { icon: ComponentType<{ size?: number; className?: string }>; name: string }[] = [
  { icon: IconDawn, name: "Breakfast" },
  { icon: IconMidday, name: "Lunch" },
  { icon: IconMorning, name: "Evening snacks" },
  { icon: IconDusk, name: "Dinner" },
];

/** What to know about eating here, only facts already on the site. */
const NOTES: { lead: string; line: string }[] = [
  { lead: "Veg and non-veg.", line: "Cooked in separate kitchens." },
  { lead: "On a day outing.", line: "Breakfast, a vegetarian lunch and high tea." },
  { lead: "Where you eat.", line: "The dining hall, or the open dining pavilion by the garden." },
];

/**
 * #meals — what you eat on a stay or a day outing, all from facts already on
 * the site: every stay includes all four meals; vegetarian and non-vegetarian
 * food comes from separate kitchens; a day outing has breakfast, a vegetarian
 * lunch and high tea; meals are in the dining hall and the dining pavilion.
 * Beside it, two photos: the buffet counter (a still from the 360° tour) and the
 * pavilion's tables. Phones: the two photos as a short strip, dropped on short
 * phones. TODO(client): a photo of the food itself.
 */
export function Meals() {
  return (
    <section id="meals" data-nav="light" data-snap="" className={`bg-paper ${screen}`}>
      <div className={`${container} grid gap-s21 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-s89`}>
        <div>
          <SectionHeader
            title="Every meal on the farm"
            lead="Stay the night and all four meals are included, cooked with what the farm grows."
            leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
          />
          <ul className="mt-s21 grid grid-cols-2 gap-s8 sm:grid-cols-4 sm:gap-s13 lg:mt-s34 squat:mt-s21">
            {MEALS.map(({ icon: Icon, name }) => (
              <li key={name} className="flex items-center gap-s8 rounded-card bg-card p-s13 ring-1 ring-line sm:block">
                <Icon size={24} className="shrink-0 text-farm" />
                <p className="font-display text-[17px] leading-[1.2] text-forest sm:mt-s8 sm:text-[18px]">{name}</p>
              </li>
            ))}
          </ul>
          <ul className="mt-s21 grid gap-[6px] text-[15px] leading-[1.5] text-ink lg:mt-s34 squat:mt-s13">
            {NOTES.map(({ lead, line }) => (
              <li key={lead}>
                <span className="font-medium text-forest">{lead}</span> {line}
              </li>
            ))}
          </ul>
          <div className="mt-s21 flex flex-wrap gap-s13 lg:mt-s34 squat:mt-s13">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
              Book a stay
            </a>
            <a href={DAY_OUTING_ENQUIRY} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary")}>
              Plan a day outing
            </a>
          </div>
        </div>

        {/* phones and tablets: a short strip of the two photos; large screens: stacked beside the words */}
        <div className="grid h-[clamp(110px,calc(100svh-700px),220px)] grid-cols-2 gap-s8 short:hidden sm:gap-s13 lg:h-[clamp(300px,calc(100svh-300px),560px)] lg:grid-cols-1 lg:grid-rows-[1.2fr_1fr]">
          <figure className="relative overflow-hidden rounded-card">
            <Image
              src={buffet}
              alt="The buffet counter in the dining hall: a row of covered steel serving dishes on a skirted table, patterned tiled floor"
              fill
              sizes="(min-width: 1024px) 42vw, 50vw"
              placeholder="blur"
              className="object-cover object-[50%_60%]"
            />
          </figure>
          <figure className="relative overflow-hidden rounded-card">
            <Image
              src={pavilionTables}
              alt="Inside the open dining pavilion: long dark tables and chairs beside a painted village mural"
              fill
              sizes="(min-width: 1024px) 42vw, 50vw"
              placeholder="blur"
              className="object-cover object-[60%_55%]"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
