import type { Metadata } from "next"
import { requestMarket } from "@/lib/market"
import { RegisterView } from "./register-view"

// Rendered per request so the price is always the one in force right now
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Reserve your seat — The Champ Circle",
  robots: { index: false },
}

export default async function RegisterPage() {
  return <RegisterView plan="standard" market={await requestMarket()} />
}
