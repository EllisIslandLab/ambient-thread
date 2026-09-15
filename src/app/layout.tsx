import type { Metadata } from "next";
import { Cormorant_Garamond, Atkinson_Hyperlegible } from "next/font/google";
import { ConsoleCapture } from "@/components/ConsoleCapture";
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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"
  ),
  title: "Ambient Thread Foundation | Inclusive, Personalized Sound Management",
  description:
    "A nonprofit making everyday listening easier, more accessible, and more inclusive for people with different hearing and auditory needs. Accessibility-focused iOS audio app coming in 2027.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <ConsoleCapture />
        {children}
      </body>
    </html>
  );
}
