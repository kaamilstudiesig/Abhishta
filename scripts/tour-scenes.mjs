// Writes public/tour/scenes.xml: the config the site's 360° viewer (src/components/TourViewer.tsx)
// reads to show scenes from the farm's Turiya (Pano2VR) tour without Turiya's skin — so no START
// card, logo or menu. It keeps only the scenes the site shows, drops their hotspots (no walking off
// down pathways), and locks the mouse wheel and keyboard so the page keeps scrolling and tabs keep
// their arrow keys. Image tiles still load from Turiya.
// To show another scene: add its Turiya id (customnodeid) below, run `npm run tour:scenes`, and use
// the same id in the page. The output is generated — don't edit public/tour/scenes.xml by hand.
import { mkdir, writeFile } from "node:fs/promises";

const TOUR = "https://www.turiya.co/360/Abhishta/";
const SCENES = [
  // Our Nests — rooms (src/components/sections/our-nests/rooms.ts)
  "Abhishta_27", // Mayura cottage
  "Abhishta_25", // Mathura cottage
  "Abhishta_28", // Mayura cottage's washroom
  "Abhishta_06", // Nandagokula family dormitory
  "Abhishta_04", // Nandagokula bachelors dormitory
  "Abhishta_08", // Nandagokula triple room
  // Homepage — "See the farm before you set out" (src/components/sections/Preview360.tsx)
  "BirdsEyeView01", // the farm from above
  "SwimmingPoolBliss",
  "Abhishta_03", // dining hall
  "Amphitheatre",
  "AerialView_03", // cow cuddling area
  // Our Nests — "Beyond your door" (src/components/sections/our-nests/SharedSpaces.tsx); pool, dining and amphitheatre above
  "Abhishta_15", // traditional bath
  "Abhishta_10", // games and sports
  "Abhishta_11", // koi pond
  // The Living Farm (src/components/sections/living-farm/); the cow cuddling area is above
  "Abhishta_20", // gaushaale
  "Abhishta_21", // gaushaale
  "Abhishta_22", // gaushaale
  "Abhishta_24", // goat and sheep shelter
  "Abhishta_23", // path by the chicken coop and duck canopy
  "Abhishta_14", // path by the rabbit hutch
  "Pathway", // path by the chicken coop, near the entrance
  // Group Enquiries (src/components/sections/group-enquiries/); the day outing also uses scenes above
  "AerialView_01", // the entrance
];

const xml = await (await fetch(`${TOUR}pano.xml`)).text();
const head = xml.match(/<tour\b[^>]*>/)?.[0];
if (!head) throw new Error("No <tour> element in pano.xml");

const all = [...xml.matchAll(/<panorama\b[^>]*>[\s\S]*?<\/panorama>/g)].map((m) => m[0]);
const kept = SCENES.map((id) => {
  const scene = all.find((s) => s.includes(`customnodeid="${id}"`));
  if (!scene) throw new Error(`Scene ${id} not found in the tour`);
  return scene
    .replace(/<hotspots>[\s\S]*?<\/hotspots>/g, "<hotspots/>")
    // attribute-aware: some hotspot titles hold raw ">" (escaped HTML) inside their quotes
    .replace(/<hotspot\b(?:[^"'>]|"[^"]*"|'[^']*')*\/>/g, "")
    .replace(/lockedwheel="0"/g, 'lockedwheel="1"')
    .replace(/lockedkeyboard="0"/g, 'lockedkeyboard="1"')
    .replace(/lockedkeyboardzoom="0"/g, 'lockedkeyboardzoom="1"');
});
const first = kept[0].match(/<panorama\b[^>]*\bid="([^"]+)"/)[1];

// No comments in the output: the player reads the document's first node as the <tour>.
const out = ['<?xml version="1.0" encoding="UTF-8"?>', head.replace(/start="[^"]*"/, `start="${first}"`), ...kept, "</tour>", ""].join("\n");

await mkdir(new URL("../public/tour/", import.meta.url), { recursive: true });
await writeFile(new URL("../public/tour/scenes.xml", import.meta.url), out);
console.log(`public/tour/scenes.xml: ${kept.length} scenes, ${out.length} bytes`);
