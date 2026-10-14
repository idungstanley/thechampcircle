"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { track } from "@/lib/track"
import { cn } from "@/lib/utils"
import { funnel, formatPrice } from "@/lib/funnel-config"

/**
 * Primary call to action. Every CTA on the sales page goes to /register
 * (the checkout step), which then sends people to the payment link.
 */
export function CtaButton({
  children = `Reserve my seat — ${formatPrice(funnel.price)}`,
  className,
  size = "lg",
  location,
  nudge = false,
}: {
  children?: React.ReactNode
  className?: string
  size?: "md" | "lg"
  location: string
  nudge?: boolean
}) {
  return (
    <Link
      href="/register"
      onClick={() => track("AddToCart", { content_name: "Champ Circle Live Class", cta_location: location })}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full bg-champ-yellow font-bold text-champ-black transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champ-yellow active:translate-y-0",
        size === "lg" ? "px-7 py-4 text-base sm:px-9 sm:text-lg" : "px-5 py-2.5 text-sm",
        nudge && "animate-cta-nudge",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
    </Link>
  )
}
