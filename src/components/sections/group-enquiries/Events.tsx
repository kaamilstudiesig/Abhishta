"use client";

import Image from "next/image";
import { FlowingMenu, type FlowingMenuItem } from "@/components/bits/FlowingMenu";
import { SectionHeader, container, screen } from "@/components/ui";
import { OCCASIONS, SELECT_OCCASION } from "./groups";

const FACTS = [
  "Up to 100 guests for a gathering",
  "A stage with music and lighting, and a projector",
  "Separate vegetarian and non-vegetarian kitchens, menus made for you",
  "Themed décor, an events team and ample parking",
];

const ITEMS: FlowingMenuItem[] = OCCASIONS.map((o) => ({
  label: o.name,
  detail: o.detail,
  href: "#group-quote",
  onSelect: () => window.dispatchEvent(new CustomEvent<string>(SELECT_OCCASION, { detail: o.name })),
  preview: { src: o.photo, alt: `A sample ${o.name.toLowerCase()} setup on the farm's lawns` },
  action: "Plan this",
  chip: (
    <span className="relative block h-[clamp(40px,4.4vw,56px)] aspect-[2.2/1] overflow-hidden rounded-full">
      <Image src={o.photo} alt="" fill sizes="130px" className="object-cover" />
    </span>
  ),
}));

/**
 * #events — celebrations and retreats, on the forest band: the six occasions
 * the farm hosts as a FlowingMenu (React Bits) — hover one and a paper band
 * flows past with its line and a photo of a sample setup on the farm's own
 * lawns (AI-added decor, labelled as such). Picking one fills in the quote form
 * below and goes there. Beside it, what comes with an event.
 */
export function Events() {
  return (
    <section id="events" data-nav="dark" data-snap="" className={`on-dark overflow-hidden bg-forest text-paper ${screen}`}>
      <div className={`${container} grid grid-cols-[minmax(0,1fr)] gap-s21 short:gap-s13 lg:grid-cols-[1fr_1.5fr] lg:items-center lg:gap-s89`}>
        <div className="min-w-0">
          <SectionHeader
            tone="dark"
            title="Parties and celebrations"
            lead="Celebrate with family and friends on open lawns, with food from our kitchen. Pick an occasion to plan it."
            leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5] short:hidden"
          />
          <ul className="mt-s21 grid gap-[6px] text-[14px] leading-[1.45] text-paper/80 max-lg:hidden sm:text-[15px] lg:mt-s34 squat:mt-s21">
            {FACTS.map((f) => (
              <li key={f} className="flex gap-s13">
                <span aria-hidden="true" className="mt-[0.6em] h-[2px] w-s13 shrink-0 bg-gold" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <FlowingMenu items={ITEMS} tone="dark" label="Occasions the farm hosts" />
          <p className="mt-s8 text-[13px] text-paper/55 short:hidden">Photos show sample setups on our lawns.</p>
        </div>

        {/* phones and tablets: the essentials in one line under the list */}
        <p className="text-[14px] leading-[1.5] text-paper/75 lg:hidden">
          Up to 100 guests, a stage with music and lighting, and separate veg and non-veg kitchens.<span className="hidden short:inline"> Photos show sample setups.</span>
        </p>
      </div>
    </section>
  );
}
