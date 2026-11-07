import Reveal from "@/components/reveal";
import StarRow from "@/components/reviews/star-row";
import ProductSelect from "@/components/reviews/product-select";
import { IconArrowUpRight } from "@/components/icons";
import type { Review } from "@/lib/types";
import { reviews as sampleReviews } from "@/lib/sample-data";

type ReviewsSearchParams = {
  collection?: string | string[];
  product?: string | string[];
};

const COLLECTION_CHIPS = [
  { slug: "", label: "All collections" },
  { slug: "rudraksha", label: "Rudraksha" },
  { slug: "karungali", label: "Karungali" },
  { slug: "bracelets", label: "Bracelets" },
  { slug: "potli", label: "Energised Potali" },
];

const PHOTOS = [
  "Product detail",
  "Your everyday piece",
  "Ritual setting",
];

function buildUrl(collection: string) {
  return collection ? `/reviews?collection=${collection}` : "/reviews";
}

export default async function ReviewsBody({
  searchParams,
}: {
  searchParams: Promise<ReviewsSearchParams>;
}) {
  const sp = await searchParams;
  const collection = [sp.collection ?? ""].flat().join(" ").trim().toLowerCase();
  const product = [sp.product ?? ""].flat().join(" ").trim().toLowerCase();

  const allReviews: Review[] = sampleReviews;

  let visible = allReviews.filter((r) => r.rating !== undefined);
  if (collection) visible = visible.filter((r) => r.collection === collection);
  if (product) visible = visible.filter((r) => r.handle === product);

  const selectableProducts = allReviews
    .filter((r) => r.handle)
    .map((r) => ({ title: r.product ?? "", handle: r.handle ?? "" }));

  return (
    <>
      {/* Experience + photos row */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Reveal>
          <section className="h-full rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
            <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
              Your experience matters
            </h2>
            <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-clay">
              Tell us about the details, materials and everyday use of your
              piece. There are no live aggregate ratings or customer counts
              displayed here.
            </p>
            <a
              href="/reviews/write"
              className="btn-sheen mt-5 inline-flex items-center gap-2.5 rounded-lg bg-ochre px-6 py-3 text-sm font-semibold text-maroon-dark transition-colors hover:bg-gold-deep"
            >
              Write a review
              <span aria-hidden className="transition-transform">→</span>
            </a>
          </section>
        </Reveal>

        <Reveal delay={120}>
          <section className="h-full rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
            <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
              Photos, when you&rsquo;re ready
            </h2>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {PHOTOS.map((label) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-xl border border-line px-3 py-5 text-center"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-clay"
                    aria-hidden
                  >
                    <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1.6a1 1 0 0 0 .83-.45l.74-1.1A1 1 0 0 1 10.5 4h3a1 1 0 0 1 .83.45l.74 1.1a1 1 0 0 0 .83.45h1.6A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5z" />
                    <circle cx="12" cy="12" r="3.2" />
                  </svg>
                  <p className="text-[11px] leading-snug text-clay/80">{label}</p>
                  <p className="text-[10px] text-clay/60">Photo placeholder</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-clay">
              No customer photos have been supplied.
            </p>
          </section>
        </Reveal>
      </div>

      {/* Filter chips + product select */}
      <div className="mt-9 flex flex-wrap items-center gap-2 -mx-4 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
        {COLLECTION_CHIPS.map((chip) => {
          const active =
            chip.slug === "" ? !collection : chip.slug === collection;
          return (
            <a
              key={chip.label}
              href={buildUrl(chip.slug)}
              aria-current={active ? "true" : undefined}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors sm:text-[13px] ${
                active
                  ? "bg-maroon text-cream"
                  : "border border-line bg-cream-card text-ink/75 hover:border-maroon/50 hover:text-maroon"
              }`}
            >
              {chip.label}
            </a>
          );
        })}
        <span className="ml-auto hidden sm:block">
          <ProductSelect products={selectableProducts} />
        </span>
      </div>

      {/* Review cards */}
      {visible.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-line bg-cream-card p-10 text-center">
          <p className="font-serif text-2xl text-ink">
            No sample reviews for this filter
          </p>
          <p className="mt-2 text-sm text-clay">
            Clear the filters to see all four illustrative stories again.
          </p>
          <a
            href="/reviews"
            className="mt-4 inline-block text-xs font-medium text-clay underline underline-offset-2 hover:text-maroon"
          >
            Clear filters
          </a>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {visible.map((review, i) => (
            <Reveal key={review.title} delay={Math.min(i, 3) * 90} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
                <p className="eyebrow text-terracotta">
                  Illustrative review · Sample feedback
                </p>
                <div className="mt-3 flex items-center gap-2.5">
                  <StarRow rating={review.rating ?? 0} />
                  <span aria-hidden className="text-clay/50">·</span>
                  <span className="text-xs text-clay sm:text-[13px]">
                    Sample star display
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-3xl font-medium leading-snug text-ink sm:text-4xl">
                  {review.title}
                </h3>
                <p className="mt-4 flex-1 text-sm font-light leading-relaxed text-clay sm:text-[15px]">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <p className="mt-5 pl-5 text-[13px] text-clay sm:pl-0 sm:text-sm">
                  {review.product} /{" "}
                  {COLLECTION_CHIPS.find((c) => c.slug === review.collection)?.label ?? review.collection}
                </p>
                <a
                  href={`/products/${review.handle}`}
                  className="group mt-4 inline-flex items-center gap-1.5 pl-5 text-[13px] font-semibold text-ink underline underline-offset-2 hover:text-maroon sm:pl-0 sm:text-sm"
                >
                  Explore this product
                  <IconArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <Reveal className="mt-8">
        <div className="rounded-xl bg-gold/10 p-4 sm:p-5">
          <p className="flex items-start gap-2 text-[13px] font-semibold text-maroon-deep sm:text-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              className="mt-0.5 h-4 w-4 shrink-0 text-maroon-deep"
              aria-hidden
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8h.01M12 11v5" />
            </svg>
          </p>
          <p className="mt-1 pl-6 text-xs leading-relaxed text-clay sm:text-[13px]">
            All text and stars above are examples. Replace them with genuine
            customer feedback before launch; no verified-purchase badges or
            real customer identities are shown.
          </p>
        </div>
      </Reveal>
    </>
  );
}
