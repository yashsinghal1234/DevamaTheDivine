"use client";

import { useState } from "react";
import { IconCardLogo, IconCircleDot } from "./../icons";

/**
 * Payment-stage design only — generic method affordances; no payment
 * integration or transaction is active.
 */
export default function PaymentMethods() {
  const [method, setMethod] = useState<"upi" | "card">("upi");

  return (
    <div>
      {/* Notice */}
      <div className="rounded-xl bg-gold/10 p-4 sm:p-5">
        <p className="flex items-center gap-2 text-sm font-medium text-maroon-deep">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            className="h-4 w-4 text-gold-deep"
            aria-hidden
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8h.01M12 11v5" />
          </svg>
          Payment-stage design only.
        </p>
        <p className="mt-1 text-xs leading-relaxed text-clay sm:text-[13px]">
          These are generic method affordances; no payment integration or
          transaction is active.
        </p>
      </div>

      {/* UPI */}
      <label className="mt-6 flex cursor-pointer items-center gap-3">
        <input
          type="radio"
          name="payment-method"
          checked={method === "upi"}
          onChange={() => setMethod("upi")}
          className="sr-only"
        />
        <IconCircleDot
          className={`h-5 w-5 transition-colors ${
            method === "upi" ? "text-maroon" : "text-clay/60"
          }`}
        />
        <span className="text-sm font-semibold text-ink">UPI</span>
        <span className="rounded-full bg-sand px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-clay">
          Selected · illustrative
        </span>
      </label>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          method === "upi" ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-5">
            <label htmlFor="upi-id" className="text-sm font-semibold text-ink">
              UPI ID
            </label>
            <input
              id="upi-id"
              value=""
              readOnly
              placeholder="yourname@upi (example format only)"
              className="mt-2 w-full cursor-not-allowed rounded-lg border border-line bg-white/60 px-4 py-3 text-sm text-clay outline-none"
            />
            <p className="mt-3 text-[11px] leading-relaxed text-clay/80">
              A real checkout would guide you through the available payment
              methods after confirming your order amount.
            </p>
          </div>
        </div>
      </div>

      <div className="my-6 h-px bg-line" />

      {/* Card */}
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="radio"
          name="payment-method"
          checked={method === "card"}
          onChange={() => setMethod("card")}
          className="sr-only"
        />
        <IconCircleDot
          className={`h-5 w-5 transition-colors ${
            method === "card" ? "text-maroon" : "text-clay/60"
          }`}
        />
        <span className="text-sm font-semibold text-ink">Credit / debit card</span>
        <IconCardLogo className="h-5 w-5 text-clay" />
      </label>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          method === "card" ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-5">
            <div className="grid grid-cols-2 gap-3">
              <input
                readOnly
                value=""
                placeholder="Card number · example"
                className="col-span-2 cursor-not-allowed rounded-lg border border-line bg-white/60 px-4 py-3 text-sm text-clay outline-none"
              />
              <input
                readOnly
                value=""
                placeholder="MM / YY · example"
                className="cursor-not-allowed rounded-lg border border-line bg-white/60 px-4 py-3 text-sm text-clay outline-none"
              />
              <input
                readOnly
                value=""
                placeholder="CVV · example"
                className="cursor-not-allowed rounded-lg border border-line bg-white/60 px-4 py-3 text-sm text-clay outline-none"
              />
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-clay/80">
              Card-entry fields appear when this method is selected. Do not
              enter real financial information in this design.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
