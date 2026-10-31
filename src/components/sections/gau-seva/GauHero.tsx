import hallikar from "@public/images/client-photos/tour-gaushaale-hallikar.jpg";
import { PageHero } from "@/components/sections/PageHero";
import { GAU_SEVA_ENQUIRY } from "@/components/sections/living-farm/farm";

/**
 * Gau seva hero — the gaushaale's walkway past the Hallikar stall, a still
 * from the farm's own 360° tour (there's no client photo of the cows yet),
 * "Gau / seva" drifting as you scroll away, one enquiry CTA and jump pills.
 */
export function GauHero() {
  return (
    <PageHero
      image={hallikar}
      alt="The gaushaale: a shaded walkway beside the stalls, with a grey Hallikar cow at the trough under a sign that reads Hallikar"
      imagePosition="object-[60%_50%]"
      lines={["Gau", "seva"]}
      lead="Six breeds of cow live in our gaushaale. Feed them, sit with them, or join a Gau Pooja or Gau Aarti."
      cta={{
        label: "Ask about gau seva",
        href: GAU_SEVA_ENQUIRY,
        external: true,
      }}
      jumps={[
        { label: "The breeds", href: "#breeds" },
        { label: "Ways to serve", href: "#ways-to-serve" },
        { label: "The gaushaale", href: "#the-gaushaale" },
      ]}
    />
  );
}
