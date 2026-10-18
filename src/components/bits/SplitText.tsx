"use client";

import { useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { whenIntroDone } from "@/lib/intro";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

/**
 * Brand SplitText — adapted from React Bits. Headlines rise word by word (or line
 * by line) out of a clip mask: a calm ease, no tilt, no bounce, no colour flash.
 * Text stays in the DOM as one string for screen readers (GSAP aria: "auto").
 */
type SplitTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** view: on scroll into view · load: on mount · intro: when the page-load veil lifts */
  trigger?: "view" | "load" | "intro";
  /** split by words (default) or by lines — lines rise through a clip mask */
  by?: "words" | "lines";
  delay?: number;
  stagger?: number;
};

export function SplitText({
  text,
  as: Tag = "h2",
  className = "",
  trigger = "view",
  delay = 0,
  stagger = 0.04,
  by = "words",
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let split: GSAPSplitText | null = null;
        let stopWaiting = () => {};
        document.fonts.ready.then(() => {
          if (!ref.current) return;
          split = GSAPSplitText.create(el, {
            type: by,
            mask: by,
            wordsClass: "split-word",
            linesClass: "split-line",
            aria: "auto",
            autoSplit: true,
            onSplit(self) {
              // quiet rise: no tilt, no overshoot, a calm ease
              const tween = gsap.from(by === "lines" ? self.lines : self.words, {
                yPercent: 100,
                opacity: 0,
                duration: by === "lines" ? 1 : 0.9,
                ease: "power3.out",
                stagger,
                delay,
                paused: trigger === "intro",
                scrollTrigger:
                  trigger === "view" ? { trigger: el, start: "top 88%", once: true } : undefined,
              });
              if (trigger === "intro") {
                stopWaiting();
                stopWaiting = whenIntroDone(() => tween.play());
              }
              return tween;
            },
          });
          el.dataset.ready = "";
        });
        return () => {
          stopWaiting();
          split?.revert();
        };
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
