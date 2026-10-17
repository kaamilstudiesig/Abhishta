"use client";

import { useEffect, useState } from "react";
import { BOOKING_URL, WHATSAPP_URL } from "@/lib/site";
import { IconBooking, IconWhatsApp } from "@/components/icons";

/**
 * Always-on-screen WhatsApp + booking buttons, bottom-right. While the hero is
 * in view they ride above the docked availability bar so they never cover it.
 */
export function FloatingActions() {
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => setOverHero(entry.isIntersecting), {
      rootMargin: "0px 0px -100% 0px",
      threshold: 0,
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`pointer-events-none fixed right-s13 bottom-[calc(13px+env(safe-area-inset-bottom))] z-[65] flex flex-row-reverse items-end gap-s13 sm:flex-col sm:items-end transition-transform duration-700 ease-[var(--ease-earth)] sm:right-s21 sm:bottom-[calc(21px+env(safe-area-inset-bottom))] ${
        overHero ? "md:-translate-y-[110px]" : ""
      }`}
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
