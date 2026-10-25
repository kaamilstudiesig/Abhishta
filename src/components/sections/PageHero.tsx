"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/components/bits/SplitText";
import { IconArrow } from "@/components/icons";
import { container } from "@/components/ui";
import { glass } from "@/components/bits/glass";
import { GlassFill } from "@/components/bits/LiquidGlass";

gsap.registerPlugin(ScrollTrigger);

type PageHeroProps = {
  image: StaticImageData;
  alt: string;
  /** Tailwind object-position class that keeps the photo's subject in view */
  imagePosition?: string;
  /** the title in two lines, which drift toward each other as you scroll away */
  lines: [string, string];
  lead: string;
  cta: { label: string; href: string; external?: boolean };
  /** glass pills that jump down the page */
  jumps: { label: string; href: string }[];
};

/**
 * The hero for inner pages — a client photo full screen under the site's flat
 * shade, the title in two offset lines that drift toward each other as you
 * scroll away (as the homepage's do), one line, one CTA, and clear glass pills
 * that jump down the page. Content sits low so the photo's subject stays in view,
 * clear of the floating buttons; the title scales with the screen's height too,
 * so on short laptop screens the block rises into the space under the navbar.
 */
export function PageHero({
  image,
  alt,
  imagePosition = "object-center",
  lines,
  lead,
  cta,
  jumps,
}: PageHeroProps) {
  // As you scroll away, the first line drifts right and the second left (scrubbed, so it reverses on the way back).
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (
      !section ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const [first, second] =
      section.querySelectorAll<HTMLElement>("[data-hero-line]");
    const ctx = gsap.context(() => {
      const shift = () =>
        (window.innerWidth < 768 ? 0.08 : 0.11) * window.innerWidth;
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        })
        .to(first, { x: () => shift(), ease: "none" }, 0)
        .to(second, { x: () => -shift(), ease: "none" }, 0);
    }, section);
    return () => ctx.revert();
  }, []);

  const external = cta.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <section
      ref={sectionRef}
      id="top"
      data-nav="dark"
      data-snap=""
      className="on-dark relative isolate flex h-svh min-h-[600px] flex-col overflow-hidden bg-forest text-paper"
    >
      <Image
        src={image}
        alt={alt}
        fill
        preload
        sizes="100vw"
        placeholder="blur"
        className={`-z-10 object-cover ${imagePosition}`}
      />
      {/* one flat shade for legibility, as on the homepage hero (Meadow tunes its strength) */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/30" />
      {/* a span, so Meadow's #top > div shade rule leaves this low wash alone */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 block h-[55%] bg-[linear-gradient(to_top,rgb(0_0_0/0.35),transparent)]"
      />

      <div
        className={`${container} flex flex-1 flex-col justify-end pt-[96px] pb-[104px] md:pb-[96px]`}
      >
        <h1 className="hero-display text-[clamp(48px,min(9.2vw,14svh),148px)] leading-[0.95] squat:text-[clamp(48px,min(9.2vw,12svh),148px)]">
          <span data-hero-line="" className="block will-change-transform">
            <SplitText
              as="span"
              trigger="load"
              by="lines"
              text={lines[0]}
              className="block"
            />
          </span>
          <span
            data-hero-line=""
            className="block text-right will-change-transform md:pr-[4vw]"
          >
            <SplitText
              as="span"
              trigger="load"
              by="lines"
              delay={0.15}
              text={lines[1]}
              className="block"
            />
          </span>
        </h1>
        <p
          data-load-rise=""
          className="mt-s21 max-w-[25em] text-[clamp(17px,1.5vw,21px)] leading-[1.4] font-medium text-paper/90 md:mt-s34 squat:mt-s21"
        >
          {lead}
        </p>
        <div
          data-load-rise=""
          style={{ "--rise-delay": "0.55s" } as CSSProperties}
          className="mt-s21 flex md:mt-s34 squat:mt-s21"
        >
          <a
            href={cta.href}
            {...external}
            className="group inline-flex items-stretch gap-[6px] text-[15px] font-medium text-forest"
          >
            <span className="grid min-h-[48px] place-items-center rounded-btn bg-paper px-s21 transition-colors duration-300 group-hover:bg-gold-soft">
              {cta.label}
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
          className="mt-s34 border-t border-paper/20 pt-s21 md:mt-s55 squat:mt-s34 squat:pt-s13"
        >
          {/* phones: one swipeable line, clear of the floating buttons */}
          <ul className="-mx-s21 flex gap-s8 overflow-x-auto px-s21 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            {jumps.map((j) => (
              <li key={j.href} className="shrink-0">
                <a href={j.href} className="group block rounded-full">
                  <span
                    className={`relative flex min-h-[44px] items-center rounded-full px-s21 text-[15px] font-medium text-paper transition-[background-color] duration-300 group-hover:bg-white/20 ${glass("dark")}`}
                  >
                    <GlassFill />
                    {j.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
