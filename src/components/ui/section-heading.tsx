export interface SectionHeadingProps {
  id: string;
  children: string;
  align?: "start" | "center";
  className?: string;
}

/** A section's `h2` in the display face. */
export const SectionHeading = ({ id, children, align = "start", className = "" }: SectionHeadingProps) => (
  <h2
    id={id}
    className={`text-heading-compact font-semibold leading-tight tracking-display text-content sm:text-heading ${
      align === "center" ? "mx-auto max-w-[48rem] text-center text-balance" : ""
    } ${className}`}
  >
    {children}
  </h2>
);
