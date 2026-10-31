import type { Metadata, Viewport } from "next";
import { preconnect } from "react-dom";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import "./meadow.css";

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

/** Meadow is the site's look; NEXT_PUBLIC_UI_VARIANT=classic (npm run ui:classic) renders the original design. */
const UI_VARIANT = process.env.NEXT_PUBLIC_UI_VARIANT === "classic" ? undefined : "meadow";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.abhishtaagrifarmstay.com"),
  title: "Abhishta Agri Farm Stay — a farm stay 90 km from Bangalore",
  description:
    "AC cottages and family rooms on a working farm near Kunigal, every meal included: nature walks, Gau Seva cow cuddling, fruit picking, a pool and bonfire evenings, 90 km from Bangalore.",
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
      className={`${fraunces.variable} ${dmSans.variable}`}
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
