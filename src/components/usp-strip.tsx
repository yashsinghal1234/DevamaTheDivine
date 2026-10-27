import { IconBox, IconCompass, IconShieldCheck, IconSupport } from "./icons";

const usps = [
  {
    icon: IconShieldCheck,
    title: "Product-specific authenticity details",
  },
  {
    icon: IconCompass,
    title: "Guidance for conscious choices",
  },
  {
    icon: IconBox,
    title: "Easy order tracking",
  },
  {
    icon: IconSupport,
    title: "Support when you need it",
  },
];

export default function UspStrip() {
  return (
    <section className="border-b border-line bg-cream">
        <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-x-4 gap-y-3 px-4 py-6 sm:grid-cols-2 sm:py-7 lg:grid-cols-4 lg:px-8">
        {usps.map(({ icon: Icon, title }) => (
          <li key={title} className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-cream-card text-terracotta">
              <Icon className="h-4.5 w-4.5" />
            </span>
            <p className="text-[11.5px] font-medium leading-snug text-ink/80 sm:text-xs">
              {title}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
