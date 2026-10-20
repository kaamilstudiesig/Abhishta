# The Living Farm — updated wireframe

Supersedes `docs/reference/wireframe-react/the-living-farm/` (Relume blocks with placeholder copy). Section order and
copy direction follow `docs/SITEMAP.md` (THE LIVING FARM). Sources, all read 2026-10-20, in the order to trust them
(the client's call for Our Nests, kept here):

1. **The 360° tour** — https://www.turiya.co/360/Abhishta/ (`pano.xml`): which animal areas exist, the breeds named
   on the gaushaale and goat-shelter scenes, the signs seen in the views.
2. **Stayflexi** — https://bookingengine.stayflexi.com/?hotel_id=32336: stays and meal plans (see
   `docs/wireframes/our-nests.md`; nothing farm-specific is listed there).
3. **The current official site** — https://www.abhishtaagrifarmstay.com/ (home, Day Outing, Gau Seva, School &
   Corporate pages): the experiences, the day-outing schedule, the gau seva rituals.

## Facts

### Experiences (official site, home page "Farm Experiences")

| Experience | What the site says |
| --- | --- |
| Cow cuddling | Sit calmly with gentle cows; relaxing, therapeutic |
| Feeding farm animals | Hand-feed sheep, goats and chickens and learn their habits |
| Vegetable harvesting | Pick vegetables from the soil and learn about organic farming |
| Agri tour | A guided walk through the fields: seasonal crops, traditional methods, sustainable farming |
| Fruit picking | Pick ripe, seasonal fruit in the orchards (fruits not named) |
| Nature walks | Guided or self-guided paths through tree-lined, grassy areas |
| Bonfire evenings | Stories and time together around a fire under the stars |
| Traditional games | Lagori, gilli-danda and hopscotch (Day Outing page adds aluguli mane) |
| Tractor rides | "Explore village life with a tractor ride", at extra cost (client, 2026-10-20; replaces the old site's bullock cart) |

School groups also get "Plant a sapling" and live sessions with the farm animals (School & Corporate page).

### Animals (360° tour)

- **Gaushaale** (`#Abhishta_20`, `#Abhishta_21`, `#Abhishta_22`) — six breeds named in the scene notes, with signs
  on the stalls (GIR COW and HALLIKAR are readable in the views): **Punganur Gidda, Jersey, Hallikar, Gir, Kankrej,
  Holstein Friesian**.
- **Goat and sheep shelter** (`#Abhishta_24`) — **Jamnapari, South African Boer and Thalassery goats; Bannur sheep**
  (a JAMNAPARI sign is readable).
- **Chickens** roam the yard by the coop and **white ducks** live under the **duck canopy** (`#Abhishta_23`, views at
  pan −44 and −139). A **rabbit hutch** stands by the Nandagokula rooms (`#Abhishta_13`, `#Abhishta_14`), but the
  rabbits can't be seen in the views — mention them, don't show them.
- **Cow cuddling area** (`#AerialView_03`) — a small fenced pen on the lawn inside the orchard.

### Gau seva (official site, Gau Seva page)

The gaushaala feeds its cows green and dry fodder, jaggery and rice, balanced for each breed, with regular vet
check-ups and clean, spacious shelter; trained caretakers look after them. Guests can feed and serve the cows and
join **Gau Pooja** (bathing and adorning a cow with turmeric, kumkum and garlands, then prayers), **Gau Aarti**
(a lamp ceremony with devotional music, morning or evening), **Gau grass daan** (offering grass, jaggery, fruit or
fodder) and **Gau Vandana** (circling the cow while chanting). Guests should **contact the farm before a Gau Pooja**
so dates don't clash. Companies can take part through CSR. Revenue from the stay goes to the cows' care.

### A day outing (official site, Day Outing page)

8:00 am arrival and welcome drink · 8:30 breakfast · 9:30 guided farm tour and the animals · 11:30 games and free
time · 1:30 pm vegetarian lunch · 3:00 pool · **4:00 cow cuddling** · 5:00 high tea · 6:00 pm check-out.
Included: the meals above, pool, farm tour, cow cuddling, indoor and outdoor games. No prices on the site.

### Food

The farm grows vegetables, greens and fruit, and the milk comes from its cows (official site, "From Farm to
Table"; organic fertilisers and eco-friendly methods). Guests learn how produce is grown, then eat it at the table.
Day-outing lunch is vegetarian.

## Page structure

Every section is a one-screen `[data-snap]` page (like `/`, `/our-nests`), checked at 360×740 through 1440×900.
Bands alternate light and dark so no two neighbours share a colour. No anchors are linked to from other pages yet;
the jump pills use the ids below.

```
┌─────────────────────────────────────────────────────────────────────┐
│ 1  #top — HERO  (data-nav=dark, full screen photo)                   │
│    about-landscape.jpg (a paved path between trees)                  │
│    "The living / farm" — two lines that drift as you scroll away     │
│    Rediscover joy in the simplicity of rural life: pick, feed,       │
│    walk, and sit with the cows on a working farm.                    │
│    [Plan a farm day →]  (WhatsApp, prefilled)                        │
│    glass pills: Work the land · The animals · Gau seva ·             │
│                 Soil to table · Plan your visit                      │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 2  #work-the-land — WORK THE LAND  (paper)                           │
│    bento, border glow follows the pointer (React Bits MagicBento):   │
│    ┌───────────────────┬─────────────────────────┐                   │
│    │ Pick fruit in the │ Walk the fields with     │                  │
│    │ orchard           │ someone who works them   │                  │
│    │ live 360° of the  │ (guided agri-tour, 9:30) │                  │
│    │ orchard           ├────────────┬────────────┤                   │
│    │                   │ Harvest    │ Nature     │                   │
│    │                   │ vegetables │ walks      │                   │
│    │                   │ (icon)     │ (photo)    │                   │
│    └───────────────────┴────────────┴────────────┘                   │
│    phones: header, then a swipe row of the four tiles                │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 3  #animals — THE ANIMALS AND FARM PLAY  (forest band)               │
│    five expanding panels; the open one shows its view and its line:  │
│    Feed the goats and sheep (360° shelter, breeds) · Chickens, ducks │
│    and rabbits (360° yard) · Tractor rides · The old games      │
│    (lagori, gilli-danda, hopscotch, aluguli mane) · Bonfire evenings │
│    (about-firepit.jpg)                                               │
│    phones: pills, one panel under them                               │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 4  #gau-seva — GAU SEVA  (sage band) — the page's bold moment        │
│    ┌──────────────────────────┐  The cows know a calm hand           │
│    │ live 360°, bleeding to   │  cow cuddling, 4 pm on a day outing  │
│    │ the screen edge: Gir     │  the six breeds as a large register: │
│    │ cows · Hallikar · the    │  Punganur Gidda  Jersey  Hallikar    │
│    │ gaushaale · the cow      │  Gir  Kankrej  Holstein Friesian     │
│    │ cuddling pen (arrows)    │  feed them, Gau Pooja, Gau Aarti —   │
│    └──────────────────────────┘  tell us first. [Ask about gau seva] │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 5  #soil-to-table — FROM THE SOIL TO YOUR PLATE  (forest band)       │
│    rows ─┐                                                           │
│    orchard ─┼── beams ──▶ kitchen ──▶ your plate   (Magic UI          │
│    gaushaale┘                                     Animated Beam)     │
│    five pillars: Naturally grown · Organic practices · Farm-fresh    │
│    dairy · Wholesome meals · Harvest to plate                        │
│    (the sitemap's "Soil to table" and "five pillars" share a screen) │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 6  #plan-your-visit — BOOK AN EXPERIENCE  (paper)                    │
│    Come for the day                 │ Stay the night                 │
│    the day-outing schedule, 8–6     │ cottages and Nandagokula       │
│    [Plan a day outing] (WhatsApp)   │ [See our nests] [Check avail.] │
│    or email · or call                                                │
└─────────────────────────────────────────────────────────────────────┘
  FOOTER (shared)
```

## Open-source pieces used

- **React Bits — MagicBento** (MIT + Commons Clause): the border glow and spotlight that follow the pointer, rebuilt
  in `src/components/bits/MagicBento.tsx` without particles, tilt or magnetism.
- **Magic UI — Animated Beam** (MIT): light travelling along curved paths between nodes, rebuilt in
  `src/components/bits/AnimatedBeam.tsx` with an SVG dash animation instead of Motion (no new dependency).
- **Expanding panels** (a common accordion-gallery pattern): `src/components/bits/ExpandingPanels.tsx`.
- The 360° views use the site's `TourViewer` (never an iframe).

## Photos and views

| Slot | Asset |
| --- | --- |
| Hero | `about-landscape.jpg` |
| Orchard | 360° `#AerialView_03`, facing the trees |
| Nature walks | `day-dawn.jpg` |
| Goats and sheep | 360° `#Abhishta_24` |
| Chickens and ducks | 360° `#Abhishta_23` (pan −44 chickens, −139 ducks) |
| Bonfire | `about-firepit.jpg` |
| Gau seva | 360° `#Abhishta_20` (Gir), `#Abhishta_21` (Hallikar), `#Abhishta_22`, `#AerialView_03` (pen) |
| Tractor, games, vegetables, food | **no photo yet** — line icons for now |

## To confirm with the client

- Photos of the animals, the vegetable rows, the tractor ride, children playing lagori, and food on the table.
- Which fruits grow in the orchard (the 360° shows what look like mango trees) and in which months.
- Whether tractor rides, fruit picking and vegetable harvesting run every day or by season or on request.
- Meat and eggs: the official site's "From Farm to Table" mentions both, but day-outing meals are vegetarian. The
  page names vegetables, greens, fruit and milk only, until the client says otherwise.
- Day-outing prices (not on the official site): the page routes to WhatsApp instead of quoting.
