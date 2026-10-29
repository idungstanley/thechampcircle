import "server-only"
import { funnel } from "@/lib/funnel-config"
import { pricingAt, type Plan } from "@/lib/pricing"

const API = "https://api.paystack.co"

function secretKey() {
  const key = process.env.PAYSTACK_SECRET_KEY
  if (!key) throw new Error("PAYSTACK_SECRET_KEY is not set")
  return key
}

async function paystack<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${secretKey()}`, "Content-Type": "application/json", ...init?.headers },
    cache: "no-store",
  })
  const body = await res.json()
  if (!res.ok || !body.status) throw new Error(body.message || `Paystack error ${res.status}`)
  return body.data as T
}

/** Amount in kobo for the price in force right now — computed on the server so it can't be tampered with. */
export const amountInKobo = (at: number = Date.now(), plan: Plan = "standard") => pricingAt(at, plan).price * 100

export function initializeTransaction(input: {
  email: string
  name: string
  whatsapp: string
  hasChannel?: string
  plan: Plan
  school?: string
  callbackUrl: string
}) {
  return paystack<{ authorization_url: string; reference: string }>("/transaction/initialize", {
    method: "POST",
    body: JSON.stringify({
      email: input.email,
      amount: amountInKobo(Date.now(), input.plan),
      currency: funnel.currency,
      callback_url: input.callbackUrl,
      metadata: {
        name: input.name,
        whatsapp: input.whatsapp,
        has_channel: input.hasChannel ?? "",
        plan: input.plan,
        school: input.school ?? "",
        custom_fields: [
          { display_name: "Plan", variable_name: "plan", value: input.plan === "student" ? "Student" : "Standard" },
          ...(input.school ? [{ display_name: "School", variable_name: "school", value: input.school }] : []),
          { display_name: "Full name", variable_name: "name", value: input.name },
          { display_name: "WhatsApp", variable_name: "whatsapp", value: input.whatsapp },
          { display_name: "Has a channel", variable_name: "has_channel", value: input.hasChannel ?? "" },
        ],
      },
    }),
  })
}

/**
 * The amount paid (in naira) if Paystack confirms a successful payment of the price
 * that was in force when the transaction was started; otherwise null.
 */
export async function verifiedPayment(reference: string): Promise<number | null> {
  if (!/^[\w.=-]{1,100}$/.test(reference)) return null
  try {
    const tx = await paystack<{ status: string; amount: number; currency: string; created_at?: string; createdAt?: string; metadata?: { plan?: string } }>(
      `/transaction/verify/${encodeURIComponent(reference)}`,
    )
    const startedAt = Date.parse(tx.created_at ?? tx.createdAt ?? "") || Date.now()
    const plan: Plan = tx.metadata?.plan === "student" ? "student" : "standard"
    const ok = tx.status === "success" && tx.amount >= amountInKobo(startedAt, plan) && tx.currency === funnel.currency
    return ok ? tx.amount / 100 : null
  } catch {
    return null
  }
}
