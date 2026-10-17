"use client";

import { Children, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Brand ScrollStack — adapted from React Bits for window scroll + Lenis (the
 * original hijacks the wheel; here Lenis owns scrolling and ScrollTrigger only
 * reads it). Cards pin with CSS sticky, each 21px lower than the last, and as
 * later cards arrive the earlier ones settle back: scale down a touch and dim,
 * like pages of a field journal laid on top of one another. Renders an ordered list.
 */
type ScrollStackProps = {
  children: ReactNode;
  /** px from viewport top where the first card pins (≥768px; phones get a plain list) */
  top?: number;
  /** px each following card pins below the previous */
  offset?: number;
  className?: string;
};

export function ScrollStack({ children, top = 110, offset = 21, className = "" }: ScrollStackProps) {
  const rootRef = useRef<HTMLOListElement>(null);
  const items = Children.toArray(children);
  const count = items.length;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        const slots = gsap.utils.toArray<HTMLElement>("[data-stack-slot]", root);
        const last = slots[slots.length - 1];
        slots.slice(0, -1).forEach((slot, i) => {
          const card = slot.firstElementChild as HTMLElement;
          const depth = count - 1 - i;
          gsap.to(card, {
            scale: 1 - depth * 0.035,
            "--dim": Math.min(0.12 * depth, 0.36),
            ease: "none",
            scrollTrigger: {
              trigger: slots[i + 1],
              start: "top bottom",
              endTrigger: last,
              end: `top ${top + (count - 1) * offset}px`,
              scrub: true,
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [count, top, offset] },
  );

  return (
    <ol ref={rootRef} className={`relative ${className}`}>
      {items.map((child, i) => (
        <li
          key={i}
          data-stack-slot=""
          className="mb-s21 last:mb-0 md:sticky md:mb-s55 md:last:mb-0 motion-reduce:static"
          style={{ top: top + i * offset, zIndex: i + 1 }}
        >
          <div className="relative origin-top [--dim:0] will-change-transform">
            {child}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-card bg-forest opacity-[var(--dim)]"
            />
          </div>
        </li>
      ))}
    </ol>
  );
}
