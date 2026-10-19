"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { CountField, Field, Select, field } from "@/components/forms";
import { IconClose, IconMail, IconPhone, IconWhatsApp } from "@/components/icons";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";
import { BOOKING_URL, CONTACT, WHATSAPP_NUMBER } from "@/lib/site";

const ROOM_CHOICES = [
  "Not sure",
  "Cottage",
  "Family dormitory",
  "Bachelors dormitory",
  "Triple room",
];
const MEAL_PLANS = ["Not decided", "Room only", "Breakfast + dinner", "All meals"];

type Values = {
  name: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  kids: number;
  room: string;
  meals: string;
};

const fromIso = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const pretty = (iso: string) =>
  fromIso(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

function describeDates({ checkIn, checkOut }: Values) {
  if (checkIn && checkOut) {
    const nights = Math.round((fromIso(checkOut).getTime() - fromIso(checkIn).getTime()) / 86_400_000);
    return `${pretty(checkIn)} to ${pretty(checkOut)} (${plural(nights, "night", "nights")})`;
  }
  if (checkIn) return `from ${pretty(checkIn)}`;
  return "flexible";
}

function enquiry(v: Values) {
  return [
    "Hi Abhishta, I'd like to plan a stay.",
    `Name: ${v.name.trim()}`,
    v.phone.trim() ? `Phone: +91 ${v.phone.trim()}` : null,
    `Dates: ${describeDates(v)}`,
    `Guests: ${plural(v.adults, "adult", "adults")}${v.kids ? `, ${plural(v.kids, "kid", "kids")}` : ""}`,
    `Room: ${v.room}`,
    v.meals !== "Not decided" ? `Meals: ${v.meals}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Plan your stay — one light screen, so the forest footer reads as its own
 * band when it's revealed beneath. There's no booking backend: the form writes
 * the enquiry and opens WhatsApp with it, ready to send (email works the same
 * way); live availability and rates stay on Stayflexi. The stay's essentials
 * sit beside it, and Stayflexi's cancellation policy opens in a popover.
 */
export function PlanStay() {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const checkInRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<Values>({
    name: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    adults: 2,
    kids: 0,
    room: "Not sure",
    meals: "Not decided",
  });
  const [errors, setErrors] = useState<{ name?: string; dates?: string }>({});
  const [sent, setSent] = useState(false);

  // no past check-in dates (set after mount: the server doesn't know the guest's today)
  useEffect(() => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    if (checkInRef.current) checkInRef.current.min = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  }, []);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setSent(false);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!values.name.trim()) next.name = "Add your name so we know who’s asking.";
    if (values.checkIn && values.checkOut && values.checkOut <= values.checkIn)
      next.dates = "Pick a check-out after check-in.";
    setErrors(next);
    if (next.name) {
      document.getElementById(id("name"))?.focus();
      return;
    }
    if (next.dates) {
      document.getElementById(id("checkout"))?.focus();
      return;
    }
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(enquiry(values))}`;
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;
    setSent(true);
  };

  const mailto = `${CONTACT.email.href}?subject=${encodeURIComponent("Stay enquiry")}&body=${encodeURIComponent(enquiry(values))}`;

  return (
    <section id="plan-your-stay" data-nav="light" data-snap="" className={`bg-paper ${screen}`}>
      {/* phones: heading → form → essentials; desktop: heading and essentials beside the form */}
      <div
        className={`${container} grid gap-y-s13 sm:gap-y-s21 lg:grid-cols-[1fr_1.618fr] lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-s89 lg:gap-y-0 lg:[grid-template-areas:'._form'_'intro_form'_'fine_form'_'._form']`}
      >
        <div className="lg:[grid-area:intro]">
          <SectionHeader
            title="Plan your stay"
            lead="Tell us your dates and who’s coming. It reaches us on WhatsApp, and we’ll write back with what’s free."
            leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5] short:hidden"
          />
          <ul className="mt-s34 hidden gap-s8 text-[15px] lg:grid">
            <li>
              <a href={mailto} className="tap inline-flex items-center gap-s13 text-forest hover:text-farm">
                <IconMail size={20} className="shrink-0 text-farm" />
                <span>
                  <span className="sr-only">Email instead: </span>
                  {CONTACT.email.label}
                </span>
              </a>
            </li>
            <li>
              <a href={CONTACT.reservation.href} className="tap inline-flex items-center gap-s13 text-forest hover:text-farm">
                <IconPhone size={20} className="shrink-0 text-farm" />
                <span>
                  <span className="sr-only">Call: </span>
                  {CONTACT.reservation.label}
                </span>
              </a>
            </li>
          </ul>
        </div>

        <form
          noValidate
          onSubmit={onSubmit}
          aria-label="Stay enquiry"
          className="grid grid-cols-2 gap-x-s13 gap-y-s13 self-center sm:gap-x-s21 sm:gap-y-s21 lg:rounded-card lg:bg-card lg:p-s34 lg:shadow-card lg:ring-1 lg:ring-line lg:[grid-area:form]"
        >
          <Field label="Name" htmlFor={id("name")} error={errors.name}>
            <input
              id={id("name")}
              name="name"
              type="text"
              autoComplete="name"
              required
              aria-required="true"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? `${id("name")}-error` : undefined}
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              className={field}
            />
          </Field>
          <Field label="Phone" htmlFor={id("phone")}>
            <div className="flex">
              <span
                aria-hidden="true"
                className="grid min-h-[44px] shrink-0 place-items-center rounded-l-[14px] border border-r-0 border-line bg-paper-deep px-[10px] text-[15px] text-ink-muted"
              >
                +91
              </span>
              <input
                id={id("phone")}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                aria-label="Phone number, India (+91)"
                value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={`${field} rounded-l-none`}
              />
            </div>
          </Field>

          <Field label="Check-in" htmlFor={id("checkin")}>
            <input
              ref={checkInRef}
              id={id("checkin")}
              name="check-in"
              type="date"
              autoComplete="off"
              value={values.checkIn}
              onChange={(e) => set("checkIn", e.target.value)}
              className={field}
            />
          </Field>
          <Field label="Check-out" htmlFor={id("checkout")} error={errors.dates}>
            <input
              id={id("checkout")}
              name="check-out"
              type="date"
              autoComplete="off"
              min={values.checkIn || undefined}
              aria-invalid={errors.dates ? true : undefined}
              aria-describedby={errors.dates ? `${id("checkout")}-error` : undefined}
              value={values.checkOut}
              onChange={(e) => set("checkOut", e.target.value)}
              className={field}
            />
          </Field>

          <CountField id={id("adults")} label="Adults" value={values.adults} min={1} max={30} onChange={(n) => set("adults", n)} />
          <CountField id={id("kids")} label="Kids" value={values.kids} min={0} max={30} onChange={(n) => set("kids", n)} />

          <Select id={id("room")} label="Room" value={values.room} options={ROOM_CHOICES} onChange={(v) => set("room", v)} />
          <Select id={id("meals")} label="Meal plan" value={values.meals} options={MEAL_PLANS} onChange={(v) => set("meals", v)} />

          <div className="col-span-2 flex flex-col gap-s8 pt-[4px] sm:flex-row sm:flex-wrap sm:items-center sm:gap-s13">
            <button type="submit" className={buttonClass("primary")}>
              <IconWhatsApp size={20} />
              Send on WhatsApp
            </button>
            {/* phones: this becomes a text link beside the cancellation policy, to keep the form on one screen */}
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary", "max-sm:hidden")}>
              Check availability
            </a>
          </div>
          <p role="status" className="col-span-2 text-[14px] text-ink-muted empty:hidden">
            {sent ? "WhatsApp has opened with your details. Press send there and it reaches us." : ""}
          </p>
        </form>

        <SmallPrint />
      </div>
    </section>
  );
}

const STAY_FACTS = [
  { term: "Check-in", detail: "2 pm" },
  { term: "Check-out", detail: "1 pm" },
  { term: "Photo ID", detail: "For every guest" },
  { term: "Deposit", detail: "₹5,000, refundable" },
];

/** The stay's essentials, and Stayflexi's cancellation policy in plain words (it replaces the old site's pages). */
function SmallPrint() {
  return (
    <div className="lg:mt-s34 lg:[grid-area:fine]">
      <dl className="grid grid-cols-4 gap-x-s13 border-t border-line pt-s8 sm:pt-s13 lg:grid-cols-2 lg:gap-y-s13 lg:pt-s21">
        {STAY_FACTS.map((f) => (
          <div key={f.term} className="min-w-0">
            <dt className="text-[12px] text-ink-muted sm:text-[13px]">{f.term}</dt>
            <dd className="text-[13px] leading-[1.35] text-ink sm:text-[15px]">{f.detail}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-s8 flex flex-wrap items-center justify-between gap-x-s21 lg:mt-s21">
        <button
          type="button"
          popoverTarget="cancellation-policy"
          className="tap inline-flex min-h-[32px] items-center gap-[6px] text-[14px] font-medium text-forest underline decoration-gold decoration-2 underline-offset-4 hover:text-farm"
        >
          Cancellation policy
        </button>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="tap inline-flex min-h-[32px] items-center text-[14px] font-medium text-forest underline decoration-gold decoration-2 underline-offset-4 hover:text-farm sm:hidden"
        >
          Check availability
        </a>
      </div>

      <div
        id="cancellation-policy"
        popover="auto"
        aria-labelledby="cancellation-policy-title"
        className="m-auto w-[min(34em,calc(100vw-42px))] rounded-card bg-card p-s21 text-ink shadow-float ring-1 ring-line backdrop:bg-ink/40 sm:p-s34"
      >
        <div className="flex items-start justify-between gap-s13">
          <h3 id="cancellation-policy-title" className="font-display text-h2 text-forest">
            Cancellation policy
          </h3>
          <button
            type="button"
            popoverTarget="cancellation-policy"
            popoverTargetAction="hide"
            aria-label="Close the cancellation policy"
            className="-mt-[6px] -mr-[6px] grid size-[44px] shrink-0 place-items-center rounded-full text-forest hover:bg-paper-deep"
          >
            <IconClose size={20} />
          </button>
        </div>
        <ul className="mt-s13 grid gap-s13 text-[15px] leading-[1.55] text-ink">
          <li>Payments aren’t refunded, but a cancelled stay can become a credit note.</li>
          <li>
            Cancel <strong className="font-medium">10 or more days</strong> before check-in and you get a credit note, valid for 3
            months from your original arrival date.
          </li>
          <li>
            Cancel <strong className="font-medium">less than 10 days</strong> before and you get a credit note (valid 1 month)
            only if someone else books those dates. Otherwise there’s no refund or credit.
          </li>
          <li>
            The advance and balance are due <strong className="font-medium">24 hours before check-in</strong>; unpaid bookings
            are cancelled without a refund.
          </li>
          <li>The ₹5,000 security deposit is collected at check-in and returned at check-out if nothing is damaged.</li>
        </ul>
      </div>
    </div>
  );
}
