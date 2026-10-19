"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Brand TiltedCard — adapted from React Bits (no glare). The card leans toward
 * the pointer in 3D and lifts slightly while hovered, easing back flat when the
 * pointer leaves. While a button is held (e.g. dragging a 360° view inside it)
 * it settles flat so the drag isn't fighting the tilt. Fine pointers only, and
 * never with reduced motion.
 */
type TiltedCardProps = {
  children: ReactNode;
  /** max lean in degrees */
  amplitude?: number;
  scaleOnHover?: number;
  className?: string;
};

export function TiltedCard({ children, amplitude = 10, scaleOnHover = 1.03, className = "" }: TiltedCardProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const s = { rx: 0, ry: 0, scale: 1, toX: 0, toY: 0, tscale: 1, raf: 0 };
    const render = () => {
      // a soft spring: ease toward the target each frame
      s.rx += (s.toX - s.rx) * 0.12;
      s.ry += (s.toY - s.ry) * 0.12;
      s.scale += (s.tscale - s.scale) * 0.12;
      inner.style.transform = `rotateX(${s.rx.toFixed(3)}deg) rotateY(${s.ry.toFixed(3)}deg) scale(${s.scale.toFixed(4)})`;
      const settled = Math.abs(s.toX - s.rx) < 0.01 && Math.abs(s.toY - s.ry) < 0.01 && Math.abs(s.tscale - s.scale) < 0.0005;
      s.raf = settled ? 0 : requestAnimationFrame(render);
    };
    const kick = () => {
      if (!s.raf) s.raf = requestAnimationFrame(render);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (e.buttons) {
        s.toX = s.toY = 0;
        s.tscale = 1;
        return kick();
      }
      const r = outer.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      s.toX = -y * 2 * amplitude;
      s.toY = x * 2 * amplitude;
      s.tscale = scaleOnHover;
      kick();
    };
    const onLeave = () => {
      s.toX = s.toY = 0;
      s.tscale = 1;
      kick();
    };
    outer.addEventListener("pointermove", onMove);
    outer.addEventListener("pointerdown", onLeave);
    outer.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(s.raf);
      outer.removeEventListener("pointermove", onMove);
      outer.removeEventListener("pointerdown", onLeave);
      outer.removeEventListener("pointerleave", onLeave);
    };
  }, [amplitude, scaleOnHover]);

  return (
    <div ref={outerRef} className={`[perspective:800px] ${className}`}>
      <div ref={innerRef} className="h-full [transform-style:preserve-3d] will-change-transform">
        {children}
      </div>
    </div>
  );
}
