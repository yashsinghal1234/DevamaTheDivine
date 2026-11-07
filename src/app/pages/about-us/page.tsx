import Image from "next/image";
import Reveal from "@/components/reveal";
import { IconArrowUpRight } from "@/components/icons";

export const metadata = { title: "About Devama — Where Faith Meets Authenticity" };

const heroImage =
  "https://devamathedivine.com/cdn/shop/files/Banner_unfadded_c95e4b43-3a2c-4a0a-b20b-19883a9e7c0e.jpg?v=1783797078&width=1800";

const braceletBannerImage =
  "https://devamathedivine.com/cdn/shop/files/Gemini_Generated_Image_mj2blzmj2blzmj2b_3.png?v=1784324910&width=900";

const COLLECTION_CARDS = [
  {
    title: "Rudraksha",
    subtitle: "Find your Mala",
    image:
      "https://devamathedivine.com/cdn/shop/collections/rudraksha-collection-shiva-theme.png?v=1778488748&width=900",
    alt: "Rudraksha collection",
    href: "/collections/all?cat=rudraksha",
  },
  {
    title: "Karungali (Ebony wood)",
    subtitle: "The beauty of ebony wood",
    image:
      "https://devamathedivine.com/cdn/shop/collections/karungali-collection-flat-lay.png?v=1778511299&width=900",
    alt: "Karungali collection",
    href: "/collections/all?cat=karungali",
  },
  {
    title: "Energised Potali",
    subtitle: "Ritual kits in a potli",
    image:
      "https://devamathedivine.com/cdn/shop/collections/devama-potli-collection.png?v=1778512012&width=900",
    alt: "Energised Potali collection",
    href: "/collections/all?cat=potli",
  },
  {
    title: "Bracelets",
    subtitle: "Meaningful everyday pieces",
    image:
      "https://devamathedivine.com/cdn/shop/collections/gemstone-bracelet-collection-devama.png?v=1784398362&width=900",
    alt: "Bracelets collection",
    href: "/collections/all?cat=bracelets",
  },
];

const FEATURES = [
  {
    no: "01",
    title: "Look closely at the details",
    body: "Bead counts, materials, finishes and sizes are described on every listing so you can judge each piece on its own merits.",
  },
  {
    no: "02",
    title: "Authenticity is product-specific",
    body: "Certification details belong to individual products. We describe what each listing covers instead of making blanket claims.",
  },
  {
    no: "03",
    title: "Meaning, without promised outcomes",
    body: "Sacred objects carry personal and traditional meaning. We share what is known — never guarantees of health, wealth or fortune.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[11px] text-clay sm:text-xs">
          <a href="/" className="hover:text-maroon">Home</a>
          <span className="px-1.5">/</span>
          <span className="text-ink/70">About Us</span>
        </nav>

        <Reveal>
          <p className="eyebrow mt-4 text-terracotta">Get to know Devama</p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.08] text-ink sm:text-6xl">
            Where Faith Meets Authenticity.
          </h1>
        </Reveal>

        {/* Split hero */}
        <Reveal className="mt-9">
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl lg:grid-cols-[1.1fr_1fr]">
            <div className="relative min-h-[280px] bg-sand/60 sm:min-h-[380px]">
              <Image
                src={heroImage}
                alt="Hands holding a rudraksha mala — editorial photograph"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-center bg-coal px-6 py-10 text-cream sm:px-10 sm:py-14">
              <p className="eyebrow text-gold">The Devama way</p>
              <h2 className="mt-3 font-serif text-3xl font-medium leading-tight sm:text-4xl">
                Faith is personal. Your choices should be informed.
              </h2>
              <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-cream/80">
                Devama The Divine was founded to make sacred objects easier to
                understand — clear materials, honest product details and
                thoughtful descriptions, so what you choose is truly yours.
              </p>
              <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-cream/80">
                We do not promise outcomes. We present information, and we
                leave the meaning to you and your practice.
              </p>
              <a
                href="/collections/all"
                className="btn-sheen mt-7 inline-flex w-fit items-center gap-2.5 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-maroon-dark transition-colors hover:bg-gold-deep"
              >
                Explore the collection
                <span aria-hidden className="transition-transform">→</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Tradition + feature rows */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <Reveal>
            <p className="eyebrow text-terracotta">Our approach</p>
            <h2 className="mt-3 font-serif text-4xl font-medium leading-[1.1] text-ink sm:text-5xl">
              Tradition, with room for your own practice.
            </h2>
            <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-clay sm:text-[15px]">
              Rudraksha, karungali, gemstones and ritual kits each carry
              generations of tradition. Our work is to present them clearly —
              what they are made of, how they are described, and how to care
              for them — so your choice is an informed one.
            </p>
          </Reveal>

          <div>
            {FEATURES.map((f, i) => (
              <Reveal key={f.no} delay={i * 90}>
                <div className="flex gap-5 border-b border-line py-6 first:pt-0 sm:gap-8 sm:py-8">
                  <span className="font-serif text-3xl text-gold-deep sm:text-4xl">
                    {f.no}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-medium text-ink sm:text-[28px]">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-clay sm:text-[15px]">
                      {f.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Collection cards */}
        <Reveal className="mt-16">
          <h2 className="font-serif text-3xl font-medium leading-tight text-ink sm:text-5xl">
            A collection for every sacred moment
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {COLLECTION_CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 90} className="h-full">
              <a
                href={c.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-cream-card transition-colors hover:border-maroon/40"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-sand/60">
                  <Image
                    src={c.image}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-serif text-2xl font-medium text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-sm font-light text-clay">{c.subtitle}</p>
                  <span className="group mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-clay transition-colors group-hover:text-maroon">
                    Explore
                    <IconArrowUpRight className="h-3.5 w-3.5 text-terracotta transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Bracelet banner */}
        <Reveal className="mt-16">
          <div className="grid grid-cols-1 items-center gap-8 rounded-2xl bg-sand/50 p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-cream-card sm:mx-auto sm:max-w-md">
              <Image
                src={braceletBannerImage}
                alt="Amethyst bracelet — a small detail with personal meaning"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
            </div>
            <div className="text-center lg:text-left">
              <h2 className="font-serif text-3xl font-medium leading-tight text-ink sm:text-5xl">
                A small detail. A personal meaning.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-clay sm:text-[15px] lg:mx-0">
                Gemstone bracelets are worn close, every day. Compare
                materials, sizes and care guidance before you choose the piece
                that will sit on your wrist.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <a
                  href="/collections/all?cat=bracelets"
                  className="btn-sheen inline-flex items-center gap-2.5 rounded-lg bg-ochre px-6 py-3 text-sm font-semibold text-maroon-dark transition-colors hover:bg-gold-deep"
                >
                  Shop bracelets
                  <span aria-hidden className="transition-transform">→</span>
                </a>
                <a
                  href="/faq?topic=care"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-clay underline underline-offset-2 hover:text-maroon"
                >
                  See our care guidance
                  <IconArrowUpRight className="h-3.5 w-3.5 text-terracotta transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
