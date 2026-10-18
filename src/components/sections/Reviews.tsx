import { CircularGallery } from "@/components/bits/CircularGallery";
import { IconStar } from "@/components/icons";
import { SectionHeader, container, screen } from "@/components/ui";
import { REVIEW_URL } from "@/lib/site";

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

function Stars({ className = "" }: { className?: string }) {
  return (
    <span role="img" aria-label="5 out of 5 stars" className={`inline-flex gap-[2px] text-gold ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <IconStar key={i} size={18} fill="currentColor" />
      ))}
    </span>
  );
}

/** Reviews — the Google rating and a bending CircularGallery of review cards (drag, arrows or ←/→). */
export function Reviews() {
  return (
    <section id="reviews" data-nav="light" data-snap="" className={`overflow-hidden bg-paper ${screen}`}>
      <div className={`${container} grid gap-s34 md:grid-cols-[1.618fr_1fr] md:items-end`}>
        <SectionHeader
          title="Families, teams and old friends, in their words"
        />
        <div className="flex items-center gap-s21 md:justify-self-end">
          <span className="font-display text-h1 leading-none text-forest">5.0</span>
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

      <CircularGallery label="Google reviews" className="mt-s34">
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
    </section>
  );
}
