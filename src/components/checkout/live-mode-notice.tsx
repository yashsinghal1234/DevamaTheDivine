import { IconArrowUpRight } from "@/components/icons";

/**
 * Shown on the illustrative checkout pages only when the Shopify backend is
 * connected — pointing the user to the real hosted checkout, which stays
 * authoritative for address, payment, taxes and totals.
 */
export default function LiveModeNotice() {
  return (
    <div className="mt-6 rounded-xl bg-maroon px-5 py-4 text-cream sm:px-6">
      <p className="text-sm font-semibold">Live checkout is active</p>
      <p className="mt-1 text-xs leading-relaxed text-cream/80 sm:text-[13px]">
        This staged flow is no longer used for purchases. From the basket,
        continue directly to Shopify&rsquo;s secure hosted checkout — totals,
        taxes and payment are completed there.
      </p>
      <a
        href="/cart"
        className="group mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-gold underline underline-offset-2 hover:text-cream"
      >
        Go to your basket
        <IconArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  );
}
