import { products as sampleProducts } from "./sample-data";
import type { Product } from "./types";

/**
 * Illustrative basket used by the Payment-stage design.
 * Both pages read the same two pieces so the numbers always match.
 * Replace this with the real Shopify Storefront cart once it is wired up.
 */
export type DemoCartItem = {
  handle: string;
  title: string;
  price: number;
  compareAt?: number;
  image: string;
  alt: string;
  category: string;
  quantity: number;
};

function fromProduct(p: Product, quantity: number): DemoCartItem {
  return {
    handle: p.handle,
    title: p.title,
    price: p.price,
    compareAt: p.compareAt,
    image: p.image,
    alt: p.alt,
    category: p.category,
    quantity,
  };
}

const HANDLES = ["karungali-mala-original", "amethyst-bracelet"];

export function getDemoCart(): DemoCartItem[] {
  return HANDLES
    .map((h, i) => {
      const p = sampleProducts.find((s) => s.handle === h);
      if (!p) {
        // Never fail the page if a handle changes — fall back to first items.
        const fallback = sampleProducts[i];
        return fallback ? fromProduct(fallback, 1) : null;
      }
      return fromProduct(p, 1);
    })
    .filter(Boolean) as DemoCartItem[];
}

export function demoSubtotal(items: DemoCartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
