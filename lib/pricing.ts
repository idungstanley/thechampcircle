import { funnel, formatPrice } from "@/lib/funnel-config"

export type Plan = "standard" | "student"

export type Pricing = {
  phase: "flash" | "early" | "regular" | "student"
  price: number
  /** The price shown crossed out (what it goes back to). */
  compareAt: number
  /** When the current price ends (ms since epoch), or null if it doesn't. */
  deadline: number | null
  label: string
}

const flashSales = funnel.flashSales.map((f) => ({ price: f.price, start: Date.parse(f.startsAt), end: Date.parse(f.endsAt) }))
const classStart = Date.parse(funnel.classStart)

/** The price in force at a given moment. Used by the page, checkout and payment verification. */
export function pricingAt(now: number = Date.now(), plan: Plan = "standard"): Pricing {
  if (plan === "student") {
    return { phase: "student", price: funnel.studentPrice, compareAt: funnel.price, deadline: now < classStart ? classStart : null, label: "Student price" }
  }
  const flash = flashSales.find((f) => now >= f.start && now < f.end)
  if (flash) {
    return { phase: "flash", price: flash.price, compareAt: funnel.price, deadline: flash.end, label: "Flash discount" }
  }
  if (now < classStart) {
    return { phase: "early", price: funnel.price, compareAt: funnel.oldPrice, deadline: classStart, label: "Early price" }
  }
  return { phase: "regular", price: funnel.oldPrice, compareAt: funnel.oldPrice, deadline: null, label: "Price" }
}

/** e.g. "4:20pm today" or "Monday, 2nd November 2026", in Lagos time. */
export function deadlineText(p: Pricing, now: number = Date.now()) {
  if (p.phase === "early" || p.phase === "student") return `when class starts on ${funnel.classStartLabel}`
  if (!p.deadline) return ""
  const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-NG", { timeZone: "Africa/Lagos", ...o }).format(p.deadline!)
  const sameDay = fmt({ dateStyle: "short" }) === new Intl.DateTimeFormat("en-NG", { timeZone: "Africa/Lagos", dateStyle: "short" }).format(now)
  const time = fmt({ hour: "numeric", minute: "2-digit", hour12: true }).replace(" ", "").toLowerCase()
  return sameDay ? `at ${time} today` : `on ${fmt({ weekday: "long", day: "numeric", month: "long" })} at ${time}`
}

export const fmt = formatPrice
