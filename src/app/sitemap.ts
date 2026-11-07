import type { MetadataRoute } from "next";
import { getProducts, getCollections } from "@/lib/shopify";

const BASE = "https://devamathedivine.com";

const STATIC_ROUTES = [
  "",
  "/collections/all",
  "/search",
  "/reviews",
  "/reviews/write",
  "/videos",
  "/faq",
  "/track-your-order",
  "/cart",
  "/pages/contact-us",
  "/pages/about-us",
  "/pages/shopping-information",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let productRoutes: MetadataRoute.Sitemap = [];
  let collectionRoutes: MetadataRoute.Sitemap = [];

  try {
    const [products, collections] = await Promise.all([
      getProducts(),
      getCollections(),
    ]);
    productRoutes = products.map((p) => ({
      url: `${BASE}/products/${p.handle}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
    collectionRoutes = collections
      .filter((c) => c.href.startsWith("/collections/"))
      .map((c) => ({
        url: `${BASE}${c.href}`,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
  } catch {
    // sample data fallback is fine — handled inside the getters
  }

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${BASE}${route}`,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.6,
    })),
    ...productRoutes,
    ...collectionRoutes,
  ];
}
