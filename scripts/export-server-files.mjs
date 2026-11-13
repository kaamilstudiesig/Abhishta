// After the static export:
// 1. copy the Apache config into out/ so it's uploaded with the site (Nginx hosts: see deploy/nginx.conf);
// 2. drop the copies of public/images that no page references by URL. Imported photos are served from
//    _next/static/media, so the copies Next makes under out/images/ would only be dead weight to upload.
import { copyFileSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

copyFileSync("deploy/.htaccess", "out/.htaccess");

const walk = (d) =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const text = walk("out")
  .filter((p) => /\.(html|js|css|txt|json)$/.test(p))
  .map((p) => readFileSync(p, "utf8"))
  .join("\n");

let removed = 0;
let freed = 0;
for (const p of walk(join("out", "images"))) {
  const url = "/" + relative("out", p).split(sep).join("/");
  if (text.includes(url)) continue;
  freed += statSync(p).size;
  rmSync(p);
  removed++;
}
console.log(`export-server-files: out/.htaccess written; removed ${removed} unused image copies (${(freed / 1e6).toFixed(1)} MB)`);
