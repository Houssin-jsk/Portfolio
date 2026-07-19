import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "./globals.css";

const spaceGrotesk = localFont({
  src: "./fonts/space-grotesk-latin.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "300 700",
});

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "El Houssaine Ouahad | Data Analyst",
    template: "%s | El Houssaine Ouahad",
  },
  description:
    "El Houssaine Ouahad — AI Technician / Data Analyst. Turning raw data into clear insights, useful dashboards, and practical digital solutions.",
  metadataBase: new URL("https://el-houssaine-portfolio.vercel.app"),
  openGraph: {
    title: "El Houssaine Ouahad | Data Analyst",
    description: "Turning raw data into clear direction.",
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "El Houssaine Ouahad Portfolio",
    images: [{ url: "/images/profile.png", width: 2086, height: 2989, alt: "El Houssaine Ouahad" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "El Houssaine Ouahad | Data Analyst",
    description: "Turning raw data into clear direction.",
    images: ["/images/profile.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
