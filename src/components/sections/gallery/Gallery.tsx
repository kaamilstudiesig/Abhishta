"use client";

import { useEffect, useRef, useState } from "react";
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
import { DriftWall, type DriftWallItem } from "@/components/bits/DriftWall";
import { MORE_PHOTOS } from "./more-photos";
import { glass } from "@/components/bits/glass";
import { GlassFill } from "@/components/bits/LiquidGlass";

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
];
// a short, well-spaced selection (client, 2026-10-26: fewer photos, more space): the featured photos with one of
// each room and a few garden corners mixed in
const PICKS = MORE_PHOTOS;
const ALL: DriftWallItem[] = PHOTOS.flatMap((p, n) => (PICKS[n] ? [p, PICKS[n]] : [p]));

/** how long the title holds before it fades and leaves the wall (ms) */
const HOLD = 1800;

/**
 * #gallery — the /gallery page (client, 2026-10-31; it was a section of
 * /virtualtour): the whole screen is a drifting wall of the farm's photos
 * (React Bits DriftWall, flat). Each time it comes into view, its title (the
 * page's h1) pops up in the middle and fades away after a moment, leaving the
 * wall. Hover a photo to stop its column and read its caption; click to see it large.
 */
export function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const [title, setTitle] = useState<"hidden" | "shown" | "gone">("hidden");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        clearTimeout(t);
        if (e.isIntersecting) {
          setTitle("shown");
          t = setTimeout(() => setTitle("gone"), HOLD);
        } else setTitle("hidden");
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  return (
    <section ref={ref} id="gallery" data-nav="light" data-snap="" className="relative isolate h-svh min-h-[560px] overflow-hidden bg-paper">
      <DriftWall items={ALL} label="Photos from the farm" columns={4} speed={19} gap="gap-s34" className="absolute inset-0 hidden px-s55 lg:block" />
      <DriftWall items={ALL} label="Photos from the farm" columns={3} speed={16} gap="gap-s21" className="absolute inset-0 hidden px-s34 sm:block lg:hidden" />
      <DriftWall items={ALL} label="Photos from the farm" columns={2} speed={15} gap="gap-s21" className="absolute inset-0 px-s21 sm:hidden" />

      {/* the title: pops up as the section arrives, then gets out of the way */}
      <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center px-s21">
        <div
          className={`relative rounded-card px-s34 py-s21 text-center ${glass()} transition-[opacity,scale] ease-[var(--ease-earth)] motion-reduce:transition-none sm:px-s55 sm:py-s34 ${
            title === "shown" ? "scale-100 opacity-100 duration-500" : title === "gone" ? "scale-[0.98] opacity-0 duration-700" : "scale-[0.9] opacity-0 duration-0"
          }`}
        >
          {/* frosted, milky glass here so the title reads over the moving photos */}
          <GlassFill blur={18} saturation={1.1} fill="bg-white/75" />
          <h1 className="font-display text-[clamp(30px,4.6vw,58px)] leading-[1] text-forest">Photos from the farm</h1>
          <p className="mt-s8 text-[15px] text-ink-muted">Tap any photo to see it larger.</p>
        </div>
      </div>
    </section>
  );
}
