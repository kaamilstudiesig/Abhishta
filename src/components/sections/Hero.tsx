"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { whenIntroDone } from "@/lib/intro";
import { SplitText } from "@/components/bits/SplitText";
import { buttonClass, container } from "@/components/ui";
import { IconPause, IconPlay } from "@/components/icons";
import { BOOKING_URL } from "@/lib/site";

const HEADLINE = "Escape the urban chaos and embrace serenity at Abhishta Agri Farm Stay.";

/**
 * Full-screen hero: the farm's countryside film under a flat shade for contrast,
 * then one kicker, one headline, one short subline and one booking CTA. They
 * enter in sequence as the intro veil lifts (kicker → headline lines through a
 * clip mask → subline → CTA, ~1.2s).
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
    const [kicker, subline, cta] = root.querySelectorAll<HTMLElement>("[data-hero-reveal]");
    let tl: gsap.core.Timeline | null = null;
    const stop = whenIntroDone(() => {
      tl = gsap
        .timeline({ defaults: { ease: "power3.out", duration: 0.8 } })
        .from(kicker, { opacity: 0, y: 13 }, 0)
        .from(subline, { opacity: 0, y: 13 }, 0.6)
        .from(cta, { opacity: 0, y: 13 }, 0.75);
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
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-forest/55" />

      <div ref={contentRef} className={`${container} flex flex-1 flex-col justify-end pt-s144 pb-s144`}>
        <div data-hero-reveal="">
          <div aria-hidden="true" className="mb-s13 flex w-[89px] items-center">
            <span className="h-px flex-1 bg-gold" />
            <span className="grid size-[9px] place-items-center rounded-full border border-gold">
              <span className="size-[3px] rounded-full bg-gold" />
            </span>
          </div>
          <p className="font-display text-[clamp(15px,1.3vw,17px)] tracking-[0.01em] text-paper/85">
            Abhishta Agri Farm Stay
          </p>
        </div>
        <SplitText
          as="h1"
          trigger="intro"
          by="lines"
          delay={0.12}
          stagger={0.1}
          text={HEADLINE}
          className="mt-s21 max-w-[18ch] font-display text-[clamp(38px,5vw,72px)] leading-[1.06] font-semibold tracking-[-0.02em] text-balance"
        />
        <p data-hero-reveal="" className="mt-s21 max-w-[30em] text-paper/80">
          Ninety kilometres from Bangalore, on the red earth of Kunigal.
        </p>
        <div data-hero-reveal="" className="mt-s34">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={buttonClass("gold", "px-s34")}>
            Check availability
          </a>
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
