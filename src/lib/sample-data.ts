import type {
  CollectionCard,
  FaqItem,
  Product,
  Review,
  SiteSettings,
} from "./types";

/**
 * Sample content shaped exactly like our Shopify Storefront API results.
 * When SHOPIFY_STORE_DOMAIN + SHOPIFY_STOREFRONT_ACCESS_TOKEN are set in
 * `.env.local`, the getters in `shopify.ts` query the real store instead
 * and these samples are only used as an offline fallback.
 *
 * Product data, images and prices below mirror the live store
 * devamathedivine.com so the transition is seamless.
 */

const CDN = "https://devamathedivine.com/cdn/shop";

export const site: SiteSettings = {
  name: "Devama The Divine",
  announcement:
    "A small gift for your sacred journey. Special GIFT on orders above ₹499.",
  freeGiftThreshold: 499,
  instagram: "https://www.instagram.com/devamathedivine",
  youtube: "https://youtube.com/@devamathedivine8939",
  pinterest: "https://pinterest.com/devamathedivine_official",
};

export const logo = `${CDN}/files/main_logo.png?height=100&v=1768676583`;
export const heroImage = `${CDN}/files/Banner_unfadded_c95e4b43-3a2c-4a0a-b20b-19883a9e7c0e.jpg?v=1783797078&width=1800`;
export const lightBanner = `${CDN}/files/devama-the-divine-mobile-banner.png?v=1784584785&width=1600`;

export const collections: CollectionCard[] = [
  {
    title: "Rudraksha",
    subtitle: "Find your Mala",
    image: `${CDN}/collections/rudraksha-collection-shiva-theme.png?v=1778488748&width=900`,
    alt: "Rudraksha collection",
    href: "/collections/rudraksha",
  },
  {
    title: "Karungali (Ebony wood)",
    subtitle: "The beauty of ebony wood",
    image: `${CDN}/collections/karungali-collection-flat-lay.png?v=1778511299&width=900`,
    alt: "Karungali collection",
    href: "/collections/karungali-ebony",
  },
  {
    title: "Energised Potali",
    subtitle: "Ritual kits in a potli",
    image: `${CDN}/collections/devama-potli-collection.png?v=1778512012&width=900`,
    alt: "Energised Potali collection",
    href: "/collections/energised-potali",
  },
  {
    title: "Bracelets",
    subtitle: "Meaningful everyday pieces",
    image: `${CDN}/collections/gemstone-bracelet-collection-devama.png?v=1784398362&width=900`,
    alt: "Bracelets collection",
    href: "/collections/bracelets",
  },
];

export const products: Product[] = [
  {
    id: "1",
    handle: "2-mukhi-rudraksha",
    title: "2 Mukhi Rudraksha Original – Certified Ardhanarishwar Bead",
    category: "RUDRAKSHA",
    price: 499,
    image: `${CDN}/files/1_30.png?v=1784576987&width=900`,
    alt: "2 Mukhi Rudraksha bead",
    options: ["12 mm", "16 mm", "20 mm"],
  },
  {
    id: "2",
    handle: "5-mukhi-rudraksha",
    title: "5 Mukhi Rudraksha Original – Certified Kalagni Rudra Bead",
    category: "RUDRAKSHA",
    price: 499,
    image: `${CDN}/files/3_1ca42fee-84ed-4fda-891d-9ff2d36fb6c2.png?v=1776102986&width=900`,
    alt: "5 Mukhi Rudraksha bead",
    options: ["12 mm", "16 mm", "20 mm"],
  },
  {
    id: "3",
    handle: "karungali-mala-original",
    title: "Karungali Mala 108+1 Beads – Natural Ebony, Govt. Certified",
    category: "KARUNGALI",
    price: 499,
    image: `${CDN}/files/1_722ae3a9-a9ae-48f7-9fc2-9f8188f1864d.png?v=1784134481&width=900`,
    alt: "Karungali mala with tassel",
    options: ["6 mm", "8 mm", "10 mm"],
  },
  {
    id: "4",
    handle: "amethyst-bracelet",
    title: "Amethyst Bracelet – Calm & Spiritual Growth (Unisex)",
    category: "BRACELETS",
    price: 599,
    compareAt: 799,
    badge: "Sale",
    image: `${CDN}/files/Gemini_Generated_Image_mj2blzmj2blzmj2b_3.png?v=1784324910&width=900`,
    alt: "Amethyst bracelet",
    options: ["6 mm", "8 mm"],
  },
  {
    id: "5",
    handle: "dhan-yog-bracelet",
    title: "Dhan Yog Bracelet – Wealth & Prosperity Crystal Bracelet",
    category: "BRACELETS",
    price: 599,
    compareAt: 799,
    badge: "Sale",
    image: `${CDN}/files/1_63545601-9315-466f-adca-e91cc25a505b.png?v=1784280047&width=900`,
    alt: "Dhan Yog crystal bracelet",
    options: ["6 mm", "8 mm"],
  },
  {
    id: "6",
    handle: "kuber-potali",
    title: "Kuber Poojan Potli – Lakshmi Kuber Diwali Pooja Kit",
    category: "ENERGISED POTALI",
    price: 999,
    image: `${CDN}/files/1_87c5350a-2655-4eac-b0af-6ee9783577b0.png?v=1784144117&width=900`,
    alt: "Kuber Poojan Potli bag",
    reviewCount: 20,
  },
  {
    id: "7",
    handle: "lakhmi-potali",
    title: "Lakshmi Ganesh Potli Bag – Business Growth & Harmony Kit",
    category: "ENERGISED POTALI",
    price: 499,
    image: `${CDN}/files/13_67051fa5-49c8-4b63-99ec-c69708a8fb06.png?v=1784144179&width=900`,
    alt: "Lakshmi Ganesh Potli bag",
    reviewCount: 12,
  },
  {
    id: "8",
    handle: "3mukhi-rudraksha",
    title: "3 Mukhi Rudraksha Original – Certified Agni Tatva Bead",
    category: "RUDRAKSHA",
    price: 499,
    image: `${CDN}/files/1_d5106af3-fea2-424e-a2f7-2373c4466339.png?v=1784576541&width=900`,
    alt: "3 Mukhi Rudraksha bead",
    options: ["12 mm", "16 mm", "20 mm"],
  },
  {
    id: "9",
    handle: "4-mukhi-rudraksha",
    title: "4 Mukhi Rudraksha Original – Certified Brahma Tatva Bead",
    category: "RUDRAKSHA",
    price: 499,
    image: `${CDN}/files/6_0853e929-5d2f-4e43-9290-20dc424d9559.png?v=1776102897&width=900`,
    alt: "4 Mukhi Rudraksha bead",
    options: ["12 mm", "16 mm", "20 mm"],
  },
  {
    id: "10",
    handle: "6-mukhi-rudraksha",
    title: "6 Mukhi Rudraksha Original – Certified Kartikeya Bead",
    category: "RUDRAKSHA",
    price: 499,
    image: `${CDN}/files/1_31.png?v=1784577402&width=900`,
    alt: "6 Mukhi Rudraksha bead",
    options: ["12 mm", "16 mm", "20 mm"],
  },
  {
    id: "11",
    handle: "7-mukhi-rudraksha",
    title: "7 Mukhi Rudraksha Original – Certified Saturn & Wealth Bead",
    category: "RUDRAKSHA",
    price: 499,
    image: `${CDN}/files/1_29.png?v=1784576640&width=900`,
    alt: "7 Mukhi Rudraksha bead",
    options: ["12 mm", "16 mm", "20 mm"],
  },
  {
    id: "12",
    handle: "devama-the-divine-original-gaulochan-gorochan-authentic-spiritual-substance-for-tantra-pooja-and-sadhana-sacred-herbal-powder-for-ritual-use-for-external-use-only",
    title:
      "Gaulochan (Gorochan) – Authentic Ritual Powder for Pooja & Tantra",
    category: "POOJA ESSENTIALS",
    price: 449,
    image: `${CDN}/files/61HtJqOjiuL._SL1080.jpg?v=1768767837&width=900`,
    alt: "Gaulochan ritual powder",
  },
];

export const reviews: Review[] = [
  {
    title: "A considered first choice",
    quote:
      "The product details helped me compare the beads honestly as a first-time buyer. Felt guided, not pushed, into my sadhana practice.",
  },
  {
    title: "The details make a difference",
    quote:
      "I appreciated being able to look at the material and size information before choosing. Everything arrived exactly as described.",
  },
  {
    title: "A place for meaningful essentials",
    quote:
      "It's thoughtfully arranged, this collection makes browsing my home mandir feel simple and human.",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "How do I choose a Rudraksha Mukhi?",
    answer:
      "Each Mukhi carries a distinct intention and, for some individuals, beliefs if you are choosing for a particular tradition or practice, consult knowledgeable guidance rather than relying on personal outcomes.",
  },
  {
    question: "What can the certified authenticity details show?",
    answer:
      "Check the certified authenticity details and supporting information on the individual product listing. If a detail is unclear or missing, contact us before placing your order.",
  },
  {
    question: "How should I care for my beads and wood?",
    answer:
      "Follow the care and guidance in your specific product. Handle beads gently, keep them away from harsh chemicals and prolonged moisture, and store them carefully for everyday use.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Order tracking will be available on our new site very shortly. Meanwhile, use the Track Your Order page on our current store, or contact us for support.",
  },
  {
    question: "What are the shipping and return terms?",
    answer:
      "All orders are currently shipped only and return terms follow the applicable terms that apply to your order. Please review these policies before you purchase.",
  },
  {
    question: "When does the special gift offer apply?",
    answer:
      "The announcement offers a 'Special Gift' on orders above ₹499* applies to orders strictly above ₹499; an order of exactly ₹499 does not meet that threshold.",
  },
];
