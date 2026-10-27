import Reveal from "@/components/reveal";
import ProgressSteps from "@/components/checkout/progress-steps";
import OrderSummary from "@/components/checkout/order-summary";

export const metadata = { title: "Checkout — Devama The Divine" };

const fieldClass =
  "mt-2 w-full rounded-lg border border-line bg-white/70 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-clay/60 focus:border-gold-deep";

const stateOptions = [
  "Select state",
  "Andhra Pradesh",
  "Delhi",
  "Gujarat",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
  "Other",
];

function Label({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: string;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
      {children}
      {!optional && <span className="text-terracotta"> *</span>}
      {optional && (
        <span className="ml-1.5 text-right text-xs text-clay">Optional</span>
      )}
    </label>
  );
}

export default function CheckoutPage() {
  return (
    <main className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[11px] text-clay sm:text-xs">
          <a href="/" className="hover:text-maroon">Home</a>
          <span className="px-1.5">/</span>
          <a href="/cart" className="hover:text-maroon">Cart</a>
          <span className="px-1.5">/</span>
          <span className="text-ink/70">Checkout</span>
        </nav>

        <Reveal>
          <p className="eyebrow mt-4 text-terracotta">Contact &amp; address</p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.08] text-ink sm:text-6xl">
            Where shall your journey continue?
          </h1>
          <p className="mt-3 max-w-lg text-sm font-light text-clay">
            Check out as a guest. Add your contact and delivery information
            before reviewing payment options.
          </p>
        </Reveal>

        {/* Checkout steps */}
        <Reveal className="mt-8 border-b border-line pb-5">
          <ProgressSteps
            steps={["Contact & address", "Payment", "Confirmation"]}
            current={0}
          />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr] lg:gap-10">
          {/* Left column */}
          <div>
            {/* Contact information */}
            <Reveal>
              <section className="rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
                <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                  Contact information
                </h2>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <p className="text-sm text-clay">Guest checkout</p>
                  <a
                    href="/account"
                    className="text-sm font-medium text-ink underline underline-offset-2 hover:text-maroon"
                  >
                    Already have an account? Sign in
                  </a>
                </div>
                <div className="mt-5">
                  <Label htmlFor="checkout-email">Email address</Label>
                  <input
                    id="checkout-email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email address"
                    className={fieldClass}
                  />
                  <p className="mt-3 text-[11px] leading-relaxed text-clay/80">
                    Use a contact you can access for order information. All
                    fields are empty; no personal data is shown.
                  </p>
                </div>
              </section>
            </Reveal>

            {/* Delivery address */}
            <Reveal className="mt-6">
              <section className="rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
                <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                  Delivery address
                </h2>

                <form className="mt-6" action="/checkout/payment">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="checkout-first-name">First name</Label>
                      <input
                        id="checkout-first-name"
                        autoComplete="given-name"
                        placeholder="First name"
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <Label htmlFor="checkout-last-name">Last name</Label>
                      <input
                        id="checkout-last-name"
                        autoComplete="family-name"
                        placeholder="Last name"
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <Label htmlFor="checkout-address">Street address</Label>
                    <input
                      id="checkout-address"
                      autoComplete="street-address"
                      placeholder="House / flat number and street"
                      className={fieldClass}
                    />
                  </div>

                  <div className="mt-5">
                    <Label htmlFor="checkout-address-2" optional>
                      Apartment, landmark or area
                    </Label>
                    <input
                      id="checkout-address-2"
                      autoComplete="address-line2"
                      placeholder="Optional address detail"
                      className={fieldClass}
                    />
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div>
                      <Label htmlFor="checkout-city">City</Label>
                      <input
                        id="checkout-city"
                        autoComplete="address-level2"
                        placeholder="City"
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <Label htmlFor="checkout-state">State</Label>
                      <select
                        id="checkout-state"
                        autoComplete="address-level1"
                        defaultValue="Select state"
                        className={`${fieldClass} cursor-pointer`}
                      >
                        {stateOptions.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="checkout-postcode">Postcode</Label>
                      <input
                        id="checkout-postcode"
                        autoComplete="postal-code"
                        inputMode="numeric"
                        placeholder="6-digit postcode"
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="checkout-country">Country / region</Label>
                      <select
                        id="checkout-country"
                        autoComplete="country-name"
                        className={`${fieldClass} cursor-pointer`}
                      >
                        <option>India</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="checkout-phone">Phone number</Label>
                      <input
                        id="checkout-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="Contact number for this order"
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <p className="mt-6 text-[11px] leading-relaxed text-clay/80">
                    Shipping availability, fees and timing depend on the
                    address and current store policies.
                  </p>
                </form>
              </section>
            </Reveal>

            {/* Actions */}
            <Reveal className="mt-8">
              <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href="/cart"
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium text-clay underline underline-offset-2 hover:text-maroon"
                >
                  <span aria-hidden>←</span>
                  Return to cart
                </a>
                <a
                  href="/checkout/payment"
                  className="btn-sheen inline-flex items-center justify-center gap-2.5 rounded-lg bg-ochre px-6 py-3.5 text-sm font-semibold text-maroon-dark transition-colors hover:bg-gold-deep"
                >
                  Continue to payment
                  <span aria-hidden className="transition-transform">→</span>
                </a>
              </div>
              <p className="mt-8 text-xs leading-relaxed text-clay">
                Review the current{" "}
                <a
                  href="/policies/privacy-policy"
                  className="underline underline-offset-2 hover:text-maroon"
                >
                  Privacy Policy
                </a>{" "}
                for how your information is handled. Required fields are
                marked <span className="text-terracotta">*</span>.
              </p>
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
