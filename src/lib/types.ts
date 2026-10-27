export type Product = {
  id: string;
  /** Shopify-style handle — becomes /products/{handle} */
  handle: string;
  title: string;
  /** Small-caps label above the title, e.g. "RUDRAKSHA" */
  category: string;
  price: number;
  compareAt?: number;
  image: string;
  alt: string;
  badge?: string;
  /** Options shown as dots/circles under the image (e.g. bead sizes) */
  options?: string[];
  reviewCount?: number;
};

export type CollectionCard = {
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  href: string;
};

export type Review = {
  title: string;
  quote: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type SiteSettings = {
  name: string;
  announcement: string;
  freeGiftThreshold: number;
  instagram: string;
  youtube: string;
  pinterest: string;
};
