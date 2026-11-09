/**
 * Auth route group layout:
 * - Truly bare (no announcement bar, no site header, no footer)
 * - Fixed 100vh with overflow-hidden to prevent any page scrolling
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen max-h-screen overflow-hidden m-0 p-0">
      {children}
    </div>
  );
}
