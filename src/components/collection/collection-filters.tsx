"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconArrowUpRight, IconSliders } from "../icons";
import {
  CATEGORY_FILTERS,
  MATERIAL_FILTERS,
  PRICE_FILTERS,
  type FilterDef,
} from "@/lib/collection-filters";

/**
 * "Refine your collection" sidebar. Every checkbox writes to the querystring
 * (?cat=…&mat=…&price=…) immediately, so the server re-filters and the URL
 * stays shareable. The same body renders inside a mobile collapsible.
 */

const CHECK_MARK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f6ead8' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 13l4 4L19 7'/%3E%3C/svg%3E\")";

function selectedValues(params: URLSearchParams, key: string): string[] {
  return (params.get(key) ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function FilterCheckbox({
  groupKey,
  slug,
  label,
}: {
  groupKey: string;
  slug: string;
  label: string;
}) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const checked = selectedValues(params, groupKey).includes(slug);

  const toggle = () => {
    const set = new Set(selectedValues(params, groupKey));
    if (set.has(slug)) set.delete(slug);
    else set.add(slug);
    const sp = new URLSearchParams(params.toString());
    if (set.size > 0) sp.set(groupKey, Array.from(set).join(","));
    else sp.delete(groupKey);
    sp.delete("page"); // filters reset pagination
    router.push(`${pathname}?${sp.toString()}`, { scroll: false });
  };

  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-clay">
      <input
        type="checkbox"
        checked={checked}
        onChange={toggle}
        className="h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-sm border border-ink/30 bg-cream-card transition-colors checked:border-maroon checked:bg-maroon"
        style={checked ? { backgroundImage: CHECK_MARK, backgroundPosition: "center", backgroundSize: "70%", backgroundRepeat: "no-repeat" } : undefined}
      />
      {label}
    </label>
  );
}

function FilterGroup({
  title,
  groupKey,
  defs,
  divided,
}: {
  title: string;
  groupKey: string;
  defs: FilterDef[];
  divided?: boolean;
}) {
  return (
    <fieldset className={divided ? "mt-7 border-t border-line pt-6" : ""}>
      <legend className="text-sm font-semibold text-ink">{title}</legend>
      <div className="mt-3 space-y-2.5">
        {defs.map((def) => (
          <FilterCheckbox key={def.slug} groupKey={groupKey} slug={def.slug} label={def.label} />
        ))}
      </div>
    </fieldset>
  );
}

function FiltersBody() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const resetUrl = () => {
    const sp = new URLSearchParams(params.toString());
    sp.delete("cat");
    sp.delete("mat");
    sp.delete("price");
    sp.delete("page");
    const qs = sp.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        document
          .getElementById("collection-results")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      <FilterGroup title="Category" groupKey="cat" defs={CATEGORY_FILTERS} />
      <FilterGroup title="Material" groupKey="mat" defs={MATERIAL_FILTERS} divided />
      <FilterGroup title="Price" groupKey="price" defs={PRICE_FILTERS} divided />

      <button
        type="submit"
        className="btn-sheen mt-8 flex w-full items-center justify-center gap-2.5 rounded-lg border border-ink/25 bg-cream-card px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-maroon hover:bg-maroon hover:text-cream"
      >
        Apply filters
        <IconSliders className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={resetUrl}
        className="mt-4 text-sm font-medium text-clay underline underline-offset-2 hover:text-maroon"
      >
        Reset all filters
      </button>
    </form>
  );
}

function ClarityCard() {
  return (
    <div className="mt-8 rounded-xl bg-sand/60 p-5">
      <p className="eyebrow text-terracotta">Choose with clarity</p>
      <p className="mt-2.5 text-[13px] font-light leading-relaxed text-clay">
        Compare material, Mukhi and product-specific authenticity details
        before choosing.
      </p>
      <a
        href="/faq"
        className="group mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-maroon-deep underline underline-offset-2 hover:text-maroon"
      >
        Explore our FAQ
        <IconArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  );
}

export default function CollectionFilters() {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <h2 className="font-serif text-3xl font-medium leading-tight text-ink">
          Refine your
          <br />
          collection
        </h2>
        <div className="mt-6">
          <FiltersBody />
        </div>
        <ClarityCard />
      </aside>

      {/* Mobile collapsible */}
      <details className="rounded-xl border border-line bg-cream-card lg:hidden">
        <summary className="flex cursor-pointer items-center justify-between px-5 py-3.5 text-sm font-semibold text-ink">
          Refine your collection
          <span className="text-[10px] font-medium tracking-wide text-clay">
            TAP TO TOGGLE
          </span>
        </summary>
        <div className="border-t border-line px-5 py-5">
          <FiltersBody />
          <ClarityCard />
        </div>
      </details>
    </>
  );
}
