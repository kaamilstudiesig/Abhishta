# Group Enquiries — updated wireframe

Supersedes `docs/reference/wireframe-react/group-enquiries/` (Relume blocks: hero, timeline carousel, numbered
service list, tabbed feature, contact form). Section order and copy direction follow `docs/SITEMAP.md` (GROUP
ENQUIRIES). Sources, read 2026-10-20, in the order to trust them:

1. **The 360° tour** — https://www.turiya.co/360/Abhishta/: the spaces groups use (entrance, dining hall and its
   buffet counter, games corner in the office, pool, gaushaale, cow cuddling pen, amphitheatre, the fields from above).
2. **Stayflexi** — https://bookingengine.stayflexi.com/?hotel_id=32336: rooms and capacity (see
   `docs/wireframes/our-nests.md`): four cottages for up to 5 each; Nandagokula family and bachelors dormitories for 10
   each and a triple for 3–4, each booked whole.
3. **The current official site** — https://www.abhishtaagrifarmstay.com/: School & Corporate, Day Outing and
   Destination Events pages.

The homepage links here with `#corporate`, `#schools`, `#day-outings` and `#events`.

## Facts

### Corporate outings (School & Corporate page)

Corporate outings, team-building retreats and employee engagement programmes: open green spaces, group activities,
indoor games, poolside time. Why groups choose it: a scenic venue · cottages and dormitories for teams of different
sizes · team-building activities · **vegetarian and non-vegetarian** farm-fresh meals · day-outing or overnight
packages, customised. The enquiry asks for company name, date, day outing or overnight stay, and number of people.
**Projector and conference facilities** are listed on the Destination Events page.
A real corporate review is on Google (shown on the homepage): Kalappa Kuppanda, "We had corporate team outing and
all of us had an unforgettable experience at Abhishta Agri Farm Stay…".

### Day outings (Day Outing page)

8:00 am arrival and welcome drink · 8:30 breakfast · 9:30 guided farm tour and the animals · 11:30 games and free
time · 1:30 pm vegetarian lunch · 3:00 pool · 4:00 cow cuddling · 5:00 high tea · 6:00 pm check-out.
Games: cricket, basketball, volleyball, throwball; chess, UNO, Ludo, carrom; lagori, aluguli mane. No prices online.

### School and college visits (School & Corporate page)

Trips that add to the curriculum: sustainable farming, guided tours of how farms work, live sessions with the animals
(cows, goats, sheep, birds), agricultural exploration, outdoor, indoor and traditional games, the pool, cow cuddling and
**planting a sapling**. Suits school picnics, college field trips and veterinary students. The enquiry asks for the
school or college name, date, day outing or overnight stay, and number of students. Overnight, the Nandagokula
bachelors dormitory has 10 single beds and its own washroom (tour, Stayflexi).

### Destination events (Destination Events page)

Birthdays · baby showers · pre-wedding functions and mehendi · anniversaries · kitty parties · Shastipoorthi (the
60th-birthday ritual). Up to **100 people for a gathering**; a stage with music and lighting; projector and
conference facilities; **separate vegetarian and non-vegetarian kitchens** with custom menus; themed décor; an events
team; ample parking. Yoga retreats: Nandagokula is suited to them (official site, Our Nests).

## Page structure

Every section is a one-screen `[data-snap]` page, checked at 360×740 through 1440×900. Bands alternate light and dark.

```
┌─────────────────────────────────────────────────────────────────────┐
│ 1  #top — HERO  (data-nav=dark) photo: group-event.jpg (the          │
│    amphitheatre's tiled tiers on the lawn)                           │
│    "Bring the / whole crew" — drifts as you scroll away              │
│    Corporate teams, school groups, day outings and family            │
│    celebrations, on a working farm 90 km from Bangalore.             │
│    [Get a group quote →]  (to #group-quote)                          │
│    glass pills: Corporate outings · Day outings · School visits ·    │
│                 Destination events · Get a quote                     │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 2  #corporate — CORPORATE OUTINGS  (paper)                           │
│    heading + five reasons, each with an icon      │ group-corporate  │
│    (venue, team games, rooms for teams, veg and   │ photo, the Google│
│    non-veg meals, projector), day or overnight    │ review over it   │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 3  #day-outings — A DAY ON THE LAND  (forest) — the bold moment      │
│    a day scrubber: the schedule as a rail of nine stops, 8:00 → 6:00;│
│    pick a stop (or use the arrows) and the live 360° turns to where  │
│    it happens: gate · dining hall · gaushaale · games corner ·       │
│    buffet · pool · cow cuddling pen · dining hall · farm from above  │
│    [Plan a day outing] (WhatsApp)                                    │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 4  #schools — THE LIVING CLASSROOM  (sage)                           │
│    what students do (eight items, icons) │ stay-dorm-2.jpg: the      │
│    who it suits: school picnics, college │ bachelors dorm, ten single│
│    field trips, veterinary students      │ beds, booked whole        │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 5  #events — CELEBRATIONS AND RETREATS  (forest)                     │
│    what comes with an event      │ the six occasions as a FlowingMenu│
│    (100 guests, stage, projector,│ (React Bits): hover → a band with │
│    two kitchens, décor, parking) │ a stock photo; pick → fills quote │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ 6  #group-quote — GET A GROUP QUOTE  (paper)                         │
│    a three-step form (React Bits Stepper):                           │
│    1 Your group: type (corporate / school or college / day outing /  │
│      destination event) · how many · day outing or overnight         │
│    2 When: preferred date · organisation (optional)                  │
│    3 You: name · phone (+91) · email · anything else                 │
│    [Send on WhatsApp] (prefilled) · or email it · or call            │
└─────────────────────────────────────────────────────────────────────┘
  FOOTER (shared)
```

## Open-source pieces used

- **React Bits — FlowingMenu**: the occasions, each with an Unsplash stock photo (free under the Unsplash License;
  photos by Aneta Pawlik, Jose Marroquin, Sujeeth Potla, Pradnyal Gandhi, Olek Buzunov, Thilina Alagiyawanna),
  served from images.unsplash.com. They illustrate the occasion, not the farm; replace with the farm's own event photos.
- **React Bits — Stepper** (MIT + Commons Clause): a multi-step form with a progress indicator and sliding steps,
  rebuilt in `src/components/bits/Stepper.tsx` (bars indicator, fieldsets, focus moves to each new step).
- The form fields are shared with Our Nests' "Plan your stay" (`src/components/forms.tsx`).
- `PageHero`, `GlassSurface` and `TourViewer` as on the other inner pages.

## Photos and views

| Slot | Asset |
| --- | --- |
| Hero | `group-event.jpg` |
| Corporate | `group-corporate.jpg` (the dining hall) |
| Day outing | 360°: `#AerialView_01` gate · `#Abhishta_03` dining hall (pan 22) and buffet (pan −150) · `#Abhishta_20` gaushaale · `#Abhishta_10` games corner (pan 95) · `#SwimmingPoolBliss` · `#AerialView_03` cow pen · `#BirdsEyeView01` |
| Schools | `stay-dorm-2.jpg` (the bachelors dormitory) |
| Events | Unsplash stock photos for the six occasions (see above) |

## To confirm with the client

- Capacity: the Destination Events page says up to 100 for a gathering in one place and "100–150" in another, and
  40 or 50 overnight. The page says "up to 100" and gives the room counts from Stayflexi instead of an overnight total.
- Where high tea is served (the page shows the dining hall) and where the stage, projector and conference facilities are.
- Group rates and minimum group sizes (none online; the page routes to the quote form).
- Photos of a school group and a team on the farm, and of an event set up on the lawns.
