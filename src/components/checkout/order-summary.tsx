import Image from "next/image";
import { getDemoCart, demoSubtotal } from "@/lib/demo-cart";
import { inr } from "@/lib/format";

/**
 * Sticky order summary shared by the checkout Contact & address page and
 * the Payment page, so the basket shown in both stages always matches.
 */
export default function OrderSummary() {
  const items = getDemoCart();
  const subtotal = demoSubtotal(items);

  return (
    <aside className="h-fit space-y-4 rounded-2xl border border-line bg-cream-card p-6 sm:p-8 lg:sticky lg:top-32">
      <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
        Order summary
      </h2>

      <ul className="mt-6 space-y-5">
        {items.map((item) => (
          <li key={item.handle} className="flex items-start gap-4">
            <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-sand/60 sm:h-16 sm:w-16">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="64px"
                className="object-cover"
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink sm:text-[15px]">
                {item.title}
              </p>
              <p className="mt-1 text-xs text-clay">Quantity {item.quantity}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-serif text-lg font-semibold text-ink">
                {inr(item.price * item.quantity)}
              </p>
              {item.compareAt && (
                <p className="text-xs text-clay line-through">{inr(item.compareAt)}</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t border-line pt-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-ink">Item subtotal</p>
          <p className="font-serif text-2xl font-bold text-ink">{inr(subtotal)}</p>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <p className="text-clay">Shipping</p>
          <p className="text-clay">Calculated at checkout</p>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm">
          <p className="text-clay">Taxes</p>
          <p className="text-clay">Calculated at checkout</p>
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-clay/80">
          Final payable amount is shown when applicable shipping and taxes are
          known.
        </p>
      </div>

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
          A thoughtful extra
        </p>
        <p className="mt-1 text-xs leading-relaxed text-clay sm:text-[13px]">
          Special gift on orders above ₹499. Your {inr(subtotal)} basket meets
          the order-value condition.
        </p>
      </div>

      <a
        href="/pages/contact-us"
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink underline underline-offset-2 hover:text-maroon"
      >
        Need help with your order?
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        >
          <path d="M7 17L17 7" />
          <path d="M9 7h8v8" />
        </svg>
      </a>
    </aside>
  );
}
