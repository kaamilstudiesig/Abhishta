"use client";

import { useEffect, useRef, useState } from "react";
import { TourViewer } from "@/components/TourViewer";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";
import { DAY_OUTING_ENQUIRY } from "@/lib/site";
import { DAY_STOPS } from "./groups";

/**
 * #day-outings — the page's bold moment, on the forest band: a day outing as a
 * rail of nine stops from 8:00 to 6:00. Pick a stop (or use the view's arrows)
 * and the live 360° turns to where it happens: the gate, the dining hall, the
 * gaushaale, the games corner, the buffet, the pool, the cow cuddling pen, and
 * the farm from above as you leave. Phones: the rail scrolls sideways.
 */
export function DayOutings() {
  const [stop, setStop] = useState(0);
  const railRef = useRef<HTMLOListElement>(null);
  const count = DAY_STOPS.length;
  const current = DAY_STOPS[stop];

  // keep the chosen stop in view on a rail that scrolls (phones), without moving the page
  useEffect(() => {
    const rail = railRef.current;
    const item = rail?.children[stop] as HTMLElement | undefined;
    if (!rail || !item || rail.scrollWidth <= rail.clientWidth) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({ left: item.offsetLeft - rail.clientWidth / 2 + item.offsetWidth / 2, behavior: reduce ? "auto" : "smooth" });
  }, [stop]);

  return (
    <section id="day-outings" data-nav="dark" data-snap="" className={`on-dark overflow-hidden bg-forest text-paper ${screen}`}>
      <div className={`${container} grid grid-cols-[minmax(0,1fr)] gap-s21 lg:grid-cols-[1fr_1.5fr] lg:items-center lg:gap-x-s55 lg:gap-y-s34 squat:gap-y-s21`}>
        <div className="min-w-0">
          <SectionHeader
            tone="dark"
            title="A day outing, hour by hour"
            lead="8 am to 6 pm, with breakfast, lunch and high tea. Pick a time to see where it happens."
            leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
          />
          <a href={DAY_OUTING_ENQUIRY} target="_blank" rel="noopener noreferrer" className={buttonClass("gold", "mt-s34 max-lg:hidden squat:mt-s21")}>
            Plan a day outing
          </a>
        </div>

        <TourViewer
          tour={current.tour}
          title={`360° view: ${current.place.toLowerCase()}, for “${current.what.toLowerCase()}” at ${current.time}`}
          caption={`${current.time}  ${current.place}`}
          tone="dark"
          onPrev={() => setStop((stop - 1 + count) % count)}
          onNext={() => setStop((stop + 1) % count)}
          prevLabel="Earlier in the day"
          nextLabel="Later in the day"
          className="h-[clamp(170px,27svh,320px)] sm:h-[34svh] lg:h-[clamp(260px,calc(100svh-470px),480px)]"
        />

        {/* the day: a rail of stops, filled up to the chosen one */}
        <div className="relative min-w-0 lg:col-span-2">
          <ol
            ref={railRef}
            aria-label="A day outing, hour by hour"
            className="-mx-s21 flex gap-s8 overflow-x-auto px-s21 pt-s13 [scrollbar-width:none] sm:-mx-s34 sm:px-s34 lg:mx-0 lg:grid lg:grid-cols-9 lg:gap-0 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {DAY_STOPS.map((s, i) => (
              <li key={s.time} className="relative shrink-0 lg:shrink">
                {/* the rail: a segment from this stop's dot to the next one, gold once the day has passed it */}
                {i < count - 1 ? (
                  <span aria-hidden="true" className={`absolute top-0 -right-s8 left-0 h-[2px] transition-colors duration-500 lg:right-0 ${i < stop ? "bg-gold" : "bg-paper/20"}`} />
                ) : null}
                <button
                  type="button"
                  aria-pressed={i === stop}
                  onClick={() => setStop(i)}
                  className="group relative flex w-[132px] flex-col items-start pt-s13 text-left lg:w-full"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -top-[5px] left-0 size-[12px] rounded-full ring-2 transition-[background-color,transform] duration-300 ${
                      i === stop ? "scale-125 bg-gold ring-gold" : i < stop ? "bg-gold ring-gold" : "bg-forest ring-paper/40 group-hover:ring-paper"
                    }`}
                  />
                  <span className={`text-[15px] font-medium tabular-nums ${i === stop ? "text-gold" : "text-paper/70"}`}>{s.time}</span>
                  <span className={`mt-[2px] pr-s13 text-[14px] leading-[1.3] ${i === stop ? "text-paper" : "text-paper/65 group-hover:text-paper"}`}>
                    {s.what}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <a href={DAY_OUTING_ENQUIRY} target="_blank" rel="noopener noreferrer" className={buttonClass("gold", "justify-self-start lg:hidden short:hidden")}>
          Plan a day outing
        </a>
      </div>
    </section>
  );
}
