import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // UI experiments (see package.json ui:* scripts) build into their own folder so they can run side by side.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  cacheComponents: true,
  partialPrefetching: true,
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
