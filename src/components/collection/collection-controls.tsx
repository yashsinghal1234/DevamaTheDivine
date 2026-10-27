"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Collection search box and sort dropdown — both functional via the
 * querystring (?q=…&sort=price-asc), keeping everything server-filtered.
 */
export default function CollectionControls({
  query,
  sort,
}: {
  query: string;
  sort: string;
}) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(query);

  const navigate = (updates: Record<string, string | null>) => {
    const sp = new URLSearchParams(params.toString());
    for (const [key, v] of Object.entries(updates)) {
      if (v) sp.set(key, v);
      else sp.delete(key);
    }
    sp.delete("page");
    const qs = sp.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const sorts = [
    { value: "featured", label: "Featured essentials" },
    { value: "price-asc", label: "Price: low to high" },
    { value: "price-desc", label: "Price: high to low" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ q: value.trim() || null });
        }}
      >
        <label htmlFor="collection-search" className="text-xs font-medium text-ink">
          Search the collection
        </label>
        <input
          id="collection-search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search by product or material"
          className="mt-2 w-full rounded-lg border border-line bg-white/70 px-4 py-3 text-sm outline-none transition-colors focus:border-gold-deep"
        />
      </form>

      <div className="sm:self-end">
        <label htmlFor="collection-sort" className="sr-only">
          Sort products
        </label>
        <select
          id="collection-sort"
          value={sort}
          onChange={(e) => navigate({ sort: e.target.value === "featured" ? null : e.target.value })}
          className="mt-2 w-full cursor-pointer rounded-lg border border-line bg-white/70 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold-deep sm:w-64"
        >
          {sorts.map((s) => (
            <option key={s.value} value={s.value}>
              Sort: {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
