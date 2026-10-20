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

/** Nearby places from the tour's bird's-eye scene: drive time and the direction (pan) each lies in. */
export const NEARBY: { name: string; kind: string; minutes: number; pan: number }[] = [
  { name: "Rangaswamy Betta", kind: "Hill walk", minutes: 27, pan: -123.6 },
  { name: "Sidlingeshwara Yoga Vana Betta", kind: "Hill walk", minutes: 29, pan: -150.5 },
  { name: "Markonahalli Dam", kind: "Dam", minutes: 31, pan: -181.3 },
  { name: "Kalur weaving and sarees", kind: "Handloom", minutes: 31, pan: -25.2 },
  { name: "Yediyur Siddalingeshwara Temple", kind: "Temple", minutes: 32, pan: -212.6 },
  { name: "Hadinkal Anjaneya Temple", kind: "Temple", minutes: 36, pan: -332.7 },
  { name: "Panchamukhi Anjaneya Temple", kind: "Temple", minutes: 39, pan: -91.9 },
  { name: "Adichunchanagiri Mutt", kind: "Temple", minutes: 45, pan: -287.1 },
  { name: "Shanimahatma Temple", kind: "Temple", minutes: 50, pan: -60.2 },
  { name: "Shravanabelagola", kind: "Temple town", minutes: 55, pan: -245.9 },
];

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
