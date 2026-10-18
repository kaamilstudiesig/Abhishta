"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { markIntroDone } from "@/lib/intro";

const SAFETY_MS = 3800;

/**
 * Page-load intro: a deep-grove veil with the Abhishta wordmark settles in,
 * holds for a breath, then lifts away while the hero enters beneath it.
 *
 * It can never trap the visitor: the sequence is time-based (it never waits on
 * the video or images), a safety timer dismisses it regardless, CSS hides it
 * without JavaScript or after 6s even if scripts stall, and with reduced
 * motion it is skipped entirely.
 */
export function IntroVeil() {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const veil = ref.current;
    if (!veil) return;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      document.body.style.overflow = "";
      markIntroDone();
      setGone(true);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    document.body.style.overflow = "hidden";
    const letters = veil.querySelectorAll("[data-veil-letter]");
    const tl = gsap.timeline({ onComplete: finish });
    tl.fromTo(
      letters,
      { yPercent: 60, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.045 },
    )
      .to(veil.querySelector("[data-veil-word]"), { opacity: 0, y: -13, duration: 0.5, ease: "power2.in" }, "+=0.45")
      .to(veil, { yPercent: -100, duration: 1, ease: "power3.inOut" }, "-=0.15")
      // the hero starts entering as the veil begins to lift
      .add(markIntroDone, "<0.25");

    const safety = window.setTimeout(() => {
      tl.kill();
      finish();
    }, SAFETY_MS);
    return () => {
      window.clearTimeout(safety);
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="intro-veil fixed inset-0 z-[100] items-center justify-center bg-forest text-paper"
    >
      <p
        data-veil-word=""
        translate="no"
        className="flex overflow-hidden font-display text-[clamp(55px,9vw,120px)] leading-none font-light tracking-[-0.03em]"
      >
        {"Abhishta".split("").map((c, i) => (
          <span key={i} data-veil-letter="" className="inline-block pb-[0.08em] opacity-0">
            {c}
          </span>
        ))}
      </p>
    </div>
  );
}
