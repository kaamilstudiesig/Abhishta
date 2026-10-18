"use client";

import { useEffect, useRef, useState } from "react";
import { CircularText } from "@/components/bits/CircularText";
import { Icon360, IconClose, IconPlay } from "@/components/icons";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";
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
          title="See the farm before you set out"
          lead="Turn slowly through the cottages, the dining hall and the pool, or watch the short film of how Abhishta began."
        >
          <button type="button" onClick={() => setVideoOpen(true)} className={buttonClass("ghost-light", "mt-s21 md:mt-s34")}>
            <IconPlay size={16} />
            Watch our story
          </button>
        </SectionHeader>

        <div className="relative">
          <div className="relative aspect-[16/11] overflow-hidden rounded-card bg-forest ring-1 ring-paper/10 sm:aspect-[16/10]">
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
