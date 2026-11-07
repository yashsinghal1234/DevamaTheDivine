import Reveal from "@/components/reveal";
import ProductCard from "@/components/product-card";
import CartContents from "@/components/cart/cart-contents";
import { getDemoCart } from "@/lib/demo-cart";
import { getProducts } from "@/lib/shopify";

export const metadata = { title: "Cart — Devama The Divine" };

export default async function CartPage() {
  const basket = getDemoCart();
  const suggestions = (await getProducts())
    .filter((p) => !basket.some((item) => item.handle === p.handle))
    .slice(0, 3);

  return (
    <main className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[11px] text-clay sm:text-xs">
          <a href="/" className="hover:text-maroon">Home</a>
          <span className="px-1.5">/</span>
          <span className="text-ink/70">Cart</span>
        </nav>

        <Reveal>
          <p className="eyebrow mt-4 text-terracotta">Your basket</p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.08] text-ink sm:text-6xl">
            Your sacred essentials
          </h1>
          <p className="mt-3 max-w-lg text-sm font-light text-clay">
            Review your pieces before the next step. Your basket contains{" "}
            {basket.length} items, one of each.
          </p>
        </Reveal>

        {/* Interactive basket + summary */}
        <CartContents initialItems={basket} />

        {/* You may also wish to explore */}
        <Reveal className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-serif text-3xl font-medium leading-tight text-ink sm:text-4xl">
              You may also wish to explore
            </h2>
            <p className="text-[11px] text-clay/80 sm:text-xs">
              Not included in your basket
            </p>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-x-5">
            {suggestions.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i, 4) * 90} className="h-full">
                <ProductCard product={p} notePrefix="" />
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </main>
  );
}
