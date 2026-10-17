"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

/**
 * Smooth scroll for the whole page. Lenis drives the scroll, GSAP's ticker drives
 * Lenis, and every Lenis scroll updates ScrollTrigger — so parallax and pinned
 * scenes stay in lock-step.
 *
 * Section snapping goes through Lenis Snap (CSS scroll-snap fights Lenis): every
 * [data-snap] section top is a proximity snap point, so the page settles onto a
 * section when you stop near one, while long pinned scenes still scroll freely.
 * With prefers-reduced-motion, none of this starts and the page scrolls natively.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      autoRaf: false,
      anchors: true,
    });
    instance.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const snap = new Snap(instance, {
      type: "proximity",
      distanceThreshold: "30%",
      debounce: 260,
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
    const removers = Array.from(document.querySelectorAll<HTMLElement>("[data-snap]")).map((el) =>
      snap.addElement(el, { align: "start" }),
    );

    // Lenis is an external system created on mount; exposing the instance is the point of this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance);

    return () => {
      removers.forEach((remove) => remove());
      snap.destroy();
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
