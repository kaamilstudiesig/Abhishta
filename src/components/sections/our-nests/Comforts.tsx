import { SectionHeader, container, screen } from "@/components/ui";

/**
 * Where a cottage and a Nandagokula room actually differ. Sources: Stayflexi's
 * amenity lists (cottage: private bathroom, kettle, wardrobe; dormitory: shared
 * bathroom, shower, bottled water), the 360° tour (each dorm's washroom is inside
 * the room) and the official site (private sit-outs). What both have is in the lead.
 */
const ROWS = [
  { label: "Sleeps", cottage: "Up to 5", group: "10 in a dormitory, 3–4 in the triple" },
  { label: "Washroom", cottage: "Your own, with hot water", group: "Inside the room, shared by your group, with a shower" },
  { label: "In the room", cottage: "Electric kettle and a wardrobe", group: "Bottled water" },
  { label: "Outside", cottage: "A private sit-out", group: "A shared veranda" },
];

/** Nature's comforts — one screen: a quiet comparison of the two kinds of room. */
export function Comforts() {
  return (
    <section id="comforts" data-nav="light" data-snap="" className={`bg-paper ${screen}`}>
      <div className={`${container} grid gap-s34 lg:grid-cols-[1fr_1.618fr] lg:items-center lg:gap-s89`}>
        <SectionHeader
          title="Nature’s comforts"
          lead="Every room has air-conditioning, fans and toiletries. This is where they differ."
          leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5]"
        />
        <table className="w-full table-fixed border-collapse text-left text-[15px] leading-[1.45] sm:text-body sm:leading-[1.5]">
          <caption className="sr-only">What a cottage has compared with a Nandagokula room</caption>
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
                Nandagokula
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
