import type { StaticImageData } from "next/image";
import gauGir from "@public/images/client-photos/tour-gau-gir.webp";
import gaushaaleStall from "@public/images/client-photos/tour-gaushaale-stall.webp";
import gaushaaleAlong from "@public/images/client-photos/tour-gaushaale-along.webp";
import cowPen from "@public/images/client-photos/tour-outing-cow-pen.webp";
import orchard from "@public/images/client-photos/tour-orchard.webp";
import farmAbove from "@public/images/client-photos/tour-farm-from-above.webp";
import goat from "@public/images/client-photos/tour-goat-shelter.webp";
import yard from "@public/images/client-photos/tour-chicken-yard.webp";
import buffet from "@public/images/client-photos/tour-outing-buffet.webp";
import dining from "@public/images/client-photos/tour-dining-hall.webp";
import spacePool from "@public/images/client-photos/tour-space-pool.webp";
import spaceDining from "@public/images/client-photos/tour-space-dining.webp";
import spaceBath from "@public/images/client-photos/tour-space-bath.webp";
import spaceGames from "@public/images/client-photos/tour-space-games.webp";
import spaceCampfire from "@public/images/client-photos/tour-space-campfire.webp";
import spaceKoi from "@public/images/client-photos/tour-space-koi.webp";
import pool from "@public/images/client-photos/tour-outing-pool.webp";
import gate from "@public/images/client-photos/tour-outing-gate.webp";
import games from "@public/images/client-photos/tour-outing-games.webp";
import campfire from "@public/images/client-photos/tour-campfire-area.webp";
import cottageRow from "@public/images/client-photos/tour-cottage-row.webp";
import familyFront from "@public/images/client-photos/tour-family-front.webp";
import mayura from "@public/images/client-photos/tour-room-mayura.webp";
import mathura from "@public/images/client-photos/tour-room-mathura.webp";
import gopika from "@public/images/client-photos/tour-room-gopika.webp";
import nandagokula from "@public/images/client-photos/tour-room-nandagokula.webp";
import kausthuba from "@public/images/client-photos/tour-room-kausthuba.webp";
import type { Tour } from "@/lib/tour";

/** A still photo of a 360° place: what shows before someone switches a view to 360° (see TourOrPhoto). */
export type Still = { src: StaticImageData; alt: string; focus?: string };

/**
 * One still per 360° view the site shows, keyed by scene and opening angle. Each is a frame of that scene at that
 * angle (client-photos/tour-*.jpg), so the photo and the 360° show the same place. A new 360° view needs a still here.
 */
const STILLS: Record<string, Still> = {
  "Abhishta_20@15,-6": { src: gauGir, alt: "Gir cows at a long trough in the gaushaale, under a sign that reads Gir cow", focus: "45% 50%" },
  "Abhishta_21@-155,-6": { src: gaushaaleStall, alt: "The Hallikar stall in the gaushaale: a grey Hallikar cow under a sign that reads Hallikar, with a tree in the yard" },
  "Abhishta_22@-75,-6": { src: gaushaaleAlong, alt: "Looking along the gaushaale: black-and-white Holstein Friesian cows lying down beside the troughs under a long green-posted roof" },
  "AerialView_03@0,-12": { src: cowPen, alt: "The cow cuddling pen: a small yellow wooden fence on the grass among mango trees", focus: "60% 60%" },
  "AerialView_03@-95,-4": { src: orchard, alt: "A paved path through the orchard, with mango trees on one side and green grass on the other, under a bright sky" },
  "BirdsEyeView01@-85,-40": { src: farmAbove, alt: "The whole farm from straight above: red-roofed cottages, a small blue pool, gardens and rows of trees" },
  "Abhishta_24@-4,-6": { src: goat, alt: "Inside the goat and sheep shelter: a covered shed with green rails and a red-tiled floor, and a goat looking over a rail beside a Jamnapari sign" },
  "Abhishta_23@-44,-8": { src: yard, alt: "The chicken yard: hens scratching in the dirt in front of a white shed and a tree, with the duck canopy to the right" },
  "Abhishta_03@-150,-8": { src: buffet, alt: "The buffet counter in the dining hall: a row of covered steel serving dishes, plates and cutlery", focus: "35% 60%" },
  "Abhishta_03@22,-8": { src: dining, alt: "The dining hall: wooden tables and chairs on a patterned tile floor under a tiled roof, open to the garden" },
  "BlissSwimmingPool@0,-8": { src: spacePool, alt: "The swimming pool: clear blue water with a small waterfall spilling in, steel steps, and palms and gardens behind" },
  "DiningZone@20,-8": { src: spaceDining, alt: "The dining hall from the far end: long wooden tables and chairs on a patterned floor, under a tiled timber roof" },
  "TraditionalBath@22,-20": { src: spaceBath, alt: "The traditional bath room: a round copper pot set into a built-in stove" },
  "OfficeRoom@95,-12": { src: spaceGames, alt: "The games and sports centre: through its windows, green lawns and trees; on the shelf below, a bucket of bats and racquets and a swim ring", focus: "65% 60%" },
  "AmphitheaterCampfireArea@10,-5": { src: spaceCampfire, alt: "The campfire area: black chairs on a tiled circle in front of the grass amphitheatre steps, under a tree" },
  "KoiPond@185,-8": { src: spaceKoi, alt: "A yellow wooden bridge by the koi pond, with a small waterfall, palms and green plants beyond" },
  "SwimmingPoolBliss@-90,-5": { src: pool, alt: "The swimming pool: clear blue water with steel steps, a small waterfall at the far end and loungers under coconut palms", focus: "60% 60%" },
  "AerialView_01@0,-8": { src: gate, alt: "The farm's entrance: a black iron gate at the end of a narrow paved lane, between trees and coconut palms" },
  "Abhishta_10@95,-14": { src: games, alt: "The games corner: a bucket of bats and racquets, a box of board games and a ball, and a swim ring by the window", focus: "65% 60%" },
  "Amphitheatre@12,-5": { src: campfire, alt: "The campfire area: white plastic chairs on a tiled circle in front of the grass amphitheatre steps, among trees" },
  "Pathway_08@210,0": { src: cottageRow, alt: "The cottage row: a low cottage with a red-tiled roof and a stairway up the side, beside a stone-slab path through palms and flowering plants" },
  "Pathway_03@0,1.71": { src: familyFront, alt: "The front of the Nandagokula family rooms: an orange-red building with a timber gable and a stone-slab path across the lawn" },
  "Mayura@340,-12": { src: mayura, alt: "Inside Mayura cottage: a double bed with green cushions and gold runners, a wardrobe and a small table and chairs, on a red floor" },
  "Mathura@70,-12": { src: mathura, alt: "Inside Mathura cottage: a double bed with a padded headboard, green cushions and gold runners, with a wardrobe beside it, on a red floor" },
  "NandagokulaFamilyRoom@90,-12": { src: gopika, alt: "Inside Gopika family room: several white-sheeted beds with brown towels in a row below a window with green curtains" },
  "NandagokulaBachelorsDormitory@280,-12": { src: nandagokula, alt: "Inside Nandagokula dormitory: a row of single beds with brown towels, a door and a white shelving unit on the far wall" },
  "Kausthuba@325,-12": { src: kausthuba, alt: "Inside Kaustubha family room: single beds with brown towels beside a window with green curtains, on a red floor" },
};

export const stillOf = (tour: Tour): Still | undefined => STILLS[`${tour.node}@${tour.pan},${tour.tilt}`];
