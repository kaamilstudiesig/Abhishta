"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { TourViewer } from "@/components/TourViewer";
import { Icon360 } from "@/components/icons";
import { container } from "@/components/ui";
import { ATLAS } from "./atlas";
import { glass } from "@/components/bits/glass";
import { GlassFill } from "@/components/bits/LiquidGlass";

/** the title shows for at least this long before it may fade */
const MIN_SHOWN_MS = 4000;
/** after this long without touching the view, the title comes back */
const IDLE_MS = 6000;

/**
 * #top — the 360° atlas: one live view of the farm fills the screen, with the
 * title over a soft top shade and a row of place pills near the bottom. Each
 * pill (or the view's arrows) turns the same view to that place.
 *
 * Once someone starts looking around, the title fades out of the way (never
 * before it has shown for a few seconds) and fades back after a pause.
 * On touch screens the view would swallow every swipe and trap the page, so
 * it starts behind a clear layer that lets the page scroll: "Tap to look
 * around" lifts it, and "Done" (or a minute idle) puts it back.
 */
const COARSE = "(pointer: coarse)";
const isCoarse = () => window.matchMedia(COARSE).matches;
const onCoarseChange = (cb: () => void) => {
  const mq = window.matchMedia(COARSE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function AtlasHero() {
  const [i, setI] = useState(0);
  const count = ATLAS.length;
  const place = ATLAS[i];

  const touch = useSyncExternalStore(onCoarseChange, isCoarse, () => false);
  const [exploring, setExploring] = useState(false); // touch: the layer is lifted
  const [quiet, setQuiet] = useState(false); // the title is faded out
  const mountedAt = useRef(0);
  const idle = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
    return () => {
      if (idle.current) clearTimeout(idle.current);
    };
  }, []);

  // someone is using the view: fade the title (after it has shown for a while), and bring it back after a pause
  const used = () => {
    const wait = Math.max(0, MIN_SHOWN_MS - (Date.now() - mountedAt.current));
    if (idle.current) clearTimeout(idle.current);
    const hide = () => {
      setQuiet(true);
      idle.current = setTimeout(() => {
        setQuiet(false);
        if (touch) setExploring(false);
      }, touch ? 60000 : IDLE_MS);
    };
    if (wait) idle.current = setTimeout(hide, wait);
    else hide();
  };

  const stop = () => {
    if (idle.current) clearTimeout(idle.current);
    setExploring(false);
    setQuiet(false);
  };

  return (
    <section id="top" data-nav="dark" data-snap="" className="on-dark relative isolate h-svh min-h-[560px] overflow-hidden bg-forest text-paper">
      <div className="absolute inset-0" onPointerDown={used} onWheel={used}>
        <TourViewer
          tour={place.tour}
          title={`360° view of the farm: ${place.name.toLowerCase()}`}
          caption={place.name}
          tone="dark"
          bleed
          onPrev={() => setI((i - 1 + count) % count)}
          onNext={() => setI((i + 1) % count)}
          prevLabel="Previous place"
          nextLabel="Next place"
          className="h-full"
        />
        {/* touch screens: a clear layer over the view so swipes scroll the page until someone chooses to look around */}
        {touch && !exploring ? (
          <button
            type="button"
            onClick={() => {
              setExploring(true);
              used();
            }}
            className="absolute inset-0 z-20 flex touch-pan-y items-center justify-center"
            aria-label="Look around the farm in 360°"
          >
            <span className={`relative mt-[18svh] inline-flex items-center gap-s8 rounded-full px-s21 py-s13 text-[15px] font-medium text-paper ${glass("dark")}`}>
              <GlassFill />
              <Icon360 size={20} /> Tap to look around
            </span>
          </button>
        ) : null}
      </div>

      {/* a soft shade behind the title, fading with it */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-[62%] bg-[linear-gradient(to_bottom,rgb(0_0_0/0.6),rgb(0_0_0/0.35)_55%,transparent)] transition-opacity duration-700 ${quiet ? "opacity-0" : "opacity-100"}`}
      />

      <div className={`${container} pointer-events-none relative flex h-full flex-col justify-between pt-[108px] pb-[112px] md:pt-[128px] md:pb-[84px]`}>
        <div
          className={`transition-[opacity,translate] duration-700 ease-[var(--ease-earth)] motion-reduce:transition-none ${quiet ? "-translate-y-s13 opacity-0" : "opacity-100"}`}
          aria-hidden={quiet || undefined}
        >
          <h1 className="hero-display max-w-[11em] text-[clamp(40px,6.4vw,96px)] leading-[0.95]">See the whole farm in 360°</h1>
          <p className="mt-s13 max-w-[28em] text-[clamp(16px,1.4vw,19px)] leading-[1.45] font-medium text-paper/90 md:mt-s21">
            Drag to look around, or pick a place below. Everything here is the real farm.
          </p>
        </div>

        <div className="pointer-events-auto">
          {touch && exploring ? (
            <button
              type="button"
              onClick={stop}
              className="mb-s13 inline-flex min-h-[40px] items-center rounded-btn bg-paper px-s21 text-[15px] font-medium text-forest"
            >
              Done looking around
            </button>
          ) : null}
          <nav aria-label="Places on the farm">
            <ul className="-mx-s21 flex gap-s8 overflow-x-auto px-s21 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
              {ATLAS.map((a, n) => (
                <li key={a.name} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={n === i}
                    onClick={() => {
                      setI(n);
                      used();
                    }}
                    className={`relative min-h-[40px] rounded-full px-s13 text-[14px] font-medium transition-colors duration-300 sm:px-s21 sm:text-[15px] ${
                      n === i ? "bg-paper text-forest shadow-card" : `text-paper hover:bg-white/20 ${glass("dark")}`
                    }`}
                  >
                    {n === i ? null : <GlassFill />}
                    {a.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
