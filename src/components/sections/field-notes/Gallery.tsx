"use client";

import cottages from "@public/images/client-photos/gallery-cottages-path.jpg";
import pavilion from "@public/images/client-photos/gallery-dining-pavilion.jpg";
import amphitheatre from "@public/images/client-photos/gallery-amphitheatre.jpg";
import bench from "@public/images/client-photos/gallery-mango-bench.jpg";
import dining from "@public/images/client-photos/gallery-dining-hall.jpg";
import koi from "@public/images/client-photos/gallery-koi-bridge.jpg";
import howdah from "@public/images/client-photos/gallery-howdah.jpg";
import swing from "@public/images/client-photos/gallery-garden-swing.jpg";
import gopala from "@public/images/client-photos/cottage-gopala-room.jpg";
import govinda from "@public/images/client-photos/cottage-govinda-sitout.jpg";
import students from "@public/images/client-photos/group-students-amphitheatre.jpg";
import performance from "@public/images/client-photos/event-performance.jpg";
import landscape from "@public/images/client-photos/about-landscape.jpg";
import dawn from "@public/images/client-photos/day-dawn.jpg";
import { DriftWall, type DriftWallItem } from "@/components/bits/DriftWall";
import { SectionHeader, container, screen } from "@/components/ui";

const PHOTOS: DriftWallItem[] = [
  { src: cottages, caption: "The cottages", alt: "The cottages along a stone path, with tiled roofs, painted walls and palms" },
  { src: koi, caption: "The koi pond bridge", alt: "A small wooden bridge painted yellow over the koi pond, among palms" },
  { src: gopala, caption: "Inside Gopala cottage", alt: "A double bed with green cushions under a tiled timber roof in Gopala cottage" },
  { src: dining, caption: "The dining hall", alt: "The dining hall: wooden tables on patterned tiles under a tall timber-and-tile roof" },
  { src: howdah, caption: "In the garden", alt: "A painted elephant statue carrying a golden howdah in the garden" },
  { src: students, caption: "A school visit", alt: "Students with sketchbooks sitting on the tiled tiers of the amphitheatre" },
  { src: amphitheatre, caption: "The amphitheatre", alt: "The round tiled stage and the patterned steps of the amphitheatre on the lawn" },
  { src: swing, caption: "The garden swing", alt: "A wooden swing hanging in a garden gazebo, trees behind" },
  { src: govinda, caption: "Govinda cottage’s sit-out", alt: "Chairs on a tiled veranda by carved wooden pillars at Govinda cottage" },
  { src: pavilion, caption: "The dining pavilion", alt: "The open dining pavilion on the lawn, with a painted village mural on its back wall" },
  { src: performance, caption: "A cultural evening", alt: "Two dancers in Kathakali costume and two drummers performing on the lawn" },
  { src: bench, caption: "Under the mango trees", alt: "A stone bench in the shade of mango trees in the orchard" },
  { src: landscape, caption: "A path through the farm", alt: "A stone-paved path running through the farm between palms and cypress trees" },
  { src: dawn, caption: "The orchard bench", alt: "A stone bench in a quiet orchard clearing, framed by low mango branches" },
];

/**
 * #gallery — photos from the farm as a drifting wall (React Bits DriftWall,
 * flat): columns float slowly; hover a photo to stop it and read its caption,
 * click to see it large. Phones: two columns. TODO(client): short reels.
 */
export function Gallery() {
  return (
    <section id="gallery" data-nav="light" data-snap="" className={`overflow-hidden bg-paper ${screen}`}>
      <div className={container}>
        <SectionHeader title="Photos from the farm" lead="Tap any photo to see it larger." leadClassName="max-sm:mt-s13 max-sm:text-[15px] squat:hidden" />
        <DriftWall items={PHOTOS} label="Photos from the farm" columns={4} className="mt-s21 hidden h-[clamp(260px,calc(100svh-390px),620px)] lg:block squat:mt-s13" />
        <DriftWall items={PHOTOS} label="Photos from the farm" columns={2} speed={14} className="mt-s21 h-[clamp(380px,calc(100svh-330px),620px)] lg:hidden" />
      </div>
    </section>
  );
}
