import Reveal from "./reveal";
import { IconArrowRight, IconQuote } from "./icons";

export default function ContactCta() {
  return (
    <section className="bg-cream pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-maroon px-6 py-12 text-cream sm:px-12 sm:py-14">
            {/* soft glow accents */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold/10 blur-3xl transition-all duration-700" />
            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-terracotta/15 blur-3xl" />

            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center">
              <IconQuote className="h-8 w-8 shrink-0 text-gold/70" />
              <div className="max-w-2xl">
                <h2 className="font-serif text-3xl font-medium leading-snug sm:text-4xl">
                  Not sure where to begin? Let&apos;s find your next
                  meaningful piece.
                </h2>
                <p className="mt-2 text-sm font-light text-cream/80">
                  Ask about a product, its details or your order — we&apos;re
                  happy to help with clarity.
                </p>
              </div>
              <a
                href="/pages/contact-us"
                className="btn-sheen group inline-flex w-full items-center gap-2.5 rounded-full bg-gold px-6 py-3 text-sm font-medium text-maroon-dark transition-colors hover:bg-gold-deep sm:w-auto sm:justify-center lg:ml-auto"
              >
                Contact Us
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
