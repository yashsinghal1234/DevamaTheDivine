import Image from "next/image";
import { IconArrowRight } from "./icons";
import { getSectionImages } from "@/lib/shopify";
import Reveal from "./reveal";

export default async function Hero() {
  const images = await getSectionImages();

  return (
    <section className="bg-maroon text-cream">
      <div className="grid grid-cols-1 overflow-hidden lg:grid-cols-[1.05fr_1fr]">
        {/* Copy */}
        <div className="relative px-6 py-14 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
          <p className="eyebrow anim-fade-up text-cream/60">
            Sacred Rudraksha. Thoughtfully chosen.
          </p>
          <h1 className="mt-4 max-w-md font-serif text-5xl font-semibold leading-[1.05] sm:mt-5 sm:text-6xl lg:text-7xl d-100 anim-fade-up">
            Where Faith Meets Authenticity.
          </h1>
          <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-cream/85 sm:text-[15px] d-200 anim-fade-up">
            Discover Rudraksha, sacred bead for meditation. Meaningful pieces
            for your daily practice, every day.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 d-300 anim-fade-up">
            <a
              href="/collections/all"
              className="btn-sheen group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gold px-6 py-3 text-sm font-medium text-maroon-dark transition-colors hover:bg-gold-deep sm:w-auto"
            >
              Explore the collection
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/pages/about-us"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-medium text-cream transition-colors hover:border-cream/60 hover:bg-cream/10 sm:w-auto"
            >
              Our story
            </a>
          </div>

          <Reveal delay={400} className="mt-14 sm:mt-20">
            <a
              href="/collections/rudraksha"
              className="eyebrow inline-flex items-center gap-3 text-cream/70 transition-colors hover:text-gold"
            >
              Rudraksha collections
              <span className="h-px w-6 bg-cream/40" />
              Price ₹499
            </a>
          </Reveal>
        </div>

        {/* Image */}
        <Reveal className="relative min-h-[340px] sm:min-h-[420px] lg:min-h-full" delay={200}>
          <Image
            src={images.hero}
            alt="Rudraksha malas arranged before a lit diya"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-maroon/35 via-transparent to-transparent lg:from-maroon/25" />
          <p className="eyebrow absolute bottom-5 left-5 rounded-full bg-maroon-dark/70 px-4 py-2 text-[10px] text-cream/90 backdrop-blur-sm sm:bottom-6 sm:left-6">
            Rooted in tradition, chosen with care
          </p>
        </Reveal>
      </div>
    </section>
  );
}
