import Reveal from "@/components/reveal";
import ContactForm from "@/components/contact/contact-form";
import { IconArrowUpRight, IconBox } from "@/components/icons";

export const metadata = { title: "Contact us — Devama The Divine" };

export default function ContactUsPage() {
  return (
    <main className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[11px] text-clay sm:text-xs">
          <a href="/" className="hover:text-maroon">Home</a>
          <span className="px-1.5">/</span>
          <span className="text-ink/70">Contact and customer support</span>
        </nav>

        <Reveal>
          <p className="eyebrow mt-4 text-terracotta">
            Contact and customer support
          </p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.08] text-ink sm:text-6xl">
            Let&rsquo;s find a little clarity
          </h1>
          <p className="mt-3 max-w-lg text-sm font-light text-clay">
            Ask about a product, its details or your order — we&rsquo;ll point
            you to the right information.
          </p>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
          {/* Form */}
          <Reveal>
            <ContactForm />
          </Reveal>

          {/* Side panel */}
          <div className="space-y-5">
            <Reveal delay={90}>
              <section className="rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15">
                    <IconBox className="h-5 w-5 text-maroon-deep" />
                  </span>
                  <h2 className="font-serif text-3xl font-medium text-ink">
                    For order questions
                  </h2>
                </div>
                <p className="mt-4 text-sm font-light leading-relaxed text-clay">
                  The quickest way to understand a delivery is to check the
                  latest status yourself, with your order reference.
                </p>
                <div className="mt-5 space-y-3">
                  <a
                    href="/track-your-order"
                    className="btn-sheen inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-ochre px-5 py-3 text-sm font-semibold text-maroon-dark transition-colors hover:bg-gold-deep"
                  >
                    Track Your Order
                    <span aria-hidden className="transition-transform">→</span>
                  </a>
                  <a
                    href="/account/orders"
                    className="group inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-ink/30 px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-maroon hover:text-maroon"
                  >
                    View my orders
                    <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </section>
            </Reveal>

            <Reveal delay={150}>
              <section className="rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
                <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                  Before you ask
                </h2>
                <p className="mt-4 text-sm font-light leading-relaxed text-clay">
                  Many answers are already written down — material details,
                  care guidance and policy information.
                </p>
                <div className="mt-5 space-y-3 text-sm font-medium">
                  <a
                    href="/faq"
                    className="group flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-3 text-clay transition-colors hover:border-maroon/50 hover:text-maroon"
                  >
                    Read Help / FAQ
                    <IconArrowUpRight className="h-4 w-4 text-terracotta transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a
                    href="/pages/shopping-information"
                    className="group flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-3 text-clay transition-colors hover:border-maroon/50 hover:text-maroon"
                  >
                    Shipping &amp; refund information
                    <IconArrowUpRight className="h-4 w-4 text-terracotta transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </section>
            </Reveal>

            <Reveal delay={210}>
              <div className="rounded-xl bg-gold/10 p-4 sm:p-5">
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
                  Published support channels
                </p>
                <p className="mt-1 pl-6 text-xs leading-relaxed text-clay sm:text-[13px]">
                  Only the contact channels published on the live store are
                  official. This page is a form-design preview; it does not
                  receive or answer enquiries.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
}
