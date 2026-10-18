"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { StaggeredMenu } from "@/components/bits/StaggeredMenu";
import { GradualBlur } from "@/components/bits/GradualBlur";
import { WHATSAPP_URL } from "@/lib/site";

/**
 * Fixed navbar. Its tone follows whatever band sits beneath it: each section
 * declares data-nav="dark" | "light"; whichever sits under the bar (checked
 * on scroll and on a "navtone" event) sets it. Enquire · logo · Menu, after the
 * reference; a GradualBlur haze sits behind it only over light bands.
 */
export function Navbar() {
  const [tone, setTone] = useState<"dark" | "light">("dark");

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

  return (
    <header className="fixed inset-x-0 top-0 z-[70]">
      {/* haze only over light bands; over the film the bar is fully clear */}
      <div className={`transition-opacity duration-500 ${dark ? "opacity-0" : "opacity-100"}`}>
        <GradualBlur position="top" height="104px" strength={1} tint="rgba(250,247,240,0.92)" />
      </div>
      <div className="relative mx-auto grid h-[80px] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-s13 sm:px-s34">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`justify-self-start px-s8 py-s13 text-[14px] font-medium tracking-[0.08em] uppercase transition-colors duration-300 ${
            dark ? "on-dark text-paper hover:text-gold-soft" : "text-forest hover:text-farm"
          }`}
        >
          Enquire
        </a>
        <Link href="/" aria-label="Abhishta Agri Farm Stay — home" className="justify-self-center">
          <span
            className={`block rounded-[6px] px-s8 py-[4px] transition-colors duration-500 ${dark ? "bg-paper/90" : "bg-transparent"}`}
          >
            <Logo className="!h-[38px] sm:!h-[44px]" />
          </span>
        </Link>
        <div className="justify-self-end">
          <StaggeredMenu tone={tone} />
        </div>
      </div>
    </header>
  );
}
