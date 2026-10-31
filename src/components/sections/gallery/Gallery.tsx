"use client";

import { useEffect, useState } from "react";
import cottages from "@public/images/client-photos/gallery-cottages-path.jpg";
import pavilion from "@public/images/client-photos/gallery-dining-pavilion.jpg";
import amphitheatre from "@public/images/client-photos/gallery-amphitheatre.jpg";
import bench from "@public/images/client-photos/gallery-mango-bench.jpg";
import dining from "@public/images/client-photos/gallery-dining-hall.jpg";
import koi from "@public/images/client-photos/gallery-koi-bridge.jpg";
import howdah from "@public/images/client-photos/gallery-howdah.jpg";
import swing from "@public/images/client-photos/gallery-garden-swing.jpg";
import students from "@public/images/client-photos/group-students-amphitheatre.jpg";
import performance from "@public/images/client-photos/event-performance.jpg";
import landscape from "@public/images/client-photos/about-landscape.jpg";
import veranda from "@public/images/client-photos/group-veranda-gathering.jpg";
import lamp from "@public/images/client-photos/group-lamp-lighting.jpg";
import lawn from "@public/images/client-photos/group-lawn-audience-1.jpg";
import dancers from "@public/images/client-photos/group-students-dancers.jpg";
import { DriftWall, type DriftWallItem } from "@/components/bits/DriftWall";
import { MORE_PHOTOS } from "./more-photos";
import { glass } from "@/components/bits/glass";
import { GlassFill } from "@/components/bits/LiquidGlass";
import { IconClose } from "@/components/icons";

const PHOTOS: DriftWallItem[] = [
  { src: cottages, caption: "The cottages", alt: "The cottages along a stone path, with tiled roofs, painted walls and palms" },
  { src: koi, caption: "The koi pond bridge", alt: "A small wooden bridge painted yellow over the koi pond, among palms" },
  { src: dining, caption: "The dining hall", alt: "The dining hall: wooden tables on patterned tiles under a tall timber-and-tile roof" },
  { src: howdah, caption: "In the garden", alt: "A painted elephant statue carrying a golden howdah in the garden" },
  { src: students, caption: "A school visit", alt: "Students with sketchbooks sitting on the tiled tiers of the amphitheatre" },
  { src: amphitheatre, caption: "The amphitheatre", alt: "The round tiled stage and the patterned steps of the amphitheatre on the lawn" },
  { src: swing, caption: "The garden swing", alt: "A wooden swing hanging in a garden gazebo, trees behind" },
  { src: pavilion, caption: "The dining pavilion", alt: "The open dining pavilion on the lawn, with a painted village mural on its back wall" },
  { src: performance, caption: "A cultural evening", alt: "Two dancers in Kathakali costume and two drummers performing on the lawn" },
  { src: bench, caption: "Under the mango trees", alt: "A stone bench in the shade of mango trees in the orchard" },
  { src: landscape, caption: "A path through the farm", alt: "A stone-paved path running through the farm between palms and cypress trees" },
  { src: veranda, caption: "Together on the veranda", alt: "A big family group gathered on a cottage veranda with white pillars, the lawn in front" },
  { src: lamp, caption: "Lighting the lamp", alt: "Guests lighting a tall brass lamp decked with marigolds on the lawn stage" },
  { src: dancers, caption: "Students and Kathakali dancers", alt: "Students in team tracksuits on the lawn stage between two Kathakali dancers in full costume" },
  { src: lawn, caption: "An afternoon on the lawn", alt: "Guests seated on the amphitheatre tiers and on chairs around the lawn stage, under the trees" },
];
// the featured photos with one of each room and a few garden corners mixed in (client, 2026-10-26: fewer photos, more
// space), plus four of the group photos from 2026-10-31
const PICKS = MORE_PHOTOS;
const ALL: DriftWallItem[] = PHOTOS.flatMap((p, n) => (PICKS[n] ? [p, PICKS[n]] : [p]));

/**
 * #gallery — the /gallery page (client, 2026-10-31; it was a section of
 * /virtualtour): the whole screen is a drifting wall of the farm's photos
 * (React Bits DriftWall, flat). Grab any column and drag it up or down; let go
 * and it drifts on. Hover a photo to read its caption; click to see it large.
 * The title pops up in the middle when the page opens and stays until it's
 * closed (×) or the visitor starts on the wall; it doesn't come back.
 */
export function Gallery() {
  const [title, setTitle] = useState<"hidden" | "shown" | "gone">("hidden");

  useEffect(() => {
    const show = requestAnimationFrame(() => setTitle("shown"));
    return () => cancelAnimationFrame(show);
  }, []);
  const dismiss = () => setTitle("gone");

  return (
    <section id="gallery" data-nav="light" data-snap="" className="relative isolate h-svh min-h-[560px] overflow-hidden bg-paper">
      <h1 className="sr-only">Photos from the farm</h1>
      <div className="absolute inset-0" onPointerDown={dismiss}>
        <DriftWall items={ALL} label="Photos from the farm" columns={4} speed={19} gap="gap-s34" className="absolute inset-0 hidden px-s55 lg:block" />
        <DriftWall items={ALL} label="Photos from the farm" columns={3} speed={16} gap="gap-s21" className="absolute inset-0 hidden px-s34 sm:block lg:hidden" />
        <DriftWall items={ALL} label="Photos from the farm" columns={2} speed={15} gap="gap-s21" className="absolute inset-0 px-s21 sm:hidden" />
      </div>

      {/* the title: pops up as the page opens, until it's closed or the wall is touched */}
      <div
        className={`pointer-events-none absolute inset-0 z-20 grid place-items-center px-s21 ${title === "gone" ? "invisible delay-700" : ""}`}
        aria-hidden={title === "gone" || undefined}
      >
        <div
          className={`relative rounded-card px-s34 pt-[52px] pb-s21 text-center ${glass()} transition-[opacity,scale] ease-[var(--ease-earth)] motion-reduce:transition-none sm:px-s55 sm:pt-s34 sm:pb-s34 ${
            title === "shown" ? "pointer-events-auto scale-100 opacity-100 duration-500" : title === "gone" ? "scale-[0.98] opacity-0 duration-700" : "scale-[0.9] opacity-0 duration-0"
          }`}
        >
          {/* frosted, milky glass here so the title reads over the moving photos */}
          <GlassFill blur={18} saturation={1.1} fill="bg-white/75" />
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close the title"
            className="absolute top-[6px] right-[6px] z-10 grid size-[44px] place-items-center rounded-full text-forest transition-colors duration-300 hover:bg-forest/10"
          >
            <IconClose size={20} />
          </button>
          <p aria-hidden="true" className="relative font-display text-[clamp(30px,4.6vw,58px)] leading-[1] text-forest">Photos from the farm</p>
          <p className="relative mt-s8 text-[15px] text-ink-muted">Drag the photos up or down. Tap any photo to see it larger.</p>
        </div>
      </div>
    </section>
  );
}
