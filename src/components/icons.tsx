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

export const IconChevronLeft = (p: IconProps) => (
  <Icon {...p}>
    <path d="m14.5 6-6 6 6 6" />
  </Icon>
);

export const IconChevronRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="m9.5 6 6 6-6 6" />
  </Icon>
);

export const IconChevronDown = (p: IconProps) => (
  <Icon {...p}>
    <path d="m6 9.5 6 6 6-6" />
  </Icon>
);

export const IconCheck = (p: IconProps) => (
  <Icon {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Icon>
);

export const IconMinus = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 12h12" />
  </Icon>
);

export const IconPlus = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 6v12M6 12h12" />
  </Icon>
);

/** Opens elsewhere (a new tab). */
export const IconExternal = (p: IconProps) => (
  <Icon {...p}>
    <path d="M14 4.5h5.5V10M19.5 4.5 11 13" />
    <path d="M17 13.5v4.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 5 18V9a1.5 1.5 0 0 1 1.5-1.5H11" />
  </Icon>
);

/* Shared spaces */

export const IconPool = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8 15V5.5a2 2 0 0 1 4 0M14 15V5.5a2 2 0 0 1 4 0M8 9h6M8 12.5h6" />
    <path d="M3 18c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1" />
  </Icon>
);

export const IconDining = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12.5" r="5" />
    <path d="M4 4v5a1.5 1.5 0 0 0 1.5 1.5v9.5M5.5 4v4M20 4c-1.4.8-2 2.6-2 5v2h2v9" />
  </Icon>
);

/** Hande ole snana — a copper pot bath over a wood fire. */
export const IconBath = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5.5 8.5h13M7 8.5c-.8 1.4-1 2.8-1 4a6 6 0 0 0 12 0c0-1.2-.2-2.6-1-4" />
    <path d="M9.5 5.5c0-1 1-1 1-2M13.5 5.5c0-1 1-1 1-2M8 21.5l2-2.5M16 21.5l-2-2.5" />
  </Icon>
);

export const IconGames = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M6.2 5.8c2.6 3.4 2.6 9 0 12.4M17.8 5.8c-2.6 3.4-2.6 9 0 12.4" />
  </Icon>
);

export const IconCampfire = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.5c2.8 2.6 4.5 4.9 4.5 7.4a4.5 4.5 0 0 1-9 0c0-1.4.6-2.6 1.6-3.7.3 1.2 1 2 1.9 2.3C10.9 7.3 11.2 5.4 12 3.5z" />
    <path d="M4.5 20.5 19.5 17M4.5 17l15 3.5" />
  </Icon>
);

export const IconKoi = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.5 12c2.6-3.4 6.2-5 9.5-5 2.6 0 4.7 1.3 6 3l1.5-1.5v7L19 14c-1.3 1.7-3.4 3-6 3-3.3 0-6.9-1.6-9.5-5z" />
    <path d="M7.5 10.6h.01M12 9.5c-1 1.6-1 3.4 0 5" />
  </Icon>
);

/** Full screen. */
export const IconExpand = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.5 9V4.5H9M15 4.5h4.5V9M19.5 15v4.5H15M9 19.5H4.5V15" />
  </Icon>
);

/* ——— The living farm ——— */

/** A fruit tree. */
export const IconOrchard = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21v-7M8.5 21h7" />
    <path d="M12 14c-3.9 0-6.5-2.3-6.5-5.4S8.3 3 12 3s6.5 2.5 6.5 5.6S15.9 14 12 14z" />
    <circle cx="9.5" cy="8.5" r="1" />
    <circle cx="14.5" cy="10" r="1" />
  </Icon>
);

/** A seedling in the soil — growing and harvesting vegetables. */
export const IconSprout = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.5 20.5h15M12 20.5V12" />
    <path d="M12 13.5C12 10 9.8 7.5 5.5 7.5c0 3.5 2.2 6 6.5 6zM12 11.5c0-3.5 2.2-6 6.5-6 0 3.5-2.2 6-6.5 6z" />
  </Icon>
);

/** Crop rows running away to a sprout — the fields on an agri-tour. */
export const IconFields = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2.5 20c3-1.3 16-1.3 19 0M4.5 15.8c2.8-1 12.2-1 15 0M7 12.2c2.3-.7 7.7-.7 10 0" />
    <path d="M12 9.5V5M12 7c0-1.4-1-2.5-2.5-2.5M12 6.2c0-1.4 1-2.4 2.5-2.4" />
  </Icon>
);

/** A path between the trees — nature walks. */
export const IconPath = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 21c1.6-4.6 2.8-9.6 3.6-14.5M17 21c-1.6-4.6-2.8-9.6-3.6-14.5" />
    <path d="M12 19.5v-1.2M12 15.2v-1M12 11.3v-.8" />
    <path d="M4.5 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM4.5 9.5v3M19.5 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM19.5 8v2.5" />
  </Icon>
);

/** A bullock cart: the bed, its rails, the shaft and one big wheel. */
export const IconCart = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2.5 11.5h12.5M2.5 11.5V8M15 11.5V8M15 11.5l6.5 3" />
    <circle cx="8.5" cy="15.5" r="4.5" />
    <path d="M8.5 11v9M4 15.5h9" />
  </Icon>
);

/** A cow's face, front on: horns, ears, muzzle. */
export const IconCow = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 7.5c-2 0-3.4-1.2-3.8-3M17 7.5c2 0 3.4-1.2 3.8-3M7.2 9 4 10.6M16.8 9l3.2 1.6" />
    <path d="M7.5 7.5h9l-.6 6.5a3.9 3.9 0 0 1-7.8 0z" />
    <path d="M10.3 16.2h.01M13.7 16.2h.01" />
  </Icon>
);

/** A goat's face: swept-back horns and a beard. */
export const IconGoat = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 8c-.8-2.6-2.6-4-5-4M15 8c.8-2.6 2.6-4 5-4M8.6 9.4 5 11.2M15.4 9.4l3.6 1.8" />
    <path d="M8.5 8h7l-1 7.2a2.5 2.5 0 0 1-5 0z" />
    <path d="M12 17.8v3.2M10.6 13h.01M13.4 13h.01" />
  </Icon>
);

/** A hen. */
export const IconHen = (p: IconProps) => (
  <Icon {...p}>
    <path d="M14 6.5a2.8 2.8 0 0 1 5.5.5v1.2l2 1-2 .8V12a6.5 6.5 0 0 1-13 .5C6.5 10 5 8.5 3 8.5c1.5 0 6.5.8 8 2.5" />
    <path d="M15.5 4c.4-.9 1.6-1 2.2-.2M11 19v2.5M14.5 19v2.5" />
  </Icon>
);

/** A milk can — farm-fresh dairy. */
export const IconMilk = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 7V4.5h6V7M8 7h8l1 3v9.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 19.5V10z" />
    <path d="M7 13.5h10" />
  </Icon>
);

/** A cooking pot with steam — the farm's kitchen. */
export const IconPot = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 11h14v2.5a7 7 0 0 1-14 0zM3 12h2M19 12h2" />
    <path d="M9.5 8c0-1.1 1-1.1 1-2.2M13.5 8c0-1.1 1-1.1 1-2.2" />
  </Icon>
);

/** A leaf — naturally grown. */
export const IconLeaf = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 19c0-8 5-14 14-14 0 9-6 14-14 14z" />
    <path d="M5 19l8.5-8.5" />
  </Icon>
);

/** A leaf inside a turning arrow — compost and organic practice. */
export const IconCompost = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 12a8 8 0 1 1-2.4-5.7M20 4v4h-4" />
    <path d="M8.5 15.5c0-3.6 2.2-6 6-6 0 3.6-2.2 6-6 6zM8.5 15.5l3-3" />
  </Icon>
);

/** A woven basket — harvest to plate. */
export const IconBasket = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8 10a4 4 0 0 1 8 0M3.5 10h17l-1.6 9a1.6 1.6 0 0 1-1.6 1.3H6.7A1.6 1.6 0 0 1 5.1 19z" />
    <path d="M9 13.5v4M12 13.5v4M15 13.5v4" />
  </Icon>
);

/* ——— Group enquiries ——— */

/** A bed, side on — rooms for a group. */
export const IconBed = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 18.5V6M3 14h18v4.5M21 14v-2.5a2.5 2.5 0 0 0-2.5-2.5H11v5" />
    <circle cx="7" cy="11" r="1.8" />
  </Icon>
);

/** A projector throwing light — a session or a talk. */
export const IconProjector = (p: IconProps) => (
  <Icon {...p}>
    <rect x="2.5" y="11" width="15" height="7" rx="1.5" />
    <circle cx="13" cy="14.5" r="1.8" />
    <path d="M6 14.5h2.5M17.5 12.5l4-2.5M17.5 16.5l4 2.5M7 18v2M14 18v2" />
  </Icon>
);

/** A tractor: the big rear wheel, the small front one, the cab. */
export const IconTractor = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="7" cy="16" r="4" />
    <circle cx="18" cy="17.5" r="2.5" />
    <path d="M3.5 12V6.5h6l1.5 5.5h7.5a2 2 0 0 1 2 2v1.5M11 12H3.5M6 6.5V4M10.5 16h5" />
  </Icon>
);
