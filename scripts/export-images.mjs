// After `next build` in static-export mode: write every imported WebP at smaller widths
// (name.hash.w320.webp … w1280), which src/lib/image-loader.ts points the srcsets at.
// Images narrower than a width just get a copy, so every name the loader can ask for exists.
import { readdirSync, copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const dir = join("out", "_next", "static", "media");
const WIDTHS = [320, 640, 960, 1280];

if (!existsSync(dir)) {
  console.error(`export-images: ${dir} not found — run the static export first`);
  process.exit(1);
}

const files = readdirSync(dir).filter((f) => f.endsWith(".webp") && !/\.w\d+\.webp$/.test(f));
let made = 0;
for (const f of files) {
  const src = join(dir, f);
  const { width = 0 } = await sharp(src).metadata();
  for (const w of WIDTHS) {
    const out = join(dir, f.replace(/\.webp$/, `.w${w}.webp`));
    if (width <= w) copyFileSync(src, out);
    else await sharp(src).resize({ width: w }).webp({ quality: 72 }).toFile(out);
    made++;
  }
}
console.log(`export-images: ${made} sized copies of ${files.length} images`);
