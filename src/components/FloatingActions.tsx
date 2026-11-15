import { CONTACT } from "@/lib/site";
import { IconPhone } from "@/components/icons";

/**
 * Always-on-screen "Call us" button, bottom-right. It opens the phone's dialler on the same number as WhatsApp;
 * it was "Book a stay" (to WhatsApp) until the client asked for a direct call, 2026-11-15. The Enquire and booking
 * buttons elsewhere still open WhatsApp.
 */
export function FloatingActions() {
  return (
    <div
      className="pointer-events-none fixed right-s13 bottom-[calc(13px+env(safe-area-inset-bottom))] z-[65] flex items-end sm:right-s21 sm:bottom-[calc(21px+env(safe-area-inset-bottom))]"
    >
      <a
        href={CONTACT.reservation.href}
        aria-label={`Call us on ${CONTACT.reservation.label}`}
        className="pointer-events-auto inline-flex min-h-[48px] items-center gap-s8 rounded-full bg-farm px-s21 text-[15px] font-medium text-paper shadow-float ring-1 ring-paper/15 transition-[translate,background-color] duration-300 hover:-translate-y-[2px] hover:bg-forest"
      >
        <IconPhone size={18} />
        Call us
      </a>
    </div>
  );
}
