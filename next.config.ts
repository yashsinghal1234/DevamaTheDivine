import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "devamathedivine.com" },
      { protocol: "https", hostname: "cdn.shopify.com" },
    ],
    /**
     * Local dev quirk: DNS64 on this machine resolves devamathedivine.com to
     * a NAT64 address (64:ff9b::…), which the image optimizer treats as a
     * local IP and refuses to fetch (SSRF guard). The host is pinned by
     * remotePatterns above, so allowing it here is safe.
     */
    dangerouslyAllowLocalIP: true,
  },
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
