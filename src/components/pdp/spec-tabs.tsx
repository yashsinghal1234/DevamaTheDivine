"use client";

import { useState } from "react";
import { inr } from "@/lib/format";
import type { ProductFull } from "@/lib/shopify";

const TABS = [
  "Details",
  "Specifications",
  "Authenticity guidance",
  "Care",
  "Reviews",
] as const;

type Tab = (typeof TABS)[number];

function specRows(product: ProductFull): [string, string][] {
  const rows: [string, string][] = [
    ["Material", product.productType || product.category],
  ];
  if (/108/i.test(product.title)) rows.push(["Bead count", "108 + 1 beads"]);
  if (/bracelet/i.test(product.title)) rows.push(["Form", "Beaded bracelet"]);
  else if (/mala|bead/i.test(product.title))
    rows.push(["Form", "Beaded mala"]);
  rows.push([
    "Current price",
    inr(product.compareAt ? product.price : product.price),
  ]);
  return rows;
}

const panelText: Record<Exclude<Tab, "Details" | "Specifications" | "Reviews">, string> = {
  "Authenticity guidance":
    "Check the current listing for certification details and any accompanying documentation for this product. A seal or certificate has not been supplied here. If information is missing or unclear, contact us before choosing.",
  Care:
    "Use a soft, dry cloth to store the piece away from prolonged moisture, harsh cleaning agents and direct heat. Handle the string gently. Follow any product-specific care instructions supplied with the piece.",
};

export default function SpecTabs({ product }: { product: ProductFull }) {
  const [tab, setTab] = useState<Tab>(TABS[0]);

  return (
    <div className="mt-8">
      {/* Tab chips */}
      <div className="-mx-4 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
        <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 sm:text-sm ${
                tab === t
                  ? "border-maroon bg-maroon text-cream"
                  : "border-line bg-cream-card text-ink/75 hover:border-maroon/40 hover:text-maroon"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Panels */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
        <div className="rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
          <h3 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
            {tab === "Details"
              ? "The details, clearly"
              : tab === "Specifications"
                ? "Specifications"
                : tab === "Reviews"
                  ? "Reviews"
                  : tab}
          </h3>

          {(tab === "Details" || tab === "Specifications") && (
            <>
              <p className="mt-3 text-sm font-light leading-relaxed text-clay">
                {product.description}
              </p>
              <table className="mt-5 w-full text-sm">
                <tbody className="divide-y divide-line/70">
                  {specRows(product).map(([k, v]) => (
                    <tr key={k}>
                      <td className="py-2.5 pr-4 text-clay">{k}</td>
                      <td className="py-2.5 text-right font-medium text-ink">
                        {v}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-[11px] leading-relaxed text-clay/80">
                Bead diameter, dimensions and other unlisted specifications
                should be confirmed from the current store listing or with
                support.
              </p>
            </>
          )}

          {tab === "Reviews" && (
            <div>
              <p className="eyebrow mt-3 text-fog">Illustrative review</p>
              <blockquote className="mt-2 text-sm font-light leading-relaxed text-clay">
                “The material and bead-count information made it easier to
                understand the mala before choosing.”
              </blockquote>
              <p className="mt-3 text-[11px] tracking-wide text-gold-deep">
                ILLUSTRATIVE REVIEW · {product.title} · Sample feedback
              </p>
            </div>
          )}

          {(tab === "Authenticity guidance" || tab === "Care") && (
            <p className="mt-3 text-sm font-light leading-relaxed text-clay">
              {panelText[tab]}
            </p>
          )}
        </div>

        {/* Static info column */}
        <div className="space-y-8">
          <div>
            <h4 className="font-serif text-xl font-semibold text-ink sm:text-2xl">
              Product-specific authenticity details
            </h4>
            <p className="mt-3 text-sm font-light leading-relaxed text-clay">
              Check the current listing for certification details and any
              accompanying documentation for this product. A seal or
              certificate has not been supplied here. If information is
              missing or unclear, contact us before choosing.
            </p>
          </div>
          <div className="border-t border-line pt-8">
            <h4 className="font-serif text-xl font-semibold text-ink sm:text-2xl">
              Care for the material
            </h4>
            <p className="mt-3 text-sm font-light leading-relaxed text-clay">
              Use a soft, dry cloth to store the piece away from prolonged
              moisture, harsh cleaning agents and direct heat. Handle the
              string gently. Follow any product-specific care instructions
              supplied with the piece.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
