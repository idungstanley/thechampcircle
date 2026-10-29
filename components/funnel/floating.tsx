"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"
import { funnel } from "@/lib/funnel-config"
import { PriceNow, PriceWas } from "./pricing"
import { cn } from "@/lib/utils"
import { InlineCountdown } from "./countdown"
import { CtaButton } from "./cta-button"

/** Bottom bar on mobile — appears once the visitor scrolls past the hero. */
export function StickyMobileCta() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-champ-black/95 px-4 py-3 backdrop-blur transition-transform duration-300 sm:hidden",
        show ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!show}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1 text-white">
          <p className="text-base font-bold leading-tight">
            <PriceNow /> <PriceWas className="text-sm font-normal text-white/50 line-through" />
          </p>
          <p className="truncate text-xs text-champ-yellow">
            Ends in <InlineCountdown />
          </p>
        </div>
        <CtaButton size="md" location="sticky-mobile">
          Join now
        </CtaButton>
      </div>
    </div>
  )
}

/** WhatsApp chat button — only shown when a number is set in the config. */
export function WhatsAppButton() {
  if (!funnel.whatsappNumber) return null
  const text = encodeURIComponent("Hi! I have a question about The Champ Circle live class.")
  return (
    <a
      href={`https://wa.me/${funnel.whatsappNumber}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg sm:bottom-6"
    >
      <MessageCircle className="size-5" aria-hidden />
      <span className="hidden sm:inline">Questions? Chat with me</span>
    </a>
  )
}
