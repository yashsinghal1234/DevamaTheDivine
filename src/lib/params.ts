/**
 * Next.js App Router `searchParams` values are `string | string[] |
 * undefined` — repeated query keys (e.g. ?cat=a&cat=b) arrive as arrays.
 * These helpers normalise them so pages can't crash on hand-typed URLs.
 */

export type MaybeParam = string | string[] | undefined;

/** Single text value (repeated keys are joined, first-wins is fine). */
export function asText(value: MaybeParam): string {
  return (Array.isArray(value) ? value.join(" ") : (value ?? "")).trim();
}

/** Comma-separated list, additionally split across repeated keys. */
export function asList(value: MaybeParam): string[] {
  const raw = Array.isArray(value) ? value.join(",") : (value ?? "");
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
