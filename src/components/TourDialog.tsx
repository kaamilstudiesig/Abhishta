"use client";

import { useEffect, useRef, useState } from "react";
import { TourViewer } from "@/components/TourViewer";
import { IconClose, IconExternal } from "@/components/icons";
import { glass } from "@/components/bits/glass";
import { GlassFill } from "@/components/bits/LiquidGlass";
import { VIRTUAL_TOUR_URL } from "@/lib/site";
import type { Tour } from "@/lib/tour";

/** The places in the pop-up, from the V7 tour (scenes listed in scripts/tour-scenes.mjs). Angles face each subject. */
const SCENES: { name: string; tour: Tour }[] = [
  { name: "Entrance", tour: { node: "Entrance", pan: -22, tilt: -5 } },
  { name: "From above", tour: { node: "FarmOverview", pan: 270, tilt: -15 } },
  { name: "Cottages", tour: { node: "Pathway_08", pan: 210, tilt: 0 } },
  { name: "Pool", tour: { node: "BlissSwimmingPool", pan: 0, tilt: -5 } },
  { name: "Dining", tour: { node: "DiningZone", pan: 0, tilt: -5 } },
  { name: "Gaushaale", tour: { node: "Gaushaale_01", pan: 0, tilt: -5 } },
  { name: "Campfire", tour: { node: "AmphitheaterCampfireArea", pan: 0, tilt: -5 } },
  { name: "Koi pond", tour: { node: "KoiPond", pan: 0, tilt: -5 } },
];

/**
 * The 360° tour in a pop-up: a large centred window on desktop, full screen on phones. One live view with place
 * pills, previous/next arrows, a close button (Escape works too) and a link to the full tour in a new tab. The
 * player only mounts while it's open. Page scrolling pauses while any dialog is open (see SmoothScroll).
 */
export function TourDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(0);
  const count = SCENES.length;
  const place = SCENES[i];

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    else if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-label="360° virtual tour of the farm"
      className="m-0 h-svh max-h-none w-screen max-w-none overflow-hidden bg-forest p-0 text-paper backdrop:bg-ink/85 backdrop:backdrop-blur-sm sm:m-auto sm:h-[min(800px,88svh)] sm:w-[min(1280px,94vw)] sm:rounded-card sm:shadow-float"
    >
      {open ? (
        <div className="on-dark relative h-full">
          <TourViewer
            tour={place.tour}
            title={`360° view of the farm: ${place.name.toLowerCase()}`}
            tone="dark"
            bleed
            onPrev={() => setI((i - 1 + count) % count)}
            onNext={() => setI((i + 1) % count)}
            prevLabel="Previous place"
            nextLabel="Next place"
            className="h-full"
          />

          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-s13 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.55),transparent)] p-s13 pt-[max(13px,env(safe-area-inset-top))] sm:p-s21">
            <div className="pointer-events-auto">
              <p className="font-display text-[clamp(20px,2.2vw,28px)] leading-[1.1]">360° Virtual Tour</p>
              <a
                href={VIRTUAL_TOUR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-[4px] inline-flex items-center gap-[6px] text-[14px] text-paper/85 underline decoration-gold underline-offset-4 hover:text-paper"
              >
                Open the full tour
                <IconExternal size={14} />
              </a>
            </div>
            <button
              type="button"
              autoFocus
              onClick={onClose}
              aria-label="Close the virtual tour"
              className={`pointer-events-auto relative grid size-[48px] shrink-0 place-items-center rounded-full text-paper transition-colors duration-300 hover:bg-white/20 ${glass("dark")}`}
            >
              <GlassFill />
              <IconClose size={22} />
            </button>
          </div>

          <nav aria-label="Places on the farm" className="absolute inset-x-0 bottom-[max(64px,calc(env(safe-area-inset-bottom)+56px))] px-s13 sm:bottom-[72px] sm:px-s21">
            <ul className="-mx-s13 flex gap-s8 overflow-x-auto px-s13 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
              {SCENES.map((a, n) => (
                <li key={a.name} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={n === i}
                    onClick={() => setI(n)}
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
      ) : null}
    </dialog>
  );
}
