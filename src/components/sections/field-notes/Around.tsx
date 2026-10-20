"use client";

import { useState } from "react";
import { TourViewer } from "@/components/TourViewer";
import { SectionHeader, container, screen } from "@/components/ui";
import { NEARBY } from "./atlas";

/**
 * #around — places worth a drive, from the tour's bird's-eye scene. Pick one
 * and the bird's-eye 360° view turns to face the direction it lies in, so you
 * see where it is from the farm. Phones: pills, the view, then the pick's line.
 */
export function Around() {
  const [i, setI] = useState(0);
  const place = NEARBY[i];

  return (
    <section id="around" data-nav="dark" data-snap="" className={`on-dark overflow-hidden bg-forest text-paper ${screen}`}>
      <div className={`${container} grid grid-cols-[minmax(0,1fr)] gap-s21 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-s55`}>
        <div className="min-w-0">
          <SectionHeader
            tone="dark"
            title="Around the farm"
            lead="Hills, temples and a dam, all within an hour’s drive. Pick one to face it from the farm."
            leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5] short:hidden squat:hidden"
          />
          <ul className="-mx-s21 mt-s21 flex gap-s8 overflow-x-auto px-s21 [scrollbar-width:none] sm:-mx-s34 sm:px-s34 lg:mx-0 lg:mt-s34 lg:grid lg:gap-0 lg:overflow-visible lg:border-t lg:border-paper/15 lg:px-0 squat:mt-s21 [&::-webkit-scrollbar]:hidden">
            {NEARBY.map((p, n) => (
              <li key={p.name} className="shrink-0 lg:border-b lg:border-paper/15">
                <button
                  type="button"
                  aria-pressed={n === i}
                  onClick={() => setI(n)}
                  className={`flex min-h-[44px] w-full items-center justify-between gap-s13 rounded-btn border px-s13 text-[15px] whitespace-nowrap transition-colors duration-300 lg:rounded-none lg:border-0 lg:px-0 lg:py-[5px] lg:text-left squat:min-h-[32px] squat:py-0 squat:text-[14px] ${
                    n === i ? "border-paper/60 bg-paper/10 text-paper lg:bg-transparent" : "border-paper/20 text-paper/70 hover:text-paper"
                  }`}
                >
                  <span className="flex items-center gap-s13">
                    <span aria-hidden="true" className={`hidden h-[2px] bg-gold transition-[width] duration-500 lg:block ${n === i ? "w-s13" : "w-0"}`} />
                    {p.name}
                  </span>
                  <span className={`text-[13px] tabular-nums ${n === i ? "text-gold" : "text-paper/55"}`}>{p.minutes} min</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <TourViewer
            tour={{ node: "BirdsEyeView01", pan: place.pan, tilt: -6 }}
            title={`360° view from above the farm, facing ${place.name}`}
            caption={`Facing ${place.name}`}
            tone="dark"
            className="h-[clamp(200px,34svh,360px)] sm:h-[38svh] lg:h-[clamp(320px,calc(100svh-300px),560px)]"
          />
          <p className="mt-s13 text-[15px] text-paper/80">
            <span className="font-medium text-paper">{place.name}:</span> {place.kind.toLowerCase()}, about {place.minutes} minutes by car.
          </p>
        </div>
      </div>
    </section>
  );
}
