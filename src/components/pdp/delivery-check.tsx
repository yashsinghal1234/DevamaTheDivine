"use client";

import { useState } from "react";

export default function DeliveryCheck() {
  const [pin, setPin] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="mt-6 rounded-xl bg-cream-card p-5 ring-1 ring-line">
      <label htmlFor="pincode" className="text-sm font-medium text-ink">
        Check delivery information
      </label>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          id="pincode"
          inputMode="numeric"
          placeholder="Enter your 6-digit postcode"
          value={pin}
          onChange={(e) => {
            setPin(e.target.value.replace(/\D/g, "").slice(0, 6));
            setError(false);
            setChecked(false);
          }}
          className={`min-w-0 flex-1 rounded-lg border bg-white/70 px-4 py-2.5 text-sm outline-none transition-colors focus:border-gold-deep ${
            error ? "border-terracotta" : "border-line"
          }`}
        />
        <button
          type="button"
          onClick={() => {
            if (pin.length === 6) setChecked(true);
            else setError(true);
          }}
          className="rounded-lg border border-ink/25 bg-cream px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-maroon hover:bg-maroon hover:text-cream"
        >
          Check
        </button>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-clay">
        {error
          ? "Please enter a valid 6-digit postcode."
          : checked
            ? "Address noted. Availability, shipping fees and timing depend on your postcode and current store terms."
            : "Availability, shipping fees and timing depend on your address and current store terms. No estimate is shown until checked."}
      </p>
    </div>
  );
}
