# BUILD PROMPT — Abhishta homepage (final, locked 2026-10-18)
Copy-paste this into Claude Code with the starter-pack folder.
Prerequisite: the skills below must be installed (see README "Start from zero").

---

Build the Abhishta Agri Farm Stay homepage.

## Skills — invoke these explicitly, do not rely on auto-detection
- Use the `frontend-design` skill for every visual design decision on this page. Commit to the "modern rustic — premium but earthy" direction; never fall back to generic AI-looking layouts.
- Follow `react-best-practices` for all React/Next.js code you write — component patterns, performance, no anti-patterns.
- When the page is built, run a `web-design-guidelines` audit over your own code and fix everything it flags before calling it done.
- Use `webapp-testing` to screenshot every section and check your own work visually.
- Finish with an `impeccable` polish pass — run its critique/polish commands over the page and apply what they find.

## Brand system — DESIGN_GUIDELINES.md is law
Read DESIGN_GUIDELINES.md first and follow it exactly: color tokens (farm #096139, forest #073B24, gold #E9A321, paper #FAF6EF, ink #1E1B14…), the golden-ratio type scale (Display 72 / H1 45 / H2 28 / H3 22 / Body 17 / Small 11, body line-height 1.618), the φ spacing ladder (8·13·21·34·55·89·144), 61.8/38.2 asymmetric splits, contrast rules (never white on gold), Fraunces + DM Sans via next/font/google mapped into the Tailwind theme. Custom 1.5px line icons in farm green. No emojis as icons. No lorem ipsum.

## Wireframe — study it, don't copy its styling
Before writing any code, read `wireframe-react/home/index.jsx` and every file in `wireframe-react/home/components/`. That is the approved wireframe: take its section structure, section order, and content inventory as your blueprint. Do NOT copy its visual styling — it is an unstyled Relume export. Rebuild every section from scratch inside the DESIGN_GUIDELINES.md brand system. SITEMAP.md is the source of truth for section order and copy; where the wireframe and SITEMAP.md disagree, SITEMAP.md wins.

## Stack
Next.js App Router + TypeScript + Tailwind CSS. Lenis smooth scroll. GSAP + ScrollTrigger for parallax, wired to Lenis. Sticky footer reveal (footer `position: sticky; bottom: 0`, page content above with solid background). Respect `prefers-reduced-motion` everywhere.

## Components
Install these React Bits components — stashed sources are in `component-library/`, or pull via the shadcn MCP `@react-bits` registry: StaggeredMenu, ScrollReveal, SplitText, CircularText, GradualBlur, ScrollExpand, ScrollStack, CardSwap, CircularGallery.

Do NOT use them stock. Treat each source as a starting point and restyle it into the brand system before placing it: every color → DESIGN_GUIDELINES.md tokens, type → Fraunces/DM Sans on the φ scale, radii 13/21px, spacing on the φ ladder, motion eased to match the site. A finished component should be unrecognizable as stock React Bits.

Global component rules:
- SplitText on all main section headings. ScrollReveal on all body copy.
- GradualBlur behind the navbar and at section edges.
- StaggeredMenu for the nav.
- Floating WhatsApp button, always on screen → https://wa.me/919945794925
- Sticky booking button, always on screen → https://bookingengine.stayflexi.com/?hotel_id=32336
- Every booking CTA on the page points to that Stayflexi URL.

## Sections, in order

1. HERO — full-screen `assets/videos/hero-background.mp4` (autoplay, muted, loop, playsinline, poster fallback). SplitText headline: "Escape the urban chaos and embrace serenity at Abhishta Agri Farm Stay, 90 km from Bangalore". Docked availability bar overlapping the hero's bottom edge: Stay/Outing Type, Name, Phone +91, Check-In, Check-Out, Check Availability button → Stayflexi URL.

2. ABOUT ("Abhishta is...") — scroll-snap from the hero into this section (implement the snap Lenis-compatible, NOT raw CSS scroll-snap which fights Lenis). ScrollExpand: pinned "Abhishta is" heading; the farm image expands from a rounded card to full-bleed as you scroll. About details (the meaning of "Abhishta" — desired, beloved; open skies, fields, pool, bullock carts) laid over the image with guaranteed text contrast — use scrims/gradients, never let text sit unreadable on the photo. Framed 360° property preview with a rotating CircularText badge ("drag to explore · 360°"), embedding https://www.turiya.co/360/Abhishta/. "Watch Our Story" lightbox → https://www.youtube-nocookie.com/embed/4L4cuBmsb38.

3. STAYS — keep this section simply designed, no showpiece animation. Two clean cards: Cozy Cottages (up to 4 guests, private sit-outs) and Group Dormitories (5–10 guests), capacity badges, link to /our-nests.

4. A DAY IN THE FARM — ScrollStack of 4 pinned cards, each with image + text: Dawn (nature walks, Gau Seva cow cuddling) / Morning (agri-tours, fruit picking, harvesting) / Midday (farm-to-table dining, pool) / Dusk (lagori, gilli-danda, hopscotch, bonfire).

5. BRING YOUR PEOPLE TO THE OPEN LAND — CardSwap: Corporate Offsites, School Agri-Tours, Day Outings, Destination Events, each linking to /group-enquiries. Use the pulled farm images in `assets/images/`; where a category has no photo, use stock imagery.

6. REVIEWS — CircularGallery of 5.0-star Google review cards (Kalappa Kuppanda, Madhurya S, Nithya A, Prashanth K), "Leave a Review" link, plus the 4-frame vertical Instagram Reels strip (embed via reel URLs when provided).

7. FOOTER — scroll-reveal: giant "Abhishta" revealed on scroll, all nav links, contact cards (Reservation +91 9945 7949 25 · Landline +91 9379 1963 00 · Email hello@abhishtaagrifarmstay.com · Jiddigere Village, Yediyuru Hobli, Kunigal Taluk, Tumkur, Karnataka 572134), socials (Instagram, Facebook, YouTube, WhatsApp, TripAdvisor), newsletter signup ("harvest news and seasonal notes").
