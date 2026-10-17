"use client";

import { useRef, useState, type FormEvent } from "react";
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

const CONTACT_CARDS = [
  { label: "Reservation", value: CONTACT.reservation.label, href: CONTACT.reservation.href, icon: IconPhone },
  { label: "Landline", value: CONTACT.landline.label, href: CONTACT.landline.href, icon: IconLandline },
  { label: "Email", value: CONTACT.email.label, href: CONTACT.email.href, icon: IconMail },
  { label: "Find us", value: CONTACT.address, href: CONTACT.mapUrl, icon: IconPin },
];

/**
 * Footer — sits under the page (position: sticky; bottom: 0) and is revealed as
 * the last section scrolls away; the giant "Abhishta" wordmark rises out of the
 * ground as it does. On phones the footer is taller than the screen, so it
 * simply follows the page.
 */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [subscribed, setSubscribed] = useState(false);

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

  // No mailing-list service yet: subscribing drafts an email to the farm.
  const onSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    const mailto = `${CONTACT.email.href}?subject=${encodeURIComponent(
      "Harvest news sign-up",
    )}&body=${encodeURIComponent(`Please add ${email} to harvest news and seasonal notes.`)}`;
    window.open(mailto, "_self");
    setSubscribed(true);
  };

  return (
    <footer
      ref={ref}
      data-nav="dark"
      className="on-dark bottom-0 z-0 overflow-hidden bg-forest text-paper md:sticky"
    >
      <div className={`${container} pt-s89 pb-s34`}>
        <div className="grid gap-s55 lg:grid-cols-[1fr_1.618fr] lg:gap-s89">
          <div>
            <Logo className="text-paper" />
            <h2 className="mt-s34 font-display text-[clamp(28px,3vw,34px)] leading-[1.15] font-light">
              Harvest news and seasonal notes
            </h2>
            <p className="mt-s8 max-w-[28em] text-paper/75">
              What&apos;s ripening, what&apos;s on the table, and when the cottages open up. A few letters a season.
            </p>
            <form onSubmit={onSubscribe} className="mt-s21 flex max-w-[460px] flex-col gap-s8 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                spellCheck={false}
                placeholder="you@example.com"
                className="h-[52px] flex-1 rounded-btn border border-paper/25 bg-paper/5 px-s13 text-paper outline-none placeholder:text-paper/45 focus:border-gold focus:shadow-[0_0_0_3px_rgba(233,163,33,0.25)]"
              />
              <button
                type="submit"
                className="h-[52px] rounded-btn bg-gold px-s21 text-[15px] font-bold text-forest transition-colors duration-300 hover:bg-gold-soft"
              >
                Subscribe
              </button>
            </form>
            <p aria-live="polite" className="mt-s8 min-h-[1.6em] text-[13px] text-paper/70">
              {subscribed ? "Your email app should open with the sign-up ready to send." : ""}
            </p>
            <p className="eyebrow mt-s21 text-gold">Follow</p>
            <ul className="mt-s13 flex flex-wrap gap-s8">
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
                      className="grid size-[44px] place-items-center rounded-full border border-paper/20 text-paper transition-colors duration-300 hover:border-gold hover:text-gold"
                    >
                      <Icon size={21} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid gap-s34 sm:grid-cols-[1fr_1.618fr]">
            <nav aria-label="Footer">
              <p className="eyebrow text-gold">Explore</p>
              <ul className="mt-s13 grid gap-s8">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="link-gold text-paper/90 hover:text-paper">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <ul className="grid content-start gap-s13">
              {CONTACT_CARDS.map(({ label, value, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex gap-s13 rounded-card border border-paper/15 p-s13 transition-colors duration-300 hover:border-gold/60 hover:bg-paper/5"
                  >
                    <span className="grid size-[40px] shrink-0 place-items-center rounded-full bg-paper/10 text-gold">
                      <Icon size={21} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13px] text-paper/65">{label}</span>
                      <span className="block break-words text-paper">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p
        data-wordmark=""
        aria-hidden="true"
        translate="no"
        className="flex justify-center overflow-hidden px-s13 font-display text-[22.5vw] leading-[0.78] font-light tracking-[-0.045em] text-paper/95 select-none"
      >
        {"Abhishta".split("").map((c, i) => (
          <span key={i} className="inline-block pb-[0.08em]">
            {c}
          </span>
        ))}
      </p>

      <div className={`${container} flex flex-col gap-s8 border-t border-paper/15 py-s21 text-[13px] text-paper/65 sm:flex-row sm:justify-between`}>
        <p>© 2026 Abhishta Agri Farm Stay. Jiddigere, Kunigal.</p>
        <p>Ninety kilometres from Bangalore, a world away from it.</p>
      </div>
    </footer>
  );
}
