import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="bg-ochre text-maroon-dark">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-[11px] tracking-wide sm:text-xs">
        <span className="font-medium">✨</span>
        <p className="font-medium">
          A small gift for your sacred journey. Special GIFT on orders above
          ₹499.
        </p>
        <Link
          href="/collections/all"
          className="hidden font-semibold underline underline-offset-2 hover:no-underline sm:inline"
        >
          Learn more →
        </Link>
      </div>
    </div>
  );
}
