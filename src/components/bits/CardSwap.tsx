"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Brand CardSwap — adapted from React Bits. A fanned deck of 21px-radius cards
 * receding up and to the right. On each turn the front card drops away and
 * slides to the back of the deck while the rest step forward.
 *
 * Controlled: `active` is the card in front, `onActiveChange` reports turns.
 * Auto-turns every `interval` ms, pausing on hover/focus, never with reduced motion.
 * Cards behind the front one are inert, so keyboard focus only reaches the visible card.
 */
type CardSwapProps = {
  children: ReactNode;
  active: number;
  onActiveChange: (index: number) => void;
  /** ms between auto-turns; null stops auto-turning (e.g. once the visitor takes over) */
  interval?: number | null;
  className?: string;
};

// The fan step: tighter on phones so the deck never pokes past the screen edge.
const fanStep = () => (typeof window !== "undefined" && window.innerWidth < 640 ? 13 : 34);

const slot = (i: number, total: number) => ({
  x: i * fanStep(),
  y: -i * fanStep(),
  z: -i * fanStep() * 1.5,
  scale: 1 - i * 0.02,
  zIndex: total - i,
});

export function CardSwap({ children, active, onActiveChange, interval = 5500, className = "" }: CardSwapProps) {
  const cards = Children.toArray(children);
  const total = cards.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef<number[]>(cards.map((_, i) => i));
  const busyRef = useRef(false);
  const pausedRef = useRef(false);
  const reduceRef = useRef(false);
  const onChangeRef = useRef(onActiveChange);
  useEffect(() => {
    onChangeRef.current = onActiveChange;
  });

  const els = () => gsap.utils.toArray<HTMLElement>("[data-swap-card]", rootRef.current);

  const place = (instant: boolean) => {
    const nodes = els();
    orderRef.current.forEach((cardIndex, pos) => {
      const s = slot(pos, total);
      const el = nodes[cardIndex];
      el.inert = pos !== 0;
      el.setAttribute("aria-hidden", pos === 0 ? "false" : "true");
      gsap.to(el, {
        ...s,
        xPercent: -50,
        yPercent: -50,
        skewY: 0,
        duration: instant ? 0 : 0.9,
        ease: "power3.out",
        overwrite: true,
      });
    });
  };

  // One turn: front card drops, the rest step forward, the dropped card goes to the back.
  const turn = () =>
    new Promise<void>((resolve) => {
      const nodes = els();
      const [front, ...rest] = orderRef.current;
      const frontEl = nodes[front];
      if (reduceRef.current) {
        orderRef.current = [...rest, front];
        place(true);
        resolve();
        return;
      }
      const tl = gsap.timeline({ onComplete: resolve });
      tl.to(frontEl, { y: "+=420", opacity: 0.0, duration: 0.7, ease: "power2.in" });
      tl.add(() => {
        orderRef.current = [...rest, front];
        rest.forEach((cardIndex, pos) => {
          const el = nodes[cardIndex];
          el.inert = pos !== 0;
          el.setAttribute("aria-hidden", pos === 0 ? "false" : "true");
          gsap.to(el, { ...slot(pos, total), skewY: 0, duration: 0.9, ease: "power3.out", delay: pos * 0.06 });
        });
        const back = slot(total - 1, total);
        gsap.set(frontEl, { zIndex: back.zIndex });
        frontEl.inert = true;
        frontEl.setAttribute("aria-hidden", "true");
        gsap.to(frontEl, { ...back, opacity: 1, skewY: 0, duration: 0.9, ease: "power3.out" });
      }, 0.45);
    });

  const bringToFront = async (target: number) => {
    if (busyRef.current) return;
    busyRef.current = true;
    while (orderRef.current[0] !== target) {
      await turn();
    }
    busyRef.current = false;
  };

  useGSAP(
    () => {
      reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.set(els(), { transformPerspective: 900, left: "50%", top: "50%" });
      place(true);
    },
    { scope: rootRef },
  );

  // External selection → rotate the deck until that card is in front.
  useEffect(() => {
    if (orderRef.current[0] !== active) void bringToFront(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Auto-turn.
  useEffect(() => {
    if (interval === null || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(async () => {
      if (pausedRef.current || busyRef.current || document.hidden) return;
      busyRef.current = true;
      await turn();
      busyRef.current = false;
      onChangeRef.current(orderRef.current[0]);
    }, interval);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval]);

  return (
    <div
      ref={rootRef}
      className={`relative [perspective:900px] ${className}`}
      onPointerEnter={() => (pausedRef.current = true)}
      onPointerLeave={() => (pausedRef.current = false)}
      onFocus={() => (pausedRef.current = true)}
      onBlur={() => (pausedRef.current = false)}
    >
      {cards.map((card, i) => (
        <div
          key={i}
          data-swap-card=""
          className="absolute w-[min(88%,480px)] [transform-style:preserve-3d] will-change-transform"
        >
          {card}
        </div>
      ))}
    </div>
  );
}
