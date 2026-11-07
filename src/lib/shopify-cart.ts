import { storefront, isShopifyConfigured } from "./shopify";
import type { Product } from "./types";

/**
 * ============================================================
 *  Shopify Storefront cart (server side)
 * ============================================================
 * Wraps the real cart: cartGet / cartCreate / cartLinesAdd /
 * cartLinesUpdate / cartLinesRemove, with the cart id kept in
 * an httpOnly cookie exposed to the browser — the client works
 * exclusively through /api/cart, and checkout goes through
 * Shopify's hosted checkout so payment and totals stay
 * server-authoritative.
 */

const CART_COOKIE = "dv_cart_id";

export type LiveCartItem = {
  /** Shopify cart line id (needed to update/remove the line). */
  lineId: string;
  /** Variant id (needed when re-adding this exact line). */
  variantId: string;
  handle: string;
  title: string;
  price: number;
  compareAt?: number;
  image: string;
  alt: string;
  category: string;
  quantity: number;
};

export type CartSnapshot = {
  mode: "shopify";
  cartId: string | null;
  checkoutUrl: string | null;
  items: LiveCartItem[];
};

export function cartCookieName(): string {
  return CART_COOKIE;
}

export type CartLineInput = { variantId: string; quantity: number };

const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    cost { subtotalAmount { amount } }
    lines(first: 50) {
      nodes {
        id
        quantity
        cost { totalAmount { amount } }
        merchandise {
          ... on ProductVariant {
            id
            price { amount }
            compareAtPrice { amount }
            image { url altText }
            product {
              handle
              title
              productType
              featuredImage { url altText }
            }
          }
        }
      }
    }
  }
`;

type CartFields = {
  id: string;
  checkoutUrl: string;
  cost: { subtotalAmount: { amount: string } };
  lines: {
    nodes: {
      id: string;
      quantity: number;
      cost: { totalAmount: { amount: string } };
      merchandise: {
        id: string;
        price: { amount: string };
        compareAtPrice: { amount: string } | null;
        image: { url: string; altText: string | null } | null;
        product: {
          handle: string;
          title: string;
          productType: string;
          featuredImage: { url: string; altText: string | null } | null;
        };
      };
    }[];
  };
};

function categoryLabel(productType: string): string {
  const t = productType.toUpperCase();
  if (t.includes("RUDRAKSHA")) return "RUDRAKSHA";
  if (t.includes("KARUNGALI") || t.includes("EBONY")) return "KARUNGALI";
  if (t.includes("BRACELET")) return "BRACELETS";
  if (t.includes("POTL") || t.includes("POTALI")) return "ENERGISED POTALI";
  return t || "SACRED ESSENTIALS";
}

function mapCart(node: CartFields): CartSnapshot {
  return {
    mode: "shopify",
    cartId: node.id,
    checkoutUrl: node.checkoutUrl,
    items: node.lines.nodes.map((l) => ({
      lineId: l.id,
      variantId: l.merchandise.id,
      handle: l.merchandise.product.handle,
      title: l.merchandise.product.title,
      price: Number(l.merchandise.price.amount),
      compareAt:
        l.merchandise.compareAtPrice &&
        Number(l.merchandise.compareAtPrice.amount) > Number(l.merchandise.price.amount)
          ? Number(l.merchandise.compareAtPrice.amount)
          : undefined,
      image:
        l.merchandise.image?.url ??
        l.merchandise.product.featuredImage?.url ??
        "",
      alt: l.merchandise.image?.altText ?? l.merchandise.product.title,
      category: categoryLabel(l.merchandise.product.productType),
      quantity: l.quantity,
    })),
  };
}

const EMPTY: CartSnapshot = {
  mode: "shopify",
  cartId: null,
  checkoutUrl: null,
  items: [],
};

export async function cartGet(cartId: string): Promise<CartSnapshot> {
  const data = await storefront<{
    cart: CartFields | null;
  }>(
    /* GraphQL */ `
      query cartGet($cartId: ID!) {
        cart(id: $cartId) { ...CartFields }
      }
      ${CART_FRAGMENT}
    `,
    { cartId }
  );
  return data.cart ? mapCart(data.cart) : EMPTY;
}

export async function cartCreate(
  lines: CartLineInput[]
): Promise<CartSnapshot> {
  const data = await storefront<{
    cartCreate: { cart: CartFields | null; userErrors: { message: string }[] };
  }>(
    /* GraphQL */ `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart { ...CartFields }
          userErrors { message }
        }
      }
      ${CART_FRAGMENT}
    `,
    { input: { lines } }
  );
  if (data.cartCreate.userErrors.length || !data.cartCreate.cart) {
    throw new Error(
      `cartCreate: ${data.cartCreate.userErrors.map((e) => e.message).join("; ") || "no cart"}`
    );
  }
  return mapCart(data.cartCreate.cart);
}

export async function cartLinesAdd(
  cartId: string,
  lines: CartLineInput[]
): Promise<CartSnapshot> {
  const data = await storefront<{
    cartLinesAdd: { cart: CartFields | null; userErrors: { message: string }[] };
  }>(
    /* GraphQL */ `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ...CartFields }
          userErrors { message }
        }
      }
      ${CART_FRAGMENT}
    `,
    { cartId, lines }
  );
  if (data.cartLinesAdd.userErrors.length || !data.cartLinesAdd.cart) {
    throw new Error(
      `cartLinesAdd: ${data.cartLinesAdd.userErrors.map((e) => e.message).join("; ")}`
    );
  }
  return mapCart(data.cartLinesAdd.cart);
}

export async function cartLinesUpdate(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<CartSnapshot> {
  const data = await storefront<{
    cartLinesUpdate: {
      cart: CartFields | null;
      userErrors: { message: string }[];
    };
  }>(
    /* GraphQL */ `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ...CartFields }
          userErrors { message }
        }
      }
      ${CART_FRAGMENT}
    `,
    { cartId, lines }
  );
  if (data.cartLinesUpdate.userErrors.length || !data.cartLinesUpdate.cart) {
    throw new Error(
      `cartLinesUpdate: ${data.cartLinesUpdate.userErrors.map((e) => e.message).join("; ")}`
    );
  }
  return mapCart(data.cartLinesUpdate.cart);
}

export async function cartLinesRemove(
  cartId: string,
  lineIds: string[]
): Promise<CartSnapshot> {
  const data = await storefront<{
    cartLinesRemove: {
      cart: CartFields | null;
      userErrors: { message: string }[];
    };
  }>(
    /* GraphQL */ `
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ...CartFields }
          userErrors { message }
        }
      }
      ${CART_FRAGMENT}
    `,
    { cartId, lineIds }
  );
  if (data.cartLinesRemove.userErrors.length || !data.cartLinesRemove.cart) {
    throw new Error(
      `cartLinesRemove: ${data.cartLinesRemove.userErrors.map((e) => e.message).join("; ")}`
    );
  }
  return mapCart(data.cartLinesRemove.cart);
}

export { isShopifyConfigured };
export type { Product };
