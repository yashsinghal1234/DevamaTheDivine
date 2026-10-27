import { Suspense } from "react";
import Reveal from "@/components/reveal";
import ProductCard from "@/components/product-card";
import SearchFilters from "@/components/search-filters";
import { IconSearch, IconArrowUpRight } from "@/components/icons";
import { getSearchResults } from "@/lib/shopify";

export const metadata = { title: "Search — Devama The Divine" };

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string | string[];
    bead?: string | string[];
    price?: string | string[];
    mukhi?: string | string[];
  }>;
}) {
  return (
    <main className="min-h-[60vh] bg-cream">
      <Suspense fallback={<SearchSkeleton />}>
        <SearchBody searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

function SearchSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
      <div className="h-3 w-40 animate-pulse rounded bg-line" />
      <div className="mt-6 h-12 w-2/3 max-w-xl animate-pulse rounded bg-line" />
      <div className="mt-10 h-64 animate-pulse rounded-2xl bg-line/60" />
    </div>
  );
}

async function SearchBody({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string | string[];
    bead?: string | string[];
    price?: string | string[];
    mukhi?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const flat = (v?: string | string[]) =>
    (Array.isArray(v) ? v.join(" ") : (v ?? "")).trim();
  const query = flat(params.q);
  const results = await getSearchResults(query);

  // ---- Apply the functional filters from the querystring ----
  let filtered = results;

  // "Single beads": beads & malas stay, bracelets and potlis drop.
  if (flat(params.bead) === "1") {
    filtered = filtered.filter(
      (p) => /bead/i.test(p.title) && !/bracelet|potli|potl/i.test(p.title)
    );
  }

  // "₹499": only pieces at ₹499 or under.
  if (flat(params.price) === "1") {
    filtered = filtered.filter((p) => p.price <= 499);
  }

  // "Mukhi: N": matches "N Mukhi …" titles.
  const mukhi = flat(params.mukhi);
  if (mukhi && mukhi !== "All" && /^\d+$/.test(mukhi)) {
    filtered = filtered.filter(
      (p) => new RegExp(`^${mukhi}\\s+Mukhi`, "i").test(p.title)
    );
  }

  // Contextual sidebar: the Mukhi guide only matters for Rudraksha searches.
  const isRudrakshaSearch = /rudraksha|mukhi|bead/i.test(query);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-[11px] text-clay sm:text-xs">
        <a href="/" className="hover:text-maroon">Home</a>
        <span className="px-1.5">/</span>
        <span>Search</span>
        {query && (
          <>
            <span className="px-1.5">/</span>
            <span className="text-ink/70">{query}</span>
          </>
        )}
      </nav>

      <Reveal>
        <p className="eyebrow mt-4 text-terracotta">Find what speaks to you</p>
        <h1 className="mt-3 max-w-2xl font-serif text-4xl font-medium leading-[1.08] text-ink sm:text-6xl">
          Your search for &ldquo;{query || "…"}&rdquo;
        </h1>
        <p className="mt-3 max-w-md text-sm font-light text-clay">
          Explore listings, compare details to find your considered choice.
        </p>

        {/* Functional filters + live count */}
        <div className="mt-6">
          <SearchFilters query={query} resultsCount={filtered.length} />
        </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px] lg:gap-12">
        {/* All results as cards */}
        <div>
          {results.length === 0 ? (
            <div className="rounded-2xl border border-line bg-cream-card p-10 text-center">
              <p className="font-serif text-2xl text-ink">
                No pieces matched &ldquo;{query}&rdquo;
              </p>
              <p className="mt-2 text-sm text-clay">
                Try a shorter product name — e.g. &ldquo;Rudraksha&rdquo;, &ldquo;Karungali&rdquo; or &ldquo;Amethyst&rdquo;.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border border-line bg-cream-card p-10 text-center">
              <p className="font-serif text-2xl text-ink">
                Your filters removed every match
              </p>
              <p className="mt-2 text-sm text-clay">
                Loosen a filter above to see the pieces again.
              </p>
              <a
                href={`/search?q=${encodeURIComponent(query)}`}
                className="mt-4 inline-block text-xs font-medium text-clay underline underline-offset-2 hover:text-maroon"
              >
                Clear all filters
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-3 lg:gap-x-6">
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i, 4) * 90} className="h-full">
                  <ProductCard product={p} notePrefix="" />
                </Reveal>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {isRudrakshaSearch ? (
            <Reveal delay={150}>
              <div className="rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
                <h3 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
                  Find your Mukhi
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-clay">
                  Mukhi refers to the natural faces or divisions of a
                  Rudraksha bead. Choose by your tradition, intended practice
                  and the information in each listing.
                </p>
                <div className="my-6 h-px bg-line" />
                <h4 className="font-serif text-2xl font-semibold text-ink">
                  Before you choose
                </h4>
                <p className="mt-3 text-sm font-light leading-relaxed text-clay">
                  Check material, bead details and any product-specific
                  certification information. Ask us if a detail is unclear;
                  no spiritual outcome is guaranteed.
                </p>
                <a
                  href="/collections/rudraksha"
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-ink/30 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-maroon hover:bg-maroon hover:text-cream"
                >
                  Choosing Rudraksha
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={150}>
              <div className="rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
                <h3 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
                  How to compare pieces
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-clay">
                  Each listing carries product-specific authenticity details,
                  material information and care guidance. Take your time with
                  the details — that&apos;s where the meaning is.
                </p>
                <div className="my-6 h-px bg-line" />
                <h4 className="font-serif text-2xl font-semibold text-ink">
                  Before you choose
                </h4>
                <p className="mt-3 text-sm font-light leading-relaxed text-clay">
                  Check material, finish and any certification information.
                  Ask us if a detail is unclear; we&apos;re happy to help with
                  clarity.
                </p>
                <a
                  href="/collections/all"
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-ink/30 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-maroon hover:bg-maroon hover:text-cream"
                >
                  Browse all essentials
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </div>
            </Reveal>
          )}

          <Reveal delay={250}>
            <div className="rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
              <h3 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
                Try a different search
              </h3>
              <form action="/search" className="mt-5">
                <label htmlFor="q" className="text-sm font-medium text-ink">
                  Search products
                </label>
                <input
                  id="q"
                  name="q"
                  placeholder="e.g. Karungali or Amethyst"
                  className="mt-2 w-full rounded-lg border border-line bg-white/70 px-4 py-2.5 text-sm outline-none transition-colors focus:border-gold-deep"
                />
                <button
                  type="submit"
                  className="btn-sheen mt-3 flex w-full items-center justify-center gap-2.5 rounded-lg bg-gold px-6 py-3 text-sm font-medium text-maroon-dark transition-colors hover:bg-gold-deep"
                >
                  Search
                  <IconSearch className="h-4 w-4" />
                </button>
              </form>
              <p className="mt-4 text-xs leading-relaxed text-clay">
                If no products match, try a shorter product name or browse
                the collection. You can always ask for help finding a
                piece.
              </p>
              <a
                href="/collections/all"
                className="group mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-clay underline underline-offset-2 hover:text-maroon"
              >
                Browse all essentials
                <IconArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
