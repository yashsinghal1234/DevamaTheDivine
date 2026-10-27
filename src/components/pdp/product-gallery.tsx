"use client";

import Image from "next/image";
import { useState } from "react";
import { IconSearch } from "./../icons";
import type { ProductFull } from "@/lib/shopify";

const thumbLabels = ["selected", "context", "view"];

export default function ProductGallery({
  product,
}: {
  product: ProductFull;
}) {
  const images = product.images.length
    ? product.images.slice(0, 3)
    : [{ url: product.image, alt: product.title }];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/4.1] overflow-hidden rounded-2xl bg-sand/60 sm:aspect-square">
        <Image
          src={images[active].url}
          alt={images[active].alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-all duration-500 ease-out"
        />
        <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-cream-card/90 text-clay shadow-sm">
          <IconSearch className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
        {images.map((img, i) => (
          <button
            key={img.url + i}
            type="button"
            onClick={() => setActive(i)}
            className={`group overflow-hidden rounded-xl border-2 bg-sand/40 transition-all duration-300 ${
              active === i
                ? "border-maroon"
                : "border-transparent hover:border-line"
            }`}
            aria-label={`Show image ${i + 1}: ${img.alt}`}
          >
            <span className="relative block aspect-square">
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="120px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </span>
            <span
              className={`block py-2 text-center text-[10px] font-medium tracking-wide transition-colors ${
                active === i ? "text-maroon" : "text-clay"
              }`}
            >
              {thumbLabels[i] ?? `View ${i + 1}`}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
