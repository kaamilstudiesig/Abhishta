"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Stepper } from "@/components/bits/Stepper";
import { CountField, Field, field, labelClass } from "@/components/forms";
import { IconMail, IconPhone, IconWhatsApp } from "@/components/icons";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";
import { CONTACT, whatsappUrl } from "@/lib/site";
import { GROUP_TYPES, SELECT_OCCASION, type GroupType } from "./groups";

type Values = {
  type: GroupType | "";
  people: number;
  stay: "Day outing" | "Overnight stay";
  date: string;
  organisation: string;
  name: string;
  phone: string;
  email: string;
  note: string;
};

const ORGANISATION_LABEL: Record<GroupType, string> = {
  "Corporate outing": "Company",
  "School or college visit": "School or college",
  "Day outing": "Group name (optional)",
  "Destination event": "The occasion",
};

const pretty = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

function enquiry(v: Values) {
  const type = v.type || "Group";
  return [
    `Hi Abhishta, I'd like a quote for a group: ${type.toLowerCase()}.`,
    `How many: ${v.people}`,
    v.type !== "Day outing" ? `Day or overnight: ${v.stay}` : null,
    `Date: ${v.date ? pretty(v.date) : "flexible"}`,
    v.organisation.trim() && v.type ? `${ORGANISATION_LABEL[v.type].replace(" (optional)", "")}: ${v.organisation.trim()}` : null,
    `Name: ${v.name.trim()}`,
    v.phone.trim() ? `Phone: +91 ${v.phone.trim()}` : null,
    v.email.trim() ? `Email: ${v.email.trim()}` : null,
    v.note.trim() ? `Note: ${v.note.trim()}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * #group-quote — "Get a group quote", on paper so the forest footer reads as its
 * own band. Three short steps (React Bits Stepper): the group, the date, then
 * who's asking. There's no backend: sending opens WhatsApp with the enquiry
 * written out, ready to send; email works the same way.
 */
export function GroupQuote() {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const dateRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({
    type: "",
    people: 20,
    stay: "Day outing",
    date: "",
    organisation: "",
    name: "",
    phone: "",
    email: "",
    note: "",
  });
  const [errors, setErrors] = useState<{ type?: string; name?: string }>({});
  const [sent, setSent] = useState(false);

  // an occasion picked in the events list fills in the form: a destination event, that occasion
  useEffect(() => {
    const onPick = (e: Event) => {
      const occasion = (e as CustomEvent<string>).detail;
      setValues((v) => ({ ...v, type: "Destination event", organisation: occasion }));
      setErrors((er) => ({ ...er, type: undefined }));
      setSent(false);
      setStep(0);
    };
    window.addEventListener(SELECT_OCCASION, onPick);
    return () => window.removeEventListener(SELECT_OCCASION, onPick);
  }, []);

  // no past dates (set after mount: the server doesn't know the visitor's today)
  useEffect(() => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    if (dateRef.current) dateRef.current.min = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  }, [step]);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setSent(false);
  };

  const canLeave = (from: number) => {
    if (from === 0 && !values.type) {
      setErrors((e) => ({ ...e, type: "Pick the kind of group." }));
      document.getElementById(id("type-0"))?.focus();
      return false;
    }
    return true;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Enter in a field before the last step moves on rather than sending
    if (step < 2) {
      if (canLeave(step)) setStep(step + 1);
      return;
    }
    if (!values.name.trim()) {
      setErrors((er) => ({ ...er, name: "Add your name so we know who’s asking." }));
      document.getElementById(id("name"))?.focus();
      return;
    }
    const url = whatsappUrl(enquiry(values));
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;
    setSent(true);
  };

  const mailto = `${CONTACT.email.href}?subject=${encodeURIComponent("Group enquiry")}&body=${encodeURIComponent(enquiry(values))}`;

  const groupStep = (
    <div className="grid gap-s13 sm:gap-s21">
      <div role="radiogroup" aria-label="Kind of group" aria-describedby={errors.type ? id("type-error") : undefined} className="grid grid-cols-2 gap-s8 sm:gap-s13">
        {GROUP_TYPES.map((g, i) => (
          <label
            key={g.value}
            className={`relative flex min-h-[52px] cursor-pointer flex-col justify-center rounded-[14px] border px-s13 py-s8 transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-farm ${
              values.type === g.value ? "border-forest bg-forest text-paper" : "border-line bg-card text-forest hover:border-sage"
            }`}
          >
            <input
              id={id(`type-${i}`)}
              type="radio"
              name="group-type"
              value={g.value}
              checked={values.type === g.value}
              onChange={() => {
                set("type", g.value);
                if (g.value === "Day outing") set("stay", "Day outing");
                setErrors((er) => ({ ...er, type: undefined }));
              }}
              className="sr-only"
            />
            <span className="text-[15px] leading-[1.25] font-medium">{g.value}</span>
            <span className={`text-[13px] leading-[1.3] max-sm:hidden ${values.type === g.value ? "text-paper/75" : "text-ink-muted"}`}>{g.line}</span>
          </label>
        ))}
      </div>
      {errors.type ? (
        <p id={id("type-error")} className="-mt-[6px] text-[13px] text-alert">
          {errors.type}
        </p>
      ) : null}
      <div className="grid grid-cols-2 gap-s13 sm:gap-s21">
        <CountField id={id("people")} label="People" value={values.people} min={1} max={150} onChange={(n) => set("people", n)} />
        {values.type !== "Day outing" ? (
          <div className="min-w-0">
            <span id={id("stay-label")} className={labelClass}>
              Day or overnight
            </span>
            <div role="radiogroup" aria-labelledby={id("stay-label")} className="grid min-h-[44px] grid-cols-2 rounded-[14px] border border-line bg-card p-[3px]">
              {(["Day outing", "Overnight stay"] as const).map((o) => (
                <label
                  key={o}
                  className={`relative grid cursor-pointer place-items-center rounded-[11px] px-[6px] text-center text-[14px] leading-[1.15] transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-farm ${
                    values.stay === o ? "bg-forest text-paper" : "text-forest hover:bg-paper-deep"
                  }`}
                >
                  <input type="radio" name="stay" value={o} checked={values.stay === o} onChange={() => set("stay", o)} className="sr-only" />
                  {o === "Day outing" ? "Day" : "Overnight"}
                </label>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );

  const whenStep = (
    <div className="grid grid-cols-2 gap-s13 sm:gap-s21">
      <Field label="Preferred date" htmlFor={id("date")}>
        <input
          ref={dateRef}
          id={id("date")}
          name="date"
          type="date"
          autoComplete="off"
          value={values.date}
          onChange={(e) => set("date", e.target.value)}
          className={field}
        />
      </Field>
      <Field label={values.type ? ORGANISATION_LABEL[values.type] : "Organisation (optional)"} htmlFor={id("organisation")}>
        <input
          id={id("organisation")}
          name="organisation"
          type="text"
          autoComplete="organization"
          value={values.organisation}
          onChange={(e) => set("organisation", e.target.value)}
          className={field}
        />
      </Field>
      <p className="col-span-2 text-[14px] leading-[1.45] text-ink-muted">Not sure of the date yet? Leave it empty and we’ll suggest some.</p>
    </div>
  );

  const youStep = (
    <div className="grid grid-cols-2 gap-s13 sm:gap-s21">
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
          onChange={(e) => {
            set("name", e.target.value);
            setErrors((er) => ({ ...er, name: undefined }));
          }}
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
      <div className="col-span-2">
        <Field label="Email (optional)" htmlFor={id("email")}>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            className={field}
          />
        </Field>
      </div>
      <div className="col-span-2 short:hidden">
        <Field label="Anything else (optional)" htmlFor={id("note")}>
          <textarea
            id={id("note")}
            name="note"
            rows={2}
            autoComplete="off"
            value={values.note}
            onChange={(e) => set("note", e.target.value)}
            className={`${field} min-h-[64px] resize-none py-s8`}
          />
        </Field>
      </div>
    </div>
  );

  return (
    <section id="group-quote" data-nav="light" data-snap="" className={`bg-paper ${screen}`}>
      <div className={`${container} grid gap-y-s13 sm:gap-y-s21 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-x-s89`}>
        <div className="min-w-0">
          <SectionHeader
            title="Get a group quote"
            lead="Tell us who’s coming and when. It reaches us on WhatsApp, and we’ll write back with a plan and a price."
            leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5] short:hidden"
          />
          <ul className="mt-s34 hidden gap-s8 text-[15px] lg:grid squat:mt-s21">
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

        <form noValidate onSubmit={onSubmit} aria-label="Group quote" className="lg:rounded-card lg:bg-card lg:p-s34 lg:shadow-card lg:ring-1 lg:ring-line squat:p-s21">
          <Stepper
            step={step}
            onStepChange={(n) => {
              setStep(n);
              setSent(false);
            }}
            canLeave={canLeave}
            steps={[
              { title: "Your group", content: groupStep },
              { title: "When", content: whenStep },
              { title: "You", content: youStep },
            ]}
            finish={
              <button type="submit" className={buttonClass("primary")}>
                <IconWhatsApp size={20} />
                Send on WhatsApp
              </button>
            }
          />
          <p role="status" className="mt-s13 text-[14px] text-ink-muted empty:hidden">
            {sent ? "WhatsApp has opened with your enquiry. Press send there and it reaches us." : ""}
          </p>
        </form>
      </div>
    </section>
  );
}
