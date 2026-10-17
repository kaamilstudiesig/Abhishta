"use client";

import { useEffect } from "react";

/**
 * One wheel gesture = one page. CSS scroll snapping (globals.css) defines the
 * pages — every [data-snap] element plus the end of the document — and handles
 * touch, keyboard and scrollbars natively. Mouse wheels and trackpads need help:
 * a small wheel step under mandatory snapping is pulled back to the same page,
 * and a trackpad's inertia can fling past several. So on wide, tall screens the
 * wheel is taken over: each gesture moves exactly one snap point, and the page
 * stays locked until that gesture has finished (no wheel events for a moment).
 */
const QUIET_MS = 180;
const SETTLE_MS = 750;

export function PageSnap() {
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px) and (min-height: 640px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lockedUntil = 0;
    let lastWheel = 0;
    let gestureUsed = false;

    const points = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const tops = Array.from(document.querySelectorAll<HTMLElement>("[data-snap]")).map(
        (el) => Math.round(el.getBoundingClientRect().top + window.scrollY),
      );
      return [...new Set([...tops, max])].filter((y) => y <= max).sort((a, b) => a - b);
    };

    const onWheel = (e: WheelEvent) => {
      if (!media.matches || e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      // leave open menus, dialogs and anything that scrolls on its own alone
      if (document.body.style.overflow === "hidden" || document.querySelector("dialog[open]")) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-own-scroll]")) return;

      e.preventDefault();
      const now = performance.now();
      const newGesture = now - lastWheel > QUIET_MS;
      lastWheel = now;
      if (newGesture) gestureUsed = false;
      if (gestureUsed || now < lockedUntil || Math.abs(e.deltaY) < 4) return;

      const y = window.scrollY;
      const list = points();
      const next =
        e.deltaY > 0 ? list.find((p) => p > y + 2) : [...list].reverse().find((p) => p < y - 2);
      gestureUsed = true;
      if (next === undefined) return;
      lockedUntil = now + SETTLE_MS;
      window.scrollTo({ top: next, behavior: reduce.matches ? "auto" : "smooth" });
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return null;
}
