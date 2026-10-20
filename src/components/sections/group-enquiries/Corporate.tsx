import type { ComponentType } from "react";
import Image from "next/image";
import { FlipCard } from "@/components/bits/FlipCard";
import dining from "@public/images/client-photos/group-corporate.jpg";
import { IconBed, IconDining, IconGames, IconOrchard, IconProjector, IconStar } from "@/components/icons";
import { SectionHeader, container, screen } from "@/components/ui";
import { REVIEW_URL } from "@/lib/site";

const REASONS: { icon: ComponentType<{ size?: number; className?: string }>; title: string; line: string }[] = [
  { icon: IconOrchard, title: "Open space", line: "Lawns, an orchard and a pool, 90 km from the city." },
  { icon: IconGames, title: "Team games", line: "Cricket, volleyball, throwball and basketball; carrom and chess indoors." },
  { icon: IconBed, title: "Rooms for the whole team", line: "Four AC cottages for 3 or 4, and three family rooms for 5 to 10." },
  { icon: IconDining, title: "Veg and non-veg meals", line: "From separate kitchens, cooked with what the farm grows." },
  { icon: IconProjector, title: "A projector for the session", line: "For meetings and presentations." },
];

/**
 * #corporate — why teams come, in five short reasons, beside the dining hall
 * photo with a real Google review of a corporate outing over it (the same
 * excerpt the homepage shows). Below lg: the photo as a FlipCard — tap to
 * turn it over and read the reasons.
 */
export function Corporate() {
  return (
    <section id="corporate" data-nav="light" data-snap="" className={`bg-paper ${screen}`}>
      <div className={`${container} grid grid-cols-[minmax(0,1fr)] gap-s21 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-s89`}>
        <div className="min-w-0">
          <SectionHeader
            title="Corporate outings"
            lead="Take your team out of the office for a day or a weekend, planned around what you need."
            leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
          />
          <ul className="mt-s21 grid gap-s13 max-lg:hidden sm:mt-s34 sm:gap-s21 squat:mt-s21 squat:gap-s13">
            {REASONS.map(({ icon: Icon, title, line }) => (
              <li key={title} className="flex gap-s13 sm:gap-s21">
                <Icon size={24} className="mt-[2px] shrink-0 text-farm" />
                <p className="text-[15px] leading-[1.45]">
                  <span className="font-medium text-forest">{title}.</span> <span className="text-ink-muted">{line}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <FlipCard
          photo={dining}
          alt="The open-sided dining hall: long wooden tables on patterned tiles under a timber-and-tile roof"
          title="Why teams come here"
          label="why teams come here"
          className="h-[clamp(320px,calc(100svh-330px),620px)] w-full lg:hidden"
          back={
            <>
              <h3 className="font-display text-[22px] leading-[1.15] text-forest">Why teams come here</h3>
              <ul className="mt-s13 grid gap-s13">
                {REASONS.map(({ icon: Icon, title, line }) => (
                  <li key={title} className="flex gap-s13">
                    <Icon size={22} className="mt-[1px] shrink-0 text-farm" />
                    <p className="text-[15px] leading-[1.4]">
                      <span className="block font-medium text-forest">{title}</span>
                      <span className="text-ink-muted">{line}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </>
          }
        />

        <div className="relative isolate overflow-hidden rounded-card max-lg:hidden lg:h-[clamp(380px,calc(100svh-280px),600px)]">
          <Image
            src={dining}
            alt="The open-sided dining hall: long wooden tables on patterned tiles under a timber-and-tile roof"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            placeholder="blur"
            className="-z-10 object-cover"
          />
          <figure className="absolute inset-x-s21 bottom-s21 rounded-card bg-card p-s21 shadow-card ring-1 ring-line sm:p-s34 squat:p-s21">
            <span role="img" aria-label="5 out of 5 stars" className="inline-flex gap-[2px] text-gold">
              {Array.from({ length: 5 }, (_, i) => (
                <IconStar key={i} size={16} fill="currentColor" />
              ))}
            </span>
            <blockquote className="mt-s8 font-display text-[clamp(19px,1.6vw,23px)] leading-[1.35] text-ink">
              “We had corporate team outing and all of us had an unforgettable experience at Abhishta Agri Farm Stay…”
            </blockquote>
            <figcaption className="mt-s13 flex flex-wrap items-baseline justify-between gap-x-s13 text-[14px]">
              <span className="font-medium text-forest">Kalappa Kuppanda, Google review</span>
              <a href={REVIEW_URL} target="_blank" rel="noopener noreferrer" className="link-gold font-medium text-farm">
                Read on Google
              </a>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
