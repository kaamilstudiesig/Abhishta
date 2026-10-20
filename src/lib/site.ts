export const BOOKING_URL = "https://bookingengine.stayflexi.com/?hotel_id=32336";

export const WHATSAPP_NUMBER = "919945794925";
/** A WhatsApp chat with the farm, opened with a message already written. */
export const whatsappUrl = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
export const WHATSAPP_URL = whatsappUrl("Hi Abhishta, I'd like to know more about a stay at the farm.");
/** A day outing enquiry (The living farm, Group enquiries). */
export const DAY_OUTING_ENQUIRY = whatsappUrl("Hi Abhishta, I'd like to plan a day outing at the farm.\nDate:\nAdults:\nChildren:");

export const CONTACT = {
  reservation: { label: "+91 9945 7949 25", href: "tel:+919945794925" },
  landline: { label: "+91 9379 1963 00", href: "tel:+919379196300" },
  email: { label: "hello@abhishtaagrifarmstay.com", href: "mailto:hello@abhishtaagrifarmstay.com" },
  address: "Jiddigere Village, Yediyuru Hobli, Kunigal Taluk, Tumkur, Karnataka 572134",
  mapUrl: "https://www.google.com/maps?cid=10453955536286770963",
  /** who answers calls and WhatsApp (client, 2026-10-20) */
  person: "Deva Bhanu",
  /** office hours (old site) — TODO(client): confirm */
  hours: "Monday to Friday, 9 am to 6 pm",
  mapEmbed: "https://maps.google.com/maps?q=Abhishta%20Agri%20Farm%20Stay%2C%20Jiddigere%2C%20Kunigal&z=12&output=embed",
} as const;

export const TOUR_360_URL = "https://www.turiya.co/360/Abhishta/";
export const STORY_VIDEO_URL = "https://www.youtube-nocookie.com/embed/4L4cuBmsb38?autoplay=1&rel=0";

export const REVIEW_URL = CONTACT.mapUrl;

// TODO(client): confirm Instagram, Facebook and TripAdvisor handles — they are not on the live site.
export const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/abhishtaagrifarmstay/" },
  { name: "Facebook", href: "https://www.facebook.com/abhishtaagrifarmstay" },
  { name: "YouTube", href: "https://www.youtube.com/watch?v=4L4cuBmsb38" },
  { name: "WhatsApp", href: WHATSAPP_URL },
  { name: "TripAdvisor", href: "https://www.tripadvisor.in/Search?q=Abhishta%20Agri%20Farm%20Stay" },
] as const;


export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our nests", href: "/our-nests" },
  { label: "The living farm", href: "/the-living-farm" },
  { label: "Group enquiries", href: "/group-enquiries" },
  { label: "Field notes & 360° atlas", href: "/field-notes" },
] as const;
