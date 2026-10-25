import type { ComponentType } from "react";
import { MapEmbed } from "@/components/MapEmbed";
import { IconClock, IconLandline, IconMail, IconPin, IconWhatsApp } from "@/components/icons";
import { SectionHeader, buttonClass, container, screen } from "@/components/ui";
import { CONTACT, WHATSAPP_URL } from "@/lib/site";

const CARDS: { icon: ComponentType<{ size?: number; className?: string }>; label: string; value: string; href?: string; external?: boolean }[] = [
  { icon: IconWhatsApp, label: `Call or WhatsApp ${CONTACT.person}`, value: CONTACT.reservation.label, href: WHATSAPP_URL, external: true },
  { icon: IconLandline, label: "Landline", value: CONTACT.landline.label, href: CONTACT.landline.href },
  { icon: IconMail, label: "Email", value: CONTACT.email.label, href: CONTACT.email.href },
  { icon: IconClock, label: "Office hours", value: CONTACT.hours },
];

/**
 * #find-us — how to reach the farm, on the sage band: the Google map beside
 * the address, a "Get directions" link and the ways to get in touch (from the
 * client: call or WhatsApp Deva Bhanu). Phones: a short map, then the cards.
 */
export function FindUs() {
  return (
    <section id="find-us" data-nav="light" data-snap="" className={`bg-gold-soft ${screen}`}>
      <div className={`${container} grid grid-cols-[minmax(0,1fr)] gap-s21 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-s55`}>
        <div className="overflow-hidden rounded-card bg-card ring-1 ring-line lg:order-1">
          <MapEmbed
            src={CONTACT.mapEmbed}
            title="Map showing Abhishta Agri Farm Stay near Kunigal"
            className="h-[clamp(150px,24svh,300px)] sm:h-[32svh] lg:h-[clamp(320px,calc(100svh-300px),560px)]"
          />
        </div>

        <div className="min-w-0 lg:order-2">
          <SectionHeader title="How to reach us" />
          <p className="mt-s13 flex gap-s13 text-[15px] leading-[1.5] text-ink sm:mt-s21">
            <IconPin size={22} className="mt-[1px] shrink-0 text-farm" />
            <span>
              {CONTACT.address}. <span className="text-ink-muted">About 90 km from Bangalore.</span>
            </span>
          </p>
          <a href={CONTACT.mapUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "mt-s13 sm:mt-s21")}>
            Get directions
          </a>

          <ul className="mt-s21 grid grid-cols-2 gap-x-s13 gap-y-s13 border-t border-forest/15 pt-s13 sm:mt-s34 sm:pt-s21 squat:mt-s21 squat:pt-s13">
            {CARDS.map(({ icon: Icon, label, value, href, external }) => {
              const body = (
                <>
                  <Icon size={20} className="shrink-0 text-farm" />
                  <span className="min-w-0">
                    <span className="block text-[12px] text-ink-muted sm:text-[13px]">{label}</span>
                    <span className="block text-[14px] font-medium break-words text-forest sm:text-[15px]">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label} className="min-w-0">
                  {href ? (
                    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="tap flex gap-s8 hover:text-farm">
                      {body}
                    </a>
                  ) : (
                    <p className="flex gap-s8">{body}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
