"use client";

import { useState } from "react";
import { TourViewer } from "@/components/TourViewer";
import { container } from "@/components/ui";
import { ATLAS } from "./atlas";

/**
 * #top — the 360° atlas: one live view of the farm fills the screen, with the
 * title over a soft top shade and a row of place pills near the bottom. Each
 * pill (or the view's arrows) turns the same view to that place; dragging looks
 * around. The overlay lets pointer events through except on its pills.
 */
export function AtlasHero() {
  const [i, setI] = useState(0);
  const count = ATLAS.length;
  const place = ATLAS[i];

  return (
    <section id="top" data-nav="dark" data-snap="" className="on-dark relative isolate h-svh min-h-[560px] overflow-hidden bg-forest text-paper">
      <div className="absolute inset-0">
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
      </div>
      {/* a soft shade behind the title only */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[62%] bg-[linear-gradient(to_bottom,rgb(0_0_0/0.6),rgb(0_0_0/0.35)_55%,transparent)]" />

      <div className={`${container} pointer-events-none relative flex h-full flex-col justify-between pt-[108px] pb-[112px] md:pt-[128px] md:pb-[84px]`}>
        <div>
          <h1 className="hero-display max-w-[11em] text-[clamp(40px,6.4vw,96px)] leading-[0.95]">See the whole farm in 360°</h1>
          <p className="mt-s13 max-w-[28em] text-[clamp(16px,1.4vw,19px)] leading-[1.45] font-medium text-paper/90 md:mt-s21">
            Drag to look around, or pick a place below. Everything here is the real farm.
          </p>
        </div>

        <nav aria-label="Places on the farm" className="pointer-events-auto">
          <ul className="-mx-s21 flex gap-s8 overflow-x-auto px-s21 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            {ATLAS.map((a, n) => (
              <li key={a.name} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={n === i}
                  onClick={() => setI(n)}
                  className={`min-h-[40px] rounded-btn px-s13 text-[14px] font-medium backdrop-blur-[3px] transition-colors duration-300 sm:px-s21 sm:text-[15px] ${
                    n === i ? "bg-paper text-forest" : "bg-ink/40 text-paper hover:bg-ink/60"
                  }`}
                >
                  {a.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
