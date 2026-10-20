import Image, { type StaticImageData } from "next/image";
import cottages from "@public/images/client-photos/gallery-cottages-path.jpg";
import pavilion from "@public/images/client-photos/gallery-dining-pavilion.jpg";
import amphitheatre from "@public/images/client-photos/gallery-amphitheatre.jpg";
import bench from "@public/images/client-photos/gallery-mango-bench.jpg";
import dining from "@public/images/client-photos/gallery-dining-hall.jpg";
import koi from "@public/images/client-photos/gallery-koi-bridge.jpg";
import howdah from "@public/images/client-photos/gallery-howdah.jpg";
import swing from "@public/images/client-photos/gallery-garden-swing.jpg";
import { SectionHeader, container, screen } from "@/components/ui";

const PHOTOS: { src: StaticImageData; alt: string; span: string }[] = [
  { src: cottages, alt: "The cottages along a stone path, with tiled roofs, painted walls and palms", span: "lg:col-span-2 lg:row-span-2" },
  { src: koi, alt: "A small wooden bridge painted yellow over the koi pond, among palms", span: "lg:row-span-2" },
  { src: dining, alt: "The dining hall: wooden tables on patterned tiles under a tall timber-and-tile roof", span: "" },
  { src: howdah, alt: "A painted elephant statue carrying a golden howdah in the garden", span: "lg:row-span-2" },
  { src: amphitheatre, alt: "The round tiled stage and the patterned steps of the amphitheatre on the lawn", span: "" },
  { src: swing, alt: "A wooden swing hanging in a garden gazebo, trees behind", span: "" },
  { src: pavilion, alt: "The open dining pavilion on the lawn, with a painted village mural on its back wall", span: "lg:col-span-2" },
  { src: bench, alt: "A stone bench in the shade of mango trees in the orchard", span: "lg:col-span-2" },
];

/**
 * #gallery — photos from the farm, a bento of the client's own photography
 * (large screens), a swipe row on phones. TODO(client): short reels to mix in.
 */
export function Gallery() {
  return (
    <section id="gallery" data-nav="light" data-snap="" className={`bg-paper ${screen}`}>
      <div className={container}>
        <SectionHeader title="Photos from the farm" />
        <ul className="-mx-s21 mt-s21 flex snap-x snap-mandatory gap-s8 overflow-x-auto scroll-px-s21 px-s21 [scrollbar-width:none] sm:-mx-s34 sm:scroll-px-s34 sm:px-s34 lg:mx-0 lg:mt-s34 lg:grid lg:h-[clamp(380px,calc(100svh-370px),600px)] lg:grid-flow-dense lg:grid-cols-5 lg:grid-rows-3 lg:gap-s13 lg:overflow-visible lg:px-0 squat:mt-s21 [&::-webkit-scrollbar]:hidden">
          {PHOTOS.map((p) => (
            <li key={p.alt} className={`relative h-[min(460px,56svh)] w-[78%] shrink-0 snap-start overflow-hidden rounded-card sm:w-[48%] lg:h-auto lg:w-auto ${p.span}`}>
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 40vw, 80vw" placeholder="blur" className="object-cover" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
