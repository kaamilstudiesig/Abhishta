import type { DriftWallItem } from "@/components/bits/DriftWall";
// Gallery 01 — the property, buildings and grounds (sorted by docs/photo-manifest.md, 2026-11-07)
import aerial from "@public/images/client-photos/tour-farm-from-above.webp";
import houseAvenue from "@public/images/client-photos/main-house-avenue-portrait.webp";
import pavilion from "@public/images/client-photos/gallery-dining-pavilion.webp";
import gate from "@public/images/client-photos/nandhanavana-gate-portrait.webp";
import cottagePath from "@public/images/client-photos/cottage-path-palms.webp";
import swing from "@public/images/client-photos/swing-gazebo.webp";
import howdah from "@public/images/client-photos/howdah-elephant-path.webp";
import koi from "@public/images/client-photos/gallery-koi-bridge.webp";
import amphiTrees from "@public/images/client-photos/amphitheatre-through-trees.webp";
import avenue from "@public/images/client-photos/tree-avenue-portrait.webp";
import well from "@public/images/client-photos/garden-well.webp";
import guardians from "@public/images/client-photos/garden-guardian-statues.webp";
import nandagokulaPorch from "@public/images/client-photos/family-nandagokula-4.webp";
import diningHall from "@public/images/client-photos/gallery-dining-hall.webp";
import doorway from "@public/images/client-photos/doorway-garden-view.webp";
import cannon from "@public/images/client-photos/garden-cannon.webp";
import paintedStatue from "@public/images/client-photos/garden-painted-statue.webp";
import stoneTable from "@public/images/client-photos/garden-stone-table.webp";
import cottageRow from "@public/images/client-photos/nests-hero-cottage-row.webp";
import cropRows from "@public/images/client-photos/farm-crop-rows.webp";
import dormBlock from "@public/images/client-photos/dorm-block-front.webp";
import pathToGate from "@public/images/client-photos/garden-path-to-gate.webp";
import pavilionTables from "@public/images/client-photos/dining-pavilion-tables.webp";
import mangoBench from "@public/images/client-photos/mango-bench-portrait.webp";
import amphitheatre from "@public/images/client-photos/gallery-amphitheatre.webp";
import mathura from "@public/images/client-photos/cottages/mathura-1.webp";
import mayura from "@public/images/client-photos/cottages/mayura-1.webp";
import gopika from "@public/images/client-photos/family-gopika-1.webp";
import kaustubhaFront from "@public/images/client-photos/family-kaustubha-4.webp";
import gaushaale from "@public/images/client-photos/tour-gaushaale-hallikar.webp";
// Gallery 02 — real photos of guests, groups and events…
import performance from "@public/images/client-photos/event-performance.webp";
import students from "@public/images/client-photos/group-students-amphitheatre.webp";
import audience1 from "@public/images/client-photos/group-lawn-audience-1.webp";
import audience2 from "@public/images/client-photos/group-lawn-audience-2.webp";
import audience3 from "@public/images/client-photos/group-lawn-audience-3.webp";
import lamp from "@public/images/client-photos/group-lamp-lighting.webp";
import studentsDancers from "@public/images/client-photos/group-students-dancers.webp";
import team1 from "@public/images/client-photos/group-corporate-team-1.webp";
import team2 from "@public/images/client-photos/group-corporate-team-2.webp";
import schoolTeam from "@public/images/client-photos/group-school-team.webp";
import veranda from "@public/images/client-photos/group-veranda-gathering.webp";
import puppy from "@public/images/client-photos/farm-dog-puppy.webp";
import bicycles from "@public/images/client-photos/bicycles-under-trees.webp";
// …and the AI-made event pictures (labelled as illustrations in caption and alt)
import shastipoorthi from "@public/images/client-photos/event-shastipoorthi.webp";
import mehendi from "@public/images/client-photos/event-mehendi.webp";
import birthday from "@public/images/client-photos/event-birthday.webp";
import babyShower from "@public/images/client-photos/event-baby-shower.webp";
import lawnParty from "@public/images/client-photos/event-lawn-party.webp";
import anniversary from "@public/images/client-photos/event-anniversary.webp";
import kittyParty from "@public/images/client-photos/event-kitty-party.webp";

/** Gallery 01, "The Beauty of Abhishta": the property, its buildings and grounds (30 photos). */
export const BEAUTY: DriftWallItem[] = [
  { src: aerial, caption: "The farm from above", alt: "Drone view looking straight down on the farm: tiled roofs, a small blue pool, trees and planted plots" },
  { src: gate, caption: "The Nandhanavana gate", alt: "The Nandhanavana gateway framing a painted statue in the garden, red steps in front" },
  { src: houseAvenue, caption: "The avenue to the main house", alt: "A stone path through a garden avenue leading to a cream two-storey house with a red roof" },
  { src: swing, caption: "The swing gazebo", alt: "A tiled-roof gazebo with a hanging swing, a stone path leading up to it" },
  { src: mathura, caption: "Mathura cottage", alt: "Mathura cottage room: a double bed with green pillows, wicker chairs and a painting on the wall" },
  { src: howdah, caption: "The howdah elephant", alt: "A painted elephant statue carrying a golden howdah at the end of a stone path" },
  { src: pavilion, caption: "The dining pavilion", alt: "The open dining pavilion on the lawn, with a painted village mural on its back wall" },
  { src: cottagePath, caption: "Between the cottages", alt: "A path between painted cottages under coconut palms" },
  { src: koi, caption: "The pond bridge", alt: "A small yellow wooden bridge over a pond, framed by a tree" },
  { src: amphiTrees, caption: "The amphitheatre", alt: "Tiled amphitheatre seating and the round stage, seen through young trees" },
  { src: avenue, caption: "The tree avenue", alt: "A long stone-slab avenue lined with trees and lilies" },
  { src: gopika, caption: "Gopika family room", alt: "Gopika family room: rows of double beds on a red floor under a sloping tiled roof" },
  { src: well, caption: "The garden well", alt: "A decorative well with a small tiled roof and a red drum, a traveller's palm behind" },
  { src: guardians, caption: "Guardians on the path", alt: "Two red painted guardian statues on plinths beside a garden path" },
  { src: nandagokulaPorch, caption: "Nandagokula porch", alt: "The Nandagokula porch: an ornate painted door frame, wooden pillars and the Nanda Gokula sign" },
  { src: diningHall, caption: "The dining hall", alt: "The dining hall: wooden tables on patterned tiles under a tall timber-and-tile roof" },
  { src: doorway, caption: "Through the big doors", alt: "Looking out through tall wooden doors to a stepping-stone path and cottages" },
  { src: gaushaale, caption: "The gaushaale", alt: "The gaushaale shed with a Hallikar sign and a grey Hallikar cow at the trough" },
  { src: cannon, caption: "The old cannon", alt: "A black decorative cannon among palms and plants beside a paved path" },
  { src: mayura, caption: "Mayura cottage", alt: "Mayura cottage room: a double bed, wicker chairs and a peacock painting" },
  { src: paintedStatue, caption: "Painted statues", alt: "A colourful painted statue and a painted tortoise among plants in the garden" },
  { src: pathToGate, caption: "The path to the gate", alt: "Stepping stones across the lawn to the white gate wall, the dining pavilion on the left" },
  { src: stoneTable, caption: "A stone table under the trees", alt: "A dark stone round table and stools on a platform under trees" },
  { src: cottageRow, caption: "The cottage row", alt: "A row of white cottages with verandas along a garden path" },
  { src: dormBlock, caption: "A family-room block", alt: "An orange family-room block with a gabled porch, palms behind and an open clearing in front" },
  { src: pavilionTables, caption: "Long tables in the pavilion", alt: "Long dark tables and chairs inside the open dining pavilion, a painted mural on the wall" },
  { src: kaustubhaFront, caption: "Kaustubha front", alt: "The front of the Kaustubha block: an orange wall, wooden pillars, a hanging lantern and the Kaustubh sign" },
  { src: mangoBench, caption: "Under the mango trees", alt: "A stone bench in the shade of mango trees" },
  { src: amphitheatre, caption: "The round stage", alt: "The round tiled stage and patterned amphitheatre steps on the lawn" },
  { src: cropRows, caption: "The fields", alt: "Aerial view of crop rows and planted plots, with a white shed" },
];

/**
 * Gallery 02, "Moments at Abhishta": every real photo with people or an event in it (11), the farm puppy and the
 * bicycles (2), and the seven AI-made event pictures, which say so in caption and alt (20 in all). Near-duplicates
 * (the two team shots, the three audience shots) are spread apart so they don't sit together on the wall.
 */
export const MOMENTS: DriftWallItem[] = [
  { src: performance, caption: "A Kathakali performance", alt: "Two Kathakali dancers in full costume and two drummers performing on the lawn" },
  { src: students, caption: "A school visit", alt: "Students with sketchbooks sitting on the tiled tiers of the amphitheatre" },
  { src: birthday, caption: "A birthday", alt: "a family cutting a cake on the round lawn stage, with balloons" },
  { src: lamp, caption: "Lighting the lamp", alt: "Four people lighting a tall brass lamp decked with marigolds" },
  { src: team1, caption: "A team day", alt: "Five guests posing with two Kathakali dancers on a green stage" },
  { src: mehendi, caption: "A mehendi", alt: "a mehendi gathering in the dining pavilion, hung with bright drapes" },
  { src: audience3, caption: "An afternoon on the lawn", alt: "A large audience seated on the amphitheatre tiers and on chairs around the lawn stage" },
  { src: schoolTeam, caption: "A sports team", alt: "A team of girls in matching tracksuits with their coach on the lawn" },
  { src: puppy, caption: "The farm puppy", alt: "A brown curly-haired puppy lying on a patterned tile floor" },
  { src: babyShower, caption: "A baby shower", alt: "women in sarees in a gazebo decorated with flowers" },
  { src: veranda, caption: "Together on the veranda", alt: "Families gathered on the veranda of the cream main house, the lawn in front" },
  { src: audience1, caption: "Before the show", alt: "Guests filling the amphitheatre tiers and white chairs around the lawn stage" },
  { src: shastipoorthi, caption: "A shastipoorthi", alt: "a couple at a pooja ceremony in the pavilion, family around them" },
  { src: studentsDancers, caption: "Students and Kathakali dancers", alt: "A student group in team tracksuits on a green stage between two Kathakali dancers" },
  { src: bicycles, caption: "Bicycles under the trees", alt: "About eight bicycles parked under mango trees beside a building" },
  { src: lawnParty, caption: "A lawn party", alt: "guests on the lawn by the amphitheatre, with a balloon arch" },
  { src: team2, caption: "With the dancers", alt: "A group of guests standing with two Kathakali dancers on a green stage" },
  { src: anniversary, caption: "An anniversary", alt: "an older couple and their family at a table by a lit gazebo" },
  { src: audience2, caption: "A full amphitheatre", alt: "A large seated audience on the amphitheatre tiers, a brass lamp on the stage" },
  { src: kittyParty, caption: "A kitty party", alt: "women sitting around a table in the garden" },
];
