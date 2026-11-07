import Reveal from "@/components/reveal";
import AccountSidebar from "@/components/account/account-sidebar";
import ProfileForm from "@/components/account/profile-form";

export const metadata = { title: "My Account — Devama The Divine" };

const fieldClass =
  "mt-2 w-full rounded-lg border border-gold-deep/70 bg-white/70 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-clay/70 focus:border-gold-deep focus:ring-1 focus:ring-gold/50";

export default function AccountPage() {
  return (
    <main className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[11px] text-clay sm:text-xs">
          <a href="/" className="hover:text-maroon">Home</a>
          <span className="px-1.5">/</span>
          <a href="/account" className="hover:text-maroon">Account</a>
          <span className="px-1.5">/</span>
          <span className="text-ink/70">My profile</span>
        </nav>

        <Reveal>
          <p className="eyebrow mt-4 text-terracotta">My account</p>
          <h1 className="mt-3 font-serif text-5xl font-medium leading-[1.08] text-ink sm:text-6xl">
            Your Devama space
          </h1>
          <p className="mt-3 max-w-lg text-sm font-light text-clay">
            Manage your profile and addresses, revisit saved pieces, and find
            your order information.
          </p>
        </Reveal>

        {/* Illustrative notice */}
        <Reveal className="mt-8">
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
              Illustrative profile
            </p>
            <p className="mt-1 pl-6 text-xs leading-relaxed text-clay sm:text-[13px]">
              All profile and address values are placeholders. No real customer
              identity, saved address or active account is represented.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[250px_1fr] lg:gap-10">
          <AccountSidebar active="profile" />

          <div>
            {/* Profile information */}
            <Reveal>
              <section className="rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
                <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                  Profile information
                </h2>
                <ProfileForm>
                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="acc-name" className="text-sm font-medium text-ink">
                        Name
                      </label>
                      <input
                        id="acc-name"
                        autoComplete="name"
                        placeholder="[Your name]"
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="acc-email" className="text-sm font-medium text-ink">
                        Email address
                      </label>
                      <input
                        id="acc-email"
                        type="email"
                        autoComplete="email"
                        placeholder="[Your email address]"
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="acc-phone" className="text-sm font-medium text-ink">
                        Phone number
                      </label>
                      <input
                        id="acc-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="[Your contact number]"
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="acc-password" className="text-sm font-medium text-ink">
                        Password
                      </label>
                      <a
                        href="/account"
                        className="group mt-2 flex items-center justify-between rounded-lg border border-gold-deep/70 bg-white/70 px-4 py-3 text-sm text-clay transition-colors hover:border-maroon hover:text-maroon"
                      >
                        Change your password
                        <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                          ↗
                        </span>
                      </a>
                    </div>
                  </div>
                </ProfileForm>
              </section>
            </Reveal>

            {/* Delivery addresses */}
            <Reveal className="mt-6">
              <section className="rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                      Delivery addresses
                    </h2>
                    <p className="mt-5 text-[13px] leading-relaxed text-clay sm:text-sm">
                      [Recipient name]
                      <br />
                      [Street address], [City]
                      <br />
                      [State], [Postcode], India
                      <br />
                      [Phone number] · Illustrative address only
                    </p>
                    <div className="mt-4 flex items-center gap-5 text-sm font-medium">
                      <a href="/account" className="text-clay underline underline-offset-2 hover:text-maroon">
                        Edit address
                      </a>
                      <a href="/account" className="text-maroon-deep underline underline-offset-2 hover:text-maroon">
                        Remove
                      </a>
                    </div>
                  </div>
                  <a
                    href="/checkout"
                    className="group inline-flex shrink-0 items-center gap-2.5 rounded-lg border border-ink/30 px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-maroon hover:bg-maroon hover:text-cream"
                  >
                    Add an address
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                  </a>
                </div>
              </section>
            </Reveal>

            {/* Quick cards */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <Reveal>
                <section className="flex h-full flex-col rounded-2xl border border-line bg-cream-card p-6 sm:p-7">
                  <h2 className="font-serif text-3xl font-medium text-ink">My orders</h2>
                  <p className="mt-3 flex-1 text-sm font-light text-clay">
                    Explore your sample order history.
                  </p>
                  <a
                    href="/account/orders"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-maroon-deep underline underline-offset-2 hover:text-maroon"
                  >
                    View orders
                    <span aria-hidden>↗</span>
                  </a>
                </section>
              </Reveal>
              <Reveal delay={90}>
                <section className="flex h-full flex-col rounded-2xl border border-line bg-cream-card p-6 sm:p-7">
                  <h2 className="font-serif text-3xl font-medium text-ink">Wishlist</h2>
                  <p className="mt-3 flex-1 text-sm font-light text-clay">
                    Return to the pieces you saved.
                  </p>
                  <a
                    href="/wishlist"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-maroon-deep underline underline-offset-2 hover:text-maroon"
                  >
                    View wishlist
                    <span aria-hidden>↗</span>
                  </a>
                </section>
              </Reveal>
              <Reveal delay={180}>
                <section className="flex h-full flex-col rounded-2xl border border-line bg-cream-card p-6 sm:p-7">
                  <h2 className="font-serif text-3xl font-medium text-ink">Here to help</h2>
                  <p className="mt-3 flex-1 text-sm font-light text-clay">
                    Find answers or ask a question.
                  </p>
                  <a
                    href="/pages/contact-us"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-maroon-deep underline underline-offset-2 hover:text-maroon"
                  >
                    Contact support
                    <span aria-hidden>↗</span>
                  </a>
                </section>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
