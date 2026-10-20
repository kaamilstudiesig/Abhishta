"use client";

import { Children, useEffect, useRef, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Brand CardSwap — adapted from React Bits. A fanned deck of 21px-radius cards
 * receding up and to the right. It never moves on its own: the visitor drags
 * (or swipes) the front card. Drag it left and it is thrown off and tucked to
 * the back of the deck as the next card steps forward; drag it right and the
 * previous card comes back in front. A short drag springs back. ←/→ keys do
 * the same when the deck has focus.
 *
 * Controlled: `active` is the card in front, `onActiveChange` reports changes.
 * Cards behind the front one are inert, so keyboard focus only reaches the visible card.
 * Vertical swipes still scroll the page (touch-action: pan-y). Drags that start
 * inside a `[data-no-swap]` element (e.g. a 360° view) are left to that element.
 */
type CardSwapProps = {
  children: ReactNode;
  active: number;
  onActiveChange: (index: number) => void;
  label?: string;
  className?: string;
};

// The fan step: tighter on phones so the deck never pokes past the screen edge.
const fanStep = () => (typeof window !== "undefined" && window.innerWidth < 640 ? 13 : 34);

const slot = (i: number, total: number) => ({
  x: i * fanStep(),
  y: -i * fanStep(),
  z: -i * fanStep() * 1.5,
  scale: 1 - i * 0.02,
  rotation: 0,
  opacity: 1,
  zIndex: total - i,
});

const THROW = 72; // px of drag that commits a turn
const FLICK = 0.45; // px/ms — a quick flick commits with less distance

export function CardSwap({ children, active, onActiveChange, label = "Cards", className = "" }: CardSwapProps) {
  const cards = Children.toArray(children);
  const total = cards.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef<number[]>(cards.map((_, i) => i));
  const busyRef = useRef(false);
  const reduceRef = useRef(false);
  const dragRef = useRef({ id: -1, x: 0, y: 0, t: 0, dx: 0, active: false, suppressClick: false });
  const onChangeRef = useRef(onActiveChange);
  useEffect(() => {
    onChangeRef.current = onActiveChange;
  });

  const els = () => gsap.utils.toArray<HTMLElement>("[data-swap-card]", rootRef.current);

  const markFront = () => {
    const nodes = els();
    orderRef.current.forEach((cardIndex, pos) => {
      nodes[cardIndex].inert = pos !== 0;
      nodes[cardIndex].setAttribute("aria-hidden", pos === 0 ? "false" : "true");
    });
  };

  const place = (instant: boolean) => {
    const nodes = els();
    orderRef.current.forEach((cardIndex, pos) => {
      gsap.to(nodes[cardIndex], {
        ...slot(pos, total),
        xPercent: -50,
        yPercent: -50,
        duration: instant ? 0 : 0.7,
        ease: "power3.out",
        overwrite: true,
      });
    });
    markFront();
  };

  // Next: the front card is thrown off to the left and tucked behind the deck.
  const next = () =>
    new Promise<void>((resolve) => {
      const nodes = els();
      const [front, ...rest] = orderRef.current;
      orderRef.current = [...rest, front];
      if (reduceRef.current) {
        place(true);
        resolve();
        return;
      }
      const frontEl = nodes[front];
      const back = slot(total - 1, total);
      gsap
        .timeline({ onComplete: resolve })
        .to(frontEl, { x: -520, rotation: -9, opacity: 0, duration: 0.42, ease: "power2.in", overwrite: true })
        .add(() => {
          rest.forEach((cardIndex, pos) =>
            gsap.to(nodes[cardIndex], { ...slot(pos, total), duration: 0.7, ease: "power3.out", delay: pos * 0.05 }),
          );
          gsap.set(frontEl, { zIndex: back.zIndex, x: back.x + 40, y: back.y, rotation: 0 });
          gsap.to(frontEl, { ...back, duration: 0.6, ease: "power3.out" });
          markFront();
        }, 0.3);
    });

  // Previous: the card at the back of the deck comes in from the left to the front.
  const prev = () =>
    new Promise<void>((resolve) => {
      const nodes = els();
      const order = orderRef.current;
      const last = order[order.length - 1];
      orderRef.current = [last, ...order.slice(0, -1)];
      if (reduceRef.current) {
        place(true);
        resolve();
        return;
      }
      const lastEl = nodes[last];
      orderRef.current.slice(1).forEach((cardIndex, i) =>
        gsap.to(nodes[cardIndex], { ...slot(i + 1, total), duration: 0.7, ease: "power3.out", overwrite: true }),
      );
      gsap.set(lastEl, { zIndex: total + 1, x: -520, y: 0, rotation: -9, opacity: 0, scale: 1 });
      gsap.to(lastEl, {
        ...slot(0, total),
        duration: 0.7,
        ease: "power3.out",
        onComplete: () => {
          gsap.set(lastEl, { zIndex: total });
          resolve();
        },
      });
      markFront();
    });

  const step = async (dir: 1 | -1) => {
    if (busyRef.current) return;
    busyRef.current = true;
    await (dir > 0 ? next() : prev());
    busyRef.current = false;
    onChangeRef.current(orderRef.current[0]);
  };

  // External selection (the list / pills) → shortest way round to that card.
  const bringToFront = async (target: number) => {
    if (busyRef.current) return;
    busyRef.current = true;
    const forward = orderRef.current.indexOf(target);
    const useNext = forward <= total - forward;
    while (orderRef.current[0] !== target) await (useNext ? next() : prev());
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

  useEffect(() => {
    if (orderRef.current[0] !== active) void bringToFront(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // ---- dragging the front card -------------------------------------------
  const frontEl = () => els()[orderRef.current[0]];

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (busyRef.current || (e.pointerType === "mouse" && e.button !== 0)) return;
    // a drag on something that drags itself (a 360° view) belongs to it, not to the deck
    if ((e.target as HTMLElement).closest("[data-no-swap]")) return;
    const d = dragRef.current;
    Object.assign(d, { id: e.pointerId, x: e.clientX, y: e.clientY, t: e.timeStamp, dx: 0, active: false });
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (e.pointerId !== d.id) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.active) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
        d.id = -1; // a vertical swipe: let the page scroll
        return;
      }
      if (Math.abs(dx) < 8) return;
      d.active = true;
      rootRef.current?.setPointerCapture(e.pointerId);
    }
    d.dx = dx;
    gsap.set(frontEl(), { x: slot(0, total).x + dx, rotation: dx * 0.03 });
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (e.pointerId !== d.id) return;
    d.id = -1;
    if (!d.active) return;
    d.active = false;
    d.suppressClick = true;
    window.setTimeout(() => (d.suppressClick = false), 0);
    const speed = Math.abs(d.dx) / Math.max(1, e.timeStamp - d.t);
    const commit = Math.abs(d.dx) > THROW || (Math.abs(d.dx) > 28 && speed > FLICK);
    if (commit) void step(d.dx < 0 ? 1 : -1);
    else gsap.to(frontEl(), { x: slot(0, total).x, rotation: 0, duration: 0.5, ease: "power3.out" });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") void step(1);
    else if (e.key === "ArrowLeft") void step(-1);
    else return;
    e.preventDefault();
  };

  return (
    <div
      ref={rootRef}
      role="group"
      aria-roledescription="card deck"
      aria-label={`${label} — drag or use the arrow keys to move through the cards`}
      tabIndex={0}
      className={`relative cursor-grab touch-pan-y select-none [perspective:900px] active:cursor-grabbing ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
      onDragStart={(e) => e.preventDefault()}
      onClickCapture={(e) => {
        if (dragRef.current.suppressClick) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
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
