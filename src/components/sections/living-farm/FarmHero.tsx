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
      lead="Rediscover joy in the simplicity of rural life: pick, feed, walk, and sit with the cows on a working farm."
      cta={{ label: "Plan a farm day", href: DAY_OUTING_ENQUIRY, external: true }}
      jumps={[
        { label: "Work the land", href: "#work-the-land" },
        { label: "The animals", href: "#animals" },
        { label: "Gau seva", href: "#gau-seva" },
        { label: "Soil to table", href: "#soil-to-table" },
        { label: "Plan your visit", href: "#plan-your-visit" },
      ]}
    />
  );
}
