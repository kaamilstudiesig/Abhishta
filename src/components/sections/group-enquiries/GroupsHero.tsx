import amphitheatre from "@public/images/client-photos/group-event.jpg";
import { PageHero } from "@/components/sections/PageHero";

/** Group enquiries hero — the amphitheatre's tiled tiers on the lawn, "Bring the / whole crew" drifting as you scroll. */
export function GroupsHero() {
  return (
    <PageHero
      image={amphitheatre}
      alt="The amphitheatre: curved tiers patterned in tile around a round stage, on a lawn under the trees"
      imagePosition="object-[50%_55%]"
      lines={["Bring the", "whole crew"]}
      lead="Corporate teams, school groups, day outings and family celebrations, on a working farm 90 km from Bangalore."
      cta={{ label: "Get a group quote", href: "#group-quote" }}
      jumps={[
        { label: "Corporate outings", href: "#corporate" },
        { label: "Day outings", href: "#day-outings" },
        { label: "School visits", href: "#schools" },
        { label: "Destination events", href: "#events" },
        { label: "Get a quote", href: "#group-quote" },
      ]}
    />
  );
}
