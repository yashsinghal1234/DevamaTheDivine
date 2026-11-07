import Reveal from "@/components/reveal";
import { IconArrowUpRight, IconBox, IconShieldCheck, IconTruck } from "@/components/icons";

export const metadata = {
  title: "Shopping information — Devama The Divine",
};

const POLICIES = [
  {
    title: "Shipping Policy",
    icon: IconTruck,
    href: "/policies/shipping-policy",
    body: "Coverage, delivery areas and timing for orders placed through the store.",
  },
  {
    title: "Refund Policy",
    icon: IconBox,
    href: "/policies/refund-policy",
    body: "Conditions under which refunds, returns or cancellations may apply.",
  },
  {
    title: "Privacy Policy",
    icon: IconShieldCheck,
    href: "/policies/privacy-policy",
    body: "How personal details shared with the store are handled and protected.",
  },
  {
    title: "Terms of Service",
    icon: undefined,
    href: "/policies/terms-of-service",
    body: "The general agreement between you and Devama The Divine.",
  },
];

export default function ShoppingInformationPage() {
  return (
    <main className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[11px] text-clay sm:text-xs">
          <a href="/" className="hover:text-maroon">Home</a>
          <span className="px-1.5">/</span>
          <span className="text-ink/70">Shopping information</span>
        </nav>

        <Reveal>
          <p className="eyebrow mt-4 text-terracotta">Policies and shopping information</p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.08] text-ink sm:text-6xl">
            Shop with understanding
          </h1>
          <p className="mt-3 max-w-lg text-sm font-light text-clay">
            The documents that govern orders, deliveries, refunds and your
            details — all in one place.
          </p>
        </Reveal>

        {/* Policy-content notice */}
        <Reveal className="mt-8">
          <div className="rounded-xl bg-maroon px-5 py-4 text-cream sm:px-6 sm:py-5">
            <p className="text-sm font-semibold">Current policy content required before launch</p>
            <p className="mt-1 text-xs leading-relaxed text-cream/80 sm:text-[13px]">
              This hub is prepared and the policy cards below are linked, but
              the store&rsquo;s current policy text has not been supplied for
              these designs. No summary here replaces the real documents.
            </p>
          </div>
        </Reveal>

        {/* Policy cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {POLICIES.map((p, i) => (
            <Reveal key={p.title} delay={i * 90} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  {p.icon ? (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15">
                      <p.icon className="h-5 w-5 text-maroon-deep" />
                    </span>
                  ) : (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.6}
                        strokeLinecap="round"
                        className="h-5 w-5 text-maroon-deep"
                        aria-hidden
                      >
                        <path d="M7 3h7l4 4v14H7z" />
                        <path d="M14 3v4h4" />
                      </svg>
                    </span>
                  )}
                  <h2 className="font-serif text-3xl font-medium text-ink">
                    {p.title}
                  </h2>
                </div>
                <p className="mt-4 text-sm font-light leading-relaxed text-clay">
                  {p.body}
                </p>
                <p className="mt-4 rounded-lg bg-gold/10 px-3.5 py-2.5 text-[11px] font-bold tracking-wider text-maroon-deep">
                  POLICY TEXT AWAITING CURRENT STORE CONTENT
                </p>
                <a
                  href={p.href}
                  className="group mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-semibold text-clay underline underline-offset-2 hover:text-maroon sm:text-sm"
                >
                  Open {p.title}
                  <IconArrowUpRight className="h-3.5 w-3.5 text-terracotta transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Bottom two cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal className="h-full">
            <section className="flex h-full flex-col rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
              <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                Before placing an order
              </h2>
              <ul className="mt-5 space-y-3.5 text-sm font-light text-clay sm:text-[15px]">
                <li className="flex items-start gap-3">
                  <CheckMark />
                  <span>
                    Check the final order information at checkout — items,
                    quantities and the delivery address you entered.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckMark />
                  <span>
                    Understand the gift condition: the current offer applies to
                    orders strictly above ₹499, so a basket of exactly ₹499
                    does not qualify.
                  </span>
                </li>
              </ul>
            </section>
          </Reveal>

          <Reveal delay={100} className="h-full">
            <section className="flex h-full flex-col rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
              <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                Need a little clarity?
              </h2>
              <p className="mt-4 text-sm font-light leading-relaxed text-clay sm:text-[15px]">
                If a policy detail is unclear, ask before you order — it is
                easier to answer a question than to correct an assumption.
              </p>
              <div className="mt-5 space-y-3">
                <a
                  href="/pages/contact-us"
                  className="btn-sheen inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-ochre px-6 py-3 text-sm font-semibold text-maroon-dark transition-colors hover:bg-gold-deep"
                >
                  Contact support
                  <span aria-hidden className="transition-transform">→</span>
                </a>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="/faq"
                    className="group inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-ink/30 px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-maroon hover:text-maroon"
                  >
                    Help / FAQ
                    <IconArrowUpRight className="h-4 w-4 text-terracotta" />
                  </a>
                  <a
                    href="/track-your-order"
                    className="group inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-ink/30 px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-maroon hover:text-maroon"
                  >
                    Track Your Order
                    <IconArrowUpRight className="h-4 w-4 text-terracotta" />
                  </a>
                </div>
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </main>
  );
}

function CheckMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep"
      aria-hidden
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
