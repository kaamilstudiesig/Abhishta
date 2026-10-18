import Image from "next/image";
import aerialDusk from "../../../assets/images/slider/slider-4.jpg";
import { ScrollExpand } from "@/components/bits/ScrollExpand";
import { SplitText } from "@/components/bits/SplitText";
import { container } from "@/components/ui";


/**
 * About — a single centred line, "Abhishta means", over a centred photo card.
 * Once you arrive, the dusk aerial opens to full bleed (ScrollExpand), a flat
 * shade settles over it, and the meaning of the name appears beneath the
 * heading. The page is one screen; the expansion plays once it has settled.
 */
export function About() {
  return (
      <ScrollExpand
        id="about"
        className="bg-paper"
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
                className="font-display text-[clamp(45px,7.4vw,96px)] leading-[1] font-normal tracking-[-0.025em] text-[color-mix(in_oklab,var(--color-paper)_calc(var(--p)*100%),var(--color-forest))]"
              />
            </div>
          </>
        }
        overlay={
          <div
            className={`${container} absolute inset-x-0 top-[17%] flex flex-col items-center pt-[calc(clamp(45px,7.4vw,96px)+8svh+34px)] text-center text-paper md:top-[15%]`}
            style={{ opacity: "var(--reveal)", transform: "translateY(calc((1 - var(--reveal)) * 21px))" }}
          >
            <p className="font-display text-[clamp(28px,3.4vw,45px)] leading-[1.15] italic">
              desired, beloved.
            </p>
            <p className="mt-s21 max-w-[28em] text-paper/85">
              The thing you long for without knowing it. Here the sky is the ceiling and the fields are the floor.
            </p>
          </div>
        }
      />
  );
}
