"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Image from "next/image";
import cottages from "@public/images/client-photos/gallery-cottages-path.jpg";
import { IconArrow, IconDam, IconHill, IconLeaf, IconLoom, IconTemple } from "@/components/icons";
import { buttonClass } from "@/components/ui";
import { CONTACT } from "@/lib/site";
import { FARM, NEARBY, compass, type PlaceKind } from "./atlas";

/*
 * The drawing: a 1400 × 900 illustrated map with the farm a little left of centre (the panel sits on the right).
 * Places sit in the direction the 360° tour gives (north = 0, bearing = −pan), further out the longer the drive —
 * not to scale. Real features drawn around them: the Shimsha river and the Markonahalli reservoir on it (south of
 * the farm), and the NH75 through Kunigal (Bangalore to the east, Hassan to the west).
 */
const W = 1400;
const H = 900;
const CX = 560;
const CY = 450;
const at = (bearing: number, r: number) => {
  const a = (bearing * Math.PI) / 180;
  return { x: CX + r * Math.sin(a), y: CY - r * Math.cos(a) };
};
const radius = (minutes: number) => 150 + (minutes - 27) * 9;

// labels sit on the side away from the farm, except where a neighbour or an edge is in the way
const LABEL: Record<string, "left" | "right" | "above" | "below"> = {
  "Yediyur Siddalingeshwara Temple": "left",
  "Markonahalli Dam": "below",
  "Sidlingeshwara Yoga Vana Betta": "right",
  "Rangaswamy Betta": "right",
  "Kalur weaving": "above",
  "Hadinkal Anjaneya Temple": "above",
  "Shanimahatma Temple": "above",
  "Panchamukhi Anjaneya Temple": "above",
};
const PLACES = NEARBY.map((p) => {
  const pos = at(p.bearing, radius(p.minutes));
  return { ...p, ...pos, side: LABEL[p.name] ?? (pos.x < CX ? "left" : "right") };
});
const DAM = PLACES.find((p) => p.kind === "water")!;
const KUNIGAL = at(122, 105);

const KIND: Record<PlaceKind, { name: string; icon: ComponentType<{ size?: number; className?: string }> }> = {
  temple: { name: "Temples", icon: IconTemple },
  hill: { name: "Hill walks", icon: IconHill },
  water: { name: "Dam", icon: IconDam },
  craft: { name: "Handloom", icon: IconLoom },
};

const pct = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });
const directions = (to: string) =>
  `https://www.google.com/maps/dir/?api=1&origin=${FARM.lat},${FARM.lng}&destination=${encodeURIComponent(`${to}, Karnataka`)}`;

// tree crowns scattered along the river and through the groves (x, y, size)
const TREES: [number, number, number][] = [
  [690, 70, 1], [665, 120, 0.8], [640, 175, 1.1], [612, 230, 0.9], [640, 330, 1], [585, 360, 0.8], [520, 520, 1], [600, 560, 0.9],
  [520, 700, 1], [585, 760, 1.1], [620, 830, 0.9], [300, 180, 1], [330, 210, 0.8], [270, 230, 0.9], [180, 470, 1], [210, 500, 0.8],
  [880, 640, 1], [910, 670, 0.9], [850, 700, 1.1], [980, 180, 1], [1010, 210, 0.8], [400, 830, 1], [430, 800, 0.9], [760, 360, 0.8],
  [110, 760, 1], [140, 790, 0.9], [740, 170, 0.8], [960, 780, 1], [330, 520, 0.8], [760, 760, 0.9],
];

function Paths() {
  return (
    <>
      <defs>
        {/* paper grain */}
        <filter id="map-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.2  0 0 0 0 0.25  0 0 0 0 0.15  0 0 0 0.09 0" />
        </filter>
        {/* the farm's own land: hatched, as the reference marks its own reserve */}
        <pattern id="map-hatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="12" height="12" className="fill-gold-soft" />
          <line x1="0" y1="0" x2="0" y2="12" className="stroke-farm/35" strokeWidth="3" />
        </pattern>
        <symbol id="map-tree" viewBox="-12 -12 24 24">
          <circle r="9" className="fill-farm/30" />
          <circle cx="-3" cy="-3" r="5" className="fill-farm/20" />
        </symbol>
        <path id="map-river" d="M735 -10 C700 110 620 160 630 270 S560 420 552 520 S548 600 556 636 C566 700 610 780 650 910" />
      </defs>

      {/* the land: a patchwork of fields */}
      <rect width={W} height={H} className="fill-paper-deep" />
      <g className="fill-gold-soft">
        <path d="M0 0 H420 L380 230 L0 260 Z" />
        <path d="M820 0 H1400 V250 L860 300 Z" />
        <path d="M0 560 L330 520 L360 900 H0 Z" />
        <path d="M760 560 L1400 600 V900 H700 Z" />
      </g>
      <g className="fill-line/70">
        <path d="M420 0 H700 L640 200 L400 240 Z" />
        <path d="M0 260 L380 230 L330 520 L0 560 Z" />
        <path d="M860 300 L1400 250 V600 L800 560 Z" />
        <path d="M360 640 L520 620 L540 900 H380 Z" />
      </g>
      {/* field lines */}
      <g className="stroke-forest/10" strokeWidth="1.5" fill="none">
        <path d="M0 130 L400 110 M840 130 L1400 110 M0 410 L350 390 M870 430 L1400 420 M0 730 L350 700 M720 760 L1400 760" />
        <path d="M200 0 L180 560 M1100 0 L1120 900 M260 560 L240 900 M980 600 L1000 900" />
      </g>

      {/* hills: soft contour rings at the two hill walks */}
      {PLACES.filter((p) => p.kind === "hill").map((p) => (
        <g key={p.name} transform={`translate(${p.x} ${p.y})`} className="fill-none stroke-farm/25" strokeWidth="2">
          <ellipse rx="64" ry="40" />
          <ellipse rx="44" ry="27" />
          <ellipse rx="24" ry="15" className="fill-farm/10" />
        </g>
      ))}

      {/* the farm's land */}
      <path d={`M${CX - 70} ${CY - 46} L${CX + 62} ${CY - 58} L${CX + 76} ${CY + 40} L${CX - 52} ${CY + 58} Z`} fill="url(#map-hatch)" className="stroke-farm/50" strokeWidth="2" />

      {/* the Shimsha river and the Markonahalli reservoir behind the dam */}
      <use href="#map-river" className="fill-none stroke-water" strokeWidth="11" strokeLinecap="round" opacity="0.75" />
      <path d={`M${DAM.x - 46} ${DAM.y - 64} c 26 -24 74 -16 84 10 s -14 48 -38 54 s -64 -32 -46 -64 z`} className="fill-water/70" />

      {/* the NH75: Hassan to the west, Kunigal, Bangalore to the east */}
      <path d={`M-10 600 C 200 590 420 560 ${KUNIGAL.x} ${KUNIGAL.y} S 1100 520 1410 520`} className="fill-none stroke-paper" strokeWidth="9" />
      <path d={`M-10 600 C 200 590 420 560 ${KUNIGAL.x} ${KUNIGAL.y} S 1100 520 1410 520`} className="fill-none stroke-forest/45" strokeWidth="3" />
      {/* the lane from the farm down to the highway */}
      <path d={`M${CX + 20} ${CY + 40} C ${CX + 40} ${CY + 80} ${KUNIGAL.x - 40} ${KUNIGAL.y - 20} ${KUNIGAL.x} ${KUNIGAL.y}`} className="fill-none stroke-forest/30" strokeWidth="2" strokeDasharray="6 6" />

      {TREES.map(([x, y, s]) => (
        <use key={`${x}-${y}`} href="#map-tree" x={x - 12 * s} y={y - 12 * s} width={24 * s} height={24 * s} />
      ))}

      {/* names on the land */}
      <g className="fill-forest font-display" style={{ paintOrder: "stroke" }} stroke="var(--color-paper-deep)" strokeWidth="5" strokeLinejoin="round">
        <text fontSize="19" letterSpacing="3" opacity="0.7">
          <textPath href="#map-river" startOffset="9%">
            SHIMSHA RIVER
          </textPath>
        </text>
        <text x="980" y="508" fontSize="15" letterSpacing="2" textAnchor="end" opacity="0.75">
          NH75 · TO BANGALORE, 90 KM →
        </text>
        <text x="16" y="585" fontSize="15" letterSpacing="2" opacity="0.75">
          ← NH75 · TO HASSAN
        </text>
        <text x={W / 2 + 140} y="34" fontSize="15" letterSpacing="2" textAnchor="middle" opacity="0.6">
          TOWARDS TUMKUR ↑
        </text>
        <text x={W / 2 - 40} y={H - 18} fontSize="15" letterSpacing="2" textAnchor="middle" opacity="0.6">
          TOWARDS MANDYA ↓
        </text>
      </g>

      {/* compass */}
      <g transform="translate(90 200)" className="fill-forest">
        <circle r="30" className="fill-paper/80 stroke-forest/30" strokeWidth="1.5" />
        <path d="M0 -24 L7 0 L0 -5 L-7 0 Z" />
        <path d="M0 24 L7 0 L0 5 L-7 0 Z" className="fill-forest/30" />
        <text y="-34" textAnchor="middle" fontSize="16" className="font-display">
          N
        </text>
      </g>

      {/* grain over everything */}
      <rect width={W} height={H} filter="url(#map-grain)" />
    </>
  );
}

/**
 * #around — an illustrated map in the spirit of tengilemalamala.com's
 * accommodation map: the farm on its hatched land in the middle of a drawn
 * countryside (the Shimsha river and Markonahalli reservoir, the NH75
 * through Kunigal), nearby places as icon markers, and a panel with a legend
 * and the chosen place — what it is, how far, and directions from the farm.
 * Large screens: the map fills the section and the panel floats on the right.
 * Phones: the map scrolls sideways under a card.
 */
export function Around() {
  const [sel, setSel] = useState<number | null>(null); // null: the farm itself
  const place = sel === null ? null : PLACES[sel];
  const scrollRef = useRef<HTMLDivElement>(null);

  // phones: start the sideways-scrolling map with the farm in the middle
  useEffect(() => {
    const el = scrollRef.current;
    if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = (el.scrollWidth * CX) / W - el.clientWidth / 2;
  }, []);

  return (
    <section id="around" data-nav="light" data-snap="" className="relative isolate flex h-svh min-h-[600px] flex-col overflow-hidden bg-paper-deep lg:block">
      {/* the map: covers the section on large screens; scrolls sideways on phones and tablets */}
      <div ref={scrollRef} className="relative min-h-0 flex-1 overflow-x-auto overflow-y-hidden pt-[80px] [scrollbar-width:none] lg:absolute lg:inset-0 lg:overflow-hidden lg:pt-0 [&::-webkit-scrollbar]:hidden">
        <div className="relative h-full lg:absolute lg:top-1/2 lg:left-1/2 lg:h-auto lg:min-h-full lg:w-auto lg:min-w-full lg:-translate-x-1/2 lg:-translate-y-1/2" style={{ aspectRatio: `${W} / ${H}` }}>
          <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" className="absolute inset-0 size-full">
            <Paths />
          </svg>

          {/* the farm */}
          <button
            type="button"
            onClick={() => setSel(null)}
            aria-pressed={sel === null}
            aria-label="Abhishta Agri Farm Stay"
            className="group absolute z-10 grid size-[52px] -translate-x-1/2 -translate-y-1/2 place-items-center"
            style={pct(CX, CY)}
          >
            <span className={`grid size-[38px] place-items-center rounded-full bg-forest text-gold shadow-card ring-4 transition-transform duration-300 ${sel === null ? "scale-110 ring-gold" : "ring-paper group-hover:scale-105"}`}>
              <IconLeaf size={20} />
            </span>
            <span className="pointer-events-none absolute top-[50px] left-1/2 -translate-x-1/2 font-display text-[15px] tracking-[0.12em] whitespace-nowrap text-forest uppercase [text-shadow:0_0_4px_var(--color-paper-deep),0_0_8px_var(--color-paper-deep)] sm:text-[17px]">
              Abhishta
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
                className="group absolute z-10 grid size-[44px] -translate-x-1/2 -translate-y-1/2 place-items-center"
                style={pct(p.x, p.y)}
              >
                <span
                  className={`grid size-[32px] place-items-center rounded-full shadow-card ring-2 transition-[transform,background-color,color] duration-300 ${
                    on ? "scale-110 bg-forest text-gold ring-gold" : "bg-paper text-forest ring-forest/25 group-hover:scale-110"
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
        <div className="rounded-card bg-paper/85 px-s13 py-s8 shadow-card ring-1 ring-line backdrop-blur-[4px] lg:px-s21 lg:py-s13">
          <h2 className="font-display text-[clamp(20px,2.4vw,36px)] leading-[1.05] text-forest">Around the farm</h2>
          <p className="mt-[4px] text-[13px] text-ink-muted max-sm:hidden lg:text-[14px]">Hills, temples and a dam within an hour’s drive.</p>
        </div>
      </div>

      {/* the panel: legend and the chosen place */}
      <div className="relative z-20 shrink-0 px-s13 pt-s8 pb-[84px] sm:px-s34 lg:absolute lg:top-[90px] lg:right-s34 lg:bottom-s21 lg:flex lg:w-[min(380px,30vw)] lg:flex-col lg:justify-center lg:gap-s13 lg:p-0">
        <ul className="grid grid-cols-2 gap-x-s13 gap-y-s8 rounded-card bg-paper p-s21 text-[13px] text-ink shadow-card ring-1 ring-line max-lg:hidden squat:hidden">
          <li className="flex items-center gap-s8">
            <span className="h-[14px] w-[20px] rounded-[3px] bg-[repeating-linear-gradient(45deg,var(--color-gold-soft)_0_4px,color-mix(in_oklab,var(--color-farm)_35%,var(--color-gold-soft))_4px_6px)] ring-1 ring-farm/40" />
            The farm’s land
          </li>
          <li className="flex items-center gap-s8">
            <span className="h-[6px] w-[20px] rounded-full bg-water" />
            Shimsha river
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

        <div aria-live="polite" className="overflow-hidden rounded-card bg-paper shadow-card ring-1 ring-line">
          {/* a striped band, as on the reference card */}
          <div aria-hidden="true" className="h-[6px] bg-[repeating-linear-gradient(90deg,var(--color-forest)_0_28px,var(--color-gold)_28px_44px)]" />
          {place ? (
            <div aria-hidden="true" className="grid h-[86px] place-items-center bg-gold-soft text-forest max-lg:hidden lg:h-[clamp(90px,14svh,150px)]">
              {(() => {
                const Icon = KIND[place.kind].icon;
                return <Icon size={56} className="[stroke-width:1.1]" />;
              })()}
            </div>
          ) : (
            <div className="relative h-[86px] max-lg:hidden lg:h-[clamp(90px,18svh,190px)]">
              <Image src={cottages} alt="The cottages along a stone path at Abhishta" fill sizes="380px" placeholder="blur" className="object-cover" />
            </div>
          )}
          <div className="p-s21 squat:p-s13">
            <p className="text-[12px] font-semibold tracking-[0.08em] text-farm uppercase">{place ? place.label : "You stay here"}</p>
            <h3 className="mt-[2px] font-display text-[clamp(21px,1.9vw,27px)] leading-[1.15] text-forest">{place ? place.name : "Abhishta Agri Farm Stay"}</h3>
            <p className="mt-[6px] text-[14px] leading-[1.5] text-ink-muted sm:text-[15px]">
              {place
                ? `About ${place.minutes} minutes by car, to the ${compass(place.bearing)} of the farm.`
                : "Near Kunigal, about 90 km from Bangalore on the NH75. Tap a place on the map to see how far it is."}
            </p>
            <a
              href={place ? directions(place.name) : CONTACT.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass(place ? "primary" : "secondary", "mt-s13 lg:mt-s21 squat:mt-s13")}
            >
              {place ? "Directions from the farm" : "Open in Google Maps"}
              {place ? <IconArrow size={18} aria-hidden="true" /> : null}
            </a>
          </div>
        </div>
        <p className="mt-s8 text-[12px] text-ink-muted max-lg:hidden">Not to scale. Directions and drive times from our 360° tour.</p>
      </div>
    </section>
  );
}
