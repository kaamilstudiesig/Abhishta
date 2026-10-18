"use client";

import { useMemo, useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Brand ScrollReveal — adapted from React Bits. Body copy surfaces word by word
 * as it is scrolled into reading position, scrubbed to the scroll (so it reads
 * at the visitor's pace). Words start at 40% ink, never invisible, so copy stays
 * legible mid-scroll and with motion reduced it is simply static.
 */
type ScrollRevealProps = {
  children: string;
  as?: ElementType;
  className?: string;
};

export function ScrollReveal({ children, as: Tag = "p", className = "" }: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const words = useMemo(() => children.split(/(\s+)/), [children]);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el.querySelectorAll("[data-word]"),
          { opacity: 0.4 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.05,
            scrollTrigger: { trigger: el, start: "top 90%", end: "bottom 65%", scrub: 0.6 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [children] },
  );

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) =>
        word.trim() === "" ? (
          word
        ) : (
          <span key={i} data-word="" className="inline-block">
            {word}
          </span>
        ),
      )}
    </Tag>
  );
}
