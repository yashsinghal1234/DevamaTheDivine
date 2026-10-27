"use client";

import { useState } from "react";
import { IconBag, IconHeart, IconMinus, IconPlus } from "./../icons";
import { toWishlistItem, useWishlist } from "./../wishlist-provider";
import AddToCartButton from "./../add-to-cart-button";
import type { ProductFull } from "@/lib/shopify";

export default function ProductActions({
  product,
}: {
  product: ProductFull;
}) {
  const [qty, setQty] = useState(1);
  const { has, toggle } = useWishlist();
  const saved = has(product.handle);

  return (
    <div className="mt-7">
      <div className="flex flex-wrap items-center gap-4">
        {/* Quantity */}
        <div className="flex items-center rounded-lg border border-line bg-cream-card">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-clay transition-colors hover:text-maroon"
          >
            <IconMinus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm font-medium">{qty}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => q + 1)}
            className="px-3 py-2 text-clay transition-colors hover:text-maroon"
          >
            <IconPlus className="h-4 w-4" />
          </button>
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => toggle(toWishlistItem(product))}
          className="inline-flex items-center gap-2 text-xs font-medium text-clay underline-offset-2 transition-colors hover:text-terracotta hover:underline"
        >
          <IconHeart
            className={`h-4 w-4 ${saved ? "fill-terracotta text-terracotta" : ""}`}
          />
          {saved ? "Saved to wishlist" : "Save to wishlist"}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          className="btn-sheen flex items-center justify-center gap-2.5 rounded-lg bg-gold px-6 py-3 text-sm font-medium text-maroon-dark transition-colors hover:bg-gold-deep"
        >
          Add to cart
          <IconBag className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2.5 rounded-lg border border-ink/30 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-maroon hover:bg-maroon hover:text-cream"
        >
          Buy now
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
