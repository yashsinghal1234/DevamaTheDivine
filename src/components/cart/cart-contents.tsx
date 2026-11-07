"use client";

import Image from "next/image";
import { useState } from "react";
import type { DemoCartItem } from "@/lib/demo-cart";
import { inr } from "@/lib/format";

type SavedItem = DemoCartItem;

/**
 * Illustrative basket with real interactivity: quantity steppers, remove
 * and save-for-later all update the totals live. Nothing is persisted —
 * the Shopify Storefront cart replaces this once wired up.
 */
export default function CartContents({
  initialItems,
}: {
  initialItems: DemoCartItem[];
}) {
  const [items, setItems] = useState(initialItems);
  const [saved, setSaved] = useState<SavedItem[]>([]);

  const setQty = (handle: string, delta: number) =>
    setItems((prev) =>
      prev.map((item) =>
        item.handle === handle
          ? { ...item, quantity: Math.max(1, Math.min(9, item.quantity + delta)) }
          : item
      )
    );

  const remove = (handle: string) =>
    setItems((prev) => prev.filter((item) => item.handle !== handle));

  const saveForLater = (handle: string) => {
    setItems((prev) => {
      const found = prev.find((item) => item.handle === handle);
      if (found) setSaved((s) => [...s, found]);
      return prev.filter((item) => item.handle !== handle);
    });
  };

  const moveToBasket = (handle: string) => {
    setSaved((prev) => {
      const found = prev.find((item) => item.handle === handle);
      if (found) setItems((b) => [...b, { ...found, quantity: 1 }]);
      return prev.filter((item) => item.handle !== handle);
    });
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const giftThreshold = 499;
  const meetsGift = subtotal > giftThreshold;
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr] lg:gap-10">
      {/* Basket lines */}
      <div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
            {count} {count === 1 ? "piece" : "pieces"}, chosen by you
          </h2>
          <a
            href="/collections/all"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-maroon-deep underline underline-offset-2 hover:text-maroon"
          >
            Continue shopping
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        </div>

        {items.length === 0 && saved.length > 0 && (
          <p className="mt-6 rounded-2xl border border-dashed border-line bg-cream-card p-8 text-center text-sm text-clay">
            Your basket is empty — everything is saved for later below.
          </p>
        )}

        <ul className="mt-6 divide-y divide-line/80">
          {items.map((item) => (
            <li
              key={item.handle}
              className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center"
            >
              <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-sand/60 sm:h-20 sm:w-20">
                <Image src={item.image} alt={item.alt} fill sizes="80px" className="object-cover" />
              </span>
              <div className="min-w-0 flex-1">
                <a
                  href={`/products/${item.handle}`}
                  className="font-serif text-lg font-semibold text-ink hover:underline sm:text-xl"
                >
                  {item.title}
                </a>
                <p className="mt-1 text-xs text-clay sm:text-[13px]">
                  {item.category} • {"Explore listing details"}
                </p>
                <div className="mt-2 flex items-center gap-5 text-xs font-medium sm:text-[13px]">
                  <button
                    type="button"
                    onClick={() => remove(item.handle)}
                    className="text-maroon-deep underline underline-offset-2 transition-colors hover:text-maroon"
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    onClick={() => saveForLater(item.handle)}
                    className="text-clay underline underline-offset-2 transition-colors hover:text-maroon"
                  >
                    Save for later
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-5 sm:gap-6">
                <div className="flex items-center rounded-lg border border-line bg-cream-card">
                  <button
                    type="button"
                    aria-label={`Decrease quantity of ${item.title}`}
                    onClick={() => setQty(item.handle, -1)}
                    disabled={item.quantity <= 1}
                    className="px-3 py-1.5 text-sm text-ink transition-colors hover:text-maroon disabled:cursor-not-allowed disabled:text-clay/40"
                  >
                    −
                  </button>
                  <span className="w-7 text-center text-sm font-medium text-ink">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label={`Increase quantity of ${item.title}`}
                    onClick={() => setQty(item.handle, 1)}
                    className="px-3 py-1.5 text-sm text-ink transition-colors hover:text-maroon"
                  >
                    +
                  </button>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-serif text-xl font-semibold text-ink sm:text-2xl">
                    {inr(item.price * item.quantity)}
                  </p>
                  {item.compareAt && (
                    <p className="text-xs text-clay line-through">
                      {inr(item.compareAt)}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Saved for later */}
        {saved.length > 0 && (
          <div className="mt-2 rounded-2xl border border-dashed border-line bg-cream-card p-6">
            <h3 className="font-serif text-2xl font-medium text-ink">
              Saved for later
            </h3>
            <ul className="mt-4 space-y-4">
              {saved.map((item) => (
                <li key={item.handle} className="flex items-center gap-4">
                  <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-sand/60">
                    <Image src={item.image} alt={item.alt} fill sizes="48px" className="object-cover" />
                  </span>
                  <p className="min-w-0 flex-1 truncate text-sm font-medium text-ink">
                    {item.title}
                  </p>
                  <button
                    type="button"
                    onClick={() => moveToBasket(item.handle)}
                    className="shrink-0 text-xs font-medium text-maroon-deep underline underline-offset-2 transition-colors hover:text-maroon sm:text-sm"
                  >
                    Move to basket
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Gift notice — reacts to the live subtotal */}
        {meetsGift && (
          <div className="mt-6 rounded-xl bg-gold/10 p-4 sm:p-5 sm:pl-6">
            <p className="text-[13px] font-semibold text-maroon-deep sm:text-sm">
              Your basket meets the gift condition
            </p>
            <p className="mt-1 pl-0 text-xs leading-relaxed text-clay sm:pl-6 sm:text-[13px]">
              Special gift on orders above {inr(giftThreshold)}. Your item
              subtotal is {inr(subtotal)} — strictly above {inr(giftThreshold)}.
            </p>
          </div>
        )}

        {/* Questions before checkout */}
        <div className="mt-8 rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
          <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
            Questions before checkout?
          </h2>
          <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-clay">
            Check the current Shipping Policy and Refund Policy for the terms
            that apply to your order. Product-specific questions? We can help
            you find the right information.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
            <a
              href="/pages/contact-us"
              className="group inline-flex items-center gap-1.5 text-maroon-deep underline underline-offset-2 hover:text-maroon"
            >
              Contact support
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
            <a href="/policies/shipping-policy" className="text-clay underline underline-offset-2 hover:text-maroon">
              Shipping Policy
            </a>
            <a href="/policies/refund-policy" className="text-clay underline underline-offset-2 hover:text-maroon">
              Refund Policy
            </a>
          </div>
        </div>
      </div>

      {/* Order summary */}
      <aside className="h-fit rounded-2xl border border-line bg-cream-card p-6 sm:p-8 lg:sticky lg:top-32">
        <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
          Order summary
        </h2>
        <div className="mt-6 border-t border-line pt-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">Item subtotal</p>
            <p className="font-serif text-3xl font-bold text-ink">
              {inr(subtotal)}
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <p className="text-clay">Shipping</p>
            <p className="text-clay">Calculated at checkout</p>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <p className="text-clay">Taxes</p>
            <p className="text-clay">Calculated at checkout</p>
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-clay/80">
            Final payable amount is shown when applicable shipping and taxes
            are known.
          </p>
        </div>

        {meetsGift ? (
          <div className="mt-6 rounded-xl bg-gold/10 p-4 sm:p-5">
            <p className="flex items-center gap-2 text-sm font-medium text-maroon-deep">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                className="h-4 w-4 shrink-0 text-gold-deep"
                aria-hidden
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8h.01M12 11v5" />
              </svg>
              A thoughtful extra
            </p>
            <p className="mt-1 text-xs leading-relaxed text-clay sm:text-[13px]">
              Special gift on orders above {inr(giftThreshold)}. Your{" "}
              {inr(subtotal)} basket meets the order-value condition.
            </p>
          </div>
        ) : (
          <div className="mt-6 rounded-xl bg-sand/50 p-4 sm:p-5">
            <p className="text-xs leading-relaxed text-clay sm:text-[13px]">
              Add {inr(Math.max(giftThreshold + 1 - subtotal, 0))} more to meet
              the special-gift condition of orders above {inr(giftThreshold)}.
            </p>
          </div>
        )}

        <a
          href="/checkout"
          className="btn-sheen mt-6 flex items-center justify-center gap-2.5 rounded-lg bg-ochre px-6 py-3.5 text-sm font-semibold text-maroon-dark transition-colors hover:bg-gold-deep"
        >
          Continue to checkout
          <span aria-hidden className="transition-transform">→</span>
        </a>

        <a
          href="/pages/contact-us"
          className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink underline underline-offset-2 hover:text-maroon"
        >
          Need help with your order?
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </a>
      </aside>
    </div>
  );
}
