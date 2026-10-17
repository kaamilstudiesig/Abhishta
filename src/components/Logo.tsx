import Image from "next/image";
// assets/logo-current.png with its transparent margin trimmed
import logo from "../../assets/logo-trimmed.png";

/**
 * The farm's own logo (palm + cow mark, "Abhishta Agri Farm Stay").
 * `tone="light"` renders it as a single paper-white silhouette for dark bands.
 */
export function Logo({ className = "", tone = "color" }: { className?: string; tone?: "color" | "light" }) {
  return (
    <Image
      src={logo}
      alt="Abhishta Agri Farm Stay"
      preload
      className={`h-[44px] w-auto sm:h-[52px] ${tone === "light" ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}
