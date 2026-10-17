import Link from "next/link";
import { Logo } from "@/components/Logo";
import { buttonClass } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center bg-paper px-s21 text-center">
      <div className="max-w-[30em]">
        <Logo className="mx-auto" />
        <h1 className="mt-s34 font-display text-h1 font-light text-forest">This page is still being planted</h1>
        <p className="mt-s13 text-ink-muted">
          We&apos;re building the rest of the site. Everything you need to plan a stay is on the home page for now.
        </p>
        <Link href="/" className={buttonClass("primary", "mt-s34")}>
          Back to the farm
        </Link>
      </div>
    </main>
  );
}
