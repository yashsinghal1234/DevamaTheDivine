import Reveal from "@/components/reveal";
import { IconArrowRight, IconSparkle } from "@/components/icons";

export const metadata = { title: "Coming soon — Devama The Divine" };

/**
 * Branded catch-all for routes that are part of the final store but are
 * not built yet (cart, account, contact, policies, …). Until those pages
 * are created, every dead link lands here instead of a raw 404.
 */
export default function ComingSoonPage() {
  return (
    <main className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-[11px] text-clay sm:text-xs">
          <a href="/" className="hover:text-maroon">Home</a>
          <span className="px-1.5">/</span>
          <span className="text-ink/70">Coming soon</span>
        </nav>

        <Reveal>
          <div className="mx-auto mt-6 flex max-w-2xl flex-col items-center rounded-3xl border border-dashed border-line bg-cream-card px-6 py-20 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold-deep">
              <IconSparkle className="h-6 w-6" />
            </span>
            <h1 className="mt-6 font-serif text-4xl font-medium leading-[1.08] text-ink sm:text-5xl">
              This page is being prepared
            </h1>
            <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-clay">
              We&rsquo;re building the full Devama experience step by step.
              This section is on the way — meanwhile, the collection and
              product pages are ready for you.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/"
                className="btn-sheen inline-flex items-center justify-center gap-2.5 rounded-lg bg-ochre px-6 py-3 text-sm font-semibold text-maroon-dark transition-colors hover:bg-gold-deep"
              >
                Back to home
                <IconArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/collections/all"
                className="group inline-flex items-center justify-center gap-2.5 rounded-lg border border-ink/30 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-maroon hover:bg-maroon hover:text-cream"
              >
                Shop all
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
