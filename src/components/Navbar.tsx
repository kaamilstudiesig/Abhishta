"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { StaggeredMenu } from "@/components/bits/StaggeredMenu";
import { GradualBlur } from "@/components/bits/GradualBlur";

/**
 * Fixed navbar. Its tone follows whatever band sits beneath it: each section
 * declares data-nav="dark" | "light"; whichever sits under the bar (checked
 * on scroll and on a "navtone" event) sets it. A GradualBlur haze sits behind it.
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
      <GradualBlur
        position="top"
        height="110px"
        strength={1.2}
        tint={dark ? undefined : "rgba(250,247,240,0.92)"}
        className="transition-opacity duration-500 [&>div:last-child]:transition-[background] [&>div:last-child]:duration-500"
      />
      <div className="relative mx-auto flex h-[80px] max-w-[1440px] items-center justify-between px-s21 sm:px-s34">
        <Link
          href="/"
          aria-label="Abhishta Agri Farm Stay — home"
          className={`transition-colors duration-500 ${dark ? "on-dark text-paper" : "text-forest"}`}
        >
          <span
            className={`block rounded-btn px-s8 py-[4px] transition-colors duration-500 ${dark ? "bg-paper/90" : "bg-transparent"}`}
          >
            <Logo className="!h-[40px] sm:!h-[46px]" />
          </span>
        </Link>
        <div className="flex items-center gap-s8 sm:gap-s13">
          <StaggeredMenu tone={tone} />
        </div>
      </div>
    </header>
  );
}
