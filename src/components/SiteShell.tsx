import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { FloatingActions } from "@/components/FloatingActions";
import { SmoothScroll } from "@/components/SmoothScroll";
import { IntroVeil } from "@/components/IntroVeil";
import { Footer } from "@/components/sections/Footer";

/**
 * The chrome every page shares: skip link, navbar, main, the sticky footer
 * revealed beneath it, the floating booking/WhatsApp buttons, all inside
 * SmoothScroll. `intro` plays the page-load veil (homepage only).
 */
export function SiteShell({ children, intro = false }: { children: ReactNode; intro?: boolean }) {
  return (
    <SmoothScroll>
      <a
        href="#main"
        className="fixed top-s13 left-s13 z-[80] -translate-y-[200%] rounded-btn bg-paper px-s21 py-s13 font-medium text-forest shadow-float focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      {/* Page content sits above the sticky footer with a solid background — the footer is revealed beneath it. */}
      <main id="main" tabIndex={-1} className="relative z-10 bg-paper outline-none">
        {children}
      </main>
      <Footer />
      {/* touch screens: in-flow end-of-page snap stop (desktop ignores it; the footer stays free there) */}
      <div data-snap-end="" aria-hidden="true" className="-mt-px h-px" />
      <FloatingActions />
      {intro ? <IntroVeil /> : null}
    </SmoothScroll>
  );
}
