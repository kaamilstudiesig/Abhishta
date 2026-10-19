"use client";

import { useState } from "react";
import { TourViewer } from "@/components/TourViewer";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";
import { BREEDS, COW_VIEWS, GAU_SEVA_ENQUIRY } from "./farm";

/**
 * #gau-seva — the page's bold moment, on the sage band. On large screens a
 * live 360° of the gaushaale runs from the screen's left edge to the middle
 * (Gir cows, the Hallikar stall, Holstein Friesians resting, the cow cuddling
 * pen); beside it, the six breeds as a register — pick one to read the tour's
 * note on it — then gau seva and one enquiry button. Phones: the view on top.
 */
export function GauSeva() {
  const [view, setView] = useState(0);
  const [breed, setBreed] = useState(2); // Hallikar, the breed from this part of Karnataka
  const count = COW_VIEWS.length;
  const current = COW_VIEWS[view];

  return (
    <section id="gau-seva" data-nav="light" data-snap="" className={`overflow-hidden bg-gold-soft ${screen}`}>
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
            prevLabel="Previous view of the cows"
            nextLabel="Next view of the cows"
            className="h-[clamp(150px,24svh,300px)] rounded-card sm:h-[34svh] lg:h-full lg:rounded-none lg:rounded-tr-card"
          />
        </div>
      </div>

      <div className={`${container} mt-s21 short:mt-s13 lg:mt-0 lg:grid lg:grid-cols-2 lg:gap-s55`}>
        <div className="lg:col-start-2">
          <SectionHeader
            title="The cows know a calm hand"
            lead="Six breeds live in the gaushaale. At 4 pm on a day outing, sit with them in the cow cuddling pen and feel the slow breath of an animal at peace."
            leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
          />

          <ul
            aria-label="The breeds in the gaushaale"
            className="-mx-s21 mt-s21 flex gap-s8 overflow-x-auto px-s21 py-[2px] [scrollbar-width:none] sm:-mx-s34 sm:px-s34 lg:mx-0 lg:mt-s34 lg:flex-wrap lg:gap-x-s21 lg:gap-y-[2px] lg:overflow-visible lg:px-0 squat:mt-s21 [&::-webkit-scrollbar]:hidden"
          >
            {BREEDS.map((b, i) => (
              <li key={b.name} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={breed === i}
                  onClick={() => setBreed(i)}
                  className={`relative inline-flex min-h-[44px] items-center rounded-btn border px-s13 text-[15px] whitespace-nowrap transition-colors duration-300 lg:rounded-none lg:border-0 lg:border-b lg:px-0 lg:text-left lg:font-display lg:text-[clamp(19px,1.7vw,24px)] lg:leading-[1.2] ${
                    breed === i
                      ? "border-forest bg-forest text-paper lg:border-forest lg:bg-transparent lg:text-forest"
                      : "border-forest/25 text-forest/75 hover:text-forest lg:border-forest/15 lg:text-forest/55"
                  }`}
                >
                  {b.name}
                </button>
              </li>
            ))}
          </ul>
          <p aria-live="polite" className="mt-s13 min-h-[3em] text-[15px] leading-[1.5] text-ink-muted lg:min-h-[1.5em]">
            <span className="font-medium text-forest">{BREEDS[breed].name}:</span> {BREEDS[breed].note}
          </p>

          <div className="mt-s13 flex flex-wrap items-center gap-x-s21 gap-y-s13 lg:mt-s21">
            <p className="max-w-[26em] text-[15px] leading-[1.5] text-ink max-sm:hidden short:hidden squat:hidden">
              Feed them, or join a Gau Pooja or Gau Aarti, morning or evening. Tell us before you come so we can plan it.
            </p>
            <a href={GAU_SEVA_ENQUIRY} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
              Ask about gau seva
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
