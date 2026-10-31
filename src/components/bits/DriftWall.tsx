"use client";

import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import Image, { type StaticImageData } from "next/image";
import { IconClose } from "@/components/icons";

export type DriftWallItem = { src: StaticImageData; alt: string; caption: string };

/**
 * Brand DriftWall — adapted from React Bits (flat: no tilt). Columns of photos
 * drift slowly up and down at slightly different speeds, edge to edge (no
 * fade); the wall leans a little toward the pointer. Hovering (or focusing) a
 * photo stops its column, lifts the photo and shows its caption; clicking opens
 * it large in a dialog. It only moves while on screen, and with reduced motion
 * it holds still.
 *
 * Each column can be grabbed and dragged up or down (mouse or touch); let go
 * and it carries on with the flick, then eases back into its drift. On touch
 * screens a swipe on a column moves the column; the gaps between columns still
 * scroll the page. A drag never counts as a click on a photo.
 */
export function DriftWall({
  items,
  columns = 4,
  speed = 18,
  gap = "gap-s13",
  label,
  className = "",
}: {
  items: DriftWallItem[];
  columns?: number;
  /** px per second */
  speed?: number;
  /** the space between photos (a gap utility) */
  gap?: string;
  label: string;
  className?: string;
}) {
  const wallRef = useRef<HTMLDivElement>(null);
  const tracks = useRef<(HTMLDivElement | null)[]>([]);
  const hovered = useRef(-1);
  const pointer = useRef({ x: 0, y: 0 });
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<DriftWallItem | null>(null);
  // the running wall's state, shared with the drag handlers
  const motion = useRef<{ offsets: number[]; vel: number[] } | null>(null);
  const drag = useRef<{ c: number; id: number; y: number; t: number; fling: number; moved: number } | null>(null);
  const justDragged = useRef(false);

  // deal the photos into columns (each column long enough to fill the wall, starting at a different photo)
  const cols = useMemo(() => {
    const per = Math.max(5, Math.ceil(items.length / columns) + 1);
    return Array.from({ length: columns }, (_, c) => Array.from({ length: per }, (_, k) => items[(c * 2 + k * columns + k) % items.length]));
  }, [items, columns]);

  useEffect(() => {
    const wall = wallRef.current;
    if (!wall) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const offsets = cols.map((_, c) => (c * 137) % 400);
    const speeds = cols.map((_, c) => speed * (1 + 0.35 * Math.sin(c * 2.1)) * (c % 2 ? -1 : 1));
    const vel = cols.map(() => 0);
    motion.current = { offsets, vel };
    const tilt = { x: 0, y: 0 };
    let raf = 0;
    let last = 0;
    let visible = false;

    const frame = (t: number) => {
      const dt = Math.min(0.05, last ? (t - last) / 1000 : 0);
      last = t;
      tilt.x += (pointer.current.x * 5 - tilt.x) * 0.06;
      tilt.y += (-pointer.current.y * 4 - tilt.y) * 0.06;
      wall.style.setProperty("--dw-rx", `${tilt.y.toFixed(2)}deg`);
      wall.style.setProperty("--dw-ry", `${tilt.x.toFixed(2)}deg`);
      tracks.current.forEach((el, c) => {
        if (!el) return;
        const half = el.scrollHeight / 2; // the column is its photos twice over, so it loops seamlessly
        if (drag.current?.c === c) {
          vel[c] = 0; // the finger or mouse moves it (in the handlers below)
        } else {
          const target = reduce || hovered.current === c ? 0 : speeds[c];
          // after a flick, ease off slowly (momentum); otherwise settle quickly
          vel[c] += (target - vel[c]) * (Math.abs(vel[c]) > Math.abs(target) + 40 ? 0.035 : 0.08);
          offsets[c] += vel[c] * dt;
        }
        offsets[c] = ((offsets[c] % half) + half) % half;
        el.style.transform = `translate3d(0, ${-offsets[c].toFixed(1)}px, 0)`;
      });
      raf = visible ? requestAnimationFrame(frame) : 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(wall);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      motion.current = null;
    };
  }, [cols, speed]);

  const onDragStart = (c: number) => (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !e.isPrimary) return;
    drag.current = { c, id: e.pointerId, y: e.clientY, t: e.timeStamp, fling: 0, moved: 0 };
  };
  const onDragMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const m = motion.current;
    if (!d || !m || d.id !== e.pointerId) return;
    const dy = e.clientY - d.y;
    const dt = Math.max(1, e.timeStamp - d.t);
    d.moved += Math.abs(dy);
    // only take over the pointer once it's clearly a drag, so a tap still opens the photo
    if (d.moved > 6 && !e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.setPointerCapture(e.pointerId);
    m.offsets[d.c] -= dy;
    d.fling = d.fling * 0.6 + ((-dy / dt) * 1000) * 0.4;
    d.y = e.clientY;
    d.t = e.timeStamp;
  };
  const onDragEnd = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (d.moved > 6) {
      justDragged.current = true;
      if (motion.current) motion.current.vel[d.c] = Math.max(-2400, Math.min(2400, d.fling));
    }
    drag.current = null;
  };

  const show = (item: DriftWallItem) => {
    setOpen(item);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <div
        ref={wallRef}
        role="group"
        aria-label={label}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          pointer.current = { x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 };
        }}
        onPointerLeave={() => {
          pointer.current = { x: 0, y: 0 };
          hovered.current = -1;
        }}
        className={`relative overflow-hidden [perspective:1400px] ${className}`}
      >
        <div className={`grid h-full ${gap} [transform:rotateX(var(--dw-rx,0deg))_rotateY(var(--dw-ry,0deg))] [transform-style:preserve-3d]`} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {cols.map((col, c) => (
            <div
              key={c}
              className="min-w-0 cursor-grab touch-none select-none active:cursor-grabbing"
              onPointerEnter={() => (hovered.current = c)}
              onPointerDown={onDragStart(c)}
              onPointerMove={onDragMove}
              onPointerUp={onDragEnd}
              onPointerCancel={onDragEnd}
              onClickCapture={(e) => {
                if (!justDragged.current) return;
                justDragged.current = false;
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <div ref={(el) => void (tracks.current[c] = el)} className={`flex flex-col ${gap} will-change-transform`}>
                {[0, 1].map((copy) =>
                  col.map((item, n) => (
                    <button
                      key={`${copy}-${n}`}
                      type="button"
                      tabIndex={copy ? -1 : 0}
                      aria-hidden={copy ? true : undefined}
                      onClick={() => show(item)}
                      onFocus={() => (hovered.current = c)}
                      className={`group relative block w-full cursor-grab overflow-hidden rounded-card bg-line text-left active:cursor-grabbing transition-[transform,box-shadow] duration-500 ease-[var(--ease-earth)] hover:z-10 hover:-translate-y-[4px] hover:scale-[1.03] hover:shadow-float focus-visible:scale-[1.03] ${n % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                    >
                      <Image src={item.src} alt={copy ? "" : item.alt} draggable={false} fill sizes={`(min-width: 1024px) ${Math.round(100 / columns)}vw, 50vw`} placeholder="blur" className="object-cover" />
                      <span className="absolute inset-x-0 bottom-0 translate-y-full bg-[linear-gradient(to_top,rgb(0_0_0/0.65),transparent)] px-s13 pt-s21 pb-s8 text-[13px] font-medium text-paper transition-transform duration-500 ease-[var(--ease-earth)] group-hover:translate-y-0 group-focus-visible:translate-y-0">
                        {item.caption}
                      </span>
                    </button>
                  )),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        aria-label={open?.caption ?? "Photo"}
        className="m-auto max-h-[92svh] w-[min(1100px,94vw)] overflow-hidden rounded-card bg-forest p-0 text-paper shadow-float backdrop:bg-ink/70"
      >
        {open ? (
          <figure className="relative">
            <Image src={open.src} alt={open.alt} sizes="94vw" placeholder="blur" className="block max-h-[82svh] w-full object-contain" />
            <figcaption className="flex items-center justify-between gap-s13 px-s21 py-s13 text-[15px]">
              {open.caption}
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close the photo"
                className="grid size-[44px] place-items-center rounded-full hover:bg-paper/10"
              >
                <IconClose size={20} />
              </button>
            </figcaption>
          </figure>
        ) : null}
      </dialog>
    </>
  );
}
