# Starter pack (original setup notes — paths predate the reorganisation; see README for the current layout)
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
