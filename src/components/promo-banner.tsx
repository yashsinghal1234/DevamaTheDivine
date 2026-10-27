import { IconArrowRight } from "./icons";

export default function PromoBanner() {
  return (
    <section className="bg-maroon-deep text-cream">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl">
            Explore the collection and discover meaningful pieces for your
            practice
          </h2>
          <p className="mt-3 text-sm font-light leading-relaxed text-cream/75">
            Rudraksha, Karungali, Potlis and ritual essentials with clear
            product information and thoughtful guidance throughout the site.
          </p>
        </div>
        <a
          href="/collections/all"
          className="btn-sheen group inline-flex w-full items-center gap-2.5 rounded-full bg-gold px-6 py-3 text-sm font-medium text-maroon-dark transition-colors hover:bg-gold-deep sm:w-auto sm:justify-center lg:ml-auto"
        >
          Shop the collection
          <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  );
}
