import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { FarmHero } from "@/components/sections/living-farm/FarmHero";
import { WorkTheLand } from "@/components/sections/living-farm/WorkTheLand";
import { Animals } from "@/components/sections/living-farm/Animals";
import { GauSeva } from "@/components/sections/living-farm/GauSeva";
import { SoilToTable } from "@/components/sections/living-farm/SoilToTable";
import { PlanVisit } from "@/components/sections/living-farm/PlanVisit";

const description =
  "Pick fruit in the orchard, harvest vegetables, feed the goats and sheep, ride a bullock cart and sit with the cows of the gaushaale, on a working farm 90 km from Bangalore. See the farm in 360°.";

export const metadata: Metadata = {
  title: "The living farm — orchard, animals and gau seva | Abhishta Agri Farm Stay",
  description,
  alternates: { canonical: "/the-living-farm" },
  openGraph: {
    title: "The living farm — Abhishta Agri Farm Stay",
    description,
    images: ["/images/og.jpg"],
    locale: "en_IN",
    type: "website",
  },
};

/**
 * The living farm — one screen per section, like the homepage and Our nests:
 * every section is a [data-snap] page. Built from docs/wireframes/the-living-farm.md.
 */
export default function TheLivingFarm() {
  return (
    <SiteShell>
      <FarmHero />
      <WorkTheLand />
      <Animals />
      <GauSeva />
      <SoilToTable />
      <PlanVisit />
    </SiteShell>
  );
}
