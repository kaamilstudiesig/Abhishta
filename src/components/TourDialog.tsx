"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TourViewer } from "@/components/TourViewer";
import { IconClose, IconExternal } from "@/components/icons";
import { ATLAS } from "@/components/sections/virtual-tour/atlas";
import { glass } from "@/components/bits/glass";
import { GlassFill } from "@/components/bits/LiquidGlass";

/**
 * The 360° tour in a full-screen dialog: one live view with the place pills of
 * the /virtualtour page, a close button (Escape works too) and a link to the
 * shareable page. The player only mounts while it's open. Page scrolling
 * pauses while any dialog is open (see SmoothScroll).
 */
export function TourDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(0);
  const count = ATLAS.length;
  const place = ATLAS[i];

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
      aria-label="360° virtual tour of the farm"
      className="m-0 h-svh max-h-none w-screen max-w-none overflow-hidden bg-forest p-0 text-paper backdrop:bg-ink/80"
    >
      {open ? (
        <div className="on-dark relative h-full">
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

          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-s13 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.55),transparent)] p-s13 sm:p-s21">
            <div className="pointer-events-auto">
              <p className="font-display text-[clamp(20px,2.2vw,28px)] leading-[1.1]">360° Virtual Tour</p>
              <Link href="/virtualtour" className="mt-[4px] inline-flex items-center gap-[6px] text-[14px] text-paper/85 underline decoration-gold underline-offset-4 hover:text-paper">
                Open as a page to share
                <IconExternal size={14} />
              </Link>
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

          <nav aria-label="Places on the farm" className="absolute inset-x-0 bottom-[64px] px-s13 sm:bottom-[72px] sm:px-s21">
            <ul className="-mx-s13 flex gap-s8 overflow-x-auto px-s13 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
              {ATLAS.map((a, n) => (
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
