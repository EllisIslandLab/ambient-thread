import type { Metadata } from "next";
import { Cormorant_Garamond, Atkinson_Hyperlegible } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ConsoleCapture } from "@/components/ConsoleCapture";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Atkinson Hyperlegible was designed by the Braille Institute for maximum
// legibility for low-vision readers. Chosen deliberately: accessibility is
// this foundation's whole mission.
const body = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
});

const SITE_TITLE = "Ambient Thread Foundation | Sound Accessibility Nonprofit";
const SITE_DESCRIPTION =
  "A New Mexico nonprofit making everyday listening easier for people with hearing differences. Accessible iOS audio app arrives in 2027. Donate or get involved.";

export const metadata: Metadata = {
  // ambientthread.org is attached to the Vercel project (DNS cut over), so
  // absolute URLs (og:image included) resolve against the real domain. The
  // old VERCEL_PROJECT_PRODUCTION_URL fallback produced localhost og:image
  // URLs because vercel build doesn't expose that var locally.
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    siteName: "Ambient Thread Foundation",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

// Entity schema for search engines and AI assistants. Every fact here is
// public and rendered on the page (footer + contact section) — nothing invented.
const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Ambient Thread Foundation",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/images/logo.png`,
  description:
    "A nonprofit making everyday listening easier, more accessible, and more inclusive for people with different hearing and auditory needs.",
  email: "AmbientThread@gmail.com",
  telephone: "+1-505-750-4327",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1209 Mountain Road Pl NE, Ste N",
    addressLocality: "Albuquerque",
    addressRegion: "NM",
    postalCode: "87110",
    addressCountry: "US",
  },
  foundingDate: "2026-08-05",
  founder: {
    "@type": "Person",
    name: "Melissa Burns",
  },
  taxID: "42-4819969",
  nonprofitStatus: "https://schema.org/Nonprofit501c3",
  sameAs: [
    "https://instagram.com/AmbientThread",
    "https://www.zeffy.com/en-US/donation-form/donate-to-pay-our-developer-and-backend-support",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
        />
        <ConsoleCapture />
        {children}
        <Analytics />
        {/* Web Launch Academy analytics */}
        <script defer src="https://weblaunchacademy.com/beacon.js" data-site="231f7f7d-a992-4de2-b736-eae882619e18"></script>
        {/* Web Launch Academy portal bridge (preview tools; inert outside the portal) */}
        <script defer src="https://www.weblaunchacademy.com/bridge.js"></script>
      </body>
    </html>
  );
}
