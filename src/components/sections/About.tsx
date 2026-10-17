import Image from "next/image";
import aerialDusk from "../../../assets/images/slider/slider-4.jpg";
import { ScrollExpand } from "@/components/bits/ScrollExpand";
import { SplitText } from "@/components/bits/SplitText";
import { IconCart, IconField, IconPool, IconSky } from "@/components/icons";
import { container } from "@/components/ui";
import { Preview360 } from "@/components/sections/Preview360";

const MEANINGS = [
  { icon: IconSky, title: "Open skies" },
  { icon: IconField, title: "Living fields" },
  { icon: IconPool, title: "The pool" },
  { icon: IconCart, title: "Bullock carts" },
];

/**
 * About — a single centred line, "Abhishta means", over a centred photo card.
 * As you scroll the dusk aerial opens to full bleed (ScrollExpand), a flat
 * shade settles over it, and the meaning of the name appears beneath the
 * heading. Below, a forest band carries the story film and the 360° preview.
 */
export function About() {
  return (
    <section id="about" className="relative bg-paper">
      <div data-snap="" data-nav="light" className="absolute inset-x-0 top-0 h-[85svh]" aria-hidden="true" />
      <div data-nav="dark" className="absolute inset-x-0 top-[85svh] bottom-0" aria-hidden="true" />
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
        shade
        heading={
          <>
            <div
              className={`${container} pointer-events-none absolute inset-x-0 top-[17%] text-center md:top-[15%]`}
              style={{ transform: "translateY(calc(var(--p) * 8svh))" }}
            >
              <SplitText
                as="h2"
                text="Abhishta means"
                className="font-display text-[clamp(45px,7.4vw,96px)] leading-[1] font-light tracking-[-0.025em] text-[color-mix(in_oklab,var(--color-paper)_calc(var(--p)*100%),var(--color-forest))]"
              />
            </div>
          </>
        }
        overlay={
          <div
            className={`${container} absolute inset-x-0 top-[17%] flex flex-col items-center pt-[calc(clamp(45px,7.4vw,96px)+8svh+34px)] text-center text-paper md:top-[15%]`}
            style={{ opacity: "var(--reveal)", transform: "translateY(calc((1 - var(--reveal)) * 21px))" }}
          >
            <p className="font-display text-[clamp(28px,3.4vw,45px)] leading-[1.15] font-light italic">
              desired, beloved.
            </p>
            <p className="mt-s21 max-w-[34em] text-paper/90">
              The thing you long for without knowing it. Here the sky is the ceiling and the fields are the floor,
              ninety kilometres from Bangalore.
            </p>
            <ul className="mt-s34 grid grid-cols-2 gap-x-s34 gap-y-s21 sm:flex sm:gap-s55">
              {MEANINGS.map(({ icon: Icon, title }) => (
                <li key={title} className="flex flex-col items-center gap-s8">
                  <Icon className="text-gold" size={30} />
                  <span className="font-display text-[19px] leading-tight">{title}</span>
                </li>
              ))}
            </ul>
          </div>
        }
      />
      <Preview360 />
    </section>
  );
}
