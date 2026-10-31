import { IconCow } from "@/components/icons";
import { SectionHeader, container, screen } from "@/components/ui";
import { BREEDS } from "@/components/sections/living-farm/farm";

/**
 * #breeds — the six breeds of the gaushaale, each with the 360° tour's own
 * note on it. Hallikar, the breed from this part of Karnataka, is marked.
 * Phones: a two-column grid.
 */
export function Breeds() {
  return (
    <section
      id="breeds"
      data-nav="light"
      data-snap=""
      className={`bg-paper ${screen}`}
    >
      <div className={container}>
        <SectionHeader
          title="Six breeds in our gaushaale"
          lead="From tiny Punganur Gidda to Karnataka’s own Hallikar."
          leadClassName="max-sm:mt-s8 max-sm:text-[15px] max-sm:leading-[1.5] short:hidden"
        />
        <ul className="mt-s13 grid grid-cols-2 gap-s8 sm:mt-s21 sm:gap-s13 md:mt-s34 lg:grid-cols-3 lg:gap-s21 squat:mt-s21 squat:gap-s13">
          {BREEDS.map((b) => {
            const local = b.name === "Hallikar";
            return (
              <li
                key={b.name}
                className={`rounded-card p-s13 ring-1 sm:p-s21 lg:p-s34 squat:p-s13 ${local ? "bg-forest text-paper ring-forest" : "bg-card ring-line"}`}
              >
                <IconCow
                  size={26}
                  className={`max-sm:hidden squat:hidden ${local ? "text-gold" : "text-farm"}`}
                />
                <h3
                  className={`font-display sm:mt-s8 squat:mt-0 text-[clamp(19px,2vw,28px)] leading-[1.15] ${local ? "text-paper" : "text-forest"}`}
                >
                  {b.name}
                </h3>
                <p
                  className={`mt-[4px] text-[13px] leading-[1.4] sm:text-[15px] sm:leading-[1.45] ${local ? "text-paper/80" : "text-ink-muted"}`}
                >
                  {b.note}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
