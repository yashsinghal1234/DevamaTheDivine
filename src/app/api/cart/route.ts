import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  cartCookieName,
  cartGet,
  cartCreate,
  cartLinesAdd,
  cartLinesUpdate,
  cartLinesRemove,
  isShopifyConfigured,
  type CartSnapshot,
} from "@/lib/shopify-cart";
import { getDemoCart, demoSubtotal } from "@/lib/demo-cart";

/**
 * Cart API — the browser never sees the Storefront token. When credentials
 * are configured, this proxies the real Shopify cart (cart id kept in an
 * httpOnly cookie); otherwise it answers with the illustrative demo items,
 * so the identical UI keeps working before the token exists.
 */

type CartBody = {
  action: "add" | "update" | "remove";
  variantId?: string;
  lineId?: string;
  quantity?: number;
};

/** Apply a cart snapshot to the response and persist the cart id cookie. */
async function finalize(cart: CartSnapshot) {
  const cookieStore = await cookies();
  const name = cartCookieName();
  if (cart.cartId && cookieStore.get(name)?.value !== cart.cartId) {
    cookieStore.set(name, cart.cartId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return {
    mode: cart.mode,
    cartId: cart.cartId,
    checkoutUrl: cart.checkoutUrl,
    items: cart.items,
    count: cart.items.reduce((s, i) => s + i.quantity, 0),
    subtotal: cart.items.reduce((s, i) => s + i.price * i.quantity, 0),
  };
}

async function shopifyPayload(): Promise<Response> {
  const cookieStore = await cookies();
  const name = cartCookieName();
  const cartId = cookieStore.get(name)?.value;
  try {
    if (!cartId) {
      return NextResponse.json(
        await finalize({
          mode: "shopify",
          cartId: null,
          checkoutUrl: null,
          items: [],
        })
      );
    }
    return NextResponse.json(await finalize(await cartGet(cartId)));
  } catch {
    // Expired or unowned cart id — start small; the next mutation creates it.
    return NextResponse.json(
      await finalize({
        mode: "shopify",
        cartId: null,
        checkoutUrl: null,
        items: [],
      })
    );
  }
}

/** Response shape used while the storefront is not connected. */
function demoPayload() {
  const items = getDemoCart();
  return {
    mode: "demo" as const,
    cartId: null,
    checkoutUrl: "/checkout" as const,
    items,
    count: items.reduce((s, i) => s + i.quantity, 0),
    subtotal: demoSubtotal(items),
  };
}

export async function GET() {
  if (isShopifyConfigured()) {
    return shopifyPayload();
  }
  return NextResponse.json(demoPayload());
}

export async function POST(request: Request) {
  let body: CartBody;
  try {
    body = (await request.json()) as CartBody;
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  if (!isShopifyConfigured()) {
    // No backend yet — the client falls back to purely local state.
    return NextResponse.json({ mode: "demo", muted: true });
  }

  try {
    const cookieStore = await cookies();
    const name = cartCookieName();
    const existing = cookieStore.get(name)?.value;

    // Ensure a cart exists before any line operation; seeding the creation
    // with the first line avoids a create-then-add double round trip.
    if (!existing) {
      const seed: { variantId: string; quantity: number }[] =
        body.action === "add" && body.variantId && body.quantity
          ? [{ variantId: body.variantId, quantity: body.quantity }]
          : [];
      return NextResponse.json(await finalize(await cartCreate(seed)));
    }

    let snapshot: CartSnapshot;
    if (body.action === "add" && body.variantId && body.quantity) {
      snapshot = await cartLinesAdd(existing, [
        { variantId: body.variantId, quantity: body.quantity },
      ]);
    } else if (body.action === "update" && body.lineId && body.quantity) {
      snapshot =
        body.quantity >= 1
          ? await cartLinesUpdate(existing, [
              { id: body.lineId, quantity: body.quantity },
            ])
          : await cartLinesRemove(existing, [body.lineId]);
    } else if (body.action === "remove" && body.lineId) {
      snapshot = await cartLinesRemove(existing, [body.lineId]);
    } else {
      return NextResponse.json({ error: "invalid action" }, { status: 400 });
    }

    return NextResponse.json(await finalize(snapshot));
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "cart operation failed" },
      { status: 502 }
    );
  }
}
