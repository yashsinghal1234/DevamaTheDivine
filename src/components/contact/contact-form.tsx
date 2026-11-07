"use client";

import { useState } from "react";

const TOPIC_SELECTS = [
  "Product information",
  "Authenticity details",
  "Order tracking",
  "Shipping & refunds",
  "Account help",
  "Something else",
];

const TOPIC_CHIPS = [
  "Product information",
  "Authenticity details",
  "Order tracking",
  "Shipping & refunds",
  "Account help",
];

/**
 * Static contact-form design: fields validate visually and the form can be
 * "sent" locally, but no enquiry is transmitted anywhere.
 */
export default function ContactForm() {
  const [topic, setTopic] = useState(TOPIC_SELECTS[0]);
  const [sent, setSent] = useState(false);

  return (
    <section className="rounded-2xl border border-line bg-cream-card p-6 sm:p-8">
      <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
        Send your question
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        {/* How can we help */}
        <div className="mt-6">
          <label htmlFor="contact-topic" className="text-sm font-medium text-ink">
            How can we help? <span className="text-terracotta">*</span>
          </label>
          <select
            id="contact-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            className="mt-2 w-full cursor-pointer rounded-lg border border-gold-deep/70 bg-white/70 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold-deep focus:ring-1 focus:ring-gold/50"
          >
            {TOPIC_SELECTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Topic chips (mirror the select for quick picks) */}
        <div className="mt-4 flex flex-wrap gap-2">
          {TOPIC_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setTopic(chip)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-colors sm:text-[13px] ${
                topic === chip
                  ? "bg-maroon text-cream"
                  : "border border-line bg-white/60 text-ink/75 hover:border-maroon/50 hover:text-maroon"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Name + email */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="text-sm font-medium text-ink">
              Name <span className="text-terracotta">*</span>
            </label>
            <input
              id="contact-name"
              required
              placeholder="How should we address you?"
              className="mt-2 w-full rounded-lg border border-gold-deep/70 bg-white/70 px-4 py-3 text-sm outline-none transition-colors placeholder:text-clay/70 focus:border-gold-deep focus:ring-1 focus:ring-gold/50"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="text-sm font-medium text-ink">
              Email <span className="text-terracotta">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              required
              placeholder="you@example.com"
              className="mt-2 w-full rounded-lg border border-gold-deep/70 bg-white/70 px-4 py-3 text-sm outline-none transition-colors placeholder:text-clay/70 focus:border-gold-deep focus:ring-1 focus:ring-gold/50"
            />
          </div>
        </div>

        {/* Order reference */}
        <div className="mt-5">
          <label htmlFor="contact-order" className="text-sm font-medium text-ink">
            Order reference <span className="text-clay">(optional)</span>
          </label>
          <input
            id="contact-order"
            placeholder="For example DV-SAMPLE-001"
            className="mt-2 w-full rounded-lg border border-gold-deep/70 bg-white/70 px-4 py-3 text-sm outline-none transition-colors placeholder:text-clay/70 focus:border-gold-deep focus:ring-1 focus:ring-gold/50"
          />
        </div>

        {/* Question */}
        <div className="mt-5">
          <label htmlFor="contact-question" className="text-sm font-medium text-ink">
            Your question <span className="text-terracotta">*</span>
          </label>
          <textarea
            id="contact-question"
            rows={5}
            required
            placeholder="Share the details of your question. Please avoid private keys, passwords or payment information."
            className="mt-2 w-full resize-y rounded-lg border border-gold-deep/70 bg-white/70 px-4 py-3 text-sm outline-none transition-colors placeholder:text-clay/70 focus:border-gold-deep focus:ring-1 focus:ring-gold/50"
          />
        </div>

        {/* Privacy note */}
        <p className="mt-4 text-xs leading-relaxed text-clay">
          This is a static contact-form design only. No enquiry is submitted,
          stored or answered from here — support channels are listed in the
          panel beside this form.
        </p>

        {/* Consent */}
        <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-sm text-clay">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-sm border border-ink/30 bg-white/70 transition-colors checked:border-maroon checked:bg-maroon"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f6ead8' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 13l4 4L19 7'/%3E%3C/svg%3E\")",
              backgroundPosition: "center",
              backgroundSize: "70%",
              backgroundRepeat: "no-repeat",
            }}
          />
          I agree that my details may be used to answer this enquiry, in line
          with the current Privacy Policy.
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="btn-sheen mt-7 inline-flex items-center gap-2.5 rounded-lg bg-ochre px-6 py-3.5 text-sm font-semibold text-maroon-dark transition-colors hover:bg-gold-deep"
        >
          Send enquiry
          <span aria-hidden className="transition-transform">→</span>
        </button>
        <p
          aria-live="polite"
          className={`mt-3 text-xs text-clay transition-opacity duration-300 ${
            sent ? "opacity-100" : "opacity-0"
          }`}
        >
          Enquiry staged for this demo only — nothing was submitted.
        </p>
      </form>
    </section>
  );
}
