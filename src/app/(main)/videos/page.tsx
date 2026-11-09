import { Suspense } from "react";
import Image from "next/image";
import Reveal from "@/components/reveal";
import { IconVideo } from "@/components/icons";

export const metadata = { title: "Videos — Devama The Divine" };

const TOPICS = [
  { slug: "", label: "All topics" },
  { slug: "product-demos", label: "Product demos" },
  { slug: "ritual-guides", label: "Ritual guides" },
  { slug: "brand-storytelling", label: "Brand storytelling" },
  { slug: "care-guides", label: "Care guides" },
];

const CARDS = [
  {
    topic: "product-demos",
    title: "Product demos",
    body: "Close-up looks at materials, finishes and product details.",
    linkLabel: "Explore Karungali Mala",
    href: "/products/karungali-mala-original",
  },
  {
    topic: "ritual-guides",
    title: "Ritual guides",
    body: "Gentle guidance for your own considered practice.",
    linkLabel: "Explore Kuber Poojan Potli",
    href: "/products/kuber-potali",
  },
  {
    topic: "brand-storytelling",
    title: "Brand storytelling",
    body: "Stories behind the collection and the thoughtful way we curate.",
    linkLabel: "Get to know Devama",
    href: "/pages/about-us",
  },
  {
    topic: "care-guides",
    title: "Care guides",
    body: "Tips on handling, storing and keeping your pieces well.",
    linkLabel: "Explore Rudraksha",
    href: "/products/5-mukhi-rudraksha",
  },
];

type VideosSearchParams = { topic?: string | string[] };

const bannerImage =
  "https://devamathedivine.com/cdn/shop/files/devama-the-divine-mobile-banner.png?v=1784584785&width=1600";

async function VideosBody({ searchParams }: { searchParams: Promise<VideosSearchParams> }) {
  const sp = await searchParams;
  const topic = [sp.topic ?? ""].flat().join(" ").trim().toLowerCase();
  const visible = topic ? CARDS.filter((c) => c.topic === topic) : CARDS;

  return (
    <div className="mt-8">
      {/* Topic chips */}
      <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
        {TOPICS.map((t) => {
          const active = t.slug === "" ? !topic : t.slug === topic;
          const href = t.slug ? `/videos?topic=${t.slug}` : "/videos";
          return (
            <a
              key={t.label}
              href={href}
              aria-current={active ? "true" : undefined}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors sm:text-[13px] ${
                active
                  ? "bg-maroon text-cream"
                  : "border border-line bg-cream-card text-ink/75 hover:border-maroon/50 hover:text-maroon"
              }`}
            >
              {t.label}
            </a>
          );
        })}
      </div>

      {/* Upcoming video cards */}
      {visible.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-line bg-cream-card p-10 text-center text-sm text-clay">
          Nothing in this topic yet — try All topics.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {visible.map((card, i) => (
            <Reveal key={card.title} delay={Math.min(i, 3) * 90} className="h-full">
              <article className="flex h-full flex-col">
                <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl border border-line bg-cream-card px-6 py-12 text-center">
                  <IconVideo className="h-6 w-6 text-maroon-deep" />
                  <p className="eyebrow text-terracotta">Video coming soon</p>
                  <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                    {card.title}
                  </h2>
                </div>
                <p className="mt-4 text-xs font-semibold tracking-wide text-terracotta">
                  UPCOMING VIDEO
                </p>
                <p className="mt-1.5 text-sm font-light leading-relaxed text-clay">
                  {card.body}
                </p>
                <a
                  href={card.href}
                  className="group mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-clay underline underline-offset-2 hover:text-maroon sm:text-sm"
                >
                  {card.linkLabel}
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      )}

      {/* Explore while we prepare */}
      <Reveal className="mt-10">
        <div className="rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
          <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
            Explore while we prepare the stories
          </h2>
          <div className="mt-5 flex flex-wrap gap-x-10 gap-y-3 text-sm font-medium sm:pl-1">
            <ExploreLink href="/products/karungali-mala-original" title="Karungali Mala 108+1 Beads" price="₹499" />
            <ExploreLink href="/products/amethyst-bracelet" title="Amethyst Bracelet" price="₹599 (regular ₹799)" />
            <ExploreLink href="/products/kuber-potali" title="Kuber Poojan Potli" price="₹999" />
          </div>
          <p className="mt-4 text-[13px] text-clay sm:text-sm">
            Read product details and our FAQ for material, authenticity and
            care guidance today.
          </p>
        </div>
      </Reveal>
    </div>
  );
}

function ExploreLink({ href, title, price }: { href: string; title: string; price: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-1.5 text-maroon-deep underline underline-offset-2 hover:text-maroon"
    >
      {title} · {price}
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
    </a>
  );
}

export default function VideosPage({
  searchParams,
}: {
  searchParams: Promise<VideosSearchParams>;
}) {
  return (
    <main className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[11px] text-clay sm:text-xs">
          <a href="/" className="hover:text-maroon">Home</a>
          <span className="px-1.5">/</span>
          <span className="text-ink/70">Videos</span>
        </nav>

        <Reveal>
          <p className="eyebrow mt-4 text-terracotta">Video guidance</p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.08] text-ink sm:text-6xl">
            See the details. Discover the stories.
          </h1>
          <p className="mt-3 max-w-lg text-sm font-light text-clay">
            A home for product demonstrations, ritual guidance, brand stories
            and practical care.
          </p>
        </Reveal>

        {/* Upcoming library notice */}
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
              Upcoming video library
            </p>
            <p className="mt-1 pl-6 text-xs leading-relaxed text-clay sm:text-[13px]">
              Video coming soon. These are editorial previews only; video
              assets have not been supplied and no playback is available.
            </p>
          </div>
        </Reveal>

        {/* Featured upcoming story */}
        <Reveal className="mt-8">
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl lg:grid-cols-[1fr_1fr]">
            <div className="relative min-h-[260px] bg-sand/60">
              <Image
                src={bannerImage}
                alt="Devama editorial still — beads and ritual vessels"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="rounded-xl bg-cream-card/95 px-6 py-5 text-center shadow-sm">
                  <IconVideo className="mx-auto h-6 w-6 text-maroon-deep" />
                  <p className="mt-2 text-xs font-bold tracking-wide text-maroon-deep">
                    VIDEO COMING SOON
                  </p>
                  <p className="mt-1 text-[11px] text-clay">
                    Collection still · not a video frame
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-maroon px-6 py-10 text-cream sm:px-10">
              <p className="eyebrow text-gold">Featured upcoming story</p>
              <h2 className="mt-3 font-serif text-4xl font-medium leading-tight sm:text-5xl">
                Where Faith Meets Authenticity.
              </h2>
              <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-cream/80">
                A planned introduction to sacred objects, clear information and
                considered choices. In the meantime, explore the story behind
                Devama.
              </p>
              <a
                href="/pages/about-us"
                className="btn-sheen mt-6 inline-flex items-center gap-2.5 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-maroon-dark transition-colors hover:bg-gold-deep"
              >
                Read our story
                <span aria-hidden className="transition-transform">→</span>
              </a>
            </div>
          </div>
        </Reveal>

        <Suspense fallback={<div className="mt-8 h-72 animate-pulse rounded-2xl bg-line/60" />}>
          <VideosBody searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
