import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { brandConfig } from "@/config/brand";
import { seoConfig } from "@/config/seo";
import { createPageMetadata } from "@/lib/seo";
import "./base.css";

const display = localFont({ src: "./fonts/space-grotesk-latin.woff2", variable: "--font-display", display: "swap", weight: "300 700" });
const body = localFont({ src: "./fonts/inter-latin.woff2", variable: "--font-body", display: "swap", weight: "100 900" });

export const metadata: Metadata = {
  ...createPageMetadata({ ...seoConfig.site, path: "/" }),
  icons: {
    icon: { url: brandConfig.appIcon, type: "image/png", sizes: brandConfig.appIconSize },
    apple: { url: brandConfig.appIcon, type: "image/png", sizes: brandConfig.appIconSize },
  },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f7f5ef" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang={seoConfig.defaultLanguage} className={`${display.variable} ${body.variable}`}><body>{children}</body></html>;
}
