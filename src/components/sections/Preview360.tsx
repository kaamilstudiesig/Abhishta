"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
// To try the entrance instead: import cover from "@public/images/client-photos/tour-entrance-gate.webp" (and update the alt below).
import cover from "@public/images/client-photos/nests-hero-cottage-row.webp";
import { TourDialog } from "@/components/TourDialog";
import { CircularText } from "@/components/bits/CircularText";
import { glass } from "@/components/bits/glass";
import { GlassFill, LiquidGlass } from "@/components/bits/LiquidGlass";
import { Icon360, IconArrow, IconClose, IconPlay } from "@/components/icons";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";
import { STORY_VIDEO_URL } from "@/lib/site";

/**
 * Forest band under About: the story film (lightbox) and the virtual tour as a
 * still card (after thebierlibrary.in) — the cottage row under the palms.
 * Clicking it opens the tour in a pop-up (TourDialog; full screen on phones), so the section itself
 * never captures a drag or the wheel.
 * The card and its label bar are glasscn liquid-refract glass (GlassFill /
 * LiquidGlass): clear panes whose rims bend what is behind them.
 */
export function Preview360() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
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
      <div className={`${container} grid items-center gap-s34 short:gap-s21 md:gap-s55 lg:grid-cols-[1fr_1.618fr] lg:gap-s89`}>
        <SectionHeader
          tone="dark"
          titleClassName="max-sm:short:!text-[26px]"
          leadClassName="max-sm:short:mt-s13 max-sm:short:text-[15px] max-sm:short:leading-[1.5]"
          title="Explore Abhishta, From Wherever You Are"
          lead="Step into the world of Abhishta Agri Farm Stay through an immersive 360° virtual experience and discover the inspiration and journey behind the farm through our short film."
        >
          <button type="button" onClick={() => setVideoOpen(true)} className={buttonClass("ghost-light", "mt-s21 max-sm:short:mt-s13 md:mt-s34")}>
            <IconPlay size={16} />
            Watch
          </button>
        </SectionHeader>

        <div className="relative">
          {/* soft glows behind the glass, so the frosting has something to blur */}
          <span aria-hidden="true" className="pointer-events-none absolute -inset-s34 -z-0">
            <span className="absolute top-[8%] left-[4%] size-[46%] rounded-full bg-gold/35 blur-[60px]" />
            <span className="absolute right-[2%] bottom-[4%] size-[52%] rounded-full bg-water/40 blur-[70px]" />
          </span>
          <button
            type="button"
            onClick={() => setTourOpen(true)}
            aria-haspopup="dialog"
            aria-label="Open the 360° virtual tour"
            className={`group relative block w-full cursor-pointer overflow-hidden rounded-[28px] p-[10px] text-left transition-[background-color] duration-500 hover:bg-white/[0.06] ${glass("dark")} shadow-[0_28px_70px_-20px_rgb(0_0_0/0.5)]`}
          >
            <GlassFill />
            <span className="relative block aspect-[16/11] overflow-hidden rounded-[19px] sm:aspect-[16/10]">
              <Image
                src={cover}
                alt="A row of tiled-roof cottages with pillared verandas under coconut palms, beside a stone path through the garden"
                fill
                sizes="(min-width: 1024px) 55vw, 92vw"
                placeholder="blur"
                className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-earth)] group-hover:scale-[1.04]"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.55),transparent_55%)]" />
              <LiquidGlass
                as="span"
                className="absolute inset-x-s13 bottom-s13 flex items-center justify-between gap-s13 rounded-full bg-white/[0.08] py-[10px] pr-[10px] pl-s21 text-paper [text-shadow:0_1px_4px_rgb(0_0_0/0.6)] [--liquid-glass-rim-fade:8%] [--liquid-glass-rim-light:rgb(255_255_255/0.55)] [--liquid-glass-rim-width:1.5px] sm:inset-x-s21 sm:bottom-s21"
              >
                <span className="font-display text-[clamp(18px,1.8vw,24px)] leading-[1.1]">Virtual Tour</span>
                <span className="grid size-[40px] shrink-0 place-items-center rounded-full bg-paper text-forest transition-transform duration-300 group-hover:translate-x-[3px]">
                  <IconArrow size={18} />
                </span>
              </LiquidGlass>
            </span>
          </button>
          <CircularText
            text="virtual tour · 360° · virtual tour · 360° · "
            size={110}
            className="pointer-events-none absolute -top-s34 right-s13 origin-top-right scale-[0.78] rounded-full bg-forest text-gold sm:right-auto sm:-top-s55 sm:-left-s34 sm:scale-100"
          >
            <Icon360 size={34} className="text-paper" />
          </CircularText>
        </div>
      </div>

      <TourDialog open={tourOpen} onClose={() => setTourOpen(false)} />

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
