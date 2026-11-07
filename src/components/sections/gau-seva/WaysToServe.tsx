import type { ComponentType } from "react";
import Image, { type StaticImageData } from "next/image";
import resting from "@public/images/client-photos/tour-gaushaale-resting.jpg";
import feeding from "@public/images/client-photos/tour-gau-feeding.jpg";
import cowPen from "@public/images/client-photos/tour-outing-cow-pen.jpg";
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
 * them, sit with them, a Gau Pooja or a Gau Aarti), beside a still of the
 * cows resting in the gaushaale from the farm's 360° tour, then one enquiry
 * button. Each way has a small still on top of its card (a placeholder for the
 * pooja and the aarti until the farm sends photos). Phones: the big photo is
 * left out and the four ways are flip cards in a swipe row, like the stays on
 * the home page: photo and title on the front, tap to turn it over for the
 * details.
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
          {/* phones: flip cards in a swipe row, the next one peeking in */}
          <ul className="-mx-s21 mt-s13 flex snap-x snap-mandatory gap-s13 overflow-x-auto scroll-px-s21 px-s21 py-s8 [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden">
            {WAYS.map(({ title, line, photo }) => {
              const p = photo ?? FALLBACK;
              return (
                <li key={title} className="w-[78%] shrink-0 snap-start">
                  <FlipCard
                    photo={p.src}
                    alt={p.alt}
                    title={title}
                    label={title.toLowerCase()}
                    className="h-[clamp(220px,calc(100svh-400px),420px)]"
                    back={
                      <>
                        <h3 className="font-display text-[22px] leading-[1.15] text-forest">
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
          <ul className="mt-s13 hidden grid-cols-2 gap-s8 sm:mt-s21 sm:grid sm:gap-s21 lg:mt-s34 squat:mt-s13 squat:gap-s13">
            {WAYS.map(({ icon: Icon, title, line, photo }) => (
              <li
                key={title}
                className="overflow-hidden rounded-card bg-paper/[0.06] ring-1 ring-paper/10"
              >
                <div className="relative h-[clamp(56px,9svh,120px)] bg-paper/[0.06] sm:h-[clamp(40px,calc(100svh-826px),90px)]">
                  {photo ? (
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 22vw, 50vw"
                      placeholder="blur"
                      style={{ objectPosition: photo.focus }}
                      className="object-cover"
                    />
                  ) : (
                    // TODO(client photo): a photo of this at the farm
                    <p className="absolute inset-0 flex items-center justify-center gap-s8 px-s13 text-center text-[12px] leading-[1.3] text-paper/60 sm:text-[13px]">
                      <Icon
                        size={20}
                        className="shrink-0 text-gold max-sm:hidden"
                      />
                      Photo of the {title} to come
                    </p>
                  )}
                </div>
                <div className="p-s13 sm:p-s21 squat:p-s13">
                  <h3 className="font-display text-[clamp(19px,1.7vw,24px)] leading-[1.2] text-paper">
                    {title}
                  </h3>
                  <p className="mt-[4px] text-[13px] leading-[1.4] text-paper/75 sm:text-[15px] sm:leading-[1.45] squat:text-[14px]">
                    {line}
                  </p>
                </div>
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
