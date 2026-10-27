"use client";

import Image from "next/image";
import AddToCartButton from "./add-to-cart-button";
import { IconHeart } from "./icons";
import { inr } from "@/lib/format";
import { toWishlistItem, useWishlist } from "./wishlist-provider";
import type { Product } from "@/lib/types";

export default function ProductCard({
  product,
  notePrefix = "Best price",
}: {
  product: Product;
  /** Small helper text shown under the CTA, e.g. "Best price" */
  notePrefix?: string;
}) {
  const { has, toggle } = useWishlist();
  const saved = has(product.handle);

  return (
    <article className="flex h-full flex-col">
      <a
        href={`/products/${product.handle}`}
        className="group relative block overflow-hidden rounded-xl bg-sand/60"
      >
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
          {product.compareAt && (
            <span className="absolute left-3 top-3 rounded-full bg-terracotta px-2.5 py-0.5 text-[10px] font-medium text-cream">
              {product.badge ?? "Sale"}
            </span>
          )}
        </div>
        <button
          type="button"
          aria-label={saved ? `Remove ${product.title} from wishlist` : `Wishlist ${product.title}`}
          onClick={(e) => {
            e.preventDefault();
            toggle(toWishlistItem(product));
          }}
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
            saved
              ? "bg-terracotta text-cream"
              : "bg-cream-card/90 text-clay hover:text-terracotta"
          }`}
        >
          <IconHeart className={`h-4 w-4 ${saved ? "fill-cream" : ""}`} />
        </button>
      </a>

          {product.options && product.options.length > 0 && (
            <div className="mt-2 flex items-center gap-1 px-0.5">
              {product.options.slice(0, 3).map((opt) => (
                <span
                  key={opt}
                  className="rounded-full border border-line bg-cream-card px-1.5 py-0.5 text-[9px] text-clay sm:text-[10px]"
                >
                  {opt}
                </span>
              ))}
            </div>
          )}

      <div className="mt-3 flex flex-1 flex-col">
        <p className="eyebrow text-terracotta">{product.category}</p>
        <h3 className="mt-1.5 font-serif text-base font-semibold leading-snug text-ink sm:text-lg">
          <a href={`/products/${product.handle}`} className="hover:underline">
            {product.title}
          </a>
        </h3>
        <p className="mt-1.5 flex items-baseline gap-2 text-sm">
          <span className="font-medium text-ink">
            {inr(product.price)}
          </span>
          {product.compareAt && (
            <span className="text-xs text-clay line-through">
              {inr(product.compareAt)}
            </span>
          )}
        </p>
        <a
          href={`/products/${product.handle}`}
          className="mb-3 mt-1 inline-block text-xs font-medium text-clay underline-offset-2 hover:text-maroon hover:underline"
        >
          Read more
        </a>
        <div className="mt-auto">
          <AddToCartButton title={product.title} />
          <p className="mt-1.5 hidden text-center text-[10px] tracking-wide text-clay/70 sm:block">
            {notePrefix}
          </p>
        </div>
      </div>
    </article>
  );
}
