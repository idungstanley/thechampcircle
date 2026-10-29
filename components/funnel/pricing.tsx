"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { deadlineText, fmt, pricingAt, type Plan, type Pricing } from "@/lib/pricing"

const PlanContext = createContext<Plan>("standard")

/** Wrap a page in this to show (and link to) a different plan's price, e.g. the students page. */
export function PlanProvider({ plan, children }: { plan: Plan; children: React.ReactNode }) {
  return <PlanContext.Provider value={plan}>{children}</PlanContext.Provider>
}

export const usePlan = () => useContext(PlanContext)

/** Current price, re-evaluated every second so the page switches at the deadline. */
export function usePricing(): Pricing {
  const plan = usePlan()
  const [p, setP] = useState(() => pricingAt(Date.now(), plan))
  useEffect(() => {
    const tick = () => {
      const next = pricingAt(Date.now(), plan)
      setP((cur) => (cur.phase === next.phase && cur.deadline === next.deadline ? cur : next))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [plan])
  return p
}

export const PriceNow = () => <>{fmt(usePricing().price)}</>

/** Crossed-out price. Renders nothing when there's no discount. */
export function PriceWas({ className }: { className?: string }) {
  const p = usePricing()
  if (p.compareAt <= p.price) return null
  return <span className={className}>{fmt(p.compareAt)}</span>
}

export function PriceSave() {
  const p = usePricing()
  return <>{fmt(Math.max(0, p.compareAt - p.price))}</>
}

export const PriceLabel = () => <>{usePricing().label}</>

/** "Flash discount ends at 4:20pm today" / "Early price ends when class starts on …" */
export function DeadlineSentence() {
  const p = usePricing()
  if (!p.deadline) return null
  return (
    <>
      {p.label} ends {deadlineText(p)}
    </>
  )
}

/** "Price goes back to ₦50,000 at 4:20pm today" */
export function PriceNextNote() {
  const p = usePricing()
  if (!p.deadline) return null
  return (
    <>
      Price goes back to {fmt(p.compareAt)} {deadlineText(p)}
    </>
  )
}

export function FaqPriceAnswer() {
  const p = usePricing()
  if (p.phase === "flash") {
    return (
      <>
        Right now there's a flash discount: {fmt(p.price)} until {deadlineText(p).replace(/^at /, "")}. After that it goes back to the early
        price of {fmt(p.compareAt)} until the class starts, then {fmt(pricingAt(Number.MAX_SAFE_INTEGER).price)}.
      </>
    )
  }
  return (
    <>
      The early price of {fmt(p.price)} is only available {deadlineText(p)}. After that, the price returns to {fmt(p.compareAt)}.
    </>
  )
}

/** "Flash discount ends in" / "Early price ends in" */
export function DeadlineHeading() {
  const p = usePricing()
  return <>{p.deadline ? `${p.label} ends in` : "Class has started"}</>
}
