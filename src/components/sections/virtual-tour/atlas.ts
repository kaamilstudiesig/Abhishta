import type { Tour } from "@/lib/tour";

/**
 * Facts for the Field Notes & 360° Atlas page — see docs/wireframes/field-notes.md. Scenes used here are listed in
 * scripts/tour-scenes.mjs.
 */

/** The atlas: one 360° view turned from place to place. */
export const ATLAS: { name: string; tour: Tour }[] = [
  { name: "From above", tour: { node: "BirdsEyeView01", pan: -85, tilt: -40 } },
  { name: "Entrance", tour: { node: "AerialView_01", pan: 0, tilt: -8 } },
  { name: "Cottage", tour: { node: "Abhishta_27", pan: -12, tilt: -16 } },
  { name: "Family room", tour: { node: "Abhishta_06", pan: -120, tilt: -15 } },
  { name: "Orchard", tour: { node: "AerialView_03", pan: -95, tilt: -4 } },
  { name: "Pool", tour: { node: "SwimmingPoolBliss", pan: -90, tilt: -5 } },
  { name: "Dining hall", tour: { node: "Abhishta_03", pan: 22, tilt: -8 } },
  { name: "Gaushaale", tour: { node: "Abhishta_20", pan: 15, tilt: -6 } },
  { name: "Campfire area", tour: { node: "Amphitheatre", pan: 12, tilt: -5 } },
];

/** The farm's position, from the tour (BirdsEyeView01 latitude/longitude). */
export const FARM = { lat: 13.084506, lng: 76.924179 };

export type PlaceKind = "hill" | "temple" | "water" | "craft";

/**
 * Nearby places from the tour's bird's-eye scene: drive time, and the direction each lies in. The scene's north is 0,
 * so the compass bearing is the hotspot's pan turned clockwise (−pan). The map is drawn from these, not to scale.
 */
export const NEARBY: { name: string; kind: PlaceKind; label: string; minutes: number; bearing: number }[] = [
  { name: "Rangaswamy Betta", kind: "hill", label: "Hill walk", minutes: 27, bearing: 123.6 },
  { name: "Sidlingeshwara Yoga Vana Betta", kind: "hill", label: "Hill walk", minutes: 29, bearing: 150.5 },
  { name: "Markonahalli Dam", kind: "water", label: "Dam and reservoir", minutes: 31, bearing: 181.3 },
  { name: "Kalur weaving", kind: "craft", label: "Handloom sarees", minutes: 31, bearing: 25.2 },
  { name: "Yediyur Siddalingeshwara Temple", kind: "temple", label: "Temple", minutes: 32, bearing: 212.6 },
  { name: "Hadinkal Anjaneya Temple", kind: "temple", label: "Temple", minutes: 36, bearing: 332.7 },
  { name: "Panchamukhi Anjaneya Temple", kind: "temple", label: "Temple", minutes: 39, bearing: 91.9 },
  { name: "Adichunchanagiri Mutt", kind: "temple", label: "Temple and mutt", minutes: 45, bearing: 287.1 },
  { name: "Shanimahatma Temple", kind: "temple", label: "Temple", minutes: 50, bearing: 60.2 },
  { name: "Shravanabelagola", kind: "temple", label: "Temple town", minutes: 55, bearing: 245.9 },
];

/** Plain-words compass direction for a bearing. */
export function compass(bearing: number) {
  const names = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
  return names[Math.round((((bearing % 360) + 360) % 360) / 45) % 8];
}

/** What every stay includes (client's rate sheet, 2026-10-20). */
export const INCLUDES = [
  "Breakfast, lunch, evening snacks and dinner",
  "The swimming pool",
  "Cow cuddling and feeding the animals",
  "Guided farm tours and seasonal activities",
  "Vegetable harvesting and fruit picking",
  "Nature walks and bonfire evenings",
  "The traditional bath (hande ole)",
  "Free Wi-Fi and ample parking",
];
