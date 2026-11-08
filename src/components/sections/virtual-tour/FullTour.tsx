"use client";

import { useEffect, useRef, useState } from "react";
import { IconArrow } from "@/components/icons";
import { glass } from "@/components/bits/glass";
import { GlassFill } from "@/components/bits/LiquidGlass";
import { buttonClass } from "@/components/ui";
import { VIRTUAL_TOUR_URL } from "@/lib/site";

/**
 * #tour — the top of /virtualtour: Turiya's full V7 tour, embedded so it lives on the site's own shareable address
 * (abhishtaagrifarmstay.com/virtualtour, client's ask). It fills the screen under the navbar; the tour opens on
 * Turiya's START screen. This and the homepage pop-up (TourDialog) are the only Turiya iframes on the site.
 *
 * Scrolling: an iframe swallows the wheel and swipes, so the page could never move on. A clear layer sits over the
 * tour: scrolling over it scrolls (and snaps) the page; a click or tap hands the tour the mouse or finger, with a
 * small "Click to explore the tour" pill on hover so the first click doesn't feel lost. The layer comes back when
 * the pointer leaves the tour or the section scrolls out of view. A slim bar under it leads on to Find us / Ask us.
 */
export function FullTour() {
  const ref = useRef<HTMLElement>(null);
  const [live, setLive] = useState(false);

  // give scrolling back to the page once the tour is out of view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.intersectionRatio < 0.6) setLive(false);
    }, { threshold: [0, 0.6] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="tour"
      data-nav="dark"
      data-snap=""
      aria-label="Virtual tour of the farm"
      className="on-dark flex h-svh flex-col bg-forest pt-[84px] text-paper"
    >
      <h1 className="sr-only">Virtual tour of Abhishta Agri Farm Stay</h1>
      <div
        className="group relative min-h-0 flex-1 px-[max(8px,env(safe-area-inset-left))] sm:px-s13"
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") setLive(false);
        }}
      >
        <iframe
          src={VIRTUAL_TOUR_URL}
          title="Abhishta Agri Farm Stay virtual tour"
          allow="fullscreen; accelerometer; gyroscope; xr-spatial-tracking"
          allowFullScreen
          className="h-full w-full rounded-card border-0 bg-ink"
        />
        {live ? null : (
          <button
            type="button"
            onClick={() => setLive(true)}
            aria-label="Explore the virtual tour"
            className="absolute inset-0 mx-[max(8px,env(safe-area-inset-left))] flex touch-pan-y items-start justify-center rounded-card pt-s21 sm:mx-s13"
          >
            <span
              className={`relative rounded-full px-s21 py-s8 text-[15px] font-medium text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 ${glass("dark")}`}
            >
              <GlassFill />
              Click to explore the tour
            </span>
          </button>
        )}
      </div>
      {/* the right side stays clear for the floating "Book a stay" button */}
      <div className="flex shrink-0 flex-wrap items-center gap-x-s21 gap-y-s8 px-s21 py-s13 pb-[max(13px,env(safe-area-inset-bottom))] sm:px-s34 sm:pr-[200px]">
        <div className="flex gap-s8">
          <a href="#find-us" className={buttonClass("gold", "min-h-[40px]")}>
            Find us
            <IconArrow size={16} className="rotate-90" aria-hidden="true" />
          </a>
          <a href="#ask-us" className={buttonClass("ghost-light", "min-h-[40px] max-sm:hidden")}>
            Ask us
          </a>
        </div>
        <p className="text-[14px] text-paper/80 max-sm:order-first sm:text-[15px]">
          {live
            ? "Drag to look around and use the arrows to walk on. Scroll here to move on."
            : "Tap or click the tour to explore it. Scroll to move on down the page."}
        </p>
      </div>
    </section>
  );
}
