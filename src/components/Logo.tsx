import Image from "next/image";
// the farm's new logo (client, 2026-11-13; source: assets/brand/Abhishta Agri Farm Stay Logo.png), trimmed, as WebP
import logo from "@/assets/brand/logo.webp";

/**
 * The farm's own logo: the house, sun and cows over "Abhishta Agri / Farm Stay".
 * It's a full-colour illustration, so on dark bands put it on a light backing rather than whitening it.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt="Abhishta Agri Farm Stay"
      preload
      sizes="128px"
      className={`h-[44px] w-auto sm:h-[52px] ${className}`}
    />
  );
}
