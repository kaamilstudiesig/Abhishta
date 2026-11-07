import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { Gallery } from "@/components/sections/gallery/Gallery";

const description =
  "Photos of Abhishta Agri Farm Stay: the cottages and family rooms, the dining hall, the garden and the amphitheatre, and the events, school visits and gatherings held there.";

export const metadata: Metadata = {
  title: "Gallery | Abhishta Agri Farm Stay",
  description,
  alternates: { canonical: "/gallery" },
  openGraph: { title: "Gallery — Abhishta Agri Farm Stay", description, images: ["/images/og.jpg"], locale: "en_IN", type: "website" },
};

/** The gallery (client, 2026-11-07): two one-screen drifting photo walls — #beauty (the property) and #moments (events and guests) — then the footer. */
export default function GalleryPage() {
  return (
    <SiteShell>
      <Gallery />
    </SiteShell>
  );
}
