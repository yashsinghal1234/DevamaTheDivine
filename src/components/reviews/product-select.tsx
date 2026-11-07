"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * "Product: All" dropdown on the reviews page — functional via the
 * querystring (?product=karungali-mala-original), server-filtered.
 */
export default function ProductSelect({ products }: { products: { title: string; handle: string }[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const value = params.get("product") ?? "";

  return (
    <label className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-cream-card px-4 py-2 text-xs text-ink sm:text-[13px]">
      <span className="text-clay">Product:</span>
      <select
        aria-label="Filter reviews by product"
        value={value}
        onChange={(e) => {
          const sp = new URLSearchParams(params.toString());
          if (e.target.value) sp.set("product", e.target.value);
          else sp.delete("product");
          const qs = sp.toString();
          router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
        }}
        className="cursor-pointer appearance-none bg-transparent text-[13px] font-medium text-ink outline-none"
      >
        <option value="">All</option>
        {products.map((p) => (
          <option key={p.handle} value={p.handle}>
            {p.title}
          </option>
        ))}
      </select>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" className="h-3.5 w-3.5 text-clay" aria-hidden>
        <path d="M6 9l6 6 6-6" />
      </svg>
    </label>
  );
}
