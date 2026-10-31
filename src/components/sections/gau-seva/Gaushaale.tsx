"use client";

import { useState } from "react";
import { TourViewer } from "@/components/TourViewer";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";
import {
  COW_VIEWS,
  GAU_SEVA_ENQUIRY,
} from "@/components/sections/living-farm/farm";

/**
 * #the-gaushaale — on the sage band. On large screens a live 360° of the
 * gaushaale runs from the screen's left edge to the middle; beside it, the
 * four views as a list (Gir cows, the Hallikar stall, Holstein Friesians
 * resting, the cow cuddling pen) and one enquiry button. Phones: the view on
 * top, the views as pills.
 */
export function Gaushaale() {
  const [view, setView] = useState(0);
  const count = COW_VIEWS.length;
  const current = COW_VIEWS[view];

  return (
    <section
      id="the-gaushaale"
      data-nav="light"
      data-snap=""
      className={`overflow-hidden bg-gold-soft ${screen}`}
    >
      {/* large screens: the view bleeds to the left and bottom edges; it starts below the navbar */}
      <div className="lg:absolute lg:top-[80px] lg:bottom-0 lg:left-0 lg:w-[calc(50%-21px)]">
        <div className={`${container} lg:h-full lg:max-w-none lg:px-0`}>
          <TourViewer
            tour={current.tour}
            title={current.title}
            caption={`${current.name}, ${view + 1} of ${count}`}
            tone="light"
            bleed
            onPrev={() => setView((view - 1 + count) % count)}
            onNext={() => setView((view + 1) % count)}
            prevLabel="Previous view of the gaushaale"
            nextLabel="Next view of the gaushaale"
            className="h-[clamp(180px,30svh,340px)] rounded-card sm:h-[38svh] lg:h-full lg:rounded-none lg:rounded-tr-card"
          />
        </div>
      </div>

      <div
        className={`${container} mt-s21 short:mt-s13 lg:mt-0 lg:grid lg:grid-cols-2 lg:gap-s55`}
      >
        <div className="lg:col-start-2">
          <SectionHeader
            title="Look around the gaushaale"
            lead="Drag the view to look around, or pick a spot."
            leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
          />

          <ul
            aria-label="Views of the gaushaale"
            className="-mx-s21 mt-s21 flex gap-s8 overflow-x-auto px-s21 py-[2px] [scrollbar-width:none] sm:-mx-s34 sm:px-s34 lg:mx-0 lg:mt-s34 lg:grid lg:gap-0 lg:overflow-visible lg:border-t lg:border-forest/15 lg:px-0 squat:mt-s21 [&::-webkit-scrollbar]:hidden"
          >
            {COW_VIEWS.map((v, i) => (
              <li key={v.name} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={view === i}
                  onClick={() => setView(i)}
                  className={`relative inline-flex min-h-[44px] items-center rounded-btn border px-s13 text-[15px] whitespace-nowrap transition-colors duration-300 lg:w-full lg:rounded-none lg:border-0 lg:border-b lg:border-forest/15 lg:px-0 lg:py-[10px] lg:text-left lg:font-display lg:text-[clamp(19px,1.7vw,24px)] lg:leading-[1.2] squat:py-[6px] ${
                    view === i
                      ? "border-forest bg-forest text-paper lg:bg-transparent lg:text-forest"
                      : "border-forest/25 text-forest/75 hover:text-forest lg:text-forest/55"
                  }`}
                >
                  {v.name}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-s21 lg:mt-s34 squat:mt-s21">
            <a
              href={GAU_SEVA_ENQUIRY}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("primary")}
            >
              Ask about gau seva
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
