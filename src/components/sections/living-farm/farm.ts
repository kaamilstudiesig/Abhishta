import { WHATSAPP_NUMBER } from "@/lib/site";
import type { Tour } from "@/lib/tour";

/**
 * Facts for The Living Farm page — see docs/wireframes/the-living-farm.md for
 * where each comes from (the 360° tour, then the official site). Scenes used
 * here are listed in scripts/tour-scenes.mjs.
 */

/** A WhatsApp chat with the farm, opened with a message already written. */
export const whatsapp = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const DAY_OUTING_ENQUIRY = whatsapp(
  "Hi Abhishta, I'd like to plan a day outing at the farm.\nDate:\nAdults:\nChildren:",
);
export const GAU_SEVA_ENQUIRY = whatsapp(
  "Hi Abhishta, I'd like to know about gau seva at the farm (feeding the cows, a Gau Pooja or a Gau Aarti).\nDate:\nHow many of us:",
);

/** The orchard, from the cow cuddling area: a path between the fruit trees. */
export const ORCHARD_VIEW: Tour = { node: "AerialView_03", pan: -95, tilt: -4 };

/** The gaushaale and the cow cuddling pen, for the Gau seva slideshow. */
export const COW_VIEWS: { name: string; title: string; tour: Tour }[] = [
  { name: "Gir cows", title: "360° view of the gaushaale: Gir cows at the trough", tour: { node: "Abhishta_20", pan: 15, tilt: -6 } },
  { name: "Hallikar", title: "360° view of the gaushaale: the Hallikar stall", tour: { node: "Abhishta_21", pan: -155, tilt: -6 } },
  { name: "Holstein Friesians", title: "360° view along the gaushaale: Holstein Friesians resting", tour: { node: "Abhishta_22", pan: -75, tilt: -6 } },
  { name: "The cow cuddling pen", title: "360° view of the cow cuddling pen in the orchard", tour: { node: "AerialView_03", pan: 0, tilt: -12 } },
];

/** The six breeds named in the gaushaale scenes of the 360° tour, with the tour's own note on each. */
export const BREEDS: { name: string; note: string }[] = [
  { name: "Punganur Gidda", note: "A compact breed, small in size and big on resilience." },
  { name: "Jersey", note: "A small breed with a big reputation for rich, creamy milk." },
  { name: "Hallikar", note: "Karnataka’s own: strong and tireless, the workhorse of Indian farms." },
  { name: "Gir", note: "Known by its distinctive hump, and for the milk it gives." },
  { name: "Kankrej", note: "Robust and versatile, at home in harsh climates and good at the plough." },
  { name: "Holstein Friesian", note: "The black-and-white dairy cow, known the world over for its milk." },
];

/** The goat and sheep shelter in the 360° tour, and the breeds named there. */
export const GOAT_VIEW: Tour = { node: "Abhishta_24", pan: -4, tilt: -6 };
export const GOAT_BREEDS = ["Jamnapari", "South African Boer", "Thalassery"];

/** The yard by the chicken coop, where the hens wander (the duck canopy is behind you in this view). */
export const YARD_VIEW: Tour = { node: "Abhishta_23", pan: -44, tilt: -8 };

/** A day outing, from the official site's Day Outing page. */
export const DAY_OUTING: { time: string; what: string }[] = [
  { time: "8:00", what: "Arrive to a welcome drink" },
  { time: "8:30", what: "Farm breakfast" },
  { time: "9:30", what: "Farm tour and the animals" },
  { time: "11:30", what: "Games and free time" },
  { time: "1:30", what: "Vegetarian lunch" },
  { time: "3:00", what: "The pool" },
  { time: "4:00", what: "Cow cuddling" },
  { time: "5:00", what: "High tea" },
  { time: "6:00", what: "Head home" },
];
