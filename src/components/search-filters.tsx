"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconArrowUpRight, IconChevronDown } from "./icons";

const MUKHI_OPTIONS = ["All", "2", "3", "4", "5", "6", "7"];

/**
 * Functional filter row for the search page.
 * Toggles write to the querystring (?bead=1&price=1&mukhi=5) so the
 * server component filters results and the URL is shareable.
 */
export default function SearchFilters({
  query,
  resultsCount,
}: {
  query: string;
  resultsCount: number;
}) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const bead = params.get("bead") === "1";
  const price = params.get("price") === "1";
  const mukhi = params.get("mukhi") ?? "";

  const setParam = (key: string, value: string | null) => {
    const sp = new URLSearchParams(params.toString());
    if (value) sp.set(key, value);
    else sp.delete(key);
    router.push(`${pathname}?${sp.toString()}`, { scroll: false });
  };

  return (
    <div className="-mx-4 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
      <div className="flex w-max items-center gap-2 sm:w-auto sm:flex-wrap">
        {query && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-maroon px-4 py-2 text-xs font-medium text-cream">
            {query}
            <a href="/search" aria-label="Clear search" className="opacity-80 hover:opacity-100">
              ×
            </a>
          </span>
        )}

        {/* Single beads toggle */}
        <button
          type="button"
          aria-pressed={bead}
          onClick={() => setParam("bead", bead ? null : "1")}
          className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 sm:text-[13px] ${
            bead
              ? "border-maroon bg-maroon text-cream"
              : "border-line bg-cream-card text-ink/75 hover:border-maroon/50 hover:text-maroon"
          }`}
        >
          Single beads {bead && <span aria-hidden className="ml-1 opacity-80">×</span>}
        </button>

        {/* Price cap toggle */}
        <button
          type="button"
          aria-pressed={price}
          onClick={() => setParam("price", price ? null : "1")}
          className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 sm:text-[13px] ${
            price
              ? "border-maroon bg-maroon text-cream"
              : "border-line bg-cream-card text-ink/75 hover:border-maroon/50 hover:text-maroon"
          }`}
        >
          ₹499 {price && <span aria-hidden className="ml-1 opacity-80">×</span>}
        </button>

        {/* Mukhi dropdown */}
        <label className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-cream-card px-3 py-1.5 text-xs text-ink/75 sm:text-[13px]">
          <span className="text-ink/60">Mukhi:</span>
          <select
            aria-label="Filter by Mukhi"
            value={mukhi}
            onChange={(e) => setParam("mukhi", e.target.value || null)}
            className="appearance-none bg-transparent py-0.5 pr-0.5 text-xs font-medium text-ink outline-none sm:text-[13px]"
          >
            {MUKHI_OPTIONS.map((m) => (
              <option key={m} value={m === "All" ? "" : m}>
                {m}
              </option>
            ))}
          </select>
          <IconChevronDown className="h-3 w-3 text-clay" />
        </label>

        <span className="hidden shrink-0 pl-4 text-xs text-clay sm:inline">
          {resultsCount} matching {resultsCount === 1 ? "product" : "products"} ·{" "}
          <a href="/collections/all" className="underline underline-offset-2 hover:text-maroon">
            Sort
          </a>
          : Relevance
          <IconArrowUpRight className="ml-1 inline h-3 w-3" />
        </span>
      </div>
    </div>
  );
}
