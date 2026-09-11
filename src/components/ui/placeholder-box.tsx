import Image from "next/image";
import type { ReactNode } from "react";

import type { ImageAsset } from "@/views/home/home.types";

export interface PlaceholderBoxProps {
  children: ReactNode;
  className?: string;
  /** Draw the tinted wedge behind the box, as Transiett does behind pictures. */
  wedge?: boolean;
  /** When set, the photograph fills the slot and the caption becomes its alt. */
  image?: ImageAsset;
}

/**
 * The wireframe's "Bild oder Video" slots. With an `image` the slot is a
 * photograph in a soft card; without one it shows the frame's own caption, so
 * the slot is real even while its picture is not.
 */
export const PlaceholderBox = ({ children, className = "", wedge = false, image }: PlaceholderBoxProps) => (
  <div className={`relative ${className}`}>
    {wedge && <div aria-hidden className="wedge absolute -inset-x-8 -inset-y-6" />}
    {image ? (
      <div className="relative aspect-[574/534] w-full overflow-hidden rounded-card shadow-card">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1024px) 36rem, 100vw"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    ) : (
      <div className="relative flex aspect-[574/534] w-full items-center justify-center rounded-card border border-line-soft bg-surface p-10 text-center text-body-lg leading-normal text-content shadow-card">
        <p className="max-w-[24rem]">{children}</p>
      </div>
    )}
  </div>
);
