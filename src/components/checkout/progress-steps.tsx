export default function ProgressSteps({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <ol className="flex items-center gap-3 overflow-x-auto py-1 no-scrollbar sm:gap-4">
      {steps.map((label, i) => {
        const state = i < current ? "done" : i === current ? "active" : "todo";
        return (
          <li key={label} className="flex shrink-0 items-center gap-3 sm:gap-4">
            {i > 0 && (
              <span className="h-px w-6 bg-line sm:w-14" aria-hidden />
            )}
            <span className="flex items-center gap-2.5">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  state === "active"
                    ? "bg-maroon text-cream"
                    : state === "done"
                      ? "bg-maroon text-cream"
                      : "bg-sand text-clay"
                }`}
              >
                {i + 1}
              </span>
              <span
                className={`text-xs sm:text-sm ${
                  state === "active"
                    ? "font-semibold text-maroon-deep"
                    : state === "done"
                      ? "font-medium text-ink"
                      : "text-clay"
                }`}
              >
                {label}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
