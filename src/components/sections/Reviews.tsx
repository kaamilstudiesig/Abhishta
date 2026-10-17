import Image, { type StaticImageData } from "next/image";
import cows from "../../../assets/images/slider/slider-8.jpg";
import feeding from "../../../assets/images/slider/slider-2.jpg";
import beds from "../../../assets/images/unlock-section/4.webp";
import mangoes from "../../../assets/images/slider/slider-3.jpg";
import { CircularGallery } from "@/components/bits/CircularGallery";
import { IconInstagram, IconPlay, IconStar } from "@/components/icons";
import { SectionHeader, container, sectionPad } from "@/components/ui";
import { REEL_URLS, REVIEW_URL, SOCIALS } from "@/lib/site";

// Excerpts as they appear on the farm's Google reviews widget.
const REVIEWS = [
  {
    name: "Kalappa Kuppanda",
    text: "We had corporate team outing and all of us had an unforgettable experience at Abhishta Agri Farm Stay…",
  },
  {
    name: "Madhurya S",
    text: "I recently had the pleasure of staying at Abhista Farm Stay and it was truly an unforgettable experience…",
  },
  {
    name: "Nithya A",
    text: "We had an amazing stay at the farmhouse. My kids thoroughly enjoyed playing with and feeding the cows, goats, rabbits…",
  },
  { name: "Prashanth K", text: "A perfect family getaway!" },
];

const REEL_STILLS: { image: StaticImageData; alt: string }[] = [
  { image: cows, alt: "Bulls feeding at the trough in the cow shed" },
  { image: feeding, alt: "A guest feeding cows by hand" },
  { image: beds, alt: "Terracotta-edged vegetable beds under coconut palms" },
  { image: mangoes, alt: "Mango trees in the orchard" },
];

const instagram = SOCIALS.find((s) => s.name === "Instagram")!.href;

function Stars({ className = "" }: { className?: string }) {
  return (
    <span role="img" aria-label="5 out of 5 stars" className={`inline-flex gap-[2px] text-gold ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <IconStar key={i} size={18} fill="currentColor" />
      ))}
    </span>
  );
}

/** Reviews — Google rating, a bending gallery of review cards, and a vertical Reels strip. */
export function Reviews() {
  return (
    <section id="reviews" data-nav="light" className={`overflow-hidden bg-paper ${sectionPad}`}>
      <div className={`${container} grid gap-s34 md:grid-cols-[1.618fr_1fr] md:items-end`}>
        <SectionHeader
          eyebrow="Guest notes"
          title="Families, teams and old friends, in their words"
          lead="Rated 5.0 on Google by the people who have stayed, played and eaten here."
        />
        <div className="flex items-center gap-s21 md:justify-self-end">
          <span className="font-display text-[72px] leading-none font-light text-forest">5.0</span>
          <span className="grid gap-[5px]">
            <Stars />
            <span className="text-[15px] text-ink-muted">Google reviews</span>
            <a
              href={REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-gold w-fit text-[15px] font-medium text-forest"
            >
              Leave a review
            </a>
          </span>
        </div>
      </div>

      <CircularGallery label="Google reviews" className="mt-s55">
        {REVIEWS.map((r) => (
          <figure key={r.name} className="flex h-[300px] flex-col rounded-card bg-card p-s34 shadow-card ring-1 ring-line">
            <Stars />
            <blockquote className="mt-s21 flex-1 font-display text-h3 leading-[1.35] font-light text-ink italic">
              “{r.text}”
            </blockquote>
            <figcaption className="mt-s21 flex items-end justify-between gap-s13 border-t border-line pt-s13">
              <span>
                <span className="block font-medium text-forest">{r.name}</span>
                <span className="block text-[13px] text-ink-muted">Google review</span>
              </span>
              <a
                href={REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-gold text-[13px] font-medium text-farm"
              >
                Read on Google
              </a>
            </figcaption>
          </figure>
        ))}
      </CircularGallery>

      <div className={`${container} mt-s89`}>
        <div className="flex flex-wrap items-end justify-between gap-s13">
          <h3 className="font-display text-h2 text-forest">Recent reels from the farm</h3>
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="link-gold inline-flex items-center gap-s8 text-[15px] font-medium text-forest"
          >
            <IconInstagram size={20} className="text-farm" />
            Follow on Instagram
          </a>
        </div>
        <ul className="mt-s34 grid grid-cols-2 gap-s13 md:grid-cols-4 md:gap-s21">
          {REEL_STILLS.map((still, i) => {
            const reel = REEL_URLS[i];
            return (
              <li key={i} className="relative aspect-[9/16] overflow-hidden rounded-card bg-paper-deep shadow-card">
                {reel ? (
                  <iframe
                    src={`${reel.replace(/\/$/, "")}/embed`}
                    title={`Instagram reel ${i + 1} from Abhishta`}
                    loading="lazy"
                    className="absolute inset-0 size-full"
                  />
                ) : (
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="group block size-full">
                    <Image
                      src={still.image}
                      alt={still.alt}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      placeholder="blur"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-earth)] group-hover:scale-[1.04]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,59,36,0.6),transparent_45%)]"
                    />
                    <span className="absolute bottom-s13 left-s13 grid size-[44px] place-items-center rounded-full bg-paper/90 text-farm">
                      <IconPlay size={20} />
                      <span className="sr-only">Watch on Instagram</span>
                    </span>
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
