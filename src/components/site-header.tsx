"use client";

import Image from "next/image";
import { useState } from "react";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconBag,
  IconChevronDown,
  IconClose,
  IconHeart,
  IconMenu,
  IconSearch,
  IconUser,
} from "./icons";
import { useWishlist } from "./wishlist-provider";

const logo =
  "https://devamathedivine.com/cdn/shop/files/main_logo.png?height=100&v=1768676583";

const navLinks = [
  "Shop all",
  "Rudraksha",
  "Karungali (Ebony wood)",
  "Energised Potli",
  "Bracelets",
];

// Cart will come alive once the Shopify Storefront cart is wired up.
const cartCount = 0;

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count: wishlistCount } = useWishlist();

  return (
    <header className="sticky top-0 z-50 bg-cream-card/95 backdrop-blur supports-[backdrop-filter]:bg-cream-card/85 shadow-[0_1px_0_0_var(--color-line)]">
      {/* Top row: logo / search / actions */}
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-5 lg:px-8">
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="text-clay hover:text-maroon lg:hidden"
        >
          {menuOpen ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
        </button>

        <a href="/" className="flex shrink-0 items-center" aria-label="Devama The Divine — home">
          <Image
            src={logo}
            alt="Devama The Divine"
            width={44}
            height={44}
            priority
            className="h-9 w-auto sm:h-10"
          />
          <span className="ml-2 font-serif text-lg font-semibold tracking-wide text-maroon-deep sm:text-2xl">
            devamathedivine
          </span>
        </a>

        {/* Search */}
        <form
          action="/search"
          className="relative hidden flex-1 items-center md:flex"
        >
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
            <button
              type="submit"
              aria-label="Search"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-maroon text-cream hover:bg-maroon-deep"
            >
              <IconSearch className="h-4 w-4" />
            </button>
          </div>
        </form>

        <div className="ml-auto flex items-center gap-0.5 text-clay md:ml-0 sm:gap-2">
          <a
            href="/account"
            className="group flex flex-col items-center gap-0.5 rounded-full px-2 py-1 hover:text-maroon sm:flex-row sm:gap-1.5 sm:px-2.5 sm:py-2"
          >
            <IconUser className="h-5 w-5" />
            <span className="hidden text-[11px] font-medium group-hover:text-maroon sm:inline">
              Account
            </span>
          </a>
          <a
            href="/wishlist"
            className="group relative flex flex-col items-center gap-0.5 rounded-full px-2 py-1 hover:text-maroon sm:flex-row sm:gap-1.5 sm:px-2.5 sm:py-2"
          >
            <IconHeart
              className={`h-5 w-5 ${wishlistCount > 0 ? "text-terracotta" : ""}`}
            />
            <span className="hidden text-[11px] font-medium group-hover:text-maroon sm:inline">
              Wishlist
            </span>
            {wishlistCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta text-[9px] font-semibold text-cream sm:relative sm:h-auto sm:w-auto sm:bg-transparent sm:p-0 sm:text-[11px] sm:font-medium sm:text-terracotta">
                {wishlistCount}
              </span>
            )}
          </a>
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
        </div>
      </div>

      {/* Secondary nav */}
      <nav className="border-t border-line/70">
        <div className="mx-auto hidden max-w-7xl items-center gap-6 px-4 lg:flex lg:px-8">
          <ul className="flex items-center gap-6 py-2.5 text-sm text-ink/85">
            {navLinks.map((label) => (
              <li key={label}>
                <a
                  href="/collections/all"
                  className="py-2 transition-colors hover:text-maroon"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/track-your-order"
            className="group ml-auto flex items-center gap-2 py-2.5 text-xs font-medium tracking-wide text-clay transition-colors hover:text-terracotta"
          >
            Track Your Order
            <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-line/70 bg-cream-card px-4 py-3 lg:hidden">
            <form action="/search" className="mb-3 md:hidden">
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
            <ul className="flex flex-col divide-y divide-line/70 text-sm">
              {navLinks.map((label) => (
                <li key={label}>
                  <a href="/collections/all" className="block py-2.5 hover:text-maroon">
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/track-your-order" className="block py-2.5 font-medium hover:text-maroon">
                  Track Your Order
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
