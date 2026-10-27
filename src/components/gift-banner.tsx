import { IconArrowRight, IconGift } from "./icons";

export default function GiftBanner({
  threshold = 499,
}: {
  threshold?: number;
}) {
  return (
    <section className="bg-cream py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-6 rounded-3xl bg-maroon px-6 py-10 text-cream sm:px-10 lg:flex-row lg:items-center sm:py-12">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-dashed border-gold/60 text-gold">
            <IconGift className="h-9 w-9" />
          </span>
          <div>
            <p className="eyebrow text-cream/70">
              A thoughtful extra, from us to you
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium leading-snug sm:text-4xl">
              A special gift with orders above ₹{threshold}.
            </h2>
            <p className="mt-2 text-sm font-light text-cream/80">
              Choose your favourites and enjoy a little extra. Applies to
              orders strictly above ₹{threshold}.
            </p>
          </div>
          <a
            href="/collections/all"
            className="btn-sheen group inline-flex w-full items-center gap-2.5 rounded-full bg-gold px-6 py-3 text-sm font-medium text-maroon-dark transition-colors hover:bg-gold-deep sm:w-auto sm:justify-center lg:ml-auto"
          >
            Find your favourite
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
