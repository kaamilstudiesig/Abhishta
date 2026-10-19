import { IconCheck } from "@/components/icons";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";
import { BOOKING_URL } from "@/lib/site";
import { Pillows, TourFrame, TourHint } from "./RoomParts";
import { COTTAGE_NAMES, COTTAGE_PILLOWS, COTTAGE_TOUR } from "./rooms";

// Stayflexi's cottage amenities, plus the sit-out from the official site.
const FACTS = ["Private washroom", "Hot water", "Air-conditioning", "Kettle and wardrobe", "Toiletries", "Private sit-out"];

const names = `${COTTAGE_NAMES.slice(0, -1).join(", ")} and ${COTTAGE_NAMES.at(-1)}`;

/**
 * #cottages — one screen: the live 360° view of a cottage (the tour has
 * Mayura's room) beside what every cottage has. The four names are said once,
 * in the lead; they aren't navigation. Phones: heading, view, facts.
 */
export function Cottages() {
  return (
    <section id="cottages" data-nav="light" data-snap="" className={`bg-paper-deep ${screen}`}>
      <div
        className={`${container} grid gap-y-s21 lg:grid-cols-[1.618fr_1fr] lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-s89 lg:gap-y-0 lg:[grid-template-areas:'frame_.'_'frame_header'_'frame_details'_'frame_.']`}
      >
        <SectionHeader
          className="lg:[grid-area:header]"
          title="The cottages"
          lead={`Four cottages named for Krishna’s story: ${names}.`}
          leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
        />

        <div className="min-w-0 lg:[grid-area:frame]">
          <TourFrame
            tour={COTTAGE_TOUR}
            title="360° view inside Mayura cottage"
            tone="light"
            className="h-[max(284px,36svh)] sm:h-[clamp(350px,36svh,460px)] lg:h-[clamp(360px,calc(100svh-280px),580px)]"
          />
          <TourHint
            tour={COTTAGE_TOUR}
            tone="light"
            lead="This is Mayura. Press start, then drag to look around."
            className="mt-s13 short:hidden"
          />
        </div>

        <div className="lg:mt-s34 lg:[grid-area:details]">
          <p className="flex flex-wrap items-center gap-x-s13 gap-y-[4px] text-forest">
            <Pillows {...COTTAGE_PILLOWS} className="text-farm" />
            <span>
              <span className="font-medium">Sleeps up to 5</span>
              <span className="text-ink-muted">, beds for 4 and an extra bed</span>
            </span>
          </p>
          <ul className="mt-s13 grid grid-cols-2 gap-x-s21 gap-y-[6px] text-[15px] leading-[1.4] sm:max-w-[30em]">
            {FACTS.map((f) => (
              <li key={f} className="flex items-start gap-s8">
                <IconCheck size={18} className="mt-[1px] shrink-0 text-farm" />
                {f}
              </li>
            ))}
          </ul>
          {/* short phones lean on the floating "Book a stay" button instead */}
          <div className="mt-s21 flex flex-wrap items-center gap-x-s21 gap-y-s8 lg:mt-s34 short:hidden">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
              Book a cottage
            </a>
            <span className="text-[14px] text-ink-muted">Rates for each meal plan are on the booking page.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
