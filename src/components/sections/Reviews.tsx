import { StackCarousel } from "@/components/bits/StackCarousel";
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

/** The farm's Google rating (verified 2026-10-31). */
const RATING = 4.8;
const REVIEW_COUNT = 395;

/** Five stars filled to `value` — the last one partly, so 4.8 reads as 4.8, not 5. */
function Stars({ value = 5, size = 18, className = "" }: { value?: number; size?: number; className?: string }) {
  return (
    <span role="img" aria-label={`${value} out of 5 stars`} className={`inline-flex gap-[2px] ${className}`}>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <IconStar size={size} className="absolute inset-0 text-gold/45" />
            <span className="absolute inset-y-0 left-0 overflow-hidden text-gold" style={{ width: `${fill * 100}%` }}>
              <IconStar size={size} fill="currentColor" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

/** Reviews — the Google rating and the reviews as a calm stacked deck (StackCarousel): one in front, the next two peeking beneath; Next lifts the front one away. */
export function Reviews() {
  return (
    <section id="reviews" data-nav="light" data-snap="" className={`overflow-hidden bg-paper ${screen}`}>
      <div className={`${container} grid gap-s21 md:grid-cols-[1.618fr_1fr] md:items-end md:gap-s34`}>
        <SectionHeader
          title="What our guests say"
          className="md:max-w-[38em]"
        />
        <div className="flex items-center gap-s13 md:justify-self-end md:gap-s21">
          <span className="font-display text-[34px] leading-none text-forest md:text-h1">{RATING.toFixed(1)}</span>
          <span className="flex flex-wrap items-center gap-x-s13 gap-y-[5px] md:grid md:gap-[5px]">
            <Stars value={RATING} size={20} />
            <span className="text-[15px] text-ink-muted">{REVIEW_COUNT} Google reviews</span>
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

      <StackCarousel
        label="Google reviews"
        itemLabel="review"
        className={`${container} mt-s21 sm:mt-s34 squat:mt-s21`}
        stageClassName="max-w-[640px] h-[304px] sm:h-[336px] squat:h-[268px]"
      >
        {REVIEWS.map((r) => (
          <figure key={r.name} className="flex h-[268px] flex-col rounded-card bg-card p-s21 sm:h-[300px] shadow-card ring-1 ring-line sm:p-s34 squat:h-[232px] squat:p-s21">
            <Stars />
            <blockquote className="mt-s13 flex-1 font-display text-[20px] leading-[1.4] font-light text-ink italic sm:mt-s21 sm:text-h3 sm:leading-[1.35] squat:mt-s13 squat:text-[20px] squat:leading-[1.4]">
              “{r.text}”
            </blockquote>
            <figcaption className="mt-s21 squat:mt-s13 flex flex-wrap items-end justify-between gap-x-s13 gap-y-[2px] border-t border-line pt-s13">
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
      </StackCarousel>
    </section>
  );
}
