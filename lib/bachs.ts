import "server-only"
import { funnel } from "@/lib/funnel-config"
import type { VerifiedPayment } from "@/lib/paystack"

/**
 * Bachs takes the dollar payments from visitors outside Nigeria.
 * Set BACHS_SECRET_KEY (sk_sandbox_... for testing, sk_live_... for real payments).
 */
function secretKey() {
  const key = process.env.BACHS_SECRET_KEY
  if (!key) throw new Error("BACHS_SECRET_KEY is not set")
  return key
}

async function bachs<T>(path: string, init?: RequestInit): Promise<T> {
  const key = secretKey()
  const api = key.startsWith("sk_sandbox_") ? "https://sandbox-api.bachs.io" : "https://api.bachs.io"
  const res = await fetch(`${api}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...init?.headers },
    cache: "no-store",
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(body.detail || `Bachs error ${res.status}`)
  return body as T
}

const usd = (n: number) => n.toFixed(2)

/** Creates a $100 Bachs checkout for the live class and returns the page to send the buyer to. */
export async function createCheckout(input: {
  email: string
  name: string
  whatsapp: string
  hasChannel?: string
  successUrl: string
  cancelUrl: string
}) {
  const session = await bachs<{ checkout_url: string }>("/v1/checkout-sessions", {
    method: "POST",
    headers: { "Idempotency-Key": crypto.randomUUID() },
    body: JSON.stringify({
      pricing: { currency: "USD", amount: usd(funnel.international.price) },
      customer: { email: input.email, name: input.name },
      success_url: input.successUrl,
      cancel_url: input.cancelUrl,
      metadata: { plan: "standard", name: input.name, whatsapp: input.whatsapp, has_channel: input.hasChannel ?? "" },
    }),
  })
  return session.checkout_url
}

/** The payment if Bachs confirms the checkout was paid in full; otherwise null. */
export async function verifiedCheckout(checkoutId: string): Promise<VerifiedPayment | null> {
  if (!/^chk_[\w-]{1,100}$/.test(checkoutId)) return null
  try {
    const s = await bachs<{ status: string; payment_status: string; amount: string; currency: string; metadata?: { name?: string } }>(
      `/v1/checkout-sessions/${encodeURIComponent(checkoutId)}`,
    )
    const amount = Number(s.amount)
    const ok = s.status === "completed" && s.payment_status === "succeeded" && s.currency === "USD" && amount >= funnel.international.price
    return ok ? { amount, currency: "USD", plan: "standard", name: s.metadata?.name ?? "" } : null
  } catch {
    return null
  }
}
