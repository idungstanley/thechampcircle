import type { Metadata } from "next"
import { RegisterView } from "./register-view"

// Rendered per request so the price is always the one in force right now
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Reserve your seat — The Champ Circle",
  robots: { index: false },
}

export default function RegisterPage() {
  return <RegisterView plan="standard" />
}
