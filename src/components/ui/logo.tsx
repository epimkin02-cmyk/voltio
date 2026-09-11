export interface LogoProps {
  /** Word colour; the mark always carries the brand green. */
  tone?: "dark" | "light";
  className?: string;
}

/**
 * The Voltio mark: a "V" whose right stroke is a lightning bolt — the letter
 * of the name and the charge of the car in one shape — set beside the word in
 * the display face. Drawn inline so it scales and takes the surface's colour.
 */
export const Logo = ({ tone = "dark", className = "" }: LogoProps) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <svg
      viewBox="0 0 40 40"
      aria-hidden
      className="size-9 shrink-0"
      fill="none"
    >
      {/* Left arm of the V, in the word's colour. */}
      <path
        d="M4 7 L16 36"
        stroke="currentColor"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      {/* Right arm as the bolt, in the brand green. */}
      <path
        d="M31 3 L17.5 21 h7.5 L19 37 L36 16 h-8.5 L33.5 3 Z"
        fill="var(--primary)"
      />
    </svg>
    <span
      className={`font-display text-title font-bold tracking-[0.16em] ${
        tone === "light" ? "text-content-inverse" : "text-content"
      }`}
    >
      VOLTIO
    </span>
  </span>
);
