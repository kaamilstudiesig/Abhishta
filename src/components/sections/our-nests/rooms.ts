import type { Tour } from "@/lib/tour";

/**
 * Rooms on the Our Nests page. Names, beds and washrooms from the 360° tour;
 * capacity, AC and amenities from Stayflexi (docs/wireframes/our-nests.md),
 * re-checked 2026-10-19: Stayflexi lists the cottage with a private bathroom
 * and the dormitory (two rooms, each booked whole for up to 10) with a shared
 * one — the tour shows it inside each dorm. Courtyard House is the owners'
 * residence and is deliberately not listed.
 */

/** The four cottages share one layout; the tour has Mayura's room, so the page shows that one. */
export const COTTAGE_NAMES = ["Mayura", "Mathura", "Gopala", "Govardhana"];
export const COTTAGE_TOUR: Tour = { node: "Abhishta_27", pan: -12, tilt: -16 };

/** How a room sleeps, drawn as pillows: `pairs` share a double bed; `extra` are dashed (an extra bed, or the room's upper range). */
export type Pillows = { solo: number; pairs: number; extra: number };

/** Cottages sleep up to 5: beds for 4, plus an extra bed or mattress. */
export const COTTAGE_PILLOWS: Pillows = { solo: 0, pairs: 2, extra: 1 };

export type GroupRoom = {
  id: string;
  name: string;
  short: string;
  sleeps: string;
  beds: string;
  suits: string;
  pillows: Pillows;
  /** Stayflexi sells the two 10-guest dormitories; the triple room is booked by asking. */
  bookable: boolean;
  tour: Tour;
};

export const NANDAGOKULA: GroupRoom[] = [
  {
    id: "family-dormitory",
    name: "Family dormitory",
    short: "Family dormitory",
    sleeps: "10",
    beds: "5 double beds",
    suits: "For families who travel together.",
    pillows: { solo: 0, pairs: 5, extra: 0 },
    bookable: true,
    tour: { node: "Abhishta_06", pan: -120, tilt: -15 },
  },
  {
    id: "bachelors-dormitory",
    name: "Bachelors dormitory",
    short: "Bachelors dormitory",
    sleeps: "10",
    beds: "10 single beds",
    suits: "For friends, school groups and camps.",
    pillows: { solo: 10, pairs: 0, extra: 0 },
    bookable: true,
    tour: { node: "Abhishta_04", pan: -18, tilt: -15 },
  },
  {
    id: "triple",
    name: "Triple room",
    short: "Triple",
    sleeps: "3–4",
    beds: "4 single beds",
    suits: "For three or four friends.",
    pillows: { solo: 3, pairs: 0, extra: 1 },
    bookable: false,
    tour: { node: "Abhishta_08", pan: -57, tilt: -15 },
  },
];

/** Select a room from elsewhere on the page (the "Which nest is yours?" options). */
export const SELECT_ROOM = "nests:select-room";

export function selectRoom(id: string) {
  window.dispatchEvent(new CustomEvent<string>(SELECT_ROOM, { detail: id }));
}
