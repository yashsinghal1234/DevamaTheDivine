"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { inr } from "@/lib/format";

export type ReviewFormProduct = {
  handle: string;
  title: string;
  price: number;
  compareAt?: number;
  image: string;
  alt: string;
  category: string;
  material: string;
};

const STAR_COUNT = 5;

/**
 * Static review-submission design: selection, star picking and photo
 * preview all update the form, but nothing is transmitted anywhere.
 */
export default function ReviewForm({ products }: { products: ReviewFormProduct[] }) {
  const [selected, setSelected] = useState(products[0]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [files, setFiles] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr] lg:gap-10">
      {/* Form */}
      <section className="rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
        <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
          Your product experience
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          {/* Product select */}
          <div className="mt-6">
            <label htmlFor="review-product" className="text-sm font-medium text-ink">
              Select a product <span className="text-terracotta">*</span>
            </label>
            <select
              id="review-product"
              value={selected.handle}
              onChange={(e) =>
                setSelected(
                  products.find((p) => p.handle === e.target.value) ?? products[0]
                )
              }
              className="mt-2 w-full cursor-pointer rounded-lg border border-gold-deep/70 bg-white/70 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold-deep focus:ring-1 focus:ring-gold/50"
            >
              {products.map((p) => (
                <option key={p.handle} value={p.handle}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {/* Stars */}
          <div className="mt-6">
            <p className="text-sm font-medium text-ink">Your rating (optional)</p>
            <div
              className="mt-2 flex items-center gap-1.5"
              onMouseLeave={() => setHover(0)}
            >
              {Array.from({ length: STAR_COUNT }, (_, i) => i + 1).map((n) => {
                const active = n <= (hover || rating);
                return (
                  <button
                    key={n}
                    type="button"
                    aria-label={`Rate ${n} out of 5`}
                    onMouseEnter={() => setHover(n)}
                    onClick={() => setRating(n)}
                    className="transition-transform hover:scale-110"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-8 w-8 ${active ? "text-gold-deep" : "text-clay/60"}`}
                      aria-hidden
                    >
                      <path
                        fill={active ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="1.4"
                        d="M12 3.6l2.5 5 5.5.8-4 3.9.95 5.5-4.95-2.6-4.95 2.6.95-5.5-4-3.9 5.5-.8z"
                      />
                    </svg>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-clay">
              {rating === 0
                ? "No rating selected · choose a star to rate"
                : `You selected ${rating} of 5 stars`}
            </p>
          </div>

          {/* Title */}
          <div className="mt-6">
            <label htmlFor="review-title" className="text-sm font-medium text-ink">
              Review title <span className="text-terracotta">*</span>
            </label>
            <input
              id="review-title"
              placeholder="What would you like others to know?"
              className="mt-2 w-full rounded-lg border border-gold-deep/70 bg-white/70 px-4 py-3 text-sm outline-none transition-colors placeholder:text-clay/70 focus:border-gold-deep focus:ring-1 focus:ring-gold/50"
            />
          </div>

          {/* Body */}
          <div className="mt-5">
            <label htmlFor="review-body" className="text-sm font-medium text-ink">
              Your review <span className="text-terracotta">*</span>
            </label>
            <textarea
              id="review-body"
              rows={5}
              placeholder="Describe the material, details, care or everyday use of your piece. Share only what you personally experienced."
              className="mt-2 w-full resize-y rounded-lg border border-gold-deep/70 bg-white/70 px-4 py-3 text-sm outline-none transition-colors placeholder:text-clay/70 focus:border-gold-deep focus:ring-1 focus:ring-gold/50"
            />
          </div>

          {/* Photo upload */}
          <div className="mt-5 rounded-xl border border-dashed border-line px-6 py-8 text-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto h-6 w-6 text-gold-deep"
              aria-hidden
            >
              <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1.6a1 1 0 0 0 .83-.45l.74-1.1A1 1 0 0 1 10.5 4h3a1 1 0 0 1 .83.45l.74 1.1a1 1 0 0 0 .83.45h1.6A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5z" />
              <circle cx="9" cy="12" r="1.6" />
              <path d="M17.5 7.5v4M19.5 9.5h-4" />
            </svg>
            <p className="mt-2 text-sm font-semibold text-ink">
              Add your product photos (optional)
            </p>
            <p className="mt-1 text-xs text-clay">
              {files.length > 0
                ? `Selected: ${files.join(", ")} (preview only)`
                : "Choose photos · No files uploaded"}
            </p>
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(e) => {
                const list = e.target.files;
                setFiles(list ? Array.from(list).map((f) => f.name) : []);
              }}
            />
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="group mt-4 inline-flex items-center gap-2.5 rounded-lg border border-gold-deep px-5 py-2.5 text-sm font-semibold text-maroon-deep transition-colors hover:bg-gold/10"
            >
              Choose photos
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5"
                aria-hidden
              >
                <path d="M12 16V6" />
                <path d="M7.5 10.5L12 6l4.5 4.5" />
                <path d="M5 18h14" />
              </svg>
            </button>
          </div>

          {/* Honesty notice */}
          <div className="mt-6 rounded-xl bg-gold/10 p-4 sm:p-5">
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
              Keep it honest and personal
            </p>
            <p className="mt-1 pl-6 text-xs leading-relaxed text-clay sm:text-[13px]">
              Share genuine feedback and only photos you have permission to
              use. Avoid private contact details, other people&rsquo;s personal
              information and promises of health, wealth or spiritual outcomes.
            </p>
          </div>

          {/* Consent */}
          <label className="mt-6 flex cursor-pointer items-start gap-2.5 text-sm text-clay">
            <input
              type="checkbox"
              required
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-sm border border-ink/30 bg-white/70 transition-colors checked:border-maroon checked:bg-maroon"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f6ead8' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 13l4 4L19 7'/%3E%3C/svg%3E\")",
                backgroundPosition: "center",
                backgroundSize: "70%",
                backgroundRepeat: "no-repeat",
              }}
            />
            I confirm this is my own experience and I have permission to share
            any photos I include.
          </label>

          {/* Actions */}
          <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
            <a
              href="/reviews"
              className="inline-flex items-center justify-center gap-2 text-sm font-medium text-clay underline underline-offset-2 hover:text-maroon"
            >
              <span aria-hidden>←</span>
              Back to reviews
            </a>
            <button
              type="submit"
              className="btn-sheen inline-flex items-center justify-center gap-2.5 rounded-lg bg-ochre px-6 py-3.5 text-sm font-semibold text-maroon-dark transition-colors hover:bg-gold-deep"
            >
              Submit review
              <span aria-hidden className="transition-transform">→</span>
            </button>
          </div>
          <p
            aria-live="polite"
            className={`mt-4 text-xs text-clay transition-opacity duration-300 ${
              submitted ? "opacity-100" : "opacity-0"
            }`}
          >
            Review staged for this demo only — no review, rating or photo is
            submitted anywhere.
          </p>
        </form>
      </section>

      {/* Right column */}
      <div className="space-y-5">
        <section className="rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
          <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
            The piece you&rsquo;re reviewing
          </h2>
          <div className="relative mt-5 aspect-square overflow-hidden rounded-2xl bg-sand/60">
            <Image
              src={selected.image}
              alt={selected.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 360px"
              className="object-cover"
            />
          </div>
          <h3 className="mt-5 font-serif text-3xl font-medium text-ink sm:text-4xl">
            {selected.title}
          </h3>
          <p className="mt-2 text-sm text-clay">
            {selected.material} · {inr(selected.price)}
          </p>
          <a
            href={`/products/${selected.handle}`}
            className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-maroon-deep underline underline-offset-2 hover:text-maroon"
          >
            Read product details
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        </section>

        <section className="rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
          <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
            A useful review
          </h2>
          <p className="mt-4 text-sm font-light leading-relaxed text-clay">
            Consider what helped you choose, how the material feels, and which
            details were useful to understand.
          </p>
          <p className="mt-4 text-sm font-light leading-relaxed text-clay">
            This is a static submission form. No real review, rating or photo
            is submitted here.
          </p>
          <a
            href="/policies/privacy-policy"
            className="mt-4 inline-block text-sm font-semibold text-maroon-deep underline underline-offset-2 hover:text-maroon"
          >
            Read the current Privacy Policy
          </a>
        </section>
      </div>
    </div>
  );
}
