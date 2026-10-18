"use client";

import { Children, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Brand ScrollStack — adapted from React Bits for one-card-per-scroll paging.
 * The section is N screens tall with a snap point at every screen, and a
 * single sticky stage holds the header and the deck. Each scroll brings the
 * next card up over the last; the card underneath settles back (a touch
 * smaller, dimmer) like pages of a field journal. Because every card has its
 * own mandatory snap point with scroll-snap-stop, one scroll moves exactly one
 * card and the deck stays put until the next scroll. Each card receives a --dim
 * custom property (0–0.42) to darken itself as it is covered.
 */
type ScrollStackProps = {
  children: ReactNode;
  header?: ReactNode;
  id?: string;
  className?: string;
};

const PEEK = 13;

export function ScrollStack({ children, header, id, className = "" }: ScrollStackProps) {
  const rootRef = useRef<HTMLElement>(null);
  const items = Children.toArray(children);
  const count = items.length;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || count < 2) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", root);
      gsap.set(cards.slice(1), { yPercent: 115 });

      // Phones: each card simply slides up over the last (no fanned edges, no
      // shrinking) so the photograph keeps the whole screen width.
      const wide = window.matchMedia("(min-width: 768px)").matches;
      const tl = gsap.timeline({
        defaults: { ease: "none", duration: 1 },
        scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.3 },
      });
      for (let i = 1; i < count; i++) {
        tl.to(cards[i], { yPercent: 0 }, i - 1);
        for (let j = 0; j < i; j++) {
          const depth = i - j;
          tl.to(
            cards[j],
            wide ? { scale: 1 - depth * 0.04, "--dim": Math.min(depth * 0.14, 0.42) } : { "--dim": Math.min(depth * 0.3, 0.6) },
            i - 1,
          );
        }
      }
    },
    { scope: rootRef, dependencies: [count] },
  );

  return (
    <section
      id={id}
      ref={rootRef}
      data-nav="light"
      className={`relative ${className}`}
      style={{ height: `${count * 100}svh` }}
    >
      {items.map((_, i) => (
        <div
          key={i}
          data-snap=""
          data-stack-page=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 h-svh"
          style={{ top: `${i * 100}svh` }}
        />
      ))}
      <div className="sticky top-0 flex h-svh min-h-[560px] flex-col overflow-hidden pt-[84px] pb-[80px] md:pt-[96px] md:pb-s34">
        {header}
        <ol className="relative mt-s13 flex-1 md:mt-s21">
          {items.map((child, i) => (
            <li
              key={i}
              data-stack-card=""
              className="absolute inset-x-0 top-0 bottom-0 origin-top [--dim:0] will-change-transform md:top-[var(--peek)]"
              style={{ "--peek": `${i * PEEK}px`, zIndex: i + 1 } as CSSProperties}
            >
              {child}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
