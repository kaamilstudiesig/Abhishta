import type { ReactNode, SVGProps } from "react";

/**
 * Abhishta line-icon set — 24px grid, 1.5px stroke, round caps, currentColor
 * (farm green by default via the parent's text colour). Never emoji.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 24, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconArrow = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </Icon>
);

export const IconPlay = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8 5.5v13l10.5-6.5z" />
  </Icon>
);

export const IconPause = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8.5 5.5v13M15.5 5.5v13" />
  </Icon>
);

export const IconClose = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

export const IconGuests = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" />
    <path d="M15.5 5.2a3 3 0 0 1 0 5.6M17.5 14.3c1.6.7 2.6 2.3 3 4.7" />
  </Icon>
);

export const IconSitOut = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 10.5 12 4l9 6.5" />
    <path d="M5 9.5V20h14V9.5" />
    <path d="M9 20v-4.5h6V20" />
  </Icon>
);

export const IconDawn = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 18h18M6.5 18a5.5 5.5 0 0 1 11 0" />
    <path d="M12 6v3M5.2 10.2l1.6 1.6M18.8 10.2l-1.6 1.6" />
  </Icon>
);

export const IconMorning = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
  </Icon>
);

export const IconMidday = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 14c2.7 0 2.7 2 5.3 2s2.7-2 5.4-2 2.6 2 5.3 2" />
    <path d="M4 18.5c2.7 0 2.7 2 5.3 2s2.7-2 5.4-2 2.6 2 5.3 2" />
    <circle cx="12" cy="6.5" r="3" />
  </Icon>
);

export const IconDusk = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21c-1.8-1.6-3-3.3-3-5.2 0-2 1.6-3.4 3-5.3 1.4 1.9 3 3.3 3 5.3 0 1.9-1.2 3.6-3 5.2z" />
    <path d="M6 21h12M17.5 4.5a3.5 3.5 0 1 0 2 6.3 4 4 0 0 1-2-6.3z" />
  </Icon>
);

export const IconSky = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2.5 17h19" />
    <path d="M7 13.5c0-2 1.6-3.5 3.5-3.5 1.4 0 2.6.8 3.2 2a2.7 2.7 0 0 1 3.8 1.5" />
    <path d="M12 3.5l.6 1.4 1.4.6-1.4.6L12 7.5l-.6-1.4-1.4-.6 1.4-.6zM18.5 6.5l.4.9.9.4-.9.4-.4.9-.4-.9-.9-.4.9-.4z" />
  </Icon>
);

export const IconField = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 20V9M12 13c-2.5 0-4-1.5-4-4 2.5 0 4 1.5 4 4zM12 11c2.5 0 4-1.5 4-4-2.5 0-4 1.5-4 4z" />
    <path d="M3 20h18M5.5 20v-4M18.5 20v-4" />
  </Icon>
);

export const IconPool = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8 15V5.5a2 2 0 0 1 4 0M14 15V5.5a2 2 0 0 1 4 0M8 9h6M8 12.5h6" />
    <path d="M3 18c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1" />
  </Icon>
);

export const IconCart = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="9" cy="16" r="4" />
    <path d="M9 12v8M5 16h8M6.2 13.2l5.6 5.6M11.8 13.2l-5.6 5.6" />
    <path d="M13 13h8M3 11h12l2-3" />
  </Icon>
);

export const IconPhone = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 4h3.5l1.5 4-2 1.3a10 10 0 0 0 6.7 6.7L16 14l4 1.5V19a1.5 1.5 0 0 1-1.6 1.5A15.5 15.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z" />
  </Icon>
);

export const IconLandline = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 9.5C4 7 7.6 5 12 5s8 2 8 4.5V11h-3.5V9.5h-9V11H4z" />
    <path d="M6.5 12.5h11L19 19H5z" />
    <circle cx="12" cy="15.5" r="1.5" />
  </Icon>
);

export const IconMail = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </Icon>
);

export const IconPin = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.3" />
  </Icon>
);

export const IconCalendar = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
  </Icon>
);

export const IconStar = (p: IconProps) => (
  <Icon {...p}>
    <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />
  </Icon>
);

export const Icon360 = (p: IconProps) => (
  <Icon {...p}>
    <ellipse cx="12" cy="12" rx="9" ry="4" />
    <path d="M12 3c-2.2 2.3-3.5 5.5-3.5 9s1.3 6.7 3.5 9M12 3c2.2 2.3 3.5 5.5 3.5 9" />
    <path d="m14 19.5 1.8 1.5-1.8 1.5" />
  </Icon>
);

export const IconWhatsApp = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 20.5 5.3 16.6A8.5 8.5 0 1 1 8.7 19.6z" />
    <path d="M9 8.5c0 3.4 3 6.5 6.5 6.5l1-1.6-2-1-1 .8c-1-.5-2-1.5-2.4-2.4l.8-1-1-2z" />
  </Icon>
);

export const IconInstagram = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17 7h.01" />
  </Icon>
);

export const IconFacebook = (p: IconProps) => (
  <Icon {...p}>
    <path d="M14.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.6 1.6-1.6h1.5V4.3A20 20 0 0 0 15.4 4C13 4 11.5 5.4 11.5 8v2.5H9v3h2.5V21" />
  </Icon>
);

export const IconYouTube = (p: IconProps) => (
  <Icon {...p}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="m10 9 5 3-5 3z" />
  </Icon>
);

export const IconTripAdvisor = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="7" cy="13" r="3.5" />
    <circle cx="17" cy="13" r="3.5" />
    <path d="M7 13h.01M17 13h.01M3.5 9.5 5 11M20.5 9.5 19 11M5 9c4-2.5 10-2.5 14 0M12 16.5l-1 1.5h2z" />
  </Icon>
);

export const IconBooking = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4M9 14.5l2 2 4-4" />
  </Icon>
);
