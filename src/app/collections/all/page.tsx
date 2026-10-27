import { Suspense } from "react";
import Image from "next/image";
import Reveal from "@/components/reveal";
import ProductCard from "@/components/product-card";
import CollectionFilters from "@/components/collection/collection-filters";
import CollectionControls from "@/components/collection/collection-controls";
import GiftBanner from "@/components/gift-banner";
import {
  CATEGORY_FILTERS,
  MATERIAL_FILTERS,
  PRICE_FILTERS,
  categorySlug,
  materialSlugs,
  parseList,
  priceRange,
} from "@/lib/collection-filters";
import { getProducts } from "@/lib/shopify";

export const metadata = { title: "Shop All — Devama The Divine" };

const PER_PAGE = 6;

type CollectionsSearchParams = {
  q?: string | string[];
  sort?: string | string[];
  cat?: string | string[];
  mat?: string | string[];
  price?: string | string[];
  page?: string | string[];
};

function chipLabel(group: "cat" | "mat" | "price", slug: string): string | null {
  if (group === "cat")
    return CATEGORY_FILTERS.find((f) => f.slug === slug)?.label ?? null;
  if (group === "mat")
    return MATERIAL_FILTERS.find((f) => f.slug === slug)?.label ?? null;
  return priceRange(slug)?.chip ?? null;
}

async function CollectionBody({
  searchParams,
}: {
  searchParams: Promise<CollectionsSearchParams>;
}) {
  const sp = await searchParams;
  const query = [sp.q ?? ""].flat().join(" ").trim();
  const sortRaw = [sp.sort ?? ""].flat().join(" ");
  const sort = sortRaw === "price-asc" || sortRaw === "price-desc" ? sortRaw : "featured";
  const cats = parseList(sp.cat);
  const mats = parseList(sp.mat);
  const prices = parseList(sp.price);
  const page = Math.max(
    1,
    Number.parseInt([sp.page ?? "1"].flat().join(" "), 10) || 1
  );

  const all = await getProducts();
  let list = [...all];

  if (query) {
    const q = query.toLowerCase();
    list = list.filter((p) => p.title.toLowerCase().includes(q));
  }
  if (cats.length > 0) {
    list = list.filter((p) => cats.includes(categorySlug(p)));
  }
  if (mats.length > 0) {
    list = list.filter((p) => mats.some((m) => materialSlugs(p).includes(m)));
  }
  if (prices.length > 0) {
    list = list.filter((p) =>
      prices.some((slug) => {
        const range = priceRange(slug);
        return range ? p.price >= range.min && p.price <= range.max : true;
      })
    );
  }

  if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list.sort((a, b) => b.price - a.price);

  const total = list.length;
  const pageCount = Math.max(1, Math.ceil(total / PER_PAGE));
  const current = Math.min(page, pageCount);
  const visible = list.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  /** URL builder preserving the other active filters. */
  const buildUrl = (over: Partial<CollectionsSearchParams> = {}) => {
    const usp = new URLSearchParams();
    if (query) usp.set("q", query);
    if (sort !== "featured") usp.set("sort", sort);
    if (cats.length) usp.set("cat", cats.join(","));
    if (mats.length) usp.set("mat", mats.join(","));
    if (prices.length) usp.set("price", prices.join(","));
    if (current > 1) usp.set("page", String(current));
    for (const [key, v] of Object.entries(over)) {
      if (v === undefined || v === "") usp.delete(key);
      else usp.set(key, String(v));
    }
    const qs = usp.toString();
    return `/collections/all${qs ? `?${qs}` : ""}`;
  };

  const chips: { href: string; label: string }[] = [
    ...cats.map((slug) => ({
      href: buildUrl({ cat: cats.filter((s) => s !== slug).join(",") || undefined }),
      label: chipLabel("cat", slug) ?? slug,
    })),
    ...mats.map((slug) => ({
      href: buildUrl({ mat: mats.filter((s) => s !== slug).join(",") || undefined }),
      label: chipLabel("mat", slug) ?? slug,
    })),
    ...prices.map((slug) => ({
      href: buildUrl({ price: prices.filter((s) => s !== slug).join(",") || undefined }),
      label: chipLabel("price", slug) ?? slug,
    })),
  ];

  return (
    <>
      <CollectionControls query={query} sort={sort} />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[250px_1fr] lg:gap-12">
        <CollectionFilters />

        <div id="collection-results" className="scroll-mt-32">
          {/* Active filters + count */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <div className="flex flex-wrap items-center gap-2">
              {chips.length === 0 ? (
                <span className="text-[11px] tracking-wide text-clay/70 sm:text-xs">
                  No filters applied yet
                </span>
              ) : (
                <>
                  {chips.map((chip) => (
                    <a
                      key={chip.label}
                      href={chip.href}
                      className="inline-flex items-center gap-1.5 rounded-full bg-maroon px-4 py-2 text-xs font-medium text-cream transition-colors hover:bg-maroon-deep"
                    >
                      {chip.label}
                      <span aria-hidden className="opacity-80">×</span>
                    </a>
                  ))}
                  <a
                    href={buildUrl({ cat: undefined, mat: undefined, price: undefined })}
                    className="text-xs font-medium text-clay underline underline-offset-2 hover:text-maroon"
                  >
                    Clear all
                  </a>
                </>
              )}
            </div>
            <p className="ml-auto text-xs text-clay sm:text-[13px]">
              Showing {total} of {all.length} products
            </p>
          </div>

          {/* Grid */}
          {total === 0 ? (
            <div className="mt-6 rounded-2xl border border-line bg-cream-card p-10 text-center">
              <p className="font-serif text-2xl text-ink">
                No pieces match these filters
              </p>
              <p className="mt-2 text-sm text-clay">
                Reset the filters to browse the full collection.
              </p>
              <a
                href={buildUrl({ cat: undefined, mat: undefined, price: undefined, q: undefined })}
                className="mt-4 inline-block text-xs font-medium text-clay underline underline-offset-2 hover:text-maroon"
              >
                Clear all filters
              </a>
            </div>
          ) : (
            <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-x-5">
              {visible.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i, 5) * 90} className="h-full">
                  <ProductCard product={p} notePrefix="" />
                </Reveal>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pageCount > 1 && (
            <nav
              aria-label="Pages"
              className="mt-12 flex items-center justify-center gap-3"
            >
              {current > 1 ? (
                <a
                  href={buildUrl({ page: String(current - 1) })}
                  className="rounded-full border border-line bg-cream-card px-4 py-2 text-xs font-medium text-ink transition-colors hover:border-maroon hover:text-maroon"
                >
                  ← Previous
                </a>
              ) : (
                <span
                  aria-disabled
                  className="rounded-full border border-line/60 px-4 py-2 text-xs font-medium text-clay/40"
                >
                  ← Previous
                </span>
              )}

              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <a
                  key={n}
                  href={buildUrl({ page: n === 1 ? undefined : String(n) })}
                  aria-current={n === current ? "page" : undefined}
                  className={`h-9 w-9 rounded-full text-center text-sm leading-9 transition-colors ${
                    n === current
                      ? "bg-maroon text-cream"
                      : "border border-line bg-cream-card text-ink hover:border-maroon hover:text-maroon"
                  }`}
                >
                  {n}
                </a>
              ))}

              {current < pageCount ? (
                <a
                  href={buildUrl({ page: String(current + 1) })}
                  className="rounded-full border border-line bg-cream-card px-4 py-2 text-xs font-medium text-ink transition-colors hover:border-maroon hover:text-maroon"
                >
                  Next →
                </a>
              ) : (
                <span
                  aria-disabled
                  className="rounded-full border border-line/60 px-4 py-2 text-xs font-medium text-clay/40"
                >
                  Next →
                </span>
              )}
            </nav>
          )}
        </div>
      </div>
    </>
  );
}

export default function ShopAllPage({
  searchParams,
}: {
  searchParams: Promise<CollectionsSearchParams>;
}) {
  return (
    <main className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[11px] text-clay sm:text-xs">
          <a href="/" className="hover:text-maroon">
            Home
          </a>
          <span className="px-1.5">/</span>
          <span className="text-ink/70">Shop all</span>
        </nav>

        <Reveal>
          <p className="eyebrow mt-4 text-terracotta">The Devama Edit</p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.08] text-ink sm:text-6xl">
            Sacred essentials, thoughtfully selected
          </h1>
          <p className="mt-3 max-w-lg text-sm font-light text-clay">
            Browse Rudraksha, sacred wood, bracelets and ritual essentials at
            your own pace.
          </p>
        </Reveal>

        <div className="mt-9">
          <Suspense fallback={<div className="h-40" />}>
            <CollectionBody searchParams={searchParams} />
          </Suspense>
        </div>

        {/* Gift banner */}
        <Reveal className="mt-14">
          <GiftBanner />
        </Reveal>
      </div>
    </main>
  );
}
