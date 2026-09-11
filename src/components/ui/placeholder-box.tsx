import type { ReactNode } from "react";

export interface PlaceholderBoxProps {
  children: ReactNode;
  className?: string;
  /** Draw the tinted wedge behind the box, as Transiett does behind pictures. */
  wedge?: boolean;
}

/**
 * The wireframe's "Bild oder Video" slots, rendered as a soft card with the
 * frame's own caption inside — the slot is real, its picture is not yet.
 * Replace the children with an `<Image>` when the asset exists.
 */
export const PlaceholderBox = ({ children, className = "", wedge = false }: PlaceholderBoxProps) => (
  <div className={`relative ${className}`}>
    {wedge && <div aria-hidden className="wedge absolute -inset-x-8 -inset-y-6" />}
    <div className="relative flex aspect-[574/534] w-full items-center justify-center rounded-card border border-line-soft bg-surface p-10 text-center text-body-lg leading-normal text-content shadow-card">
      <p className="max-w-[24rem]">{children}</p>
    </div>
  </div>
);
