# Our Nests — updated wireframe

Supersedes `docs/reference/wireframe-react/our-nests/` (generic "cottage / dorm one" blocks with placeholder copy).
Sources, all read 2026-10-19:
- the farm's 360° tour — https://www.turiya.co/360/Abhishta/ (34 scenes)
- the official site — https://www.abhishtaagrifarmstay.com/ (Our Nests, Day Outing, Schools & Corporate, Terms,
  Cancellation pages)
- the client photography in `public/images/client-photos/`, and `docs/SITEMAP.md`

**Use the official site's room names on the page.** The tour labels some rooms differently (see the mapping below).

## The stays (confirmed)

### Couple cottages — 4 cottages, "up to four guests" each

**Mayur · Mathura · Gopala · Govinda**

- The site's occupancy line reads "4 Cottages: 2 Cottages 4 & 3 Occupancy" — most likely two cottages sleep 4 and
  two sleep 3 (to confirm).
- Official amenities: attached bathroom with hot water · daily housekeeping · outdoor seating — each cottage has a
  private sit-out with sunrise/sunset views.
- Seen in the 360°: double bed + a folding extra bed, wardrobe, bedside table, red-oxide floor, tiled timber roof.

### Family cottages — 3 rooms, 25 guests in all

The site calls them "Family Cottages" on Our Nests and "dormitories" on its homepage. Suited to school groups,
summer camps, yoga retreats and groups of friends.

| Room | Sleeps | Beds | Bathrooms |
| --- | --- | --- | --- |
| **Gopika** | 10 | 5 double cots | 2 |
| **Nanda Gokula** | 10 | 10 single cots | 2 |
| **Kavsthuba** | 5 | 5 single cots | 1 |

Official amenities: spacious rooms with group sleeping · nature-walk access · outdoor seating.

### Matching the 360° tour to the rooms

| Official name | Tour scene | Deep link (`https://www.turiya.co/360/Abhishta/#…`) |
| --- | --- | --- |
| Mayur | "Mayura" | `#Abhishta_27` |
| Mathura | "Mathura" | `#Abhishta_25` |
| Gopala | named on a path, no interior scene | — (use a photo) |
| Govinda | "Govrdhana", named on a path, no interior scene | — (use a photo) |
| Gopika | "Nandagokula Family Dormitory" (double beds) | `#Abhishta_06` |
| Nanda Gokula | "Nandagokula Bachelors Dormitory" (single beds) | `#Abhishta_04` |
| Kavsthuba | probably "Nandagokula Triple Occupancy" (single beds) | `#Abhishta_08` (confirm) |

- Deep links work: the tour opens straight inside that room, so the page can show each room's own 360° view.
- **Courtyard House** is tagged *Owners' Residence* in the tour — not a guest stay. Leave it out.
- The names follow Krishna's story (Mayur — the peacock; Mathura — his birthplace; Gopala — the cowherd;
  Govinda — protector of cows; Gopika — the cowherd girls; Nanda Gokula — the village he grew up in;
  Kaustubha — his jewel), which suits a farm with a gaushaale.

### Stay rules (Terms page)

Check-in 12:00 pm, check-out 11:00 am (early/late on request, extra charge) · government photo ID for every guest ·
primary guest 21+, under-18s with a parent or guardian · visitors 10 am–6 pm · quiet hours 10:30 pm–8 am ·
no outside food or alcohol · smoking only in designated outdoor areas. Meals are vegetarian (Day Outing page).
**Not mentioned anywhere: AC, Wi-Fi, TV, toiletries — don't list them.**

### Shared spaces (tour + site)

Each opens in the 360° tour: Bliss swimming pool `#SwimmingPoolBliss` (6:30 am–6 pm; day-outing guests use it too —
3 pm on the Day Outing schedule) · Dining zone `#Abhishta_03` · Traditional bath / Hande Ole Snana `#Abhishta_15`
(wood-fired copper-pot bath) · Office / Game & sports centre `#Abhishta_10` (cricket, basketball, volleyball,
throwball, chess, carrom, UNO, Ludo; desi games lagori and aluguli mane) · Amphitheatre / campfire `#Amphitheatre`
(bonfire & barbecue evenings) · Koi pond `#Abhishta_11`.

Farm side (for The Living Farm page): cow cuddling `#AerialView_03`, gaushaale `#Abhishta_20` (Punganur Gidda,
Jersey, Hallikar, Gir, Kankrej, Holstein Friesian), goat & sheep shelter `#Abhishta_24` (Jamnapari, Boer,
Thalassery, Bannur sheep), chicken coop, duck canopy, rabbit hutch.

For the Field Notes & 360° Atlas page: drive times on the tour to Rangaswamy Betta 27 min, Sidlingeshwara Yoga Vana
Betta 29 min, Markonahalli Dam 31 min, Kalur weaving 31 min, Yediyur temple 32 min, Hadinkal Anjaneya 36 min,
Panchamukhi Anjaneya 39 min, Adichunchanagiri Mutt 45 min, Shanimahatma temple 50 min, Shravanabelagola 55 min.

## Page structure

Long page that scrolls freely (no `data-snap`, except the hero). Anchors the homepage links to: `#cottages`,
`#dormitories`. Every section declares `data-nav`.

```
┌─────────────────────────────────────────────────────────────────────┐
│ 1  HERO  (data-nav=dark, full screen)                                │
│    photo: stay-cottage-exterior.jpg (terracotta veranda, carved door)│
│    Our nests                                                         │
│    Four cottages and three family cottages under tiled roofs,        │
│    a step from the orchard.                                          │
│    [Check availability →]                                            │
│    jump pills: Cottages · Family cottages · Shared spaces · Plan     │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 2  CHOOSE YOUR NEST  (data-nav=light)                                │
│    "Which nest is yours?" — four options, one line each:             │
│    ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│    │ Cottage  │ │ Gopika   │ │ Nanda    │ │ Kavsthuba│               │
│    │ couples, │ │ families │ │ Gokula   │ │ small    │               │
│    │ small    │ │ together │ │ friends, │ │ groups   │               │
│    │ families │ │ 5 doubles│ │ schools  │ │ 5 singles│               │
│    │ 3–4 ppl  │ │ sleeps 10│ │ sleeps 10│ │ sleeps 5 │               │
│    └──────────┘ └──────────┘ └──────────┘ └──────────┘               │
│    each card jumps to its room below          (phone: swipe row)     │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 3  #cottages — THE COTTAGES  (data-nav=light)                        │
│    "Escape to cozy & nesty cottages, surrounded by nature's beauty"  │
│    61.8 / 38.2 split                                                 │
│    ┌───────────────────────────────┐  Mayur · Mathura · Gopala ·     │
│    │                               │  Govinda        (name tabs)     │
│    │  live 360° of the selected    │  "Mayur — the peacock"          │
│    │  cottage (deep link, behind a │  sleeps 3–4                     │
│    │  "Start the 360° view" cover) │  ✓ attached bathroom, hot water │
│    │  Gopala / Govinda: photo      │  ✓ daily housekeeping           │
│    │  instead (no 360° scene)      │  ✓ private sit-out              │
│    └───────────────────────────────┘                                 │
│    photo strip: stay-cottage-1 · -2 · -3 · -sitout                   │
│    [Book a cottage]   See it in 360°                                 │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 4  #dormitories — FAMILY COTTAGES  (data-nav=dark band)              │
│    "Stay together. Laugh louder. Live closer to nature."             │
│    three rooms as tabs (phone: pills) driving one panel:             │
│    [Gopika · 10]  [Nanda Gokula · 10]  [Kavsthuba · 5]               │
│    ┌───────────────────────────────┐  who it's for                   │
│    │ live 360° of that room        │  beds (e.g. 5 double cots)      │
│    │ (deep link, start cover)      │  bathrooms (e.g. 2 dedicated)   │
│    └───────────────────────────────┘  ✓ nature-walk access           │
│    photos: stay-dorm-1 · stay-dorm-2                                 │
│    "All three sleep 25 — for a school trip, camp or yoga retreat"    │
│    [Plan a group stay → /group-enquiries]                            │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 5  NATURE'S COMFORTS  (data-nav=light) — two-column checklist        │
│    Cottages                      │ Family cottages                   │
│    attached bathroom, hot water  │ dedicated bathrooms (1–2 a room)  │
│    daily housekeeping            │ spacious group sleeping           │
│    private sit-out               │ outdoor seating                   │
│                                  │ nature-walk access                │
│    official list only — no AC / Wi-Fi / TV claims                    │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 6  BEYOND YOUR DOOR — shared spaces  (data-nav=light)                │
│    six tiles, each opens that spot in the 360° tour:                 │
│    Pool (6:30 am–6 pm) · Dining hall (vegetarian, farm-fresh) ·      │
│    Traditional bath (Hande Ole Snana) · Games & sports centre ·      │
│    Amphitheatre & campfire · Koi pond                                │
│    photos where we have them (group-corporate = dining hall,         │
│    about-firepit = campfire circle); 360° for the rest               │
│    "And the farm itself" → The Living Farm (cows, goats, ducks…)     │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 7  PLAN YOUR STAY — enquiry form  (data-nav=dark band)               │
│    Name · Phone (+91) · Check-in · Check-out · Adults · Kids ·       │
│    Room preference [Mayur · Mathura · Gopala · Govinda · Gopika ·    │
│    Nanda Gokula · Kavsthuba · Not sure]                              │
│    [Send on WhatsApp] (prefilled)   [Check availability] (Stayflexi) │
│    or email hello@… · call +91 9945 7949 25                          │
│    small print: check-in 12 pm · check-out 11 am · photo ID needed · │
│    cancellation policy link                                          │
└─────────────────────────────────────────────────────────────────────┘
  FOOTER (shared)
```

**Components:** hero = shared hero pattern (`SplitText` headline); room tabs = pills + the `Preview360` start-cover
pattern with the deep-linked URL; photo strips = swipe rows on phones; family cottages = dark band like Groups;
shared spaces = tile row; form = labelled inputs that open WhatsApp prefilled. `CardSwap` could present the three
family cottages instead of tabs if a more playful feel is wanted.

**Phones:** pills replace tabs; each 360° view sits under its tabs at 16:11; photo strips become swipe rows; the
four options in section 2 become a swipe row.

## Still to confirm with the client

Answered from the official site: which stays exist, family-cottage capacities, beds and bathrooms, the official
amenity lists, stay rules, and pool access for day guests. Remaining:

1. **Names** — the tour and the site disagree (Mayura vs *Mayur*, Govardhana vs *Govinda*); "Kavsthuba" is probably
   *Kaustubha*. Which spellings are final? The page uses the site's for now.
2. **Cottage occupancy** — "2 Cottages 4 & 3 Occupancy": which cottages sleep 4 and which 3, and what the extra guest
   sleeps on (the 360° shows a double + a folding bed).
3. **Room ↔ 360° mapping** — is the tour's "Triple Occupancy" scene Kavsthuba (5 single cots, 3 visible)?
4. **Cancellation policy** — the Cancellation page says non-refundable within 48 hours of check-in; the Terms page
   says full charge within 5 days. Which applies?
5. **Photos** — per-cottage photos for Gopala and Govinda, and photos of Gopika and Kavsthuba.
6. **Current site** — the live homepage shows an internal draft note and placeholder "Amenities 1 / 2 / 3" in its
   "Nature's Comforts" pop-up. Worth fixing there.
