"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";

export type Panel = {
  id: string;
  title: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  /** the open panel's picture: a 360° view, a photo or an illustration (rendered only while open) */
  media: ReactNode;
  body: ReactNode;
};

/**
 * Expanding panels — an accordion gallery for dark bands. On large screens the
 * panels stand side by side: the open one widens to show its picture, its title
 * and its text; the others narrow to strips, each a button with an icon and its
 * title on its side. Opening a strip moves focus to the panel's title. Below
 * that width, pills choose the panel and the open one sits under them. Only the
 * open panel's picture is mounted, so at most one 360° view runs.
 */
export function ExpandingPanels({ panels, label, className = "" }: { panels: Panel[]; label: string; className?: string }) {
  const [open, setOpen] = useState(0);
  const focusOnOpen = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const current = panels[open];

  useEffect(() => {
    if (!focusOnOpen.current) return;
    focusOnOpen.current = false;
    headingRef.current?.focus({ preventScroll: true });
  }, [open]);

  return (
    <div className={className}>
      {/* large screens: the panels side by side */}
      <ul aria-label={label} className="hidden h-full gap-s8 lg:flex">
        {panels.map((p, i) => {
          const Icon = p.icon;
          return i === open ? (
            <li
              key={p.id}
              className="flex min-w-0 grow-[5] basis-0 flex-col overflow-hidden rounded-card bg-paper/[0.07] transition-[flex-grow] duration-700 ease-[var(--ease-earth)]"
            >
              <div className="relative min-h-0 flex-1 p-s8 pb-0">{p.media}</div>
              <div className="px-s21 pt-s13 pb-s21">
                <h3
                  ref={headingRef}
                  tabIndex={-1}
                  className="flex items-center gap-s13 font-display text-[clamp(22px,2vw,28px)] leading-[1.15] text-paper"
                >
                  <Icon size={24} className="shrink-0 text-gold" />
                  {p.title}
                </h3>
                <div className="mt-s8 max-w-[44em] text-[15px] leading-[1.5] text-paper/80">{p.body}</div>
              </div>
            </li>
          ) : (
            <li key={p.id} className="flex min-w-0 grow basis-0 transition-[flex-grow] duration-700 ease-[var(--ease-earth)]">
              <button
                type="button"
                aria-expanded="false"
                onClick={() => {
                  focusOnOpen.current = true;
                  setOpen(i);
                }}
                className="flex w-full flex-col items-center gap-s21 rounded-card bg-paper/[0.04] py-s21 text-paper/75 transition-colors duration-300 hover:bg-paper/[0.09] hover:text-paper"
              >
                <Icon size={26} className="shrink-0 text-gold" />
                <span className="rotate-180 font-display text-[19px] leading-none whitespace-nowrap [writing-mode:vertical-rl]">
                  {p.title}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* phones and tablets: pills, then the open panel */}
      <div className="flex h-full flex-col lg:hidden">
        <ul
          aria-label={label}
          className="-mx-s21 flex gap-s8 overflow-x-auto px-s21 py-[2px] [scrollbar-width:none] sm:-mx-s34 sm:px-s34 [&::-webkit-scrollbar]:hidden"
        >
          {panels.map((p, i) => (
            <li key={p.id} className="shrink-0">
              <button
                type="button"
                aria-pressed={i === open}
                onClick={() => setOpen(i)}
                className={`relative inline-flex min-h-[44px] items-center gap-s8 rounded-btn border px-s13 text-[15px] whitespace-nowrap transition-colors duration-300 ${
                  i === open ? "border-paper/60 bg-paper/10 text-paper" : "border-paper/20 text-paper/70 hover:text-paper"
                }`}
              >
                <p.icon size={18} className="text-gold" />
                {p.title}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-s13 flex min-h-0 flex-1 flex-col overflow-hidden rounded-card bg-paper/[0.07]">
          <div className="relative min-h-0 flex-1 p-s8 pb-0">{current.media}</div>
          <div className="px-s13 pt-s13 pb-s13 sm:px-s21">
            <h3 className="font-display text-[22px] leading-[1.15] text-paper">{current.title}</h3>
            <div className="mt-[4px] text-[15px] leading-[1.5] text-paper/80">{current.body}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
