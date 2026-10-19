# Abhishta Agri Farm Stay — website

Website for Abhishta Agri Farm Stay, a farm stay 90 km from Bangalore. Live preview: https://abhishta.vercel.app
Next.js (App Router) · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis.

Built so far: the homepage (`/`), Our nests (`/our-nests`) and The living farm (`/the-living-farm`). Group enquiries
and Field notes are still to come.

## Run it
```bash
npm install
npm run dev           # http://localhost:3000
npm run build         # production build
npm run lint
npm run tour:scenes   # regenerate public/tour/scenes.xml after adding a 360° scene
```

## Look
The site renders the **Meadow** design (`src/app/meadow.css`). Only Meadow is checked now. The original
"classic" look is still in the code (`npm run ui:classic`, port 3004), but it isn't maintained. See `docs/design-looks.md`.

## Pages
- **Homepage** — Hero · About · See the farm before you set out (360°) · Rest your head (stays, with an
  Explore button to Our nests) · A day on the farm · Bring your people (groups) · Reviews.
- **Our nests** — Explore / Our nests hero · Choose your nest · The cottages · Nandagokula (the group rooms) ·
  Nature's comforts · Beyond your door · Plan your stay.
- **The living farm** — The living / farm hero · Work the land (bento with the orchard in 360°) · Animals, carts and
  old games (expanding panels) · Gau seva (a 360° of the gaushaale to the screen edge, the six breeds) · From the soil
  to your plate (animated beams, five pillars) · Come for the day, or stay the night.

## 360° views
Views come from the farm's Turiya (Pano2VR) tour. They're drawn on our pages by Turiya's own player, without
Turiya's skin: no START card, logo or menu. `src/components/TourViewer.tsx` is the viewer. Each view turns slowly on its
own, stops while dragged, and starts only as it comes into view. Never embed the tour in an iframe.
To show a new scene, add its Turiya id to `scripts/tour-scenes.mjs` and run `npm run tour:scenes`.

## Photography
The client's final photos (web-ready, 1600 px) live in `public/images/client-photos/`. They're imported via the
`@public/*` alias, so next/image can size them and blur-load them. Unused shots there are kept for later pages.

## Project layout
```
src/
  app/                 layout, homepage, our-nests/, 404, globals.css (base tokens + classic look), meadow.css (the site's look)
  components/
    sections/          one file per homepage section, in page order:
                       Hero · About · Preview360 · Stays · DayOnFarm · Groups · Reviews · Footer
    sections/our-nests/  NestsHero · ChooseNest · Cottages · Nandagokula · Comforts · SharedSpaces · PlanStay,
                       plus rooms.ts (room facts and 360° views) and RoomParts
    sections/living-farm/  FarmHero · WorkTheLand · Animals · GauSeva · SoilToTable · PlanVisit, plus farm.ts
                       (breeds, 360° views, the day-outing schedule, WhatsApp enquiries)
    sections/PageHero  the inner-page hero both pages use
    bits/              React Bits components rebuilt in the brand system:
                       SplitText · ScrollReveal · StaggeredMenu · CircularText · GradualBlur · ScrollExpand ·
                       ScrollStack · CardSwap · CircularGallery · FlowingMenu · GlassSurface · TiltedCard ·
                       MagicBento · AnimatedBeam (Magic UI) · ExpandingPanels
    TourViewer         the 360° viewer (see above)
    SiteShell, Navbar, FloatingActions, IntroVeil, SmoothScroll, Logo, icons, ui (shared header/button/screen helpers)
  lib/
    site.ts            booking + WhatsApp URLs, contact details, socials, nav links
    tour.ts            360° scene type and links into the full tour
    intro.ts           intro-veil hand-off signal the hero animations wait for
  assets/brand/        logo.png
scripts/
  tour-scenes.mjs      builds public/tour/scenes.xml (only the scenes the site shows, hotspots stripped)
public/
  videos/              hero-background.mp4 (1080p, 75 s loop) · hero-mobile.mp4 (portrait, phones)
  images/              hero poster, Open Graph image
  images/client-photos/  the client's final photography (1600 px), imported via @public/*
  tour/scenes.xml      generated 360° config (don't edit by hand)
docs/
  BUILDING_PAGES.md    guide for building pages (auto-loaded via CLAUDE.md / AGENTS.md)
  DESIGN_GUIDELINES.md · SITEMAP.md · design-looks.md
  wireframes/          page wireframes with verified facts (our-nests.md, the-living-farm.md)
  reference/           Relume wireframe export (all pages) and the original React Bits sources
components.json        shadcn config with the @react-bits registry (pulls land in docs/reference/…/incoming)
.mcp.json              shadcn MCP server
```

## How it behaves
- **One screen per section:** on both built pages, every section is one screen tall, checked at 360×740 through 1440×900.
  Short phones and short laptops drop extras through the `short:` and `squat:` variants in `globals.css`.
- **Intro:** on the homepage, a field-white veil with the logo lifts away as the hero enters. It's time-based with
  failsafes and is skipped for reduced motion.
- **Scrolling, mouse/trackpad:** Lenis smooth scrolling. When a scroll comes to rest, it settles onto a section
  (short scroll → next section, long → nearest). The "day on the farm" stack moves exactly one card per gesture, and
  the footer scrolls freely. Page Down / Page Up / Space step page by page.
- **Scrolling, touch:** no Lenis. Native CSS mandatory snapping moves one page per swipe.
- **Heroes:** "Beloved / Countryside" (homepage) and "Explore / Our nests" drift toward each other as you scroll away.
  The Our nests hero's jump links are clear glass pills.
- **Menu:** gold and green layers sweep in, then the links rise one after another, each numbered 01–05.
- **Groups deck:** manual only. Drag or swipe the front card (left = next, right = previous), or use the pills / arrow keys.
- **Cottages:** a 360° slideshow of Mayura, Mathura and Mayura's washroom.
- **Beyond your door:** a carousel of tilted cards, each with a live 360° view of a shared space. Arrows and slide
  dots show where you are among the six.
- **Phones** load `hero-mobile.mp4` (9 MB) instead of the desktop film (40 MB).
- `prefers-reduced-motion` is respected throughout.

## Palette (Meadow)
Tokens in `src/app/meadow.css`: `farm` leaf `#2F6B3A` (actions) · `forest` deep green `#183520` (dark bands, footer) ·
`gold` new-shoot lime `#C3D68A` (highlights on dark) · `paper` cool white `#F6F8F2` · `paper-deep` `#EAEFE2` ·
`line` `#DBE3D1` · `ink-muted` `#56634F` (secondary text). Typeface: Bricolage Grotesque.

## Open items for the client
- Instagram, Facebook and TripAdvisor URLs in `src/lib/site.ts` are best guesses, not taken from the live site. Confirm them.
- The logo is a small raster (`src/assets/brand/`); swap in a vector when the redraw arrives.
- The 360° tour has only two of the four cottages (Mayura and Mathura). Gopala and Govardhana could be added if
  Turiya shoots them.
- Which cottage photos show Mayura and which show Mathura is a best guess (from the paintings in them). Confirm with the client.
- Two homepage photo slots may want a different shot: School agri-tours shows the elephant statue (not a school
  group), and the Dusk card (`day-dusk.jpg`) is a daylight view of the same gazebo as Morning.
- The living farm needs photos of the animals, the vegetable rows, the bullock cart, the old games and food on the
  table; the orchard's fruits and seasons; and whether meat and eggs belong in "soil to table" (see
  `docs/wireframes/the-living-farm.md`).
- Pages still to build: `/group-enquiries`, `/field-notes`. They show the branded 404 for now.
  `docs/BUILDING_PAGES.md` is the guide.
- The full-length 1080p hero film is kept outside the repo (`../video-originals/`). The site uses a 75 s web loop.
