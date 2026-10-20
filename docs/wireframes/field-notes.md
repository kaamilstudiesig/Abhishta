# Field Notes & 360° Atlas — updated wireframe

Supersedes `docs/reference/wireframe-react/field-notes-&-360°-atlas/` (Relume: hero with a 360° frame, gallery,
contact form). Order and direction follow `docs/SITEMAP.md`. Sources, in the order to trust them (client's call,
2026-10-20): **the client's rate sheet** (see `docs/wireframes/our-nests.md`) > **Stayflexi** > **the 360° tour** >
**the old site**.

## Facts

- **What every stay includes** (client): lunch, evening snacks, dinner and breakfast · swimming pool · cow cuddling and
  feeding the animals · meet the cows, goats, sheep and chickens · guided farm tours and seasonal activities ·
  vegetable harvesting and seasonal fruit picking · nature walks · bonfire evenings · free Wi-Fi · ample parking ·
  traditional bath (hande ole). Tractor ride at extra cost.
- **Enquiries** (client): call or WhatsApp 99457 94925, Deva Bhanu. Landline +91 9379 1963 00 and email
  hello@abhishtaagrifarmstay.com (old site). Office hours Monday to Friday, 9 am to 6 pm (old site).
- **Address** (old site): Jiddigere Village, Yediyuru Hobli, Kunigal Taluk, Tumkur, Karnataka 572134; about 90 km
  from Bangalore.
- **Check-in 2 pm, check-out 1 pm** (Stayflexi).
- **Nearby places** (the tour's bird's-eye scene, with the direction each lies in): Rangaswamy Betta (hiking) 27 min ·
  Sidlingeshwara Yoga Vana Betta (hiking) 29 min · Markonahalli Dam 31 min · Kalur weaving and sarees 31 min ·
  Yediyur Siddalingeshwara Swamy Temple 32 min · Hadinkal Anjaneya Temple 36 min · Panchamukhi Anjaneya Swamy
  Temple 39 min · Adichunchanagiri Mutt 45 min · Shanimahatma Swamy Temple 50 min · Shravanabelagola 55 min.

## Page structure

Every section is a one-screen `[data-snap]` page, checked at 360×740 through 1440×900.

```
1  #top — THE 360° ATLAS (dark, full screen)
   a live 360° view fills the screen; title "See the whole farm in 360°" and a line sit over it;
   place pills: From above · Entrance · Cottage · Family room · Orchard · Pool · Dining hall ·
   Gaushaale · Campfire area — each turns the same view to that place. Drag to look around.
   The title fades once someone uses the view (after showing ~4 s) and returns after ~6 s idle.
   Touch screens: a clear layer lets swipes scroll the page; "Tap to look around" lifts it, "Done" restores.

2  #around — AROUND THE FARM — a full-screen illustrated map (after tengilemalamala.com/accommodation):
   the farm on its hatched land; the Shimsha river with the Markonahalli reservoir; the NH75 (Hassan west,
   Bangalore east via Kunigal); fields, groves, hill contours, compass, paper grain. Places are icon markers
   (temple, hill, dam, loom) placed by the tour's directions (north = 0, bearing = −pan) and drive times, not
   to scale. Right panel: legend, then a card for the chosen place (farm: photo; places: icon) with directions.
   Phones: the map scrolls sideways (starting on the farm) above the card.

3  #gallery — PHOTOS FROM THE FARM — the whole screen is a drifting wall of ~45 client photos (React Bits
   DriftWall, flat; 6/4/3 columns). On arrival the title pops up in the middle and fades after ~1.8 s.
   Hover stops a column and shows the caption; click opens the photo large.

4  #find-us — HOW TO REACH US (sage) — Google map, address, "Get directions", contact cards
   (call/WhatsApp Deva Bhanu, landline, email, office hours)

5  #ask-us — ASK US (paper) — what every stay includes (client list) beside a short form
   (name, phone, message) that opens WhatsApp prefilled; email as the other way
```

## Photos and views

- 360°: `BirdsEyeView01`, `AerialView_01`, `Abhishta_27`, `Abhishta_06`, `AerialView_03`, `SwimmingPoolBliss`,
  `Abhishta_03`, `Abhishta_20`, `Amphitheatre` (all already in `scripts/tour-scenes.mjs`).
- Gallery: `gallery-*.jpg`, from the client's "separated images" (Others).
- No videos yet for the "silent reels" the sitemap mentions — the gallery uses photos until the client sends some.

## To confirm with the client

- Office hours (the old site says Mon–Fri 9–6; a farm stay may answer every day).
- Short reels/videos for the gallery.
- Directions copy (route from Bangalore: via Nelamangala and Kunigal?) — the page links to Google Maps instead of
  describing a route.
