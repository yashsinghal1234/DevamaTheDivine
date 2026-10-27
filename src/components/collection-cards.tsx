import Image from "next/image";
import { IconArrowUpRight } from "./icons";
import type { CollectionCard } from "@/lib/types";
import Reveal from "./reveal";

export default function CollectionCards({
  collections,
}: {
  collections: CollectionCard[];
}) {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow text-terracotta">Find what speaks to you</p>
        <h2 className="mt-3 max-w-xl font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
          A collection for every sacred moment
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((c, i) => (
            <Reveal key={c.title} delay={i * 90} className="h-full">
              <a
                href={c.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-cream-card shadow-[0_1px_2px_rgba(54,34,23,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_-14px_rgba(54,34,23,0.3)]"
              >
                <div className="relative aspect-square overflow-hidden sm:aspect-[4/4.1]">
                  <Image
                    src={c.image}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex items-start justify-between gap-3 px-5 pb-5 pt-4">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-ink">
                      {c.title}
                    </h3>
                    <p className="mt-1 text-xs text-clay">{c.subtitle}</p>
                  </div>
                  <IconArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-terracotta transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
