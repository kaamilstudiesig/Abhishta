import type { Metadata, Viewport } from "next";
import { preconnect } from "react-dom";
import { Bricolage_Grotesque, DM_Sans, Fraunces, Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import "./variants.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// Fonts for the UI experiments (ui:* scripts). Declared here so they're available;
// browsers only download a face when a variant actually uses it.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});
const instrumentSans = Instrument_Sans({ variable: "--font-instrument-sans", subsets: ["latin"], display: "swap" });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], display: "swap" });

/** Which UI experiment to render (unset = the main design). Set by the ui:* npm scripts. */
const UI_VARIANT = process.env.NEXT_PUBLIC_UI_VARIANT || undefined;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.abhishtaagrifarmstay.com"),
  title: "Abhishta Agri Farm Stay — a farm stay 90 km from Bangalore",
  description:
    "Cottages and group dormitories on a working farm near Kunigal: nature walks, Gau Seva cow cuddling, fruit picking, farm-to-table meals, a pool and bonfire evenings, 90 km from Bangalore.",
  openGraph: {
    title: "Abhishta Agri Farm Stay",
    description: "Escape the urban chaos and embrace serenity, 90 km from Bangalore.",
    images: ["/images/og.jpg"],
    locale: "en_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#2E3A17",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  preconnect("https://www.turiya.co");
  preconnect("https://www.youtube-nocookie.com");
  return (
    <html
      lang="en-IN"
      data-ui={UI_VARIANT}
      className={`${fraunces.variable} ${dmSans.variable} ${instrumentSerif.variable} ${instrumentSans.variable} ${bricolage.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks JS as available before paint so split headings can wait for their reveal without a flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
