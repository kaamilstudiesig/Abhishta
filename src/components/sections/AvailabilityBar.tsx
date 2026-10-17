"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { BOOKING_URL } from "@/lib/site";

const field =
  "peer block h-[55px] w-full rounded-btn border border-line bg-card px-s13 pt-[19px] pb-[5px] text-[15px] text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-transparent focus:border-farm focus:shadow-[0_0_0_3px_rgba(9,97,57,0.18)]";
const floatLabel =
  "pointer-events-none absolute top-[7px] left-s13 text-[11px] font-bold tracking-[0.08em] text-ink-muted uppercase";

function Field({ label, id, className = "", children }: { label: string; id: string; className?: string; children: ReactNode }) {
  return (
    <div className={`relative ${className}`}>
      {children}
      <label htmlFor={id} className={floatLabel}>
        {label}
      </label>
    </div>
  );
}

/**
 * Docked availability bar. Stayflexi is the booking engine, so "Check
 * availability" opens it in a new tab; the details entered here stay in the
 * browser (they are not sent anywhere).
 */
export function AvailabilityBar() {
  const id = useId();
  const [checkIn, setCheckIn] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Check availability"
      className="grid grid-cols-2 gap-s8 rounded-card bg-paper p-s13 text-ink shadow-float md:grid-cols-[1.25fr_1.1fr_1.15fr_1fr_1fr_auto] md:p-s13"
    >
      <Field label="Stay or outing" id={`${id}-type`} className="col-span-2 md:col-span-1">
        <select id={`${id}-type`} name="type" defaultValue="cottage" autoComplete="off" className={`${field} appearance-none pr-s34`}>
          <option value="cottage">Cottage stay</option>
          <option value="dormitory">Dormitory stay</option>
          <option value="day-outing">Day outing</option>
          <option value="group">Group or corporate</option>
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="pointer-events-none absolute top-1/2 right-s13 size-[16px] -translate-y-1/2 fill-none stroke-farm stroke-[1.5]"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Field>
      <Field label="Name" id={`${id}-name`} className="col-span-2 md:col-span-1">
        <input id={`${id}-name`} name="name" autoComplete="name" placeholder="Your name" className={field} />
      </Field>
      <div className="relative col-span-2 md:col-span-1">
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="98765 43210"
          className={`${field} pl-[52px]`}
        />
        <label htmlFor={`${id}-phone`} className={floatLabel}>
          Phone
        </label>
        <span className="pointer-events-none absolute bottom-[6px] left-s13 text-[15px] leading-[1.6] text-ink-muted">+91</span>
      </div>
      <Field label="Check-in" id={`${id}-in`}>
        <input
          id={`${id}-in`}
          name="checkin"
          type="date"
          autoComplete="off"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className={field}
        />
      </Field>
      <Field label="Check-out" id={`${id}-out`}>
        <input id={`${id}-out`} name="checkout" type="date" autoComplete="off" min={checkIn || undefined} className={field} />
      </Field>
      <button
        type="submit"
        className="col-span-2 inline-flex h-[55px] items-center justify-center gap-s8 rounded-btn bg-farm px-s21 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-forest md:col-span-1"
      >
        Check availability
      </button>
    </form>
  );
}
