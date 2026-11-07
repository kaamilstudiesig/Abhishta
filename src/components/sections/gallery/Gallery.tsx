"use client";

import { useEffect, useRef, useState } from "react";
import { DriftWall, type DriftWallItem } from "@/components/bits/DriftWall";
import { BEAUTY, MOMENTS } from "./photos";
import { glass } from "@/components/bits/glass";
import { GlassFill } from "@/components/bits/LiquidGlass";
import { IconClose } from "@/components/icons";

/** how long the title card stays before it fades on its own */
const TITLE_MS = 2600;

/**
 * /gallery (client, 2026-11-07): two one-screen drifting photo walls, one after
 * the other — #beauty (the property, its buildings and grounds) and #moments
 * (events, groups and guests). Each wall is a React Bits DriftWall (flat): grab
 * any column and drag it up or down; let go and it drifts on. Hover a photo to
 * read its caption; click to see it large.
 */
export function Gallery() {
  return (
    <>
      <h1 className="sr-only">Gallery</h1>
      <GalleryWall id="beauty" title="The Beauty of Abhishta" lead="Property, infrastructure & surroundings" items={BEAUTY} />
      <GalleryWall id="moments" title="Moments at Abhishta" lead="Events, activities & guest experiences" items={MOMENTS} />
    </>
  );
}

/**
 * One full-screen wall. Its title card pops up in the middle when the wall
 * comes into view, then fades after a moment (or at once when it's closed or
 * the wall is touched); it doesn't come back.
 */
function GalleryWall({ id, title, lead, items }: { id: string; title: string; lead: string; items: DriftWallItem[] }) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"hidden" | "shown" | "gone">("hidden");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setState((s) => (s === "hidden" ? "shown" : s));
        timer = window.setTimeout(() => setState("gone"), TITLE_MS);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);
  const dismiss = () => setState("gone");

  return (
    <section ref={ref} id={id} aria-labelledby={`${id}-title`} data-nav="light" data-snap="" className="relative isolate h-svh min-h-[560px] overflow-hidden bg-paper">
      <h2 id={`${id}-title`} className="sr-only">{title}</h2>
      <div className="absolute inset-0" onPointerDown={dismiss}>
        <DriftWall items={items} label={title} columns={4} speed={19} gap="gap-s34" className="absolute inset-0 hidden px-s55 lg:block" />
        <DriftWall items={items} label={title} columns={3} speed={16} gap="gap-s21" className="absolute inset-0 hidden px-s34 sm:block lg:hidden" />
        <DriftWall items={items} label={title} columns={2} speed={15} gap="gap-s21" className="absolute inset-0 px-s21 sm:hidden" />
      </div>

      {/* the title: pops up as the wall comes into view, then fades */}
      <div
        className={`pointer-events-none absolute inset-0 z-20 grid place-items-center px-s21 ${state === "gone" ? "invisible delay-700" : ""}`}
        aria-hidden={state === "gone" || undefined}
      >
        <div
          className={`relative rounded-card px-s34 pt-[52px] pb-s21 text-center ${glass()} transition-[opacity,scale] ease-[var(--ease-earth)] motion-reduce:transition-none sm:px-s55 sm:pt-s34 sm:pb-s34 ${
            state === "shown" ? "pointer-events-auto scale-100 opacity-100 duration-500" : state === "gone" ? "scale-[0.98] opacity-0 duration-700" : "scale-[0.9] opacity-0 duration-0"
          }`}
        >
          {/* frosted, milky glass here so the title reads over the moving photos */}
          <GlassFill blur={18} saturation={1.1} fill="bg-white/75" />
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close the title"
            className="absolute top-[6px] right-[6px] z-10 grid size-[44px] place-items-center rounded-full text-forest transition-colors duration-300 hover:bg-forest/10"
          >
            <IconClose size={20} />
          </button>
          <p aria-hidden="true" className="relative font-display text-[clamp(30px,4.6vw,58px)] leading-[1] text-forest">{title}</p>
          <p className="relative mt-s8 text-[15px] text-ink-muted">{lead}</p>
        </div>
      </div>
    </section>
  );
}
