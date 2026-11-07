import { IconUser } from "@/components/icons";

type Key = "profile" | "orders";

const links: { key: Key | null; label: string; href: string }[] = [
  { key: "profile", label: "My profile", href: "/account" },
  { key: "orders", label: "My orders", href: "/account/orders" },
  { key: null, label: "Wishlist", href: "/wishlist" },
  { key: null, label: "Help / FAQ", href: "/faq" },
  { key: null, label: "Contact Us", href: "/pages/contact-us" },
  { key: null, label: "Sign out", href: "/account" },
];

export default function AccountSidebar({ active }: { active: Key }) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-32">
      {/* Identity card */}
      <div className="rounded-2xl border border-line bg-cream-card p-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-maroon">
          <IconUser className="h-6 w-6" />
        </span>
        <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-ink">
          Your Devama space
        </h2>
        <p className="mt-3 text-[13px] leading-relaxed text-clay">
          Illustrative account • No personal data
        </p>
      </div>

      {/* Section nav */}
      <nav aria-label="Account sections" className="flex flex-col">
        {links.map((link) => {
          const isActive = link.key !== null && link.key === active;
          return (
            <a
              key={link.label}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`-mx-1 rounded-xl px-4 py-3 text-sm transition-colors ${
                isActive
                  ? "bg-maroon font-semibold text-cream"
                  : "text-ink hover:bg-sand/60 hover:text-maroon"
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
