import { SectionHeader, container, screen } from "@/components/ui";
import { RATES } from "./rooms";

/**
 * Where a cottage and a family room actually differ, from the client's rate
 * sheet (2026-10-20): capacity, bathrooms, AC and the nightly rate. The cottage's
 * own washroom with hot water and its sit-out are from Stayflexi and the old
 * site. What every stay includes is in the lead.
 */
const ROWS = [
  { label: "Sleeps", cottage: "3 or 4", group: "10, or 5 in Kaustubha" },
  { label: "Bathroom", cottage: "Your own, with hot water", group: "Two in the room (one in Kaustubha)" },
  { label: "Cooling", cottage: "Air-conditioned", group: "Fans, no AC" },
  { label: "A night", cottage: `${RATES.cottageAdult} an adult, ${RATES.cottageChild} a child over 5`, group: `${RATES.familyRoom} a person, taxes included` },
];

/** Nature's comforts — one screen: a quiet comparison of the two kinds of room. */
export function Comforts() {
  return (
    <section id="comforts" data-nav="light" data-snap="" className={`bg-paper-deep ${screen}`}>
      <div className={`${container} grid gap-s34 lg:grid-cols-[1fr_1.618fr] lg:items-center lg:gap-s89`}>
        <SectionHeader
          title="Nature’s comforts"
          lead="Every stay includes all four meals, the pool, the farm activities, Wi-Fi and parking. This is where the rooms differ."
          leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
        />
        <table className="w-full table-fixed border-collapse text-left text-[15px] leading-[1.45] sm:text-body sm:leading-[1.5]">
          <caption className="sr-only">What a cottage has compared with a family room</caption>
          <colgroup>
            <col className="w-[26%] sm:w-[22%]" />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr className="border-b border-forest/30">
              <td />
              <th scope="col" className="pr-s13 pb-s13 font-display text-[clamp(20px,2vw,28px)] leading-[1.15] font-normal text-forest">
                Cottage
              </th>
              <th scope="col" className="pb-s13 font-display text-[clamp(20px,2vw,28px)] leading-[1.15] font-normal text-forest">
                Family room
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.label} className="border-b border-line align-top">
                <th scope="row" className="py-s13 pr-s13 text-[14px] font-normal text-ink-muted sm:text-[15px]">
                  {r.label}
                </th>
                <td className="py-s13 pr-s13 text-ink">{r.cottage}</td>
                <td className="py-s13 text-ink">{r.group}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
