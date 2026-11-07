import Image, { type StaticImageData } from "next/image";
import gir from "@public/images/client-photos/tour-gau-gir.jpg";
import hallikar from "@public/images/client-photos/tour-gaushaale-hallikar.jpg";
import holstein from "@public/images/client-photos/tour-gau-holstein.jpg";
import { IconCow } from "@/components/icons";
import { SectionHeader, container, screen } from "@/components/ui";
import { BREEDS } from "@/components/sections/living-farm/farm";

/**
 * Stills of the breeds that can be told apart in the farm's 360° tour: the Gir
 * and Hallikar stalls carry signs, and the Holstein Friesians are the
 * black-and-white cows. Punganur Gidda, Jersey and Kankrej aren't labelled
 * anywhere in the tour, so their cards hold a placeholder until the farm sends
 * a photo of each.
 */
const PHOTOS: Record<
  string,
  { src: StaticImageData; alt: string; focus?: string }
> = {
  Gir: {
    src: gir,
    alt: "Gir cows, red-brown with a hump, at a trough under a sign that reads Gir cow",
    focus: "50% 55%",
  },
  Hallikar: {
    src: hallikar,
    alt: "A grey Hallikar cow at the trough under a sign that reads Hallikar",
    focus: "62% 55%",
  },
  "Holstein Friesian": {
    src: holstein,
    alt: "Black-and-white Holstein Friesian cows resting in the gaushaale",
    focus: "40% 65%",
  },
};

/**
 * #breeds — the six breeds of the gaushaale, each with the 360° tour's own
 * note on it and a still of the breed where there is one. Hallikar, the breed
 * from this part of Karnataka, is marked. The still sits on the card's left, so
 * it adds no height. Phones: a two-column grid of text only, so it fits one screen.
 */
export function Breeds() {
  return (
    <section
      id="breeds"
      data-nav="light"
      data-snap=""
      className={`bg-paper ${screen}`}
    >
      <div className={container}>
        <SectionHeader
          title="Six breeds in our gaushaale"
          lead="From tiny Punganur Gidda to Karnataka’s own Hallikar."
          leadClassName="max-sm:mt-s8 max-sm:text-[15px] max-sm:leading-[1.5] short:hidden"
        />
        <ul className="mt-s13 grid grid-cols-2 gap-s8 sm:mt-s21 sm:gap-s13 md:mt-s34 lg:grid-cols-3 lg:gap-s21 squat:mt-s21 squat:gap-s13">
          {BREEDS.map((b) => {
            const local = b.name === "Hallikar";
            const photo = PHOTOS[b.name];
            return (
              <li
                key={b.name}
                className={`overflow-hidden rounded-card ring-1 sm:grid sm:grid-cols-[38%_1fr] ${local ? "bg-forest text-paper ring-forest" : "bg-card ring-line"}`}
              >
                <div
                  className={`relative max-sm:hidden ${photo ? "" : "bg-paper-deep"}`}
                >
                  {photo ? (
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, 50vw"
                      placeholder="blur"
                      style={{ objectPosition: photo.focus }}
                      className="object-cover"
                    />
                  ) : (
                    // TODO(client photo): a photo of the farm's own cow of this breed
                    <p className="absolute inset-0 flex items-center justify-center gap-s8 px-s13 text-center text-[12px] leading-[1.3] text-ink-muted sm:text-[13px]">
                      <IconCow
                        size={22}
                        className="shrink-0 text-farm max-sm:hidden"
                      />
                      Photo of our {b.name} to come
                    </p>
                  )}
                </div>
                <div className="p-s13 sm:p-s21 lg:p-s21 squat:p-s13">
                  <h3
                    className={`font-display text-[clamp(19px,2vw,28px)] leading-[1.15] ${local ? "text-paper" : "text-forest"}`}
                  >
                    {b.name}
                  </h3>
                  <p
                    className={`mt-[4px] text-[13px] leading-[1.4] sm:text-[15px] sm:leading-[1.45] ${local ? "text-paper/80" : "text-ink-muted"}`}
                  >
                    {b.note}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
