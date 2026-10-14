import { NextResponse } from "next/server"
import { z } from "zod"
import { initializeTransaction } from "@/lib/paystack"

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  whatsapp: z.string().trim().min(7).max(30),
  hasChannel: z.string().max(100).optional(),
})

/** Creates a Paystack transaction and returns the checkout URL to redirect to. */
export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check your name, email and WhatsApp number." }, { status: 400 })
  }

  try {
    const { authorization_url } = await initializeTransaction({
      ...parsed.data,
      callbackUrl: new URL("/thank-you", req.url).toString(),
    })
    return NextResponse.json({ url: authorization_url })
  } catch (err) {
    console.error("Paystack initialize failed:", err)
    return NextResponse.json({ error: "We couldn't start the payment. Please try again in a moment." }, { status: 502 })
  }
}
