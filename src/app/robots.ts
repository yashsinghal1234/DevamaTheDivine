import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // Typical crawler traps: account screens, the API, and checkout flow.
        disallow: ["/api/", "/account", "/checkout"],
      },
    ],
    sitemap: "https://devamathedivine.com/sitemap.xml",
  };
}
