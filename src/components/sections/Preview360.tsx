"use client";

import { useEffect, useRef, useState } from "react";
import { CircularText } from "@/components/bits/CircularText";
import { Icon360, IconClose, IconPlay } from "@/components/icons";
import { TourViewer } from "@/components/TourViewer";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";
import { STORY_VIDEO_URL } from "@/lib/site";
import type { Tour } from "@/lib/tour";

// A short walk through the farm's 360° tour (scenes listed in scripts/tour-scenes.mjs).
const HIGHLIGHTS: { name: string; tour: Tour }[] = [
  { name: "The farm from above", tour: { node: "BirdsEyeView01", pan: -85, tilt: -40 } },
  { name: "Swimming pool", tour: { node: "SwimmingPoolBliss", pan: -90, tilt: -5 } },
  { name: "Dining hall", tour: { node: "Abhishta_03", pan: 22, tilt: -5 } },
  { name: "Amphitheatre and campfire", tour: { node: "Amphitheatre", pan: 12, tilt: -5 } },
  { name: "Cow cuddling area", tour: { node: "AerialView_03", pan: 0, tilt: -5 } },
];

/**
 * Forest band under About: the story film (lightbox) and a live 360° view that
 * steps through a few spots on the farm (arrows), turning slowly on its own.
 * The wheel scrolls past it, so it never traps the page.
 */
export function Preview360() {
  const [scene, setScene] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const count = HIGHLIGHTS.length;
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (videoOpen) {
      dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [videoOpen]);

  return (
    <section id="look-around" data-nav="dark" data-snap="" className={`on-dark bg-forest text-paper ${screen}`}>
      <div className={`${container} grid items-center gap-s34 md:gap-s55 lg:grid-cols-[1fr_1.618fr] lg:gap-s89`}>
        <SectionHeader
          tone="dark"
          title="See the farm before you visit"
          lead="Look around the farm, the pool and the dining hall in 360°, or watch a short film about how Abhishta began."
        >
          <button type="button" onClick={() => setVideoOpen(true)} className={buttonClass("ghost-light", "mt-s21 md:mt-s34")}>
            <IconPlay size={16} />
            Watch our story
          </button>
        </SectionHeader>

        <div className="relative">
          <TourViewer
            tour={HIGHLIGHTS[scene].tour}
            title={`360° view: ${HIGHLIGHTS[scene].name.toLowerCase()}`}
            caption={HIGHLIGHTS[scene].name}
            tone="dark"
            onPrev={() => setScene((scene - 1 + count) % count)}
            onNext={() => setScene((scene + 1) % count)}
            className="aspect-[16/11] sm:aspect-[16/10]"
          />
          <CircularText
            text="drag to explore · 360° · drag to explore · 360° · "
            size={110}
            className="absolute -top-s34 right-s13 origin-top-right scale-[0.78] rounded-full bg-forest text-gold sm:right-auto sm:-top-s55 sm:-left-s34 sm:scale-100"
          >
            <Icon360 size={34} className="text-paper" />
          </CircularText>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setVideoOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setVideoOpen(false);
        }}
        aria-label="Our story — video"
        className="m-auto w-[min(1100px,92vw)] overflow-visible bg-transparent p-0 backdrop:bg-ink/85 backdrop:backdrop-blur-sm"
      >
        <button
          autoFocus
          type="button"
          onClick={() => setVideoOpen(false)}
          aria-label="Close video"
          className="on-dark absolute -top-[55px] right-0 grid size-[44px] place-items-center rounded-full bg-paper text-forest"
        >
          <IconClose size={22} />
        </button>
        <div className="relative aspect-video overflow-hidden rounded-card bg-ink shadow-float">
          {videoOpen ? (
            <iframe
              src={STORY_VIDEO_URL}
              title="Abhishta Agri Farm Stay — our story"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 size-full"
            />
          ) : null}
        </div>
      </dialog>
    </section>
  );
}
