import veranda from "@public/images/client-photos/stay-cottage-exterior.jpg";
import { PageHero } from "@/components/sections/PageHero";
import { BOOKING_URL } from "@/lib/site";

/**
 * Our nests hero — the terracotta veranda full screen, "Explore / Our nests"
 * drifting as you scroll away, one booking CTA and glass jump pills (PageHero).
 * The photo sits a little low so the roof and the painted doorway stay in view.
 */
export function NestsHero() {
  return (
    <PageHero
      image={veranda}
      alt="The Nandagokula veranda: terracotta walls, a doorway framed in hand-painted folk motifs, a red-oxide floor and a tiled timber roof above the lawn"
      imagePosition="object-[50%_58%]"
      lines={["Explore", "Our nests"]}
      lead="Four cottages and three family rooms under tiled roofs, a step from the orchard. Every meal is included."
      cta={{ label: "Check availability", href: BOOKING_URL, external: true }}
      jumps={[
        { label: "Cottages", href: "#cottages" },
        { label: "Family rooms", href: "#dormitories" },
        { label: "Shared spaces", href: "#shared-spaces" },
        { label: "Plan a stay", href: "#plan-your-stay" },
      ]}
    />
  );
}
