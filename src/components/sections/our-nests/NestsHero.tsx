import cottageRow from "@public/images/client-photos/nests-hero-cottage-row.jpg";
import { PageHero } from "@/components/sections/PageHero";
import { BOOKING_URL } from "@/lib/site";

/**
 * Our nests hero — the row of cottages under the palms (client, 2026-10-31; the
 * foreground paving is cropped off the file), "Explore / Our nests" drifting as
 * you scroll away, one booking CTA and glass jump pills (PageHero). Phones keep
 * the nearest cottage's veranda in view.
 */
export function NestsHero() {
  return (
    <PageHero
      image={cottageRow}
      alt="White cottages with tiled roofs and red-oxide verandas in a row under coconut palms, a stone path through the garden beside them"
      imagePosition="object-[58%_50%]"
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
