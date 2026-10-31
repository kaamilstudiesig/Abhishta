# DESIGN_GUIDELINES.md — Abhishta Agri Farm Stay
Feed this file to Claude Code with the wireframe and sitemap. It is the brand bible for the build.

## Brand
Modern rustic — premium but earthy. A farm stay 90 km from Bangalore. Voice: poetic, honest, simple ("quiet", "honest", "simple", harvest-to-plate).

## Colour tokens (use exactly these)
```css
--paper: #FAF6EF;      /* page background */
--paper-deep: #F3EBDC; /* alt section bands */
--card: #FFFDF8;       /* cards on paper */
--ink: #1E1B14;        /* body text */
--ink-muted: #6E6455;  /* secondary text */
--farm: #096139;       /* PRIMARY — CTAs, key accents */
--forest: #073B24;     /* dark green — footer, dark bands, text on gold */
--gold: #E9A321;       /* accent — eyebrows, highlights, hotspot pins */
--gold-soft: #F7E7C3;  /* tinted highlight bgs */
--clay: #B4562F;       /* earth accent, sparing */
--line: #E7DCC8;       /* borders, dividers */
```
Pairing rules: white text on `farm`/`forest` only. `forest` text on `gold` (never white on gold — fails contrast). Body text only in `ink`/`ink-muted`.

## Typography — golden-ratio scale (φ = 1.618, base 17px)
- Headings: **Fraunces** (Google Fonts, 400–600 + italic for pull-quotes)
- Body/UI: **DM Sans** (400/500/700)
- Scale: Display 72 / H1 45 / H2 28 / H3 22 / Body 17 / Small 11 — major steps ×φ from body (17→28→45→72); H3 22 is the geometric mean of 28 and 17; Small 11 is 17÷φ
- Line-height: body 1.618 (the ratio itself); headlines 1.05–1.15
- Eyebrow: 13px (21÷φ), 700, uppercase, +0.18em tracking, `gold`
- No script fonts in UI.

## Shape & space — φ spacing scale: 8 · 13 · 21 · 34 · 55 · 89 · 144
- Radius: buttons 13px · inputs 13px · cards 21px · chips full pill
- Section padding: 89px desktop / 55px mobile. Alternate `paper` → `paper-deep` → `forest` bands.
- Gaps: 13 tight · 21 default · 34 loose. Card inner padding 34.
- Asymmetric splits at 61.8 / 38.2 (About section, nests feature rows).
- Colour usage: `paper` 61.8% · deep tones (`forest`+`ink`) 23.6% · `farm` 9.0% · `gold` 3.5% · `clay` 1.4% — each step ÷φ. Guidance, not law.
- Shadows: card `0 10px 30px rgba(30,27,20,.08)` · floating `0 20px 50px rgba(30,27,20,.12)`

## Components
- Primary button: `farm` fill, white text, 14px radius. Secondary: 1.5px `forest` outline. Gold button: `gold` fill + `forest` text.
- Links: 2px `gold` underline animating 45%→100% on hover.
- Cards: `card` bg, 20px radius, 16:10 image, eyebrow + Fraunces H4 + body + gold-underline link.
- Section headers: `gold` eyebrow → Fraunces H2 → short lead.
- Dark bands (`forest`): `paper` text, `gold` eyebrows — use for 360° Atlas, testimonials, footer.
- Icons: single custom 1.5px line-icon set in `farm`. Never emoji as icons.
- Forms: floating labels, 12px radius, 1px `line` border, `farm` focus ring.

## Motion
- Lenis smooth scroll. GSAP ScrollTrigger parallax, wired to Lenis.
- Footer reveal: footer `position: sticky; bottom: 0`, content above at higher z-index with solid bg.
- Headline reveals per section; `prefers-reduced-motion` respected everywhere.

## Booking
- All booking CTAs (docked availability bar, sticky booking button, section CTAs) → `https://bookingengine.stayflexi.com/?hotel_id=32336`
- Floating WhatsApp button, always on screen → `https://wa.me/919945794925?text=<prefilled enquiry>`
- Fallback: `mailto:hello@abhishtaagrifarmstay.com`
- Availability bar fields: Stay/Outing Type, Name, Phone (+91), Check-In, Check-Out dates

## Constants
- Phone: +91 9945 7949 25 · Landline: +91 9379 1963 00
- Email: hello@abhishtaagrifarmstay.com
- Address: Jiddigere Village, Yediyuru Hobli, Kunigal Taluk, Tumkur, Karnataka 572134
- 360° tours: https://www.turiya.co/360/Abhishta/ (embed canvases)
- Socials: Instagram, Facebook, YouTube, WhatsApp, Airbnb (TripAdvisor until 2026-10-31)

## Don'ts
- No white text on gold. No Poiret One / Poppins (old brand). No purple/blue gradients, no generic AI-look heroes. No emoji iconography. No lorem ipsum — use the wireframe copy direction.
