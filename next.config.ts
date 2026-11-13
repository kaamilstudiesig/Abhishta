import type { NextConfig } from "next";

// `npm run export` builds plain HTML/CSS/JS files into out/ for an ordinary web server (Apache/Nginx, FTP upload).
// - Each page becomes <page>/index.html.
// - Images: there's no image server, so scripts/export-images.mjs writes every photo at a few widths after the build
//   and src/lib/image-loader.ts points each <img srcset> at them; phones get the small ones.
// - Cache Components / Partial Prefetching need a running Next.js server, so they're off in this mode.
// - The /field-notes redirect moves to the server's own config (deploy/.htaccess, deploy/nginx.conf).
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  // UI experiments (see package.json ui:* scripts) build into their own folder so they can run side by side.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  ...(staticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: {
          loader: "custom" as const,
          loaderFile: "./src/lib/image-loader.ts",
          deviceSizes: [640, 960, 1280, 1600],
          imageSizes: [320],
        },
      }
    : {
        cacheComponents: true,
        partialPrefetching: true,
        // the old name of the 360° tour page
        async redirects() {
          return [{ source: "/field-notes", destination: "/virtualtour", permanent: true }];
        },
      }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
