"use client";

import { useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

/**
 * Brand SplitText — adapted from React Bits. Headlines rise word by word out of
 * a soil-line mask, like shoots: slow expo ease, no bounce, no colour flash.
 * Text stays in the DOM as one string for screen readers (GSAP aria: "auto").
 */
type SplitTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  trigger?: "view" | "load";
  delay?: number;
  stagger?: number;
};

export function SplitText({
  text,
  as: Tag = "h2",
  className = "",
  trigger = "view",
  delay = 0,
  stagger = 0.055,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let split: GSAPSplitText | null = null;
        document.fonts.ready.then(() => {
          if (!ref.current) return;
          split = GSAPSplitText.create(el, {
            type: "words",
            mask: "words",
            wordsClass: "split-word",
            aria: "auto",
            autoSplit: true,
            onSplit(self) {
              return gsap.from(self.words, {
                yPercent: 115,
                rotate: 2,
                duration: 1.15,
                ease: "expo.out",
                stagger,
                delay,
                scrollTrigger:
                  trigger === "view" ? { trigger: el, start: "top 88%", once: true } : undefined,
              });
            },
          });
          el.dataset.ready = "";
        });
        return () => split?.revert();
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        el.dataset.ready = "";
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [text] },
  );

  return (
    <Tag ref={ref} className={`split-text ${className}`}>
      {text}
    </Tag>
  );
}
