import type { ComponentType } from "react";
import type { StaticImageData } from "next/image";
import resting from "@public/images/client-photos/tour-gaushaale-resting.webp";
import feeding from "@public/images/client-photos/tour-gau-feeding.webp";
import cowPen from "@public/images/client-photos/tour-outing-cow-pen.webp";
import { FlipCard } from "@/components/bits/FlipCard";
import { IconClock, IconCow, IconDawn, IconDusk } from "@/components/icons";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";
import { GAU_SEVA_ENQUIRY } from "@/components/sections/living-farm/farm";

const WAYS: {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  line: string;
  /** a still from the farm's 360° tour; none yet for the pooja and the aarti */
  photo?: { src: StaticImageData; alt: string; focus?: string };
}[] = [
  {
    icon: IconCow,
    title: "Feed the cows",
    line: "Help at feeding time in the gaushaale.",
    photo: {
      src: feeding,
      alt: "A white cow eating at a long trough beside the walkway of the gaushaale",
      focus: "32% 55%",
    },
  },
  {
    icon: IconClock,
    title: "Cow cuddling",
    line: "On a day outing you can sit with them at 4 pm. It is calm and relaxing.",
    photo: {
      src: cowPen,
      alt: "The cow cuddling pen: a small yellow wooden fence on the grass among mango trees",
      focus: "60% 60%",
    },
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

/** the flip cards need a photo on the front; the pooja and the aarti use this still of the cows until the farm sends their own */
const FALLBACK = {
  src: resting,
  alt: "Cows resting in the gaushaale: Holstein Friesians lying on rubber mats beside the troughs under the long shed",
  focus: undefined,
};

/**
 * #ways-to-serve — on the forest band: what you can do with the cows (feed
 * them, sit with them, a Gau Pooja or a Gau Aarti) as flip cards on every
 * screen, like the stays on the home page: photo and title on the front, tap
 * to turn it over for the details. Phones: a swipe row; tablets and up: one
 * row of four. Then one enquiry button. The pooja and the aarti use a still of
 * the cows until the farm sends their own photos.
 */
export function WaysToServe() {
  return (
    <section
      id="ways-to-serve"
      data-nav="dark"
      data-snap=""
      className={`on-dark bg-forest text-paper ${screen}`}
    >
      <div className={container}>
        <div className="md:flex md:items-end md:justify-between md:gap-s34">
          <SectionHeader
            tone="dark"
            title="Ways to serve"
            lead="Tell us before you come so we can plan it."
            leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
          />
          <a
            href={GAU_SEVA_ENQUIRY}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("gold", "hidden shrink-0 md:inline-flex")}
          >
            Ask about gau seva
          </a>
        </div>
        {/* flip cards on every screen: a swipe row on phones, one row of four from tablets up */}
        <ul className="-mx-s21 mt-s13 flex snap-x snap-mandatory gap-s13 overflow-x-auto scroll-px-s21 px-s21 py-s8 [scrollbar-width:none] sm:-mx-s34 sm:scroll-px-s34 sm:px-s34 md:mx-0 md:mt-s34 md:grid md:grid-cols-4 md:gap-s21 md:overflow-visible md:px-0 lg:gap-s34 squat:mt-s21 [&::-webkit-scrollbar]:hidden">
          {WAYS.map(({ title, line, photo }) => {
            const p = photo ?? FALLBACK;
            return (
              <li key={title} className="w-[78%] shrink-0 snap-start sm:w-[44%] md:w-auto md:snap-align-none">
                <FlipCard
                  photo={p.src}
                  alt={p.alt}
                  title={title}
                  label={title.toLowerCase()}
                  stacked
                  className="h-[clamp(220px,calc(100svh-400px),420px)] md:h-[clamp(300px,calc(100svh-450px),520px)] squat:h-[calc(100svh-420px)]"
                  back={
                    <>
                      <h3 className="font-display text-[clamp(22px,2vw,26px)] leading-[1.15] text-forest">
                        {title}
                      </h3>
                      <p className="mt-s8 text-[15px] leading-[1.5] text-ink-muted">
                        {line}
                      </p>
                    </>
                  }
                />
              </li>
            );
          })}
        </ul>
        <a
          href={GAU_SEVA_ENQUIRY}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass("gold", "mt-s13 sm:mt-s21 md:hidden")}
        >
          Ask about gau seva
        </a>
      </div>
    </section>
  );
}
