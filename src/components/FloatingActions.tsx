import { BOOKING_URL } from "@/lib/site";
import { IconBooking } from "@/components/icons";

/** Always-on-screen booking button, bottom-right (the floating WhatsApp icon was removed, client 2026-10-31). */
export function FloatingActions() {
  return (
    <div
      className="pointer-events-none fixed right-s13 bottom-[calc(13px+env(safe-area-inset-bottom))] z-[65] flex items-end sm:right-s21 sm:bottom-[calc(21px+env(safe-area-inset-bottom))]"
    >
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto inline-flex min-h-[48px] items-center gap-s8 rounded-full bg-farm px-s21 text-[15px] font-medium text-paper shadow-float ring-1 ring-paper/15 transition-[translate,background-color] duration-300 hover:-translate-y-[2px] hover:bg-forest"
      >
        <IconBooking size={18} />
        Book a stay
      </a>
    </div>
  );
}
