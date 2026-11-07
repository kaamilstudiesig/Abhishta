"use client";

import { useEffect, useRef } from "react";
import { IconClose } from "@/components/icons";
import { glass } from "@/components/bits/glass";
import { GlassFill } from "@/components/bits/LiquidGlass";
import { VIRTUAL_TOUR_URL } from "@/lib/site";

/**
 * The full Turiya V7 tour in a pop-up: a large centred window on desktop, full screen on phones, a slim bar with the
 * title and a close button (Escape and a click outside close it too). The owner chose (2026-11-08) to embed V7 itself
 * here, Turiya's START screen and logo included, so visitors get the whole tour with its own hotspots and menu. This
 * is the one place the site embeds Turiya in an iframe; everywhere else uses TourViewer. The iframe only mounts while
 * the pop-up is open. Page scrolling pauses while any dialog is open (see SmoothScroll).
 */
export function TourDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

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
      aria-label="Virtual tour of the farm"
      className="m-0 h-svh max-h-none w-screen max-w-none overflow-hidden bg-forest p-0 text-paper backdrop:bg-ink/85 backdrop:backdrop-blur-sm sm:m-auto sm:h-[min(800px,88svh)] sm:w-[min(1280px,94vw)] sm:rounded-card sm:shadow-float"
    >
      {open ? (
        <div className="on-dark flex h-full flex-col">
          <div className="flex shrink-0 items-center justify-between gap-s13 px-s13 py-s8 pt-[max(8px,env(safe-area-inset-top))] sm:px-s21">
            <p className="font-display text-[clamp(20px,2.2vw,26px)] leading-[1.1]">Virtual Tour</p>
            <button
              type="button"
              autoFocus
              onClick={onClose}
              aria-label="Close the virtual tour"
              className={`relative grid size-[44px] shrink-0 place-items-center rounded-full text-paper transition-colors duration-300 hover:bg-white/20 ${glass("dark")}`}
            >
              <GlassFill />
              <IconClose size={22} />
            </button>
          </div>
          <iframe
            src={VIRTUAL_TOUR_URL}
            title="Abhishta Agri Farm Stay virtual tour"
            allow="fullscreen; accelerometer; gyroscope; xr-spatial-tracking"
            allowFullScreen
            className="min-h-0 w-full flex-1 border-0 bg-ink pb-[env(safe-area-inset-bottom)]"
          />
        </div>
      ) : null}
    </dialog>
  );
}
