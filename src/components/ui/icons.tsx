import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Tick — the hero's bullet marks and the comparison table's "yes". */
export const CheckIcon = (props: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
    <path
      d="M3 8.5l3.2 3L13 4.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Cross — the comparison table's "no". */
export const CrossIcon = (props: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
    <path
      d="M4 4l8 8M12 4l-8 8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export const StarIcon = (props: IconProps) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden {...props}>
    <path d="M10 1.6l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L10 15l-5.3 2.8 1.1-5.9L1.5 7.8l5.9-.8L10 1.6z" />
  </svg>
);

export const PhoneIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
    <path
      d="M6.6 3.5h3l1.7 4.2-2.1 1.6a12 12 0 005.5 5.5l1.6-2.1 4.2 1.7v3a2 2 0 01-2.2 2A16.5 16.5 0 014.6 5.7a2 2 0 012-2.2z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronIcon = (props: IconProps) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
    <path
      d="M3.5 6l4.5 4.5L12.5 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowIcon = (props: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
    <path
      d="M3.5 10h13m0 0l-5-5m5 5l-5 5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
