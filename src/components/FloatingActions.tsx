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
        className="on-dark pointer-events-auto grid size-[55px] place-items-center rounded-full bg-farm text-white shadow-float transition-[translate,background-color] duration-300 hover:-translate-y-[2px] hover:bg-forest"
      >
        <IconWhatsApp size={26} />
      </a>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto inline-flex min-h-[55px] items-center gap-s8 rounded-full bg-gold pr-s21 pl-s13 text-[15px] font-bold text-forest shadow-float transition-[translate,background-color] duration-300 hover:-translate-y-[2px] hover:bg-gold-soft"
      >
        <span className="grid size-[34px] place-items-center rounded-full bg-forest/10">
          <IconBooking size={20} />
        </span>
        Book a stay
      </a>
    </div>
  );
}
