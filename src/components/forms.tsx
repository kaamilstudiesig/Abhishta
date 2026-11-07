import type { ReactNode } from "react";
import { IconChevronDown, IconMinus, IconPlus } from "@/components/icons";

/**
 * Form fields shared by the enquiry forms (Our nests "Plan your stay", Group
 * enquiries "Get a group quote"): labelled inputs at 44px+, 16px text so phones
 * don't zoom, errors under the field. There's no backend: forms write the
 * enquiry and open WhatsApp (or email) with it.
 */
export const field =
  "min-h-[44px] w-full min-w-0 rounded-[14px] border border-line bg-card px-s13 text-[16px] text-ink transition-colors duration-300 hover:border-sage aria-[invalid=true]:border-alert";
export const labelClass = "mb-[4px] block text-[13px] font-medium text-ink-muted sm:text-[14px]";

export function Field({ label, htmlFor, error, children }: { label: string; htmlFor: string; error?: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-[4px] text-[13px] leading-[1.35] text-alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function CountField({
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
  const step =
    "grid size-[40px] shrink-0 place-items-center rounded-full text-forest transition-colors duration-300 hover:bg-paper-deep disabled:opacity-35 disabled:hover:bg-transparent";
  return (
    <div className="min-w-0">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="flex min-h-[44px] items-center justify-between rounded-[14px] border border-line bg-card px-[1px]">
        <button type="button" onClick={() => onChange(clamp(value - 1))} disabled={value <= min} aria-label={`Fewer ${label.toLowerCase()}`} className={step}>
          <IconMinus size={18} />
        </button>
        <input
          id={id}
          name={id}
          type="number"
          inputMode="numeric"
          autoComplete="off"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(clamp(e.target.valueAsNumber))}
          className="w-[3ch] min-w-0 bg-transparent text-center text-[16px] text-ink [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button type="button" onClick={() => onChange(clamp(value + 1))} disabled={value >= max} aria-label={`More ${label.toLowerCase()}`} className={step}>
          <IconPlus size={18} />
        </button>
      </div>
    </div>
  );
}

/**
 * Country codes for the contact number: India first (most guests), then the
 * countries guests most often travel from. "Other" means the guest types the
 * code into the number.
 */
export const COUNTRY_CODES = [
  { key: "IN", short: "IN +91", name: "India", dial: "91" },
  { key: "AE", short: "AE +971", name: "UAE", dial: "971" },
  { key: "US", short: "US +1", name: "USA / Canada", dial: "1" },
  { key: "GB", short: "UK +44", name: "UK", dial: "44" },
  { key: "SG", short: "SG +65", name: "Singapore", dial: "65" },
  { key: "AU", short: "AU +61", name: "Australia", dial: "61" },
  { key: "SA", short: "SA +966", name: "Saudi Arabia", dial: "966" },
  { key: "QA", short: "QA +974", name: "Qatar", dial: "974" },
  { key: "OM", short: "OM +968", name: "Oman", dial: "968" },
  { key: "KW", short: "KW +965", name: "Kuwait", dial: "965" },
  { key: "BH", short: "BH +973", name: "Bahrain", dial: "973" },
  { key: "DE", short: "DE +49", name: "Germany", dial: "49" },
  { key: "MY", short: "MY +60", name: "Malaysia", dial: "60" },
  { key: "NZ", short: "NZ +64", name: "New Zealand", dial: "64" },
  { key: "OTHER", short: "Other", name: "Other (type the code)", dial: "" },
] as const;
export type CountryKey = (typeof COUNTRY_CODES)[number]["key"];
export type Phone = { country: CountryKey; number: string };
export const EMPTY_PHONE: Phone = { country: "IN", number: "" };

const dialOf = (country: CountryKey) => COUNTRY_CODES.find((c) => c.key === country)?.dial ?? "";

/** The national digits: spaces and dashes dropped, and a leading trunk 0 (or the country's own code) taken off. */
function nationalDigits({ country, number }: Phone) {
  let d = number.replace(/\D/g, "");
  const dial = dialOf(country);
  if (!dial) return d.replace(/^00/, ""); // "Other": the code is typed in, sometimes as 00…
  if (number.trim().startsWith("+") && d.startsWith(dial)) d = d.slice(dial.length);
  else if (country === "IN" && d.length === 12 && d.startsWith("91")) d = d.slice(2);
  return d.replace(/^0/, "");
}

/** An error to show under the field, or undefined (an empty number is fine: it's optional). */
export function phoneError(p: Phone) {
  if (!p.number.trim()) return undefined;
  const n = nationalDigits(p).length;
  if (p.country === "IN") return n === 10 ? undefined : "Enter all 10 digits.";
  if (p.country === "OTHER") return n >= 7 && n <= 15 ? undefined : "Add the country code too.";
  return n >= 6 && n <= 14 ? undefined : "Check the number.";
}

/** The full international number for the enquiry, e.g. "+44 7700900123"; "" when empty. */
export function fullPhone(p: Phone) {
  if (!p.number.trim()) return "";
  const d = nationalDigits(p);
  const dial = dialOf(p.country);
  return dial ? `+${dial} ${d}` : `+${d}`;
}

/**
 * Contact number: a compact country-code select ("IN +91") joined to the
 * number. The visible label names both; the select also says it's the
 * country code.
 */
export function PhoneField({ id, value, error, onChange }: { id: string; value: Phone; error?: string; onChange: (p: Phone) => void }) {
  const current = COUNTRY_CODES.find((c) => c.key === value.country) ?? COUNTRY_CODES[0];
  const other = value.country === "OTHER";
  const errorId = `${id}-error`;
  return (
    <div className="min-w-0">
      <label id={`${id}-label`} htmlFor={id} className={labelClass}>
        Contact number
      </label>
      <div className="flex">
        <div className="relative flex min-h-[44px] shrink-0 items-center gap-[2px] rounded-l-[14px] border border-r-0 border-line bg-paper-deep pr-[5px] pl-[8px] text-[15px] text-ink transition-colors duration-300 hover:border-sage has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-farm">
          <span aria-hidden="true" className="whitespace-nowrap">
            {current.short}
          </span>
          <IconChevronDown size={14} className="text-ink-muted" />
          <span id={`${id}-code-label`} className="sr-only">
            country code
          </span>
          <select
            id={`${id}-code`}
            name="country-code"
            autoComplete="off"
            aria-labelledby={`${id}-label ${id}-code-label`}
            value={value.country}
            onChange={(e) => onChange({ ...value, country: e.target.value as CountryKey })}
            className="absolute inset-0 cursor-pointer appearance-none opacity-0 outline-none"
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.dial ? `${c.name} +${c.dial}` : c.name}
              </option>
            ))}
          </select>
        </div>
        <input
          id={id}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete={other ? "tel" : "tel-national"}
          placeholder={other ? "+ code and number" : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          value={value.number}
          onChange={(e) => onChange({ ...value, number: e.target.value })}
          className={`${field} rounded-l-none px-[8px] sm:px-[10px]`}
        />
      </div>
      {error ? (
        <p id={errorId} className="mt-[4px] text-[13px] leading-[1.35] text-alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Select({ id, label, value, options, onChange }: { id: string; label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <select id={id} name={id} value={value} onChange={(e) => onChange(e.target.value)} className={`${field} appearance-none truncate pr-s34`}>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <IconChevronDown size={18} className="pointer-events-none absolute top-1/2 right-s13 -translate-y-1/2 text-ink-muted" />
      </div>
    </div>
  );
}

