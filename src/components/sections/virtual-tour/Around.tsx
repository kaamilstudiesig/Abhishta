"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Image, { type StaticImageData } from "next/image";
import cottages from "@public/images/client-photos/gallery-cottages-path.webp";
import {
  IconArrow,
  IconDam,
  IconHill,
  IconLoom,
  IconTemple,
} from "@/components/icons";
import { buttonClass } from "@/components/ui";
import { CONTACT } from "@/lib/site";
import { FARM, NEARBY, compass, type PlaceKind } from "./atlas";
import { glass } from "@/components/bits/glass";
import { GlassFill } from "@/components/bits/LiquidGlass";
import { NEARBY_PHOTOS } from "./nearby-photos";
import { PlaceArt } from "./PlaceArt";
import {
  CX,
  CY,
  H,
  HILLS,
  KUNIGAL_LAKE,
  LANE,
  MANGALA,
  MARKONAHALLI,
  NH75,
  PLACE_AT,
  SH33,
  SH84,
  SHIELDS,
  SHIMSHA,
  SHRAVANABELAGOLA_HILLS,
  TANKS,
  TOWNS,
  TO_SHRAVANABELAGOLA,
  UNITS_PER_KM,
  VILLAGES,
  W,
  bearingOf,
  project,
  smooth,
} from "./around-map";

/*
 * The drawing: a 1400 × 900 map with the farm left of centre (the panel sits on the right). Everything is drawn
 * from real positions (around-map.ts, read off Google Maps): the NH75 through Yediyur and Kunigal, the state roads,
 * the Markonahalli and Mangala reservoirs, Kunigal's lake, the hills. Directions are true; distances are to scale
 * near the farm and squeezed further out.
 */
// a place with no position on record falls back to its tour bearing and drive time
const fallback = (bearing: number, minutes: number) => {
  const a = (bearing * Math.PI) / 180;
  const r = 150 + (minutes - 27) * 9;
  return { x: CX + r * Math.sin(a), y: CY - r * Math.cos(a) };
};

// labels sit on the side away from the farm, except where a neighbour or an edge is in the way
// "below-right": under the pin on phones (where the right edge is close), beside it on large screens
type Side = "left" | "right" | "above" | "below" | "below-right";
const LABEL: Record<string, Side> = {
  "Rangaswamy Betta": "right",
  "Sidlingeshwara Yoga Vana Betta": "right",
  "Markonahalli Dam": "below",
  "Kalur weaving": "above",
  "Yediyur Siddalingeshwara Temple": "left",
  "Hadinkal Anjaneya Temple": "right",
  "Panchamukhi Anjaneya Temple": "above",
  "Adichunchanagiri Mutt": "above",
  "Shanimahatma Temple": "below",
  Shravanabelagola: "below",
};
const PLACES = NEARBY.map((p) => {
  const real = PLACE_AT[p.name];
  const pos = real ? project(real) : fallback(p.bearing, p.minutes);
  return {
    ...p,
    ...pos,
    // the card says which way it lies: from the real position when we have it
    bearing: real ? bearingOf(real) : p.bearing,
    side: LABEL[p.name] ?? (pos.x < CX ? "left" : "right"),
  };
});

const KIND: Record<
  PlaceKind,
  { name: string; icon: ComponentType<{ size?: number; className?: string }> }
> = {
  temple: { name: "Temples", icon: IconTemple },
  hill: { name: "Hill walks", icon: IconHill },
  water: { name: "Dam", icon: IconDam },
  craft: { name: "Handloom", icon: IconLoom },
};

const pct = (x: number, y: number) => ({
  left: `${(x / W) * 100}%`,
  top: `${(y / H) * 100}%`,
});
const directions = (to: string) =>
  `https://www.google.com/maps/dir/?api=1&origin=${FARM.lat},${FARM.lng}&destination=${encodeURIComponent(`${to}, Karnataka`)}`;

/** The farm's mark on the map: a palm, as in the logo. */
function PalmMark({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12.6 21c.5-3.9.3-8-1-11.6" />
      <path d="M11.6 9.4C9.8 7 6.9 6.4 4.3 7.5" />
      <path d="M11.6 9.4c1.8-2.6 4.9-3.2 7.5-2" />
      <path d="M11.6 9.4C10.9 6.4 8.6 4.4 6 4.3" />
      <path d="M11.6 9.4c1.2-2.9 3.8-4.5 6.5-4.2" />
      <path d="M11.6 9.4c-2.6-.4-4.9.9-6 3.3" />
      <path d="M11.6 9.4c2.6-.2 4.8 1.3 5.7 3.7" />
      <path d="M7.5 21h9" />
    </svg>
  );
}

const pt = (p: { x: number; y: number }) => `${Math.round(p.x * 10) / 10} ${Math.round(p.y * 10) / 10}`;
const nh75Ends = [project(NH75[0]), project(NH75[NH75.length - 1])];
// the NH75 carries on past both edges (to Hassan and to Bangalore)
const ROAD_NH75 = `M-20 ${Math.round(nh75Ends[0].y)} L${pt(nh75Ends[0])} ${smooth(NH75).slice(1).replace(/^[^C]*/, "")} L${W + 20} ${Math.round(nh75Ends[1].y - 140)}`;
const ROADS_STATE = [SH33, SH84, TO_SHRAVANABELAGOLA].map((r) => smooth(r));
const LANE_PATH = smooth(LANE);
const RIVER = smooth(SHIMSHA);
const WATER = [MARKONAHALLI, MANGALA, KUNIGAL_LAKE].map((w) => smooth(w, true));
const KM = UNITS_PER_KM;

function Paths() {
  return (
    <>
      <defs>
        {/* paper grain */}
        <filter id="map-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
          <feColorMatrix
            in="n"
            type="matrix"
            values="0 0 0 0 0.2  0 0 0 0 0.25  0 0 0 0 0.15  0 0 0 0.08 0"
          />
        </filter>
        {/* farmland: a quiet tile of field boundaries, as the countryside reads from above */}
        <pattern id="map-fields" width="220" height="220" patternUnits="userSpaceOnUse">
          <g className="fill-none stroke-forest/[0.07]" strokeWidth="1.2">
            <path d="M0 64 L96 52 L220 70 M0 150 L120 160 L220 142 M96 52 L120 160 L112 220 M120 0 L96 52 M180 0 L172 64 L190 146 L180 220" />
          </g>
          <path d="M96 52 L172 64 L190 146 L120 160 Z" className="fill-gold-soft/60" />
          <path d="M0 150 L120 160 L112 220 L0 220 Z" className="fill-gold-soft/35" />
        </pattern>
        {/* a town: a cluster of rooftops */}
        <symbol id="map-town" viewBox="-20 -14 40 28">
          <rect x="-18" y="-11" width="12" height="9" rx="2" />
          <rect x="-4" y="-13" width="9" height="11" rx="2" />
          <rect x="7" y="-9" width="11" height="8" rx="2" />
          <rect x="-13" y="1" width="10" height="10" rx="2" />
          <rect x="-1" y="1" width="13" height="8" rx="2" />
        </symbol>
        <path id="map-shimsha" d={RIVER} />
      </defs>

      {/* the land */}
      <rect width={W} height={H} className="fill-paper-deep" />
      <rect width={W} height={H} fill="url(#map-fields)" />

      {/* hills and ridges, from the satellite view */}
      <g>
        {HILLS.map((h) => {
          const c = project(h.at);
          return (
            <g key={pt(c)} transform={`translate(${pt(c)}) rotate(${h.rot})`} className="stroke-farm/25" strokeWidth="1.3">
              <ellipse rx={h.rx * KM} ry={h.ry * KM} className="fill-sage/10" />
              <ellipse rx={h.rx * KM * 0.7} ry={h.ry * KM * 0.66} className="fill-sage/10" />
              <ellipse rx={h.rx * KM * 0.4} ry={h.ry * KM * 0.36} className="fill-farm/10" />
            </g>
          );
        })}
        {SHRAVANABELAGOLA_HILLS.map((h) => {
          const c = project(h);
          return (
            <g key={pt(c)} transform={`translate(${pt(c)})`} className="stroke-farm/25" strokeWidth="1.3">
              <ellipse rx="22" ry="15" className="fill-sage/10" />
              <ellipse rx="11" ry="7" className="fill-farm/10" />
            </g>
          );
        })}
      </g>

      {/* water: the Shimsha below the dam, the Markonahalli and Mangala reservoirs, Kunigal's lake, village tanks */}
      <use href="#map-shimsha" className="fill-none stroke-water/80" strokeWidth="5" strokeLinecap="round" />
      <g className="fill-water/75 stroke-water" strokeWidth="1.5" strokeLinejoin="round">
        {WATER.map((d) => (
          <path key={d.slice(0, 24)} d={d} />
        ))}
        {TANKS.map((t) => {
          const c = project(t.at);
          return (
            <ellipse
              key={pt(c)}
              transform={`translate(${pt(c)}) rotate(${t.rot})`}
              rx={t.w * KM}
              ry={t.h * KM}
            />
          );
        })}
      </g>

      {/* roads: state highways, then the NH75 over them, then the lane to the farm */}
      <g className="fill-none" strokeLinecap="round" strokeLinejoin="round">
        {ROADS_STATE.map((d) => (
          <g key={d.slice(0, 24)}>
            <path d={d} className="stroke-paper" strokeWidth="7" />
            <path d={d} className="stroke-forest/30" strokeWidth="2.5" />
          </g>
        ))}
        <path d={ROAD_NH75} className="stroke-paper" strokeWidth="11" />
        <path d={ROAD_NH75} className="stroke-forest/50" strokeWidth="4" />
        <path d={LANE_PATH} className="stroke-farm/70" strokeWidth="2.5" strokeDasharray="6 5" />
      </g>

      {/* road numbers */}
      {SHIELDS.map((s) => {
        const c = project(s.at);
        return (
          <g key={`${s.label}-${pt(c)}`} transform={`translate(${pt(c)})`}>
            <rect x="-15" y="-10" width="30" height="20" rx="5" className="fill-paper stroke-forest/40" strokeWidth="1.5" />
            <text y="5" textAnchor="middle" fontSize="13" fontWeight="600" className="fill-forest/80">
              {s.label}
            </text>
          </g>
        );
      })}

      {/* towns */}
      <g
        className="fill-forest font-display"
        style={{ paintOrder: "stroke" }}
        stroke="var(--color-paper-deep)"
        strokeWidth="4"
        strokeLinejoin="round"
      >
        {TOWNS.map((t) => {
          const c = project(t.at);
          const big = t.size === "town";
          return (
            <g key={t.name}>
              <use
                href="#map-town"
                x={c.x - (big ? 22 : 13)}
                y={c.y - (big ? 15 : 9)}
                width={big ? 44 : 26}
                height={big ? 30 : 18}
                className="fill-forest/30"
                stroke="none"
              />
              <text
                x={c.x}
                y={c.y + (big ? 34 : 24)}
                textAnchor="middle"
                fontSize={big ? 18 : 14}
                letterSpacing={big ? 3 : 2}
                opacity={big ? 0.85 : 0.7}
              >
                {t.name.toUpperCase()}
              </text>
            </g>
          );
        })}

        {VILLAGES.map((v) => {
          const c = project(v.at);
          return (
            <g key={v.name} opacity="0.65">
              <circle cx={c.x} cy={c.y} r="3.5" stroke="none" className="fill-forest/60" />
              <text x={c.x + 8} y={c.y + 4} fontSize="12" letterSpacing="1">
                {v.name}
              </text>
            </g>
          );
        })}

        {/* where the big roads go */}
        <text x="985" y="368" fontSize="15" letterSpacing="2" textAnchor="end" opacity="0.75">
          NH75 · TO BANGALORE, 90 KM ↗
        </text>
        <text x="16" y="526" fontSize="15" letterSpacing="2" opacity="0.75">
          ← HASSAN
        </text>
        <text x="772" y="132" fontSize="15" letterSpacing="2" opacity="0.6">
          TO TUMKUR ↑
        </text>
        <text x={CX + 40} y={H - 18} fontSize="15" letterSpacing="2" textAnchor="middle" opacity="0.6">
          TOWARDS MANDYA ↓
        </text>
      </g>

      {/* compass and scale */}
      <g transform="translate(90 200)" className="fill-forest">
        <circle r="30" className="fill-paper/80 stroke-forest/30" strokeWidth="1.5" />
        <path d="M0 -24 L7 0 L0 -5 L-7 0 Z" />
        <path d="M0 24 L7 0 L0 5 L-7 0 Z" className="fill-forest/30" />
        <text y="-36" textAnchor="middle" fontSize="16" className="font-display">
          N
        </text>
        <g transform="translate(-30 62)">
          <path d={`M0 0 V6 H${5 * KM} V0`} className="fill-none stroke-forest/60" strokeWidth="1.5" />
          <path d={`M${2.5 * KM} 3 V6`} className="stroke-forest/60" strokeWidth="1.5" />
          <text x="0" y="24" fontSize="13" className="fill-forest/75">
            5 km
          </text>
        </g>
      </g>

      {/* grain over everything */}
      <rect width={W} height={H} filter="url(#map-grain)" />
    </>
  );
}

/**
 * #around — a drawn map of the real countryside around the farm: Abhishta marked with its palm, nearby places as
 * icon markers, and a panel with a legend and the chosen place — what it is, how far, and directions from the farm.
 * Large screens: the map fills the section and the panel floats on the right.
 * Phones: the map scrolls sideways under a card.
 */
export function Around() {
  const [sel, setSel] = useState<number | null>(null); // null: the farm itself
  const place = sel === null ? null : PLACES[sel];
  const scrollRef = useRef<HTMLDivElement>(null);
  // the card's picture: the place's photo, the farm's own photo, or (no photo yet) a drawn scene
  const photo: {
    image: StaticImageData;
    alt: string;
    focus?: string;
    credit?: string;
    license?: string;
    source?: string;
  } | null = place
    ? (NEARBY_PHOTOS[place.name] ?? null)
    : { image: cottages, alt: "The cottages along a stone path at Abhishta" };

  // phones: start the sideways-scrolling map with the farm in the middle
  useEffect(() => {
    const el = scrollRef.current;
    if (el && el.scrollWidth > el.clientWidth)
      el.scrollLeft = (el.scrollWidth * CX) / W - el.clientWidth / 2;
  }, []);

  return (
    <section
      id="around"
      data-nav="light"
      data-snap=""
      className="relative isolate flex h-svh min-h-[600px] flex-col overflow-hidden bg-paper-deep lg:block"
    >
      {/* the map: covers the section on large screens; scrolls sideways on phones and tablets */}
      <div
        ref={scrollRef}
        className="relative min-h-0 flex-1 overflow-x-auto overflow-y-hidden pt-[80px] [scrollbar-width:none] lg:absolute lg:inset-0 lg:overflow-hidden lg:pt-0 [&::-webkit-scrollbar]:hidden"
      >
        <div
          className="relative h-full lg:absolute lg:top-1/2 lg:left-1/2 lg:h-auto lg:min-h-full lg:w-auto lg:min-w-full lg:-translate-x-1/2 lg:-translate-y-1/2"
          style={{ aspectRatio: `${W} / ${H}` }}
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            aria-hidden="true"
            className="absolute inset-0 size-full"
          >
            <Paths />
          </svg>

          {/* the farm: its own marker — a bigger palm pin with a soft pulse and its full name, always above the rest */}
          <button
            type="button"
            onClick={() => setSel(null)}
            aria-pressed={sel === null}
            aria-label="Abhishta Agri Farm Stay"
            className="group absolute z-30 grid size-[60px] scroll-m-0 -translate-x-1/2 -translate-y-1/2 place-items-center"
            style={pct(CX, CY)}
          >
            <span
              aria-hidden="true"
              className="absolute size-[46px] rounded-full bg-farm/30 motion-safe:animate-[around-pulse_2.8s_ease-out_infinite]"
            />
            <span
              className={`relative grid size-[46px] place-items-center rounded-full bg-forest text-gold shadow-card ring-[3px] transition-transform duration-300 ${sel === null ? "scale-110 ring-gold" : "ring-paper group-hover:scale-105"}`}
            >
              <PalmMark size={26} />
            </span>
            <span className="pointer-events-none absolute top-[58px] left-1/2 -translate-x-1/2 rounded-full bg-forest px-s13 py-[5px] text-[12px] leading-none font-semibold tracking-[0.08em] whitespace-nowrap text-paper uppercase shadow-card ring-1 ring-gold/60 sm:text-[13px]">
              Abhishta Agri Farm Stay
            </span>
          </button>

          {/* the places */}
          {PLACES.map((p, n) => {
            const on = sel === n;
            const Icon = KIND[p.kind].icon;
            const side =
              p.side === "above"
                ? "bottom-[40px] left-1/2 -translate-x-1/2 text-center"
                : p.side === "below"
                  ? "top-[40px] left-1/2 -translate-x-1/2 text-center"
                  : p.side === "below-right"
                    ? "top-[40px] left-1/2 -translate-x-1/2 text-center lg:top-1/2 lg:left-[42px] lg:translate-x-0 lg:-translate-y-1/2 lg:text-left"
                    : p.side === "left"
                      ? "top-1/2 right-[42px] -translate-y-1/2 text-right"
                      : "top-1/2 left-[42px] -translate-y-1/2";
            return (
              <button
                key={p.name}
                type="button"
                onClick={() => setSel(n)}
                aria-pressed={on}
                aria-label={`${p.name}, ${p.minutes} minutes`}
                className="group absolute z-10 grid size-[44px] scroll-m-0 -translate-x-1/2 -translate-y-1/2 place-items-center"
                style={pct(p.x, p.y)}
              >
                <span
                  className={`grid size-[32px] place-items-center rounded-full shadow-card ring-2 transition-[transform,background-color,color] duration-300 ${
                    on
                      ? "scale-110 bg-forest text-gold ring-gold"
                      : "bg-paper text-forest ring-forest/25 group-hover:scale-110"
                  }`}
                >
                  <Icon size={18} />
                </span>
                <span
                  className={`pointer-events-none absolute w-max max-w-[15em] text-[12px] leading-[1.15] font-semibold tracking-[0.06em] text-forest uppercase [text-shadow:0_0_3px_var(--color-paper-deep),0_0_6px_var(--color-paper-deep),0_0_10px_var(--color-paper-deep)] ${side} ${
                    on ? "" : "max-lg:hidden"
                  }`}
                >
                  {p.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* title chip, top left (large screens) */}
      <div className="pointer-events-none absolute top-[88px] left-s13 z-20 sm:left-s34 lg:top-auto lg:bottom-s34">
        <div
          className={`relative rounded-card px-s13 py-s8 lg:px-s21 lg:py-s13 ${glass()}`}
        >
          <GlassFill blur={4} fill="bg-white/40" />
          <h2 className="font-display text-[clamp(20px,2.4vw,36px)] leading-[1.05] text-forest">
            Around the farm
          </h2>
          <p className="mt-[4px] text-[13px] text-ink-muted max-sm:hidden lg:text-[14px]">
            Hills, temples and a dam within an hour’s drive.
          </p>
        </div>
      </div>

      {/* the panel: legend and the chosen place */}
      <div className="relative z-20 shrink-0 px-s13 pt-s8 pb-[84px] sm:px-s34 lg:absolute lg:top-[90px] lg:right-s34 lg:bottom-s21 lg:flex lg:w-[min(380px,30vw)] lg:flex-col lg:justify-center lg:gap-s13 lg:p-0">
        <ul className="grid grid-cols-2 gap-x-s13 gap-y-s8 rounded-card bg-paper p-s21 text-[13px] text-ink shadow-card ring-1 ring-line max-lg:hidden squat:hidden">
          <li className="flex items-center gap-s8">
            <span className="grid size-[22px] place-items-center rounded-full bg-forest text-gold ring-2 ring-gold">
              <PalmMark size={14} />
            </span>
            Abhishta
          </li>
          <li className="flex items-center gap-s8">
            <span className="h-[12px] w-[20px] rounded-[5px] bg-water/75 ring-1 ring-water" />
            River and lakes
          </li>
          {(Object.keys(KIND) as PlaceKind[]).map((k) => {
            const Icon = KIND[k].icon;
            return (
              <li key={k} className="flex items-center gap-s8">
                <span className="grid size-[22px] place-items-center rounded-full bg-paper text-forest ring-2 ring-forest/25">
                  <Icon size={13} />
                </span>
                {KIND[k].name}
              </li>
            );
          })}
          <li className="flex items-center gap-s8">
            <span className="h-[3px] w-[20px] rounded-full bg-forest/45" />
            NH75 highway
          </li>
          <li className="flex items-center gap-s8">
            <span className="h-[2px] w-[20px] border-t-2 border-dashed border-forest/40" />
            Lane to the farm
          </li>
        </ul>

        {/* the chosen place. Phones: a fixed-height card (picture beside the words) so the map above never
            resizes or slides as you tap around; large screens: the picture on top. */}
        <div
          aria-live="polite"
          className="overflow-hidden rounded-card bg-paper shadow-card ring-1 ring-line"
        >
          {/* a striped band, as on the reference card */}
          <div
            aria-hidden="true"
            className="h-[6px] bg-[repeating-linear-gradient(90deg,var(--color-forest)_0_28px,var(--color-gold)_28px_44px)]"
          />
          <div className="grid max-lg:h-[150px] max-lg:grid-cols-[108px_minmax(0,1fr)] max-lg:gap-s13 max-lg:p-s13 sm:max-lg:grid-cols-[168px_minmax(0,1fr)]">
            <div className="relative overflow-hidden bg-gold-soft max-lg:rounded-[12px] lg:h-[clamp(110px,20svh,200px)]">
              {photo ? (
                <Image
                  key={place?.name ?? "farm"}
                  src={photo.image}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 380px, 170px"
                  placeholder="blur"
                  style={{ objectPosition: photo.focus }}
                  className="animate-[fade-in_500ms_ease-out] object-cover motion-reduce:animate-none"
                />
              ) : place ? (
                <PlaceArt
                  key={place.name}
                  kind={place.kind}
                  className="absolute inset-0 size-full animate-[fade-in_500ms_ease-out] motion-reduce:animate-none"
                />
              ) : null}
              {photo?.source ? (
                <a
                  href={photo.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`absolute right-[6px] bottom-[6px] rounded-full px-s8 py-[2px] text-[11px] text-paper hover:underline max-lg:hidden ${glass("dark")}`}
                >
                  <GlassFill />
                  Photo: {photo.credit}, {photo.license}
                </a>
              ) : place && !photo ? (
                <span
                  className={`absolute right-[6px] bottom-[6px] rounded-full px-s8 py-[2px] text-[11px] text-paper max-lg:hidden ${glass("dark")} bg-forest/40`}
                >
                  <GlassFill />
                  Illustration
                </span>
              ) : null}
            </div>
            <div className="min-w-0 lg:p-s21 lg:pb-0 squat:p-s13 squat:pb-0">
              <p className="text-[12px] font-semibold tracking-[0.08em] text-farm uppercase">
                {place ? place.label : "You stay here"}
              </p>
              <h3 className="mt-[2px] font-display text-[clamp(19px,1.9vw,27px)] leading-[1.15] text-forest max-lg:line-clamp-2">
                {place ? place.name : "Abhishta Agri Farm Stay"}
              </h3>
              <p className="mt-[4px] text-[14px] leading-[1.4] text-ink-muted max-lg:line-clamp-2 sm:text-[15px] lg:mt-[6px] lg:leading-[1.5]">
                {place
                  ? `About ${place.minutes} minutes by car, to the ${compass(place.bearing)} of the farm.`
                  : "Near Kunigal, about 90 km from Bangalore on the NH75. Tap a place on the map to see how far it is."}
              </p>
              {/* phones: the credit sits under the words, where it can be read */}
              {place ? (
                photo?.source ? (
                  <a
                    href={photo.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-[2px] block truncate text-[11px] text-ink-muted underline-offset-2 hover:underline lg:hidden"
                  >
                    Photo: {photo.credit}, {photo.license}
                  </a>
                ) : (
                  <p className="mt-[2px] text-[11px] text-ink-muted lg:hidden">
                    Illustration
                  </p>
                )
              ) : null}
            </div>
          </div>
          <div className="px-s13 pb-s13 lg:px-s21 lg:pb-s21 squat:px-s13 squat:pb-s13">
            <a
              href={place ? directions(place.name) : CONTACT.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass(
                place ? "primary" : "secondary",
                "w-full justify-center lg:mt-s21 lg:w-auto squat:mt-s13",
              )}
            >
              {place ? "Directions from the farm" : "Open in Google Maps"}
              {place ? <IconArrow size={18} aria-hidden="true" /> : null}
            </a>
          </div>
        </div>
        <p className="mt-s8 text-[12px] text-ink-muted max-lg:hidden">
          True directions; to scale near the farm, the farthest places drawn closer in. Drive times from our 360° tour.
        </p>
      </div>
    </section>
  );
}
