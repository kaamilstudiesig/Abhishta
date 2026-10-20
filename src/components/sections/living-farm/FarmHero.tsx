import landscape from "@public/images/client-photos/about-landscape.jpg";
import { PageHero } from "@/components/sections/PageHero";
import { DAY_OUTING_ENQUIRY } from "@/lib/site";

/** The living farm hero — the stone path between the trees, "The living / farm" drifting as you scroll away. */
export function FarmHero() {
  return (
    <PageHero
      image={landscape}
      alt="A stone-paved path running through the farm between palms, cypress trees and flowering shrubs"
      imagePosition="object-[50%_60%]"
      lines={["The living", "farm"]}
      lead="Enjoy simple farm life: pick fruit, feed the animals, go for a walk and spend time with the cows."
      cta={{ label: "Plan a farm day", href: DAY_OUTING_ENQUIRY, external: true }}
      jumps={[
        { label: "Farm activities", href: "#work-the-land" },
        { label: "The animals", href: "#animals" },
        { label: "Gau seva", href: "#gau-seva" },
        { label: "Farm to table", href: "#soil-to-table" },
        { label: "Plan your visit", href: "#plan-your-visit" },
      ]}
    />
  );
}
