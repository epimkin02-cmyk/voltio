export interface LogoProps {
  /** Word colour; the bolt always carries the brand green. */
  tone?: "dark" | "light";
  className?: string;
}

/**
 * The Voltio wordmark. The V *is* the mark: its left stroke is a letter, its
 * right stroke a lightning bolt, and "OLTIO" runs on from it in the display
 * face — one word, with the charge built into the first letter. Drawn inline
 * so it scales with the type and takes the surface's colour.
 */
export const Logo = ({ tone = "dark", className = "" }: LogoProps) => {
  const word = tone === "light" ? "text-content-inverse" : "text-content";
  return (
    <span
      className={`inline-flex items-center font-display text-title font-bold leading-none tracking-[0.14em] ${word} ${className}`}
      aria-label="VOLTIO"
    >
      {/* The V glyph, sized to the cap height of the text beside it. */}
      <svg
        viewBox="0 0 34 30"
        aria-hidden
        className="mr-[0.08em] h-[0.92em] w-auto"
        fill="none"
      >
        <path
          d="M3.5 3 L14 27"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M27 0 L15 15.5 h6.5 L16.5 30 L33 11 h-7 L31 0 Z"
          fill="var(--primary)"
        />
      </svg>
      <span className="translate-y-[0.02em]">OLTIO</span>
    </span>
  );
};
