import type { PlaceKind } from "./atlas";

/**
 * A drawn scene for a nearby place that has no free photo yet (see
 * nearby-photos.ts): a hill walk, a temple tower, or a handloom, in the map's
 * own palette, so every place card has a picture. It says it's an illustration
 * (alt text and a small tag); swap in a real photo when the client sends one.
 */
export function PlaceArt({ kind, className = "" }: { kind: PlaceKind; className?: string }) {
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" role="img" aria-label={LABEL[kind]} className={className}>
      <defs>
        <linearGradient id={`sky-${kind}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-gold-soft)" />
          <stop offset="1" stopColor="var(--color-paper)" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#sky-${kind})`} />
      {kind === "hill" ? <Hill /> : kind === "craft" ? <Loom /> : <Temple />}
    </svg>
  );
}

const LABEL: Record<PlaceKind, string> = {
  hill: "Illustration: a rocky hill with a small temple on top, above fields",
  temple: "Illustration: a temple tower among palms",
  craft: "Illustration: a handloom with silk threads and a woven border",
  water: "Illustration: a reservoir below low hills",
};

function Hill() {
  return (
    <>
      <circle cx="300" cy="78" r="30" fill="var(--color-gold)" opacity="0.55" />
      <path d="M0 170 C60 150 110 160 160 140 S260 120 400 150 V240 H0 Z" fill="var(--color-farm)" opacity="0.25" />
      <path d="M70 200 C110 120 150 70 190 62 C230 70 270 120 330 200 Z" fill="var(--color-forest)" opacity="0.85" />
      <path d="M150 112 C170 96 210 96 232 112" fill="none" stroke="var(--color-paper)" strokeOpacity="0.35" strokeWidth="3" />
      <ellipse cx="160" cy="150" rx="16" ry="9" fill="var(--color-paper)" opacity="0.18" />
      <ellipse cx="225" cy="135" rx="12" ry="7" fill="var(--color-paper)" opacity="0.18" />
      {/* the shrine on the top */}
      <path d="M182 62 h16 v-8 l-8 -10 l-8 10 z" fill="var(--color-paper)" />
      <path d="M190 44 v-8" stroke="var(--color-gold)" strokeWidth="2" />
      <path d="M0 205 C90 190 180 214 260 200 S360 192 400 200 V240 H0 Z" fill="var(--color-farm)" />
      <g fill="var(--color-forest)">
        <circle cx="40" cy="200" r="9" />
        <circle cx="58" cy="203" r="7" />
        <circle cx="350" cy="197" r="10" />
        <circle cx="370" cy="201" r="7" />
      </g>
    </>
  );
}

function Temple() {
  return (
    <>
      <circle cx="90" cy="70" r="26" fill="var(--color-gold)" opacity="0.5" />
      {/* the gopuram: stepped tiers narrowing upward */}
      <g fill="var(--color-forest)">
        <path d="M150 210 V150 H250 V210 Z" />
        <path d="M158 150 L164 128 H236 L242 150 Z" />
        <path d="M166 128 L172 108 H228 L234 128 Z" />
        <path d="M174 108 L180 90 H220 L226 108 Z" />
        <path d="M182 90 L188 74 H212 L218 90 Z" />
        <path d="M186 74 C190 58 210 58 214 74 Z" />
      </g>
      <g fill="var(--color-gold)">
        <circle cx="194" cy="56" r="3" />
        <circle cx="200" cy="54" r="3.5" />
        <circle cx="206" cy="56" r="3" />
      </g>
      <path d="M186 210 V176 C186 166 214 166 214 176 V210 Z" fill="var(--color-gold-soft)" />
      <g stroke="var(--color-paper)" strokeOpacity="0.3" strokeWidth="2">
        <path d="M164 139 H236 M172 118 H228 M180 99 H220" />
      </g>
      {/* palms either side */}
      <g stroke="var(--color-farm)" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M80 214 C84 180 86 160 92 136" />
        <path d="M330 214 C326 184 322 166 314 146" />
      </g>
      <g fill="var(--color-farm)">
        <path d="M92 136 c-22 -6 -34 4 -40 12 c14 -10 28 -8 40 -12 z M92 136 c18 -12 34 -8 42 0 c-14 -6 -28 -4 -42 0 z M92 136 c-6 -18 -2 -30 6 -36 c-4 12 -4 24 -6 36 z" />
        <path d="M314 146 c-20 -8 -34 0 -40 8 c14 -8 28 -6 40 -8 z M314 146 c18 -10 34 -6 42 2 c-14 -6 -28 -4 -42 -2 z M314 146 c-4 -18 2 -30 10 -34 c-6 10 -8 22 -10 34 z" />
      </g>
      <rect y="210" width="400" height="30" fill="var(--color-farm)" opacity="0.8" />
    </>
  );
}

function Loom() {
  const warp = Array.from({ length: 23 }, (_, i) => 80 + i * 11);
  return (
    <>
      {/* the frame */}
      <g fill="var(--color-forest)">
        <rect x="64" y="34" width="272" height="12" rx="4" />
        <rect x="64" y="196" width="272" height="12" rx="4" />
        <rect x="64" y="34" width="10" height="190" rx="3" />
        <rect x="326" y="34" width="10" height="190" rx="3" />
      </g>
      {/* warp threads */}
      <g stroke="var(--color-gold)" strokeWidth="2" opacity="0.8">
        {warp.map((x) => (
          <path key={x} d={`M${x} 46 V196`} />
        ))}
      </g>
      {/* the woven part: a silk saree border taking shape */}
      <rect x="74" y="140" width="252" height="56" fill="var(--color-farm)" />
      <rect x="74" y="148" width="252" height="8" fill="var(--color-gold)" />
      <g fill="var(--color-gold-soft)">
        {warp.slice(0, 22).map((x, i) => (i % 2 ? null : <path key={x} d={`M${x + 4} 172 l6 -8 l6 8 l-6 8 z`} />))}
      </g>
      <rect x="74" y="186" width="252" height="4" fill="var(--color-gold)" />
      {/* the shuttle */}
      <path d="M150 124 C170 114 230 114 250 124 C230 134 170 134 150 124 Z" fill="var(--color-forest)" />
      <path d="M180 124 H220" stroke="var(--color-gold)" strokeWidth="3" strokeLinecap="round" />
    </>
  );
}
