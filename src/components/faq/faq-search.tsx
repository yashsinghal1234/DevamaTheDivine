"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconSearch } from "../icons";

/** "Find an answer" search box for the FAQ hub — writes ?q=… to the URL. */
export default function FaqSearch({ query }: { query: string }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(query);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const sp = new URLSearchParams(params.toString());
        if (value.trim()) sp.set("q", value.trim());
        else sp.delete("q");
        router.push(`${pathname}?${sp.toString()}`, { scroll: false });
      }}
    >
      <label htmlFor="faq-search" className="text-sm font-medium text-ink">
        Find an answer
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id="faq-search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search choosing Mukhi, care, tracking or policies"
          className="w-full flex-1 rounded-lg border border-line bg-white/70 px-4 py-3 text-sm outline-none transition-colors focus:border-gold-deep"
        />
        <button
          type="submit"
          className="btn-sheen inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-ochre px-6 py-3 text-sm font-semibold text-maroon-dark transition-colors hover:bg-gold-deep"
        >
          Search
          <IconSearch className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
