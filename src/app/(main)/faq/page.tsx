import { Suspense } from "react";
import Reveal from "@/components/reveal";
import FaqSearch from "@/components/faq/faq-search";
import { IconArrowUpRight } from "@/components/icons";
import { getFaqs } from "@/lib/shopify";
import { FAQ_TOPICS, faqTopicLabel } from "@/lib/faq-topics";

export const metadata = { title: "Help / FAQ — Devama The Divine" };

type FaqSearchParams = { q?: string | string[]; topic?: string | string[] };

async function FaqBody({ searchParams }: { searchParams: Promise<FaqSearchParams> }) {
  const sp = await searchParams;
  const query = [sp.q ?? ""].flat().join(" ").trim();
  const topic = [sp.topic ?? ""].flat().join(" ").trim().toLowerCase();

  const faqs = await getFaqs();
  const norm = (s: string) => s.toLowerCase();

  const filtered = faqs
    .filter((f) => (topic ? f.topic === topic : true))
    .filter((f) =>
      query ? norm(`${f.question} ${f.answer}`).includes(norm(query)) : true
    );

  const buildUrl = (over: Partial<FaqSearchParams> = {}) => {
    const usp = new URLSearchParams();
    if (query) usp.set("q", query);
    if (topic) usp.set("topic", topic);
    for (const [k, v] of Object.entries(over)) {
      if (v === undefined || v === "") usp.delete(k);
      else usp.set(k, String(v));
    }
    const qs = usp.toString();
    return `/faq${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
      {/* Sidebar */}
      <aside className="lg:sticky lg:top-32">
        <h2 className="font-serif text-3xl font-medium text-ink">Browse by topic</h2>
        <nav className="mt-5 flex flex-col">
          <a
            href={buildUrl({ topic: "" })}
            aria-current={topic === "" ? "page" : undefined}
            className={`-mx-1 rounded-xl px-4 py-3 text-sm transition-colors ${
              topic === ""
                ? "bg-maroon font-semibold text-cream"
                : "text-ink hover:bg-sand/60 hover:text-maroon"
            }`}
          >
            All topics
          </a>
          {FAQ_TOPICS.map((t) => (
            <a
              key={t.id}
              href={buildUrl({ topic: t.id })}
              aria-current={topic === t.id ? "page" : undefined}
              className={`-mx-1 rounded-xl px-4 py-3 text-sm transition-colors ${
                topic === t.id
                  ? "bg-maroon font-semibold text-cream"
                  : "text-ink hover:bg-sand/60 hover:text-maroon"
              }`}
            >
              {t.label}
            </a>
          ))}
        </nav>

        <div className="mt-8 max-w-[260px] rounded-2xl border border-line bg-cream-card p-6">
          <h3 className="font-serif text-3xl font-medium leading-tight text-ink">
            A question of your own?
          </h3>
          <p className="mt-3 text-[13px] font-light leading-relaxed text-clay">
            Ask about a product, its details or your order. We&rsquo;re here to
            help you choose with clarity.
          </p>
          <a
            href="/pages/contact-us"
            className="btn-sheen mt-4 inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-ochre px-5 py-3 text-sm font-semibold text-maroon-dark transition-colors hover:bg-gold-deep"
          >
            Ask us
            <span aria-hidden className="transition-transform">→</span>
          </a>
        </div>
      </aside>

      {/* Answers */}
      <div>
        <FaqSearch query={query} />

        {filtered.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-line bg-cream-card p-10 text-center">
            <p className="font-serif text-2xl text-ink">
              Nothing matched &ldquo;{query}&rdquo;
            </p>
            <p className="mt-2 text-sm text-clay">
              Try a shorter term — or ask us directly through the contact form.
            </p>
            <a
              href={buildUrl({ q: "" })}
              className="mt-4 inline-block text-xs font-medium text-clay underline underline-offset-2 hover:text-maroon"
            >
              Clear search
            </a>
          </div>
        ) : (
          <div className="mt-8 space-y-9">
            {filtered.map((faq, i) => (
              <Reveal key={faq.question} delay={Math.min(i, 5) * 70}>
                <article>
                  <p className="eyebrow border-b border-line pb-2 text-terracotta">
                    {faqTopicLabel(faq.topic)}
                  </p>
                  <h2 className="mt-4 font-serif text-2xl font-medium text-ink sm:text-[28px]">
                    {faq.question}
                  </h2>
                  <p className="mt-2.5 text-sm font-light leading-relaxed text-clay sm:text-[15px]">
                    {faq.answer}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {/* Ritual powder safety */}
        <Reveal className="mt-10">
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
              Ritual powder safety
            </p>
            <p className="mt-1 pl-6 text-xs leading-relaxed text-clay sm:text-[13px]">
              Gaulochan (Gorochan) ritual powder · ₹449 · FOR EXTERNAL USE ONLY.
              Follow the product-specific use guidance, do not ingest or treat
              it as a medical product.
            </p>
          </div>
        </Reveal>

        {/* Bottom links */}
        <div className="mt-9 flex flex-wrap gap-x-10 gap-y-3 text-sm font-medium">
          <a
            href="/pages/shopping-information"
            className="group inline-flex items-center gap-1.5 text-clay underline underline-offset-2 hover:text-maroon"
          >
            Shopping information
            <IconArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="/track-your-order"
            className="group inline-flex items-center gap-1.5 text-clay underline underline-offset-2 hover:text-maroon"
          >
            Track Your Order
            <IconArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="/pages/contact-us"
            className="group inline-flex items-center gap-1.5 text-clay underline underline-offset-2 hover:text-maroon"
          >
            Contact Us
            <IconArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function FaqPage({
  searchParams,
}: {
  searchParams: Promise<FaqSearchParams>;
}) {
  return (
    <main className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[11px] text-clay sm:text-xs">
          <a href="/" className="hover:text-maroon">Home</a>
          <span className="px-1.5">/</span>
          <a href="/faq" className="hover:text-maroon">Help / FAQ</a>
        </nav>

        <Reveal>
          <p className="eyebrow mt-4 text-terracotta">A little clarity goes a long way</p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.08] text-ink sm:text-6xl">
            Thoughtful questions. Helpful answers.
          </h1>
          <p className="mt-3 max-w-lg text-sm font-light text-clay">
            From choosing your first bead to caring for a favourite piece,
            start here.
          </p>
        </Reveal>

        <Suspense fallback={<div className="mt-8 h-72 animate-pulse rounded-2xl bg-line/60" />}>
          <FaqBody searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
