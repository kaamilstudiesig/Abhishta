"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { IconChevronDown, IconMail, IconMinus, IconPhone, IconPlus, IconWhatsApp } from "@/components/icons";
import { SectionHeader, buttonClass, container } from "@/components/ui";
import { BOOKING_URL, CONTACT, WHATSAPP_NUMBER } from "@/lib/site";

const ROOM_CHOICES = [
  "Not sure",
  "Mayura",
  "Mathura",
  "Gopala",
  "Govardhana",
  "Family dormitory",
  "Bachelors dormitory",
  "Triple room",
];
const MEAL_PLANS = ["Room only", "Breakfast + dinner", "All meals"];

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
    v.meals ? `Meals: ${v.meals}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

const field =
  "min-h-[48px] w-full rounded-[14px] border border-paper/25 bg-paper/[0.07] px-s13 text-[16px] text-paper [color-scheme:dark] placeholder:text-paper/45 transition-colors duration-300 hover:border-paper/45 aria-[invalid=true]:border-alert";
const labelClass = "mb-[6px] block text-[14px] font-medium text-paper/85";

function Field({ label, htmlFor, error, children }: { label: string; htmlFor: string; error?: string; children: ReactNode }) {
  return (
    <div className="col-span-2 sm:col-span-1">
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-[6px] text-[14px] text-alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Stepper({
  id,
  label,
  value,
  min,
  max,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  const clamp = (n: number) => Math.min(max, Math.max(min, Number.isFinite(n) ? n : min));
  const step = "grid size-[44px] shrink-0 place-items-center rounded-full text-paper transition-colors duration-300 hover:bg-paper/15 disabled:opacity-35 disabled:hover:bg-transparent";
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="flex min-h-[48px] items-center justify-between rounded-[14px] border border-paper/25 bg-paper/[0.07] px-[2px]">
        <button type="button" onClick={() => onChange(clamp(value - 1))} disabled={value <= min} aria-label={`Fewer ${label.toLowerCase()}`} className={step}>
          <IconMinus size={18} />
        </button>
        <input
          id={id}
          name={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(clamp(e.target.valueAsNumber))}
          className="w-[4ch] bg-transparent text-center text-[16px] text-paper [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button type="button" onClick={() => onChange(clamp(value + 1))} disabled={value >= max} aria-label={`More ${label.toLowerCase()}`} className={step}>
          <IconPlus size={18} />
        </button>
      </div>
    </div>
  );
}

/**
 * Plan your stay — forest band. There's no booking backend: the form writes
 * the enquiry and opens WhatsApp with it, ready to send (email works the same
 * way). Live availability and rates stay on Stayflexi. The stay's small print
 * and a plain-words summary of Stayflexi's cancellation policy sit underneath.
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
    meals: "",
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
      next.dates = "Check-out needs to be at least a day after check-in.";
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

  const mailto = `${CONTACT.email.href}?subject=${encodeURIComponent("Stay enquiry")}&body=${encodeURIComponent(
    enquiry(values),
  )}`;

  return (
    <section id="plan-your-stay" data-nav="dark" className="on-dark border-b border-paper/10 bg-forest pt-s89 pb-s89 text-paper lg:pt-s144">
      {/* phones: intro → form → small print; desktop: intro and small print beside the form */}
      <div
        className={`${container} grid gap-s34 lg:grid-cols-[1fr_1.618fr] lg:grid-rows-[auto_1fr] lg:gap-x-s89 lg:gap-y-s55 lg:[grid-template-areas:'intro_form'_'fine_form']`}
      >
        <div className="lg:[grid-area:intro]">
          <SectionHeader
            tone="dark"
            title="Plan your stay"
            lead="Tell us your dates and who’s coming. It reaches us on WhatsApp, and we’ll write back with what’s free."
          />
          <ul className="mt-s34 grid gap-s8 text-[15px]">
            <li>
              <a href={mailto} className="tap inline-flex items-center gap-s13 text-paper hover:text-gold">
                <IconMail size={20} className="shrink-0 text-gold" />
                <span>
                  <span className="sr-only">Email instead: </span>
                  {CONTACT.email.label}
                </span>
              </a>
            </li>
            <li>
              <a href={CONTACT.reservation.href} className="tap inline-flex items-center gap-s13 text-paper hover:text-gold">
                <IconPhone size={20} className="shrink-0 text-gold" />
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
          className="grid grid-cols-2 gap-x-s13 gap-y-s21 self-start rounded-card bg-paper/[0.05] p-s21 ring-1 ring-paper/12 sm:gap-x-s21 sm:p-s34 lg:[grid-area:form]"
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
              <span aria-hidden="true" className="grid min-h-[48px] place-items-center rounded-l-[14px] border border-r-0 border-paper/25 bg-paper/10 px-s13 text-[16px] text-paper/80">
                +91
              </span>
              <input
                id={id("phone")}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="98765 43210"
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

          <Stepper id={id("adults")} label="Adults" value={values.adults} min={1} max={30} onChange={(n) => set("adults", n)} />
          <Stepper id={id("kids")} label="Kids" value={values.kids} min={0} max={30} onChange={(n) => set("kids", n)} />

          <div className="col-span-2">
            <label htmlFor={id("room")} className={labelClass}>
              Room preference
            </label>
            <div className="relative">
              <select
                id={id("room")}
                name="room"
                value={values.room}
                onChange={(e) => set("room", e.target.value)}
                className={`${field} appearance-none pr-s55`}
              >
                {ROOM_CHOICES.map((r) => (
                  <option key={r} value={r} className="bg-forest text-paper">
                    {r}
                  </option>
                ))}
              </select>
              <IconChevronDown size={20} className="pointer-events-none absolute top-1/2 right-s13 -translate-y-1/2 text-paper/70" />
            </div>
          </div>

          <fieldset className="col-span-2">
            <legend className={labelClass}>Meal plan</legend>
            <div className="flex flex-wrap gap-s8">
              {MEAL_PLANS.map((m) => (
                <label
                  key={m}
                  className="relative inline-flex min-h-[44px] cursor-pointer items-center rounded-btn border border-paper/25 px-s21 text-[15px] text-paper/85 transition-colors duration-300 hover:border-paper/60 has-[:checked]:border-paper has-[:checked]:bg-paper has-[:checked]:text-forest has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-gold"
                >
                  <input
                    type="radio"
                    name="meals"
                    value={m}
                    checked={values.meals === m}
                    onChange={() => set("meals", m)}
                    className="sr-only"
                  />
                  {m}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="col-span-2 flex flex-col gap-s13 pt-s8 sm:flex-row sm:flex-wrap sm:items-center">
            <button type="submit" className={buttonClass("gold")}>
              <IconWhatsApp size={20} />
              Send on WhatsApp
            </button>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={buttonClass("ghost-light")}>
              Check availability
            </a>
          </div>
          <p role="status" className="col-span-2 text-[14px] text-paper/80 empty:hidden">
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
  { term: "Photo ID", detail: "Government ID for every guest" },
  { term: "Deposit", detail: "₹5,000 at check-in, refunded at check-out" },
];

/** The stay's essentials, and Stayflexi's cancellation policy in plain words (it replaces the old site's pages). */
function SmallPrint() {
  return (
    <div className="mt-s21 lg:mt-0 lg:[grid-area:fine]">
      <div className="border-t border-paper/15 pt-s34">
        <dl className="grid grid-cols-2 gap-x-s21 gap-y-s21">
          {STAY_FACTS.map((f) => (
            <div key={f.term}>
              <dt className="text-[14px] text-paper/70">{f.term}</dt>
              <dd className="mt-[2px] text-[16px] leading-[1.45] text-paper">{f.detail}</dd>
            </div>
          ))}
        </dl>

        <details className="group mt-s34 rounded-card ring-1 ring-paper/15 open:bg-paper/[0.04]">
          <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-s13 px-s21 font-medium text-paper [&::-webkit-details-marker]:hidden">
            Cancellation policy
            <IconChevronDown size={20} className="shrink-0 text-gold transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <ul className="grid gap-s13 px-s21 pb-s21 text-[15px] leading-[1.55] text-paper/85">
            <li>Payments aren’t refunded, but a cancelled stay can become a credit note.</li>
            <li>
              Cancel <strong className="font-medium text-paper">10 or more days</strong> before check-in and you get a credit
              note, valid for 3 months from your original arrival date.
            </li>
            <li>
              Cancel <strong className="font-medium text-paper">less than 10 days</strong> before and you get a credit note
              (valid 1 month) only if someone else books those dates. Otherwise there’s no refund or credit.
            </li>
            <li>
              The advance and balance are due <strong className="font-medium text-paper">24 hours before check-in</strong>;
              unpaid bookings are cancelled without a refund.
            </li>
            <li>The ₹5,000 security deposit comes back at check-out if nothing is damaged.</li>
          </ul>
        </details>
      </div>
    </div>
  );
}
