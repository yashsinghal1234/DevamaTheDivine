"use client";

import { useEffect, useState } from "react";

/** Copyright year — computed on the client so static prerender stays clean. */
export default function FooterYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <span>© {year ?? 2026} Devama The Divine. All rights reserved.</span>;
}
