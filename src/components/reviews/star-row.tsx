import { IconStar } from "@/components/icons";

/**
 * 1–5 star display used by the review cards. Half ratings render one
 * half-filled star via an SVG gradient.
 */
export default function StarRow({ rating }: { rating: number }) {
  const clamped = Math.max(0, Math.min(5, rating));
  const full = Math.floor(clamped);
  const half = clamped - full >= 0.25 && clamped - full < 0.85;

  const gradientId = `star-half-${String(rating).replace(".", "-")}`;

  return (
    <span className="inline-flex items-center gap-0.5 text-gold-deep" role="img" aria-label={`${clamped} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        if (i < full) return <IconStar key={i} className="h-4 w-4" />;
        if (i === full && half) {
          return (
            <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" aria-hidden focusable="false">
              <defs>
                <linearGradient id={gradientId}>
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <path
                fill={`url(#${gradientId})`}
                stroke="currentColor"
                strokeWidth="1.4"
                d="M12 3.6l2.5 5 5.5.8-4 3.9.95 5.5-4.95-2.6-4.95 2.6.95-5.5-4-3.9 5.5-.8z"
              />
            </svg>
          );
        }
        return (
          <svg key={i} viewBox="0 0 24 24" className="h-4 w-4 text-terracotta" aria-hidden focusable="false">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              d="M12 3.6l2.5 5 5.5.8-4 3.9.95 5.5-4.95-2.6-4.95 2.6.95-5.5-4-3.9 5.5-.8z"
            />
          </svg>
        );
      })}
    </span>
  );
}
