# Client changes, 31 Oct 2026: hand-over

Branch `client-changes-2026-10-31` is pushed to origin (kaamilstudiesig/Abhishta). Commit a942202 adds the client photos, resized, in public/images/client-photos/:
- group-*.jpg, from the client's Drive group-events folder: veranda gathering, lamp lighting, lawn audience 1–3, students with Kathakali dancers, adults in team T-shirts 1–2 (= corporate), school team
- nests-hero-cottage-row.jpg (DSC00654): the new Our Nests hero; crop the bottom paving

Verified: Google rating 4.8 from 395 reviews (351/28/3/0/13). The site wrongly says 5.0. Review texts weren't readable logged out, so use only the 4 real reviews already on the site; don't invent any.
Airbnb: https://www.airbnb.co.in/rooms/1797850774961029695 · New email: abhishtaagrifarmstay@gmail.com

To do (modular commits):
1. Remove the floating WhatsApp icon (keep the header Enquire)
2. Hand cursor (cursor-pointer) on the virtual tour card or buttons
3. Reviews: 4.8, star graphic, "395 Google reviews", the real reviews
4. Footer: TripAdvisor → Airbnb
5. hello@abhishtaagrifarmstay.com → abhishtaagrifarmstay@gmail.com everywhere
6. Farm to Table (living-farm/SoilToTable.tsx): relevant 360° views or photos
7. Remove Stayflexi; all booking CTAs go to WhatsApp (BOOKING_URL in src/lib/site.ts)
8. Groups page: people photos; the corporate image becomes group-corporate-team
9. Our Nests hero → nests-hero-cottage-row.jpg
10. Cottages: drop the washroom and sit-out slides; per-cottage tabs (Mayura, Mathura, Gopala, Govinda) like FamilyRooms
11. Remove the "Ask about Gopika/Nandagokula/Kaustubha" buttons
12. Comforts table: add a Food row, "All meals included"
13. "Ninety kilometres" → "90 km"
14. /virtualtour tabs: "Cottages" = Pathway_03 (#Pathway_03,0,-90,75,4); "Family rooms" = Pathway_03 (#Pathway_03,0,1.71,75,4); check the hash order in src/lib/tour.ts
15. New /gallery page; take the Gallery off /virtualtour; add it to NAV_LINKS (check the header fits at 1280 px)
16. Fonts: Fraunces headings, DM Sans body (src/app/meadow.css --font-display / --font-sans)

Then tsc, lint, build, fit checks; push the branch. Push to inter-rootlabs/2nd-Abhishta main: it holds an older unrelated snapshot (1b4aeff), so don't force. Use a merge commit (tree ours, parents second/main + ours) as a fast-forward. Report done/not-done per item.
