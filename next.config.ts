import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // UI experiments (see package.json ui:* scripts) build into their own folder so they can run side by side.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  cacheComponents: true,
  images: {
    // Unsplash stock photos (Unsplash License) illustrate the event occasions on /group-enquiries until the farm has its own.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-*", search: "" }],
  },
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
