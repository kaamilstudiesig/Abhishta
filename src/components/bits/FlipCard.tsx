"use client";

import { useState, type ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { TiltedCard } from "@/components/bits/TiltedCard";
import { IconArrow } from "@/components/icons";

/**
 * A photo card that flips: the front is a full photo with its title (a
 * TiltedCard, so it leans toward a mouse pointer); tapping turns it over in
 * 3D to show the details on the back, and tapping again turns it back. Made
 * for showing a photo first and its details on demand. With reduced motion the
 * faces swap without the turn. The hidden face is inert, so focus and screen
 * readers only meet the side that shows.
 */
export function FlipCard({
  photo,
  alt,
  title,
  tag,
  hint = "See more",
  back,
  label,
  className = "",
}: {
  photo: StaticImageData;
  alt: string;
  title: string;
  /** a short line above the title on the front (e.g. who it sleeps) */
  tag?: string;
  hint?: string;
  back: ReactNode;
  /** what the card is about, for the flip button's name */
  label: string;
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <TiltedCard amplitude={8} scaleOnHover={1.02} className={className}>
      <div className="relative h-full [perspective:1200px]">
        <div
          className={`relative h-full [transform-style:preserve-3d] transition-transform duration-700 ease-[var(--ease-earth)] motion-reduce:transition-none ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* front: the photo */}
          <div inert={flipped || undefined} className="absolute inset-0 overflow-hidden rounded-card shadow-card [backface-visibility:hidden]">
            <Image src={photo} alt={alt} fill sizes="(min-width: 1024px) 40vw, 92vw" placeholder="blur" className="object-cover" />
            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.7),rgb(0_0_0/0.1)_55%,transparent)]" />
            <div className="on-dark absolute inset-x-0 bottom-0 flex items-end justify-between gap-s13 p-s21">
              <div>
                {tag ? <p className="text-[13px] font-medium tracking-[0.04em] text-paper/85">{tag}</p> : null}
                <p className="font-display text-[clamp(22px,2.6vw,32px)] leading-[1.1] text-paper">{title}</p>
              </div>
              <button
                type="button"
                onClick={() => setFlipped(true)}
                aria-label={`${hint}: ${label}`}
                className="inline-flex min-h-[44px] shrink-0 items-center gap-[6px] rounded-btn bg-paper px-s13 text-[14px] font-medium text-forest after:absolute after:inset-0 after:content-['']"
              >
                {hint}
                <IconArrow size={16} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* back: the details */}
          <div
            inert={!flipped || undefined}
            className="absolute inset-0 flex flex-col overflow-hidden rounded-card bg-card shadow-card ring-1 ring-line [backface-visibility:hidden] [transform:rotateY(180deg)]"
          >
            <div className="min-h-0 flex-1 overflow-y-auto p-s13 sm:p-s21">{back}</div>
            <button
              type="button"
              onClick={() => setFlipped(false)}
              className="flex min-h-[48px] shrink-0 items-center justify-center gap-[6px] border-t border-line text-[14px] font-medium text-forest hover:bg-paper-deep"
            >
              <IconArrow size={16} className="rotate-180" aria-hidden="true" />
              Back to the photo
            </button>
          </div>
        </div>
      </div>
    </TiltedCard>
  );
}
