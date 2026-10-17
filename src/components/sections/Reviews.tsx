import { IconStar } from "@/components/icons";
import { SectionHeader, container, sectionPad } from "@/components/ui";
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

/** Reviews — the Google rating and the guests' review cards in a steady grid (swipeable row on phones). */
export function Reviews() {
  return (
    <section id="reviews" data-nav="light" data-snap="" className={`overflow-hidden bg-paper ${sectionPad}`}>
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

      <div className={`${container} mt-s55`}>
        <ul className="-mx-s21 flex snap-x snap-mandatory gap-s21 overflow-x-auto px-s21 pb-s13 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {REVIEWS.map((r) => (
            <li key={r.name} className="w-[82%] shrink-0 snap-start sm:w-auto">
              <figure className="flex h-full flex-col rounded-card bg-card p-s34 shadow-card ring-1 ring-line">
                <Stars />
                <blockquote className="mt-s21 flex-1 font-display text-h3 leading-[1.4] font-light text-ink italic">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-s21 border-t border-line pt-s13">
                  <span className="block font-medium text-forest">{r.name}</span>
                  <span className="flex items-center justify-between gap-s13 text-[13px] text-ink-muted">
                    Google review
                    <a
                      href={REVIEW_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-gold font-medium text-farm"
                    >
                      Read on Google
                    </a>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}
