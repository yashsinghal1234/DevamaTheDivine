import Image from "next/image";
import Reveal from "./reveal";
import { IconArrowRight, IconCheck } from "./icons";
import { getSectionImages } from "@/lib/shopify";

const points = [
  "Care, explanation and usage guidance for products",
  "Conscious minds about Mukhi's and meaning",
  "Ask for guidance before making a choice",
];

export default async function InformedFaith() {
  const images = await getSectionImages();

  return (
    <section className="bg-espresso text-cream">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <Reveal className="relative min-h-[300px] sm:min-h-[420px]">
          <Image
            src={images.informed}
            alt="Hands threading a sacred Rudraksha bead"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-espresso/60 lg:bg-gradient-to-r" />
        </Reveal>

        {/* Copy */}
        <div className="px-6 py-14 sm:px-10 sm:py-18 lg:px-16 lg:py-24">
          <Reveal>
            <p className="eyebrow text-gold/80">The devama way</p>
            <h2 className="mt-4 max-w-md font-serif text-4xl font-medium leading-[1.12] sm:text-5xl">
              Faith is personal. Your choices should be informed.
            </h2>
            <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-cream/80">
              We bring sacred objects and practical product information
              together, so you can explore tradition with clarity and enjoy it
              with care.
            </p>

            <ul className="mt-7 space-y-3.5">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold">
                    <IconCheck className="h-3 w-3" />
                  </span>
                  <span className="text-sm font-light text-cream/90">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="/pages/about-us"
              className="group mt-9 inline-flex items-center gap-2.5 rounded-full border border-gold/60 px-6 py-3 text-sm font-medium text-gold transition-all hover:bg-gold hover:text-espresso"
            >
              Get to know Devama
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
