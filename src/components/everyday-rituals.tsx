import Image from "next/image";
import ProductCard from "./product-card";
import Reveal from "./reveal";
import { IconArrowRight } from "./icons";
import { getProducts, getSectionImages } from "@/lib/shopify";

export default async function EverydayRituals() {
  const [picks, images] = await Promise.all([
    getProducts("everyday"),
    getSectionImages(),
  ]);


  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-terracotta">Meaningful, tiny by design</p>
            <h2 className="mt-3 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
              For your everyday rituals
            </h2>
          </div>
          <a
            href="/collections/bracelets"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-maroon hover:text-terracotta"
          >
            Explore bracelets &amp; potlis
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-[1.25fr_1fr] lg:gap-7">
          {/* Feature image card with floating copy panel */}
          <Reveal>
            <a
              href="/collections/bracelets"
              className="group relative block h-full min-h-[300px] overflow-hidden rounded-2xl sm:min-h-[460px]"
            >
              <Image
                src={images.everyday}
                alt="Handcrafted bead bracelets arranged on a sunlit table"
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 max-w-xs rounded-2xl bg-cream-card/95 p-6 shadow-[0_18px_40px_-18px_rgba(54,34,23,0.45)] backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1 sm:bottom-8 sm:left-8 sm:right-auto sm:bottom-10 sm:p-7">
                <h3 className="font-serif text-2xl font-semibold leading-snug text-ink sm:text-3xl">
                  A small detail.
                  <br />
                  A personal meaning.
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-clay sm:text-sm">
                  Bracelets and potlis designed to be a joy to your everyday.
                </p>
                <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-medium text-maroon-dark transition-colors group-hover:bg-gold-deep sm:text-sm">
                  Shop bracelets
                  <IconArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </a>
          </Reveal>

          {/* Side picks */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-7 md:grid-cols-1 lg:grid-cols-2">
            {picks.map((product, i) => (
              <Reveal key={product.id} delay={120 + i * 120} className="h-full">
                <ProductCard product={product} notePrefix="Best price" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
