"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

const ease = (t: number) => 1 - Math.pow(1 - t, 4);
const GESTURE_GAP_MS = 260; // a new free gesture starts after this long without events
const MIN_KICK = 8; // momentum tails are tiny deltas; a real flick starts bigger
const COOLDOWN_MS = 380; // after a programmatic glide, swallow leftover momentum
const SWALLOW_GAP_MS = 700; // a paged gesture is only over after a long silence…
const ACCEL = 1.35; // …or once the deltas grow again (a new swipe), since momentum only decays

/**
 * Smooth scrolling with snapping that never fights it.
 *
 * - Lenis scrolls freely and smoothly everywhere. Nothing hijacks the wheel
 *   in general, so trackpad momentum just glides.
 * - Once a free scroll has fully stopped, the page settles onto a section:
 *   a short scroll (under half a screen) moves on to the next section in the
 *   direction you scrolled; a longer one lands on the nearest section. It only
 *   acts as Lenis comes to rest, so it continues the glide rather than fighting
 *   it. The footer is free (a scroll from above that only just overshoots the
 *   last page lands on that page).
 * - Only the "day on the farm" card stack pages strictly, as asked: inside it
 *   one wheel gesture moves exactly one card, the rest of that gesture
 *   (including trackpad momentum) is swallowed, and a free fast scroll can't
 *   fly through the stack — it lands on the first or last card on entry.
 * - Page Down / Page Up / Space step page by page (native elsewhere).
 *
 * Touch devices never start Lenis: they scroll natively with CSS mandatory
 * snapping (one page per swipe). With prefers-reduced-motion none of this
 * starts either (globals.css handles both).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Lenis is for mouse and trackpad only; touch screens scroll natively with CSS snapping.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const top = (el: Element) => Math.round(el.getBoundingClientRect().top + window.scrollY);
    const pages = () => Array.from(document.querySelectorAll("[data-snap]"), top).sort((a, b) => a - b);
    const stackPages = () => Array.from(document.querySelectorAll("[data-stack-page]"), top).sort((a, b) => a - b);
    const blocked = () => document.body.style.overflow === "hidden" || !!document.querySelector("dialog[open]");

    let lastWheel = 0;
    let lastAbs = 0;
    let swallow = false; // rest of a gesture that already paged
    let paging = false;
    let coolUntil = 0;
    let anchor = 0; // scroll position where the current free gesture began
    let pending = false; // a free gesture needs settling once motion stops
    let pendingDir = 1;

    const go = (y: number) => {
      pending = false;
      paging = true;
      instance.scrollTo(y, {
        duration: 0.9,
        easing: ease,
        lock: true,
        onComplete: () => {
          paging = false;
          coolUntil = performance.now() + COOLDOWN_MS;
        },
      });
    };

    const settle = () => {
      const list = pages();
      const y = window.scrollY;
      const last = list[list.length - 1];
      if (y > last + 4) {
        // Footer: free — unless a scroll from higher up just overshot the last page a little.
        if (anchor < last - 2 && y - last < window.innerHeight * 0.5) go(last);
        return;
      }
      if (list.some((p) => Math.abs(p - y) <= 2)) return; // already on a page
      const nearest = list.reduce((a, c) => (Math.abs(c - y) < Math.abs(a - y) ? c : a));
      const dist = y - anchor;
      let dest = nearest;
      if (Math.abs(dist) > 16 && Math.abs(dist) < window.innerHeight * 0.5) {
        const onward =
          pendingDir > 0 ? list.find((p) => p > anchor + 2) : [...list].reverse().find((p) => p < anchor - 2);
        if (onward !== undefined) dest = onward;
      }
      go(dest);
    };

    const instance = new Lenis({
      duration: 1.1,
      easing: ease,
      autoRaf: false,
      anchors: true,
      virtualScroll: ({ deltaY, event }) => {
        if (event.type !== "wheel") return true;
        // Taking over a wheel event must also cancel the browser's native scroll for it:
        // Lenis skips its own preventDefault when this hook says no, and a native scroll
        // running underneath a Lenis glide is exactly the "fighting" feel.
        const veto = () => {
          if (event.cancelable) event.preventDefault();
          return false;
        };
        if (blocked()) return veto();
        if ((event as WheelEvent).ctrlKey || deltaY === 0) return true;

        const now = performance.now();
        const gap = now - lastWheel;
        const abs = Math.abs(deltaY);
        const fresh = gap > GESTURE_GAP_MS;
        lastWheel = now;
        // A gesture that paged keeps being swallowed through its momentum tail
        // (which only ever decays), even if the event stream stutters under load.
        if (swallow && !paging && (gap > SWALLOW_GAP_MS || abs > lastAbs * ACCEL + 2)) swallow = false;
        lastAbs = abs;
        if (paging || swallow || now < coolUntil) return veto();

        const cards = stackPages();
        if (cards.length < 2) return true;
        const first = cards[0];
        const last = cards[cards.length - 1];
        const y = window.scrollY;
        const dir = deltaY > 0 ? 1 : -1;
        const inside = y >= first - 2 && y <= last + 2;

        // Inside the stack: one card per gesture.
        if (inside && ((dir > 0 && y < last - 2) || (dir < 0 && y > first + 2))) {
          if (Math.abs(deltaY) < MIN_KICK) return veto(); // momentum tail, not a new intent
          const next = dir > 0 ? cards.find((c) => c > y + 2) : [...cards].reverse().find((c) => c < y - 2);
          swallow = true;
          if (next !== undefined) go(next);
          return veto();
        }

        // Free scrolling elsewhere — but never fly through the stack: land on its edge card.
        const projected = instance.targetScroll + deltaY;
        if (dir > 0 && y < first - 2 && projected > first + 2) {
          swallow = true;
          go(first);
          return veto();
        }
        if (dir < 0 && y > last + 2 && projected < last - 2) {
          swallow = true;
          go(last);
          return veto();
        }
        if (fresh || !pending) anchor = y;
        pending = true;
        pendingDir = dir;
        return true;
      },
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || blocked() || paging) return;
      if ((e.target as HTMLElement | null)?.closest("input, textarea, select, [contenteditable], iframe")) return;
      const down = e.key === "PageDown" || (e.key === " " && !e.shiftKey);
      const up = e.key === "PageUp" || (e.key === " " && e.shiftKey);
      if (!down && !up) return;
      const list = pages();
      const y = window.scrollY;
      if (y > list[list.length - 1] + 4 && down) return; // footer: native
      const next = down ? list.find((p) => p > y + 2) : [...list].reverse().find((p) => p < y - 2);
      if (next === undefined) return;
      e.preventDefault();
      go(next);
    };

    instance.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => {
      instance.raf(time * 1000);
      // settle only after the wheel has gone quiet and Lenis has come to rest
      // (or is merely drifting), so the settle continues the glide as one motion
      if (
        pending &&
        !paging &&
        performance.now() - lastWheel > 140 &&
        (!instance.isScrolling || Math.abs(instance.velocity) < 0.8)
      ) {
        pending = false;
        settle();
      }
    };
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
