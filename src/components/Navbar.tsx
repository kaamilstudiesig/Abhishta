"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { StaggeredMenu } from "@/components/bits/StaggeredMenu";
import { GradualBlur } from "@/components/bits/GradualBlur";
import { BOOKING_URL } from "@/lib/site";
import { buttonClass } from "@/components/ui";

/**
 * Fixed navbar. Its tone follows whatever band sits beneath it: each section
 * declares data-nav="dark" | "light", and a thin observer line at the top of
 * the viewport picks the current one. A GradualBlur haze sits behind it.
 */
export function Navbar() {
  const [tone, setTone] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-nav]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setTone((entry.target as HTMLElement).dataset.nav === "light" ? "light" : "dark");
        }
      },
      { rootMargin: "-34px 0px -96% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const dark = tone === "dark";

  return (
    <header className="fixed inset-x-0 top-0 z-[70]">
      <GradualBlur
        position="top"
        height="110px"
        strength={1.2}
        tint={dark ? "rgba(7,59,36,0.35)" : "rgba(250,246,239,0.85)"}
        className="transition-opacity duration-500 [&>div:last-child]:transition-[background] [&>div:last-child]:duration-500"
      />
      <div className="relative mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-s21 sm:px-s34">
        <Link
          href="/"
          aria-label="Abhishta Agri Farm Stay — home"
          className={`transition-colors duration-500 ${dark ? "on-dark text-paper" : "text-forest"}`}
        >
          <Logo />
        </Link>
        <div className="flex items-center gap-s8 sm:gap-s13">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass(dark ? "gold" : "primary", "min-h-[44px] max-sm:hidden")}
          >
            Book your stay
          </a>
          <StaggeredMenu tone={tone} />
        </div>
      </div>
    </header>
  );
}
