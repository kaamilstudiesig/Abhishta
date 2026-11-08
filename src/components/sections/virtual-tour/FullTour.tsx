import { IconArrow } from "@/components/icons";
import { buttonClass } from "@/components/ui";
import { VIRTUAL_TOUR_URL } from "@/lib/site";

/**
 * #tour — the top of /virtualtour: Turiya's full V7 tour, embedded so it lives on the site's own shareable address
 * (abhishtaagrifarmstay.com/virtualtour, client's ask). It fills the screen under the navbar; the tour opens on
 * Turiya's START screen. An embedded tour catches the mouse wheel and swipes, so a slim bar under it gives a clear way
 * on to "Find us" and "Ask us". This and the homepage pop-up (TourDialog) are the only Turiya iframes on the site.
 */
export function FullTour() {
  return (
    <section
      id="tour"
      data-nav="dark"
      data-snap=""
      aria-label="Virtual tour of the farm"
      className="on-dark flex h-svh flex-col bg-forest pt-[84px] text-paper"
    >
      <h1 className="sr-only">Virtual tour of Abhishta Agri Farm Stay</h1>
      <div className="min-h-0 flex-1 px-[max(8px,env(safe-area-inset-left))] sm:px-s13">
        <iframe
          src={VIRTUAL_TOUR_URL}
          title="Abhishta Agri Farm Stay virtual tour"
          allow="fullscreen; accelerometer; gyroscope; xr-spatial-tracking"
          allowFullScreen
          className="h-full w-full rounded-card border-0 bg-ink"
        />
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
          Tap play, then drag to look around. Use the arrows to walk from place to place.
        </p>
      </div>
    </section>
  );
}
