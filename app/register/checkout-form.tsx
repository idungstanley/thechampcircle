"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Loader2, Lock } from "lucide-react"
import { funnel } from "@/lib/funnel-config"
import { fmt, type Plan } from "@/lib/pricing"
import { usePricing } from "@/components/funnel/pricing"
import { track } from "@/lib/track"

const field =
  "mt-1.5 w-full rounded-xl border border-input bg-white px-4 py-3 text-base outline-none transition focus:border-champ-black focus:ring-2 focus:ring-champ-black/10"

/**
 * Collects the student's details, creates a Paystack transaction on the server,
 * then redirects to Paystack's secure checkout. Paystack sends them back to /thank-you.
 */
export function CheckoutForm({ plan = "standard" }: { plan?: Plan }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { price } = usePricing()

  useEffect(() => {
    track("InitiateCheckout", { value: price, currency: funnel.currency })
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    track("AddPaymentInfo", { value: price, currency: funnel.currency })

    if (funnel.leadWebhookUrl) {
      // Optional copy of the lead for follow-ups. Never blocks the payment.
      fetch(funnel.leadWebhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          ...data,
          source: plan === "student" ? `students${data.school ? ` — ${data.school}` : ""}` : "register",
          submittedAt: new Date().toISOString(),
        }),
      }).catch(() => {})
    }

    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, plan }),
      })
      const body = await res.json()
      if (!res.ok || !body.url) throw new Error(body.error)
      window.location.href = body.url
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5">
      <label className="block text-sm font-medium">
        Full name
        <input name="name" required minLength={2} autoComplete="name" className={field} placeholder="e.g. Ada Okafor" />
      </label>
      <label className="block text-sm font-medium">
        Email address
        <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
        <span className="mt-1 block text-xs font-normal text-muted-foreground">Your payment receipt is sent here.</span>
      </label>
      <label className="block text-sm font-medium">
        WhatsApp number
        <input name="whatsapp" type="tel" required minLength={7} autoComplete="tel" className={field} placeholder="e.g. 0801 234 5678" />
      </label>
      {plan === "student" && (
        <label className="block text-sm font-medium">
          School / institution
          <input name="school" required minLength={2} className={field} placeholder="e.g. University of Lagos" />
        </label>
      )}
      <label className="block text-sm font-medium">
        Do you already have a YouTube channel?
        <select name="hasChannel" className={field} defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          <option>No, I'm starting from scratch</option>
          <option>Yes, but it's not growing</option>
          <option>Yes, and it's growing</option>
        </select>
      </label>

      {error && (
        <p role="alert" className="rounded-xl bg-destructive/10 p-3 text-sm font-medium text-destructive">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="group flex w-full items-center justify-center gap-2 rounded-full bg-champ-yellow px-6 py-4 text-lg font-bold text-champ-black transition-transform hover:-translate-y-0.5 disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden /> Opening secure payment…
          </>
        ) : (
          <>
            Pay {fmt(price)} & reserve my seat
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
          </>
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <Lock className="size-3.5 shrink-0" aria-hidden /> Secured by Paystack · card, bank transfer or USSD. You'll come
        straight back here after paying.
      </p>
    </form>
  )
}
