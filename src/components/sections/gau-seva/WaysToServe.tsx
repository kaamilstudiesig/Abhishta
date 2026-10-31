import type { ComponentType } from "react";
import Image from "next/image";
import resting from "@public/images/client-photos/tour-gaushaale-resting.jpg";
import { IconClock, IconCow, IconDawn, IconDusk } from "@/components/icons";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";
import { GAU_SEVA_ENQUIRY } from "@/components/sections/living-farm/farm";

const WAYS: {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  line: string;
}[] = [
  {
    icon: IconCow,
    title: "Feed the cows",
    line: "Help at feeding time in the gaushaale.",
  },
  {
    icon: IconClock,
    title: "Cow cuddling",
    line: "On a day outing you can sit with them at 4 pm. It is calm and relaxing.",
  },
  {
    icon: IconDawn,
    title: "Gau Pooja",
    line: "A prayer for the cows, in the morning or the evening.",
  },
  {
    icon: IconDusk,
    title: "Gau Aarti",
    line: "The lamp offered to the cows, morning or evening.",
  },
];

/**
 * #ways-to-serve — on the forest band: what you can do with the cows (feed
 * them, sit with them, a Gau Pooja or a Gau Aarti), beside a still of the
 * cows resting in the gaushaale from the farm's 360° tour, then one enquiry
 * button. Phones: the photo is left out so it fits one screen.
 */
export function WaysToServe() {
  return (
    <section
      id="ways-to-serve"
      data-nav="dark"
      data-snap=""
      className={`on-dark bg-forest text-paper ${screen}`}
    >
      <div
        className={`${container} grid gap-s21 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-s89`}
      >
        <div className="relative hidden aspect-[16/11] overflow-hidden rounded-card lg:block">
          <Image
            src={resting}
            alt="Cows resting in the gaushaale: Holstein Friesians lying on rubber mats beside the troughs under the long shed"
            fill
            sizes="45vw"
            placeholder="blur"
            className="object-cover"
          />
        </div>
        <div>
          <SectionHeader
            tone="dark"
            title="Ways to serve"
            lead="Tell us before you come so we can plan it."
            leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
          />
          <ul className="mt-s13 grid grid-cols-2 gap-s8 sm:mt-s21 sm:gap-s21 lg:mt-s34 squat:mt-s13 squat:gap-s13">
            {WAYS.map(({ icon: Icon, title, line }) => (
              <li
                key={title}
                className="rounded-card bg-paper/[0.06] p-s13 ring-1 ring-paper/10 sm:p-s21 squat:p-s13"
              >
                <Icon
                  size={24}
                  className="text-gold max-sm:hidden squat:hidden"
                />
                <h3 className="font-display sm:mt-s8 squat:mt-0 text-[clamp(19px,1.7vw,24px)] leading-[1.2] text-paper">
                  {title}
                </h3>
                <p className="mt-[4px] text-[13px] leading-[1.4] text-paper/75 sm:text-[15px] sm:leading-[1.45] squat:text-[14px]">
                  {line}
                </p>
              </li>
            ))}
          </ul>
          <a
            href={GAU_SEVA_ENQUIRY}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass(
              "gold",
              "mt-s13 sm:mt-s21 lg:mt-s34 squat:mt-s13",
            )}
          >
            Ask about gau seva
          </a>
        </div>
      </div>
    </section>
  );
}
