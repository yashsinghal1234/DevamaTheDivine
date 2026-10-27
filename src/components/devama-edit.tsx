"use client";

import { useMemo, useState } from "react";
import ProductCard from "./product-card";
import type { Product } from "@/lib/types";

const tabs = ["All collections", "Rudraksha", "Karungali", "Bracelets"];

function matches(tab: string, product: Product): boolean {
  if (tab === "All collections") return true;
  if (tab === "Rudraksha") return product.category.startsWith("RUDRAKSHA");
  if (tab === "Karungali") return product.category.startsWith("KARUNGALI");
  if (tab === "Bracelets") return product.category.startsWith("BRACELETS");
  return true;
}

export default function DevamaEdit({ products }: { products: Product[] }) {
  const [active, setActive] = useState(tabs[0]);
  const visible = useMemo(
    () => products.filter((p) => matches(active, p)),
    [active, products]
  );

  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-terracotta">The devama edit</p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
              Sacred essentials, thoughtfully selected
            </h2>
          </div>
          <a
            href="/collections/all"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-maroon hover:text-terracotta"
          >
            Shop all products
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>

        {/* Category tabs */}
        <div className="mt-10 -mx-4 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:overflow-visible sm:px-0">
          <div className="flex w-max gap-2.5 sm:w-auto sm:flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors sm:text-sm ${
                  active === tab
                    ? "border-maroon bg-maroon text-cream"
                    : "border-line bg-cream-card text-ink/75 hover:border-maroon/40 hover:text-maroon"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-4 lg:gap-x-6">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
