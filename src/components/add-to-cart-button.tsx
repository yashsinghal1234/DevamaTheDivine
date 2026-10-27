"use client";

import { useState } from "react";
import { IconCheck, IconPlus } from "./icons";

/**
 * Demo add-to-cart. Once the Shopify Storefront cart is wired up this calls
 * `cartCreate` / `cartLinesAdd` with this merchandising line, but the visual
 * behaviour stays the same.
 */
export default function AddToCartButton({
  title,
  label = "Add to cart",
  className = "",
}: {
  title: string;
  /** Button text, e.g. "Add to cart" / "Move to cart" */
  label?: string;
  className?: string;
}) {
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setAdded(true)}
      className={
        className ||
        `flex w-full items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium transition-colors ${
          added
            ? "border-maroon bg-maroon text-cream"
            : "border-ink/25 bg-cream-card text-ink hover:border-maroon hover:bg-maroon hover:text-cream"
        }`
      }
      aria-label={`Add ${title} to cart`}
    >
      {added ? (
        <>
          <IconCheck className="h-4 w-4" />
          Moved to cart
        </>
      ) : (
        <>
          <IconPlus className="h-4 w-4" />
          {label}
        </>
      )}
    </button>
  );
}
