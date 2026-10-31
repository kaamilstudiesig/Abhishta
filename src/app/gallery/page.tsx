import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { Gallery } from "@/components/sections/gallery/Gallery";

const description =
  "Photos of Abhishta Agri Farm Stay: the cottages and family rooms, the dining hall, the garden, the amphitheatre and the orchard, on a working farm 90 km from Bangalore.";

export const metadata: Metadata = {
  title: "Gallery | Abhishta Agri Farm Stay",
  description,
  alternates: { canonical: "/gallery" },
  openGraph: { title: "Gallery — Abhishta Agri Farm Stay", description, images: ["/images/og.jpg"], locale: "en_IN", type: "website" },
};

/** The gallery (client, 2026-10-31): one screen, a drifting wall of the farm's photos, then the footer. */
export default function GalleryPage() {
  return (
    <SiteShell>
      <Gallery />
    </SiteShell>
  );
}
