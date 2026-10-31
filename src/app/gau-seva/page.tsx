import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { GauHero } from "@/components/sections/gau-seva/GauHero";
import { Breeds } from "@/components/sections/gau-seva/Breeds";
import { WaysToServe } from "@/components/sections/gau-seva/WaysToServe";
import { Gaushaale } from "@/components/sections/gau-seva/Gaushaale";

const description =
  "Gau seva at Abhishta Agri Farm Stay: six breeds of cow in the gaushaale, from Punganur Gidda to Karnataka's own Hallikar. Feed them, sit with them, or join a Gau Pooja or Gau Aarti, 90 km from Bangalore.";

export const metadata: Metadata = {
  title: "Gau seva — the gaushaale | Abhishta Agri Farm Stay",
  description,
  alternates: { canonical: "/gau-seva" },
  openGraph: { title: "Gau seva — Abhishta Agri Farm Stay", description, images: ["/images/og.jpg"], locale: "en_IN", type: "website" },
};

/** Gau seva (2026-11): its own page, one screen per section; The living farm keeps a short version that links here. */
export default function GauSevaPage() {
  return (
    <SiteShell>
      <GauHero />
      <Breeds />
      <WaysToServe />
      <Gaushaale />
    </SiteShell>
  );
}
