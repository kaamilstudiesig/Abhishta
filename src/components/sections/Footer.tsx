"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  IconFacebook,
  IconInstagram,
  IconLandline,
  IconMail,
  IconPhone,
  IconPin,
  IconTripAdvisor,
  IconWhatsApp,
  IconYouTube,
} from "@/components/icons";
import { Logo } from "@/components/Logo";
import { container } from "@/components/ui";
import { CONTACT, NAV_LINKS, SOCIALS } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SOCIAL_ICONS = {
  Instagram: IconInstagram,
  Facebook: IconFacebook,
  YouTube: IconYouTube,
  WhatsApp: IconWhatsApp,
  TripAdvisor: IconTripAdvisor,
} as const;

const CONTACTS = [
  { label: "Reservation", value: CONTACT.reservation.label, href: CONTACT.reservation.href, icon: IconPhone },
  { label: "Landline", value: CONTACT.landline.label, href: CONTACT.landline.href, icon: IconLandline },
  { label: "Email", value: CONTACT.email.label, href: CONTACT.email.href, icon: IconMail },
  { label: "Address", value: CONTACT.address, href: CONTACT.mapUrl, icon: IconPin },
];

/**
 * Compact footer. On screens tall enough to hold it, it sits under the page
 * (position: sticky; bottom: 0) and is revealed as the last section scrolls
 * away, with the "Abhishta" wordmark rising as it does. Elsewhere it simply
 * follows the page, so every link is always reachable.
 */
export function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(el.querySelectorAll("[data-wordmark] span"), {
          yPercent: 100,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: 0.4 },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <footer
      ref={ref}
      data-nav="dark"
      className="on-dark bottom-0 z-0 overflow-hidden bg-forest text-paper [@media(min-width:768px)_and_(min-height:680px)]:sticky"
    >
      <div className={`${container} grid gap-s34 pt-s89 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.6fr] lg:gap-s55`}>
        <div>
          <Logo tone="light" />
          <p className="mt-s13 max-w-[22em] text-[15px] text-paper/75">
            A working farm stay ninety kilometres from Bangalore.
          </p>
          <ul className="mt-s21 flex flex-wrap gap-s8">
            {SOCIALS.map((s) => {
              const Icon = SOCIAL_ICONS[s.name];
              return (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    title={s.name}
                    className="grid size-[44px] place-items-center rounded-full border border-paper/25 text-paper transition-colors duration-300 hover:border-gold hover:text-gold"
                  >
                    <Icon size={20} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow text-gold">Explore</p>
          <ul className="mt-s13 grid gap-[6px]">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[15px] text-paper transition-colors duration-300 hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sm:col-span-2 lg:col-span-1">
          <p className="eyebrow text-gold">Contact</p>
          <ul className="mt-s13 grid gap-s8">
            {CONTACTS.map(({ label, value, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-start gap-s13 text-[15px] leading-[1.5] text-paper transition-colors duration-300 hover:text-gold"
                >
                  <Icon size={20} className="mt-[2px] shrink-0 text-gold" />
                  <span className="min-w-0 break-words">
                    <span className="sr-only">{label}: </span>
                    {value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p
        data-wordmark=""
        aria-hidden="true"
        translate="no"
        className="mt-s34 flex justify-center overflow-hidden px-s13 font-display text-[13vw] leading-[0.82] font-light tracking-[-0.04em] text-paper/90 select-none"
      >
        {"Abhishta".split("").map((c, i) => (
          <span key={i} className="inline-block pb-[0.06em]">
            {c}
          </span>
        ))}
      </p>

      <div className={`${container} flex flex-wrap gap-x-s21 gap-y-[3px] border-t border-paper/15 py-s13 text-[13px] text-paper/70`}>
        <p>© 2026 Abhishta Agri Farm Stay. Jiddigere, Kunigal.</p>
        <a href="#top" className="w-fit text-paper/80 hover:text-gold">
          Back to top
        </a>
      </div>
    </footer>
  );
}
