import { SiteShell } from "@/components/SiteShell";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Preview360 } from "@/components/sections/Preview360";
import { Stays } from "@/components/sections/Stays";
import { DayOnFarm } from "@/components/sections/DayOnFarm";
import { Groups } from "@/components/sections/Groups";
import { Reviews } from "@/components/sections/Reviews";

/**
 * One screen per section. Every [data-snap] element is a page: on desktop
 * SmoothScroll glides one page per gesture; on touch, CSS proximity snapping.
 * The footer is not a page — it scrolls freely.
 */
export default function Home() {
  return (
    <SiteShell intro>
      <Hero />
      <About />
      <Preview360 />
      <Stays />
      <DayOnFarm />
      <Groups />
      <Reviews />
    </SiteShell>
  );
}
