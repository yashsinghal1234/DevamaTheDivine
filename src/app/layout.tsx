import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import { WishlistProvider } from "@/components/wishlist-provider";
import AnnouncementBar from "@/components/announcement-bar";
import SiteHeader from "@/components/site-header";
import ContactCta from "@/components/contact-cta";
import SiteFooter from "@/components/site-footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Devama The Divine — Where Faith Meets Authenticity",
  description:
    "Discover Rudraksha, sacred bead for meditation. Meaningful pieces for daily practice, design cases delivered with clear product information and thoughtful guidance.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <WishlistProvider>
          <AnnouncementBar />
          <SiteHeader />
          {children}
          <ContactCta />
          <SiteFooter
            instagram="https://www.instagram.com/devamathedivine"
            youtube="https://youtube.com/@devamathedivine8939"
            pinterest="https://pinterest.com/devamathedivine_official"
          />
        </WishlistProvider>
      </body>
    </html>
  );
}
