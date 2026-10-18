import { useId, type ReactNode } from "react";

/**
 * Brand CircularText — adapted from React Bits. Text set on an SVG circle path
 * that turns slowly like a cartwheel; it eases faster while hovered and stops
 * entirely with reduced motion. Decorative — pair it with a real label.
 */
type CircularTextProps = {
  text: string;
  size?: number;
  className?: string;
  children?: ReactNode;
};

export function CircularText({ text, size = 144, className = "", children }: CircularTextProps) {
  const id = useId();
  const r = size / 2 - 13;
  const circumference = 2 * Math.PI * r;

  return (
    <div aria-hidden="true" className={className}>
      <div className="group/ct relative grid place-items-center" style={{ width: size, height: size }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          className="absolute inset-0 animate-[spin_34s_linear_infinite] group-hover/ct:animate-[spin_21s_linear_infinite] motion-reduce:animate-none"
        >
          <defs>
            <path
              id={id}
              d={`M ${size / 2},${size / 2} m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`}
            />
          </defs>
          <text
            className="fill-current text-[11px] font-bold uppercase"
            style={{ letterSpacing: "0.18em" }}
            textLength={circumference - 8}
            lengthAdjust="spacing"
          >
            <textPath href={`#${id}`}>{text}</textPath>
          </text>
        </svg>
        {children}
      </div>
    </div>
  );
}
