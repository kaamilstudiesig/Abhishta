import type { ComponentType } from "react";
import Image from "next/image";
import pavilion from "@public/images/client-photos/gallery-dining-pavilion.jpg";
import {
  IconDawn,
  IconDusk,
  IconMidday,
  IconMorning,
} from "@/components/icons";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";
import { BOOKING_URL, DAY_OUTING_ENQUIRY } from "@/lib/site";

const MEALS: {
  icon: ComponentType<{ size?: number; className?: string }>;
  name: string;
}[] = [
  { icon: IconDawn, name: "Breakfast" },
  { icon: IconMidday, name: "Lunch" },
  { icon: IconMorning, name: "Evening snacks" },
  { icon: IconDusk, name: "Dinner" },
];

/**
 * #meals — what you eat on a stay or a day outing, all from facts already on
 * the site: every stay includes all four meals; vegetarian and non-vegetarian
 * food comes from separate kitchens; a day outing has breakfast, a vegetarian
 * lunch and high tea. Beside it, the dining pavilion. Phones: no photo.
 */
export function Meals() {
  return (
    <section
      id="meals"
      data-nav="light"
      data-snap=""
      className={`bg-paper ${screen}`}
    >
      <div
        className={`${container} grid gap-s21 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-s89`}
      >
        <div>
          <SectionHeader
            title="Every meal on the farm"
            lead="A stay includes all four meals, cooked with what the farm grows."
            leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
          />
          <ul className="mt-s21 grid grid-cols-2 gap-s8 sm:grid-cols-4 sm:gap-s13 lg:mt-s34 squat:mt-s21">
            {MEALS.map(({ icon: Icon, name }) => (
              <li
                key={name}
                className="rounded-card bg-card p-s13 ring-1 ring-line"
              >
                <Icon size={24} className="text-farm" />
                <p className="mt-s8 font-display text-[18px] leading-[1.2] text-forest">
                  {name}
                </p>
              </li>
            ))}
          </ul>
          <ul className="mt-s21 grid gap-s8 text-[15px] leading-[1.5] text-ink lg:mt-s34 squat:mt-s21">
            <li>
              <span className="font-medium text-forest">Veg and non-veg.</span>{" "}
              From separate kitchens.
            </li>
            <li>
              <span className="font-medium text-forest">On a day outing.</span>{" "}
              Breakfast, a vegetarian lunch and high tea.
            </li>
          </ul>
          <div className="mt-s21 flex flex-wrap gap-s13 lg:mt-s34 squat:mt-s21">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("primary")}
            >
              Book a stay
            </a>
            <a
              href={DAY_OUTING_ENQUIRY}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("secondary")}
            >
              Plan a day outing
            </a>
          </div>
        </div>
        <div className="relative hidden aspect-[16/11] overflow-hidden rounded-card lg:block">
          <Image
            src={pavilion}
            alt="The dining pavilion: tables set under an open-sided tiled roof beside the garden"
            fill
            sizes="45vw"
            placeholder="blur"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
