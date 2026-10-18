# Abhishta Agri Farm Stay — website

Homepage for Abhishta Agri Farm Stay, a farm stay 90 km from Bangalore.
Next.js (App Router) · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis.

## Run it
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## UI experiments (this branch)
Three alternative looks for the same page — `npm run ui:clay` (port 3001), `npm run ui:dusk` (3002),
`npm run ui:meadow` (3003), or `npm run ui:all`. See `docs/ui-experiments.md`.

## Project layout
```
src/
  app/                 layout (Fraunces + DM Sans), page, 404, globals.css (brand tokens in @theme)
  components/
    sections/          one file per homepage section, in page order:
                       Hero · About · Preview360 · Stays · DayOnFarm · Groups · Reviews · Footer
    bits/              React Bits components rebuilt in the brand system:
                       SplitText · ScrollReveal · StaggeredMenu · CircularText · GradualBlur ·
                       ScrollExpand · ScrollStack · CardSwap · CircularGallery
    Navbar, FloatingActions, IntroVeil, SmoothScroll, Logo, icons, ui (shared header/button helpers)
  lib/
    site.ts            booking + WhatsApp URLs, contact details, socials, nav links
    intro.ts           intro-veil hand-off signal the hero animations wait for
  assets/
    images/            photos used on the page (descriptive names; stock-* are Unsplash)
    brand/             logo.png (used), logo-original.png, logo-mark.png
public/
  videos/              hero-background.mp4 (1080p, 75 s loop) · hero-mobile.mp4 (portrait, phones)
  images/              hero posters, Open Graph image
docs/
  DESIGN_GUIDELINES.md · SITEMAP.md · BUILD_PROMPT.md · STARTER_PACK.md
  photo-library/       farm photos not used yet (for the inner pages)
  reference/           Relume wireframe export and the original React Bits sources (not built)
```

## How it behaves
- **Intro:** a field-white veil with the logo lifts away as the hero enters (time-based with failsafes; skipped for reduced motion).
- **Scrolling, mouse/trackpad:** Lenis smooth scrolling. When a scroll comes to rest it settles onto a section (short scroll → next section, long → nearest). The "day on the farm" stack moves exactly one card per gesture; the footer scrolls freely. Page Down / Page Up / Space step page by page.
- **Scrolling, touch:** no Lenis; native CSS mandatory snapping, one page per swipe. Every section is one screen tall on 360–430 px phones.
- **Hero:** "Beloved / Countryside" lines drift toward each other as you scroll away.
- **Groups deck:** manual only — drag or swipe the front card (left = next, right = previous), or use the pills / arrow keys.
- **Phones** load `hero-mobile.mp4` (9 MB) instead of the desktop film (40 MB).
- `prefers-reduced-motion` is respected throughout.

## Palette
Tokens in `src/app/globals.css`; names kept from the design guidelines, hues retuned after tengilemalamala.com:
`farm` olive `#556B2F` (actions) · `forest` deep grove `#2E3A17` (dark bands, footer) · `gold` brass `#C6A15B` (rules, stars; text only on dark) · `paper` field white `#FAF7F0` · `line` stone `#E8E2D4` · `sage` `#9A9A8A` (decoration only) · `ink-muted` deep sage `#6B6B5A` (secondary text).

## Open items for the client
- Instagram, Facebook and TripAdvisor URLs in `src/lib/site.ts` are best guesses — not on the live site. Confirm them.
- The logo is a small raster (`src/assets/brand/`); swap in a vector when the redraw arrives.
- Corporate offsites and destination events use Unsplash stock photos (`src/assets/images/stock-*`).
- Inner pages (`/our-nests`, `/the-living-farm`, `/group-enquiries`, `/field-notes`) aren't built yet; they show the branded 404.
- The full-length 1080p hero film is kept outside the repo (`../video-originals/`); the site uses a 75 s web loop.
