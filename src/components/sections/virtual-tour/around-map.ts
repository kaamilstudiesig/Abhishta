/**
 * The geography behind "Around the farm" (Around.tsx): real positions read off Google Maps (map and satellite,
 * 2026-11-07) and a projection onto the 1400 × 900 drawing. Map-only data — nothing else imports this.
 *
 * Projection: true direction from the farm, true distance out to 16 km (21 drawing units per km), then squeezed
 * (logarithmically) so the far places (Shanimahatma, Shravanabelagola) still fit. Roads, water and hills go through
 * the same projection, so everything sits where it really is relative to the farm.
 */
import { FARM } from "./atlas";

export const W = 1400;
export const H = 900;
export const CX = 500;
export const CY = 410;
const PER_KM = 21;
const TRUE_TO_KM = 16;
const SQUEEZE = 80;

type LatLng = readonly [lat: number, lng: number];

const km = ([lat, lng]: LatLng) => ({
  x: (lng - FARM.lng) * 111.32 * Math.cos((FARM.lat * Math.PI) / 180),
  y: (lat - FARM.lat) * 110.57,
});

/** Drawing position of a point. */
export function project(p: LatLng) {
  const { x, y } = km(p);
  const d = Math.hypot(x, y);
  if (!d) return { x: CX, y: CY };
  const r = d <= TRUE_TO_KM ? d * PER_KM : TRUE_TO_KM * PER_KM + SQUEEZE * Math.log(d / TRUE_TO_KM);
  return { x: CX + (x / d) * r, y: CY - (y / d) * r };
}

/** Compass bearing (north = 0) from the farm. */
export function bearingOf(p: LatLng) {
  const { x, y } = km(p);
  return ((Math.atan2(x, y) * 180) / Math.PI + 360) % 360;
}

/** One drawing unit = this many km near the farm (for the scale bar). */
export const UNITS_PER_KM = PER_KM;

const r1 = (n: number) => Math.round(n * 10) / 10;

/** A smooth path (Catmull-Rom as cubic Béziers) through the projected points; `closed` for water and land. */
export function smooth(points: readonly LatLng[], closed = false) {
  const p = points.map(project);
  const n = p.length;
  const get = (i: number) => (closed ? p[(i + n) % n] : p[Math.max(0, Math.min(n - 1, i))]);
  let d = `M${r1(p[0].x)} ${r1(p[0].y)}`;
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const a = get(i - 1), b = get(i), c = get(i + 1), e = get(i + 2);
    d += ` C${r1(b.x + (c.x - a.x) / 6)} ${r1(b.y + (c.y - a.y) / 6)} ${r1(c.x - (e.x - b.x) / 6)} ${r1(c.y - (e.y - b.y) / 6)} ${r1(c.x)} ${r1(c.y)}`;
  }
  return closed ? `${d} Z` : d;
}

/** Where each nearby place really is (Google Maps). Keyed by its name in NEARBY. */
export const PLACE_AT: Record<string, LatLng> = {
  "Rangaswamy Betta": [13.0342, 76.972], // Udamudi Bettada Ranganathaswami
  "Sidlingeshwara Yoga Vana Betta": [12.9671, 76.9828],
  "Markonahalli Dam": [12.9342, 76.8813],
  "Kalur weaving": [13.1731, 76.8446], // Kalluru, Gubbi taluk: the handloom saree village
  "Yediyur Siddalingeshwara Temple": [12.9721, 76.8631],
  "Hadinkal Anjaneya Temple": [12.9898, 76.7904], // Bettada Haddinakallu Anjaneya
  "Panchamukhi Anjaneya Temple": [13.041, 77.0684], // Bidanagere
  "Adichunchanagiri Mutt": [13.0233, 76.7459],
  "Shanimahatma Temple": [13.1817, 77.2339],
  Shravanabelagola: [12.854, 76.484],
};

/** NH75, west (Hassan) to east (Bangalore). */
export const NH75: LatLng[] = [
  [12.912, 76.391], // Channarayapatna
  [12.941, 76.497],
  [12.959, 76.62], // Hirisave
  [12.969, 76.713], // Bellur Cross
  [12.964, 76.779],
  [12.981, 76.836],
  [12.983, 76.864], // Yediyur
  [12.9896, 76.8823],
  [12.995, 76.908],
  [13.003, 76.965],
  [13.004, 77.018],
  [13.021, 77.053], // Kunigal
  [13.028, 77.106],
  [13.077, 77.218],
  [13.1, 77.39],
];

/** SH33: Tumkur – Kunigal – Huliyurdurga. */
export const SH33: LatLng[] = [
  [13.34, 77.1],
  [13.2, 77.04],
  [13.147, 77.024], // Hebbur
  [13.092, 77.022],
  [13.04, 77.025],
  [13.016, 77.023],
  [12.932, 77.03],
  [12.84, 77.04],
];

/** SH84: Magadipalya – Markonahalli – Amruthur. */
export const SH84: LatLng[] = [
  [12.9896, 76.8823],
  [12.9736, 76.8856],
  [12.9522, 76.8878],
  [12.9393, 76.8889],
  [12.9286, 76.8944],
  [12.9254, 76.9021],
  [12.9233, 76.9317], // Amruthur
  [12.89, 76.955],
];

/** The road off the NH75 to Shravanabelagola. */
export const TO_SHRAVANABELAGOLA: LatLng[] = [
  [12.955, 76.58],
  [12.899, 76.493],
  [12.854, 76.484],
];

/** The lane from the farm down to the NH75 at Magadipalya. */
export const LANE: LatLng[] = [
  [13.0845, 76.9242],
  [13.0835, 76.915],
  [13.075, 76.909],
  [13.05, 76.907],
  [13.02, 76.906],
  [12.995, 76.905],
];

/** The Shimsha, below the Markonahalli dam, heading south. */
export const SHIMSHA: LatLng[] = [
  [12.9318, 76.8801],
  [12.9222, 76.8878],
  [12.9136, 76.8922],
  [12.9008, 76.8944],
  [12.87, 76.9],
  [12.83, 76.915],
  [12.77, 76.92],
];

/** Markonahalli reservoir. */
export const MARKONAHALLI: LatLng[] = [
  [12.965, 76.8537], [12.9671, 76.8592], [12.9704, 76.8658], [12.9671, 76.868], [12.9629, 76.8669],
  [12.9607, 76.8724], [12.9586, 76.8779], [12.9532, 76.8801], [12.9479, 76.8768], [12.9436, 76.8801],
  [12.9372, 76.8812], [12.9318, 76.8801], [12.9276, 76.8746], [12.9265, 76.868], [12.9297, 76.8647],
  [12.935, 76.868], [12.9415, 76.8702], [12.9468, 76.8658], [12.949, 76.8614], [12.9532, 76.857],
  [12.9564, 76.8516], [12.9618, 76.8494],
];

/** Mangala reservoir, beside it. */
export const MANGALA: LatLng[] = [
  [12.98, 76.901], [12.9821, 76.9054], [12.9768, 76.9076], [12.9725, 76.912], [12.9682, 76.9109],
  [12.965, 76.9043], [12.9586, 76.9043], [12.9522, 76.9021], [12.9457, 76.8988], [12.9447, 76.8944],
  [12.95, 76.8933], [12.9564, 76.8966], [12.965, 76.8988], [12.9736, 76.8988],
];

/** Kunigal's big lake (Doddakere), north of the town. */
export const KUNIGAL_LAKE: LatLng[] = [
  [13.064, 77.02], [13.068, 77.029], [13.058, 77.035], [13.054, 77.046], [13.043, 77.048],
  [13.032, 77.04], [13.03, 77.031], [13.041, 77.024], [13.051, 77.018],
];

/** Village tanks near the farm (centre, size in km). */
export const TANKS: { at: LatLng; w: number; h: number; rot: number }[] = [
  { at: [13.0665, 76.96], w: 0.9, h: 0.5, rot: -40 }, // Kaggalipalya
  { at: [13.071, 76.926], w: 0.6, h: 0.35, rot: 10 }, // Heddigere
];

/** Hills and ridges (centre, half-length and half-width in km, rotation in degrees), from the satellite view. */
export const HILLS: { at: LatLng; rx: number; ry: number; rot: number }[] = [
  { at: [13.035, 76.975], rx: 2.2, ry: 1.3, rot: -30 }, // Rangaswamy Betta
  { at: [12.945, 76.976], rx: 3.6, ry: 1.3, rot: 48 }, // Yoga Vana Betta and the Modur ridge
  { at: [12.952, 76.825], rx: 2.6, ry: 1.2, rot: 75 }, // west of the reservoir
  { at: [12.99, 76.79], rx: 1.4, ry: 0.9, rot: 0 }, // Haddinakallu betta
  { at: [13.025, 76.749], rx: 1.3, ry: 0.9, rot: 20 }, // Adichunchanagiri betta
];

/** Shravanabelagola's two hills, Vindhyagiri and Chandragiri, either side of the town tank. */
export const SHRAVANABELAGOLA_HILLS: LatLng[] = [
  [12.854, 76.484],
  [12.863, 76.488],
];

/** Towns drawn on the map. */
export const TOWNS: { name: string; at: LatLng; size: "town" | "village" }[] = [
  { name: "Kunigal", at: [13.023, 77.027], size: "town" },
  { name: "Hebbur", at: [13.147, 77.024], size: "village" },
];

/** Road shields: which road, and where along it. */
export const SHIELDS: { label: string; at: LatLng }[] = [
  { label: "75", at: [12.999, 76.94] },
  { label: "75", at: [13.06, 77.16] },
  { label: "33", at: [13.075, 77.022] },
  { label: "84", at: [12.957, 76.8875] },
];

/** Villages around the farm, for a sense of place (Google Maps names). */
export const VILLAGES: { name: string; at: LatLng }[] = [
  { name: "Seegehalli", at: [13.094, 76.879] },
  { name: "Mavinahalli", at: [13.047, 76.906] },
  { name: "Doddamadhure", at: [13.026, 76.864] },
  { name: "Kaggere", at: [12.997, 76.95] },
];
