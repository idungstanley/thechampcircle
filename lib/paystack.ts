import "server-only"
import { funnel } from "@/lib/funnel-config"

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

/** Amount in kobo — always computed on the server so it can't be tampered with. */
export const amountInKobo = () => funnel.price * 100

export function initializeTransaction(input: {
  email: string
  name: string
  whatsapp: string
  hasChannel?: string
  callbackUrl: string
}) {
  return paystack<{ authorization_url: string; reference: string }>("/transaction/initialize", {
    method: "POST",
    body: JSON.stringify({
      email: input.email,
      amount: amountInKobo(),
      currency: funnel.currency,
      callback_url: input.callbackUrl,
      metadata: {
        name: input.name,
        whatsapp: input.whatsapp,
        has_channel: input.hasChannel ?? "",
        custom_fields: [
          { display_name: "Full name", variable_name: "name", value: input.name },
          { display_name: "WhatsApp", variable_name: "whatsapp", value: input.whatsapp },
          { display_name: "Has a channel", variable_name: "has_channel", value: input.hasChannel ?? "" },
        ],
      },
    }),
  })
}

/** True only if Paystack confirms a successful payment of the full class price. */
export async function isPaymentSuccessful(reference: string) {
  if (!/^[\w.=-]{1,100}$/.test(reference)) return false
  try {
    const tx = await paystack<{ status: string; amount: number; currency: string }>(
      `/transaction/verify/${encodeURIComponent(reference)}`,
    )
    return tx.status === "success" && tx.amount >= amountInKobo() && tx.currency === funnel.currency
  } catch {
    return false
  }
}
