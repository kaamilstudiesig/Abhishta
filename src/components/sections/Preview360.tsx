"use client";

import { useEffect, useRef, useState } from "react";
import { CircularText } from "@/components/bits/CircularText";
import { Icon360, IconClose, IconPlay } from "@/components/icons";
import { useLenis } from "@/components/SmoothScroll";
import { SectionHeader, buttonClass, container, sectionPad } from "@/components/ui";
import { STORY_VIDEO_URL, TOUR_360_URL } from "@/lib/site";

/**
 * Forest band under About: the story film (lightbox) and a framed, live 360°
 * view of the property. The 360° frame stays behind a "start" cover until the
 * visitor asks for it, so scrolling past never gets caught in the viewer.
 */
export function Preview360() {
  const [tourActive, setTourActive] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (videoOpen) {
      dialog.showModal();
      lenis?.stop();
    } else if (dialog.open) {
      dialog.close();
    }
    if (!videoOpen) lenis?.start();
  }, [videoOpen, lenis]);

  return (
    <div data-nav="dark" data-snap="" className={`on-dark relative bg-forest text-paper ${sectionPad}`}>
      <div className={`${container} grid items-center gap-s55 lg:grid-cols-[1fr_1.618fr] lg:gap-s89`}>
        <SectionHeader
          tone="dark"
          eyebrow="Look around first"
          title="See the farm before you set out"
          lead="Turn slowly through the cottages, the dining hall and the pool in 360°, or sit back for the short film that tells how Abhishta began."
        >
          <div className="mt-s34 flex flex-wrap items-center gap-s21">
            <button type="button" onClick={() => setVideoOpen(true)} className={buttonClass("gold")}>
              <IconPlay size={18} />
              Watch our story
            </button>
            <a href={TOUR_360_URL} target="_blank" rel="noopener noreferrer" className="link-gold text-[15px] text-paper">
              Open the full 360° tour
            </a>
          </div>
        </SectionHeader>

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-[#0b4a2e] shadow-float ring-1 ring-paper/15 sm:aspect-[16/10]">
            <iframe
              src={TOUR_360_URL}
              title="360° tour of Abhishta Agri Farm Stay"
              loading="lazy"
              allow="fullscreen; gyroscope; accelerometer"
              className="absolute inset-0 size-full"
              tabIndex={tourActive ? 0 : -1}
            />
            {tourActive ? null : (
              <button
                type="button"
                onClick={() => setTourActive(true)}
                className="group absolute inset-0 grid place-items-center bg-black/25 transition-colors duration-500 hover:bg-black/10"
              >
                <span className="inline-flex min-h-[48px] items-center gap-s8 rounded-full bg-paper px-s21 text-[15px] font-medium text-forest shadow-float transition-transform duration-500 group-hover:scale-[1.04]">
                  <Icon360 size={22} className="text-farm" />
                  Start the 360° view
                </span>
              </button>
            )}
          </div>
          <CircularText
            text="drag to explore · 360° · drag to explore · 360° · "
            size={130}
            className="absolute -top-s34 -left-s21 rounded-full bg-forest text-gold ring-1 ring-gold/30 sm:-top-s55 sm:-left-s34"
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
    </div>
  );
}
