import type { CSSProperties } from "react";
import Image from "next/image";
import veranda from "@public/images/client-photos/stay-cottage-exterior.jpg";
import { SplitText } from "@/components/bits/SplitText";
import { IconArrow } from "@/components/icons";
import { container } from "@/components/ui";
import { BOOKING_URL } from "@/lib/site";

const JUMPS = [
  { label: "Cottages", href: "#cottages" },
  { label: "Nandagokula", href: "#dormitories" },
  { label: "Shared spaces", href: "#shared-spaces" },
  { label: "Plan a stay", href: "#plan-your-stay" },
];

/**
 * Our nests hero — the terracotta veranda full screen under the site's flat
 * shade, the title set as large as the homepage's, one line, one booking CTA,
 * and pills that jump down the page. Content sits low and flush left so the
 * roof and the painted doorway stay in view.
 */
export function NestsHero() {
  return (
    <section
      id="top"
      data-nav="dark"
      data-snap=""
      className="on-dark relative isolate flex h-svh min-h-[600px] flex-col overflow-hidden bg-forest text-paper"
    >
      <Image
        src={veranda}
        alt="The Nandagokula veranda: terracotta walls, a doorway framed in hand-painted folk motifs, a red-oxide floor and a tiled timber roof above the lawn"
        fill
        preload
        sizes="100vw"
        placeholder="blur"
        className="-z-10 object-cover object-[50%_58%]"
      />
      {/* one flat shade for legibility, as on the homepage hero (Meadow tunes its strength) */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/30" />
      {/* a span, so Meadow's #top > div shade rule leaves this low wash alone */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 block h-[55%] bg-[linear-gradient(to_top,rgb(0_0_0/0.35),transparent)]"
      />

      <div className={`${container} flex flex-1 flex-col justify-end pt-[104px] pb-[96px] md:pb-s55`}>
        <h1 className="hero-display text-[clamp(56px,11vw,160px)] leading-[0.95]">
          <SplitText as="span" trigger="load" by="lines" text="Our nests" className="block" />
        </h1>
        <p
          data-load-rise=""
          className="mt-s21 max-w-[25em] text-[clamp(17px,1.5vw,21px)] leading-[1.4] font-medium text-paper/90 md:mt-s34"
        >
          Four cottages and the Nandagokula rooms under tiled roofs, a step from the orchard.
        </p>
        <div data-load-rise="" style={{ "--rise-delay": "0.55s" } as CSSProperties} className="mt-s21 flex md:mt-s34">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-stretch gap-[6px] text-[15px] font-medium text-forest"
          >
            <span className="grid min-h-[48px] place-items-center rounded-btn bg-paper px-s21 transition-colors duration-300 group-hover:bg-gold-soft">
              Check availability
            </span>
            <span
              aria-hidden="true"
              className="grid w-[48px] place-items-center rounded-btn bg-paper transition-[background-color,translate] duration-300 group-hover:translate-x-[3px] group-hover:bg-gold-soft"
            >
              <IconArrow size={18} />
            </span>
          </a>
        </div>

        <nav
          aria-label="On this page"
          data-load-rise=""
          style={{ "--rise-delay": "0.7s" } as CSSProperties}
          className="mt-s34 border-t border-paper/20 pt-s21 md:mt-s55"
        >
          {/* phones: one swipeable line, clear of the floating buttons */}
          <ul className="-mx-s21 flex gap-s8 overflow-x-auto px-s21 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            {JUMPS.map((j) => (
              <li key={j.href} className="shrink-0">
                <a
                  href={j.href}
                  className="inline-flex min-h-[44px] items-center rounded-btn border border-paper/35 px-s21 text-[15px] text-paper backdrop-blur-[2px] transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-forest"
                >
                  {j.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
