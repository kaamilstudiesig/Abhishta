# Our Nests — updated wireframe

Supersedes `docs/reference/wireframe-react/our-nests/` (generic "cottage / dorm one" blocks with placeholder copy).
Based on a full read of the farm's 360° tour (https://www.turiya.co/360/Abhishta/, 34 scenes, explored 2026-10-19),
the client photography in `public/images/client-photos/`, and `docs/SITEMAP.md`.

## What the tour shows that the old wireframe missed

**The stays have names, in two families:**

| Stay | Type | What's in the room (seen in the 360°) | 360° deep link |
| --- | --- | --- | --- |
| **Mayura** | Cottage | Double bed + extra single (folding) bed, wardrobe, bedside table, red-oxide floor, tiled timber roof, en-suite washroom | `#Abhishta_27` |
| **Mathura** | Cottage | Same layout as Mayura | `#Abhishta_25` |
| **Gopala** | Cottage | Named on the tour's path, no interior scene | — |
| **Govardhana** | Cottage | Named on the tour's path, no interior scene | — |
| **Nandagokula Family Dormitory** | Group block | Several double beds (≥ 4 seen), shelving, mirror, en-suite | `#Abhishta_06` |
| **Nandagokula Bachelors Dormitory** | Group block | Rows of single beds (≥ 5 seen), shelving, en-suite | `#Abhishta_04` |
| **Nandagokula Triple Occupancy** | Group block | Three single beds, en-suite | `#Abhishta_08` |

- Every bookable room has its **own en-suite washroom** (each has a washroom scene in the tour).
- **Courtyard House** is tagged *Owners' Residence* in the tour — not a guest stay. Leave it out.
- The names follow Krishna's story (Mayura — the peacock; Mathura — his birthplace; Gopala — the cowherd;
  Govardhana — the hill he lifted; Nandagokula — the village he grew up in), which suits a farm with a gaushaale.
- **Deep links work:** `https://www.turiya.co/360/Abhishta/#<id>` opens the tour inside that room. Our Nests can
  show each room's own 360° view, not the general tour.

**Shared spaces on the tour** (each also deep-linkable): Bliss swimming pool `#SwimmingPoolBliss` (open 6:30 am–6 pm),
Dining zone `#Abhishta_03`, Traditional bath / Hande Ole Snana `#Abhishta_15` (wood-fired copper-pot bath),
Office / Game & sports centre `#Abhishta_10` (indoor & outdoor games), Amphitheatre / campfire `#Amphitheatre`
(bonfire & barbecue evenings), Koi pond `#Abhishta_11`. Farm side: Cow cuddling `#AerialView_03`, Gaushaale
`#Abhishta_20` (Punganur Gidda, Jersey, Hallikar, Gir, Kankrej, Holstein Friesian), Goat & sheep shelter
`#Abhishta_24` (Jamnapari, Boer, Thalassery, Bannur sheep), chicken coop, duck canopy, rabbit hutch.

**Also on the tour, better used elsewhere:** drive times to 10 nearby places (Rangaswamy Betta 27 min,
Sidlingeshwara Yoga Vana Betta 29 min, Markonahalli Dam 31 min, Kalur weaving 31 min, Yediyur temple 32 min,
Hadinkal Anjaneya 36 min, Panchamukhi Anjaneya 39 min, Adichunchanagiri Mutt 45 min, Shanimahatma temple 50 min,
Shravanabelagola 55 min) → **Field Notes & 360° Atlas** page. Farm animals and breeds → **The Living Farm**.

## Page structure

Long page that scrolls freely (no `data-snap`, except the hero). Anchors the homepage links to: `#cottages`,
`#dormitories`. Every section declares `data-nav`.

```
┌─────────────────────────────────────────────────────────────────────┐
│ 1  HERO  (data-nav=dark, full screen)                                │
│    photo: stay-cottage-exterior.jpg (terracotta veranda, carved door)│
│    Our nests                                                         │
│    Four cottages and the Nandagokula rooms, under tiled roofs,       │
│    a step from the orchard.                                          │
│    [Check availability →]                                            │
│    jump pills:  Cottages · Nandagokula · Shared spaces · Plan a stay │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 2  CHOOSE YOUR NEST  (data-nav=light)                                │
│    "Which nest is yours?" — four compact options, one line each:     │
│    ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│    │ Cottage  │ │ Family   │ │ Bachelors│ │ Triple   │               │
│    │ couples, │ │ dorm     │ │ dorm     │ │ room     │               │
│    │ small    │ │ families │ │ friends, │ │ three    │               │
│    │ families │ │ together │ │ schools  │ │ friends  │               │
│    │ sleeps ? │ │ sleeps ? │ │ sleeps ? │ │ sleeps 3 │               │
│    └──────────┘ └──────────┘ └──────────┘ └──────────┘               │
│    each card jumps to its room below          (phone: swipe row)     │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 3  #cottages — THE COTTAGES  (data-nav=light)                        │
│    61.8 / 38.2 split                                                 │
│    ┌───────────────────────────────┐  Mayura · Mathura · Gopala ·    │
│    │                               │  Govardhana   (name tabs)       │
│    │  live 360° of the selected    │  "Mayura — the peacock"         │
│    │  cottage (deep link; behind a │  Sleeps up to 4: double bed,    │
│    │  "Start the 360° view" cover) │  extra bed (+ floor mattress?)  │
│    │  Gopala/Govardhana: photo     │  ✓ en-suite washroom            │
│    │  instead (no 360° scene)      │  ✓ wardrobe, bedside table      │
│    └───────────────────────────────┘  ✓ private sit-out on the lawn  │
│    photo strip: stay-cottage-1 · -2 · -3 · -sitout                   │
│    [Book a cottage]   See it in 360°                                 │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 4  #dormitories — NANDAGOKULA  (data-nav=dark band)                  │
│    "Nandagokula — the village where Krishna grew up, built for       │
│     groups who travel together."                                     │
│    three room types as tabs (phone: pills) driving one panel:        │
│    [Family dormitory] [Bachelors dormitory] [Triple occupancy]       │
│    ┌───────────────────────────────┐  who it's for                   │
│    │ live 360° of that room        │  bed set-up · sleeps ?          │
│    │ (deep link, start cover)      │  ✓ en-suite washroom            │
│    └───────────────────────────────┘  ✓ shelving / storage           │
│    photos: stay-dorm-1 · stay-dorm-2                                 │
│    "Taking the whole block for a school trip, camp or retreat?"      │
│    [Plan a group stay → /group-enquiries]                            │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 5  IN EVERY ROOM  (data-nav=light) — two-column checklist            │
│    Cottages                      │ Nandagokula                       │
│    en-suite washroom             │ en-suite washroom                 │
│    double + extra bed            │ doubles / singles by room         │
│    wardrobe                      │ open shelving                     │
│    private sit-out               │ shared lawns                      │
│    fresh linen & towels          │ fresh linen & towels              │
│    (only list what's confirmed — see open questions)                 │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 6  BEYOND YOUR DOOR — shared spaces  (data-nav=light)                │
│    a row of 6 tiles, each opens that spot in the 360° tour:          │
│    Pool (6:30 am–6 pm) · Dining hall · Traditional bath (Hande Ole   │
│    Snana) · Games & sports centre · Amphitheatre & campfire · Koi    │
│    pond.  Photos: group-corporate (dining), about-firepit,           │
│    day-midday …; 360° for the rest                                   │
│    "And the farm itself" → The Living Farm (cows, goats, ducks…)     │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 7  PLAN YOUR STAY — enquiry form  (data-nav=dark band)               │
│    Name · Phone (+91) · Check-in · Check-out · Adults · Kids ·       │
│    Room preference [Mayura · Mathura · Gopala · Govardhana ·         │
│    Nandagokula family · bachelors · triple · Not sure]               │
│    [Send on WhatsApp] (prefilled)   [Check availability] (Stayflexi)│
│    or email hello@… · call +91 9945 7949 25                          │
└─────────────────────────────────────────────────────────────────────┘
  FOOTER (shared)
```

**Components:** hero = shared hero pattern (`SplitText` headline); room tabs = pills + the `Preview360` start-cover
pattern with the deep-linked URL; photo strips = swipe row on phones; Nandagokula = dark band like Groups; shared
spaces = tile row; form = labelled inputs, opens WhatsApp prefilled. `CardSwap` could present the three Nandagokula
rooms instead of tabs if a more playful feel is wanted.

**Phones:** pills replace tabs; each 360° view sits under its tabs at 16:11; photo strips become swipe rows;
the comparison in section 2 becomes a swipe row of four cards.

## Open questions for the client

1. **Gopala and Govardhana** — are they cottages like Mayura/Mathura? Same layout and capacity? Photos needed (no 360° scene).
2. **Capacities** — the sitemap says 3 dorms (1 × 5 guests, 2 × 10). The tour shows Family dorm, Bachelors dorm and a
   Triple room. Exact beds/guests for each?
3. **Cottage beds** — the old wireframe says "double bed, single bed and a floor mattress"; the 360° shows a double + a
   folding extra bed. Confirm sleeps 4 and what the 4th sleeps on.
4. **In-room amenities** to list honestly: AC or fans only (wall fans seen), hot water, toiletries, Wi-Fi, TV?
5. Is the pool open to day-outing guests as well as stay guests?
