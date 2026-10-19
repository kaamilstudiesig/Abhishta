"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { buttonClass } from "@/components/ui";

export type Step = { title: string; content: ReactNode };

/**
 * Brand Stepper — adapted from React Bits (bars indicator). A form in a few
 * short steps: bars across the top fill as you go (and take you back to any
 * step you've reached), the step slides in from the side it came from, and
 * focus moves to its first field. Back and Continue sit at the bottom; on the
 * last step `finish` (the submit button) takes Continue's place. Controlled:
 * the parent owns `step` (0-based) and can refuse to move on via `canLeave`.
 */
export function Stepper({
  steps,
  step,
  onStepChange,
  canLeave = () => true,
  finish,
  className = "",
}: {
  steps: Step[];
  step: number;
  onStepChange: (step: number) => void;
  /** called before moving forward from `step`; return false to stay (e.g. show an error) */
  canLeave?: (step: number) => boolean;
  finish: ReactNode;
  className?: string;
}) {
  const last = steps.length - 1;
  const [reached, setReached] = useState(step);
  if (step > reached) setReached(step);
  const paneRef = useRef<HTMLFieldSetElement>(null);
  const prevStep = useRef(step);
  const moved = useRef(false);

  // slide the new step in from the side it came from, then focus its first field
  useEffect(() => {
    const pane = paneRef.current;
    const from = prevStep.current;
    prevStep.current = step;
    if (!pane || from === step) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const dx = step > from ? 24 : -24;
      pane.animate([{ transform: `translateX(${dx}px)`, opacity: 0 }, { transform: "none", opacity: 1 }], {
        duration: 420,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      });
    }
    if (moved.current) {
      moved.current = false;
      pane.querySelector<HTMLElement>("input, select, textarea, button")?.focus({ preventScroll: true });
    }
  }, [step]);

  const go = (target: number) => {
    if (target === step || target < 0 || target > last) return;
    if (target > step && !canLeave(step)) return;
    moved.current = true;
    onStepChange(target);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex gap-[6px]">
        {steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => go(i)}
            disabled={i > reached || i === step}
            aria-current={i === step ? "step" : undefined}
            aria-label={`Step ${i + 1} of ${steps.length}: ${s.title}`}
            className="group flex flex-1 flex-col gap-[6px] py-[6px] text-left disabled:cursor-default"
          >
            <span className="relative block h-[4px] overflow-hidden rounded-full bg-line">
              <span
                className={`absolute inset-y-0 left-0 rounded-full bg-farm transition-[width] duration-500 ease-[var(--ease-earth)] ${
                  i <= step ? "w-full" : "w-0"
                }`}
              />
            </span>
            <span
              className={`text-[13px] leading-none font-medium transition-colors duration-300 max-sm:sr-only ${
                i === step ? "text-forest" : i <= reached ? "text-ink-muted group-hover:text-forest" : "text-ink-muted/60"
              }`}
            >
              {s.title}
            </span>
          </button>
        ))}
      </div>

      <fieldset ref={paneRef} className="mt-s13 min-w-0 sm:mt-s21">
        <legend className="font-display text-[clamp(20px,1.8vw,24px)] leading-[1.2] text-forest">
          <span className="sr-only">{`Step ${step + 1} of ${steps.length}: `}</span>
          {steps[step].title}
        </legend>
        <div className="mt-s13">{steps[step].content}</div>
      </fieldset>

      <div className="mt-s21 flex flex-wrap items-center gap-s13">
        {step < last ? (
          <button type="button" onClick={() => go(step + 1)} className={buttonClass("primary")}>
            Continue
          </button>
        ) : (
          finish
        )}
        {step > 0 ? (
          <button type="button" onClick={() => go(step - 1)} className={buttonClass("secondary")}>
            Back
          </button>
        ) : null}
      </div>
    </div>
  );
}
