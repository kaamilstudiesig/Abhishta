# Our Nests — updated wireframe

Supersedes `docs/reference/wireframe-react/our-nests/` (generic "cottage / dorm one" blocks with placeholder copy).
Sources, all read 2026-10-19, and the order to trust them in (client's call):

1. **The 360° tour** — https://www.turiya.co/360/Abhishta/ (34 scenes): room names, which rooms exist, beds, bathrooms.
2. **The Stayflexi booking engine** — https://bookingengine.stayflexi.com/?hotel_id=32336: cancellation policy,
   check-in/out times, rate plans.
3. **The current official site** — https://www.abhishtaagrifarmstay.com/: anything the two above don't cover.

Plus the client photography in `public/images/client-photos/` and `docs/SITEMAP.md`.

## The stays

### Cottages — Mayura · Mathura · Gopala · Govardhana

| Cottage | Seen in the 360° | Deep link (`https://www.turiya.co/360/Abhishta/#…`) |
| --- | --- | --- |
| **Mayura** | double bed + folding extra bed, wardrobe, bedside table, own washroom | `#Abhishta_27` |
| **Mathura** | same layout as Mayura, own washroom | `#Abhishta_25` |
| **Gopala** | named on the tour's path, no room view | — (use a photo) |
| **Govardhana** | named on the tour's path (spelt "Govrdhana" there), no room view | — (use a photo) |

- Each has its own washroom (tour) with hot water (site), and a private sit-out with sunrise/sunset views (site).
- Red-oxide floors, tiled timber roofs, garden-facing windows (tour).
- **Sleeps up to 5** (Stayflexi): beds for 4, plus an extra bed or mattress for a fifth guest.
- **Air-conditioned** (Stayflexi), with fans.

### Nandagokula — the group rooms

| Room | Beds | Sleeps | Washroom | Deep link |
| --- | --- | --- | --- | --- |
| **Nandagokula Family Dormitory** | double beds (5 doubles per the site) | 10 | own washroom | `#Abhishta_06` |
| **Nandagokula Bachelors Dormitory** | single beds (10 per the site) | 10 | own washroom | `#Abhishta_04` |
| **Nandagokula Triple Occupancy** | 4 single beds | 3–4 | own washroom | `#Abhishta_08` |

Up to 24 guests across the three rooms. All three are air-conditioned (Stayflexi). Suited to families travelling together, friends, school groups, camps and
yoga retreats (site).

### Not a guest stay

**Courtyard House** is tagged *Owners' Residence* in the tour. Leave it out.

### Name meanings (for small captions)

The names follow Krishna's story: Mayura — the peacock · Mathura — his birthplace · Gopala — the cowherd ·
Govardhana — the hill he lifted · Nandagokula — the village he grew up in. Fitting for a farm with a gaushaale.

## Booking facts (Stayflexi)

- **Bookable room types:** "Cottage" (listed as max 5 guests) and "Dormitory" (max 10 guests; "only 2 rooms left",
  so the two 10-guest dorms are bookable online). The Triple Occupancy room isn't listed separately.
- **Check-in 2:00 pm · check-out 1:00 pm.** (The current site's Terms page says 12 pm / 11 am — Stayflexi wins.)
- **Rate plans** for each room type: room only ("CP Plan") · breakfast + dinner · all meals. Prices are live in
  Stayflexi — link to it, don't hard-code rates on the page.
- **Amenities Stayflexi lists:** cottage — private bathroom, toiletries, electric kettle, wardrobe, fan, AC;
  dormitory — shower, toiletries, bottled water, fan, AC. Client confirmed: trust Stayflexi — every room has AC.
- **Cancellation policy** (Stayflexi — replaces both conflicting pages on the current site):
  - No refunds once payment is made.
  - Cancelled **10 or more days** before check-in → a credit note, valid 3 months from the original arrival date.
  - Cancelled **less than 10 days** before → a credit note only if the dates are rebooked by someone else
    (valid 1 month); otherwise no refund or credit.
  - Advance and balance must be paid **24 hours before check-in**, or the booking is cancelled with no refund.
  - A refundable **₹5,000 security deposit** is collected at check-in and returned at check-out if there's no damage.

## Stay rules (current site, Terms page)

Government photo ID for every guest · primary guest 21+, under-18s with a parent or guardian · visitors
10 am–6 pm · quiet hours 10:30 pm–8 am · no outside food or alcohol · smoking only in designated outdoor areas.
Meals are vegetarian (Day Outing page).

## Shared spaces (tour + site)

Each opens in the 360° tour: Bliss swimming pool `#SwimmingPoolBliss` (6:30 am–6 pm; day-outing guests use it too)
· Dining zone `#Abhishta_03` · Traditional bath / Hande Ole Snana `#Abhishta_15` (wood-fired copper-pot bath)
· Office / Game & sports centre `#Abhishta_10` (cricket, basketball, volleyball, throwball, chess, carrom, UNO,
Ludo; lagori and aluguli mane) · Amphitheatre / campfire `#Amphitheatre` (bonfire & barbecue evenings)
· Koi pond `#Abhishta_11`.

For The Living Farm page: cow cuddling `#AerialView_03`, gaushaale `#Abhishta_20` (Punganur Gidda, Jersey,
Hallikar, Gir, Kankrej, Holstein Friesian), goat & sheep shelter `#Abhishta_24` (Jamnapari, Boer, Thalassery,
Bannur sheep), chicken coop, duck canopy, rabbit hutch.

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
│    Four cottages and the Nandagokula rooms under tiled roofs,        │
│    a step from the orchard.                                          │
│    [Check availability →]                                            │
│    jump pills: Cottages · Nandagokula · Shared spaces · Plan a stay  │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 2  CHOOSE YOUR NEST  (data-nav=light)                                │
│    "Which nest is yours?" — four options, one line each:             │
│    ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│    │ Cottage  │ │ Family   │ │ Bachelors│ │ Triple   │               │
│    │ couples, │ │ dorm     │ │ dorm     │ │ room     │               │
│    │ small    │ │ families │ │ friends, │ │ three    │               │
│    │ families │ │ together │ │ schools  │ │ friends  │               │
│    │ up to 5  │ │ sleeps 10│ │ sleeps 10│ │ sleeps 3–4│              │
│    └──────────┘ └──────────┘ └──────────┘ └──────────┘               │
│    each card jumps to its room below          (phone: swipe row)     │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 3  #cottages — THE COTTAGES  (data-nav=light)                        │
│    61.8 / 38.2 split                                                 │
│    ┌───────────────────────────────┐  Mayura · Mathura · Gopala ·    │
│    │                               │  Govardhana    (name tabs)      │
│    │  live 360° of the selected    │  "Mayura — the peacock"         │
│    │  cottage (deep link, behind a │  sleeps up to 5 · AC            │
│    │  "Start the 360° view" cover) │  ✓ own washroom, hot water      │
│    │  Gopala / Govardhana: photo   │  ✓ wardrobe · kettle · toiletries│
│    │  instead (no room view)       │  ✓ private sit-out              │
│    └───────────────────────────────┘                                 │
│    photo strip: stay-cottage-1 · -2 · -3 · -sitout                   │
│    [Book a cottage]   See it in 360°                                 │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 4  #dormitories — NANDAGOKULA  (data-nav=dark band)                  │
│    "Nandagokula — the village Krishna grew up in, made for groups    │
│     who travel together."                                            │
│    three rooms as tabs (phone: pills) driving one panel:             │
│    [Family dormitory · 10] [Bachelors dormitory · 10] [Triple · 3–4] │
│    ┌───────────────────────────────┐  who it's for                   │
│    │ live 360° of that room        │  beds · sleeps                  │
│    │ (deep link, start cover)      │  ✓ own washroom                 │
│    └───────────────────────────────┘                                 │
│    photos: stay-dorm-1 · stay-dorm-2                                 │
│    "Together up to 24 — for a school trip, camp or yoga retreat"     │
│    [Plan a group stay → /group-enquiries]                            │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 5  NATURE'S COMFORTS  (data-nav=light) — two-column checklist        │
│    Cottages                      │ Nandagokula                       │
│    own washroom, hot water       │ own washroom, shower              │
│    daily housekeeping            │ bottled water                     │
│    wardrobe · kettle · toiletries│ toiletries                        │
│    private sit-out               │ shared lawns, nature walks        │
│    air-conditioned, fans         │ air-conditioned, fans             │
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
│    Room preference [Mayura · Mathura · Gopala · Govardhana ·         │
│    Family dormitory · Bachelors dormitory · Triple · Not sure]       │
│    Meal plan [Room only · Breakfast + dinner · All meals]            │
│    [Send on WhatsApp] (prefilled)   [Check availability] (Stayflexi) │
│    or email hello@… · call +91 9945 7949 25                          │
│    small print: check-in 2 pm · check-out 1 pm · photo ID needed ·   │
│    ₹5,000 refundable deposit · cancellation policy (expandable)      │
└─────────────────────────────────────────────────────────────────────┘
  FOOTER (shared)
```

**Components:** hero = shared hero pattern (`SplitText` headline); room tabs = pills + the `Preview360` start-cover
pattern with the deep-linked URL; photo strips = swipe rows on phones; Nandagokula = dark band like Groups; shared
spaces = tile row; form = labelled inputs that open WhatsApp prefilled. `CardSwap` could present the three
Nandagokula rooms instead of tabs if a more playful feel is wanted.

**Phones:** pills replace tabs; each 360° view sits under its tabs at 16:11; photo strips become swipe rows; the
four options in section 2 become a swipe row.

## Photos

| Slot | Photo |
| --- | --- |
| Hero | `stay-cottage-exterior.jpg` |
| Cottages strip | `stay-cottage-1/-2/-3.jpg`, `stay-cottage-sitout.jpg` |
| Mayura, Mathura | 360° room view (deep link) |
| Gopala, Govardhana | **client sending** — use their cottage photos when they land in `public/images/client-photos/` |
| Nandagokula strip | `stay-dorm-1.jpg`, `stay-dorm-2.jpg` |
| Family dormitory, Triple occupancy | **client sending** (360° room views meanwhile) |
| Shared spaces | `group-corporate.jpg` (dining hall), `about-firepit.jpg` (campfire circle); 360° for the rest |

## Confirmed with the client (2026-10-19)

- Room names, rooms and beds: follow the 360° tour. Policy, times, capacity and amenities: follow Stayflexi.
- Cottages sleep up to 5 (beds for 4 + an extra bed or mattress); every room has AC.
- Triple occupancy has 4 single beds and sleeps 3–4.
- Remaining: the photos above (on their way). Separately, the current site's Terms/Cancellation pages don't match
  Stayflexi, and its homepage shows a draft note and placeholder "Amenities 1 / 2 / 3" — worth fixing there.
