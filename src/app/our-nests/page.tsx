import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { NestsHero } from "@/components/sections/our-nests/NestsHero";
import { ChooseNest } from "@/components/sections/our-nests/ChooseNest";
import { Cottages } from "@/components/sections/our-nests/Cottages";
import { Nandagokula } from "@/components/sections/our-nests/Nandagokula";
import { Comforts } from "@/components/sections/our-nests/Comforts";
import { SharedSpaces } from "@/components/sections/our-nests/SharedSpaces";
import { PlanStay } from "@/components/sections/our-nests/PlanStay";

const description =
  "Four air-conditioned cottages that sleep up to 5, and the Nandagokula family, bachelors and triple rooms for groups of up to 24, on a working farm 90 km from Bangalore. See each room in 360°.";

export const metadata: Metadata = {
  title: "Our nests — cottages and group rooms | Abhishta Agri Farm Stay",
  description,
  alternates: { canonical: "/our-nests" },
  openGraph: {
    title: "Our nests — Abhishta Agri Farm Stay",
    description,
    images: ["/images/og.jpg"],
    locale: "en_IN",
    type: "website",
  },
};

/**
 * Our nests — one screen per section, like the homepage: every section is a
 * [data-snap] page. The homepage links to #cottages and #dormitories here.
 */
export default function OurNests() {
  return (
    <SiteShell>
      <NestsHero />
      <ChooseNest />
      <Cottages />
      <Nandagokula />
      <Comforts />
      <SharedSpaces />
      <PlanStay />
    </SiteShell>
  );
}
