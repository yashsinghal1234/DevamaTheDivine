import Reveal from "@/components/reveal";
import ReviewForm, {
  type ReviewFormProduct,
} from "@/components/reviews/review-form";
import { getProducts } from "@/lib/shopify";

export const metadata = { title: "Write a review — Devama The Divine" };

export default async function WriteReviewPage() {
  const products = await getProducts();

  const options: ReviewFormProduct[] = products.map((p) => ({
    handle: p.handle,
    title: p.title,
    price: p.price,
    compareAt: p.compareAt,
    image: p.image,
    alt: p.alt,
    category: p.category,
    material:
      p.category.charAt(0).toUpperCase() + p.category.slice(1).toLowerCase(),
  }));

  return (
    <main className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[11px] text-clay sm:text-xs">
          <a href="/" className="hover:text-maroon">Home</a>
          <span className="px-1.5">/</span>
          <a href="/reviews" className="hover:text-maroon">Reviews</a>
          <span className="px-1.5">/</span>
          <span className="text-ink/70">Write a review</span>
        </nav>

        <Reveal>
          <p className="eyebrow mt-4 text-terracotta">Write a review</p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.08] text-ink sm:text-6xl">
            Share the details that mattered
          </h1>
          <p className="mt-3 max-w-lg text-sm font-light text-clay">
            A few honest lines about the piece you chose — its material, feel
            and everyday use — help others choose with clarity too.
          </p>
        </Reveal>

        <ReviewForm products={options} />
      </div>
    </main>
  );
}
