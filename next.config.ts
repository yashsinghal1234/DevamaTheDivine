import type { NextConfig } from "next";

/** Baseline response headers applied to every route. */
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // HSTS is a no-op on localhost; it enforces HTTPS once deployed behind TLS.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
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
