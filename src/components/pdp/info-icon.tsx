import type { SVGProps } from "react";

/** Small circular "i" info icon. */
export function InfoIcon({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-4 w-4"}
      aria-hidden="true"
      {...rest}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01" />
      <path d="M12 11v5" />
    </svg>
  );
}
