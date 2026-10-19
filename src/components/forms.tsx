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

