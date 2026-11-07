"use client";

import { useState } from "react";
import { IconCheck, IconPlus } from "./icons";
import { useCart, type AddPayload } from "./cart-provider";

/**
 * Add-to-cart used on product cards and wishlist items. When the Shopify
 * backend is connected it posts the variant to /api/cart (cartLinesAdd);
 * until then it updates the local illustrative basket.
 */
export default function AddToCartButton({
  title,
  item,
  label = "Add to cart",
  onMoved,
  className = "",
}: {
  title: string;
  /** Product payload — when provided the button actually mutates the basket. */
  item?: AddPayload;
  /** Button text, e.g. "Add to cart" / "Move to cart" */
  label?: string;
  /** Called after a successful add (e.g. remove the wishlist entry). */
  onMoved?: () => void;
  className?: string;
}) {
  const [added, setAdded] = useState(false);
  const cart = useCart();

  const move = () => {
    if (item) {
      cart.add(item, 1);
      onMoved?.();
    }
    setAdded(true);
    // Signal "not added" again shortly so the button can be reused.
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={move}
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
