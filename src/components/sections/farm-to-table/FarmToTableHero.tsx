import diningHall from "@public/images/client-photos/gallery-dining-hall.jpg";
import { PageHero } from "@/components/sections/PageHero";
import { DAY_OUTING_ENQUIRY } from "@/lib/site";

/** Farm to table hero — the dining hall, "Farm to / table" drifting as you scroll away, one CTA and jump pills. */
export function FarmToTableHero() {
  return (
    <PageHero
      image={diningHall}
      alt="The dining hall: long tables and chairs under a tiled timber roof, open to the garden on every side"
      imagePosition="object-[50%_55%]"
      lines={["Farm to", "table"]}
      lead="Our vegetables, fruit and milk come from the farm, so the food on your plate is fresh and simple."
      cta={{
        label: "Plan a farm day",
        href: DAY_OUTING_ENQUIRY,
        external: true,
      }}
      jumps={[
        { label: "Soil to table", href: "#soil-to-table" },
        { label: "Where it comes from", href: "#from-the-farm" },
        { label: "Meals", href: "#meals" },
      ]}
    />
  );
}
