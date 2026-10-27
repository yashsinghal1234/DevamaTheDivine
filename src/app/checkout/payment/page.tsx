import Reveal from "@/components/reveal";
import ProgressSteps from "@/components/checkout/progress-steps";
import PaymentMethods from "@/components/checkout/payment-methods";
import OrderSummary from "@/components/checkout/order-summary";
import { getDemoCart, demoSubtotal } from "@/lib/demo-cart";
import { inr } from "@/lib/format";

export const metadata = { title: "Payment — Devama The Divine" };

export default function PaymentPage() {
  const items = getDemoCart();
  const subtotal = demoSubtotal(items);

  return (
    <main className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[11px] text-clay sm:text-xs">
          <a href="/" className="hover:text-maroon">Home</a>
          <span className="px-1.5">/</span>
          <a href="/cart" className="hover:text-maroon">Cart</a>
          <span className="px-1.5">/</span>
          <a href="/cart" className="hover:text-maroon">Checkout</a>
          <span className="px-1.5">/</span>
          <span className="text-ink/70">Payment</span>
        </nav>

        <Reveal>
          <p className="eyebrow mt-4 text-terracotta">Payment</p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.08] text-ink sm:text-6xl">
            Review, then choose your payment
          </h1>
          <p className="mt-3 max-w-lg text-sm font-light text-clay">
            Your {items.length} selected {items.length === 1 ? "piece remains" : "pieces remain"} in the basket.
            Review address information and applicable charges before paying.
          </p>
        </Reveal>

        {/* Checkout steps */}
        <Reveal className="mt-8 border-b border-line pb-5">
          <ProgressSteps
            steps={["Contact & address", "Payment", "Confirmation"]}
            current={1}
          />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr] lg:gap-10">
          {/* Left column */}
          <div>
            {/* Contact & delivery */}
            <Reveal>
              <section className="rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
                <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                  Contact &amp; delivery
                </h2>
                <div className="mt-5 rounded-xl bg-gold/10 p-4 sm:p-5 text-xs leading-relaxed text-clay sm:text-[13px]">
                  <p className="flex items-start gap-2 font-medium text-maroon-deep">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep"
                      aria-hidden
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 8h.01M12 11v5" />
                    </svg>
                    Illustrative address summary
                  </p>
                  <p className="mt-2 pl-6">
                    [Recipient name] · [Email address] · [Phone number]
                    <br />
                    [Street address], [City], [State], [Postcode], India
                  </p>
                </div>
                <a
                  href="/cart"
                  className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-clay underline underline-offset-2 hover:text-maroon"
                >
                  Edit contact &amp; address
                  <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>↗</span>
                </a>
              </section>
            </Reveal>

            {/* Payment method */}
            <Reveal className="mt-6">
              <section className="rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
                <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                  Payment method
                </h2>
                <div className="mt-5">
                  <PaymentMethods />
                </div>
              </section>
            </Reveal>

            {/* Charges notice */}
            <Reveal className="mt-6">
              <div className="rounded-xl bg-gold/10 p-4 sm:p-5">
                <p className="flex items-center gap-2 text-sm font-medium text-maroon-deep">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    className="h-4 w-4 shrink-0 text-gold-deep"
                    aria-hidden
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8h.01M12 11v5" />
                  </svg>
                  Charges still to be calculated
                </p>
                <p className="mt-1 text-xs leading-relaxed text-clay sm:text-[13px]">
                  Item subtotal: {inr(subtotal)}. Shipping and taxes are
                  calculated at checkout. A final payable amount is not shown
                  while these charges are unknown.
                </p>
              </div>
            </Reveal>

            {/* Actions */}
            <Reveal className="mt-8">
              <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href="/cart"
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium text-clay underline underline-offset-2 hover:text-maroon"
                >
                  <span aria-hidden>←</span>
                  Back to address
                </a>
                <button
                  type="button"
                  className="btn-sheen inline-flex items-center justify-center gap-2.5 rounded-lg bg-ochre px-6 py-3.5 text-sm font-semibold text-maroon-dark transition-colors hover:bg-gold-deep"
                >
                  Review final amount
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </button>
              </div>
              <nav className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2 text-sm font-medium text-ink/70">
                <a href="/policies/terms-of-service" className="underline underline-offset-2 hover:text-maroon">
                  Terms of Service
                </a>
                <a href="/policies/refund-policy" className="underline underline-offset-2 hover:text-maroon">
                  Refund Policy
                </a>
                <a href="/policies/privacy-policy" className="underline underline-offset-2 hover:text-maroon">
                  Privacy Policy
                </a>
              </nav>
            </Reveal>
          </div>

          {/* Order summary */}
          <Reveal delay={150}>
            <OrderSummary />
          </Reveal>
        </div>
      </div>
    </main>
  );
}
