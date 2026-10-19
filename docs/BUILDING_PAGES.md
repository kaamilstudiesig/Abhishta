# Building a new page — guide for AI assistants

Read this before building any page of the Abhishta Agri Farm Stay site. The homepage (`src/app/page.tsx`) is
the reference implementation: match its structure, components and quality bar. When something here conflicts
with what you see in the code, the code is the truth — then update this guide.

## 1. What to build, and from what

Pages still to build (all currently fall through to the branded 404, `src/app/not-found.tsx`):

| Route | Sitemap section | Wireframe |
| --- | --- | --- |
| `/our-nests` | OUR NESTS | **`docs/wireframes/our-nests.md`** (supersedes the Relume export) |
| `/the-living-farm` | THE LIVING FARM | `docs/reference/wireframe-react/the-living-farm/` |
| `/group-enquiries` | GROUP ENQUIRIES | `docs/reference/wireframe-react/group-enquiries/` |
| `/field-notes` | FIELD NOTES & 360° ATLAS | `docs/reference/wireframe-react/field-notes-&-360°-atlas/` |

- **A page with an updated wireframe in `docs/wireframes/` uses that instead of the Relume export.**
- **`docs/SITEMAP.md` is the source of truth** for each page's sections, order and copy direction. Where the
  wireframe and the sitemap disagree, the sitemap wins.
- **The wireframe** (an unstyled Relume export) gives section structure and content inventory only. Read the page's
  `index.jsx` and every file in its `components/`, then rebuild each section from scratch in this site's system.
  Never copy its styling, placeholder images, Relume components or its Navbar/Footer.
- **The homepage already links to these anchors** — the target page must provide matching `id`s:
  `/our-nests#cottages`, `/our-nests#dormitories`, `/group-enquiries#corporate`, `#schools`, `#day-outings`, `#events`.
  Nav links (`NAV_LINKS` in `src/lib/site.ts`) use `/our-nests`, `/the-living-farm`, `/group-enquiries`, `/field-notes`.

## 2. Stack and project rules

- Next.js App Router (a newer version than most training data — read `node_modules/next/dist/docs/` before using
  an API you're unsure of; see `AGENTS.md`), TypeScript, Tailwind CSS 4 (tokens in `@theme`, no tailwind.config),
  GSAP + ScrollTrigger, Lenis.
- Each page is `src/app/<route>/page.tsx`; its sections go in `src/components/sections/<page>/` (one file per section).
- Shared constants (booking URL, WhatsApp, contact details, socials, nav) come from `src/lib/site.ts` — never hard-code them.
- Imports use `@/…` for `src/` and `@public/…` for `public/` (used for the client photos).
- Run `npx tsc --noEmit` and `npm run lint` clean. Don't commit unless asked.

## 3. Page chrome

The homepage composes its chrome inline in `src/app/page.tsx`: skip link, `Navbar`, `<main id="main">`, `Footer`,
the touch end-of-page snap marker, `FloatingActions`, wrapped in `SmoothScroll`; plus `IntroVeil` (homepage only).

- **When you build the first inner page**, extract that chrome (everything except `IntroVeil`) into one shared
  component, e.g. `src/components/SiteShell.tsx`, and use it from the homepage and every inner page, so nav,
  footer, floating booking/WhatsApp buttons and scrolling behave identically everywhere.
- Keep `<main id="main" className="relative z-10 bg-paper">` — the footer is `position: sticky; bottom: 0`
  underneath it and is revealed as the page scrolls away.
- **Navbar tone:** every full-width section declares `data-nav="light"` (light background) or `data-nav="dark"`
  (dark background or photo/video). The navbar reads whichever is under it; sections without it leave it guessing.
- Inner pages don't play the intro veil, so don't use `SplitText trigger="intro"` there — use `"view"` (default) or `"load"`.

## 4. Scrolling

- `SmoothScroll` gives Lenis smooth scrolling on mouse/trackpad (never on touch). Elements marked `data-snap` are
  "pages": when a scroll comes to rest, it settles onto one. Touch screens use native CSS mandatory snapping on
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
- `CardSwap` (`active`, `onActiveChange`, `label`) — manual drag deck. `CircularGallery` (`label`) — bending
  drag/arrow gallery. `CircularText` — rotating badge. `GradualBlur` — edge blur. `StaggeredMenu` — the nav menu.
- Icons: `src/components/icons.tsx` — 1.5px line icons only (`IconArrow`, `IconPhone`, `IconMail`, `IconPin`,
  `IconWhatsApp`, `Icon360`, `IconStar`, `IconBooking`, time-of-day icons, socials…). Add new ones in the same
  style; never emoji or icon fonts.

**Need a React Bits component the site doesn't have yet?**
1. Pull its source with the shadcn MCP (`.mcp.json`) or CLI: `npx shadcn@latest add @react-bits/<Name>-TS-TW`
   (registry in `components.json`). It lands in `docs/reference/react-bits-originals/incoming/` — reference only,
   outside the build. Originals of the components already used are in `docs/reference/react-bits-originals/`.
2. Rebuild it in `src/components/bits/` in the brand system: tokens only, Bricolage/φ type via the theme, 21px
   card / 13px button radii (tokens), calm easing, `prefers-reduced-motion` respected, keyboard and screen-reader
   accessible, no new dependencies unless essential. It must not look stock.
3. Review `git diff` after any `shadcn add` — it may touch `globals.css` or `package.json`; revert anything unwanted.

## 7. Content, images and copy

- **Copy:** from `docs/SITEMAP.md` and the wireframe's direction; voice is poetic, honest, simple. Sentence case.
  Never lorem ipsum. Never invent reviews, prices, ratings, awards or facts — ask, or leave a clearly named TODO.
- **Photos:** the client's final photography is `public/images/client-photos/` (1600 px). Import it
  (`import x from "@public/images/client-photos/…jpg"`) and render with `next/image` (`fill` + `sizes` +
  `placeholder="blur"`, or width/height). Every image gets real alt text describing what's actually in it — look
  at the photo first. Not yet used on the homepage (good candidates for inner pages): `about-gate`, `group-event`,
  `stay-cottage-2`, `stay-cottage-3`, `stay-cottage-exterior`, `stay-cottage-sitout`, `stay-dorm-2`.
- If a page needs a photo that doesn't exist, use an existing client photo or a neutral placeholder block and say
  which shot is missing — don't use stock imagery of other places presented as Abhishta.
- **Booking:** every booking CTA goes to `BOOKING_URL`; enquiries to `WHATSAPP_URL` (prefilled) or `CONTACT.email`.
  Forms have no backend yet: build them to open WhatsApp/email with the details prefilled, and say so in the UI
  only where a guest needs to know.
- **Embeds:** 360° tours use `TOUR_360_URL` behind a "start" cover (see `Preview360.tsx`) so scrolling never gets
  trapped in the viewer; maps use the Google Maps embed for `CONTACT.mapUrl`.

## 8. Mobile and accessibility

- Design phone layouts deliberately (not just stacked desktop): swipe rows (`snap-x`) for card sets, pills for
  tabs, ≥ 44 px tap targets (inline text links get an invisible hit area via `.link-gold` / `.tap`), content
  clear of the floating buttons at the bottom right (keep ~80 px bottom padding on phones).
- No horizontal page scroll at 360 px. Headings use `text-balance`, long copy ≤ ~70 characters per line.
- Every animation has a `prefers-reduced-motion` path; visible focus on everything interactive; semantic
  headings (one `h1` per page); labelled form fields with `autocomplete`, correct input types and `name`s.

## 9. Before you say it's done

1. `npx tsc --noEmit` and `npm run lint` — clean.
2. `npm run build` (Meadow) and `npm run ui:classic:build` — both succeed.
3. Run it and look: screenshot every section at 1440×900 and on phones (390×844 and 360×740). Check both looks,
   no broken images or failed requests, no console errors, navbar tone correct over every section, homepage
   anchor links land on the right sections.
4. Scroll it with a mouse wheel and on touch; if the page uses `data-snap`, every stop lands exactly on a section.
5. Report what you built, what's placeholder or TODO, and any photo/copy the client still needs to supply.

## Skills available in this setup

`frontend-design` (visual decisions), `react-best-practices` (React/Next code), `web-design-guidelines` (audit),
`webapp-testing` (screenshots), `impeccable` (polish/critique), `oil-ui` (design method; installed in `.agents/`,
run with `OIL_NO_UPDATE_CHECK=1` and don't use its remote image fetcher). Use them when they're installed.
