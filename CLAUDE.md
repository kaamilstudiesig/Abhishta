# Abhishta Agri Farm Stay — site

@AGENTS.md

When asked to build or change a page, follow @docs/BUILDING_PAGES.md.

**360° tour rule:** never embed the Turiya tour in an iframe (it shows Turiya's START card and traps the wheel).
**Two exceptions (owner's choice, 2026-11-08):** the homepage tour pop-up (`src/components/TourDialog.tsx`) and the top of
/virtualtour (`src/components/sections/virtual-tour/FullTour.tsx`, so the tour lives on the site's own shareable address) embed the
full V7 tour (https://www.turiya.co/360/Abhishta/V7/) in an iframe, START screen included. Don't add iframes anywhere else.
Use `TourViewer` (`src/components/TourViewer.tsx`) with scenes from `npm run tour:scenes` — see "360° views — the
rule" in docs/BUILDING_PAGES.md.
