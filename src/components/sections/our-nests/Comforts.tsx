import { IconCheck } from "@/components/icons";
import { SectionHeader, container } from "@/components/ui";

// Only what's confirmed (Stayflexi's amenity lists + the 360° tour), per docs/wireframes/our-nests.md.
const LISTS = [
  {
    title: "Cottages",
    items: [
      "Own washroom with hot water",
      "Daily housekeeping",
      "Wardrobe, kettle and toiletries",
      "A private sit-out",
      "Air-conditioning and fans",
    ],
  },
  {
    title: "Nandagokula",
    items: [
      "Own washroom with a shower",
      "Bottled water",
      "Toiletries",
      "Shared lawns and nature walks",
      "Air-conditioning and fans",
    ],
  },
];

/** Nature's comforts — a quiet two-column checklist: what's in a cottage, what's in a Nandagokula room. */
export function Comforts() {
  return (
    <section id="comforts" data-nav="light" className="bg-paper py-s89 lg:py-s144">
      <div className={`${container} grid gap-s34 lg:grid-cols-[1fr_1.618fr] lg:gap-s89`}>
        <SectionHeader title="Nature’s comforts" lead="Every room is air-conditioned and has its own washroom." />
        <div className="grid gap-s34 sm:grid-cols-2 sm:gap-s55">
          {LISTS.map((list) => (
            <div key={list.title}>
              <h3 className="font-display text-h2 text-forest">{list.title}</h3>
              <ul className="mt-s13 border-t border-line">
                {list.items.map((item) => (
                  <li key={item} className="flex items-start gap-s13 border-b border-line py-s13 leading-[1.5]">
                    <IconCheck size={20} className="mt-[2px] shrink-0 text-farm" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
