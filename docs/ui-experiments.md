# UI experiments (branch `ui-experiments`)

Same page, same elements, same copy and behaviour — three different looks, made with the oil-ui design method.
Each variant is a set of token overrides plus a few scoped rules in `src/app/variants.css`, switched by
`NEXT_PUBLIC_UI_VARIANT`. With no variant set, Meadow renders; `classic` renders the original look.

**Meadow was chosen** and is now the default: `npm run dev` / `build` / `start` render it.

| Command | Port | Variant |
| --- | --- | --- |
| `npm run dev` | 3000 | Meadow (default) |
| `npm run ui:classic` | 3004 | the original pre-Meadow look |
| `npm run ui:clay` | 3001 | Clay — terracotta almanac |
| `npm run ui:dusk` | 3002 | Dusk — lantern night |
| `npm run ui:meadow` | 3003 | Meadow — field notes |
| `npm run ui:all` | 3001–3003 | all three at once |

`ui:<name>:build` / `ui:<name>:start` give a production build of one variant. Each variant builds into its own
`.next-<name>` folder, so they can run side by side with the main site.

## Directions

Each starts from the farm itself (the category is an Indian countryside farm stay; visitors come to feel the
place and book), then pushes one axis further than the main design.

**Clay — terracotta almanac.** Kunigal's red earth. Parchment `#F6EFE6` pages, umber `#3A2419` bands, terracotta
`#A4472B` actions, turmeric `#D9A55C` highlights. Instrument Serif display with Instrument Sans text; tight
3–6px corners; the hero is centred and ceremonial, sentence case, second line in italic. Feels like a printed
almanac from the farm office.

**Dusk — lantern night.** The farm after sunset. Near-black olive `#12150D` pages, lamplit cream `#EFE7D5` type,
lantern amber `#D6A14E` for actions. Keeps Fraunces and DM Sans; the light sections are re-scoped to night, while
the four "day on the farm" cards keep their dawn-to-dusk colours so they read as lit windows. Feels like arriving
for the bonfire.

**Meadow — field notes.** Fresh and light. Cool white `#F6F8F2`, leaf green `#2F6B3A` actions, deep
green `#183520` bands, new-shoot lime `#C3D68A` on dark. Bricolage Grotesque throughout (bold, tightly tracked
display), soft 28px cards and pill buttons; a big sentence-case hero set flush left. Feels like a sunny morning
walk with a notebook.

## Limits
- Variants restyle; they don't restructure. Layout changes are limited to what CSS can do on the existing markup.
- The Dusk theme re-scopes tokens inside sections; any new section needs adding to its scope list.
- Contrast was checked for the main text/action pairs listed in `variants.css`; spot-check new combinations.
