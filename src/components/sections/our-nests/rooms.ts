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
import gopika1 from "@public/images/client-photos/family-gopika-1.jpg";
import gopika2 from "@public/images/client-photos/family-gopika-2.jpg";
import gopika3 from "@public/images/client-photos/family-gopika-3.jpg";
import gopika4 from "@public/images/client-photos/family-gopika-4.jpg";
import nandagokula1 from "@public/images/client-photos/family-nandagokula-1.jpg";
import nandagokula2 from "@public/images/client-photos/family-nandagokula-2.jpg";
import nandagokula3 from "@public/images/client-photos/family-nandagokula-3.jpg";
import nandagokula4 from "@public/images/client-photos/family-nandagokula-4.jpg";
import kaustubha1 from "@public/images/client-photos/family-kaustubha-1.jpg";
import kaustubha2 from "@public/images/client-photos/family-kaustubha-2.jpg";
import kaustubha3 from "@public/images/client-photos/family-kaustubha-3.jpg";
import kaustubha4 from "@public/images/client-photos/family-kaustubha-4.jpg";
import type { Tour } from "@/lib/tour";
import { TOUR_360_URL } from "@/lib/site";

/** Link to a room in the new V7 tour (a new tab): #node,pan,tilt,fov,projection, the same hash as the old tour. */
export const tourV7Url = (t: Tour) => `${TOUR_360_URL}V7/#${t.node},${t.pan},${t.tilt},75,4`;

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
    tour: { node: "Mayura", pan: 340, tilt: -12 },
  },
  {
    id: "mathura", name: "Mathura", sleeps: "4", pillows: { solo: 1, pairs: 1, extra: 1 },
    photos: [room("Mathura", 1, mathura1), room("Mathura", 2, mathura2), room("Mathura", 3, mathura3), room("Mathura", 4, mathura4, "50% 65%")],
    tour: { node: "Mathura", pan: 70, tilt: -12 },
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

/** Rates per person for a night, all meals included (client's rate sheet), and a day outing (client, 2026-11-02). */
export const RATES = {
  cottageAdult: "₹5,000",
  cottageChild: "₹2,500",
  familyRoom: "₹3,500",
  dayOuting: "₹1,750",
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
  /** The client's photos (2026-11-07): three of the room, then the block from outside with its name over the door. */
  photos: CottagePhoto[];
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
    photos: [
      { src: gopika1, alt: "Gopika room: double beds with white sheets and tan blankets on a red floor, under a high tiled timber roof" },
      { src: gopika2, alt: "Gopika room: rows of double beds leading to two washroom doors and a mirror, big windows on both sides" },
      { src: gopika3, alt: "Gopika room: double beds in two rows, windows with green curtains and wall fans" },
      { src: gopika4, alt: "The Gopika block from outside: an orange building with a tiled roof and patterned window frames, palms and a lawn", focus: "30% 50%" },
    ],
    tour: { node: "NandagokulaFamilyRoom", pan: 90, tilt: -12 },
  },
  {
    id: "nandagokula",
    name: "Nandagokula",
    sleeps: "10",
    beds: "single beds",
    bathrooms: "2 bathrooms",
    suits: "For friends, school groups and camps.",
    pillows: { solo: 10, pairs: 0, extra: 0 },
    photos: [
      { src: nandagokula1, alt: "Nandagokula room: a long hall of single beds with red bases, big garden windows and an open glass door" },
      { src: nandagokula2, alt: "Nandagokula room: the hall of single beds seen from a corner, under a high tiled timber roof", focus: "50% 70%" },
      { src: nandagokula3, alt: "Nandagokula room: single beds with tan blankets and brown towels, hanging lamps from the roof beams", focus: "50% 60%" },
      { src: nandagokula4, alt: "The Nandagokula front porch: a painted door frame, wooden pillars and the room's name sign under a tiled gable", focus: "50% 35%" },
    ],
    tour: { node: "NandagokulaBachelorsDormitory", pan: 280, tilt: -12 },
  },
  {
    id: "kaustubha",
    name: "Kaustubha",
    sleeps: "5",
    beds: "5 single beds",
    bathrooms: "1 bathroom",
    suits: "For a small family or a few friends.",
    pillows: { solo: 5, pairs: 0, extra: 0 },
    photos: [
      { src: kaustubha1, alt: "Kaustubha room: single and folding beds with mustard blankets on a red floor, a window at the far end" },
      { src: kaustubha2, alt: "Kaustubha room: beds on both sides, an open shelf and an open door out to the lawn" },
      { src: kaustubha3, alt: "Kaustubha room: a bed with folded towels in front, more beds and a fan behind", focus: "50% 65%" },
      { src: kaustubha4, alt: "The Kaustubha front: an orange wall with wooden pillars, a hanging lantern and the room's name sign over the door", focus: "50% 40%" },
    ],
    tour: { node: "Kausthuba", pan: 325, tilt: -12 },
  },
];

/** Select a room from elsewhere on the page (the "Choose your nest" options). */
export const SELECT_ROOM = "nests:select-room";

export function selectRoom(id: string) {
  window.dispatchEvent(new CustomEvent<string>(SELECT_ROOM, { detail: id }));
}
