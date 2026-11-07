import type { StaticImageData } from "next/image";
import birthday from "@public/images/client-photos/event-birthday.jpg";
import babyShower from "@public/images/client-photos/event-baby-shower.jpg";
import mehendi from "@public/images/client-photos/event-mehendi.jpg";
import anniversary from "@public/images/client-photos/event-anniversary.jpg";
import kittyParty from "@public/images/client-photos/event-kitty-party.jpg";
import shastipoorthi from "@public/images/client-photos/event-shastipoorthi.jpg";
import outingGate from "@public/images/client-photos/tour-outing-gate.jpg";
import diningHall from "@public/images/client-photos/gallery-dining-hall.jpg";
import gauGir from "@public/images/client-photos/tour-gau-gir.jpg";
import outingGames from "@public/images/client-photos/tour-outing-games.jpg";
import outingBuffet from "@public/images/client-photos/tour-outing-buffet.jpg";
import outingPool from "@public/images/client-photos/tour-outing-pool.jpg";
import outingCowPen from "@public/images/client-photos/tour-outing-cow-pen.jpg";
import outingDining from "@public/images/client-photos/tour-outing-dining.jpg";
import farmFromAbove from "@public/images/client-photos/tour-farm-from-above.jpg";
import type { Tour } from "@/lib/tour";
import { RATES } from "@/components/sections/our-nests/rooms";

/**
 * Facts for the Group Enquiries page — see docs/wireframes/group-enquiries.md
 * for where each comes from (the 360° tour, Stayflexi, the official site's
 * School & Corporate, Day Outing and Destination Events pages). Scenes used
 * here are listed in scripts/tour-scenes.mjs.
 */

/**
 * A day outing, stop by stop: a still of where each happens (shown first) and the live 360° view of the same place.
 * The client has no photos of food, games, the pool or the cows with guests, so most stills are framed from the farm's
 * own 360° tour (scene and angle in each comment); breakfast uses the client's photo of the dining hall.
 */
export const DAY_STOPS: {
  time: string;
  what: string;
  place: string;
  tour: Tour;
  photo: StaticImageData;
  alt: string;
  /** object-position when the still is cropped */
  focus?: string;
}[] = [
  // still: AerialView_01, pan 0, tilt -4, fov 65
  { time: "8:00", what: "Arrive to a welcome drink", place: "The gate", tour: { node: "AerialView_01", pan: 0, tilt: -8 }, photo: outingGate, alt: "The farm's entrance: a black iron gate at the end of a narrow paved lane, between trees and coconut palms" },
  { time: "8:30", what: "Farm breakfast", place: "The dining hall", tour: { node: "Abhishta_03", pan: 22, tilt: -8 }, photo: diningHall, alt: "The dining hall: wooden tables and chairs on a patterned tile floor under a tiled roof, open to the garden" },
  // still: Abhishta_20, pan 20, tilt -6, fov 65 (shared with the Gir card on /gau-seva)
  { time: "9:30", what: "Farm tour and the animals", place: "The gaushaale", tour: { node: "Abhishta_20", pan: 15, tilt: -6 }, photo: gauGir, alt: "Gir cows at a long trough in the gaushaale, under a sign that reads Gir cow", focus: "45% 50%" },
  // still: Abhishta_10, pan 68, tilt -22, fov 58
  { time: "11:30", what: "Games and free time", place: "The games corner", tour: { node: "Abhishta_10", pan: 95, tilt: -14 }, photo: outingGames, alt: "The games corner: a bucket of bats and racquets, a box of board games and a ball, and a swim ring by the window", focus: "65% 60%" },
  // still: Abhishta_03, pan 250, tilt -10, fov 70
  { time: "1:30", what: "Vegetarian lunch", place: "The buffet", tour: { node: "Abhishta_03", pan: -150, tilt: -8 }, photo: outingBuffet, alt: "The buffet counter in the dining hall: a row of covered steel serving dishes, plates and cutlery", focus: "35% 60%" },
  // still: SwimmingPoolBliss, pan 250, tilt -8, fov 70
  { time: "3:00", what: "The pool", place: "The pool", tour: { node: "SwimmingPoolBliss", pan: -90, tilt: -5 }, photo: outingPool, alt: "The swimming pool: clear blue water with steel steps, a small waterfall at the far end and loungers under coconut palms", focus: "60% 60%" },
  // still: AerialView_03, pan 5, tilt -2, fov 55
  { time: "4:00", what: "Cow cuddling", place: "The cow cuddling pen", tour: { node: "AerialView_03", pan: 0, tilt: -12 }, photo: outingCowPen, alt: "The cow cuddling pen: a small yellow wooden fence on the grass among mango trees", focus: "60% 60%" },
  // still: Abhishta_03, pan 45, tilt -8, fov 70
  { time: "5:00", what: "High tea", place: "The dining hall", tour: { node: "Abhishta_03", pan: 60, tilt: -8 }, photo: outingDining, alt: "Inside the dining hall: long wooden tables and chairs on a patterned floor, bamboo blinds down the sides", focus: "45% 65%" },
  { time: "6:00", what: "Head home", place: "The farm from above", tour: { node: "BirdsEyeView01", pan: -85, tilt: -40 }, photo: farmFromAbove, alt: "The whole farm from straight above: red-roofed cottages, a small blue pool, gardens and rows of trees" },
];

/**
 * The occasions on the official site's Destination Events page. Their photos are the farm's own lawns and pavilions
 * with sample event setups added by AI (client-approved; originals and prompts in ../AI edit/), so the page labels them
 * as sample setups. Swap in photos of real events when there are some.
 */
export const OCCASIONS: { name: string; detail: string; photo: StaticImageData; focus?: string }[] = [
  { name: "Birthdays", detail: "Kids’ parties to family and friends", photo: birthday },
  { name: "Baby showers", detail: "Traditional or modern", photo: babyShower, focus: "50% 58%" },
  { name: "Pre-wedding and mehendi", detail: "In the open air or indoors", photo: mehendi },
  { name: "Anniversaries", detail: "Quiet dinners to family get-togethers", photo: anniversary, focus: "50% 76%" },
  { name: "Kitty parties", detail: "Games and an afternoon together", photo: kittyParty, focus: "50% 66%" },
  { name: "Shastipoorthi", detail: "The 60th-birthday ritual", photo: shastipoorthi },
];

/** Pick an occasion from the events list: the quote form fills itself in. */
export const SELECT_OCCASION = "groups:select-occasion";

export type GroupType = "Corporate outing" | "School or college visit" | "Day outing" | "Destination event";
export const GROUP_TYPES: { value: GroupType; line: string }[] = [
  { value: "Corporate outing", line: "A team day or a retreat" },
  { value: "School or college visit", line: "A field trip or picnic" },
  { value: "Day outing", line: `8 to 6, ${RATES.dayOuting} a person` },
  { value: "Destination event", line: "A celebration or a retreat" },
];
