import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

function Svg({ className, children, ...rest }: P) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-5 w-5"}
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconSearch = (p: P) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" />
  </Svg>
);

export const IconUser = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
  </Svg>
);

export const IconHeart = (p: P) => (
  <Svg {...p}>
    <path d="M12 21C7 17 4 13.6 4 9.8 4 7 6.2 5 8.6 5c1.5 0 2.7.8 3.4 2 .7-1.2 1.9-2 3.4-2C17.8 5 20 7 20 9.8c0 3.8-3 7.2-8 11.2z" />
  </Svg>
);

export const IconBag = (p: P) => (
  <Svg {...p}>
    <path d="M6 7h12l1 13H5L6 7z" />
    <path d="M9 10V7a3 3 0 0 1 6 0v3" />
  </Svg>
);

export const IconMenu = (p: P) => (
  <Svg {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </Svg>
);

export const IconClose = (p: P) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
);

export const IconArrowRight = (p: P) => (
  <Svg {...p}>
    <path d="M4 12h16" />
    <path d="M14 6l6 6-6 6" />
  </Svg>
);

export const IconArrowUpRight = (p: P) => (
  <Svg {...p}>
    <path d="M7 17L17 7" />
    <path d="M9 7h8v8" />
  </Svg>
);

export const IconChevronDown = (p: P) => (
  <Svg {...p}>
    <path d="M6 9l6 6 6-6" />
  </Svg>
);

export const IconChevronRight = (p: P) => (
  <Svg {...p}>
    <path d="M9 6l6 6-6 6" />
  </Svg>
);

export const IconPlus = (p: P) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const IconMinus = (p: P) => (
  <Svg {...p}>
    <path d="M5 12h14" />
  </Svg>
);

export const IconTruck = (p: P) => (
  <Svg {...p}>
    <path d="M3 16V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v9" />
    <path d="M15 10h4l2.5 3v3H15" />
    <circle cx="7.5" cy="17.5" r="1.6" />
    <circle cx="17.5" cy="17.5" r="1.6" />
  </Svg>
);

export const IconHome = (p: P) => (
  <Svg {...p}>
    <path d="M4 11l8-7 8 7" />
    <path d="M6 9.5V20h12V9.5" />
  </Svg>
);

export const IconCardLogo = (p: P) => (
  <Svg {...p}>
    <rect x="3" y="6" width="18" height="13" rx="2.5" />
    <path d="M3 10h18" />
    <path d="M6.5 15.5h4" />
  </Svg>
);

export const IconSliders = (p: P) => (
  <Svg {...p}>
    <path d="M4 8h9M17 8h3M4 16h3M11 16h9" />
    <circle cx="15" cy="8" r="2" />
    <circle cx="9" cy="16" r="2" />
  </Svg>
);

export const IconCircleDot = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
  </Svg>
);

export const IconCheck = (p: P) => (
  <Svg {...p}>
    <path d="M5 12l4 4L19 6" />
  </Svg>
);

export const IconShieldCheck = (p: P) => (
  <Svg {...p}>
    <path d="M12 3l7 3v5.2C19 16.2 15.6 19.6 12 21c-3.6-1.4-7-4.8-7-9.8V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </Svg>
);

export const IconCompass = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
  </Svg>
);

export const IconBox = (p: P) => (
  <Svg {...p}>
    <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
    <path d="M3 8l9 5 9-5" />
    <path d="M12 13v8" />
  </Svg>
);

export const IconSupport = (p: P) => (
  <Svg {...p}>
    <path d="M4 13a8 8 0 0 1 16 0" />
    <path d="M4 13v4a2 2 0 0 0 2 2h1v-6H5.5A1.5 1.5 0 0 0 4 14.5zm16 0v4a2 2 0 0 1-2 2h-1v-6h1.5a1.5 1.5 0 0 1 1.5 1.5z" />
  </Svg>
);

export const IconGift = (p: P) => (
  <Svg {...p}>
    <path d="M4 11h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9z" />
    <path d="M3 7h18v4H3V7z" />
    <path d="M12 7v14" />
    <path d="M12 7S9.5 7 8.5 6a2 2 0 0 1 3-2.6C12 4.5 12 7 12 7zm0 0s2.5 0 3.5-1a2 2 0 0 0-3-2.6C12 4.5 12 7 12 7z" />
  </Svg>
);

export const IconPlay = (p: P) => (
  <Svg fill="currentColor" stroke="none" {...p}>
    <path d="M9 6.5v11l9-5.5-9-5.5z" />
  </Svg>
);

export const IconSparkle = (p: P) => (
  <Svg {...p}>
    <path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3z" />
  </Svg>
);

export const IconQuote = (p: P) => (
  <Svg fill="currentColor" stroke="none" {...p}>
    <path d="M10 7c-3 1-5 3.5-5 7 0 2 1.2 3 2.7 3S10.5 15.8 10.5 14c0-1.5-1-2.6-2.4-2.9.3-1.4 1.1-2.4 2.4-3L10 7zm9 0c-3 1-5 3.5-5 7 0 2 1.2 3 2.7 3s2.8-1.2 2.8-3c0-1.5-1-2.6-2.4-2.9.3-1.4 1.1-2.4 2.4-3L19 7z" />
  </Svg>
);

export const IconInstagram = (p: P) => (
  <Svg {...p}>
    <rect x="4" y="4" width="16" height="16" rx="4.5" />
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
  </Svg>
);

export const IconYoutube = (p: P) => (
  <Svg {...p}>
    <rect x="3" y="6.5" width="18" height="11" rx="3" />
    <path d="M10.5 9.8v4.4L14.5 12l-4-2.2z" fill="currentColor" stroke="none" />
  </Svg>
);

export const IconPinterest = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 15.5c.4-1.8 1-4.3 1.3-5.5M11 9.5c.2-1 1-1.8 2.2-1.8 1.4 0 2.3 1 2.3 2.4 0 1.8-1.2 3.4-3 3.4-.8 0-1.4-.4-1.6-1" />
  </Svg>
);
