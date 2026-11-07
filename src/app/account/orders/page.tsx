import { Suspense } from "react";
import Image from "next/image";
import Reveal from "@/components/reveal";
import AccountSidebar from "@/components/account/account-sidebar";
import { getDemoCart } from "@/lib/demo-cart";
import { inr } from "@/lib/format";

export const metadata = { title: "My Orders — Devama The Divine" };

const STATUSES = [
  { slug: "", label: "All orders" },
  { slug: "preparing", label: "Preparing" },
  { slug: "dispatched", label: "Dispatched" },
  { slug: "delivered", label: "Delivered" },
];

const SAMPLE_ORDER = { id: "DV-SAMPLE-001", status: "preparing" };

type OrdersSearchParams = { status?: string | string[] };

function buildHref(status: string) {
  return status ? `/account/orders?status=${status}` : "/account/orders";
}

function chipIsActive(slug: string, active: string) {
  if (slug === "") return active === "";
  return slug === active;
}

async function OrdersBody({ searchParams }: { searchParams: Promise<OrdersSearchParams> }) {
  const sp = await searchParams;
  const status = [sp.status ?? ""].flat().join(" ").trim().toLowerCase();

  const items = getDemoCart();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const statusMatches =
    status === "" || status === SAMPLE_ORDER.status;

  return (
    <>
      {/* History notice */}
      <div className="rounded-xl bg-gold/10 p-4 sm:p-5 sm:pl-6">
        <p className="flex items-start gap-2 text-[13px] font-semibold text-maroon-deep sm:text-sm">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            className="mt-0.5 h-4 w-4 shrink-0 text-maroon-deep"
            aria-hidden
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8h.01M12 11v5" />
          </svg>
          Sample order history
        </p>
        <p className="mt-1 pl-6 text-xs leading-relaxed text-clay sm:text-[13px]">
          This list contains one illustrative order. Status labels and purchase
          details are sample data, not a real customer&rsquo;s order history.
        </p>
      </div>

      {/* Status filter chips + count */}
      <div className="mt-6 flex flex-wrap items-center gap-2 -mx-4 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
        {STATUSES.map((s) => (
          <a
            key={s.label}
            href={buildHref(s.slug)}
            aria-current={chipIsActive(s.slug, status) ? "true" : undefined}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors sm:text-[13px] ${
              chipIsActive(s.slug, status)
                ? "bg-maroon text-cream"
                : "border border-line bg-cream-card text-ink/75 hover:border-maroon/50 hover:text-maroon"
            }`}
          >
            {s.label}
          </a>
        ))}
        <span className="ml-auto hidden shrink-0 pl-4 text-xs text-clay sm:inline">
          {statusMatches ? "1 sample order" : "0 sample orders"}
        </span>
      </div>

      {/* Order card / empty state */}
      {statusMatches ? (
        <Reveal className="mt-5">
          <section className="rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                  {SAMPLE_ORDER.id}
                </h2>
                <p className="mt-1.5 text-xs text-clay sm:text-sm">
                  Sample order · {items.length} items · Preparing
                </p>
              </div>
              <span className="rounded-full bg-gold/15 px-3.5 py-1.5 text-[11px] font-medium text-maroon-deep sm:text-xs">
                Preparing your order · Sample
              </span>
            </div>

            <ul className="mt-7 divide-y divide-line/80">
              {items.map((item) => (
                <li key={item.handle} className="flex items-center gap-4 py-4">
                  <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-sand/60 sm:h-16 sm:w-16">
                    <Image src={item.image} alt={item.alt} fill sizes="64px" className="object-cover" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <a
                      href={`/products/${item.handle}`}
                      className="truncate text-sm font-semibold text-ink hover:underline sm:text-[15px]"
                    >
                      {item.title}
                    </a>
                    <p className="mt-1 text-xs text-clay">Quantity {item.quantity}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-ink sm:text-[15px]">
                      {inr(item.price * item.quantity)}
                    </p>
                    {item.compareAt && (
                      <p className="text-xs text-clay line-through">
                        {inr(item.compareAt)}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
              <p className="text-xs text-clay sm:text-sm">
                Item subtotal + shipping / tax calculated at checkout
              </p>
              <p className="font-serif text-2xl font-bold text-ink sm:text-3xl">
                {inr(subtotal)}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/track-your-order"
                className="btn-sheen inline-flex items-center gap-2.5 rounded-lg bg-maroon px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-maroon-deep"
              >
                View order details
                <span aria-hidden className="transition-transform">→</span>
              </a>
              <a
                href="/track-your-order"
                className="group inline-flex items-center gap-2.5 rounded-lg border border-ink/30 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-maroon hover:bg-maroon hover:text-cream"
              >
                Track order
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </section>
        </Reveal>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-line bg-cream-card p-10 text-center">
          <p className="font-serif text-2xl text-ink">
            No sample orders in this status
          </p>
          <p className="mt-2 text-sm text-clay">
            The illustrative order is{" "}
            <a href={buildHref("preparing")} className="text-maroon-deep underline underline-offset-2 hover:text-maroon">
              Preparing
            </a>{" "}
            — try that filter to see it again.
          </p>
        </div>
      )}

      {/* Bottom helpers */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Reveal>
          <section className="h-full rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
            <h2 className="font-serif text-3xl font-medium text-ink">
              Looking for an order?
            </h2>
            <p className="mt-3 text-sm font-light leading-relaxed text-clay">
              Guest orders can be looked up with the order reference and
              contact used at checkout.
            </p>
            <a
              href="/track-your-order"
              className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-maroon-deep underline underline-offset-2 hover:text-maroon"
            >
              Track Your Order
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          </section>
        </Reveal>
        <Reveal delay={120}>
          <section className="h-full rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
            <h2 className="font-serif text-3xl font-medium text-ink">
              Your next meaningful piece
            </h2>
            <p className="mt-3 text-sm font-light leading-relaxed text-clay">
              Explore the collection whenever you&rsquo;re ready to continue
              your personal practice.
            </p>
            <a
              href="/collections/all"
              className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-maroon-deep underline underline-offset-2 hover:text-maroon"
            >
              Shop all products
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          </section>
        </Reveal>
      </div>
    </>
  );
}

export default function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<OrdersSearchParams>;
}) {
  return (
    <main className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[11px] text-clay sm:text-xs">
          <a href="/" className="hover:text-maroon">Home</a>
          <span className="px-1.5">/</span>
          <a href="/account" className="hover:text-maroon">Account</a>
          <span className="px-1.5">/</span>
          <span className="text-ink/70">My orders</span>
        </nav>

        <Reveal>
          <p className="eyebrow mt-4 text-terracotta">My orders</p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.08] text-ink sm:text-6xl">
            Your collection, chapter by chapter
          </h1>
          <p className="mt-3 max-w-lg text-sm font-light text-clay">
            Find your order references, selected pieces and the latest
            available order status in one place.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[250px_1fr] lg:gap-10">
          <AccountSidebar active="orders" />
          <div>
            <Suspense fallback={<div className="h-40 animate-pulse rounded-2xl bg-line/60" />}>
              <OrdersBody searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
