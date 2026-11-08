"use client";

import { useState, type ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { TourViewer } from "@/components/TourViewer";
import { stillOf, type Still } from "@/components/tourStills";
import { IconChevronLeft, IconChevronRight } from "@/components/icons";
import { glass } from "@/components/bits/glass";
import { GlassFill } from "@/components/bits/LiquidGlass";

type ViewerProps = Parameters<typeof TourViewer>[0];

/**
 * A place shown as a still photo with a Photo | 360° switch in the top-right corner. Photo is the default: it
 * costs nothing to load and nothing to draw. Switching to 360° mounts the live TourViewer for the same place;
 * switching back unmounts it (its canvas goes). The choice stays as the `tour` changes (arrows, a list of stops).
 * Takes every TourViewer prop (arrows, caption, bleed, tone, className). The still comes from the place itself
 * (tourStills.ts), or from `still` when a section has its own photo, or `photo` for something richer (a slideshow).
 * `defaultLive` starts in 360° (the tour page itself). Without any still it is just the viewer, with no switch.
 */
export function TourOrPhoto({
  still,
  photo,
  defaultLive = false,
  sizes = "(min-width: 1024px) 58vw, 100vw",
  switchClassName = "top-s13 right-s13",
  ...viewer
}: ViewerProps & {
  still?: Still & { src: StaticImageData };
  /** replaces the still: the Photo side of the switch, with its own frame, count and arrows (h-full) */
  photo?: ReactNode;
  defaultLive?: boolean;
  sizes?: string;
  /** where the switch sits (default: the top-right corner; a full-screen view puts it under the navbar) */
  switchClassName?: string;
}) {
  const { tour, title, caption, tone, onPrev, onNext, prevLabel, nextLabel, bleed = false, className = "" } = viewer;
  const [live, setLive] = useState(defaultLive);
  const found = still ?? stillOf(tour);
  if (!found && !photo) return <TourViewer {...viewer} />;

  const control = `grid size-[40px] place-items-center rounded-full text-paper transition-colors duration-300 hover:bg-white/20 ${glass("dark")}`;
  const modes = [
    { label: "Photo", on: !live, set: () => setLive(false) },
    { label: "360°", on: live, set: () => setLive(true) },
  ];

  return (
    <div className={`relative isolate overflow-hidden ${bleed ? "" : "rounded-card"} ${className}`}>
      <div className="absolute inset-0">
        {live ? (
          <TourViewer {...viewer} className="h-full w-full" />
        ) : photo ? (
          // a photo that brings its own frame, shade, count and arrows (a slideshow)
          photo
        ) : (
          <div
            role="group"
            aria-label={`Photo: ${title.replace(/^360° view:? (of |along |inside )?/, "")}`}
            className={`relative isolate h-full overflow-hidden ${bleed ? "" : "rounded-card ring-1"} ${
              tone === "dark" ? `bg-paper/[0.06] ${bleed ? "" : "ring-paper/10"}` : `bg-card ${bleed ? "" : "ring-line"}`
            }`}
          >
            <Image
              key={found!.src.src}
              src={found!.src}
              alt={found!.alt}
              fill
              sizes={sizes}
              placeholder="blur"
              style={{ objectPosition: found!.focus }}
              className="animate-[fade-in_500ms_ease-out] object-cover motion-reduce:animate-none"
            />
            {/* a soft shade at the bottom and sides, so the clear-glass caption and arrows read on bright skies and walls */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.4),transparent_30%),linear-gradient(to_right,rgb(0_0_0/0.22),transparent_16%,transparent_84%,rgb(0_0_0/0.22))]"
            />
            {caption ? (
              <span aria-live="polite" className={`absolute bottom-s13 left-s13 rounded-full px-s13 py-[6px] text-[13px] font-medium text-paper ${glass("dark")}`}>
                <GlassFill />
                {caption}
              </span>
            ) : null}
            {onPrev ? (
              <button type="button" onClick={onPrev} aria-label={prevLabel ?? "Previous view"} className={`absolute top-1/2 left-s13 z-10 -translate-y-1/2 ${control}`}>
                <GlassFill />
                <IconChevronLeft size={20} />
              </button>
            ) : null}
            {onNext ? (
              <button type="button" onClick={onNext} aria-label={nextLabel ?? "Next view"} className={`absolute top-1/2 right-s13 z-10 -translate-y-1/2 ${control}`}>
                <GlassFill />
                <IconChevronRight size={20} />
              </button>
            ) : null}
          </div>
        )}
      </div>

      {/* a soft shade in the top-right corner, so the switch reads on a bright sky in either view */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_100%_0%,rgb(0_0_0/0.38),transparent_200px)]"
      />
      {/* top right: switch between the photo and the live 360° of the same place */}
      <div role="group" aria-label="Show as" className={`absolute z-20 flex rounded-full p-[3px] ${switchClassName} ${glass("dark")}`}>
        <GlassFill />
        {modes.map((m) => (
          <button
            key={m.label}
            type="button"
            aria-pressed={m.on}
            onClick={m.set}
            className={`tap relative rounded-full px-s13 py-[5px] text-[13px] font-medium transition-colors duration-300 ${
              m.on ? "bg-paper text-forest [text-shadow:none]" : "text-paper hover:bg-white/20"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}
