import { NextResponse } from "next/server"
import { z } from "zod"
import { createCheckout } from "@/lib/bachs"
import { initializeTransaction } from "@/lib/paystack"
import { marketFor, pricingAt } from "@/lib/pricing"

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  whatsapp: z.string().trim().min(7).max(30),
  hasChannel: z.string().max(100).optional(),
  plan: z.enum(["standard", "student", "niche"]).default("standard"),
  school: z.string().trim().max(150).optional(),
})

/** Creates a Paystack transaction (or a Bachs checkout for dollar prices) and returns the URL to redirect to. */
export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check your name, email and WhatsApp number." }, { status: 400 })
  }
  if (parsed.data.plan === "student" && (parsed.data.school ?? "").length < 2) {
    return NextResponse.json({ error: "Please enter your school or institution." }, { status: 400 })
  }

  // Vercel sets the visitor's country; DEV_COUNTRY lets you test dollar pricing locally.
  const market = marketFor(req.headers.get("x-vercel-ip-country") ?? process.env.DEV_COUNTRY)
  if (pricingAt(Date.now(), parsed.data.plan, market).phase === "closed") {
    return NextResponse.json({ error: "Sorry, this offer has closed." }, { status: 410 })
  }

  try {
    // Dollar payments go through Bachs; everything priced in naira goes through Paystack.
    if (pricingAt(Date.now(), parsed.data.plan, market).currency === "USD") {
      const url = await createCheckout({
        ...parsed.data,
        successUrl: new URL("/thank-you", req.url).toString(),
        cancelUrl: new URL("/register", req.url).toString(),
      })
      return NextResponse.json({ url })
    }
    const { authorization_url } = await initializeTransaction({
      ...parsed.data,
      callbackUrl: new URL("/thank-you", req.url).toString(),
    })
    return NextResponse.json({ url: authorization_url })
  } catch (err) {
    console.error("Payment initialize failed:", err)
    return NextResponse.json({ error: "We couldn't start the payment. Please try again in a moment." }, { status: 502 })
  }
}
