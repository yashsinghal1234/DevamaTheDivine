"use client";

import { useState } from "react";
import Reveal from "./reveal";
import { IconArrowRight, IconChevronDown } from "./icons";
import type { FaqItem } from "@/lib/types";

export default function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-cream pb-16 sm:pb-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[2fr_3fr] lg:gap-16 lg:px-8">
        {/* Intro column */}
        <Reveal>
          <div className="lg:sticky lg:top-32">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
              ✦
            </span>
            <h2 className="mt-5 font-serif text-4xl font-medium leading-[1.08] text-ink sm:text-6xl">
              Thoughtful <br className="hidden sm:block" />
              questions.
            </h2>
            <p className="mt-2 font-serif text-4xl font-medium italic text-clay">
              Helpful answers.
            </p>
            <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-clay">
              From choosing your first bead to caring for a favourite piece,
              start here.
            </p>
            <a
              href="/pages/contact-us"
              className="group mt-7 inline-flex items-center gap-2.5 rounded-full border border-ink/25 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-maroon hover:bg-maroon hover:text-cream"
            >
              Ask us a question
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>

        {/* Accordion */}
        <Reveal delay={120}>
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-maroon"
                  >
                    <span className="text-sm font-medium text-ink sm:text-[15px]">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 border-maroon bg-maroon text-cream"
                          : "border-line bg-cream-card text-clay"
                      }`}
                    >
                      <IconChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 pr-10 text-sm font-light leading-relaxed text-clay">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
