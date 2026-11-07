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
    rating: 4,
    product: "5 Mukhi Rudraksha",
    handle: "5-mukhi-rudraksha",
    collection: "rudraksha",
  },
  {
    title: "The details make a difference",
    quote:
      "I appreciated being able to look at the material and size information before choosing. Everything arrived exactly as described.",
    rating: 4.5,
    product: "Amethyst Bracelet",
    handle: "amethyst-bracelet",
    collection: "bracelets",
  },
  {
    title: "A place for meaningful essentials",
    quote:
      "It's thoughtfully arranged, this collection makes browsing my home mandir feel simple and human.",
    rating: 3.5,
    product: "Kuber Poojan Potli",
    handle: "kuber-potali",
    collection: "potli",
  },
  {
    title: "A simple everyday piece",
    quote:
      "The bead-count information helped me understand the mala and the care guidance was useful to read.",
    rating: 3.5,
    product: "Karungali Mala 108+1 Beads",
    handle: "karungali-mala-original",
    collection: "karungali",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "How do I choose a Rudraksha Mukhi?",
    answer:
      "Mukhi refers to the natural faces or divisions of a Rudraksha bead. Compare the Mukhi, material and listing details with the practice you intend to follow. If you are choosing for a particular tradition, seek knowledgeable guidance rather than relying on promised outcomes. Our single-bead choices from 2 to 7 Mukhi are each ₹499.",
    topic: "choosing",
  },
  {
    question: "Where can I check product-specific certification details?",
    answer:
      "Start with the individual product listing and any documentation described there. Certification information is product-specific, not a blanket claim about every item. Check what is covered and ask support if a detail is missing or unclear before buying. No government certification seal is implied.",
    topic: "authenticity",
  },
  {
    question: "How should I care for beads and natural wood?",
    answer:
      "Handle strings and bead surfaces gently. Use a soft cloth, keep pieces away from prolonged moisture and harsh chemicals, and store them carefully between uses. Wood, natural seeds and stone bracelets can need different care: follow the instructions for your specific piece and ask support before using oils, cleaners or other treatments.",
    topic: "care",
  },
  {
    question: "How can I track my order?",
    answer:
      "Use Track Your Order with your order reference and the contact you used at checkout. Review the latest available status there; if information is missing, ask support with your order reference. The sample order shown in these designs is illustrative and does not represent a live shipment.",
    topic: "orders",
  },
  {
    question: "When does the special gift offer apply?",
    answer:
      "The current offer is 'Special gift on orders above ₹499'. The value must be strictly above ₹499, not ₹499 and above. A single ₹499 item does not meet that condition. The sample basket of one Karungali Mala ₹499 and one Amethyst Bracelet ₹599 has a ₹1,098 item subtotal and meets the order-value condition.",
    topic: "gift",
  },
  {
    question: "What are the shipping fees and delivery times?",
    answer:
      "Shipping availability, fees and timing depend on the address and current store terms. Use the postcode lookup on a product page and review checkout information along with the current Shipping Policy before buying. Fees, tax amounts and delivery promises have not been provided for this design, so no fixed charges or dates are stated.",
    topic: "shipping",
  },
  {
    question: "Where can I understand refund or cancellation options?",
    answer:
      "Read the current Refund Policy and Terms of Service for the conditions that apply to your order. If you have an order-specific question, contact support with your reference and the details of your concern. Do not assume a refund window, cancellation option or eligibility from this design; the current policy text must be supplied before launch.",
    topic: "refunds",
  },
];
