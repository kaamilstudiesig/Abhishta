import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { GroupsHero } from "@/components/sections/group-enquiries/GroupsHero";
import { Corporate } from "@/components/sections/group-enquiries/Corporate";
import { DayOutings } from "@/components/sections/group-enquiries/DayOutings";
import { Schools } from "@/components/sections/group-enquiries/Schools";
import { Events } from "@/components/sections/group-enquiries/Events";
import { GroupQuote } from "@/components/sections/group-enquiries/GroupQuote";

const description =
  "Corporate outings, school and college visits, day outings and family celebrations on a working farm 90 km from Bangalore: team games, a farm tour, cow cuddling, veg and non-veg kitchens, rooms for groups. Get a group quote.";

export const metadata: Metadata = {
  title: "Group enquiries — corporate, school, day outings and events | Abhishta Agri Farm Stay",
  description,
  alternates: { canonical: "/group-enquiries" },
  openGraph: {
    title: "Group enquiries — Abhishta Agri Farm Stay",
    description,
    images: ["/images/og.jpg"],
    locale: "en_IN",
    type: "website",
  },
};

/**
 * Group enquiries — one screen per section, like the other pages: every
 * section is a [data-snap] page. The homepage links to #corporate,
 * #day-outings, #schools and #events. Built from docs/wireframes/group-enquiries.md.
 */
export default function GroupEnquiries() {
  return (
    <SiteShell>
      <GroupsHero />
      <Corporate />
      <DayOutings />
      <Schools />
      <Events />
      <GroupQuote />
    </SiteShell>
  );
}
