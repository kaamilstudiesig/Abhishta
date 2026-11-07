import Image, { type StaticImageData } from "next/image";
import gir from "@public/images/client-photos/tour-gau-gir.jpg";
import hallikar from "@public/images/client-photos/tour-gaushaale-hallikar.jpg";
import holstein from "@public/images/client-photos/tour-gau-holstein.jpg";
import punganur from "@public/images/client-photos/breed-punganur.jpg";
import jersey from "@public/images/client-photos/breed-jersey.jpg";
import kankrej from "@public/images/client-photos/breed-kankrej.jpg";
import { IconCow } from "@/components/icons";
import { SectionHeader, container, screen } from "@/components/ui";
import { BREEDS } from "@/components/sections/living-farm/farm";

/**
 * Stills of the breeds that can be told apart in the farm's 360° tour: the Gir
 * and Hallikar stalls carry signs, and the Holstein Friesians are the
 * black-and-white cows. Punganur Gidda, Jersey and Kankrej aren't labelled
 * anywhere in the tour, so they use free-licence stock photos from Wikimedia
 * Commons (credited on the card; see docs/photo-manifest.md) until the farm
 * sends its own.
 */
const PHOTOS: Record<
  string,
  { src: StaticImageData; alt: string; focus?: string; credit?: string }
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
  "Punganur Gidda": {
    src: punganur,
    alt: "A small white Punganur cow standing on a hillside path, with flowers tied at its horns",
    focus: "35% 50%",
    credit: "Photo: SandeepLPU, CC BY-SA 4.0",
  },
  Jersey: {
    src: jersey,
    alt: "A brown Jersey cow lying on green grass",
    focus: "50% 50%",
    credit: "Photo: Jamain, CC BY-SA 3.0",
  },
  Kankrej: {
    src: kankrej,
    alt: "A grey Kankrej cow with lyre-shaped horns standing in a farmyard",
    focus: "50% 50%",
    credit: "Photo: Pavanaja, CC BY-SA 3.0",
  },
};

/**
 * #breeds — the six breeds of the gaushaale, each with the 360° tour's own
 * note on it and a still of the breed where there is one. Hallikar, the breed
 * from this part of Karnataka, is marked. The still sits on the card's left, so
 * it adds no height. Phones: a swipe row of cards, each with a tall photo on top.
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
        <ul className="-mx-s21 mt-s21 flex snap-x snap-mandatory gap-s13 overflow-x-auto scroll-px-s21 px-s21 pb-s8 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden sm:mt-s21 sm:gap-s13 md:mt-s34 lg:grid-cols-3 lg:gap-s21 squat:mt-s21 squat:gap-s13">
          {BREEDS.map((b) => {
            const local = b.name === "Hallikar";
            const photo = PHOTOS[b.name];
            return (
              <li
                key={b.name}
                className={`w-[68%] shrink-0 snap-start overflow-hidden rounded-card ring-1 sm:w-auto sm:shrink sm:grid sm:grid-cols-[38%_1fr] ${local ? "bg-forest text-paper ring-forest" : "bg-card ring-line"}`}
              >
                <div
                  className={`relative max-sm:h-[clamp(150px,30svh,240px)] ${photo ? "" : "bg-paper-deep"}`}
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
                  {photo?.credit ? (
                    <span className="absolute right-[4px] bottom-[3px] max-w-[calc(100%-8px)] truncate rounded-[3px] bg-ink/55 px-[4px] py-[1px] text-[8px] leading-[1.3] text-paper sm:text-[9px]">
                      {photo.credit}
                    </span>
                  ) : null}
                </div>
                <div className="p-s13 sm:p-s21 lg:p-s21 squat:p-s13">
                  <h3
                    className={`font-display text-[clamp(19px,2vw,28px)] leading-[1.15] ${local ? "text-paper" : "text-forest"}`}
                  >
                    {b.name}
                  </h3>
                  <p
                    className={`mt-[2px] text-[14px] leading-[1.4] sm:text-[15px] sm:leading-[1.45] ${local ? "text-paper/80" : "text-ink-muted"}`}
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
