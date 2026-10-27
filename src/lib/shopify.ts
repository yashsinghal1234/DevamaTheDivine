import {
  collections as sampleCollections,
  heroImage as fallbackHeroImage,
  lightBanner as fallbackLightBanner,
  products as sampleProducts,
  reviews as sampleReviews,
  faqs as sampleFaqs,
} from "./sample-data";
import type { CollectionCard, FaqItem, Product, Review } from "./types";

/**
 * ============================================================
 *  DEVAMA THE DIVINE — Shopify backend data layer
 * ============================================================
 * This store runs 100% on Shopify. EVERY piece of content the
 * front-end renders — products, images, videos, reviews, FAQs,
 * homepage imagery — is pulled from below, from Shopify:
 *
 *   1. Products, collections, product images, product videos
 *      → Shopify Storefront GraphQL API
 *   2. Section content (hero image, video stories, reviews,
 *      FAQs)                    → Shopify metaobjects
 *   3. Everything else          → Shopify CDN files (same
 *      admin-uploaded assets the Liquid theme uses)
 *
 * To connect the live store, create the credentials at:
 *   Shopify Admin → Settings → Apps and sales channels →
 *   Develop → Create an application → Storefront API
 *   (scopes: unauthenticated_read_product_listings,
 *            unauthenticated_read_metaobjects,
 *            unauthenticated_read_metaobject_definitions)
 * then add a `.env.local`:
 *   SHOPIFY_STORE_DOMAIN=devamathedivine.com
 *   SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_...
 *
 * Recommended metaobjects for the store admin to create:
 *   • home_content  — handle: hero | everyday | informed
 *       fields: image (file), title (text), body (text)
 *   • video_story   — fields: title, description,
 *       video (file), thumbnail (file)
 *   • review        — fields: title, quote
 *   • faq           — fields: question, answer
 *
 * Every getter falls back to `sample-data.ts`, which mirrors the
 * LIVE store's real products/images/prices (all hosted on the
 * Shopify CDN), so the site always renders.
 */

const API_VERSION = "2025-07";

export function isShopifyConfigured(): boolean {
  return Boolean(
    process.env.SHOPIFY_STORE_DOMAIN &&
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
  );
}

export async function storefront<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN as string,
      },
      body: JSON.stringify({ query, variables }),
      // cacheComponents is on: opt into static caching explicitly
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error(`Storefront API error ${res.status}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */

/** Product category label derived from the Shopify product type. */
function categoryLabel(productType: string): string {
  const t = productType.toUpperCase();
  if (t.includes("RUDRAKSHA")) return "RUDRAKSHA";
  if (t.includes("KARUNGALI") || t.includes("EBONY")) return "KARUNGALI";
  if (t.includes("BRACELET")) return "BRACELETS";
  if (t.includes("POTL") || t.includes("POTALI")) return "ENERGISED POTALI";
  return t || "SACRED ESSENTIALS";
}

type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  productType: string;
  priceRange: { minVariantPrice: { amount: string } };
  compareAtPriceRange: { minVariantPrice: { amount: string } | null };
  featuredImage: { url: string; altText: string | null };
  options: { name: string; values: string[] }[];
  /** Could be an image or a video (first media is used) */
  media?: { nodes: { previewImage?: { url: string } | null }[] };
};

function mapProduct(node: ShopifyProduct): Product {
  const price = Number(node.priceRange.minVariantPrice.amount);
  const compare = node.compareAtPriceRange?.minVariantPrice?.amount;
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    category: categoryLabel(node.productType),
    price,
    compareAt:
      compare && Number(compare) > price ? Number(compare) : undefined,
    image: node.featuredImage?.url ?? node.media?.nodes[0]?.previewImage?.url ?? "",
    alt: node.featuredImage?.altText ?? node.title,
    options: node.options
      .filter((o) => !["Title"].includes(o.name))
      .slice(0, 2)
      .flatMap((o) => o.values.slice(0, 3)),
  };
}

const PRODUCTS_QUERY = /* GraphQL */ `
  query products($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      nodes {
        id
        handle
        title
        productType
        priceRange { minVariantPrice { amount } }
        compareAtPriceRange { minVariantPrice { amount } }
        featuredImage { url altText }
        media(first: 5) {
          nodes {
            previewImage { url }
          }
        }
        options { name values }
      }
    }
  }
`;

export type ProductSlot = "edit" | "everyday";

const EVERYDAY_HANDLES = ["dhan-yog-bracelet", "kuber-potali"];

export async function getProducts(
  slot: ProductSlot = "edit"
): Promise<Product[]> {
  if (isShopifyConfigured()) {
    try {
      const data = await storefront<{
        products: { nodes: ShopifyProduct[] };
      }>(PRODUCTS_QUERY, { first: 16 });
      const mapped = data.products.nodes.map(mapProduct).filter((p) => p.image);
      if (mapped.length) {
        if (slot === "everyday") {
          const picks = mapped.filter((p) =>
            EVERYDAY_HANDLES.includes(p.handle)
          );
          return picks.length ? picks.slice(0, 2) : mapped.slice(0, 2);
        }
        return mapped;
      }
    } catch {
      // Shopify unreachable / mis-scoped → fall through to CDN sample data
    }
  }

  if (slot === "everyday") {
    return sampleProducts.filter((p) => EVERYDAY_HANDLES.includes(p.handle));
  }
  return sampleProducts;
}

/* ------------------------------------------------------------------ */
/* Collections                                                         */
/* ------------------------------------------------------------------ */

const COLLECTIONS_QUERY = /* GraphQL */ `
  query collections($first: Int!) {
    collections(first: $first, sortKey: RELEVANCE) {
      nodes {
        title
        description
        handle
        image { url altText }
      }
    }
  }
`;

const FEATURED_COLLECTION_HANDLES = [
  "rudraksha",
  "karungali-ebony",
  "energised-potali",
  "bracelets",
];

export async function getCollections(): Promise<CollectionCard[]> {
  if (isShopifyConfigured()) {
    try {
      const data = await storefront<{
        collections: {
          nodes: {
            title: string;
            description: string;
            handle: string;
            image: { url: string; altText: string | null } | null;
          }[];
        };
      }>(COLLECTIONS_QUERY, { first: 12 });
      const mapped = data.collections.nodes
        .map((c) => ({
          title: c.title,
          subtitle: c.description || "Meaningful everyday pieces",
          image: c.image?.url ?? "",
          alt: c.image?.altText ?? c.title,
          href: `/collections/${c.handle}`,
        }))
        .filter((c) => c.image);
      if (mapped.length) {
        // keep the curated order of the featured collections
        const curated = FEATURED_COLLECTION_HANDLES.map((h) =>
          mapped.find((c) => c.href.endsWith(h))
        ).filter(Boolean) as CollectionCard[];
        return (curated.length ? curated : mapped).slice(0, 4);
      }
    } catch {
      // fall through
    }
  }
  return sampleCollections;
}

/* ------------------------------------------------------------------ */
/* Metaobjects: section images, videos, reviews, FAQs                  */
/* ------------------------------------------------------------------ */

type MetaobjectField = {
  key: string;
  value: string | null;
  reference: null | {
    __typename: string;
    previewImage?: { url: string } | null;
    sources?: { url: string }[];
  };
};

type Metaobject = {
  handle: string;
  displayName?: string | null;
  fields: MetaobjectField[];
};

const METAOBJECTS_QUERY = /* GraphQL */ `
  query metaobjects($type: String!, $first: Int!) {
    metaobjects(type: $type, first: $first) {
      nodes {
        handle
        fields {
          key
          value
          reference {
            __typename
            previewImage { url }
            ... on MediaVideo {
              sources { url format }
            }
          }
        }
      }
    }
  }
`;

async function fetchMetaobjects(
  type: string,
  first = 20
): Promise<Metaobject[]> {
  if (!isShopifyConfigured()) return [];
  try {
    const data = await storefront<{
      metaobjects: { nodes: Metaobject[] };
    }>(METAOBJECTS_QUERY, { type, first });
    return data.metaobjects.nodes;
  } catch {
    return [];
  }
}

function fieldText(mo: Metaobject | undefined, key: string): string {
  return mo?.fields.find((f) => f.key === key)?.value ?? "";
}

function fieldImage(mo: Metaobject | undefined, key: string): string {
  const ref = mo?.fields.find((f) => f.key === key)?.reference;
  return ref?.previewImage?.url ?? "";
}

function fieldVideoUrl(mo: Metaobject | undefined, key: string): string {
  const ref = mo?.fields.find((f) => f.key === key)?.reference;
  return ref?.sources?.[0]?.url ?? "";
}

/** Homepage section imagery — metaobject type `home_content`. */
export async function getSectionImages(): Promise<{
  hero: string;
  everyday: string;
  informed: string;
}> {
  const nodes = await fetchMetaobjects("home_content");
  const byHandle = Object.fromEntries(
    nodes.map((n) => [n.handle.split("~").pop() ?? n.handle, n])
  );
  return {
    hero:
      fieldImage(byHandle["hero"], "image") || fallbackHeroImage,
    everyday:
      fieldImage(byHandle["everyday"], "image") || fallbackLightBanner,
    informed:
      fieldImage(byHandle["informed"], "image") ||
      sampleCollections[0].image.replace("&width=900", "&width=1400"),
  };
}

/* ------------------------------------------------------------------ */
/* Video stories                                                       */
/* ------------------------------------------------------------------ */

export type VideoStory = {
  title: string;
  text: string;
  videoUrl: string | null;
  poster: string | null;
};

const FALLBACK_STORIES: VideoStory[] = [
  { title: "Product demos", text: "Understand materials, finishes and product details.", videoUrl: null, poster: null },
  { title: "Ritual guides", text: "Practical guidance for care and everyday practice.", videoUrl: null, poster: null },
  { title: "Brand storytelling", text: "Compact looks into events and the thoughtful way we curate.", videoUrl: null, poster: null },
  { title: "Care guides", text: "Keep your malas, beads and pieces well, season after season.", videoUrl: null, poster: null },
];

export async function getVideoStories(): Promise<VideoStory[]> {
  const nodes = await fetchMetaobjects("video_story");
  const mapped = nodes
    .map((mo) => ({
      title: fieldText(mo, "title") || mo.displayName || "",
      text: fieldText(mo, "description"),
      videoUrl: fieldVideoUrl(mo, "video") || null,
      poster: fieldImage(mo, "thumbnail") || null,
    }))
    .filter((s) => s.title);
  return mapped.length ? mapped : FALLBACK_STORIES;
}

/* ------------------------------------------------------------------ */
/* Reviews (Shopify review app metaobjects)                            */
/* ------------------------------------------------------------------ */

export async function getReviews(): Promise<Review[]> {
  const nodes = await fetchMetaobjects("review");
  const mapped = nodes
    .map((mo) => ({
      title: fieldText(mo, "title") || mo.displayName || "",
      quote: fieldText(mo, "quote"),
    }))
    .filter((r) => r.title && r.quote);
  return mapped.length ? mapped : sampleReviews;
}

/* ------------------------------------------------------------------ */
/* FAQs                                                                */
/* ------------------------------------------------------------------ */

export async function getFaqs(): Promise<FaqItem[]> {
  const nodes = await fetchMetaobjects("faq");
  const mapped = nodes
    .map((mo) => ({
      question: fieldText(mo, "question") || mo.displayName || "",
      answer: fieldText(mo, "answer"),
    }))
    .filter((f) => f.question && f.answer);
  return mapped.length ? mapped : sampleFaqs;
}

/* ------------------------------------------------------------------ */
/* Single product (PDP)                                                */
/* ------------------------------------------------------------------ */

export type ProductFull = {
  id: string;
  handle: string;
  title: string;
  description: string;
  category: string;
  price: number;
  compareAt?: number;
  image: string;
  images: { url: string; alt: string }[];
  options: { name: string; values: string[] }[];
  productType: string;
};

function sampleDescription(productType: string, title: string): string {
  const t = productType.toLowerCase();
  if (t.includes("karungali") || t.includes("ebony"))
    return `A mala made from natural ${title.startsWith("Karungali") ? "Karungali (ebony wood)" : "Karungali"}, carefully crafted for personal practice. Its dark wood and simple beaded form offer a considered piece to use every day, with clear listing details to check before choosing.`;
  if (t.includes("rudraksha"))
    return "A natural Rudraksha bead for meditation. Explore the listing to understand the Mukhi, its meaning and the care guidance for your practice.";
  if (t.includes("bracelet"))
    return "A beaded bracelet designed to be a joy in your everyday. Explore product-specific authenticity details, material finish and sizing before choosing.";
  if (t.includes("potl") || t.includes("potali"))
    return "A ritual potli with meaningful contents for celebration and everyday practice. View the listing for the specific contents and current details.";
  return `${title} — a sacred object from Devama The Divine, listed with clear product information.`;
}

function fallbackProduct(handle: string): ProductFull | null {
  const p = sampleProducts.find((s) => s.handle === handle);
  if (!p) return null;
  const gallery = [
    { url: p.image, alt: `${p.title} — product view` },
    {
      url: sampleCollections[0].image,
      alt: `${p.title} — collection context`,
    },
    { url: sampleCollections[2].image, alt: `${p.title} — alternate view` },
  ];
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    description: sampleDescription(p.category, p.title),
    category: p.category,
    price: p.price,
    compareAt: p.compareAt,
    image: p.image,
    images: gallery,
    options: p.options?.map((v) => ({
      name: "Bead size",
      values: [v],
    })) ?? [],
    productType: p.category,
  };
}

const PRODUCT_QUERY = /* GraphQL */ `
  query product($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      productType
      priceRange { minVariantPrice { amount } }
      compareAtPriceRange { minVariantPrice { amount } }
      images(first: 6) {
        edges { node { url altText } }
      }
      options { name values }
    }
  }
`;

export async function getProduct(handle: string): Promise<ProductFull | null> {
  if (isShopifyConfigured()) {
    try {
      const data = await storefront<{
        product: {
          id: string;
          handle: string;
          title: string;
          description: string;
          productType: string;
          priceRange: { minVariantPrice: { amount: string } };
          compareAtPriceRange: { minVariantPrice: { amount: string } | null };
          images: { edges: { node: { url: string; altText: string | null } }[] };
          options: { name: string; values: string[] }[];
        } | null;
      }>(PRODUCT_QUERY, { handle });

      if (data.product) {
        const node = data.product;
        const price = Number(node.priceRange.minVariantPrice.amount);
        const compare = node.compareAtPriceRange?.minVariantPrice?.amount;
        const images = node.images.edges.map((e) => ({
          url: e.node.url,
          alt: e.node.altText ?? node.title,
        }));
        return {
          id: node.id,
          handle: node.handle,
          title: node.title,
          description: node.description || sampleDescription(node.productType, node.title),
          category: categoryLabel(node.productType),
          price,
          compareAt: compare && Number(compare) > price ? Number(compare) : undefined,
          image: images[0]?.url ?? "",
          images: images.length ? images : [{ url: images[0]?.url ?? "", alt: node.title }],
          options: node.options.filter((o) => !["Title"].includes(o.name)),
          productType: node.productType,
        };
      }
    } catch {
      // fall through to sample
    }
  }
  return fallbackProduct(handle);
}

/* ------------------------------------------------------------------ */
/* Search                                                              */
/* ------------------------------------------------------------------ */

const SEARCH_QUERY = /* GraphQL */ `
  query searchProducts($query: String!, $first: Int!) {
    search(query: $query, first: $first, types: PRODUCT) {
      nodes {
        ... on Product {
          id
          handle
          title
          productType
          priceRange { minVariantPrice { amount } }
          compareAtPriceRange { minVariantPrice { amount } }
          featuredImage { url altText }
        }
      }
    }
  }
`;

export async function getSearchResults(query: string): Promise<Product[]> {
  if (isShopifyConfigured()) {
    try {
      const data = await storefront<{
        search: { nodes: ShopifyProduct[] };
      }>(SEARCH_QUERY, { query, first: 24 });
      const mapped = data.search.nodes.map(mapProduct).filter((p) => p.image);
      if (mapped.length) return mapped;
    } catch {
      // fall through
    }
  }
  // Sample fallback: naive search across title + category
  const q = query.trim().toLowerCase();
  if (!q) return sampleProducts.slice(0, 8);
  return sampleProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.category.toLowerCase().startsWith(q)
  );
}
