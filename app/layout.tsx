import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "El Houssaine Ouahad | Data Analyst",
    template: "%s | El Houssaine Ouahad",
  },
  description:
    "El Houssaine Ouahad — AI Technician / Data Analyst. Turning raw data into clear insights, useful dashboards, and practical digital solutions.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>{children}</body>
    </html>
  );
}
