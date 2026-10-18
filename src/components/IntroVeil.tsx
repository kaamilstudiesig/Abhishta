"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import logo from "@/assets/brand/logo.png";
import { markIntroDone } from "@/lib/intro";

const SAFETY_MS = 3800;

/**
 * Page-load intro: a field-white veil on which the farm's own logo (trimmed,
 * centred, in colour) is wiped in from the ground up, holds for a breath, then
 * the veil lifts away while the hero enters beneath it.
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
    const mark = veil.querySelector("[data-veil-logo]");
    const tl = gsap.timeline({ onComplete: finish });
    tl.fromTo(
      mark,
      { clipPath: "inset(100% 0% 0% 0%)", scale: 0.96, opacity: 1 },
      { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.1, ease: "power3.out" },
    )
      .to(mark, { opacity: 0, y: -13, duration: 0.5, ease: "power2.in" }, "+=0.5")
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
      className="intro-veil fixed inset-0 z-[100] items-center justify-center bg-paper"
    >
      <div data-veil-logo="" className="[clip-path:inset(100%_0%_0%_0%)]">
        <Image src={logo} alt="" preload className="h-auto w-[min(62vw,280px)]" />
      </div>
    </div>
  );
}
