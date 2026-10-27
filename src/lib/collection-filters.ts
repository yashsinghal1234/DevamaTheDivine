import type { Product } from "./types";

/**
 * Filter definitions + pure matchers for the "Shop all" collection page.
 * The client sidebar renders the labels; the server page applies the same
 * slugs to the product list, so the two can never drift apart.
 *
 * When live Shopify data is enabled this works unchanged: category/material
 * are derived from the product title/category the same way Shopify
 * collection membership is mirrored in the sample data.
 */

export type FilterDef = { slug: string; label: string };

export const CATEGORY_FILTERS: FilterDef[] = [
  { slug: "rudraksha", label: "Rudraksha" },
  { slug: "karungali", label: "Karungali (Ebony wood)" },
  { slug: "potli", label: "Energised Potali" },
  { slug: "bracelets", label: "Bracelets" },
];

export const MATERIAL_FILTERS: FilterDef[] = [
  { slug: "natural-bead", label: "Natural bead" },
  { slug: "ebony-wood", label: "Ebony wood" },
  { slug: "amethyst", label: "Amethyst" },
  { slug: "mixed-stones", label: "Mixed stones" },
];

export type PriceDef = FilterDef & { min: number; max: number; chip: string };

export const PRICE_FILTERS: PriceDef[] = [
  { slug: "under-499", label: "Under ₹499", min: 0, max: 498, chip: "₹0–₹499" },
  { slug: "499-599", label: "₹499–₹599", min: 499, max: 599, chip: "₹499–₹599" },
  { slug: "600-1000", label: "₹600–₹1,000", min: 600, max: 1000, chip: "₹600–₹1,000" },
];

/** RUDRAKSHA → rudraksha, ENERGISED POTALI → potli, … */
export function categorySlug(p: Product): string {
  const c = p.category.toUpperCase();
  if (c.includes("RUDRAKSH")) return "rudraksha";
  if (c.includes("KARUNGALI")) return "karungali";
  if (c.includes("POTALI") || c.includes("POTLI")) return "potli";
  if (c.includes("BRACELET")) return "bracelets";
  return "other";
}

/** Derived from the title so it works on live data without extra metafields. */
export function materialSlugs(p: Product): string[] {
  const t = p.title.toLowerCase();
  const out: string[] = [];
  if (/amethyst/.test(t)) out.push("amethyst");
  if (/karungali|ebony/.test(t)) out.push("ebony-wood");
  if (/rudraksha/.test(t)) out.push("natural-bead");
  if (/dhan yog|mixed stone/.test(t)) out.push("mixed-stones");
  return out;
}

export function parseList(value?: string | string[]): string[] {
  return (Array.isArray(value)
    ? value.join(",")
    : (value ?? ""))
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function priceRange(slug: string): PriceDef | undefined {
  return PRICE_FILTERS.find((f) => f.slug === slug);
}
