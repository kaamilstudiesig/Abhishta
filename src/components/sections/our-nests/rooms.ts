import type { StaticImageData } from "next/image";
import mayura1 from "@public/images/client-photos/cottages/mayura-1.jpg";
import mayura2 from "@public/images/client-photos/cottages/mayura-2.jpg";
import mayura3 from "@public/images/client-photos/cottages/mayura-3.jpg";
import mayura4 from "@public/images/client-photos/cottages/mayura-4.jpg";
import mathura1 from "@public/images/client-photos/cottages/mathura-1.jpg";
import mathura2 from "@public/images/client-photos/cottages/mathura-2.jpg";
import mathura3 from "@public/images/client-photos/cottages/mathura-3.jpg";
import mathura4 from "@public/images/client-photos/cottages/mathura-4.jpg";
import gopala1 from "@public/images/client-photos/cottages/gopala-1.jpg";
import gopala2 from "@public/images/client-photos/cottages/gopala-2.jpg";
import gopala3 from "@public/images/client-photos/cottages/gopala-3.jpg";
import gopala4 from "@public/images/client-photos/cottages/gopala-4.jpg";
import govinda1 from "@public/images/client-photos/cottages/govinda-1.jpg";
import govinda2 from "@public/images/client-photos/cottages/govinda-2.jpg";
import govinda3 from "@public/images/client-photos/cottages/govinda-3.jpg";
import govinda4 from "@public/images/client-photos/cottages/govinda-4.jpg";
import type { Tour } from "@/lib/tour";

/**
 * Rooms on the Our Nests page, from the client's own rate sheet (2026-10-20), which replaces what Stayflexi and the
 * old site said: four air-conditioned cottages (Mayura and Mathura for up to 4, Gopala and Govinda for up to 3), and
 * three non-AC family rooms on shared occupancy (Gopika and Nandagokula for up to 10, Kaustubha for up to 5). Every
 * stay includes all meals. Which 360° scene shows which family room is matched by its beds (the tour calls them the
 * family dormitory, bachelors dormitory and triple occupancy). Courtyard House is the owners' residence and isn't listed.
 */

/**
 * The four cottages, one tab each (client, 2026-10-31: no washroom or sit-out views). Each shows the client's photos
 * of the room as a small slideshow (client, 2026-11: photos for all four, since Gopala and Govinda have no 360° view;
 * Mayura and Mathura keep a link to their 360° view in the tour). `focus` keeps a tall photo's bed in the frame.
 */
export const COTTAGE_NAMES = ["Mayura", "Mathura", "Gopala", "Govinda"];
export type CottagePhoto = { src: StaticImageData; alt: string; focus?: string };
export type Cottage = { id: string; name: string; sleeps: string; pillows: Pillows; photos: CottagePhoto[]; tour?: Tour };
const room = (name: string, n: number, src: StaticImageData, focus?: string): CottagePhoto => ({
  src,
  alt: `Inside ${name} cottage (${n} of 4): a double bed with green cushions and an extra bed under a tiled timber roof, on a red-oxide floor`,
  focus,
});
export const COTTAGES: Cottage[] = [
  {
    id: "mayura", name: "Mayura", sleeps: "4", pillows: { solo: 1, pairs: 1, extra: 1 },
    photos: [room("Mayura", 1, mayura1), room("Mayura", 2, mayura2), room("Mayura", 3, mayura3, "50% 65%"), room("Mayura", 4, mayura4, "50% 65%")],
    tour: { node: "Abhishta_27", pan: -12, tilt: -16 },
  },
  {
    id: "mathura", name: "Mathura", sleeps: "4", pillows: { solo: 1, pairs: 1, extra: 1 },
    photos: [room("Mathura", 1, mathura1), room("Mathura", 2, mathura2), room("Mathura", 3, mathura3), room("Mathura", 4, mathura4, "50% 65%")],
    tour: { node: "Abhishta_25", pan: 68, tilt: -12 },
  },
  {
    id: "gopala", name: "Gopala", sleeps: "3", pillows: { solo: 1, pairs: 1, extra: 0 },
    photos: [room("Gopala", 1, gopala1), room("Gopala", 2, gopala2), room("Gopala", 3, gopala3), room("Gopala", 4, gopala4)],
  },
  {
    id: "govinda", name: "Govinda", sleeps: "3", pillows: { solo: 1, pairs: 1, extra: 0 },
    photos: [room("Govinda", 1, govinda1), room("Govinda", 2, govinda2), room("Govinda", 3, govinda3), room("Govinda", 4, govinda4)],
  },
];

/** Rates per person for a night, all meals included (client's rate sheet). */
export const RATES = {
  cottageAdult: "₹5,000",
  cottageChild: "₹2,500",
  familyRoom: "₹3,500",
};

/** How a room sleeps, drawn as pillows: `pairs` share a double bed; `extra` are dashed (an extra bed, or the room's upper range). */
export type Pillows = { solo: number; pairs: number; extra: number };

/** Gopala and Govinda sleep up to 3, Mayura and Mathura up to 4 (the dashed pillow). */
export const COTTAGE_PILLOWS: Pillows = { solo: 1, pairs: 1, extra: 1 };

export type GroupRoom = {
  id: string;
  name: string;
  sleeps: string;
  beds: string;
  bathrooms: string;
  suits: string;
  pillows: Pillows;
  tour: Tour;
};

export const FAMILY_ROOMS: GroupRoom[] = [
  {
    id: "gopika",
    name: "Gopika",
    sleeps: "10",
    beds: "5 king-size beds",
    bathrooms: "2 bathrooms",
    suits: "For families who travel together.",
    pillows: { solo: 0, pairs: 5, extra: 0 },
    tour: { node: "Abhishta_06", pan: -120, tilt: -15 },
  },
  {
    id: "nandagokula",
    name: "Nandagokula",
    sleeps: "10",
    beds: "single beds",
    bathrooms: "2 bathrooms",
    suits: "For friends, school groups and camps.",
    pillows: { solo: 10, pairs: 0, extra: 0 },
    tour: { node: "Abhishta_04", pan: -18, tilt: -15 },
  },
  {
    id: "kaustubha",
    name: "Kaustubha",
    sleeps: "5",
    beds: "5 single beds",
    bathrooms: "1 bathroom",
    suits: "For a small family or a few friends.",
    pillows: { solo: 5, pairs: 0, extra: 0 },
    tour: { node: "Abhishta_08", pan: -57, tilt: -15 },
  },
];

/** Select a room from elsewhere on the page (the "Choose your nest" options). */
export const SELECT_ROOM = "nests:select-room";

export function selectRoom(id: string) {
  window.dispatchEvent(new CustomEvent<string>(SELECT_ROOM, { detail: id }));
}
