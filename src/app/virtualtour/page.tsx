import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { AtlasHero } from "@/components/sections/virtual-tour/AtlasHero";
import { FindUs } from "@/components/sections/virtual-tour/FindUs";
import { AskUs } from "@/components/sections/virtual-tour/AskUs";

const description =
  "Walk around Abhishta Agri Farm Stay in 360°: the cottages, family rooms, orchard, pool, dining hall and gaushaale. Then find the way from Bangalore (about 90 km) and ask us anything.";

export const metadata: Metadata = {
  title: "360° Virtual Tour | Abhishta Agri Farm Stay",
  description,
  alternates: { canonical: "/virtualtour" },
  openGraph: { title: "360° Virtual Tour — Abhishta Agri Farm Stay", description, images: ["/images/og.jpg"], locale: "en_IN", type: "website" },
};

/**
 * The 360° Virtual Tour (/virtualtour, the shareable link the client asked for; /field-notes redirects here) —
 * one screen per section: the full-screen tour, how to reach us, ask us. The photos moved to /gallery (2026-10-31). Built from
 * docs/wireframes/virtual-tour.md. "Around the farm" now closes the homepage.
 */
export default function VirtualTour() {
  return (
    <SiteShell>
      <AtlasHero />
      <FindUs />
      <AskUs />
    </SiteShell>
  );
}
