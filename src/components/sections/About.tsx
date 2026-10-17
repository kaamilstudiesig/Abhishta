import Image from "next/image";
import aerialDusk from "../../../assets/images/slider/slider-4.jpg";
import { ScrollExpand } from "@/components/bits/ScrollExpand";
import { SplitText } from "@/components/bits/SplitText";
import { IconCart, IconField, IconPool, IconSky } from "@/components/icons";
import { container } from "@/components/ui";
import { Preview360 } from "@/components/sections/Preview360";

const MEANINGS = [
  { icon: IconSky, title: "Open skies", body: "A horizon that runs far, and stars sharp and clear at night." },
  { icon: IconField, title: "Living fields", body: "Orchards and vegetable beds you can walk, pick and taste." },
  { icon: IconPool, title: "The pool", body: "Cool water after a morning in the sun." },
  { icon: IconCart, title: "Bullock carts", body: "The slowest, happiest ride across the red earth." },
];

/**
 * About — "Abhishta is…". The heading pins while the dusk aerial of the farm
 * opens from a rounded card to full bleed (ScrollExpand). The meaning of the
 * name then settles over the photo on a forest scrim, so text never sits bare
 * on the image. Below, a forest band carries the story film and the 360° preview.
 */
export function About() {
  return (
    <section id="about" className="relative bg-paper">
      <div data-nav="light" className="absolute inset-x-0 top-0 h-[60svh]" aria-hidden="true" />
      <div data-nav="dark" className="absolute inset-x-0 top-[60svh] bottom-0" aria-hidden="true" />
      <ScrollExpand
        media={
          <Image
            src={aerialDusk}
            alt="Aerial view of Abhishta at dusk: cottages and the pool lit up among palms and red-earth fields"
            fill
            sizes="100vw"
            placeholder="blur"
            className="object-cover"
          />
        }
        heading={
          <>
            {/* top scrim fades in as the photo takes over, keeping the pinned heading readable */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[45%] bg-[linear-gradient(180deg,rgba(7,59,36,0.7),transparent)] opacity-[var(--p)]"
            />
            <div className={`${container} pointer-events-none relative pt-[120px] md:pt-[150px]`}>
              <p className="eyebrow mb-s13 flex items-center gap-s13 text-[color-mix(in_oklab,var(--color-gold)_calc(var(--p)*100%),var(--color-farm))]">
                <span aria-hidden="true" className="h-[2px] w-s21 bg-gold" />
                About the farm
              </p>
              <SplitText
                as="h2"
                text="Abhishta is"
                className="font-display text-[clamp(55px,9vw,120px)] leading-[0.95] font-light tracking-[-0.03em] [text-shadow:0_2px_34px_rgba(7,59,36,calc(var(--p)*0.6))] text-[color-mix(in_oklab,var(--color-paper)_calc(var(--p)*100%),var(--color-forest))]"
              />
              <p
                className="mt-s21 max-w-[19em] text-[17px] text-ink-muted md:max-w-[17em]"
                style={{ opacity: "calc(1 - var(--p) * 1.6)" }}
              >
                a Sanskrit word for the one you long for. Keep scrolling and the farm opens up.
              </p>
            </div>
          </>
        }
        overlay={
          <div
            className="absolute inset-0 flex items-end"
            style={{ opacity: "var(--reveal)", transform: "translateY(calc((1 - var(--reveal)) * 34px))" }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,59,36,0.96)_0%,rgba(7,59,36,0.88)_40%,rgba(7,59,36,0.2)_75%,transparent_100%)]"
            />
            <div
              className={`${container} relative grid gap-s34 pb-s55 text-paper md:grid-cols-[1.618fr_1fr] md:items-end md:gap-s89 md:pb-s89`}
            >
              <div>
                <p className="font-display text-[clamp(28px,3.6vw,45px)] leading-[1.12] font-light tracking-[-0.015em] text-balance">
                  …desired. Beloved. The thing you long for without knowing it.
                </p>
                <p className="mt-s21 max-w-[32em] text-paper/85">
                  Here the sky is the ceiling and the fields are the floor. Ninety kilometres from Bangalore, the
                  city falls away and the day is measured in meals, walks and the light on the palms.
                </p>
              </div>
              <ul className="grid grid-cols-2 gap-x-s21 gap-y-s21">
                {MEANINGS.map(({ icon: Icon, title, body }) => (
                  <li key={title} className="grid content-start gap-[5px]">
                    <Icon className="text-gold" size={26} />
                    <span className="font-display text-[19px] leading-tight sm:text-h3">{title}</span>
                    <span className="hidden text-[15px] leading-[1.5] text-paper/75 sm:block">{body}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        }
      />
      <Preview360 />
    </section>
  );
}
