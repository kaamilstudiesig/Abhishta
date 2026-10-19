# Design looks

The site renders **Meadow**, chosen from a round of UI experiments: leaf greens on a cool white,
Bricolage Grotesque throughout, soft 28px cards and pill buttons, and a bold flush-left hero.
Its tokens and scoped rules live in `src/app/meadow.css` and apply via `<html data-ui="meadow">`.

The original **classic** look (olive and brass, Fraunces + DM Sans) is the base design in
`src/app/globals.css`, kept in case it's wanted later:

| Command | Port | Look |
| --- | --- | --- |
| `npm run dev` | 3000 | Meadow |
| `npm run ui:classic` | 3004 | classic |

`ui:classic:build` / `ui:classic:start` give a production build of the classic look; it builds into
`.next-classic` so it can run alongside the main site. Both looks share every component, copy and behaviour.
The other experiments (Clay, Dusk) were removed; they're in git history (commit `4f1155a`).
