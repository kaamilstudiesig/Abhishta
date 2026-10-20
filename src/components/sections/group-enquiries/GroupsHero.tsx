import amphitheatre from "@public/images/client-photos/group-event.jpg";
import { PageHero } from "@/components/sections/PageHero";

/** Group enquiries hero — the amphitheatre's tiled tiers on the lawn, "Bring your / whole group" drifting as you scroll. */
export function GroupsHero() {
  return (
    <PageHero
      image={amphitheatre}
      alt="The amphitheatre: curved tiers patterned in tile around a round stage, on a lawn under the trees"
      imagePosition="object-[50%_55%]"
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
