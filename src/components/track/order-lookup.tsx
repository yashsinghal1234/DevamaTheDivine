"use client";

import { useState } from "react";

/**
 * Illustrative lookup for the order-tracking design. It only validates the
 * two fields and surfaces the sample order below — a real implementation
 * would call Shopify's Orders API (or your order-status provider) here.
 */
export default function OrderLookup() {
  const [orderId, setOrderId] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  return (
    <div>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (!orderId.trim() || contact.trim().length < 3) {
            setError(
              "Enter your order reference and the email or phone used at checkout."
            );
            return;
          }
          setError(null);
          setSearched(true);
        }}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="order-id" className="text-sm font-medium text-ink">
              Order ID
            </label>
            <input
              id="order-id"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter your order reference"
              className={`mt-2 w-full rounded-lg border bg-white/70 px-4 py-3 text-sm outline-none transition-colors focus:border-gold-deep ${
                error && !orderId.trim() ? "border-terracotta" : "border-line"
              }`}
            />
          </div>
          <div>
            <label
              htmlFor="order-contact"
              className="text-sm font-medium text-ink"
            >
              Order contact
            </label>
            <input
              id="order-contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Email or phone used at checkout"
              className={`mt-2 w-full rounded-lg border bg-white/70 px-4 py-3 text-sm outline-none transition-colors focus:border-gold-deep ${
                error && contact.trim().length < 3
                  ? "border-terracotta"
                  : "border-line"
              }`}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <p className="text-[11px] leading-relaxed text-clay/80 sm:flex-1">
            {error
              ? error
              : searched
                ? "Showing the latest available information for your reference below."
                : "Use the details from your order information. The example below is separate from this empty lookup."}
          </p>
          <button
            type="submit"
            className="btn-sheen inline-flex shrink-0 items-center justify-center gap-2.5 rounded-lg bg-ochre px-6 py-3 text-sm font-medium text-maroon-dark transition-colors hover:bg-gold-deep"
          >
            Find order
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              className="h-4 w-4"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
