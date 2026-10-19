"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Brand AnimatedBeam — adapted from Magic UI (MIT). A faint S-curve joins two
 * elements inside a container (leaving and arriving level, like a flow chart),
 * and a short pulse of light travels along it,
 * over and over. Drawn with an SVG dash animation (no Motion dependency); it
 * rests while off screen, and with reduced motion only the still line shows.
 */
type AnimatedBeamProps = {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  /** seconds for one trip */
  duration?: number;
  /** seconds before the first trip */
  delay?: number;
  className?: string;
};

export function AnimatedBeam({ containerRef, fromRef, toRef, duration = 3.4, delay = 0, className = "" }: AnimatedBeamProps) {
  const [geometry, setGeometry] = useState({ d: "", width: 0, height: 0 });
  const pulseRef = useRef<SVGPathElement>(null);

  // keep the path between the two elements' centres as the layout changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const update = () => {
      const from = fromRef.current;
      const to = toRef.current;
      if (!from || !to) return;
      const c = container.getBoundingClientRect();
      const a = from.getBoundingClientRect();
      const b = to.getBoundingClientRect();
      const x1 = a.left - c.left + a.width / 2;
      const y1 = a.top - c.top + a.height / 2;
      const x2 = b.left - c.left + b.width / 2;
      const y2 = b.top - c.top + b.height / 2;
      const mx = ((x1 + x2) / 2).toFixed(1);
      const [ax, ay, bx, by] = [x1, y1, x2, y2].map((n) => n.toFixed(1));
      setGeometry({
        d: `M ${ax},${ay} C ${mx},${ay} ${mx},${by} ${bx},${by}`,
        width: c.width,
        height: c.height,
      });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(container);
    return () => ro.disconnect();
  }, [containerRef, fromRef, toRef]);

  // the travelling pulse: a short dash slid along the path (pathLength is normalised to 1); it starts just
  // before the path and ends just past it, so it slides in and out rather than popping
  useEffect(() => {
    const pulse = pulseRef.current;
    const container = containerRef.current;
    if (!pulse || !container || !geometry.d) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const anim = pulse.animate([{ strokeDashoffset: 0.22 }, { strokeDashoffset: -1 }], {
      duration: duration * 1000,
      delay: delay * 1000,
      iterations: Infinity,
      easing: "cubic-bezier(0.45, 0, 0.25, 1)",
      fill: "backwards",
    });
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? anim.play() : anim.pause()));
    io.observe(container);
    return () => {
      io.disconnect();
      anim.cancel();
    };
  }, [containerRef, geometry.d, duration, delay]);

  return (
    <svg
      aria-hidden="true"
      fill="none"
      width={geometry.width}
      height={geometry.height}
      viewBox={`0 0 ${geometry.width} ${geometry.height}`}
      className={`pointer-events-none absolute top-0 left-0 ${className}`}
    >
      <path d={geometry.d} stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.5" strokeLinecap="round" />
      <path
        ref={pulseRef}
        d={geometry.d}
        pathLength={1}
        stroke="var(--color-gold)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="0.22 1.22"
        strokeDashoffset="0.22"
      />
    </svg>
  );
}
