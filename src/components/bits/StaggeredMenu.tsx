"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CONTACT, NAV_LINKS, SOCIALS } from "@/lib/site";

gsap.registerPlugin(useGSAP);

/**
 * Brand StaggeredMenu — adapted from React Bits. Two pre-layers (gold, then
 * farm green) sweep in from the right like turned soil, the forest panel lands
 * on top, and the links rise one after another in Fraunces, each with its
 * number (01, 02…) fading in at its top right once it lands. Escape closes it,
 * focus moves into the panel and returns to the toggle, page scroll is held.
 */
export function StaggeredMenu({ tone = "light", solid = false }: { tone?: "light" | "dark"; /** the header bar is solid, so no text shadow is needed */ solid?: boolean }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const layers = root.querySelectorAll("[data-prelayer]");
      const panel = panelRef.current;
      const links = root.querySelectorAll("[data-menu-link]");
      const numbers = root.querySelectorAll("[data-menu-num]");
      const extras = root.querySelectorAll("[data-menu-extra]");
      gsap.set([...layers, panel], { xPercent: 101 });
      // the overlay stays hidden until its layers are parked off-screen — otherwise, on pages
      // without the intro veil, the open menu flashes over the page before scripts run
      root.querySelector<HTMLElement>("[data-menu-overlay]")?.setAttribute("data-ready", "");

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      if (reduce) {
        // a near-instant (but non-zero) step: zero-length timelines don't reverse reliably
        tl.to([...layers, panel], { xPercent: 0, duration: 0.01 });
      } else {
        tl.to(layers, { xPercent: 0, duration: 0.55, stagger: 0.08 })
          .to(panel, { xPercent: 0, duration: 0.7 }, 0.14)
          .fromTo(links, { yPercent: 120 }, { yPercent: 0, duration: 0.9, stagger: 0.07 }, 0.32)
          .fromTo(numbers, { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.07, ease: "power2.out" }, 0.6)
          .fromTo(extras, { opacity: 0, y: 13 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 }, 0.5);
      }
      tlRef.current = tl;
    },
    { scope: rootRef },
  );

  const close = useCallback(() => setOpen(false), []);

  const wasOpen = useRef(false);
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!open && !wasOpen.current) return; // nothing to close on first mount
    wasOpen.current = open;
    if (open) {
      tl.timeScale(1).play();
      document.body.style.overflow = "hidden";
      panelRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    } else {
      tl.timeScale(1.6).reverse();
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a, button")].filter(
          Boolean,
        ) as HTMLElement[];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onDark = tone === "dark" || open;

  return (
    <div ref={rootRef}>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((v) => !v)}
        className={`relative z-[60] inline-flex h-[44px] items-center px-s8 text-[15px] font-semibold tracking-[0.08em] uppercase transition-colors duration-300 ${
          onDark ? `on-dark text-paper hover:text-gold-soft ${open || solid ? "" : "[text-shadow:0_1px_6px_rgb(0_0_0/0.55)]"}` : "text-forest hover:text-farm"
        }`}
      >
        <span className="relative block h-[1.4em] overflow-hidden">
          <span
            className={`block transition-transform duration-500 ease-[var(--ease-earth)] ${open ? "-translate-y-1/2" : ""}`}
          >
            <span className="block">Menu</span>
            <span className="block">Close</span>
          </span>
        </span>
      </button>

      <div
        data-menu-overlay=""
        className={`invisible fixed inset-0 z-50 data-[ready]:visible ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close menu"
          onClick={close}
          className={`absolute inset-0 bg-ink/40 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <div data-prelayer="" className="absolute inset-y-0 right-0 w-full bg-gold sm:w-[min(560px,61.8vw)]" />
        <div data-prelayer="" className="absolute inset-y-0 right-0 w-full bg-farm sm:w-[min(560px,61.8vw)]" />
        <nav
          id="site-menu"
          ref={panelRef}
          aria-label="Site"
          inert={!open}
          className="on-dark absolute inset-y-0 right-0 flex w-full flex-col overflow-y-auto overscroll-contain bg-forest px-s34 pt-[104px] pb-[calc(34px+env(safe-area-inset-bottom))] text-paper sm:w-[min(560px,61.8vw)] sm:px-s55 sm:pt-s144"
        >
          <ul className="flex flex-col gap-[6px] sm:gap-s8">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href} className="overflow-hidden">
                <a
                  data-menu-link=""
                  href={link.href}
                  onClick={close}
                  className="flex w-fit items-start gap-s8 py-[2px] font-display text-[clamp(27px,7.6vw,45px)] leading-[1.15] tracking-[-0.015em] whitespace-nowrap transition-colors duration-300 hover:text-gold-soft sm:gap-s13"
                >
                  {link.label}
                  {/* the item's number, as in React Bits' StaggeredMenu: always at the label's top right, never wrapped
                      below it; decorative, so screen readers skip it */}
                  <span
                    data-menu-num=""
                    aria-hidden="true"
                    className="shrink-0 pt-[0.3em] font-sans text-[12px] leading-none font-medium tracking-[0.04em] text-gold tabular-nums sm:text-[14px]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto grid gap-s21 pt-s34 text-[15px] text-paper/80 sm:pt-s55">
            <div data-menu-extra="" className="grid gap-[3px]">
              <span className="eyebrow text-gold">Reservations</span>
              <a href={CONTACT.reservation.href} className="w-fit text-paper link-gold">
                {CONTACT.reservation.label}
              </a>
              <a href={CONTACT.email.href} className="w-fit text-paper link-gold">
                {CONTACT.email.label}
              </a>
            </div>
            <ul data-menu-extra="" className="flex flex-wrap gap-x-s21 gap-y-s8">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-gold text-paper">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
