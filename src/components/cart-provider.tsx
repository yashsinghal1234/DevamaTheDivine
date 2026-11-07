"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { DemoCartItem } from "@/lib/demo-cart";

/**
 * Basket state for the whole app.
 *
 * • While the Shopify backend is not connected, /api/cart answers with the
 *   illustrative demo basket and every mutation stays purely local — the
 *   exact behaviour the design used before the backend existed.
 * • Once SHOPIFY_STORE_DOMAIN + SHOPIFY_STOREFRONT_ACCESS_TOKEN exist,
 *   the same endpoints return the real Shopify cart and every mutation is
 *   proxied through /api/cart (the token never reaches the browser), with
 *   checkout happening on Shopify's hosted checkout.
 */

export type CartItem = DemoCartItem & {
  /** Shopify cart line id — present only in live (shopify) mode. */
  lineId?: string;
  /** Shopify variant id — present only in live (shopify) mode. */
  variantId?: string;
};

export type AddPayload = {
  handle: string;
  title: string;
  price: number;
  compareAt?: number;
  image: string;
  alt: string;
  category: string;
  variantId?: string;
};

type CartMode = "loading" | "demo" | "shopify";

type CartContextValue = {
  mode: CartMode;
  /** True once /api/cart has answered — before that use initial items. */
  ready: boolean;
  items: CartItem[];
  count: number;
  subtotal: number;
  /** "/checkout" in demo mode; Shopify's hosted checkout URL when live. */
  checkoutUrl: string;
  error: string | null;
  add: (item: AddPayload, quantity?: number) => void;
  updateQty: (handle: string, quantity: number) => void;
  remove: (handle: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

type ApiResponse = {
  mode: "demo" | "shopify";
  muted?: boolean;
  items?: CartItem[];
  count?: number;
  subtotal?: number;
  checkoutUrl?: string;
  error?: string;
};

function clampQty(q: number): number {
  return Math.max(1, Math.min(9, q));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<CartMode>("loading");
  const [items, setItems] = useState<CartItem[]>([]);
  const [checkoutUrl, setCheckoutUrl] = useState("/checkout");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/cart", { cache: "no-store" });
        const data = (await res.json()) as ApiResponse;
        if (cancelled) return;
        setMode(data.mode);
        setItems(data.items ?? []);
        setCheckoutUrl(data.checkoutUrl ?? "/checkout");
      } catch {
        if (!cancelled) {
          setMode("demo");
          setItems([]);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const post = useCallback(
    async (body: Record<string, unknown>): Promise<boolean> => {
      if (mode !== "shopify") return false;
      try {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          cache: "no-store",
        });
        const data = (await res.json()) as ApiResponse;
        if (!res.ok || data.error) throw new Error(data.error ?? res.statusText);
        if (data.mode === "demo") return false; // backend not connected
        setItems(data.items ?? []);
        setCheckoutUrl(data.checkoutUrl ?? "/checkout");
        setError(null);
        return true;
      } catch (e) {
        setError(e instanceof Error ? e.message : "Cart update failed");
        return true; // handled (failed live) — don't mutate locally
      }
    },
    [mode]
  );

  const add = useCallback(
    (item: AddPayload, quantity = 1) => {
      if (mode === "shopify") {
        if (!item.variantId) {
          setError(
            "This piece has no purchasable variant at the moment."
          );
          return;
        }
        void post({
          action: "add",
          variantId: item.variantId,
          quantity: clampQty(quantity),
        });
        return;
      }
      // Demo mode — purely local basket, same as the previous design.
      setItems((prev) => {
        const found = prev.find((i) => i.handle === item.handle);
        if (found) {
          return prev.map((i) =>
            i.handle === item.handle
              ? { ...i, quantity: clampQty(i.quantity + quantity) }
              : i
          );
        }
        return [
          ...prev,
          { ...item, quantity: clampQty(quantity) } as CartItem,
        ];
      });
    },
    [mode, post]
  );

  const updateQty = useCallback(
    (handle: string, quantity: number) => {
      const next = clampQty(quantity);
      const line = items.find((i) => i.handle === handle);
      if (mode === "shopify" && line?.lineId) {
        void post({ action: "update", lineId: line.lineId, quantity: next });
        return;
      }
      setItems((prev) =>
        prev.map((i) => (i.handle === handle ? { ...i, quantity: next } : i))
      );
    },
    [items, mode, post]
  );

  const remove = useCallback(
    (handle: string) => {
      const line = items.find((i) => i.handle === handle);
      if (mode === "shopify" && line?.lineId) {
        void post({ action: "remove", lineId: line.lineId });
        return;
      }
      setItems((prev) => prev.filter((i) => i.handle !== handle));
    },
    [items, mode, post]
  );

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((s, i) => s + i.quantity, 0);
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    return {
      mode,
      ready: mode !== "loading",
      items,
      count,
      subtotal,
      checkoutUrl,
      error,
      add,
      updateQty,
      remove,
    };
  }, [mode, items, checkoutUrl, error, add, updateQty, remove]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return ctx;
}
