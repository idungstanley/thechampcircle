import type React from "react"
import type { Metadata, Viewport } from "next"
import { Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { MetaPixel } from "@/components/funnel/meta-pixel"
import { funnel } from "@/lib/funnel-config"
import "./globals.css"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" })

export const metadata: Metadata = {
  metadataBase: funnel.siteUrl ? new URL(funnel.siteUrl) : undefined,
  title: "Get Your YouTube Channel Monetized — The Champ Circle Live Class",
  description:
    "A 4-week live YouTube Automation + AI class. No prerecorded videos. Learn live, build your channel as you go, and keep direct access to your coach until you're monetized. Starts 26th October 2026.",
  openGraph: {
    title: "Get Your YouTube Channel Monetized — The Champ Circle",
    description:
      "4-week live class. No prerecorded videos. Direct access to your coach until your channel is monetized. Starts 26th October.",
    images: ["/brand/logo-full.png"],
  },
  icons: { icon: "/brand/symbol.png", apple: "/brand/symbol.png" },
}

export const viewport: Viewport = { themeColor: "#141414" }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans antialiased">
        {children}
        <MetaPixel />
        <Analytics />
      </body>
    </html>
  )
}
