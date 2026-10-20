import type { Tour } from "@/lib/tour";

/**
 * Rooms on the Our Nests page, from the client's own rate sheet (2026-10-20), which replaces what Stayflexi and the
 * old site said: four air-conditioned cottages (Mayura and Mathura for up to 4, Gopala and Govinda for up to 3), and
 * three non-AC family rooms on shared occupancy (Gopika and Nandagokula for up to 10, Kaustubha for up to 5). Every
 * stay includes all meals. Which 360° scene shows which family room is matched by its beds (the tour calls them the
 * family dormitory, bachelors dormitory and triple occupancy). Courtyard House is the owners' residence and isn't listed.
 */

/** The four cottages share one layout. The tour has two of them, Mayura and Mathura, and Mayura's washroom. */
export const COTTAGE_NAMES = ["Mayura", "Mathura", "Gopala", "Govinda"];
export const COTTAGE_VIEWS: { name: string; title: string; tour: Tour }[] = [
  { name: "Mayura", title: "360° view inside Mayura cottage", tour: { node: "Abhishta_27", pan: -12, tilt: -16 } },
  { name: "Mathura", title: "360° view inside Mathura cottage", tour: { node: "Abhishta_25", pan: 68, tilt: -12 } },
  { name: "Mayura’s washroom", title: "360° view of Mayura cottage’s washroom", tour: { node: "Abhishta_28", pan: 118, tilt: -10 } },
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
