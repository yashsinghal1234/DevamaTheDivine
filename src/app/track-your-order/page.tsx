import Reveal from "@/components/reveal";
import OrderLookup from "@/components/track/order-lookup";
import {
  IconArrowUpRight,
  IconBox,
  IconCheck,
  IconHome,
  IconTruck,
} from "@/components/icons";
import { getDemoCart, demoSubtotal } from "@/lib/demo-cart";
import { inr } from "@/lib/format";
import Image from "next/image";

export const metadata = { title: "Track Your Order — Devama The Divine" };

const stages = [
  { icon: IconCheck, label: "Order received", status: "Completed · sample", state: "done" },
  { icon: IconBox, label: "Preparing your order", status: "Current · sample", state: "current" },
  { icon: IconTruck, label: "Dispatched", status: "Not yet · sample", state: "todo" },
  { icon: IconHome, label: "Delivered", status: "Not yet · sample", state: "todo" },
] as const;

export default function TrackOrderPage() {
  const items = getDemoCart();
  const subtotal = demoSubtotal(items);

  return (
    <main className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[11px] text-clay sm:text-xs">
          <a href="/" className="hover:text-maroon">Home</a>
          <span className="px-1.5">/</span>
          <span className="text-ink/70">Track Your Order</span>
        </nav>

        <Reveal>
          <p className="eyebrow mt-4 text-terracotta">Track your order</p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.08] text-ink sm:text-6xl">
            Follow your sacred essentials
          </h1>
          <p className="mt-3 max-w-lg text-sm font-light text-clay">
            Find the latest available order information with your order
            reference and the contact used at checkout.
          </p>
        </Reveal>

        {/* Lookup + help cards */}
        <div className="mt-9 grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr] lg:gap-7">
          <Reveal>
            <section className="h-full rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
              <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                Find your order
              </h2>
              <div className="mt-5">
                <OrderLookup />
              </div>
            </section>
          </Reveal>

          <Reveal delay={120}>
            <section className="h-full rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
              <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                Can&rsquo;t find your reference?
              </h2>
              <p className="mt-4 text-sm font-light leading-relaxed text-clay">
                Check the order information supplied by the store. If you still
                need help, share the contact used for the order through our
                support form.
              </p>
              <a
                href="/pages/contact-us"
                className="group mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-clay underline underline-offset-2 hover:text-maroon sm:text-sm"
              >
                Contact order support
                <IconArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </section>
          </Reveal>
        </div>

        {/* Sample order */}
        <Reveal className="mt-6">
          <section className="rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
            <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
              Sample order · DV-SAMPLE-001
            </h2>

            {/* Notice */}
            <div className="mt-5 rounded-xl bg-gold/10 p-4 sm:p-5">
              <p className="flex items-center gap-2 text-sm font-medium text-maroon-deep">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  className="h-4 w-4 text-gold-deep"
                  aria-hidden
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8h.01M12 11v5" />
                </svg>
                Illustrative tracking example · DV-SAMPLE-001
              </p>
              <p className="mt-1 text-xs text-clay sm:text-[13px]">
                Sample status: preparing your order. This is demonstration
                data, not a live shipment or delivery promise.
              </p>
            </div>

            {/* Stage timeline */}
            <ol className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
              {stages.map(({ icon: Icon, label, status, state }) => (
                <li key={label}>
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                      state === "done"
                        ? "bg-maroon text-cream"
                        : state === "current"
                          ? "bg-maroon text-cream"
                          : "bg-sand text-clay"
                    } ${state === "current" ? "pulse-ring" : ""}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-sm font-medium text-ink">{label}</p>
                  <p className="mt-1 text-[11px] text-clay">{status}</p>
                </li>
              ))}
            </ol>

            <div className="mt-9 grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
              {/* Line items */}
              <div>
                <ul className="divide-y divide-line/80">
                  {items.map((item, i) => (
                    <li key={item.handle} className={`flex items-center gap-4 py-4 ${i === 0 ? "pt-0" : ""}`}>
                      <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-sand/60 sm:h-20 sm:w-20">
                        <Image
                          src={item.image}
                          alt={item.alt}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-ink sm:text-[15px]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-clay">
                          Quantity {item.quantity}
                        </p>
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
                <p className="mt-2 text-right text-xs text-clay">
                  Item subtotal · {inr(subtotal)}
                </p>
              </div>

              {/* Status copy */}
              <div className="border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <h3 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
                  Preparing your order
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-clay">
                  In this example, the order has been received and preparation
                  is in progress. Dispatch and delivery stages have not been
                  reached.
                </p>
                <p className="mt-5 text-xs leading-relaxed text-clay/80">
                  No carrier, live tracking link or precise delivery date is
                  available in this illustrative example.
                </p>
                <a
                  href="/pages/track-your-order"
                  className="group mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-clay underline underline-offset-2 hover:text-maroon sm:text-sm"
                >
                  View sample order details
                  <IconArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Bottom row */}
        <Reveal className="mt-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-serif text-2xl font-medium text-ink sm:text-4xl">
              A little clarity, whenever you need it.
            </p>
            <a
              href="/faq"
              className="group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-lg border border-ink/30 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-maroon hover:bg-maroon hover:text-cream"
            >
              Read tracking FAQs
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
