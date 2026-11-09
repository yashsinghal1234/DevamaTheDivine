"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import AuthModal from "./auth-modal";
import {
  IconArrowRight,
  IconBag,
  IconChevronDown,
  IconClose,
  IconHeart,
  IconMenu,
  IconSearch,
  IconUser,
} from "./icons";
import { useWishlist } from "./wishlist-provider";
import { useCart } from "./cart-provider";
import { useAuth } from "./auth-provider";

const logo =
  "https://devamathedivine.com/cdn/shop/files/main_logo.png?height=100&v=1768676583";

const navLinks = [
  "Shop all",
  "Rudraksha",
  "Karungali (Ebony wood)",
  "Energised Potli",
  "Bracelets",
];

/** Dropdown menu for logged-in users */
function AccountDropdown({
  user,
  onLogout,
  onClose,
}: {
  user: { name: string; email: string };
  onLogout: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-line bg-cream-card shadow-lg"
    >
      {/* User info */}
      <div className="border-b border-line px-4 py-3">
        <p className="truncate text-xs font-semibold text-ink">{user.name}</p>
        <p className="mt-0.5 truncate text-[11px] text-clay">{user.email}</p>
      </div>

      <ul className="py-1.5 text-sm">
        {[
          { label: "My Account", href: "/account" },
          { label: "My Orders", href: "/account/orders" },
          { label: "Wishlist", href: "/wishlist" },
          { label: "Track Your Order", href: "/track-your-order" },
        ].map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="block px-4 py-2 text-[13px] text-ink transition-colors hover:bg-sand hover:text-maroon"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className="border-t border-line px-4 py-2.5">
        <button
          onClick={() => { onLogout(); onClose(); }}
          className="w-full rounded-lg px-3 py-2 text-left text-[13px] font-medium text-maroon-deep transition-colors hover:bg-maroon hover:text-cream"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const { count: wishlistCount } = useWishlist();
  const cart = useCart();
  const { ready, isLoggedIn, user, logout } = useAuth();

  const cartCount = cart.ready ? cart.count : 0;

  return (
    <header className="sticky top-0 z-50 bg-cream-card/95 backdrop-blur supports-[backdrop-filter]:bg-cream-card/85 shadow-[0_1px_0_0_var(--color-line)]">
      {/* ── Top row ── */}
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-5 lg:px-8">

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="text-clay hover:text-maroon lg:hidden"
        >
          {menuOpen ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
        </button>

        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center" aria-label="Devama The Divine — home">
          <Image src={logo} alt="Devama The Divine" width={44} height={44} priority className="h-9 w-auto sm:h-10" />
          <span className="ml-2 font-serif text-lg font-semibold tracking-wide text-maroon-deep sm:text-2xl">
            devamathedivine
          </span>
        </a>

        {/* Search — only shown when logged in */}
        {isLoggedIn && (
          <form action="/search" className="relative hidden flex-1 items-center md:flex">
            <div className="flex w-full items-center rounded-full border border-line bg-white/70 pl-4 pr-1.5 py-1.5 focus-within:border-gold-deep focus-within:ring-1 focus-within:ring-gold/50">
              <label className="hidden shrink-0 items-center gap-1 border-r border-line pr-3 text-[11px] font-medium text-clay lg:flex">
                Search:
                <IconChevronDown className="h-3.5 w-3.5" />
              </label>
              <input
                type="search"
                name="q"
                placeholder="Search: Rudraksha, Karungali, Energised Potli…"
                className="min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-clay/70"
              />
              <button type="submit" aria-label="Search" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-maroon text-cream hover:bg-maroon-deep">
                <IconSearch className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}

        {/* ── Action area ── */}
        <div className="ml-auto flex items-center gap-1 text-clay sm:gap-2">

          {/* Wait for auth to hydrate before rendering to avoid flash */}
          {ready && (
            isLoggedIn && user ? (
              /* ════ LOGGED IN ════ */
              <>
                {/* Account dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((v) => !v)}
                    className="group flex items-center gap-1.5 rounded-full px-2 py-1 hover:text-maroon sm:px-2.5 sm:py-2"
                    aria-label="Account menu"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-maroon text-[11px] font-semibold text-cream">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="hidden max-w-[72px] truncate text-[11px] font-medium group-hover:text-maroon sm:inline">
                      {user.name.split(" ")[0]}
                    </span>
                  </button>

                  {dropdownOpen && (
                    <AccountDropdown
                      user={user}
                      onLogout={logout}
                      onClose={() => setDropdownOpen(false)}
                    />
                  )}
                </div>

                {/* Wishlist */}
                <a
                  href="/wishlist"
                  className="group relative flex flex-col items-center gap-0.5 rounded-full px-2 py-1 hover:text-maroon sm:flex-row sm:gap-1.5 sm:px-2.5 sm:py-2"
                >
                  <IconHeart className={`h-5 w-5 ${wishlistCount > 0 ? "text-terracotta" : ""}`} />
                  <span className="hidden text-[11px] font-medium group-hover:text-maroon sm:inline">
                    Wishlist
                  </span>
                  {wishlistCount > 0 && (
                    <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta text-[9px] font-semibold text-cream sm:relative sm:h-auto sm:w-auto sm:bg-transparent sm:p-0 sm:text-[11px] sm:font-medium sm:text-terracotta">
                      {wishlistCount}
                    </span>
                  )}
                </a>

                {/* Cart */}
                <a
                  href="/cart"
                  className="group relative flex flex-col items-center gap-0.5 rounded-full px-2 py-1 hover:text-maroon sm:flex-row sm:gap-1.5 sm:px-2.5 sm:py-2"
                >
                  <IconBag className="h-5 w-5" />
                  <span className="hidden text-[11px] font-medium group-hover:text-maroon sm:inline">
                    Cart ({cartCount})
                  </span>
                  <span className="absolute -right-0 -top-0 flex h-4 w-4 items-center justify-center rounded-full bg-maroon text-[9px] font-semibold text-cream sm:hidden">
                    {cartCount}
                  </span>
                </a>
              </>
            ) : (
              /* ════ LOGGED OUT — Zomato / E-commerce 1-Tap Trigger ════ */
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(true)}
                  className="rounded-full px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:text-maroon"
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(true)}
                  className="btn-sheen rounded-full bg-maroon px-4 py-1.5 text-sm font-medium text-cream transition-colors hover:bg-maroon-deep shadow-xs"
                >
                  Sign up
                </button>
              </div>
            )
          )}
        </div>
      </div>

      {/* ── Secondary nav ── */}
      <nav className="border-t border-line/70">
        <div className="mx-auto hidden max-w-7xl items-center gap-6 px-4 lg:flex lg:px-8">
          <ul className="flex items-center gap-6 py-2.5 text-sm text-ink/85">
            {navLinks.map((label) => (
              <li key={label}>
                <a href="/collections/all" className="py-2 transition-colors hover:text-maroon">
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Track Your Order — only for logged-in users */}
          {isLoggedIn && (
            <a
              href="/track-your-order"
              className="group ml-auto flex items-center gap-2 py-2.5 text-xs font-medium tracking-wide text-clay transition-colors hover:text-terracotta"
            >
              Track Your Order
              <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          )}
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-line/70 bg-cream-card px-4 py-3 lg:hidden">
            {/* Search — only when logged in */}
            {isLoggedIn && (
              <form action="/search" className="mb-3">
                <div className="flex items-center rounded-full border border-line bg-white/70 px-4 py-2">
                  <IconSearch className="h-4 w-4 text-clay" />
                  <input
                    type="search"
                    name="q"
                    placeholder="Search Rudraksha, Karungali…"
                    className="w-full bg-transparent px-2 text-sm outline-none placeholder:text-clay/70"
                  />
                </div>
              </form>
            )}

            <ul className="flex flex-col divide-y divide-line/70 text-sm">
              {navLinks.map((label) => (
                <li key={label}>
                  <a href="/collections/all" className="block py-2.5 hover:text-maroon">
                    {label}
                  </a>
                </li>
              ))}

              {isLoggedIn ? (
                <>
                  <li>
                    <a href="/track-your-order" className="block py-2.5 font-medium hover:text-maroon">
                      Track Your Order
                    </a>
                  </li>
                  <li>
                    <a href="/wishlist" className="block py-2.5 hover:text-maroon">Wishlist</a>
                  </li>
                  <li>
                    <a href="/cart" className="block py-2.5 hover:text-maroon">Cart ({cartCount})</a>
                  </li>
                  <li className="pt-1">
                    <div className="flex items-center justify-between py-2.5">
                      <span className="text-sm font-medium text-ink">{user?.name}</span>
                      <button onClick={logout} className="text-xs font-medium text-maroon-deep underline">
                        Sign out
                      </button>
                    </div>
                  </li>
                </>
              ) : (
                <li className="pt-2">
                  <div className="flex gap-3 py-2">
                    <a href="/login" className="flex-1 rounded-lg border border-line py-2.5 text-center text-sm font-medium text-ink hover:border-maroon hover:text-maroon">
                      Log in
                    </a>
                    <a href="/signup" className="flex-1 rounded-lg bg-maroon py-2.5 text-center text-sm font-medium text-cream hover:bg-maroon-deep">
                      Sign up
                    </a>
                  </div>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>

      {/* 1-Tap Zomato / Luxury E-commerce Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </header>
  );
}
