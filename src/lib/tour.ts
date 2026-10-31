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

/**
 * A view from a link into the tour, in the order tourUrl writes it: #node,pan,tilt,fov,projection
 * (e.g. "#Pathway_03,0,1.71,75,4" → Pathway_03, pan 0, tilt 1.71). Turiya's own share links use the same hash.
 */
export function tourFromHash(hash: string): Tour {
  const [node, pan = "0", tilt = "0"] = hash.replace(/^.*#/, "").split(",");
  return { node, pan: Number(pan), tilt: Number(tilt) };
}
