import type { StaticImageData } from "next/image";
import cottage1 from "@public/images/client-photos/stay-cottage-1.jpg";
import cottage3 from "@public/images/client-photos/stay-cottage-3.jpg";
import dorm2 from "@public/images/client-photos/stay-dorm-2.jpg";
import { TOUR_360_URL } from "@/lib/site";

/**
 * Rooms on the Our Nests page — names, beds and washrooms from the 360° tour;
 * capacity, AC and amenities from Stayflexi (docs/wireframes/our-nests.md).
 * Courtyard House is the owners' residence and is deliberately not listed.
 */

/** A room's own scene in the Turiya tour, opening on the beds. */
export type Tour = { node: string; pan: number; tilt: number };

/** Turiya (Pano2VR) deep link: #node,pan,tilt,fov,projection. Shared spaces open at the tour's own default view. */
export function tourUrl(node: string, view?: { pan: number; tilt: number }) {
  return view ? `${TOUR_360_URL}#${node},${view.pan},${view.tilt},75,4` : `${TOUR_360_URL}#${node}`;
}

export type Photo = { src: StaticImageData; alt: string };

export type Room = {
  id: string;
  name: string;
  /** what the name means, shown as a small caption */
  meaning?: string;
  /** null = the client is still sending this room's photo: a styled placeholder renders instead */
  photo: Photo | null;
  tour?: Tour;
};

/** The two client cottage interiors. Matched by the paintings on their walls (a peacock in Mayura, Krishna in Mathura). */
const MAYURA_PHOTO: Photo = {
  src: cottage3,
  alt: "Inside a cottage: a made-up double bed with green cushions under a peacock painting, a dark wardrobe, a folding extra bed by a tall garden window and a red-oxide floor",
};
const MATHURA_PHOTO: Photo = {
  src: cottage1,
  alt: "Inside a cottage: a double bed with a green runner and folded towels, a painting of Krishna and Balarama, a folding extra bed and a carved door open onto the garden",
};

export const COTTAGES: Room[] = [
  { id: "mayura", name: "Mayura", meaning: "the peacock", photo: MAYURA_PHOTO, tour: { node: "Abhishta_27", pan: -12, tilt: -16 } },
  { id: "mathura", name: "Mathura", meaning: "his birthplace", photo: MATHURA_PHOTO, tour: { node: "Abhishta_25", pan: 68.6, tilt: -18 } },
  // TODO(client): Gopala and Govardhana photos are on their way — set `photo` when they land. No room view in the tour.
  { id: "gopala", name: "Gopala", meaning: "the cowherd", photo: null },
  { id: "govardhana", name: "Govardhana", meaning: "the hill he lifted", photo: null },
];

export type GroupRoom = Room & {
  short: string;
  sleeps: string;
  beds: string;
  suits: string;
  pillows: Pillows;
};

/** How a room sleeps, drawn as pillows: `pairs` share a double bed; `extra` are dashed (an extra bed, or the room's upper range). */
export type Pillows = { solo: number; pairs: number; extra: number };

export const NANDAGOKULA: GroupRoom[] = [
  {
    id: "family-dormitory",
    name: "Family dormitory",
    short: "Family dormitory",
    sleeps: "10",
    beds: "5 double beds",
    suits: "For families who travel together.",
    pillows: { solo: 0, pairs: 5, extra: 0 },
    // TODO(client): Family dormitory photo on its way (the 360° view covers it meanwhile).
    photo: null,
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
    photo: {
      src: dorm2,
      alt: "The bachelors dormitory: two rows of single beds with folded blankets and towels under a high tiled timber roof, garden windows on the left and the door open to the lawn",
    },
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
    // TODO(client): Triple occupancy photo on its way (the 360° view covers it meanwhile).
    photo: null,
    tour: { node: "Abhishta_08", pan: -57, tilt: -15 },
  },
];

/** Cottages sleep up to 5: beds for four, plus an extra bed or mattress. */
export const COTTAGE_PILLOWS: Pillows = { solo: 0, pairs: 2, extra: 1 };

/** Select a room from elsewhere on the page (the "Which nest is yours?" options). */
export const SELECT_ROOM = "nests:select-room";

export function selectRoom(id: string) {
  window.dispatchEvent(new CustomEvent<string>(SELECT_ROOM, { detail: id }));
}
