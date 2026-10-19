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

## Look
The site renders the **Meadow** design. The original look is kept: `npm run ui:classic` (port 3004).
See `docs/design-looks.md`.

## Photography
The client's final photos (web-ready, 1600 px) live in `public/images/client-photos/` and are imported
via the `@public/*` alias so next/image can size them and blur-load. Unused shots there are kept for later pages.

## Project layout
```
src/
  app/                 layout, page, 404, globals.css (base tokens + classic look), meadow.css (the site's look)
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
  assets/brand/        logo.png
public/
  videos/              hero-background.mp4 (1080p, 75 s loop) · hero-mobile.mp4 (portrait, phones)
  images/              hero poster, Open Graph image
  images/client-photos/  the client's final photography (1600 px), imported via @public/*
docs/
  DESIGN_GUIDELINES.md · SITEMAP.md · design-looks.md
```

## How it behaves
- **Intro:** a field-white veil with the logo lifts away as the hero enters (time-based with failsafes; skipped for reduced motion).
- **Scrolling, mouse/trackpad:** Lenis smooth scrolling. When a scroll comes to rest it settles onto a section (short scroll → next section, long → nearest). The "day on the farm" stack moves exactly one card per gesture; the footer scrolls freely. Page Down / Page Up / Space step page by page.
- **Scrolling, touch:** no Lenis; native CSS mandatory snapping, one page per swipe. Every section is one screen tall on 360–430 px phones.
- **Hero:** "Beloved / Countryside" lines drift toward each other as you scroll away.
- **Groups deck:** manual only — drag or swipe the front card (left = next, right = previous), or use the pills / arrow keys.
- **Phones** load `hero-mobile.mp4` (9 MB) instead of the desktop film (40 MB).
- `prefers-reduced-motion` is respected throughout.

## Palette (Meadow)
Tokens in `src/app/meadow.css`: `farm` leaf `#2F6B3A` (actions) · `forest` deep green `#183520` (dark bands, footer) ·
`gold` new-shoot lime `#C3D68A` (highlights on dark) · `paper` cool white `#F6F8F2` · `paper-deep` `#EAEFE2` ·
`line` `#DBE3D1` · `ink-muted` `#56634F` (secondary text). Typeface: Bricolage Grotesque.
The classic palette (olive, brass, field white; Fraunces + DM Sans) is in `src/app/globals.css`.

## Open items for the client
- Instagram, Facebook and TripAdvisor URLs in `src/lib/site.ts` are best guesses — not on the live site. Confirm them.
- The logo is a small raster (`src/assets/brand/`); swap in a vector when the redraw arrives.
- Two photo slots may want a different shot: School agri-tours shows the elephant statue (not a school group), and the Dusk card (`day-dusk.jpg`) is a daylight view of the same gazebo as Morning. Unused client photos in `public/images/client-photos/` are candidates.
- Inner pages (`/our-nests`, `/the-living-farm`, `/group-enquiries`, `/field-notes`) aren't built yet; they show the branded 404.
- The full-length 1080p hero film is kept outside the repo (`../video-originals/`); the site uses a 75 s web loop.
