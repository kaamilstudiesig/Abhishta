import audience from "@public/images/client-photos/group-lawn-audience-3.jpg";
import { PageHero } from "@/components/sections/PageHero";

/** Group enquiries hero — a group gathered on the amphitheatre's tiers, "Bring your / whole group" drifting as you scroll. */
export function GroupsHero() {
  return (
    <PageHero
      image={audience}
      alt="A big group seated on the amphitheatre's tiled tiers under the trees, a brass lamp with marigolds on the stage"
      imagePosition="object-[50%_50%]"
      lines={["Bring your", "whole group"]}
      lead="Corporate teams, school groups, day outings and family celebrations, on a working farm 90 km from Bangalore."
      cta={{ label: "Get a group quote", href: "#group-quote" }}
      jumps={[
        { label: "Corporate outings", href: "#corporate" },
        { label: "Day outings", href: "#day-outings" },
        { label: "School visits", href: "#schools" },
        { label: "Parties and events", href: "#events" },
        { label: "Get a quote", href: "#group-quote" },
      ]}
    />
  );
}
