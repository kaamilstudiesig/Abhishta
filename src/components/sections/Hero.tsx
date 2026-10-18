"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { whenIntroDone } from "@/lib/intro";
import { SplitText } from "@/components/bits/SplitText";
import { container } from "@/components/ui";
import { IconArrow, IconPause, IconPlay } from "@/components/icons";
import { BOOKING_URL } from "@/lib/site";

/**
 * Full-screen hero, editorial and quiet: the farm's own film under one flat
 * shade, an oversized thin serif headline in two offset lines ("Beloved /
 * Countryside" — what Abhishta means), one serif subline and one booking CTA.
 * They enter in sequence as the intro veil lifts (headline lines through a clip
 * mask → subline → CTA, ~1.2s).
 */
export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  // A muted decorative loop: stop it for reduced motion (the poster stays), and offer a pause control.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (motion.matches) video.pause();
      else void video.play().catch(() => {});
    };
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  // Staged entrance after the intro veil; headline lines are handled by SplitText.
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = contentRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [subline, cta] = root.querySelectorAll<HTMLElement>("[data-hero-reveal]");
    let tl: gsap.core.Timeline | null = null;
    const stop = whenIntroDone(() => {
      tl = gsap
        .timeline({ defaults: { ease: "power3.out", duration: 0.8 } })
        .from(subline, { opacity: 0, y: 13 }, 0.7)
        .from(cta, { opacity: 0, y: 13 }, 0.85);
    });
    return () => {
      stop();
      tl?.kill();
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  return (
    <section
      id="top"
      data-nav="dark"
      data-snap=""
      className="relative isolate flex h-svh min-h-[560px] flex-col bg-ink text-paper"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 -z-10 size-full object-cover"
        src="/videos/hero-background.mp4"
        poster="/images/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {/* one flat, light shade for legibility — no gradient wash over the film */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/30" />

      <div ref={contentRef} className={`${container} flex flex-1 flex-col justify-center pt-s89 pb-s55`}>
        <h1 className="hero-display text-[clamp(34px,9.2vw,148px)] leading-[0.95] tracking-[0.005em] uppercase">
          <SplitText as="span" trigger="intro" by="lines" delay={0.1} text="Beloved" className="block" />
          <SplitText
            as="span"
            trigger="intro"
            by="lines"
            delay={0.25}
            text="Countryside"
            className="block md:pr-[4vw] md:text-right"
          />
        </h1>
        <div className="mt-s55 self-end md:mr-[calc(4vw+8%)] md:w-[min(26em,40%)]">
          <p data-hero-reveal="" className="font-display text-[clamp(17px,1.4vw,20px)] leading-[1.45] text-paper/90">
            Escape the urban chaos and embrace serenity at Abhishta Agri Farm Stay, ninety kilometres from Bangalore.
          </p>
          <div data-hero-reveal="" className="mt-s34 flex items-stretch gap-[6px]">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-stretch gap-[6px] text-[15px] font-medium text-forest"
            >
              <span className="grid min-h-[44px] place-items-center rounded-[4px] bg-paper px-s21 transition-colors duration-300 group-hover:bg-gold-soft">
                Check availability
              </span>
              <span
                aria-hidden="true"
                className="grid w-[44px] place-items-center rounded-[4px] bg-paper transition-[background-color,translate] duration-300 group-hover:translate-x-[3px] group-hover:bg-gold-soft"
              >
                <IconArrow size={18} />
              </span>
            </a>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={togglePlayback}
        aria-label={playing ? "Pause background video" : "Play background video"}
        className="on-dark absolute right-s21 bottom-s21 z-10 grid size-[44px] place-items-center rounded-full border border-paper/25 text-paper/70 transition-colors duration-300 hover:border-paper/60 hover:text-paper max-sm:top-[96px] max-sm:bottom-auto sm:right-auto sm:left-s34"
      >
        {playing ? <IconPause size={16} /> : <IconPlay size={16} />}
      </button>
    </section>
  );
}
