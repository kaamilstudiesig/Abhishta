"use client";

import { useState } from "react";
import { glass } from "@/components/bits/glass";
import { GlassFill } from "@/components/bits/LiquidGlass";
import { IconPin } from "@/components/icons";

/**
 * A Google map that doesn't steal the scroll. An embedded map swallows the
 * wheel and swipes (so the page stops snapping while the pointer is over it),
 * so it stays inert until clicked: a click or tap hands it the pointer to pan
 * and zoom, and moving away or tabbing out gives scrolling back to the page.
 */
export function MapEmbed({ src, title, className = "" }: { src: string; title: string; className?: string }) {
  const [active, setActive] = useState(false);

  return (
    <div className="relative" onMouseLeave={() => setActive(false)} onBlur={() => setActive(false)}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={`block w-full border-0 ${active ? "" : "pointer-events-none"} ${className}`}
      />
      {active ? null : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label="Use the map: pan and zoom"
          className="group absolute inset-0 grid cursor-pointer place-items-end justify-center pb-s13"
        >
          <span
            className={`relative inline-flex items-center gap-[6px] rounded-full px-s13 py-[6px] text-[13px] font-medium text-paper opacity-90 transition-opacity duration-300 group-hover:opacity-100 ${glass("dark")} bg-ink/30`}
          >
            <GlassFill />
            <IconPin size={16} />
            Click to use the map
          </span>
        </button>
      )}
    </div>
  );
}
