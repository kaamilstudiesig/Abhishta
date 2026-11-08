import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { FullTour } from "@/components/sections/virtual-tour/FullTour";
import { FindUs } from "@/components/sections/virtual-tour/FindUs";
import { AskUs } from "@/components/sections/virtual-tour/AskUs";

const description =
  "Walk around Abhishta Agri Farm Stay in 360°: the cottages, family rooms, orchard, pool, dining hall and gaushaale. Then find the way from Bangalore (about 90 km) and ask us anything.";

export const metadata: Metadata = {
  title: "Virtual Tour | Abhishta Agri Farm Stay",
  description,
  alternates: { canonical: "/virtualtour" },
  openGraph: { title: "Virtual Tour — Abhishta Agri Farm Stay", description, images: ["/images/og.jpg"], locale: "en_IN", type: "website" },
};

/**
 * The 360° Virtual Tour (/virtualtour, the shareable link the client asked for; /field-notes redirects here) —
 * one screen per section: Turiya's full V7 tour embedded (client: the tour must live on this address), how to reach us, ask us. The photos moved to /gallery (2026-10-31). Built from
 * docs/wireframes/virtual-tour.md. "Around the farm" now closes the homepage.
 */
export default function VirtualTour() {
  return (
    <SiteShell>
      <FullTour />
      <FindUs />
      <AskUs />
    </SiteShell>
  );
}
