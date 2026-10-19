"use client";

import { useEffect, useRef, useState } from "react";
import { TiltedCard } from "@/components/bits/TiltedCard";
import { TourViewer } from "@/components/TourViewer";
import { IconArrow, IconExternal } from "@/components/icons";
import { SectionHeader, container, screen } from "@/components/ui";
import { tourUrl, type Tour } from "@/lib/tour";

// Scenes listed in scripts/tour-scenes.mjs; views open facing the space.
const SPACES: { name: string; detail: string; tour: Tour }[] = [
  { name: "Swimming pool", detail: "Open 6:30 am to 6 pm", tour: { node: "SwimmingPoolBliss", pan: -90, tilt: -5 } },
  { name: "Dining hall", detail: "Vegetarian, farm-fresh meals", tour: { node: "Abhishta_03", pan: 22, tilt: -5 } },
  { name: "Traditional bath", detail: "Hande ole snana, a wood-fired copper pot", tour: { node: "Abhishta_15", pan: -6, tilt: -8 } },
  { name: "Games and sports", detail: "Cricket, volleyball, carrom, lagori", tour: { node: "Abhishta_10", pan: -174, tilt: -5 } },
  { name: "Amphitheatre and campfire", detail: "Bonfire and barbecue evenings", tour: { node: "Amphitheatre", pan: 12, tilt: -5 } },
  { name: "Koi pond", detail: "A slow minute by the water", tour: { node: "Abhishta_11", pan: -33, tilt: -10 } },
];

function FarmLink({ className = "", brief = false }: { className?: string; brief?: boolean }) {
  return (
    <p className={`text-paper/75 ${className}`}>
      <span className="font-medium text-paper">And the farm itself:</span>{" "}
      {brief ? "cows, goats, ducks and rabbits." : "cows at the gaushaale, goats and sheep, ducks and rabbits."}{" "}
      <a href="/the-living-farm" className="link-gold inline-flex items-center gap-[6px] font-medium text-paper">
        Meet the living farm
        <IconArrow size={16} />
      </a>
    </p>
  );
}

const arrow =
  "grid size-[48px] place-items-center rounded-full border-[1.5px] border-paper/30 text-paper transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-forest disabled:pointer-events-none disabled:opacity-35";

/**
 * Beyond your door — one screen on the forest band: the six shared spaces as a
 * carousel of tilted cards, each holding that spot's live 360° view, its name,
 * one line and a way into the whole tour. Swipe or scroll the row, or use the
 * arrows or the dots under it (one per space; the current one is a gold bar).
 * Each view starts only as its card comes into sight.
 */
export function SharedSpaces() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [active, setActive] = useState(0);

  // one card's width plus the gap: how far the row moves per space
  const stepOf = (track: HTMLElement) => (track.querySelector("li")?.offsetWidth ?? 0) + 21;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const end = track.scrollLeft + track.clientWidth > track.scrollWidth - 8;
      setEdges({ start: track.scrollLeft < 8, end });
      // at the end of the row the last card is the current one, even where it can't reach the left edge
      const step = stepOf(track);
      setActive(end ? SPACES.length - 1 : step ? Math.round(track.scrollLeft / step) : 0);
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const behavior = () => (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");
  const go = (dir: number) => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: dir * stepOf(track), behavior: behavior() });
  };
  const show = (i: number) => {
    const track = trackRef.current;
    if (track) track.scrollTo({ left: i * stepOf(track), behavior: behavior() });
  };

  return (
    <section id="shared-spaces" data-nav="dark" data-snap="" className={`on-dark overflow-hidden bg-forest text-paper ${screen}`}>
      <div className={`${container} grid gap-s13 sm:gap-s21 lg:grid-cols-[1fr_1.618fr] lg:items-center lg:gap-s55`}>
        <div className="min-w-0">
          <SectionHeader
            tone="dark"
            title="Beyond your door"
            lead="The spaces every guest shares. Drag a view to look around."
            leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
          />
          <div className="mt-s34 hidden gap-s13 sm:flex lg:mt-s55 squat:mt-s34">
            <button type="button" onClick={() => go(-1)} disabled={edges.start} aria-controls="shared-spaces-track" aria-label="Previous space" className={arrow}>
              <IconArrow size={21} className="rotate-180" />
            </button>
            <button type="button" onClick={() => go(1)} disabled={edges.end} aria-controls="shared-spaces-track" aria-label="Next space" className={arrow}>
              <IconArrow size={21} />
            </button>
          </div>
          <FarmLink className="mt-s34 hidden max-w-[26em] lg:block squat:mt-s21" />
        </div>

        <div className="min-w-0">
          <ul
            id="shared-spaces-track"
            ref={trackRef}
            aria-label="Shared spaces, each in 360°"
            className={`-mx-s21 flex snap-x snap-mandatory gap-s21 overflow-x-auto scroll-px-s21 px-s21 py-s13 [scrollbar-width:none] sm:-mx-s34 sm:scroll-px-s34 sm:px-s34 lg:mx-0 lg:scroll-px-0 lg:px-s8 [&::-webkit-scrollbar]:hidden ${
              // on lg the row ends inside the column: fade the cut-off card until the end is reached
              edges.end ? "" : "lg:[mask-image:linear-gradient(to_right,black_82%,transparent)]"
            }`}
          >
            {SPACES.map((s, i) => (
              <li key={s.name} className="relative w-[84%] shrink-0 snap-start sm:w-[58%] lg:w-[64%]">
                <TiltedCard>
                  <article className="rounded-card bg-card p-s8 text-ink shadow-card">
                    <TourViewer
                      tour={s.tour}
                      title={`360° view: ${s.name.toLowerCase()}`}
                      tone="light"
                      className="h-[clamp(180px,calc(100svh-520px),340px)] sm:h-[clamp(240px,calc(100svh-640px),350px)] lg:h-[clamp(240px,calc(100svh-440px),420px)]"
                    />
                    <div className="px-s13 pt-s13 pb-s8 sm:px-s21 sm:pt-s21 sm:pb-s13">
                      <h3 className="font-display text-[clamp(20px,1.9vw,26px)] leading-[1.15] text-forest">
                        <span className="sr-only">{`${i + 1} of ${SPACES.length}: `}</span>
                        {s.name}
                      </h3>
                      <p className="mt-[4px] text-[15px] leading-[1.45] text-ink-muted">{s.detail}</p>
                      <a
                        href={tourUrl(s.tour.node, s.tour)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tap mt-s8 inline-flex items-center gap-[6px] text-[14px] font-medium text-farm hover:text-forest max-sm:hidden short:hidden"
                      >
                        Walk on from here in the full tour
                        <IconExternal size={15} />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </div>
                  </article>
                </TiltedCard>
              </li>
            ))}
          </ul>
          <div className="mt-[2px] flex justify-center lg:justify-start lg:pl-s8">
            {SPACES.map((s, i) => (
              <button
                key={s.name}
                type="button"
                onClick={() => show(i)}
                aria-controls="shared-spaces-track"
                aria-label={`Show ${s.name.toLowerCase()} (${i + 1} of ${SPACES.length})`}
                aria-current={active === i ? "true" : undefined}
                className="group grid h-[24px] min-w-[24px] place-items-center px-[3px]"
              >
                <span
                  className={`block h-[8px] rounded-full transition-[width,background-color] duration-500 ease-[var(--ease-earth)] ${
                    active === i ? "w-s21 bg-gold" : "w-[8px] bg-paper/35 group-hover:bg-paper/70"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <FarmLink brief className="text-[15px] leading-[1.5] lg:hidden" />
      </div>
    </section>
  );
}
