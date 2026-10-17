import { Navbar } from "@/components/Navbar";
import { FloatingActions } from "@/components/FloatingActions";
import { PageSnap } from "@/components/PageSnap";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Preview360 } from "@/components/sections/Preview360";
import { Stays } from "@/components/sections/Stays";
import { DayOnFarm } from "@/components/sections/DayOnFarm";
import { Groups } from "@/components/sections/Groups";
import { Reviews } from "@/components/sections/Reviews";
import { Footer } from "@/components/sections/Footer";

/**
 * One screen per section, joined by native CSS scroll snapping (see globals.css):
 * every [data-snap] element is a page the scroll settles on, and PageSnap makes
 * one wheel gesture move exactly one page.
 */
export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="fixed top-s13 left-s13 z-[80] -translate-y-[200%] rounded-btn bg-paper px-s21 py-s13 font-medium text-forest shadow-float focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      {/* Page content sits above the sticky footer with a solid background — the footer is revealed beneath it. */}
      <main id="main" tabIndex={-1} className="relative z-10 bg-paper outline-none">
        <Hero />
        <About />
        <Preview360 />
        <Stays />
        <DayOnFarm />
        <Groups />
        <Reviews />
      </main>
      <Footer />
      {/* in-flow end-of-page snap point (the sticky footer itself cannot act as one) */}
      <div data-snap-end="" aria-hidden="true" className="-mt-px h-px" />
      <FloatingActions />
      <PageSnap />
    </>
  );
}
