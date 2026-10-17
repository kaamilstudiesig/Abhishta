"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "@/components/SmoothScroll";
import { CONTACT, NAV_LINKS, SOCIALS } from "@/lib/site";

gsap.registerPlugin(useGSAP);

/**
 * Brand StaggeredMenu — adapted from React Bits. Two pre-layers (gold, then
 * farm green) sweep in from the right like turned soil, the forest panel lands
 * on top, and the links rise one after another in Fraunces. Escape closes it,
 * focus moves into the panel and returns to the toggle, page scroll is held.
 */
export function StaggeredMenu({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
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
      const extras = root.querySelectorAll("[data-menu-extra]");
      gsap.set([...layers, panel], { xPercent: 101 });

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      if (reduce) {
        tl.set([...layers, panel], { xPercent: 0 }).set([links, extras], { yPercent: 0, opacity: 1 });
      } else {
        tl.to(layers, { xPercent: 0, duration: 0.55, stagger: 0.08 })
          .to(panel, { xPercent: 0, duration: 0.7 }, 0.14)
          .fromTo(links, { yPercent: 120 }, { yPercent: 0, duration: 0.9, stagger: 0.07 }, 0.32)
          .fromTo(extras, { opacity: 0, y: 13 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 }, 0.5);
      }
      tlRef.current = tl;
    },
    { scope: rootRef },
  );

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (open) {
      tl.timeScale(1).play();
      lenis?.stop();
      document.body.style.overflow = "hidden";
      panelRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    } else {
      tl.timeScale(1.6).reverse();
      lenis?.start();
      document.body.style.overflow = "";
    }
  }, [open, lenis]);

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
        className={`relative z-[60] inline-flex h-[44px] items-center gap-s13 rounded-full pr-s8 pl-s21 text-[15px] font-medium transition-colors duration-300 ${
          onDark ? "on-dark text-paper hover:bg-paper/10" : "text-forest hover:bg-forest/5"
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
        <span
          aria-hidden="true"
          className={`grid size-[34px] place-items-center rounded-full border-[1.5px] ${onDark ? "border-paper/40" : "border-forest/25"}`}
        >
          <span className="relative block h-[10px] w-[14px]">
            <span
              className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-[var(--ease-earth)] ${open ? "top-[4px] rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-[var(--ease-earth)] ${open ? "top-[4px] -rotate-45" : "top-[8.5px]"}`}
            />
          </span>
        </span>
      </button>

      <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
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
          className="on-dark absolute inset-y-0 right-0 flex w-full flex-col overflow-y-auto overscroll-contain bg-forest px-s34 pt-s144 pb-s34 text-paper sm:w-[min(560px,61.8vw)] sm:px-s55"
        >
          <ul className="flex flex-col gap-s8">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="overflow-hidden">
                <a
                  data-menu-link=""
                  href={link.href}
                  onClick={close}
                  className="block w-fit py-[3px] font-display text-[clamp(34px,6vw,45px)] leading-[1.1] tracking-[-0.015em] transition-colors duration-300 hover:text-gold-soft"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto grid gap-s21 pt-s55 text-[15px] text-paper/80">
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
