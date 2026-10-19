"use client";

import { Fragment, useEffect, useId, useRef, useState, type ReactNode } from "react";

/**
 * Brand GlassSurface — adapted from React Bits. A pane of glass over whatever
 * is behind it, kept clear (no frost, no tint): where the browser can
 * (Chromium), an SVG displacement map bends the backdrop at the rim with a
 * slight colour split; elsewhere it's the same clear pane without the bend,
 * just a bright rim. The shape is a rounded rectangle
 * sized by its content, so it works as a pill or a button face.
 */
type GlassSurfaceProps = {
  children: ReactNode;
  /** corner radius in px (the displacement map needs a number) */
  radius?: number;
  className?: string;
};

// React Bits' defaults, tuned down for small pills over a photograph.
const BORDER_WIDTH = 0.07;
const BRIGHTNESS = 50;
const OPACITY = 0.93;
const BLUR = 11;
const DISTORTION = -180;
const OFFSETS = { red: 0, green: 10, blue: 20 };
const CHANNELS = [
  { name: "red", matrix: "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" },
  { name: "green", matrix: "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" },
  { name: "blue", matrix: "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" },
] as const;

// Clear glass: no tint and no inner glow, only a crisp rim (brighter along the top edge, where light catches it).
const RIM = [
  "inset 0 0 0 1px rgb(255 255 255 / 0.4)",
  "inset 0 1px 1px 0 rgb(255 255 255 / 0.55)",
  "inset 0 -1px 1px 0 rgb(255 255 255 / 0.12)",
  "0 4px 14px rgb(0 0 0 / 0.12)",
].join(", ");

function displacementMap(width: number, height: number, radius: number, ids: { red: string; blue: string; soft: string }) {
  const edge = Math.min(width, height) * (BORDER_WIDTH * 0.5);
  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${ids.red}" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient>
      <linearGradient id="${ids.blue}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient>
      <filter id="${ids.soft}" filterUnits="userSpaceOnUse" x="0" y="0" width="${width}" height="${height}" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="${BLUR}"/></filter>
    </defs>
    <rect width="${width}" height="${height}" fill="black"/>
    <rect width="${width}" height="${height}" rx="${radius}" fill="url(#${ids.red})"/>
    <rect width="${width}" height="${height}" rx="${radius}" fill="url(#${ids.blue})" style="mix-blend-mode:difference"/>
    <rect x="${edge}" y="${edge}" width="${width - edge * 2}" height="${height - edge * 2}" rx="${radius}" fill="hsl(0 0% ${BRIGHTNESS}% / ${OPACITY})" filter="url(#${ids.soft})"/>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** Chromium applies SVG filters in backdrop-filter; Safari and Firefox don't (they get frosted glass). */
function refractionSupported(filterId: string) {
  const ua = navigator.userAgent;
  if ((/Safari/.test(ua) && !/Chrome/.test(ua)) || /Firefox/.test(ua)) return false;
  const probe = document.createElement("div");
  probe.style.backdropFilter = `url(#${filterId})`;
  return probe.style.backdropFilter !== "";
}

export function GlassSurface({ children, radius = 999, className = "" }: GlassSurfaceProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const filterId = `glass-${uid}`;
  const ref = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<SVGFEImageElement>(null);
  const [refract, setRefract] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setRefract(refractionSupported(filterId));
    const draw = () => {
      const { offsetWidth: w, offsetHeight: h } = el;
      if (!w || !h) return;
      imageRef.current?.setAttribute(
        "href",
        displacementMap(w, h, Math.min(radius, h / 2), { red: `${filterId}-r`, blue: `${filterId}-b`, soft: `${filterId}-s` }),
      );
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(el);
    return () => ro.disconnect();
  }, [filterId, radius]);

  return (
    <span
      ref={ref}
      className={`relative isolate inline-flex items-center justify-center overflow-hidden ${className}`}
      style={
        refract
          ? { borderRadius: radius, backdropFilter: `url(#${filterId}) saturate(1.15) brightness(1.06)`, boxShadow: RIM }
          : {
              borderRadius: radius,
              backdropFilter: "saturate(1.15) brightness(1.08)",
              WebkitBackdropFilter: "saturate(1.15) brightness(1.08)",
              boxShadow: RIM,
            }
      }
    >
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 size-full opacity-0">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage ref={imageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
            {/* each colour channel is displaced by a slightly different amount, then screened back together */}
            {CHANNELS.map(({ name, matrix }) => (
              <Fragment key={name}>
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="map"
                  scale={DISTORTION + OFFSETS[name]}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result={`disp-${name}`}
                />
                <feColorMatrix in={`disp-${name}`} type="matrix" values={matrix} result={name} />
              </Fragment>
            ))}
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" />
          </filter>
        </defs>
      </svg>
      {children}
    </span>
  );
}
