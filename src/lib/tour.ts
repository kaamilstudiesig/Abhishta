import { TOUR_360_URL } from "@/lib/site";

/**
 * A scene in the farm's Turiya 360° tour and the view it opens on. `node` is
 * Turiya's scene id (customnodeid, e.g. "Abhishta_27"). Scenes shown on the
 * site must be listed in scripts/tour-scenes.mjs (`npm run tour:scenes`).
 */
export type Tour = { node: string; pan: number; tilt: number };

/** Link into the full tour (a new tab): #node,pan,tilt,fov,projection. Without a view, the scene's own default. */
export function tourUrl(node: string, view?: { pan: number; tilt: number }) {
  return view ? `${TOUR_360_URL}#${node},${view.pan},${view.tilt},75,4` : `${TOUR_360_URL}#${node}`;
}
