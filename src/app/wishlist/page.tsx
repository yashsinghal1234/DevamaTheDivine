"use client";

import Image from "next/image";
import AddToCartButton from "@/components/add-to-cart-button";
import Reveal from "@/components/reveal";
import { InfoIcon } from "@/components/pdp/info-icon";
import { IconArrowRight, IconArrowUpRight, IconHeart } from "@/components/icons";
import { useWishlist, type WishlistItem } from "@/components/wishlist-provider";
import { inr } from "@/lib/format";

const FALLBACK_IMAGES = [
  "https://devamathedivine.com/cdn/shop/files/1_722ae3a9-a9ae-48f7-9fc2-9f8188f1864d.png?width=800",
  "https://devamathedivine.com/cdn/shop/collections/gemstone-bracelet-collection-devama.png?width=800",
  "https://devamathedivine.com/cdn/shop/files/3_1ca42fee-84ed-4fda-891d-9ff2d36fb6c2.png?width=800",
  "https://devamathedivine.com/cdn/shop/collections/devama-potli-collection.png?width=800",
];

export default function WishlistPage() {
  const { items, remove } = useWishlist();

  return (
    <>
      <main className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-[11px] text-clay sm:text-xs">
            <a href="/" className="hover:text-maroon">Home</a>
            <span className="px-1.5">/</span>
            <span className="text-ink/70">Wishlist</span>
          </nav>

          <Reveal>
            <p className="eyebrow mt-4 text-terracotta">Your wishlist</p>
            <h1 className="mt-3 max-w-2xl font-serif text-4xl font-medium leading-[1.08] text-ink sm:text-6xl">
              Pieces you&rsquo;re drawn to
            </h1>
            <p className="mt-3 max-w-md text-sm font-light text-clay">
              Keep your favourites together. Take your time, compare the
              details, and choose when you&rsquo;re ready.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-clay">
                {items.length} saved {items.length === 1 ? "piece" : "pieces"}
              </p>
              <a
                href="/collections/all"
                className="group inline-flex items-center gap-2.5 rounded-lg border border-ink/30 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-maroon hover:bg-maroon hover:text-cream"
              >
                Continue shopping
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          {items.length === 0 ? (
            <Reveal className="mt-12">
              <div className="flex flex-col items-center rounded-3xl border border-dashed border-line bg-cream-card px-6 py-16 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold-deep">
                  <IconHeart className="h-6 w-6" />
                </span>
                <p className="mt-5 font-serif text-2xl font-semibold text-ink">
                  Nothing saved yet
                </p>
                <p className="mt-2 max-w-sm text-sm font-light text-clay">
                  Tap the heart on any piece to keep it here while you browse.
                </p>
                <a
                  href="/collections/all"
                  className="btn-sheen mt-6 inline-flex items-center gap-2.5 rounded-full bg-gold px-6 py-3 text-sm font-medium text-maroon-dark transition-colors hover:bg-gold-deep"
                >
                  Explore the collection
                  <IconArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
              {items.map((item, i) => (
                <Reveal key={item.handle} delay={i * 90} className="h-full">
                  <WishlistCard item={item} onRemove={() => remove(item.handle)} />
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="mt-14">
            <div className="grid grid-cols-1 gap-8 border-t border-line pt-10 lg:grid-cols-2">
              <div>
                <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                  A little clarity before you choose
                </h2>
                <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-clay">
                  Explore product-specific authenticity information, material
                  details and care guidance on each listing. Saving a piece
                  does not reserve it.
                </p>
                <a
                  href="/search"
                  className="group mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-clay underline underline-offset-2 hover:text-maroon"
                >
                  Help choosing your piece
                  <IconArrowUpRight className="h-3 w-3" />
                </a>
              </div>
              <div>
                <div className="flex items-start gap-3 rounded-xl bg-gold/10 p-5">
                  <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                  <div>
                    <p className="text-sm font-medium text-maroon-deep">
                      A thoughtful extra
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-clay sm:text-[13px]">
                      Special gift on orders above ₹499. The order value must
                      be strictly above ₹499 to meet the condition.
                    </p>
                  </div>
                </div>
                <a
                  href="/cart"
                  className="group mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-clay underline underline-offset-2 hover:text-maroon"
                >
                  View your basket
                  <IconArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
    </>
  );
}

function WishlistCard({
  item,
  onRemove,
}: {
  item: WishlistItem;
  onRemove: () => void;
}) {
  return (
    <article className="flex h-full flex-col">
      <a
        href={`/products/${item.handle}`}
        className="group relative block overflow-hidden rounded-xl bg-sand/60"
      >
        <div className="relative aspect-square">
          <Image
            src={item.image || FALLBACK_IMAGES[0]}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        </div>
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-terracotta text-cream">
          <IconHeart className="h-4 w-4 fill-cream" />
        </span>
      </a>

      <p className="eyebrow mt-3 text-terracotta">{item.category}</p>
      <h3 className="mt-1.5 font-serif text-base font-semibold leading-snug text-ink sm:text-lg">
        <a href={`/products/${item.handle}`} className="hover:underline">
          {item.title}
        </a>
      </h3>
      <p className="mt-1.5 flex items-baseline gap-2 text-sm">
        <span className="font-medium text-ink">{inr(item.price)}</span>
        {item.compareAt && (
          <span className="text-xs text-clay line-through">
            {inr(item.compareAt)}
          </span>
        )}
      </p>
      <div className="mt-auto pt-4">
        <AddToCartButton title={item.title} label="Move to cart" />
        <button
          type="button"
          onClick={onRemove}
          className="mt-2.5 block text-left text-xs font-medium text-clay underline underline-offset-2 transition-colors hover:text-terracotta"
        >
          Remove from wishlist
        </button>
      </div>
    </article>
  );
}
