"use client";

/**
 * Image loader for the static export only (`npm run export`, see next.config.ts). There's no image server on a plain
 * web host, so scripts/export-images.mjs writes each imported WebP at a few widths next to the original
 * (name.hash.w640.webp …) and this points each srcset entry at the closest one that's at least as wide.
 * The 1600px original is used as is.
 */
const WIDTHS = [320, 640, 960, 1280];

export default function exportImageLoader({ src, width }: { src: string; width: number }) {
  if (!src.startsWith("/_next/static/media/") || !src.endsWith(".webp")) return src;
  const w = WIDTHS.find((x) => x >= width);
  return w ? src.replace(/\.webp$/, `.w${w}.webp`) : src;
}
