import type { AnchorHTMLAttributes, ReactNode } from "react";
import { SplitText } from "@/components/bits/SplitText";
import { ScrollReveal } from "@/components/bits/ScrollReveal";

export const container = "mx-auto w-full max-w-[1280px] px-s21 sm:px-s34 lg:px-s55";
export const sectionPad = "py-s55 md:py-s89";

type ButtonVariant = "primary" | "secondary" | "gold" | "ghost-light";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-farm text-white hover:bg-forest",
  secondary: "border-[1.5px] border-forest text-forest hover:bg-forest hover:text-paper",
  gold: "bg-gold text-forest hover:bg-gold-soft",
  "ghost-light": "border-[1.5px] border-paper/50 text-paper hover:border-paper hover:bg-paper hover:text-forest",
};

export function buttonClass(variant: ButtonVariant = "primary", extra = "") {
  return `inline-flex min-h-[48px] items-center justify-center gap-s8 rounded-btn px-s21 text-[15px] font-medium tracking-[0.01em] transition-colors duration-300 ${variants[variant]} ${extra}`;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: ButtonVariant }) {
  return (
    <a className={buttonClass(variant, className)} {...rest}>
      {children}
    </a>
  );
}

/** Section header: eyebrow → Fraunces H2 (SplitText) → short lead (ScrollReveal). */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  tone = "light",
  className = "",
  titleClassName = "",
  children,
}: {
  eyebrow: string;
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
      <p className={`eyebrow mb-s13 flex items-center gap-s13 ${dark ? "text-gold" : "text-farm"}`}>
        <span aria-hidden="true" className="h-[2px] w-s21 bg-gold" />
        {eyebrow}
      </p>
      <SplitText
        text={title}
        className={`font-display text-[clamp(34px,4.6vw,45px)] leading-[1.1] font-normal tracking-[-0.015em] text-balance ${dark ? "text-paper" : "text-forest"} ${titleClassName}`}
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
