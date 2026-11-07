"use client";

import { useState } from "react";

/**
 * Design-stage save affordance: shows confirmation feedback only. A real
 * account system (Shopify customer API) would replace this entirely.
 */
export default function ProfileForm({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 4000);
      }}
    >
      {children}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="btn-sheen inline-flex items-center justify-center gap-2.5 rounded-lg bg-ochre px-6 py-3 text-sm font-semibold text-maroon-dark transition-colors hover:bg-gold-deep"
        >
          Save profile
          <span aria-hidden className="transition-transform">→</span>
        </button>
        <span
          aria-live="polite"
          className={`text-xs text-clay transition-opacity duration-300 ${
            saved ? "opacity-100" : "opacity-0"
          }`}
        >
          Saved for this demo session — no account is stored or changed.
        </span>
      </div>
    </form>
  );
}
