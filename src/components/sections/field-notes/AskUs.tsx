"use client";

import { useId, useState, type FormEvent } from "react";
import { Field, field } from "@/components/forms";
import { IconCheck, IconMail, IconWhatsApp } from "@/components/icons";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";
import { CONTACT, whatsappUrl } from "@/lib/site";
import { INCLUDES } from "./atlas";

/**
 * #ask-us — what every stay includes (the client's list) beside a short
 * question form. There's no backend: sending opens WhatsApp with the message
 * written out; email works the same way. Phones: the list becomes one line.
 */
export function AskUs() {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const text = () =>
    [`Hi Abhishta, I have a question.`, `Name: ${name.trim()}`, phone.trim() ? `Phone: +91 ${phone.trim()}` : null, message.trim() || null]
      .filter(Boolean)
      .join("\n");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Add your name so we know who’s asking.");
      document.getElementById(id("name"))?.focus();
      return;
    }
    const url = whatsappUrl(text());
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;
    setSent(true);
  };

  const mailto = `${CONTACT.email.href}?subject=${encodeURIComponent("A question")}&body=${encodeURIComponent(text())}`;

  return (
    <section id="ask-us" data-nav="light" data-snap="" className={`bg-paper ${screen}`}>
      <div className={`${container} grid grid-cols-[minmax(0,1fr)] gap-s21 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-s89`}>
        <div className="min-w-0">
          <SectionHeader
            title="Ask us anything"
            lead={`Send your date and how many adults and children. ${CONTACT.person} will help you plan your visit.`}
            leadClassName="max-sm:mt-s13 max-sm:text-[15px] max-sm:leading-[1.5] short:hidden"
          />
          <h3 className="mt-s34 font-display text-[clamp(19px,1.7vw,22px)] text-forest max-lg:hidden squat:mt-s21">Every stay includes</h3>
          <ul className="mt-s13 grid grid-cols-2 gap-x-s21 gap-y-[6px] text-[15px] leading-[1.4] max-lg:hidden">
            {INCLUDES.map((f) => (
              <li key={f} className="flex items-start gap-s8">
                <IconCheck size={18} className="mt-[1px] shrink-0 text-farm" />
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-s13 text-[14px] leading-[1.5] text-ink-muted lg:hidden">
            Every stay includes all meals, the pool, farm activities, Wi-Fi and parking.
          </p>
        </div>

        <form noValidate onSubmit={onSubmit} aria-label="Ask a question" className="grid grid-cols-2 gap-s13 sm:gap-s21 lg:rounded-card lg:bg-card lg:p-s34 lg:shadow-card lg:ring-1 lg:ring-line squat:p-s21">
          <Field label="Name" htmlFor={id("name")} error={error || undefined}>
            <input
              id={id("name")}
              name="name"
              type="text"
              autoComplete="name"
              required
              aria-required="true"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${id("name")}-error` : undefined}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
                setSent(false);
              }}
              className={field}
            />
          </Field>
          <Field label="Phone" htmlFor={id("phone")}>
            <input
              id={id("phone")}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={field}
            />
          </Field>
          <div className="col-span-2">
            <Field label="Your question" htmlFor={id("message")}>
              <textarea
                id={id("message")}
                name="message"
                rows={3}
                autoComplete="off"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${field} min-h-[96px] resize-none py-s8 short:min-h-[64px]`}
              />
            </Field>
          </div>
          <div className="col-span-2 flex flex-wrap items-center gap-x-s21 gap-y-s8">
            <button type="submit" className={buttonClass("primary")}>
              <IconWhatsApp size={20} />
              Send on WhatsApp
            </button>
            <a href={mailto} className="tap inline-flex items-center gap-[6px] text-[15px] font-medium text-forest hover:text-farm">
              <IconMail size={18} className="text-farm" />
              Email instead
            </a>
          </div>
          <p role="status" className="col-span-2 text-[14px] text-ink-muted empty:hidden">
            {sent ? "WhatsApp has opened with your question. Press send there and it reaches us." : ""}
          </p>
        </form>
      </div>
    </section>
  );
}
