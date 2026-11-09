import AnnouncementBar from "@/components/announcement-bar";
import SiteHeader from "@/components/site-header";
import ContactCta from "@/components/contact-cta";
import SiteFooter from "@/components/site-footer";

/**
 * Main site layout — includes the full header, announcement bar, and footer.
 * All regular pages live in this group.
 * Auth pages (login/signup) live in (auth) and skip this chrome entirely.
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      {children}
      <ContactCta />
      <SiteFooter
        instagram="https://www.instagram.com/devamathedivine"
        youtube="https://youtube.com/@devamathedivine8939"
        pinterest="https://pinterest.com/devamathedivine_official"
      />
    </>
  );
}

