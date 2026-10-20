"use client";

import { useState } from "react";
import { IconArrow } from "@/components/icons";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";
import { CONTACT } from "@/lib/site";
import { FARM, NEARBY, compass, type PlaceKind } from "./atlas";

// The drawing: a 1000 × 700 sketch map with the farm in the middle. Each place sits in the direction the tour gives,
// further out the longer the drive (not to scale).
const W = 1000;
const H = 700;
const CX = 500;
const CY = 350;
const at = (bearing: number, r: number) => {
  const a = (bearing * Math.PI) / 180;
  return { x: CX + r * Math.sin(a), y: CY - r * Math.cos(a) };
};
const radius = (minutes: number) => 130 + (minutes - 27) * 7;

// labels go on the side away from the farm, except where neighbours or the edge would get in the way
const LABEL_SIDE: Record<string, "left" | "right" | "above" | "below"> = {
  "Yediyur Siddalingeshwara Temple": "above",
  "Markonahalli Dam": "right",
  "Panchamukhi Anjaneya Temple": "above",
};
const PLACES = NEARBY.map((p) => {
  const pos = at(p.bearing, radius(p.minutes));
  return { ...p, ...pos, side: LABEL_SIDE[p.name] ?? (pos.x < CX ? "left" : "right") };
});
// Kunigal town (about 13 km east-south-east) and the road on to Bangalore (about 90 km, east).
const KUNIGAL = at(122, 62);
const ROAD_END = at(100, 600);

const KIND: Record<PlaceKind, { name: string; dot: string }> = {
  temple: { name: "Temples", dot: "bg-gold ring-forest/50" },
  hill: { name: "Hills to walk", dot: "bg-farm ring-paper" },
  water: { name: "Dam", dot: "bg-water ring-paper" },
  craft: { name: "Handloom", dot: "bg-paper ring-forest" },
};

const pct = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });
const directions = (to: string) =>
  `https://www.google.com/maps/dir/?api=1&origin=${FARM.lat},${FARM.lng}&destination=${encodeURIComponent(`${to}, Karnataka`)}`;

/**
 * #around — an illustrated map, after tengilemalamala.com's accommodation map:
 * the farm in the middle of a hand-drawn landscape, the nearby places from the
 * 360° tour as clickable markers (placed by the tour's directions and drive
 * times, not to scale), and a side panel with a legend and the chosen place —
 * what it is, how far, and a link for directions. Phones: the map, then the card.
 */
export function Around() {
  const [sel, setSel] = useState<number | null>(null); // null: the farm itself
  const place = sel === null ? null : PLACES[sel];

  return (
    <section id="around" data-nav="light" data-snap="" className={`bg-paper-deep ${screen}`}>
      <div className={`${container} grid grid-cols-[minmax(0,1fr)] gap-s13 sm:gap-s21 md:grid-cols-[1.5fr_1fr] md:items-center md:gap-s21 lg:grid-cols-[1.75fr_1fr] lg:gap-s34`}>
        <SectionHeader
          title="Around the farm"
          lead="Hills, temples and a dam within an hour’s drive. Tap a place on the map."
          className="md:hidden"
          leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5] short:hidden"
        />

        {/* the map */}
        <div className="relative aspect-[10/7] w-full overflow-hidden rounded-card bg-paper ring-1 ring-line md:max-h-[calc(100svh-230px)]">
          <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" className="absolute inset-0 size-full">
            {/* fields and groves */}
            <g className="text-gold-soft" fill="currentColor">
              <path d="M40 60 L300 30 L330 210 L80 250 Z" />
              <path d="M620 40 L930 70 L900 250 L650 220 Z" />
              <path d="M60 420 L280 380 L320 640 L50 660 Z" />
              <path d="M660 430 L940 400 L960 650 L700 670 Z" />
              <path d="M360 520 L560 500 L590 680 L380 690 Z" />
            </g>
            <g className="text-line" fill="currentColor">
              <path d="M340 60 L560 40 L600 200 L380 230 Z" />
              <path d="M120 270 L330 250 L340 380 L110 400 Z" />
              <path d="M700 250 L950 270 L940 390 L690 400 Z" />
            </g>
            {/* field boundaries */}
            <g className="text-forest/15" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M0 260 C200 240 300 300 460 290 S800 240 1000 300" />
              <path d="M0 470 C220 440 360 500 520 480 S820 420 1000 470" />
              <path d="M330 0 C350 200 300 400 360 700" />
              <path d="M650 0 C620 220 700 420 640 700" />
            </g>
            {/* a stream, and the reservoir behind Markonahalli dam */}
            <path d="M-10 120 C180 160 260 90 420 150 S600 210 720 120 S900 60 1010 110" className="text-water" stroke="currentColor" strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.55" />
            <ellipse cx={PLACES[2].x - 20} cy={PLACES[2].y + 62} rx="70" ry="30" className="text-water" fill="currentColor" opacity="0.45" />
            {/* the road: farm → Kunigal → Bangalore */}
            <path
              d={`M${CX} ${CY} Q ${(CX + KUNIGAL.x) / 2} ${CY + 30} ${KUNIGAL.x} ${KUNIGAL.y} T ${ROAD_END.x} ${ROAD_END.y}`}
              className="text-forest/35"
              stroke="currentColor"
              strokeWidth="5"
              strokeDasharray="1 0"
              fill="none"
            />
            {/* tree clusters */}
            <g className="text-farm/25" fill="currentColor">
              {[
                [140, 170], [170, 190], [790, 150], [820, 170], [250, 560], [770, 560], [800, 590], [450, 610], [600, 90],
              ].map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="14" />
              ))}
            </g>
            {/* a quiet compass */}
            <g transform="translate(60 640)" className="text-forest/60">
              <path d="M0 -26 L7 0 L0 -6 L-7 0 Z" fill="currentColor" />
              <text y="22" textAnchor="middle" fontSize="20" fill="currentColor" className="font-sans font-medium">
                N
              </text>
            </g>
          </svg>

          {/* the farm */}
          <button
            type="button"
            onClick={() => setSel(null)}
            aria-pressed={sel === null}
            aria-label="Abhishta Agri Farm Stay"
            className="group absolute z-10 grid size-[44px] -translate-x-1/2 -translate-y-1/2 place-items-center"
            style={pct(CX, CY)}
          >
            <span className={`grid size-[26px] place-items-center rounded-full bg-forest ring-4 transition-transform duration-300 ${sel === null ? "scale-125 ring-gold" : "ring-paper group-hover:scale-110"}`}>
              <span className="size-[8px] rounded-full bg-gold" />
            </span>
            <span className="pointer-events-none absolute top-[40px] left-1/2 -translate-x-1/2 font-display text-[13px] whitespace-nowrap text-forest sm:text-[15px]">
              Abhishta
            </span>
          </button>

          {/* the places */}
          {PLACES.map((p, n) => {
            const on = sel === n;
            return (
              <button
                key={p.name}
                type="button"
                onClick={() => setSel(n)}
                aria-pressed={on}
                aria-label={`${p.name}, ${p.minutes} minutes`}
                className="group absolute z-10 grid size-[40px] -translate-x-1/2 -translate-y-1/2 place-items-center"
                style={pct(p.x, p.y)}
              >
                <span className={`block size-[14px] rounded-full ring-[3px] transition-transform duration-300 ${KIND[p.kind].dot} ${on ? "scale-150" : "group-hover:scale-125"}`} />
                <span
                  className={`pointer-events-none absolute text-[12px] leading-[1.2] font-medium whitespace-nowrap uppercase tracking-[0.04em] transition-colors duration-300 ${
                    p.side === "below" ? "top-[34px] left-1/2 -translate-x-1/2 text-center" : p.side === "above" ? "bottom-[34px] left-1/2 -translate-x-1/2 text-center" : p.side === "left" ? "top-1/2 right-[34px] -translate-y-1/2 text-right" : "top-1/2 left-[34px] -translate-y-1/2"
                  } ${on ? "text-forest" : "text-forest/70 group-hover:text-forest max-lg:hidden"}`}
                >
                  {p.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* the side panel: heading (large screens), legend and the chosen place */}
        <div className="min-w-0">
          <SectionHeader title="Around the farm" className="max-md:hidden" />
          <ul className="mt-s21 grid grid-cols-2 gap-x-s13 gap-y-[6px] rounded-card bg-paper p-s13 text-[13px] text-ink ring-1 ring-line max-md:hidden sm:p-s21 squat:hidden">
            <li className="flex items-center gap-s8">
              <span className="grid size-[16px] place-items-center rounded-full bg-forest ring-2 ring-gold">
                <span className="size-[5px] rounded-full bg-gold" />
              </span>
              The farm
            </li>
            {(Object.keys(KIND) as PlaceKind[]).map((k) => (
              <li key={k} className="flex items-center gap-s8">
                <span className={`size-[12px] rounded-full ring-[3px] ${KIND[k].dot}`} />
                {KIND[k].name}
              </li>
            ))}
            <li className="flex items-center gap-s8">
              <span className="h-[3px] w-[16px] rounded-full bg-forest/35" />
              Road to Bangalore
            </li>
          </ul>

          <div aria-live="polite" className="mt-s13 rounded-card bg-paper p-s21 ring-1 ring-line md:max-lg:p-s13 lg:p-s34 squat:p-s21">
            {place ? (
              <>
                <p className="text-[13px] font-medium tracking-[0.04em] text-farm uppercase">{place.label}</p>
                <h3 className="mt-[4px] font-display text-[clamp(22px,2vw,28px)] leading-[1.15] text-forest">{place.name}</h3>
                <p className="mt-s8 text-[15px] leading-[1.5] text-ink-muted">
                  About {place.minutes} minutes by car, to the {compass(place.bearing)} of the farm.
                </p>
                <a href={directions(place.name)} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "mt-s13 lg:mt-s21")}>
                  Directions from the farm
                  <IconArrow size={18} aria-hidden="true" />
                </a>
              </>
            ) : (
              <>
                <p className="text-[13px] font-medium tracking-[0.04em] text-farm uppercase">You stay here</p>
                <h3 className="mt-[4px] font-display text-[clamp(22px,2vw,28px)] leading-[1.15] text-forest">Abhishta Agri Farm Stay</h3>
                <p className="mt-s8 text-[15px] leading-[1.5] text-ink-muted">
                  Near Kunigal, about 90 km from Bangalore. Pick a place on the map to see how far it is.
                </p>
                <a href={CONTACT.mapUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary", "mt-s13 lg:mt-s21")}>
                  Open in Google Maps
                </a>
              </>
            )}
          </div>
          <p className="mt-s8 text-[12px] text-ink-muted max-md:hidden">Map not to scale; directions and drive times from our 360° tour.</p>
        </div>
      </div>
    </section>
  );
}
