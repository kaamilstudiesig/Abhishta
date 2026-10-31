import Link from "next/link";
import { TourViewer } from "@/components/TourViewer";
import { IconArrow } from "@/components/icons";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";
import { BREEDS, COW_VIEWS, GAU_SEVA_ENQUIRY } from "./farm";

/**
 * #gau-seva — the short version on The living farm (the full story is its own
 * page, /gau-seva): one live 360° of the gaushaale beside the six breed names,
 * a line on gau seva, and two buttons: the Gau seva page, and an enquiry.
 * Phones: the view on top.
 */
export function GauSevaTeaser() {
  return (
    <section
      id="gau-seva"
      data-nav="light"
      data-snap=""
      className={`bg-gold-soft ${screen}`}
    >
      <div
        className={`${container} grid gap-s21 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-s89`}
      >
        <TourViewer
          tour={COW_VIEWS[0].tour}
          title={COW_VIEWS[0].title}
          caption={COW_VIEWS[0].name}
          tone="light"
          className="h-[clamp(150px,24svh,300px)] sm:h-[38svh] lg:h-[clamp(320px,calc(100svh-320px),520px)]"
        />
        <div>
          <SectionHeader
            title="Spend time with our cows"
            lead="Six breeds of cow live in our gaushaale. Feed them, sit with them at 4 pm on a day outing, or join a Gau Pooja or Gau Aarti."
            leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
          />
          <p className="mt-s13 text-[14px] leading-[1.6] text-ink-muted sm:text-[15px] lg:mt-s21">
            {BREEDS.map((b) => b.name).join(" · ")}
          </p>
          <div className="mt-s21 flex flex-wrap gap-s13 lg:mt-s34 squat:mt-s21">
            <Link href="/gau-seva" className={buttonClass("primary")}>
              See gau seva
              <IconArrow size={18} aria-hidden="true" />
            </Link>
            <a
              href={GAU_SEVA_ENQUIRY}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("secondary")}
            >
              Ask about gau seva
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
