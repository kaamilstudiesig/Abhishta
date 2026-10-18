import { BOOKING_URL, WHATSAPP_URL } from "@/lib/site";
import { IconBooking, IconWhatsApp } from "@/components/icons";

/** Always-on-screen WhatsApp + booking buttons, bottom-right. */
export function FloatingActions() {
  return (
    <div
      className="pointer-events-none fixed right-s13 bottom-[calc(13px+env(safe-area-inset-bottom))] z-[65] flex flex-row-reverse items-end gap-s13 sm:right-s21 sm:bottom-[calc(21px+env(safe-area-inset-bottom))] sm:flex-col"
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="pointer-events-auto grid size-[48px] place-items-center rounded-full bg-paper text-farm shadow-float ring-1 ring-line transition-[translate,background-color] duration-300 hover:-translate-y-[2px] hover:bg-card"
      >
        <IconWhatsApp size={22} />
      </a>
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
