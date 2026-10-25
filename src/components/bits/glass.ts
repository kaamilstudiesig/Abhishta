/**
 * Brand glass — glasscn's "liquid-refract" variant
 * (docs/reference/react-bits-originals/glasscn-*.json) everywhere. The glass
 * itself is a `GlassFill` (LiquidGlass: real edge refraction in Chromium, a
 * light blur elsewhere, an 8% white fill and a bright rim) placed inside the
 * element; `glass(tone)` gives that element what it needs around it: its own
 * stacking context, and over dark backgrounds a soft text shadow so the words
 * read through clear glass. The element must be positioned (relative/absolute)
 * and carry its own shape (rounded-full, rounded-card…).
 *
 *   <button className={`relative rounded-full px-s13 ${glass("dark")}`}>
 *     <GlassFill />
 *     Label
 *   </button>
 */
export type GlassTone = "light" | "dark";

export function glass(tone: GlassTone = "light") {
  return tone === "dark" ? "isolate [text-shadow:0_1px_3px_rgb(0_0_0/0.55)]" : "isolate";
}
