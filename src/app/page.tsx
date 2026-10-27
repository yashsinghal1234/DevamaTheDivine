import Hero from "@/components/hero";
import UspStrip from "@/components/usp-strip";
import PromoBanner from "@/components/promo-banner";
import CollectionCards from "@/components/collection-cards";
import DevamaEdit from "@/components/devama-edit";
import GiftBanner from "@/components/gift-banner";
import EverydayRituals from "@/components/everyday-rituals";
import InformedFaith from "@/components/informed-faith";
import VideoStories from "@/components/video-stories";
import Testimonials from "@/components/testimonials";
import FaqSection from "@/components/faq-section";

import { getCollections, getFaqs, getProducts, getReviews } from "@/lib/shopify";

export default async function Home() {
  const [products, collections, reviews, faqs] = await Promise.all([
    getProducts("edit"),
    getCollections(),
    getReviews(),
    getFaqs(),
  ]);
  // The homepage edit grid shows a curated eight; the full catalogue
  // (with pagination) lives on /collections/all.
  const featuredProducts = products.slice(0, 8);

  return (
    <main className="overflow-x-clip">
      <Hero />
      <UspStrip />
      <PromoBanner />
      <CollectionCards collections={collections} />
      <DevamaEdit products={featuredProducts} />
      <GiftBanner />
      <EverydayRituals />
      <InformedFaith />
      <VideoStories />
      <Testimonials reviews={reviews} />
      <FaqSection faqs={faqs} />
    </main>
  );
}
