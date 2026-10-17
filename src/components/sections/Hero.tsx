"use client";

import { useEffect, useRef, useState } from "react";
import { SplitText } from "@/components/bits/SplitText";
import { GradualBlur } from "@/components/bits/GradualBlur";
import { useLenis } from "@/components/SmoothScroll";
import { AvailabilityBar } from "@/components/sections/AvailabilityBar";
import { container } from "@/components/ui";
import { IconPause, IconPlay } from "@/components/icons";

const HEADLINE =
  "Escape the urban chaos and embrace serenity at Abhishta Agri Farm Stay, 90 km from Bangalore";

/**
 * Full-screen hero: the farm's own slow countryside film, a forest scrim for
 * guaranteed contrast, the headline set low-left, and the availability bar
 * docked across the bottom edge.
 *
 * Hero → About snap is done through Lenis (not CSS scroll-snap, which fights it):
 * while the scroll sits between the top and the About section, a downward
 * scroll glides to About and an upward one glides back to the top.
 */
export function Hero() {
  const lenis = useLenis();
  const snapping = useRef(false);
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

  useEffect(() => {
    if (!lenis) return;
    const about = document.getElementById("about");
    if (!about) return;

    const onScroll = ({ scroll, direction }: { scroll: number; direction: number }) => {
      if (snapping.current || direction === 0) return;
      const target = about.offsetTop;
      // Only snap when the hero fits one screen; on tall phone heroes the bar sits below the fold.
      if (target > window.innerHeight + 2) return;
      if (scroll <= 2 || scroll >= target - 2) return;
      snapping.current = true;
      lenis.scrollTo(direction > 0 ? target : 0, {
        duration: 1.3,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        lock: true,
        onComplete: () => {
          snapping.current = false;
        },
      });
    };
    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  return (
    <section id="top" data-nav="dark" className="relative z-10 isolate flex min-h-svh flex-col bg-forest text-paper md:block md:h-[calc(100svh-55px)] md:min-h-[600px]">
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
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,59,36,0.45)_0%,rgba(7,59,36,0.05)_30%,rgba(7,59,36,0.15)_55%,rgba(7,59,36,0.85)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_85%,rgba(7,59,36,0.55),transparent_60%)]"
      />

      <div className={`${container} flex flex-1 flex-col justify-end pt-s144 pb-s34 md:h-full md:pb-[110px]`}>
        <p className="eyebrow mb-s21 flex items-center gap-s13 text-gold">
          <span aria-hidden="true" className="h-[2px] w-s34 bg-gold" />
          Kunigal, Karnataka
        </p>
        <SplitText
          as="h1"
          trigger="load"
          delay={0.2}
          stagger={0.045}
          text={HEADLINE}
          className="max-w-[16ch] font-display text-[clamp(38px,6.2vw,72px)] leading-[1.05] font-light tracking-[-0.02em] text-balance [text-shadow:0_2px_34px_rgba(7,59,36,0.35)] sm:max-w-[19ch]"
        />
        <p className="mt-s21 max-w-[34em] text-[17px] text-paper/90">
          The air is clean here, and the only traffic is a bullock cart on the red earth.
        </p>
      </div>

      <button
        type="button"
        onClick={togglePlayback}
        aria-label={playing ? "Pause background video" : "Play background video"}
        className="on-dark absolute top-[96px] right-s21 z-10 grid size-[44px] place-items-center rounded-full border-[1.5px] border-paper/40 text-paper transition-colors duration-300 hover:bg-paper/15 sm:right-s34"
      >
        {playing ? <IconPause size={18} /> : <IconPlay size={18} />}
      </button>

      <GradualBlur position="bottom" height="144px" strength={0.8} />
      <div className="relative z-10 pb-s89 md:absolute md:inset-x-0 md:bottom-0 md:translate-y-1/2 md:pb-0">
        <div className={container}>
          <AvailabilityBar />
        </div>
      </div>
    </section>
  );
}
