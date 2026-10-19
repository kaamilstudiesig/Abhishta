import { SectionHeader, buttonClass, container, screen } from "@/components/ui";
import { BOOKING_URL, CONTACT } from "@/lib/site";
import { DAY_OUTING, DAY_OUTING_ENQUIRY } from "./farm";

/**
 * #plan-your-visit — the two ways in, side by side: a day outing (its schedule,
 * from the official site, and a WhatsApp enquiry) or a stay (Our nests and the
 * Stayflexi booking engine), with email and phone underneath. Phones: a swipe
 * row of the two cards.
 */
export function PlanVisit() {
  return (
    <section id="plan-your-visit" data-nav="light" data-snap="" className={`bg-paper ${screen}`}>
      <div className={container}>
        <SectionHeader title="Come for the day, or stay the night" className="lg:max-w-none" />

        <ul className="-mx-s21 mt-s21 flex items-start snap-x snap-mandatory gap-s13 overflow-x-auto scroll-px-s21 px-s21 pb-s8 [scrollbar-width:none] sm:-mx-s34 sm:scroll-px-s34 sm:px-s34 md:mt-s34 lg:mx-0 lg:grid lg:grid-cols-[1.35fr_1fr] lg:items-stretch squat:mt-s21 lg:gap-s21 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          <li className="flex w-[88%] shrink-0 snap-start flex-col rounded-card bg-card p-s21 ring-1 ring-line sm:w-[62%] sm:p-s34 lg:w-auto squat:p-s21">
            <h3 className="font-display text-[clamp(22px,2vw,28px)] leading-[1.15] text-forest">A day outing</h3>
            <p className="mt-[4px] text-[15px] text-ink-muted short:hidden">8 am to 6 pm, with breakfast, lunch and high tea.</p>
            <ol className="mt-s13 grid gap-x-s34 gap-y-[3px] text-[14px] leading-[1.45] sm:text-[15px] lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-[repeat(5,auto)]">
              {DAY_OUTING.map((d) => (
                <li key={d.time} className={`flex gap-s13 ${d.what === "Cow cuddling" ? "font-medium text-forest" : "text-ink"}`}>
                  <span className="w-[3.2em] shrink-0 text-ink-muted tabular-nums">{d.time}</span>
                  {d.what}
                </li>
              ))}
            </ol>
            <div className="mt-auto pt-s21 squat:pt-s13">
              <a href={DAY_OUTING_ENQUIRY} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
                Plan a day outing
              </a>
            </div>
          </li>

          <li className="flex w-[88%] shrink-0 snap-start flex-col rounded-card bg-forest p-s21 text-paper sm:w-[62%] sm:p-s34 lg:w-auto squat:p-s21 on-dark">
            <h3 className="font-display text-[clamp(22px,2vw,28px)] leading-[1.15] text-paper">A night or two</h3>
            <p className="mt-[4px] text-[15px] leading-[1.5] text-paper/80">Wake up on the farm, with the animals a short walk away.</p>
            <ul className="mt-s13 grid gap-[5px] text-[14px] leading-[1.45] text-paper/90 sm:text-[15px]">
              <li>Four cottages, each for up to 5</li>
              <li>Nandagokula rooms for 3 to 10, each booked whole</li>
              <li>Room only, breakfast and dinner, or all meals</li>
              <li className="text-paper/70">Check-in 2 pm, check-out 1 pm</li>
            </ul>
            <div className="mt-auto flex flex-wrap gap-s13 pt-s21 squat:pt-s13">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={buttonClass("gold")}>
                Check availability
              </a>
              <a href="/our-nests" className={buttonClass("ghost-light")}>
                See our nests
              </a>
            </div>
          </li>
        </ul>

        <p className="mt-s21 text-[14px] text-ink-muted short:hidden sm:text-[15px] lg:mt-s34 squat:mt-s21">
          Questions first? Write to{" "}
          <a href={CONTACT.email.href} className="link-gold font-medium text-forest">
            {CONTACT.email.label}
          </a>{" "}
          or call{" "}
          <a href={CONTACT.reservation.href} className="link-gold font-medium whitespace-nowrap text-forest">
            {CONTACT.reservation.label}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
