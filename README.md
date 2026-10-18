# Abhishta site
Next.js (App Router) + TypeScript + Tailwind 4 homepage for Abhishta Agri Farm Stay, built from this starter pack.

## Run it
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Palette (minimalism pass, after tengilemalamala.com)
Tokens live in `src/app/globals.css` `@theme`; names kept from DESIGN_GUIDELINES.md, hues retuned:
`farm` olive `#556B2F` (actions) · `forest` deep grove `#2E3A17` (dark bands, footer, intro veil) · `gold` brass `#C6A15B` (rules, stars; text only on dark bands) · `paper` field white `#FAF7F0` · `line` stone `#E8E2D4` · `sage` `#9A9A8A` (icons/decoration only) · `ink-muted` deep sage `#6B6B5A` (secondary text — sage itself is 2.7:1 and fails for body text).

## Where things live
- `src/components/IntroVeil.tsx` + `src/lib/intro.ts` — page-load veil (field white, centred colour logo); hero animations wait for its hand-off
- `src/app/` — layout (Fraunces + DM Sans via `next/font`), page, 404, `globals.css` (brand tokens in `@theme`)
- `src/components/sections/` — Hero, About, Preview360, Stays, DayOnFarm, Groups, Reviews, Footer — each one screen high
- `src/components/bits/` — React Bits components rebuilt in the brand system: SplitText, ScrollReveal, StaggeredMenu, CircularText, GradualBlur, ScrollExpand (plays on arrival), ScrollStack (one card per scroll), CardSwap, CircularGallery
- `src/components/SmoothScroll.tsx` — Lenis smooth scrolling; on desktop one wheel gesture (or PgDn/PgUp, arrows, Space) glides to the next `[data-snap]` page; the footer scrolls freely. Touch and reduced motion use CSS proximity snapping
- `src/lib/site.ts` — booking/WhatsApp URLs, contact details, socials, nav, reel URLs
- `component-library/` — the original React Bits registry sources, kept for reference only (not imported)

## Open items for the client
- Instagram, Facebook and TripAdvisor URLs in `src/lib/site.ts` are best guesses — not listed on the live site. Confirm them.
- Logo uses `assets/logo-current.png` (margins trimmed to `assets/logo-trimmed.png`); in the navbar it keeps its colours, on a soft paper backing over dark bands; in the footer it is a white silhouette. Swap in a vector when the redraw arrives.
- Corporate offsites and destination events use Unsplash stock photos (`assets/images/stock/`).
- Inner pages (`/our-nests`, `/the-living-farm`, `/group-enquiries`, `/field-notes`) are not built yet; they show the branded 404.

---

# Starter pack
Everything Claude Code needs to build the homepage. Feed it in this order:
`SITEMAP.md` → `DESIGN_GUIDELINES.md` → `../files/Wireframe.pdf` → selected wishlist components.

## What's in this folder
- `DESIGN_GUIDELINES.md` — brand bible (tokens, φ type/space system, components, motion, booking, don'ts)
- `SITEMAP.md` — homepage section order + later pages (Kaamil's sitemap = source of truth)
- `wireframe-react/` — Kaamil's React (Relume) wireframe export, 5 pages — structure + section order reference
- `../files/Wireframe.pdf` — earlier wireframe PDF (superseded by SITEMAP.md + wireframe-react)
- `assets/` — `videos/hero-background.mp4` (the real hero video, 1080p), section images, `logo-current.png` (needs vector redraw)
- `.mcp.json` — shadcn MCP server for Claude Code (component registry access)
- `component-library/` (sibling folder) — stashed React Bits sources, organized by category

## Still to collect (from client / shoot)
- [x] **Pulled from the live site 2026-10-17** (placeholders — replace when the client supplies finals):
  - Hero background video: `public/videos/hero-background.mp4` (moved from `assets/videos/`) (720p web-optimized, 46 MB, full length — this is what the build uses). Original 1080p (104 MB) kept alongside as `hero-background-original-1080p.mp4`; re-pullable from https://www.abhishtaagrifarmstay.com/assets/videos/Abhishta-Agri-Farm-Stay-By-Chazing-Purple.mp4
  - Our Roots collage ×2 (`assets/images/section-2/image-1.jpg` = decorated elephant statue, `image-2.jpg` = aerial farmhouse)
  - Farm Experience slider ×7 (`assets/images/slider/`: Cow Cuddling, Feeding Farm Animals, Vegetable Harvesting, Agri Tour, Fruit Picking, Nature Walks, Bonfire Evenings — Traditional Games image missing on the live site)
  - Farm to Table slider ×7 (`assets/images/unlock-section/1.webp` … `7.webp`)
  - Watch Our Story thumbnail (`assets/images/youtube-video-thumb.jpg`, 1280×720) + YouTube embed: `https://www.youtube-nocookie.com/embed/4L4cuBmsb38?autoplay=1&rel=0`
  - Contact map embed + 360° tour link (https://www.turiya.co/360/Abhishta/) — URLs in DESIGN_GUIDELINES.md
- [ ] Instagram Reels to embed (reel video files live on Instagram — embed via URL, can't download)
- [ ] Logo vector redraw (palm + cow mark, Fraunces wordmark — see style guide)
- [ ] Final copy sign-off (wireframe copy is direction, not final)

## Start from zero — do these in order

1. **Install the Claude Code skills** — open your terminal, `cd` into the project, run `claude`, then inside Claude Code run these (each on its own line):
```
/plugin marketplace add anthropics/skills
/plugin install example-skills@anthropic-agent-skills
/plugin marketplace add vercel-labs/agent-skills
```
Then use "Browse and install plugins" to install the Vercel plugin (gives you `web-design-guidelines` + `react-best-practices`), and add + install `pbakaus/impeccable` the same way. Verify with `/skills` — you should see frontend-design, web-design-guidelines, react-best-practices, webapp-testing, impeccable. Restart Claude Code after installing (`/exit`, then `claude` again).

**Making sure Claude actually uses them:** installing isn't enough — Claude sometimes skips them. The BUILD_PROMPT already says "invoke these explicitly", but you can also just tell it in chat: "use the frontend-design skill for this page", "run a web-design-guidelines audit", "screenshot this with webapp-testing". Explicit beats automatic, every time.

2. **Scaffold the project**:
```bash
npx create-next-app@latest abhishta-site --typescript --tailwind --app --src-dir
cd abhishta-site
npx shadcn@latest init -d
npm i lenis gsap motion
```

3. **Copy the starter pack into the project root**: `DESIGN_GUIDELINES.md`, `SITEMAP.md`, `BUILD_PROMPT.md`, `.mcp.json`, `assets/`, `wireframe-react/`.

4. **Add the React Bits registry** to `components.json` so Claude can pull components itself via the shadcn MCP (per reactbits.dev/get-started/mcp):
```json
{ "registries": { "@react-bits": "https://reactbits.dev/r/{name}.json" } }
```

5. **Open the project in Claude Code** and paste the full contents of `BUILD_PROMPT.md` as your first message. The components will be customized into the brand system, not used stock.

6. **Review each section in the browser as it lands.** Before calling it done, have Claude run webapp-testing screenshots + a web-design-guidelines audit pass.

7. **Deploy**: push to GitHub, import the repo on Vercel. Done.
