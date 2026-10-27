import Reveal from "./reveal";
import FooterYear from "./footer-year";
import {
  IconInstagram,
  IconPinterest,
  IconYoutube,
} from "./icons";
import { logo } from "@/lib/sample-data";
interface Props {
  instagram: string;
  youtube: string;
  pinterest: string;
}

const cols = [
  {
    heading: "Explore",
    links: [
      { label: "Rudraksha", href: "/collections/rudraksha" },
      { label: "Karungali (Ebony wood)", href: "/collections/karungali-ebony" },
      { label: "Energised Potli", href: "/collections/energised-potali" },
      { label: "Bracelets", href: "/collections/bracelets" },
      { label: "Shop products", href: "/collections/all" },
    ],
  },
  {
    heading: "Here to help",
    links: [
      { label: "About Us", href: "/pages/about-us" },
      { label: "Contact Us", href: "/pages/contact-us" },
      { label: "Track Your Order", href: "/pages/track-your-order" },
      { label: "Frequently asked questions", href: "/faq" },
    ],
  },
  {
    heading: "Policies & details",
    links: [
      { label: "Shipping Policy", href: "/policies/shipping-policy" },
      { label: "Refund Policy", href: "/policies/refund-policy" },
      { label: "Privacy Policy", href: "/policies/privacy-policy" },
      { label: "Terms of Service", href: "/policies/terms-of-service" },
    ],
  },
];

export default function SiteFooter({ instagram, youtube, pinterest }: Props) {
  return (
    <footer className="bg-coal text-cream/80">
      <Reveal>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo}
                alt="Devama The Divine"
                className="h-10 w-auto brightness-0 invert"
              />
              <span className="font-serif text-2xl font-semibold text-cream">
                devamathedivine
              </span>
            </div>
            <p className="mt-4 font-serif text-3xl font-medium leading-snug text-cream">
              Where Faith Meets Authenticity.
            </p>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-cream/60">
              Devama the Divine is a{" "}
              <span className="text-gold">sacred</span> store for a mindful way
              to shop for your everyday practice.
            </p>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="eyebrow text-cream/45">{col.heading}</p>
              <ul className="mt-4 space-y-2.5 text-sm font-light">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-block transition-all duration-200 hover:translate-x-0.5 hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Reveal>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-xs text-cream/50 sm:flex-row sm:px-6 lg:px-8">
          <FooterYear />
          <div className="flex items-center gap-1">
            <p className="mr-2 hidden sm:inline">Follow us on</p>
            <a
              href={instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram"
              className="rounded-full p-1.5 text-cream/60 transition-colors hover:text-gold"
            >
              <IconInstagram className="h-4.5 w-4.5" />
            </a>
            <a
              href={youtube}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="YouTube"
              className="rounded-full p-1.5 text-cream/60 transition-colors hover:text-gold"
            >
              <IconYoutube className="h-4.5 w-4.5" />
            </a>
            <a
              href={pinterest}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Pinterest"
              className="rounded-full p-1.5 text-cream/60 transition-colors hover:text-gold"
            >
              <IconPinterest className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
