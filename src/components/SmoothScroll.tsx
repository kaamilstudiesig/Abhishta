"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

const QUIET_MS = 180; // a wheel gesture ends after this long without events
const ease = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Smooth scrolling (Lenis, driven by GSAP's ticker and feeding ScrollTrigger)
 * with page-by-page navigation on desktop:
 *
 * - One wheel/trackpad gesture — or Page Down/Up, ↓/↑, Space — glides to the
 *   next or previous page ([data-snap] element) and holds there until the next
 *   gesture, so a trackpad's inertia can never fling past a page.
 * - Past the last page (the footer) scrolling is free and smooth: no snapping.
 *
 * Touch devices keep native scrolling with gentle CSS proximity snapping, and
 * with prefers-reduced-motion none of this starts (globals.css handles both).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastWheel = 0;
    let gestureUsed = false;
    let paging = false;

    const blocked = () =>
      document.body.style.overflow === "hidden" || !!document.querySelector("dialog[open]");

    const points = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-snap]"))
        .map((el) => Math.round(el.getBoundingClientRect().top + window.scrollY))
        .sort((a, b) => a - b);

    // Decide where a step in `dir` goes; null means "scroll freely" (footer zone).
    const target = (dir: 1 | -1, y: number): number | null | undefined => {
      const list = points();
      const last = list[list.length - 1];
      if (dir > 0 && y >= last - 2) return null; // from the last page down into the footer
      if (y > last + 2) {
        // in the footer: scroll freely, but come back to the last page once close to it
        return dir < 0 && y - last < window.innerHeight * 0.6 ? last : null;
      }
      return dir > 0 ? list.find((p) => p > y + 2) : [...list].reverse().find((p) => p < y - 2);
    };

    const instance = new Lenis({
      duration: 1.2,
      easing: ease,
      autoRaf: false,
      anchors: true,
      virtualScroll: ({ deltaY, event }) => {
        if (event.type !== "wheel") return true;
        if (blocked()) return false;
        if ((event as WheelEvent).ctrlKey || Math.abs(deltaY) < 1) return true;
        const now = performance.now();
        if (now - lastWheel > QUIET_MS) gestureUsed = false;
        lastWheel = now;
        if (paging) return false;
        const dest = target(deltaY > 0 ? 1 : -1, window.scrollY);
        if (dest === null) return true; // footer zone: let Lenis glide freely
        if (gestureUsed) return false;
        gestureUsed = true;
        if (dest !== undefined) go(dest);
        return false;
      },
    });

    const go = (y: number) => {
      paging = true;
      instance.scrollTo(y, { duration: 1.1, easing: ease, lock: true, onComplete: () => (paging = false) });
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || blocked()) return;
      const el = e.target as HTMLElement | null;
      if (el?.closest("input, textarea, select, [contenteditable], [role=region], iframe")) return;
      const down = ["PageDown", "ArrowDown"].includes(e.key) || (e.key === " " && !e.shiftKey);
      const up = ["PageUp", "ArrowUp"].includes(e.key) || (e.key === " " && e.shiftKey);
      if (!down && !up) return;
      const dest = target(down ? 1 : -1, window.scrollY);
      if (dest === null) return; // footer: native keyboard scrolling
      e.preventDefault();
      if (dest !== undefined && !paging) go(dest);
    };

    instance.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    window.addEventListener("keydown", onKey);

    // Lenis is an external system created on mount; exposing the instance is the point of this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance);

    return () => {
      window.removeEventListener("keydown", onKey);
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
