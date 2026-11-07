import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  IconCheck,
  IconChevronDown,
  IconMinus,
  IconPlus,
} from "@/components/icons";

/**
 * Form fields shared by the enquiry forms (Our nests "Plan your stay", Group
 * enquiries "Get a group quote"): labelled inputs at 44px+, 16px text so phones
 * don't zoom, errors under the field. There's no backend: forms write the
 * enquiry and open WhatsApp (or email) with it.
 */
export const field =
  "min-h-[44px] w-full min-w-0 rounded-[14px] border border-line bg-card px-s13 text-[16px] text-ink transition-colors duration-300 hover:border-sage aria-[invalid=true]:border-alert";
/** Errors float in the gap under their field (no layout height), so a "snap" screen never grows when one shows. Keep the text to one short line. */
export const errorClass =
  "pointer-events-none absolute top-full left-0 z-10 mt-[1px] text-[13px] leading-[14px] whitespace-nowrap text-alert";
export const labelClass =
  "mb-[4px] block text-[13px] font-medium text-ink-muted sm:text-[14px]";

export function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative min-w-0">
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className={errorClass}>
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
  const clamp = (n: number) =>
    Math.min(max, Math.max(min, Number.isFinite(n) ? n : min));
  const step =
    "grid size-[40px] shrink-0 place-items-center rounded-full text-forest transition-colors duration-300 hover:bg-paper-deep disabled:opacity-35 disabled:hover:bg-transparent";
  return (
    <div className="min-w-0">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="flex min-h-[44px] items-center justify-between rounded-[14px] border border-line bg-card px-[1px]">
        <button
          type="button"
          onClick={() => onChange(clamp(value - 1))}
          disabled={value <= min}
          aria-label={`Fewer ${label.toLowerCase()}`}
          className={step}
        >
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
        <button
          type="button"
          onClick={() => onChange(clamp(value + 1))}
          disabled={value >= max}
          aria-label={`More ${label.toLowerCase()}`}
          className={step}
        >
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

const dialOf = (country: CountryKey) =>
  COUNTRY_CODES.find((c) => c.key === country)?.dial ?? "";

/** The national digits: spaces and dashes dropped, and a leading trunk 0 (or the country's own code) taken off. */
function nationalDigits({ country, number }: Phone) {
  let d = number.replace(/\D/g, "");
  const dial = dialOf(country);
  if (!dial) return d.replace(/^00/, ""); // "Other": the code is typed in, sometimes as 00…
  if (number.trim().startsWith("+") && d.startsWith(dial))
    d = d.slice(dial.length);
  else if (country === "IN" && d.length === 12 && d.startsWith("91"))
    d = d.slice(2);
  return d.replace(/^0/, "");
}

/** An error to show under the field, or undefined (an empty number is fine: it's optional). */
export function phoneError(p: Phone) {
  if (!p.number.trim()) return undefined;
  const n = nationalDigits(p).length;
  if (p.country === "IN") return n === 10 ? undefined : "Enter all 10 digits.";
  if (p.country === "OTHER")
    return n >= 7 && n <= 15 ? undefined : "Add the country code too.";
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
export function PhoneField({
  id,
  value,
  error,
  onChange,
}: {
  id: string;
  value: Phone;
  error?: string;
  onChange: (p: Phone) => void;
}) {
  const current =
    COUNTRY_CODES.find((c) => c.key === value.country) ?? COUNTRY_CODES[0];
  const other = value.country === "OTHER";
  const errorId = `${id}-error`;
  return (
    <div className="relative min-w-0">
      <label id={`${id}-label`} htmlFor={id} className={labelClass}>
        Contact number
      </label>
      <div className="flex">
        <div className="shrink-0">
          <span id={`${id}-code-label`} className="sr-only">
            country code
          </span>
          <Listbox
            id={`${id}-code`}
            name="country-code"
            value={value.country}
            options={COUNTRY_CODES.map((c) => ({
              value: c.key,
              label: c.dial ? `${c.name} +${c.dial}` : c.name,
            }))}
            onChange={(v) => onChange({ ...value, country: v as CountryKey })}
            labelledBy={`${id}-label ${id}-code-label`}
            popupClass="w-[250px] max-w-full"
            rootClass="static"
            buttonClass="flex min-h-[44px] items-center gap-[2px] rounded-l-[14px] border border-r-0 border-line bg-paper-deep pr-[5px] pl-[8px] text-[15px] whitespace-nowrap text-ink transition-colors duration-300 hover:border-sage"
          >
            {current.short}
          </Listbox>
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
        <p id={errorId} className={errorClass}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Select({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="min-w-0">
      <label id={`${id}-label`} htmlFor={id} className={labelClass}>
        {label}
      </label>
      <Listbox
        id={id}
        name={id}
        value={value}
        options={options.map((o) => ({ value: o, label: o }))}
        onChange={onChange}
        labelledBy={`${id}-label`}
        buttonClass={`${field} flex items-center justify-between gap-s8 text-left`}
      >
        <span className="truncate">{value}</span>
      </Listbox>
    </div>
  );
}

type Option = { value: string; label: string };

/**
 * Themed dropdown (the browser's own list is OS-drawn and looks foreign): a
 * button plus a role=listbox card. Arrow keys, Home/End, Enter/Space pick,
 * Escape and clicking outside close, typing a letter jumps. A hidden input
 * keeps `name`/value in the form. `children` is the button face; `popupClass`
 * sizes the list.
 */
function Listbox({
  id,
  name,
  value,
  options,
  onChange,
  labelledBy,
  buttonClass,
  popupClass = "w-full",
  rootClass = "relative",
  children,
}: {
  id: string;
  name: string;
  value: string;
  options: Option[];
  onChange: (v: string) => void;
  labelledBy: string;
  buttonClass: string;
  popupClass?: string;
  rootClass?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const uid = useId();
  const listId = `${uid}-list`;
  const selected = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  useEffect(() => {
    if (open)
      list.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const show = () => {
    setActive(selected);
    setOpen(true);
  };
  const pick = (i: number) => {
    onChange(options[i].value);
    setOpen(false);
    root.current?.querySelector("button")?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    const last = options.length - 1;
    if (e.key === "Tab") return setOpen(false);
    if (e.key === "Escape") {
      if (open) e.preventDefault();
      return setOpen(false);
    }
    const move = (i: number) => {
      e.preventDefault();
      if (!open) show();
      else setActive(Math.min(last, Math.max(0, i)));
    };
    if (e.key === "ArrowDown") return move(active + 1);
    if (e.key === "ArrowUp") return move(active - 1);
    if (e.key === "Home") return move(0);
    if (e.key === "End") return move(last);
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      return open ? pick(active) : show();
    }
    if (e.key.length === 1 && /\S/.test(e.key)) {
      const from = open ? active + 1 : selected + 1;
      const at = [...options.slice(from), ...options.slice(0, from)].findIndex(
        (o) => o.label.toLowerCase().startsWith(e.key.toLowerCase()),
      );
      if (at >= 0) {
        const i = (from + at) % options.length;
        if (open) setActive(i);
        else onChange(options[i].value);
      }
    }
  };

  return (
    <div ref={root} className={`min-w-0 ${rootClass}`} onKeyDown={onKey}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-labelledby={labelledBy}
        aria-activedescendant={open ? `${uid}-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : show())}
        className={buttonClass}
      >
        {children}
        <IconChevronDown
          size={18}
          className={`shrink-0 text-ink-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <ul
          ref={list}
          id={listId}
          role="listbox"
          aria-labelledby={labelledBy}
          className={`absolute top-full left-0 z-30 mt-[6px] max-h-[min(280px,45svh)] overflow-y-auto overscroll-contain rounded-card border border-line bg-card p-[6px] shadow-card ${popupClass}`}
        >
          {options.map((o, i) => (
            <li
              key={o.value}
              id={`${uid}-opt-${i}`}
              role="option"
              aria-selected={o.value === value}
              onPointerDown={(e) => e.preventDefault()}
              onClick={() => pick(i)}
              onPointerMove={() => setActive(i)}
              className={`flex min-h-[40px] cursor-pointer items-center justify-between gap-s8 rounded-[10px] px-s13 py-[6px] text-[15px] leading-[1.3] text-ink transition-colors duration-150 ${
                i === active ? "bg-paper-deep" : ""
              } ${o.value === value ? "font-medium text-forest" : ""}`}
            >
              <span>{o.label}</span>
              {o.value === value ? (
                <IconCheck size={16} className="shrink-0 text-farm" />
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
