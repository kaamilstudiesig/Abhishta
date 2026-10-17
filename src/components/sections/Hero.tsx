"use client";

import { useEffect, useRef, useState } from "react";
import { SplitText } from "@/components/bits/SplitText";
import { buttonClass, container } from "@/components/ui";
import { IconPause, IconPlay } from "@/components/icons";
import { BOOKING_URL } from "@/lib/site";

const HEADLINE = "Escape the urban chaos and embrace serenity at Abhishta Agri Farm Stay.";

/**
 * Full-screen hero: the farm's countryside film under a flat neutral shade for
 * contrast, a small rule-and-name kicker, the headline, and one booking CTA.
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
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/45" />

      <div className={`${container} flex flex-1 flex-col justify-center pt-s89`}>
        <div aria-hidden="true" className="mb-s13 flex w-[128px] items-center">
          <span className="h-px flex-1 bg-paper/80" />
          <span className="grid size-[9px] place-items-center rounded-full border border-paper/80">
            <span className="size-[3px] rounded-full bg-paper" />
          </span>
        </div>
        <p className="font-display text-[clamp(15px,1.4vw,18px)] font-light tracking-[0.01em] text-paper/90">
          Abhishta Agri Farm Stay
        </p>
        <SplitText
          as="h1"
          trigger="load"
          delay={0.2}
          stagger={0.05}
          text={HEADLINE}
          className="mt-s13 max-w-[17ch] font-display text-[clamp(30px,3.6vw,50px)] leading-[1.15] font-light tracking-[-0.005em] text-balance"
        />
        <div className="mt-s34">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={buttonClass("gold", "px-s34")}>
            Check availability
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={togglePlayback}
        aria-label={playing ? "Pause background video" : "Play background video"}
        className="on-dark absolute right-s21 bottom-s21 z-10 grid size-[44px] place-items-center rounded-full border-[1.5px] border-paper/40 text-paper transition-colors duration-300 hover:bg-paper/15 max-sm:top-[96px] max-sm:bottom-auto sm:right-auto sm:left-s34"
      >
        {playing ? <IconPause size={18} /> : <IconPlay size={18} />}
      </button>
    </section>
  );
}
