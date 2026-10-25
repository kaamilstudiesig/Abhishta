"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { LiquidGlass } from "@/components/bits/LiquidGlass";
import { StaggeredMenu } from "@/components/bits/StaggeredMenu";
import { IconWhatsApp } from "@/components/icons";
import { NAV_LINKS, WHATSAPP_URL } from "@/lib/site";

/**
 * The sticky header, after peninsuladelmar.com. Its tone follows whatever band
 * sits beneath it: each section declares data-nav="dark" | "light"; whichever
 * sits under the bar (checked on scroll and on a "navtone" event) sets it.
 *
 * It floats as a rounded bubble of liquid glass (LiquidGlass, from glasscn),
 * inset from the edges with a soft shadow; its rim bends the page behind it. It's
 * clear glass (the page shows through, barely blurred) with a faint white lift,
 * so it reads a few tints lighter than the band beneath, as its own layer.
 *
 * Large screens (xl+): logo on the left, the menu links in one row, and a bold
 * Enquire button on the right. Smaller screens keep Enquire · logo · Menu, with
 * the StaggeredMenu holding the links.
 */
export function Navbar() {
  const [tone, setTone] = useState<"dark" | "light">("dark");
  const [solid, setSolid] = useState(false);
  const path = usePathname();

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      // the band currently under the navbar decides its tone
      const under = Array.from(document.querySelectorAll<HTMLElement>("[data-nav]")).find((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= 40 && r.bottom > 40;
      });
      setTone(under?.dataset.nav === "light" ? "light" : "dark");
      setSolid(window.scrollY > 24);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("navtone", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("navtone", schedule);
    };
  }, []);

  const dark = tone === "dark";
  // over a clear hero the text needs a soft shadow; on the solid bar it doesn't
  const ink = dark
    ? `on-dark text-paper hover:text-gold-soft ${solid ? "" : "[text-shadow:0_1px_6px_rgb(0_0_0/0.55)]"}`
    : "text-forest hover:text-farm";
  const isActive = (href: string) => !href.includes("#") && (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-[70] px-s8 pt-[10px] sm:px-s21">
      <div className="relative mx-auto max-w-[1400px]">
      {/* the bubble: a few tints lighter than the band beneath, glassy over the hero, solid once scrolled */}
      <LiquidGlass
        aria-hidden
        className={`absolute inset-0 rounded-full ring-1 transition-[background-color,box-shadow] duration-500 ${
          dark
            ? `ring-white/30 [--liquid-glass-rim-light:rgb(255_255_255/0.55)] ${solid ? "bg-white/[0.09] shadow-[inset_0_1px_0_rgb(255_255_255/0.4),0_12px_32px_-12px_rgb(0_0_0/0.45)]" : "bg-white/[0.06] shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_8px_24px_-12px_rgb(0_0_0/0.35)]"}`
            : "bg-white/40 shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_12px_32px_-14px_rgb(24_53_32/0.28)] ring-white/70 [--liquid-glass-rim-dark:rgb(24_53_32/0.1)]"
        }`}
      />
      <div className="relative grid h-[64px] grid-cols-[1fr_auto_1fr] items-center px-s8 sm:px-s13 xl:grid-cols-[auto_1fr_auto] xl:gap-s21 xl:pr-[8px]">
        {/* smaller screens: Enquire on the left */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`justify-self-start px-s8 py-s13 text-[15px] font-semibold tracking-[0.08em] uppercase transition-colors duration-300 xl:hidden ${ink}`}
        >
          Enquire
        </a>

        <Link href="/" aria-label="Abhishta Agri Farm Stay — home" className="justify-self-center xl:order-first xl:justify-self-start">
          <span
            className={`block rounded-full px-s13 py-[3px] transition-colors duration-500 ${dark && !solid ? "bg-[var(--logo-backing-dark)]" : dark ? "bg-paper" : "bg-[var(--logo-backing-light)]"}`}
          >
            <Logo className="!h-[36px] sm:!h-[40px]" />
          </span>
        </Link>

        {/* large screens: the menu in one row */}
        <nav aria-label="Main" className="hidden justify-self-center xl:block">
          <ul className="flex items-center gap-x-[clamp(14px,1.6vw,28px)]">
            {NAV_LINKS.map((l) => {
              const on = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={on ? "page" : undefined}
                    className={`relative inline-flex min-h-[44px] items-center text-[14px] font-semibold tracking-[0.06em] whitespace-nowrap uppercase transition-colors duration-300 ${ink}`}
                  >
                    {l.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 bottom-[8px] h-[2px] origin-left rounded-full bg-gold transition-transform duration-500 ease-[var(--ease-earth)] ${on ? "scale-x-100" : "scale-x-0"}`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="justify-self-end">
          {/* large screens: a bold Enquire button */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden min-h-[48px] items-center gap-s8 rounded-full px-s21 text-[15px] font-semibold tracking-[0.04em] uppercase shadow-card transition-colors duration-300 xl:inline-flex ${
              dark ? "bg-paper text-forest hover:bg-gold-soft" : "bg-farm text-paper hover:bg-forest"
            }`}
          >
            <IconWhatsApp size={18} />
            Enquire
          </a>
          <div className="xl:hidden">
            <StaggeredMenu tone={tone} solid={solid} />
          </div>
        </div>
      </div>
      </div>
    </header>
  );
}
