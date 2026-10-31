# Building a new page — guide for AI assistants

Read this before building any page of the Abhishta Agri Farm Stay site. The homepage (`src/app/page.tsx`) is
the reference implementation: match its structure, components and quality bar. When something here conflicts
with what you see in the code, the code is the truth — then update this guide.

## 1. What to build, and from what

Built: `/our-nests` (from **`docs/wireframes/our-nests.md`**; sections in `src/components/sections/our-nests/`) and
`/the-living-farm` (from **`docs/wireframes/the-living-farm.md`**; sections in `src/components/sections/living-farm/`)
`/group-enquiries` (from **`docs/wireframes/group-enquiries.md`**; sections in `src/components/sections/group-enquiries/`)
and `/virtualtour` (the 360° Virtual Tour, formerly `/field-notes`, which redirects; from
**`docs/wireframes/virtual-tour.md`**; sections in `src/components/sections/virtual-tour/`) and `/gallery` (the photo
wall that was on `/virtualtour` until 2026-10-31; `src/components/sections/gallery/`).
All pages in the menu are built.

Pages still to build (all currently fall through to the branded 404, `src/app/not-found.tsx`):

| Route | Sitemap section | Wireframe |
| --- | --- | --- |

- **A page with an updated wireframe in `docs/wireframes/` uses that instead of the Relume export.**
- **`docs/SITEMAP.md` is the source of truth** for each page's sections, order and copy direction. Where the
  wireframe and the sitemap disagree, the sitemap wins.
- **The wireframe** (an unstyled Relume export) gives section structure and content inventory only. Read the page's
  `index.jsx` and every file in its `components/`, then rebuild each section from scratch in this site's system.
  Never copy its styling, placeholder images, Relume components or its Navbar/Footer.
- **The homepage already links to these anchors** — the target page must provide matching `id`s:
  `/our-nests#cottages`, `/our-nests#dormitories`, `/group-enquiries#corporate`, `#schools`, `#day-outings`, `#events`.
  Nav links (`NAV_LINKS` in `src/lib/site.ts`, client's menu 2026-10-26): Home, Stay (`/our-nests`), Experiences
  (`/the-living-farm`), Groups & Events (`/group-enquiries`), Farm to Table (`/the-living-farm#soil-to-table`),
  360° Virtual Tour (`/virtualtour`), Gallery (`/gallery`, added 2026-10-31), Gau Seva (`/the-living-farm#gau-seva`). The header shows them in one row from
  `xl` (1280px); below that the StaggeredMenu holds them.

## 2. Stack and project rules

- Next.js App Router (a newer version than most training data — read `node_modules/next/dist/docs/` before using
  an API you're unsure of; see `AGENTS.md`), TypeScript, Tailwind CSS 4 (tokens in `@theme`, no tailwind.config),
  GSAP + ScrollTrigger, Lenis.
- Each page is `src/app/<route>/page.tsx`; its sections go in `src/components/sections/<page>/` (one file per section).
- Shared constants (booking URL, WhatsApp, contact details, socials, nav) come from `src/lib/site.ts` — never hard-code them.
- Imports use `@/…` for `src/` and `@public/…` for `public/` (used for the client photos).
- Run `npx tsc --noEmit` and `npm run lint` clean. Don't commit unless asked.

## 3. Page chrome

Every page wraps its sections in `SiteShell` (`src/components/SiteShell.tsx`): skip link, `Navbar`, `<main id="main">`,
`Footer`, the touch end-of-page snap marker and `FloatingActions`, inside `SmoothScroll`, so nav, footer, floating
booking/WhatsApp buttons and scrolling behave identically everywhere.

- `<SiteShell intro>` plays the page-load `IntroVeil` — homepage only.
- Touch screens snap with CSS `mandatory` on every page, so a page whose only `data-snap` is the hero would pull
  visitors back to the top. Either make every section a one-screen `data-snap` page (as `/our-nests` and the
  homepage do), or add a free-scroll mode to `SiteShell` that turns snapping off for that page.
- Keep `<main id="main" className="relative z-10 bg-paper">` — the footer is `position: sticky; bottom: 0`
  underneath it and is revealed as the page scrolls away.
- **Navbar tone:** every full-width section declares `data-nav="light"` (light background) or `data-nav="dark"`
  (dark background or photo/video). The navbar reads whichever is under it; sections without it leave it guessing.
- Inner pages don't play the intro veil, so don't use `SplitText trigger="intro"` there — use `"view"` (default) or `"load"`.

## 4. Scrolling

- `SmoothScroll` gives Lenis smooth scrolling on mouse/trackpad (never on touch). Elements marked `data-snap` are
  "pages": when a scroll comes to rest, it settles onto one (on every page — before the Our Nests build it only
  armed on pages with a card stack). Touch screens use native CSS mandatory snapping on
  the same `data-snap` elements.
- **Decide per page.** A short, image-led page can use one-screen sections with `data-snap` (as the homepage does).
  A long editorial or form page should usually have **no** `data-snap` sections and scroll freely.
- If you use `data-snap`, each snapped section must be exactly one screen on phones (check 360×740, 390×844,
  430×932) — anything taller creates awkward in-between stops. Use the `screen` class from `src/components/ui.tsx`.
- Never add CSS `scroll-snap` rules or another scroll library; never hijack the wheel outside `SmoothScroll`.

## 5. Look: Meadow (live) and classic (kept)

- The site renders **Meadow**: `<html data-ui="meadow">`, styles in `src/app/meadow.css` (token overrides + a few
  homepage-specific rules). The original **classic** look is the base design in `src/app/globals.css` and runs with
  `npm run ui:classic` (port 3004). See `docs/design-looks.md`.
- **Style only with tokens and utilities** (`bg-paper`, `text-forest`, `bg-farm`, `text-ink-muted`, `border-line`,
  `rounded-card`, `rounded-btn`, `shadow-card`, `font-display`, spacing `s8 s13 s21 s34 s55 s89 s144`, type
  `text-h1/h2/h3/body/display`). Then a new page looks right in both Meadow and classic automatically.
  No hard-coded hex colours or font families in components.
- If Meadow needs a page-specific tweak, add it to `meadow.css` scoped as `html[data-ui="meadow"] #your-section …`.
- Token meanings: `paper`/`paper-deep`/`card` light surfaces · `forest` dark bands, footer, headings on light ·
  `farm` primary actions · `gold` small highlights (as text only on dark bands) · `ink` body · `ink-muted`
  secondary text · `line` borders. Contrast: body text ≥ 4.5:1 — check new pairings.
- `docs/DESIGN_GUIDELINES.md` is the original brand bible (φ type scale and spacing, voice, component rules).
  Its colour values describe the classic look; Meadow's are in `meadow.css`. Its scale, spacing and voice still apply.

## 6. Components to reuse

`PageHero` (`src/components/sections/PageHero.tsx`) — the inner-page hero: photo, two-line title that drifts as you
scroll away, one line, one CTA, glass jump pills (`image`, `alt`, `imagePosition`, `lines`, `lead`, `cta`, `jumps`).

From `src/components/ui.tsx`:
- `container` — page-width wrapper class. `screen` — one-screen centred section (`data-snap` pages).
- `SectionHeader({ title, lead?, tone?: "light" | "dark", className?, titleClassName?, children? })` —
  short rule → H2 (SplitText) → lead (ScrollReveal). Use for every section heading.
- `buttonClass(variant, extra?)` — variants `primary`, `secondary`, `gold` (light fill on dark), `ghost-light`.

From `src/components/bits/` (React Bits, rebuilt in the brand system):
- `SplitText` (`text`, `as`, `trigger: "view" | "load" | "intro"`, `by: "words" | "lines"`) — all main headings.
- `ScrollReveal` (`children: string`, `as`) — body copy.
- `ScrollExpand` (`media`, `heading`, `overlay`, `shade`) — photo opening from a card to full bleed on arrival.
- `ScrollStack` (`header`, children) — one card per scroll, as on "A day on the farm".
- `FlowingMenu` (`items: { label, detail, href, chip }`, `label`) — ruled list of big links; hover slides in a forest
  band with a marquee of the detail (not used on a page right now).
- `TiltedCard` (`amplitude`, `scaleOnHover`) — a card that leans toward the pointer, no glare; flattens while a
  button is held, so a 360° view inside it can be dragged (the shared-spaces carousel on `/our-nests`).
- **Glass: glasscn's liquid-refract, everywhere** (`@glasscn` in `components.json`; originals in
  `docs/reference/react-bits-originals/glasscn-*.json`). Never hand-roll `backdrop-blur` + a tint. Put a `GlassFill`
  (`bits/LiquidGlass.tsx`: real edge refraction in Chromium, blur elsewhere, glasscn's 8% white fill and rim) inside a
  positioned, rounded element that has `glass(tone)` (`bits/glass.ts`: `isolate`, plus a text shadow for `"dark"`).
  Used on the navbar bubble (`LiquidGlass` directly), the tour card and its label bar, 360° viewer controls and
  captions, place pills, the tour dialog, cottage slides, hero jump pills, the gallery and map titles.
- `MagicBento` + `BentoTile` — a bento grid whose tile rims and insides catch the pointer's light (React Bits
  MagicBento, glow only; "Work the land" on `/the-living-farm`).
- `AnimatedBeam` (`containerRef`, `fromRef`, `toRef`, `duration`, `delay`) — a faint S-curve between two elements with
  a pulse of light travelling along it (Magic UI, MIT; SVG dash, no Motion). "From the soil to your plate".
- `Stepper` (`steps: { title, content }[]`, `step`, `onStepChange`, `canLeave`, `finish`) — a form in short steps
  with a bars indicator (React Bits Stepper): steps slide in, focus moves to the first field ("Get a group quote").
- Form fields (`src/components/forms.tsx`): `Field`, `CountField` (− n +), `Select`, and the `field`/`labelClass`
  styles, shared by every enquiry form. Forms open WhatsApp prefilled (`whatsappUrl` in `src/lib/site.ts`).
- `ExpandingPanels` (`panels: { id, title, icon, media, body }`, `label`) — side-by-side panels on large screens, the
  open one wide; pills plus one panel below `lg`. Only the open panel's media mounts ("Animals, carts and old games").
- `CardSwap` (`active`, `onActiveChange`, `label`) — manual drag deck. `CircularGallery` (`label`) — bending
  drag/arrow gallery. `CircularText` — rotating badge. `GradualBlur` — edge blur. `StaggeredMenu` — the nav menu.
- Icons: `src/components/icons.tsx` — 1.5px line icons only (`IconArrow`, `IconPhone`, `IconMail`, `IconPin`,
  `IconWhatsApp`, `Icon360`, `IconStar`, `IconBooking`, time-of-day icons, socials…). Add new ones in the same
  style; never emoji or icon fonts.

**Need a React Bits component the site doesn't have yet?**
1. Pull its source with the shadcn MCP (`.mcp.json`) or CLI: `npx shadcn@latest add @react-bits/<Name>-TS-TW`
   (registry in `components.json`). It lands in `docs/reference/react-bits-originals/incoming/` — reference only,
   outside the build. Originals of the components already used are in `docs/reference/react-bits-originals/`.
2. Rebuild it in `src/components/bits/` in the brand system: tokens only, Fraunces/DM Sans and φ type via the theme, 21px
   card / 13px button radii (tokens), calm easing, `prefers-reduced-motion` respected, keyboard and screen-reader
   accessible, no new dependencies unless essential. It must not look stock.
3. Review `git diff` after any `shadcn add` — it may touch `globals.css` or `package.json`; revert anything unwanted.

## 7. Content, images and copy

- **Copy:** from `docs/SITEMAP.md` and the wireframe's direction; voice is simple, everyday words people relate to (the client asked for this over poetic lines), and honest. Sentence case.
  Never lorem ipsum. Never invent reviews, prices, ratings, awards or facts — ask, or leave a clearly named TODO.
- **Photos:** the client's final photography is `public/images/client-photos/` (1600 px). Import it
  (`import x from "@public/images/client-photos/…jpg"`) and render with `next/image` (`fill` + `sizes` +
  `placeholder="blur"`, or width/height). Every image gets real alt text describing what's actually in it — look
  at the photo first. Not yet used on the homepage (good candidates for inner pages): `about-gate`, `group-event`,
  `stay-cottage-2`, `stay-cottage-3`, `stay-cottage-exterior`, `stay-cottage-sitout`, `stay-dorm-2`.
- **360° views beat photos.** Where the tour has a view of a thing, show the view; use a photo only where there's
  none (the client's rule). Originals of the client's newer photos are in `../separated images/` (by room, plus
  "Others"); resize to 1600 px before adding them to `public/images/client-photos/`.
- If a page needs a photo that doesn't exist, use an existing client photo or a neutral placeholder block and say
  which shot is missing — don't use stock imagery of other places presented as Abhishta.
- **Booking:** every booking CTA goes to `BOOKING_URL` (a prefilled WhatsApp chat; Stayflexi was dropped 2026-10-31); enquiries to `WHATSAPP_URL` (prefilled) or `CONTACT.email`.
  Forms have no backend yet: build them to open WhatsApp/email with the details prefilled, and say so in the UI
  only where a guest needs to know.
- **360° views — the rule.** Never embed the Turiya tour as an `<iframe>` (that brings back Turiya's START card,
  logo and menu, and traps the mouse wheel). Always use `TourViewer` (`src/components/TourViewer.tsx`): Turiya's own
  Pano2VR player drawing on our page **without Turiya's skin**, reading `public/tour/scenes.xml`. It turns slowly on
  its own (stops while dragged, resumes ~4 s later; never with reduced motion or offscreen), the wheel scrolls the
  page, and it takes optional `onPrev`/`onNext` arrows and a `caption`. To show a scene: add its Turiya id
  (customnodeid — list them from the tour's `pano.xml`) to `scripts/tour-scenes.mjs`, run `npm run tour:scenes`,
  then pass `{ node, pan, tilt }` (`Tour` from `src/lib/tour.ts`). `bleed` drops the rounded frame for a view that runs to
  the screen edge (Gau seva on `/the-living-farm`); the viewer resizes with its box. The generated XML must not start with a comment
  (the player reads the first node as the `<tour>`). Links into the full tour (new tab) use `tourUrl()`. Tiles are
  still served by Turiya, so if they change the tour, re-run the script.
- **One-screen sections that must shed extras** use the custom variants in `globals.css`: `short:` (phones/small
  tablets under 800px tall) and `squat:` (laptops/desktops under ~860px tall). Check 360×740 and 1280×720.
- **Embeds:** 360° views use `TourViewer` (rule above); maps use the Google Maps embed for `CONTACT.mapUrl`.

## 8. Mobile and accessibility

- Design phone layouts deliberately (not just stacked desktop): swipe rows (`snap-x`) for card sets, pills for
  tabs, ≥ 44 px tap targets (inline text links get an invisible hit area via `.link-gold` / `.tap`), content
  clear of the floating buttons at the bottom right (keep ~80 px bottom padding on phones).
- No horizontal page scroll at 360 px. Headings use `text-balance`, long copy ≤ ~70 characters per line.
- Every animation has a `prefers-reduced-motion` path; visible focus on everything interactive; semantic
  headings (one `h1` per page); labelled form fields with `autocomplete`, correct input types and `name`s.

## 9. Before you say it's done

1. `npx tsc --noEmit` and `npm run lint` — clean.
2. `npm run build` — succeeds.
3. Run it and look: screenshot every section at 1440×900 and on phones (390×844 and 360×740). Check Meadow (the
   classic look no longer needs checking), no broken images or failed requests, no console errors, navbar tone
   correct over every section, homepage anchor links land on the right sections.
4. Scroll it with a mouse wheel and on touch; if the page uses `data-snap`, every stop lands exactly on a section.
5. Report what you built, what's placeholder or TODO, and any photo/copy the client still needs to supply.

## Skills available in this setup

`frontend-design` (visual decisions), `react-best-practices` (React/Next code), `web-design-guidelines` (audit),
`webapp-testing` (screenshots), `impeccable` (polish/critique), `oil-ui` (design method; installed in `.agents/`,
run with `OIL_NO_UPDATE_CHECK=1` and don't use its remote image fetcher). Use them when they're installed.
