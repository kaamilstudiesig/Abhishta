import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { AtlasHero } from "@/components/sections/field-notes/AtlasHero";
import { Around } from "@/components/sections/field-notes/Around";
import { Gallery } from "@/components/sections/field-notes/Gallery";
import { FindUs } from "@/components/sections/field-notes/FindUs";
import { AskUs } from "@/components/sections/field-notes/AskUs";

const description =
  "Look around Abhishta Agri Farm Stay in 360°, see what's nearby, browse photos, find the way from Bangalore (about 90 km) and ask us anything on WhatsApp.";

export const metadata: Metadata = {
  title: "Field notes & 360° atlas — see the farm, find us | Abhishta Agri Farm Stay",
  description,
  alternates: { canonical: "/field-notes" },
  openGraph: { title: "Field notes & 360° atlas — Abhishta Agri Farm Stay", description, images: ["/images/og.jpg"], locale: "en_IN", type: "website" },
};

/** Field notes & 360° atlas — one screen per section. Built from docs/wireframes/field-notes.md. */
export default function FieldNotes() {
  return (
    <SiteShell>
      <AtlasHero />
      <Around />
      <Gallery />
      <FindUs />
      <AskUs />
    </SiteShell>
  );
}
