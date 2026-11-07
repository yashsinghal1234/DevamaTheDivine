import { Suspense } from "react";
import Reveal from "@/components/reveal";
import ReviewsBody from "@/components/reviews/reviews-body";

export const metadata = { title: "Reviews — Devama The Divine" };

export default function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{
    collection?: string | string[];
    product?: string | string[];
  }>;
}) {
  return (
    <main className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[11px] text-clay sm:text-xs">
          <a href="/" className="hover:text-maroon">Home</a>
          <span className="px-1.5">/</span>
          <span className="text-ink/70">Reviews</span>
        </nav>

        <Reveal>
          <p className="eyebrow mt-4 text-terracotta">Space for your stories</p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.08] text-ink sm:text-6xl">
            Every sacred journey has a story
          </h1>
          <p className="mt-3 max-w-lg text-sm font-light text-clay">
            A space for thoughtful product feedback, shared experiences and
            considered choices.
          </p>
        </Reveal>

        {/* Review examples notice */}
        <Reveal className="mt-8">
          <div className="rounded-2xl bg-maroon px-6 py-5 text-cream sm:px-8">
            <p className="flex items-start gap-2 text-sm font-semibold">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                aria-hidden
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8h.01M12 11v5" />
              </svg>
              Review examples only
            </p>
            <p className="mt-1 text-xs font-light leading-relaxed text-cream/75 sm:pl-6 sm:text-[13px]">
              Sample reviews — replace with customer feedback before launch.
            </p>
          </div>
        </Reveal>

        <Suspense fallback={<div className="mt-10 h-72 animate-pulse rounded-2xl bg-line/60" />}>
          <ReviewsBody searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
