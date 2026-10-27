"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/lib/types";

export type WishlistItem = {
  handle: string;
  title: string;
  price: number;
  compareAt?: number;
  image: string;
  alt: string;
  category: string;
};

const STORAGE_KEY = "devama-wishlist";

type WishlistContextValue = {
  items: WishlistItem[];
  count: number;
  has: (handle: string) => boolean;
  toggle: (item: WishlistItem) => boolean;
  remove: (handle: string) => void;
};

/** Builds a storable wishlist entry from any product-shaped object. */
export function toWishlistItem(product: {
  handle: string;
  title: string;
  price: number;
  compareAt?: number;
  image: string;
  category: string;
  alt?: string;
}): WishlistItem {
  return {
    handle: product.handle,
    title: product.title,
    price: product.price,
    compareAt: product.compareAt,
    image: product.image,
    alt: product.alt ?? product.title,
    category: product.category,
  };
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  // Becomes true once the stored wishlist has been read. Saving is gated on
  // this so the first mount can never overwrite storage with an empty list
  // (StrictMode runs mount effects twice in dev — without this gate the
  // saved wishlist was wiped on every refresh).
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable
    }
  }, [items, hydrated]);

  const has = useCallback(
    (handle: string) => items.some((i) => i.handle === handle),
    [items]
  );

  const remove = useCallback((handle: string) => {
    setItems((prev) => prev.filter((i) => i.handle !== handle));
  }, []);

  const toggle = useCallback(
    (item: WishlistItem) => {
      let added = false;
      setItems((prev) => {
        if (prev.some((i) => i.handle === item.handle)) {
          return prev.filter((i) => i.handle !== item.handle);
        }
        added = true;
        return [...prev, item];
      });
      return added;
    },
    []
  );

  const value = useMemo(
    () => ({ items, count: items.length, has, toggle, remove }),
    [items, has, toggle, remove]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used inside <WishlistProvider>");
  }
  return ctx;
}
