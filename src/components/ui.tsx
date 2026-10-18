import type { ReactNode } from "react";
import { SplitText } from "@/components/bits/SplitText";
import { ScrollReveal } from "@/components/bits/ScrollReveal";

export const container = "mx-auto w-full max-w-[1280px] px-s21 sm:px-s34 lg:px-s55";

type ButtonVariant = "primary" | "secondary" | "gold" | "ghost-light";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-farm text-paper hover:bg-forest",
  secondary: "border-[1.5px] border-forest text-forest hover:bg-forest hover:text-paper",
  // light fill for dark bands and the hero (brass is reserved for small highlights)
  gold: "bg-paper text-forest hover:bg-gold-soft",
  "ghost-light": "border-[1.5px] border-paper/50 text-paper hover:border-paper hover:bg-paper hover:text-forest",
};

export function buttonClass(variant: ButtonVariant = "primary", extra = "") {
  return `inline-flex min-h-[48px] items-center justify-center gap-s8 rounded-btn px-s21 text-[15px] font-medium tracking-[0.01em] transition-colors duration-300 ${variants[variant]} ${extra}`;
}


/**
 * Section header: a short brass rule → Fraunces H2 (SplitText) → optional short
 * lead (ScrollReveal). No uppercase label: the heading carries the section.
 */
export function SectionHeader({
  title,
  lead,
  tone = "light",
  className = "",
  titleClassName = "",
  children,
}: {
  title: string;
  lead?: string;
  tone?: "light" | "dark";
  className?: string;
  titleClassName?: string;
  children?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <header className={`max-w-[34em] ${className}`}>
      <span aria-hidden="true" className="mb-s21 block h-px w-s34 bg-gold" />
      <SplitText
        text={title}
        className={`font-display text-[clamp(28px,4.6vw,45px)] leading-[1.1] font-normal tracking-[-0.015em] text-balance ${dark ? "text-paper" : "text-forest"} ${titleClassName}`}
      />
      {lead ? (
        <ScrollReveal className={`mt-s21 max-w-[30em] text-pretty ${dark ? "text-paper/85" : "text-ink-muted"}`}>
          {lead}
        </ScrollReveal>
      ) : null}
      {children}
    </header>
  );
}

/** One screen-high page: equal air above and below (the top also clears the fixed navbar), content centred. */
export const screen = "relative flex min-h-svh flex-col justify-center pt-[92px] pb-[80px] md:py-[112px]";
