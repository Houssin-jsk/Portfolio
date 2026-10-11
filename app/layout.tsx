import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import "./coming-soon.css";

const display = localFont({ src: "./fonts/space-grotesk-latin.woff2", variable: "--font-display", display: "swap", weight: "300 700" });
const body = localFont({ src: "./fonts/inter-latin.woff2", variable: "--font-body", display: "swap", weight: "100 900" });

export const metadata: Metadata = {
  title: "El Houssaine Ouahad — Portfolio",
  description: "The new portfolio of El Houssaine Ouahad is currently being built. Exploring Artificial Intelligence, Data and Web Development.",
  metadataBase: new URL(siteConfig.siteUrl),
  alternates: { canonical: "/" },
  openGraph: { title: "El Houssaine Ouahad — Portfolio", description: "A new portfolio is taking shape. Exploring Artificial Intelligence, Data and Web Development.", type: "website", locale: "en_US", url: "/", siteName: "El Houssaine Ouahad Portfolio" },
  twitter: { card: "summary", title: "El Houssaine Ouahad — Portfolio", description: "A new portfolio is taking shape. Exploring Artificial Intelligence, Data and Web Development." },
  keywords: ["El Houssaine Ouahad", "Portfolio", "Artificial Intelligence", "Data", "Web Development"],
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#080b10" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en" className={`${display.variable} ${body.variable}`}><body>{children}</body></html>;
}
