import type { StaticImageData } from "next/image";
import birthday from "@public/images/client-photos/event-birthday.jpg";
import babyShower from "@public/images/client-photos/event-baby-shower.jpg";
import mehendi from "@public/images/client-photos/event-mehendi.jpg";
import anniversary from "@public/images/client-photos/event-anniversary.jpg";
import kittyParty from "@public/images/client-photos/event-kitty-party.jpg";
import shastipoorthi from "@public/images/client-photos/event-shastipoorthi.jpg";
import type { Tour } from "@/lib/tour";

/**
 * Facts for the Group Enquiries page — see docs/wireframes/group-enquiries.md
 * for where each comes from (the 360° tour, Stayflexi, the official site's
 * School & Corporate, Day Outing and Destination Events pages). Scenes used
 * here are listed in scripts/tour-scenes.mjs.
 */

/** A day outing, stop by stop, and the 360° view of where each happens. */
export const DAY_STOPS: { time: string; what: string; place: string; tour: Tour }[] = [
  { time: "8:00", what: "Arrive to a welcome drink", place: "The gate", tour: { node: "AerialView_01", pan: 0, tilt: -8 } },
  { time: "8:30", what: "Farm breakfast", place: "The dining hall", tour: { node: "Abhishta_03", pan: 22, tilt: -8 } },
  { time: "9:30", what: "Farm tour and the animals", place: "The gaushaale", tour: { node: "Abhishta_20", pan: 15, tilt: -6 } },
  { time: "11:30", what: "Games and free time", place: "The games corner", tour: { node: "Abhishta_10", pan: 95, tilt: -14 } },
  { time: "1:30", what: "Vegetarian lunch", place: "The buffet", tour: { node: "Abhishta_03", pan: -150, tilt: -8 } },
  { time: "3:00", what: "The pool", place: "The pool", tour: { node: "SwimmingPoolBliss", pan: -90, tilt: -5 } },
  { time: "4:00", what: "Cow cuddling", place: "The cow cuddling pen", tour: { node: "AerialView_03", pan: 0, tilt: -12 } },
  { time: "5:00", what: "High tea", place: "The dining hall", tour: { node: "Abhishta_03", pan: 60, tilt: -8 } },
  { time: "6:00", what: "Head home", place: "The farm from above", tour: { node: "BirdsEyeView01", pan: -85, tilt: -40 } },
];

/**
 * The occasions on the official site's Destination Events page. Their photos are the farm's own lawns and pavilions
 * with sample event setups added by AI (client-approved; originals and prompts in ../AI edit/), so the page labels them
 * as sample setups. Swap in photos of real events when there are some.
 */
export const OCCASIONS: { name: string; detail: string; photo: StaticImageData }[] = [
  { name: "Birthdays", detail: "Kids’ parties to family and friends", photo: birthday },
  { name: "Baby showers", detail: "Traditional or modern", photo: babyShower },
  { name: "Pre-wedding and mehendi", detail: "In the open air or indoors", photo: mehendi },
  { name: "Anniversaries", detail: "Quiet dinners to family get-togethers", photo: anniversary },
  { name: "Kitty parties", detail: "Games and an afternoon together", photo: kittyParty },
  { name: "Shastipoorthi", detail: "The 60th-birthday ritual", photo: shastipoorthi },
];

/** Pick an occasion from the events list: the quote form fills itself in. */
export const SELECT_OCCASION = "groups:select-occasion";

export type GroupType = "Corporate outing" | "School or college visit" | "Day outing" | "Destination event";
export const GROUP_TYPES: { value: GroupType; line: string }[] = [
  { value: "Corporate outing", line: "A team day or a retreat" },
  { value: "School or college visit", line: "A field trip or picnic" },
  { value: "Day outing", line: "Friends and families, 8 to 6" },
  { value: "Destination event", line: "A celebration or a retreat" },
];
