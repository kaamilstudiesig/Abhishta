import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { FarmToTableHero } from "@/components/sections/farm-to-table/FarmToTableHero";
import { SoilToTable } from "@/components/sections/living-farm/SoilToTable";
import { FarmViews } from "@/components/sections/living-farm/FarmViews";
import { Meals } from "@/components/sections/farm-to-table/Meals";

const description =
  "Farm to table at Abhishta Agri Farm Stay: vegetables, fruit and milk from the farm, cooked into simple home-style meals. Every stay includes all four meals. 90 km from Bangalore.";

export const metadata: Metadata = {
  title: "Farm to table — food from the farm | Abhishta Agri Farm Stay",
  description,
  alternates: { canonical: "/farm-to-table" },
  openGraph: { title: "Farm to table — Abhishta Agri Farm Stay", description, images: ["/images/og.jpg"], locale: "en_IN", type: "website" },
};

/** Farm to table (2026-11): its own page, one screen per section; The living farm keeps the diagram and links here. */
export default function FarmToTablePage() {
  return (
    <SiteShell>
      <FarmToTableHero />
      <SoilToTable />
      <FarmViews />
      <Meals />
    </SiteShell>
  );
}
