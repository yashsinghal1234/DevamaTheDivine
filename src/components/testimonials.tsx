import Reveal from "./reveal";
import { IconQuote, IconSparkle } from "./icons";
import type { Review } from "@/lib/types";

export default function Testimonials({ reviews }: { reviews: Review[] }) {

  return (
    <section className="bg-cream pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow text-terracotta">Voices from your stories</p>
          <h2 className="mt-3 max-w-xl font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
            Every sacred journey has a story
          </h2>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-4 py-2 text-xs text-maroon-deep">
            <IconSparkle className="h-4 w-4 text-gold-deep" />
            Sample reviews — replaced with customer feedback before launch
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.title} delay={i * 120} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl bg-[#fdf9ef] p-7 shadow-[0_1px_2px_rgba(54,34,23,0.06)] ring-1 ring-line/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(54,34,23,0.3)]">
                <IconQuote className="h-6 w-6 text-gold/80" />
                <p className="eyebrow mt-5 text-fog">Illustrative review</p>
                <blockquote className="mt-2 font-serif text-xl font-semibold leading-snug text-ink">
                  {review.title}
                </blockquote>
                <p className="mt-3 text-sm font-light leading-relaxed text-clay">
                  “{review.quote}”
                </p>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
