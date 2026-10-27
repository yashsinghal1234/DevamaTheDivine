import { notFound } from "next/navigation";
import Reveal from "@/components/reveal";
import ProductGallery from "@/components/pdp/product-gallery";
import ProductActions from "@/components/pdp/product-actions";
import DeliveryCheck from "@/components/pdp/delivery-check";
import SpecTabs from "@/components/pdp/spec-tabs";
import ProductCard from "@/components/product-card";
import { InfoIcon } from "@/components/pdp/info-icon";
import { getProduct, getProducts } from "@/lib/shopify";
import { inr } from "@/lib/format";

export async function generateStaticParams() {
  // Known sample handles; Shopify-backed handles resolve at request time.
  const { products } = await import("@/lib/sample-data");
  return products.map((p) => ({ handle: p.handle }));
}

// Blocking route: the PDP shell depends on `params` (product lookup).
export const instant = false;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const all = await getProducts("edit");
  const related = all.filter((p) => p.handle !== product.handle).slice(0, 3);

  return (
    <>
      <main className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="text-[11px] text-clay sm:text-xs"
          >
            <a href="/" className="hover:text-maroon">Home</a>
            <span className="px-1.5">/</span>
            <span>{product.category}</span>
            <span className="px-1.5">/</span>
            <span className="text-ink/70">{product.title}</span>
          </nav>

          {/* Product */}
          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <ProductGallery product={product} />
              <p className="mt-4 text-[11px] leading-relaxed text-clay/80">
                Natural materials can vary in tone and grain. Refer to the
                current product listing for the piece&apos;s specific details.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div>
                <p className="eyebrow text-terracotta">
                  {product.category} collection
                </p>
                <h1 className="mt-2 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
                  {product.title}
                </h1>
                <p className="mt-4 flex items-baseline gap-3">
                  <span className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
                    {inr(product.price)}
                  </span>
                  {product.compareAt && (
                    <span className="text-sm text-clay line-through">
                      {inr(product.compareAt)}
                    </span>
                  )}
                </p>
                <p className="mt-5 max-w-lg text-sm font-light leading-relaxed text-clay">
                  {product.description}
                </p>
                <a
                  href="#details"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-maroon underline-offset-2 hover:underline"
                >
                  Product information &amp; authenticity
                  <span aria-hidden>↓</span>
                </a>

                <ProductActions product={product} />
                <DeliveryCheck />

                {/* Gift notice */}
                <div className="mt-6 flex items-start gap-3 rounded-lg bg-gold/10 p-4 text-[12px] leading-relaxed text-clay sm:text-[13px]">
                  <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                  Special gift on orders above ₹499. This ₹499 item alone does
                  not meet the strictly-above condition.
                </div>
              </div>
            </Reveal>
          </div>

          {/* Honest feedback bar */}
          <Reveal className="mt-12">
            <div className="rounded-xl bg-gold/10 px-5 py-4 sm:px-6">
              <p className="flex items-center gap-2 text-sm font-medium text-maroon-deep">
                <InfoIcon className="h-4 w-4 text-gold-deep" />
                A space for honest feedback
              </p>
              <p className="mt-1 text-xs text-clay">
                Sample reviews — replaced with customer feedback before launch
              </p>
            </div>
          </Reveal>

          {/* Sample review */}
          <Reveal className="mt-6">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]">
              <div className="rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
                <h3 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
                  A simple piece for everyday practice
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-clay">
                  “The material and bead-count information made it easier to
                  understand the mala before choosing.”
                </p>
                <p className="mt-4 text-[11px] tracking-wide text-gold-deep">
                  ILLUSTRATIVE REVIEW · {product.title} · Sample feedback
                </p>
              </div>
              <div className="flex flex-col justify-center gap-3">
                <a
                  href="/pages/contact-us"
                  className="flex items-center justify-center gap-2 rounded-lg border border-ink/30 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-maroon hover:bg-maroon hover:text-cream"
                >
                  Write a review
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="/products"
                  className="group inline-flex items-center gap-1.5 justify-center text-xs font-medium text-clay underline-offset-2 hover:text-maroon hover:underline"
                >
                  Explore all reviews
                  <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>↗</span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Related products */}
          <Reveal className="mt-16">
            <section id="details">
              <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                Continue your sacred journey
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-3 lg:gap-x-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} notePrefix="" />
                ))}
              </div>
            </section>
          </Reveal>
        </div>
      </main>
    </>
  );
}
